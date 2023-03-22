<script setup lang="ts">
import { useStore } from 'vuex'
import { Chess } from 'chess.js'

const store = useStore()
let turn = store.state.game.turn
const pgn = '[Event "Casual Game"]\n[Site "Berlin GER"]\n[Date "1852.??.??"]\n[EventDate "?"]\n[Round "?"]\n[Result "0-1"]\n[White "Adolf Anderssen"]\n[Black "Jean Dufresne"]\n[ECO "C52"]\n[PlyCount "47"]\n\n1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O dxc3 8.Qb3 Qf6 9.e5 Qg6 10.Nxc3 Nge7 11.Ba3 O-O 12.Rad1 Bxc3 13.Qxc3 b5 14.Bxb5 Rb8 15.Bd3 Qh5 16.Rfe1 Bb7 17.Be4 Rfd8 18.h3 a6 19.Kh2 Ng6 20.g4 Qh6 21.Bc1 Nf4 22.Ng1 g5 23.Ne2 Nxe2 24.Rxe2 Qg7 25.Bf5 d6 26.Bb2 Nxe5 27.Rxe5 dxe5 28.Rxd8+ Rxd8 29.Qxc7 Qf6 30.Bxe5 Qc6 31.Qxd8+ 1-0'
const game = new Chess()
game.loadPgn(pgn)
const moves = game.history()
</script>

<!-- T E M P L A T E -->
<template>
<h1>{{ turn }}</h1>
</template>