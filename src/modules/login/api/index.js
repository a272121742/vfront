import $ from '@/lib/ajax';

export default {
  login: (email, password) => $.post('/api/login', { email, password }),
  loginByToken: token => $.post('/api/loginbytoken', token)
};
