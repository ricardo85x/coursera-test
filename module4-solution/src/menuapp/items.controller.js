(function(){
  'use strict';


  angular.module('MenuApp')
  .controller('ItemController',ItemController );

  ItemController.$inject = ['MenuDataService', 'itemsList'];

  function ItemController(MenuDataService, itemsList){
    var itemCtrl = this;
    itemCtrl.items = itemsList.data;
  }


})();
