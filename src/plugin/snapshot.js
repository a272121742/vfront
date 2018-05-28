
export default {
  install (Vue, options) {
    // 快照缓存
    let SnapshotMemory = {};
    Vue.prototype.$snapshot = function (command, dataName, version = 'default'){
      // 获取组件实例
      const vm = this;
      // 注册组件到快照中
      if(!SnapshotMemory.hasOwnProperty(vm._uid)){
        SnapshotMemory[vm._uid] = {};
      }
      // 获取组件快照
      let snapshot = SnapshotMemory[vm._uid];
      // 获取组件数据，computed不获取
      const dataKey = Object.keys(vm.$props || []).concat(Object.keys(vm.$data || []));
      // 如果无可用命令，抛出异常
      if(!command || !~['set', 'restore', 'clear'].indexOf(command)) {
        throw new Error('无可获知的快照命令，例如：set / restore / clear');
      }
      // 检测命令
      switch (command) {
        // 设置快照
        case 'set': 
          // 如果存在该属性，则保存快照
          if(~dataKey.indexOf(dataName)){
            // 如果该属性快照不存在，初始化一个
            if(!snapshot.hasOwnProperty(dataName)){
              snapshot[dataName] = {};
            }
            const value = vm[dataName];
            const json = {};
            json[dataName] = value;
            snapshot[dataName][version] = JSON.parse(JSON.stringify(json))[dataName];
          }else {
            throw new Error('不存在的属性名，无法设置快照');
          }
          break;
        // 提取快照
        case 'restore': 
          if(~dataKey.indexOf(dataName)){
            if(!snapshot.hasOwnProperty(dataName) || !snapshot[dataName].hasOwnProperty(version)) {
              console.warn(`版本号为'${version}'的属性'${dataName}'未曾设置过快照`);
            }else {
              const value = snapshot[dataName][version];
              if(typeof value === 'object'){
                Object.keys(value).forEach(key => {
                  vm[dataName][key] = value[key];
                });
              }else {
                vm[dataName] = JSON.parse(JSON.stringify({value})).value;
              }
            }
          }else {
            throw new Error('不存在的属性名，无法提取快照');
          }
          break;
        case 'clear': 
          if(~dataKey.indexOf(dataName)){
            if(!snapshot.hasOwnProperty(dataName) || !snapshot[dataName].hasOwnProperty(version)) {
              console.warn(`版本号为'${version}'的属性${dataName}未曾设置过快照`);
            }else {
              snapshot[dataName] = {};
            }
          }else {
            throw new Error('不存在的属性名，无法提取快照');
          }
          break;
        default:
          break;
      }
    };
  }
}


