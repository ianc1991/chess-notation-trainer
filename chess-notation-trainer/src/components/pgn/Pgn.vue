<script setup lang="ts">
import { Chess } from 'chess.js'
import { onMounted, toRef, watch } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  targetPgn: String,
  turnNumber: Number,
  chessJsGame: Chess
})

let moves = <any>[]
let correctPgnMove = ''

// Store variables
const store = useStore()

let chessJsGameRef = toRef(props, 'chessJsGame')
let turnNumberRef = toRef(props, 'turnNumber')

moves = chessJsGameRef.value.history()
correctPgnMove = moves[turnNumberRef.value - 1]

watch(turnNumberRef, (newVal) => {
  if (newVal){
    moves = chessJsGameRef.value.history()
    correctPgnMove = moves[turnNumberRef.value - 1]
  }
})

function setPgn(pgn: string) {
  store.commit('setTargetPgn', pgn)
  store.commit('resetTurn')
  store.commit('resetFen')
}

onMounted( () => {
  setPgn(props.targetPgn)
})
</script>

<!-- T E M P L A T E -->
<template>
  <h1>{{ correctPgnMove || 'PGN move not found' }}</h1>
  <button @click="setPgn(props.targetPgn)">Reset/Load PGN</button>
</template>