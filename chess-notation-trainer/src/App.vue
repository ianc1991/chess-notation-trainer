<script setup lang="ts">
import Board from './components/board/Board.vue'
import Move from './components/move/Move.vue'
import Pgn from './components/pgn/Pgn.vue'
import { Chess } from 'chess.js'
import { useStore } from 'vuex'

const store = useStore()
let turnNumber = store.state.game.turn
let correctMove = store.state.targetPgn
</script>

<template>
  <Move :turn="turnNumber" :move="correctMove" />
  <Pgn />
<div class="boardCompContainer">
  <Board class="boardComp"/>
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
