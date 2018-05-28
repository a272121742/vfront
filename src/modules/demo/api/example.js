import $ from '@/lib/ajax';


export default {
  getUsers () {
    return $.get('/api/users');
  },
  deleteUser (id) {
    return $.delete('/api/user/' + id);
  }
};

/**
 * @example config参数参看 https://www.npmjs.com/package/axios#request-config
   $.request(config);
   $.get(url, config);
   $.delete(url, config);
   $.head(url, config);
   $.post(url, data, config);
   $.put(url, data, config);
   $.patch(url, data, config)
 */
