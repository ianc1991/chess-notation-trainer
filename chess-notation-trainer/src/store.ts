import { createStore } from 'vuex'

const store = createStore({
  modules: {
    // board
    board: {
      state: {
        config: {
          fen: 'start',
        }
      },
      mutations: {
        setFen(state, newFen) {
          state.config.fen = newFen
        },
        resetFen(state) {
          state.config.fen = 'start'
        }
      }
    },

    // game
    game: {
      state: {
        turn: 1
      },
      mutations: {
        incrementTurn(state) {
          state.turn++
        },
        resetTurn(state) {
          state.turn = 1
        }
      }
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