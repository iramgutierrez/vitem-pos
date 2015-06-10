/**
* pos Module
*
* Description
*/
angular.module('pos.services', [])
	.factory('POSService', ['$http', '$q', '$filter' ,'$rootScope' , function ($http, $q , $filter , $rootScope) {

      //var normalize = $filter('normalize');      

      function getAllPayTypes() {
        var deferred = $q.defer();

        $http.get($rootScope.WSUrl+'POS/getAllPayTypes')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      }     

      function getAllSaleTypes() {
        var deferred = $q.defer();

        $http.get($rootScope.WSUrl+'POS/getAllSaleTypes')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      } 

      function getProduct(key , store_id) {
        var deferred = $q.defer();

        $http.get($rootScope.WSUrl+'POS/getProduct?key='+key+'&store_id='+store_id)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      }

      function getPack(key , store_id) {
        var deferred = $q.defer();

        $http.get($rootScope.WSUrl+'POS/getPack?key='+key+'&store_id='+store_id)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      }

      function getClient(id) {
        var deferred = $q.defer();

        $http.get($rootScope.WSUrl+'POS/getClient?id='+id)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      }

      function getNextSheet() { 
        var deferred = $q.defer();

        $http.get($rootScope.WSUrl+'POS/getNextSheet')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      }

      return {
        getAllPayTypes : getAllPayTypes,
        getAllSaleTypes : getAllSaleTypes,
        getProduct : getProduct,
        getNextSheet : getNextSheet,
        getPack : getPack,
        getClient : getClient
      };

    }]);