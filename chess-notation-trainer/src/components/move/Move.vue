<script setup lang="ts">
defineProps<{ turn: number }>()

function formatTurnNumber(turnNum: number) {
  return Math.ceil(turnNum / 2)
}

</script>

<!-- T E M P L A T E -->
<template>
<h1>{{ formatTurnNumber(turn) }}<span>{{ turn % 2 === 0 ? '...' : '' }}</span></h1>
</template>