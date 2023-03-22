<script setup lang="ts">
import { Chessground } from 'chessground'
import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.brown.css'
import 'chessground/assets/chessground.cburnett.css'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { Chess } from 'chess.js'

const boardContainer = ref()
const store = useStore()
const boardConfig = store.state.board.config


onMounted(() => {
  const chessground = Chessground(boardContainer.value, boardConfig);
})
</script>

<!-- T E M P L A T E -->
<template>
<div ref="boardContainer"></div>
</template>

<!-- S T Y L E S -->
<style scoped>
</style>