import api from '../api/example';

export default {
  loadData: ({ commit }, token) => {
    api.getUsers().then(data => {
      commit('setData', data);
    })
  },
  deleteData: ({commit}, id) => {
    api.deleteUser(id).then(data => {

    });
  }
};