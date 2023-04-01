<script setup lang="ts">
import { Chess, Move } from 'chess.js'
import { Chessground } from 'chessground'
import { Api } from 'chessground/api'
import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.brown.css'
import 'chessground/assets/chessground.cburnett.css'
import { computed, onMounted, ref, toRef, watch } from 'vue'
import { useStore } from 'vuex'
import { madeCorrectMove } from '../../game-service'
import _ from 'lodash'
import { Piece } from 'chessground/types'

const props = defineProps({
	chessJsGame: Chess,
	turnNumber: Number,
})

const boardContainer = ref()
const store = useStore()
const boardConfig = computed(() => store.state.board.config)
const turnColor = computed(() => store.state.game.turnColor)
const chessJsGameRef = toRef(props, 'chessJsGame')
const turnNumberRef = toRef(props, 'turnNumber')
let chessground: Api
let chess: Chess = new Chess()
// Variables for moveDebounced()
let piece: Piece
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
			return chessground
		} else {
			// play incorrect move
			chessground.set({ fen: currentMoveHistory.before })
			chess.undo()
			return chessground
		}
	} catch (error) {
		chess.undo()
		chessground.set({ fen: currentMoveHistory.before })
		return chessground
	}
}, 0)

function createChessground(fenArg?: string) {
	history = chessJsGameRef.value.history({ verbose: true })
	chessground.set({
		fen: fenArg || 'start',
		animation: {
			duration: 0,
			enabled: false,
		},

		movable: {
			free: true,
		},

		turnColor: 'white',

		events: {
			move: (orig, dest, capturedPiece) => {
				moveDebounced(orig, dest, capturedPiece)
			},

			select: (key) => {
				piece = chessground.state.pieces.get(key)
			},
		},
	})
	return chessground
}

onMounted(() => {
	chessground = Chessground(boardContainer.value, boardConfig.value)
	createChessground()
})

watch(turnNumberRef, (newVal) => {
	if (newVal === 1) {
		chess = new Chess()
		chessground.set({ fen: 'start' })
	}
})
</script>

<!-- T E M P L A T E -->
<template>
	<div ref="boardContainer"></div>
</template>

<!-- S T Y L E S -->
<style scoped></style>
