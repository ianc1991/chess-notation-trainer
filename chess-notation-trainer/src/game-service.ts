import { Chess } from 'chess.js'
import { Store } from 'vuex'
import { Api } from 'chessground/api'

export function initiateNewChessGame(store: Store<any>) {
  let game = new Chess()
  let pgn = '[Event "Casual Game"]\n[Site "Berlin GER"]\n[Date "1852.??.??"]\n[EventDate "?"]\n[Round "?"]\n[Result "0-1"]\n[White "Adolf Anderssen"]\n[Black "Jean Dufresne"]\n[ECO "C52"]\n[PlyCount "47"]\n\n1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O dxc3 8.Qb3 Qf6 9.e5 Qg6 10.Nxc3 Nge7 11.Ba3 O-O 12.Rad1 Bxc3 13.Qxc3 b5 14.Bxb5 Rb8 15.Bd3 Qh5 16.Rfe1 Bb7 17.Be4 Rfd8 18.h3 a6 19.Kh2 Ng6 20.g4 Qh6 21.Bc1 Nf4 22.Ng1 g5 23.Ne2 Nxe2 24.Rxe2 Qg7 25.Bf5 d6 26.Bb2 Nxe5 27.Rxe5 dxe5 28.Rxd8+ Rxd8 29.Qxc7 Qf6 30.Bxe5 Qc6 31.Qxd8+ 1-0'
  game.loadPgn(pgn)
  store.commit('newChessGame', game)
  store.commit('setTargetPgn', pgn)
  store.commit('resetFen')
  console.log("New game initiated")
}

export function madeCorrectMove(store: Store<any>, chessground: Api) {
  store.commit('incrementTurn')
  store.commit('setFen', chessground.getFen())
  store.commit('setTurnColor')
}

export function madeIncorrectMove() {
  //store.state
}

export function convertPieceToPgnMove(piece: String) {
  if (piece === 'pawn') return ''
  if (piece === 'knight') return 'N'
  return piece[0].toUpperCase()
}