import session from '@/lib/session';

export default {
  onSuccess (state, data) {
    state.token = session('login_token', data.token);
    state.isLogin = !!state.token;
    state.setting = data.menus;
  }
};
