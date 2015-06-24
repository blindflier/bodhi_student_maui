'use strict';

describe('Service: StorageService', function() {


  // instantiate service
  var storageService;
  beforeEach(inject(function(_StorageService_) {
    storageService = _StorageService_;
    try{
      storageService.remove('str');
      storageService.remove('token');
    }
    catch(e){
    }
  }));

  it('服务对象应该正确创建', function() {
    expect(!!storageService).toBe(true);
  });

  it('不存在的键应该返回FALSE', function() {
    expect(storageService.get('token')).toBeFalsy();
  });

  it('存入的对象和返回的对象应该相等', function() {
    var token = {'a':1,'b':2,'c':'hello'};
    storageService.put('token',token);
    expect(storageService.get('token')).toEqual(token);

    storageService.put('str',"string");
    expect(storageService.get('str')).toEqual("string");
  });

});
