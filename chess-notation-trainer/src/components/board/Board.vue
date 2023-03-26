<script setup lang="ts">
import { Chess } from 'chess.js'
import { Chessground } from 'chessground'
import { Api } from 'chessground/api'
import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.brown.css'
import 'chessground/assets/chessground.cburnett.css'
import { computed, onMounted, ref, toRef, watch, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { convertPieceToPgnMove, madeCorrectMove } from '../../game-service'

const props = defineProps({
  chessJsGame: Chess,
  turnNumber: Number,
})

const boardContainer = ref()
const store = useStore()
const boardConfig = computed(() => store.state.board.config)
let moves = [""]
let correctPgnMove = moves[props.turnNumber! - 1]
const chessJsGameRef = toRef(props, 'chessJsGame')
const turnNumberRef = toRef(props, 'turnNumber')
let chessground: Api


function createChessground(fenArg?: string) {
  chessground.set({
    fen: fenArg || 'start',

    movable: {

    },

    events: {
      move: (orig, dest, capturedPiece) => {
        // check if move is correct
        const history = chessJsGameRef.value.history({verbose: true})
        const currentMoveHistory = history[turnNumberRef.value - 1]
        const correctMove = currentMoveHistory.lan

        // set correct piece to move
        let correctPiece
        currentMoveHistory.piece === 'p' ? correctPiece = '' : correctPiece = currentMoveHistory.piece.toUpperCase()

        // get the piece that was moved
        let pieceMove = convertPieceToPgnMove(chessground.state.pieces.get(dest).role)
        // get the move that was moved
        let lastMove = chessground.state.lastMove

        // if a capture was made
        if (capturedPiece) {
          if (pieceMove === '') pieceMove = lastMove[0][0] // add rank if pawn
          pieceMove += 'x'
        }

        // check if king castled
        if (pieceMove === 'K') {
          // short castle
          if ((lastMove[0] === 'e1' && lastMove[1] === 'g1') || (lastMove[0] === 'e8' && lastMove[1] === 'g8')) {
            pieceMove = 'O-O'
            // check if short castle was correct move
            if (pieceMove === correctMove) {
              madeCorrectMove(store, chessground)
              return chessground
            }
            // long castle
          } else if ((lastMove[0] === 'd1' && lastMove[1] === 'b3') || (lastMove[0] === 'd8' && lastMove[1] === 'b8'))  {
            pieceMove = 'O-O-O'
            // check if long castle was correct move
            if (pieceMove === correctMove) {
              madeCorrectMove(store, chessground)
              return chessground
            }
          }
        }

        if (lastMove[0] + lastMove[1] === correctMove) {
          // right move
          store.commit('incrementTurn')
        } else {
          // wrong move
          chessground.set({fen: currentMoveHistory.before})
          return chessground
        }
        // set new FEN
        store.commit('setFen', chessground.getFen())
      }
    }
  })
  return chessground
}

onMounted(() => {
  chessground = Chessground(boardContainer.value, boardConfig.value)
  createChessground()
})

watch(turnNumberRef, (newVal) => {
  if (newVal === 1){
    chessground.set({fen: 'start'})
  }
})
</script>

<!-- T E M P L A T E -->
<template>
<div ref="boardContainer"></div>
</template>

<!-- S T Y L E S -->
<style scoped>
</style>