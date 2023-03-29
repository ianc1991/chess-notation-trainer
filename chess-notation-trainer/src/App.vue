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
</script>

<template>
  <Move
    :turn="turnNumber"
    :targetPgn="targetPgn"
  />
  <Pgn
    :turnNumber="turnNumber"
    :targetPgn="targetPgn"
    :chessJsGame="chessJsGame"
  />
<div class="boardCompContainer">
  <Board
    :chessJsGame="chessJsGame"
    :turnNumber="turnNumber"
    class="boardComp"
  />
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
