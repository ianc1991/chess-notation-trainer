import { Chess } from 'chess.js'
import { createStore } from 'vuex'

const store = createStore({
  modules: {
    // board
    board: {
      state: {
        config: {
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        }
      },
      mutations: {
        setFen(state, newFen) {
          state.config.fen = newFen
        },
        resetFen(state) {
          state.config.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
        }
      }
    },

    // game
    game: {
      // game state
      state: {
        turn: 1,
        chessJsGame: undefined,
        turnColor: 'white'
      },
      mutations: {
        // game.turn mutations
        incrementTurn(state) {
          state.turn++
        },
        resetTurn(state) {
          state.turn = 1
        },
        // game.chessJsGame mutations
        newChessGame(state, game: Chess) {
          state.chessJsGame = game
          state.turn = 1
        },
        setChessGame(state, game) {
          state.chessJsGame = game
        },
        // game.turnColor mutations
        setTurnColor(state) {
          state.turnColor = state.turn % 2 === 0 ? 'black' : 'white'
        }
      },
    },

    // targetPgn
    targetPgn: {
      state: {
        pgn: ""
      },
      mutations: {
        setTargetPgn(state, newPgn) {
          state.pgn = newPgn
        }
      }
    }
  }
})

export default store