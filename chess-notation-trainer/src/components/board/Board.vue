<script setup lang="ts">
import { Chessground } from 'chessground'
import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.brown.css'
import 'chessground/assets/chessground.cburnett.css'
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'


const boardContainer = ref()
const store = useStore()
const boardConfig = computed(() => store.state.board.config)

function createChessground() {
  const chessground = Chessground(boardContainer.value, boardConfig.value)
  chessground.set({
    movable: {
      events: {
        // actions after piece is moved
        after: (orig, dest, meta)=> {
          store.commit('setFen', chessground.getFen())
        }
      }
    }
  })
  return chessground
}

onMounted(() => {
  let chessground = createChessground()
  watch(boardConfig.value, (newVal) => {
    chessground.destroy()
    chessground = createChessground()
  })
})
</script>

<!-- T E M P L A T E -->
<template>
<div ref="boardContainer"></div>
</template>

<!-- S T Y L E S -->
<style scoped>
</style>