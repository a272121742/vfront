/**
 * lokijs为同步写法的数据，但浏览器刷新后无法实现数据永久缓存
 * 如果希望数据可以缓存，选用rxdb、nedb、minimongo，这三种数据库内置indexDB和localstorage的接口，但暂未尝试是否能永久存储
 * https://github.com/techfort/LokiJS/wiki
 */
import Loki from 'lokijs';

const db = new Loki('browser_testing.db', {
  env: 'BROWSER',
  autoload: true,
  autosave: true,
  adapter: new Loki.LokiMemoryAdapter()
});


function changeKey (doc){
  doc.id = doc.$loki;
  return doc;
}
/**
 * CDB采用NoSQL类型，可以随意存取
 * 链接到name表，如果存在则直接连接，反之创建
 * @param {*} name 表名
 */
function link (name, baseData) {
  if(!name){
    throw new Error('table name must be required');
  }
  const collectionNames = db.listCollections() || [];
  if (!~collectionNames.findIndex(collection => collection.name === name)) {
    db.addCollection(name);
  }
  const table = db.getCollection(name);
  if (baseData && Array.isArray(baseData) && baseData.length >= 0) {
    table.insert(baseData);
  }
  const apis =  {
    insert (docs) {
      if(!docs){
        return void(0);
      }
      if(Array.isArray(docs)){
        return table.insert(docs).map(doc => {
          return changeKey(doc);
        });
      } else {
        let doc = table.insert(docs);
        return changeKey(doc);
      }
    },
    remove (id) {
      const doc = table.get(id);
      if (doc) {
        return table.remove(doc);
      }
      return void(0);
    },
    update (id, newdoc) {
      const doc = table.get(id);
      if (doc) {
        for(let key in doc){
          if(newdoc.hasOwnProperty(key)){
            doc[key] = newdoc[key];
          }
        }
        return table.update(doc);
      }
      return void(0)
    },
    findById (id) {
      const doc = table.get(id);
      return doc ? changeKey(doc) : void(0);
    },
    find (query = {}) {
      const docs = table.find(query);
      return docs.map(doc => {
        return changeKey(doc);
      })
    }
  };
  return apis;
}

export default {
  link
};
