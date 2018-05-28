import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const USER_RULES = {
  name: [
    { required: true, message: '必须填写账户名称', trigger: 'blur' },
    { type: 'email', message: '账户名称只能是邮箱', trigger: 'blur' }
    // {
    //   validator (rule, value, callback) {
    //     api.checkUserName(value).then(data => {
    //       if(data){
    //         callback();
    //       }else{
    //         callback(new Error('查无此用户'));
    //       }
    //     });
    //   }
    // }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, message: '密码必须大于6位', trigger: 'blur' }
  ]
};
const USER_DEFAULT = {
  name: 'admin@haocang.com',
  password: '12345678'
};
export default {
  state: {
    // user: {},
    // status: '',
    // email: '',
    // code: '',
    // uid: undefined,
    // auth_type: '',
    token: sessionStorage.getItem('login_token'),
    isLogin: sessionStorage.hasOwnProperty('login_token'),
    // name: '',
    // avatar: '',
    // introduction: '',
    // roles: [],
    loginForm: USER_DEFAULT,
    loginFormRules: USER_RULES
    // setting: {

    // }
  },
  getters,
  actions,
  mutations
};
