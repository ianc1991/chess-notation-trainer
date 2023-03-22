import { createStore } from 'vuex'

const store = createStore({
  modules: {
    // board
    board: {
      state: {
        config: {
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
          movable: {
            free: false
          }
        }
      },
      mutations: {
        setFen(state, newFen) {
          state.config.fen = newFen
        }
      }
    },

    // game
    game: {
      state: {
        turn: 1
      },
      mutations: {
        increment(state) {
          state.turn++
        },
        reset(state) {
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