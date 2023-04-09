<script setup lang="ts">
	const props = defineProps({
		text: String,
	})
</script>

<template>
	<button class="px-4 py-2 text-white rounded-full bg-sky-500">{{ text }}</button>
</template>
