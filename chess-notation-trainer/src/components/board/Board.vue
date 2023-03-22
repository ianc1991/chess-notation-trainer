<script setup lang="ts">
import { Chessground } from 'chessground'
import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.brown.css'
import 'chessground/assets/chessground.cburnett.css'
import { onMounted, ref } from 'vue'

const boardContainer = ref()

onMounted(() => {
  const chessground = Chessground(boardContainer.value, {
    // Options for Chessground go here
    // The initial position of the pieces
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
  });

})
</script>

<!-- T E M P L A T E -->
<template>
<div ref="boardContainer"></div>
</template>

<!-- S T Y L E S -->
<style scoped>
</style>