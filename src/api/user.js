'use strict'
/*
 * @Author: 钱龙
 * @Date: 2017-12-07 15:32:05
 * @Last Modified by: 钱龙
 * @Last Modified time: 2017-12-11 13:55:53
 */

import $ from '@/lib/ajax';

export default {
  // login: (data) => post('/api/user/login', data),
  login: (data) => {
    console.log('↓ api:\t', data);
    return $.post('/api/user/login', data)
  },
  getUsersCount: () => $.get('/api/user-count'),
  getUsers: (params) => $.get('/api/user', {params}),
  deleteUser: (id) => $.del('/api/user' + '/' + id),
  updateUser: (id, data) => $.patch('/api/user' + '/' + id, data),
  saveUser: (data) => $.post('/api/user', data),
  checkUserName: (data) => $.post('/api/user-name', data),
}

