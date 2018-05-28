import cdb from '@/lib/cdb';

/**
 * 一个测试文件包含多个测试组Suite，即describe定义的；
 * 一个测试组包含多个测试规格Specs
 * 一个测试规格包含多个断言Expect
 */
describe('testing cdb.js', () => {
  it('import client db from cdb.js', () => {
    // cdb是一个对象
    expect(cdb).to.be.an('object');
    // cdb有且只包含一个link属性
    expect(cdb).to.have.all.keys(['link']);
    // link是一个函数
    expect(cdb.link).to.be.a('function');
  });
  it('create table named test', () => {
    // 连接数据库
    const testDB = cdb.link('test');
    const testDBCopy = cdb.link('test');
    // 数据表是一个对象
    expect(testDB).to.be.an('object');
    // 数据表拥有以下五个方法
    expect(testDB).to.have.all.keys(['insert', 'remove', 'update', 'findById', 'find']);
    expect(testDB.insert).to.be.a('function');
    expect(testDB.remove).to.be.a('function');
    expect(testDB.update).to.be.a('function');
    expect(testDB.findById).to.be.a('function');
    expect(testDB.find).to.be.a('function');
    // // 副本和原本是同一个对象
    // expect(testDB).to.be.equal(testDBCopy);
    const otherDB = cdb.link('newTest');
    expect(otherDB).to.not.be.equal(testDB);
  });
  it('create table with empty name', () => {
    expect(cdb.link).to.be.throw('table name must be required'); 
  });
  it('create table with base datas', () => {
    const testDB = cdb.link('test');
    const dbSize = testDB.find().length;
    const baseData = [{name: 'base1'}, {name: 'base2'}];
    const testDBCopy = cdb.link('test', baseData);
    const dbSizeAfter = testDBCopy.find().length;
    expect(dbSize).to.be.equal(dbSizeAfter - baseData.length);
  });
  it('insert empty data', () => {
    const db = cdb.link('test');
    const dbSize = db.find().length;
    expect(db.insert()).to.be.undefined;
    expect(db.find({})).to.have.lengthOf(dbSize);
  });
  it('insert single data', () => {
    const db = cdb.link('test');
    const dbSize = db.find({}).length;
    const data = {name: 'test'};
    const returnKeys = Object.keys(data).concat(['$loki', 'id']);
    const insertObj = db.insert({name: 'test'});
    expect(insertObj).to.be.an('object');
    expect(insertObj).to.have.any.keys(returnKeys);
    expect(insertObj.$loki === insertObj.id).to.be.true;
    expect(db.find({})).to.have.lengthOf(dbSize + 1);
  });
  it('insert muilt datas', () => {
    const db = cdb.link('test');
    const dbSize = db.find({}).length;
    const datas = [{name: 'test1'}, {name: 'test2'}, {name: 'test3'}];
    const returnKeys = Object.keys(datas[0]).concat(['$loki', 'id']);
    const insertObjs = db.insert(datas);
    expect(insertObjs).to.be.an('array');
    expect(insertObjs).to.have.lengthOf(datas.length);
    insertObjs.forEach((insertObj, index) => {
      expect(insertObj).to.be.an('object');
      expect(insertObj).to.have.any.keys(returnKeys);
      expect(insertObj.$loki === insertObj.id).to.be.true;
    });
    expect(db.find({})).to.have.lengthOf(dbSize + datas.length);
  });
  it('remove single data', () => {
    const db = cdb.link('test');
    const dbSize = db.find({}).length;
    const data = {name: 'test'};
    const insertObj = db.insert(data);
    const removeObj = db.remove(insertObj.id);
    expect(removeObj).to.be.an('object');
    expect(removeObj).to.be.equal(insertObj);
    expect(db.find({}).length).to.be.equal(dbSize);
  });
  it('remove empty data', () => {
    const db = cdb.link('test');
    const dbSize = db.find({}).length;
    const removeObj = db.remove(0);
    expect(removeObj).to.be.undefined;
    expect(db.find({}).length).to.be.equal(dbSize);
    expect(db.remove).to.be.throw('Passed id is not an integer');
  });
  it('update single data', () => {
    const db = cdb.link('test');
    const dbSize = db.find({}).length;
    const data = {name: 'test'};
    const returnKeys = Object.keys(data).concat(['$loki', 'id']);
    const newData = {name: 'newTest'};
    const insertObj = db.insert(data);
    const updateObj = db.update(insertObj.id, newData);
    expect(updateObj).to.be.an('object');
    expect(updateObj).to.have.any.keys(returnKeys);
    expect(updateObj.name).to.be.equal(newData.name);
  });
  it('update empty data', () => {
    const db = cdb.link('test');
    expect(db.update).to.be.throw('Passed id is not an integer');
    const updateObj = db.update(0);
    expect(updateObj).to.be.undefined;
  });
  it('find by id where exist', () => {
    const db = cdb.link('test');
    const dbSize = db.find({}).length;
    const data = {name: 'test'};
    const returnKeys = Object.keys(data).concat(['$loki', 'id']);
    const insertObj = db.insert({name: 'test'});
    const findObj = db.findById(insertObj.id);
    expect(findObj).to.be.an('object');
    expect(findObj.id === insertObj.id).to.be.equal;
  });
  it('find by id where empty', () => {
    const db = cdb.link('test');
    const dbSize = db.find({}).length;
    const findObj = db.findById(0);
    expect(findObj).to.be.undefined;
    expect(db.findById).to.be.throw('Passed id is not an integer');
  });
  it('find muilt datas', () => {
    const db = cdb.link('test');
    const dbSize = db.find({}).length;
    const findObjs = db.find({});
    expect(findObjs).to.be.an('array');
    expect(findObjs.length).to.be.equal(dbSize);
  })
});

