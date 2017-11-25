let util = {

};
util.title = function (title) {
  title = title ? title + ' - 主页 ' : 'vfront';
  window.document.title = title;
};

export default util;