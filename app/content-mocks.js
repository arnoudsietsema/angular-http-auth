/**
 * This module is used to simulate backend server for this demo application.
 */
angular.module('content-mocks',['ngMockE2E'])
  .run(function($httpBackend) {

    var authorized = false;
    $httpBackend.whenPOST('auth/login').respond(function(method, url, data) {
      authorized = true;
      return [200];
    });
    $httpBackend.whenPOST('auth/logout').respond(function(method, url, data) {
      authorized = false;
      return [200];
    });
    
    
    $httpBackend.whenPOST('data/public').respond(function(method, url, data) {
      if(Math.round((Math.random())) == 1){
        return [200,'I have received and processed your data [' + data + '].'];
    		} else {
    			return [500,'Error occurred with public data'];
    		}
    });
    $httpBackend.whenPOST('data/protected').respond(function(method, url, data) {
    	if(authorized){
    		if(Math.round((Math.random())) == 1){
        		return [200,'This is confidential [' + data + '].'];
    		} else {
    			return [500,'Error occurred with confidential data'];
    		}
        } else {
          return [401];
        }
    });

    //otherwise

    $httpBackend.whenGET(/.*/).passThrough();

  });
