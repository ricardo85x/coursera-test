(function(){
  'use strict';

  angular.module('MenuApp')
  .controller('CategoryController',CategoryController );

  CategoryController.$inject = ['MenuDataService', 'categoriesList'];

  function CategoryController(MenuDataService, categoriesList){
    var catCtrl = this;
    catCtrl.categoriesList = categoriesList.data;
  }


})();
