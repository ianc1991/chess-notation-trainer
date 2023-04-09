<script setup lang="ts">
	import { useStore } from 'vuex'
	import { initiateNewChessGame } from '../../game-service'
	import { computed } from 'vue'
	import PrimaryButton from '../Reusables/Button/Primary/PrimaryButton.vue'

	const store = useStore()

	// get fen from the store
	const fen = computed(() => store.state.game.fen)

	function loadPgn() {
		const pgnInput = document.getElementById('large-input') as HTMLInputElement
		const pgn = pgnInput.value

		initiateNewChessGame(store, pgn)
	}
</script>

<template>
	<div class="flex flex-col justify-content">
		<div class="mb-6">
			<label
				for="large-input"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Enter PGN</label
			>
			<input
				type="text"
				id="large-input"
				class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			/>
		</div>
		<div class="flex justify-center">
			<PrimaryButton
				text="Load PGN"
				@click="loadPgn()"
			/>
		</div>
	</div>
</template>
