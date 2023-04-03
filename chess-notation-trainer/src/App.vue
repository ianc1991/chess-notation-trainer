<script setup lang="ts">
	import Board from './components/board/Board.vue'
	import Move from './components/move/Move.vue'
	import Pgn from './components/pgn/Pgn.vue'
	import PgnLoader from './components/pgn-loader/PgnLoader.vue'
	import { useStore } from 'vuex'
	import { computed, ref } from 'vue'
	import { initiateNewChessGame } from './game-service'

	const store = useStore()
	initiateNewChessGame(store)

	// Store variables
	let turnNumber = computed(() => store.state.game.turn)
	let chessJsGame = computed(() => store.state.game.chessJsGame)
	let targetPgn = computed(() => store.state.targetPgn.pgn)

	// Template variables
	let textColor = computed(() => (turnNumber.value % 2 === 0 ? 'text-black' : 'text-white'))
	let boardKey = 0

	// reset pgn
	function resetPgn() {
		initiateNewChessGame(store, targetPgn.value)
		boardKey++ // update the key to recreate the Board component
	}
</script>

<template>
	<div class="w-full h-screen bg-cyan-950">
		<div class="flex justify-center w-100">
			<div
				:class="[`${textColor}`]"
				class="flex items-center justify-center w-1/2 gap-2 px-4 py-2 text-5xl font-bold rounded-lg bg-sky-500"
			>
				<Move
					:turn="turnNumber"
					:targetPgn="targetPgn"
				/>
				<Pgn
					:turnNumber="turnNumber"
					:targetPgn="targetPgn"
					:chessJsGame="chessJsGame"
				/>
			</div>
		</div>
		<div class="mt-10 boardCompContainer">
			<Board
				:chessJsGame="chessJsGame"
				:turnNumber="turnNumber"
				:targetPgn="targetPgn"
				:boardKey="boardKey"
				class="boardComp"
			/>
		</div>
		<div class="flex items-center justify-center">
			<PgnLoader />
		</div>
		<div class="flex justify-center">
			<button
				class="px-4 py-2 text-white rounded-full bg-sky-500"
				@click="resetPgn()"
			>
				Reset
			</button>
		</div>
	</div>
</template>

<style scoped>
	.boardComp {
		height: 500px;
		width: 500px;
	}

	.boardCompContainer {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
	}
</style>
