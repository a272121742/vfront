
const util = {};
util.title = function (title) {
  title = title ? `${title} - 主页 ` : 'vfront';
  window.document.title = title;
};

// 将线性列表转换为菜单树
util.buildMenu = function (array, ckey) {
  const menuData = [];
  const indexKeys = Array.isArray(array)
    ? array.map(e => e.id)
    : [];
  ckey = ckey || 'parent_id';
  array.forEach((e, i) => {
    // 一级菜单
    if (!e[ckey] || e[ckey] === e.id) {
      delete e[ckey];
      menuData.push(util.deepcopy(e)); // 深拷贝
    } else if (Array.isArray(indexKeys)) {
      // 检测ckey有效性
      const parentIndex = indexKeys.findIndex(id => id === e[ckey]);
      if (parentIndex === -1) {
        menuData.push(e);
      }
    }
  });
  const findChildren = function (parentArr) {
    if (Array.isArray(parentArr) && parentArr.length) {
      parentArr.forEach((parentNode) => {
        array.forEach((node) => {
          if (parentNode.id === node[ckey]) {
            if (parentNode.children) {
              parentNode.children.push(node);
            } else {
              parentNode.children = [node];
            }
          }
        });
        if (parentNode.children) {
          findChildren(parentNode.children);
        }
      });
    }
  };
  findChildren(menuData);
  return menuData;
};

util.deepcopy = function (source) {
  if (!source) {
    return source;
  }
  const sourceCopy = source instanceof Array ? [] : {};
  for (const item in source) {
    sourceCopy[item] =
      typeof source[item] === 'object'
        ? util.deepcopy(source[item])
        : source[item];
  }
  return sourceCopy;
};

/* eslint no-redeclare: 0 */
util.listToTree = function (list, id = 'id', pid = 'pid') {
  function exists (list, parentId) {
    return !!~list.findIndex(item => item[id] === parentId);
  }
  const nodes = [];
  for (var i = 0; i < list.length; i++) {
    var row = list[i];
    if (!exists(list, row[pid])) {
      nodes.push(row);
    }
  }
  const toDo = [];
  for (var i = 0; i < nodes.length; i++) {
    toDo.push(nodes[i]);
  }
  while (toDo.length) {
    const node = toDo.shift();
    for (var i = 0; i < list.length; i++) {
      var row = list[i];
      if (row[pid] === node[id]) {
        if (node.children) {
          node.children.push(row);
        } else {
          node.children = [row];
        }
        toDo.push(row);
      }
    }
  }
  return nodes;
};

export default util;
