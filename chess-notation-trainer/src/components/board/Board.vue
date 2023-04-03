<script setup lang="ts">
	import { Chess, Move } from 'chess.js'
	import { Chessground } from 'chessground'
	import { Api } from 'chessground/api'
	import 'chessground/assets/chessground.base.css'
	import 'chessground/assets/chessground.brown.css'
	import 'chessground/assets/chessground.cburnett.css'
	import { computed, onMounted, ref, toRef, watch } from 'vue'
	import { useStore } from 'vuex'
	import { initiateNewChessGame, madeCorrectMove } from '../../game-service'
	import _ from 'lodash'

	const props = defineProps({
		chessJsGame: Chess,
		turnNumber: Number,
		targetPgn: String,
		boardKey: Number,
	})

	const boardContainer = ref()
	const store = useStore()
	const boardConfig = computed(() => store.state.board.config)
	const turnColor = computed(() => store.state.game.turnColor)
	const chessJsGameRef = toRef(props, 'chessJsGame')
	const turnNumberRef = toRef(props, 'turnNumber')
	const targetPgnRef = toRef(props, 'targetPgn')
	const boardKey = toRef(props, 'boardKey')
	let chessground: Api
	let chess = new Chess()
	// Variables for moveDebounced()
	let currentMoveHistory: any
	let history: Move[]

	const moveDebounced = _.debounce((orig, dest, capturedPiece) => {
		try {
			// check if move is correct
			currentMoveHistory = history[turnNumberRef.value - 1]
			// get the move that was moved
			let lastMove = chessground.state.lastMove
			let playedMove = chess.move({
				from: lastMove[0],
				to: lastMove[1],
			})

			if (playedMove.san === currentMoveHistory.san) {
				// play correct move
				madeCorrectMove(store, chessground)
				chess.load(chess.fen())
			} else {
				// play incorrect move
				chess.undo()
				chessground.set({
					fen: currentMoveHistory.before,
				})
			}

			chessground.set({
				movable: {
					dests: getLegalMoves(),
					color: turnColor.value,
				},
				turnColor: turnColor.value,
			})

			return chessground
		} catch (error) {
			chess.undo()
			chessground.set({ fen: currentMoveHistory.before })
			return chessground
		}
	}, 10)

	// gets all legal moves for the current 'chess' variable and sets them as the destinations for the pieces
	function getLegalMoves() {
		let legalMoves = chess.moves({ verbose: true })
		let legalMovesMap = new Map()
		legalMoves.forEach((move) => {
			if (legalMovesMap.has(move.from)) {
				legalMovesMap.get(move.from).push(move.to)
			} else {
				legalMovesMap.set(move.from, [move.to])
			}
		})
		return legalMovesMap
	}

	function createChessground(fenArg?: string) {
		// cleanup
		if (chessground) {
			chessground.destroy()
			chessground = null
		}

		chessground = Chessground(boardContainer.value, boardConfig.value)
		chess = new Chess()
		history = chessJsGameRef.value.history({ verbose: true })

		chessground.set({
			fen: 'start',
			animation: {
				duration: 0,
				enabled: false,
			},

			movable: {
				free: false,
				dests: getLegalMoves(),
				color: 'white',
			},

			events: {
				move: (orig, dest, capturedPiece) => {
					moveDebounced(orig, dest, capturedPiece)
				},

				// select: (key) => {
				// 	piece = chessground.state.pieces.get(key)
				// },
			},
		})
		return chessground
	}

	onMounted(() => {
		createChessground()
	})

	// Recreate chessground when turnNumber or targetPgn change
	watch(targetPgnRef, (newVal) => {
		initiateNewChessGame(store, newVal)
		createChessground()
	})

	watch(boardKey, () => {
		createChessground()
	})
</script>

<!-- T E M P L A T E -->
<template>
	<div ref="boardContainer"></div>
</template>

<!-- S T Y L E S -->
<style scoped></style>
