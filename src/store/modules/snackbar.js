/*export default {
    namespaced: true,
    state: () => ({
        title: undefined,
        message: undefined,
        type: 'success',
    }),

    mutations: {
        SET_SNACK(state, snackbar) {
            console.log(snackbar)
            if (snackbar !== undefined) {
                state.title = snackbar.title
                state.message = snackbar.message
                state.type = snackbar.type === undefined ? 'success' : snackbar.type
            } else {
                state.title = undefined
            }
        },
    },

    actions: {
        toggleSnackBarAction({ commit }, snackbar) {
            commit('SET_SNACK', snackbar)
            setTimeout(() => {
                commit('SET_SNACK', undefined)
            }, 4000)
        },
    },
}*/
export default {
    namespaced: true,
    state: () => ({
      title: undefined,
      message: undefined,
      type: 'success',
    }),
  
    mutations: {
      SET_SNACK(state, snackbar) {
        console.log(snackbar);
        if (snackbar !== undefined) {
          state.title = snackbar.title;
          state.message = snackbar.message;
          state.type = snackbar.type === undefined ? 'success' : snackbar.type;
        } else {
          state.title = undefined;
        }
      },
    },
  
    actions: {
      toggleSnackBarAction({ commit }, snackbar) {
        if (snackbar === undefined || snackbar.type === 'error') {  console.log(snackbar);
          snackbar = {
            title: snackbar.title,
            message: snackbar.message[0][0],
            type: 'error' ,
          };
        }
        commit('SET_SNACK', snackbar);
        setTimeout(() => {
          commit('SET_SNACK', undefined);
        }, 4000);
      },
    },
  };
  
