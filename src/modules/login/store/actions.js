import loginSerivce from '../api';

export default {
  toLogin: ({ commit }, loginInfo) => {
    const email = loginInfo.name.trim();
    const password = loginInfo.password;
    return loginSerivce
      .login(email, password)
      .then((data) => {
        if (data.token) {
          commit('onSuccess', data);
          return Promise.resolve(data);
        }
        return Promise.reject(new Error('登陆失败：查找无此用户！'));
      })
      .catch(err => Promise.reject(err));
  },
  toLoginByToken: ({ commit }, token) => loginSerivce
    .loginByToken(token)
    .then((data) => {
      if (data.token) {
        commit('onSuccess', data);
        return Promise.resolve(data);
      }else{
        return Promise.reject(new Error('登陆失败：查找无此用户！'));
      }
    })
    .catch(err => Promise.reject(err))
};
