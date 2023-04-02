<script setup lang="ts">
import Board from './components/board/Board.vue'
import Move from './components/move/Move.vue'
import Pgn from './components/pgn/Pgn.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { initiateNewChessGame } from './game-service'

const store = useStore()
initiateNewChessGame(store)

// Store variables
let turnNumber = computed(() => store.state.game.turn)
let chessJsGame = computed(() => store.state.game.chessJsGame)
let targetPgn = computed(() => store.state.targetPgn.pgn)

function setPgn() {
	store.commit('setTargetPgn', targetPgn.value)
	store.commit('resetTurn')
	store.commit('resetFen')
}
</script>

<template>
	<div class="flex gap-2 justify-center items-center text-5xl font-bold bg-sky-500 text-white py-2 px-4 rounded-lg">
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
	<div class="boardCompContainer mt-10">
		<Board
			:chessJsGame="chessJsGame"
			:turnNumber="turnNumber"
			class="boardComp"
		/>
	</div>
	<div>
		<button
			class="rounded-full bg-sky-500 text-white py-2 px-4"
			@click="setPgn()"
		>
			Reset/Load PGN
		</button>
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
