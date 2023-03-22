<script setup lang="ts">
import Board from './components/board/Board.vue'
import Move from './components/move/Move.vue'
</script>

<template>
  <Move />
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
