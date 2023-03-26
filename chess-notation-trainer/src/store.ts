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

      },
      mutations: {
        // game.turn mutations
        incrementTurn(state) {
          state.turn++
        },
        resetTurn(state) {
          state.turn = 1
        },
        // game.chessJsGame mutation
        newChessGame(state, game) {
          state.chessJsGame = game
          state.turn = 1
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