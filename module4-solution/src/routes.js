(function(){
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'src/menuapp/templates/home.template.html'
    })

    .state('categories', {
      url: '/categories',
      template: '<categories list="catCtrl.categoriesList"></categories>',
      controller: 'CategoryController as catCtrl',
      resolve: {
        categoriesList: ['MenuDataService', function (MenuDataService){
          return MenuDataService.getAllCategories();
        }],
      }
    })

    .state('items', {
      url: '/items/{shortName}',
      template: '<items list="itemCtrl.items"></items>',
      controller: 'ItemController as itemCtrl',
      resolve: {
        itemsList: ['MenuDataService', '$stateParams',  function (MenuDataService, $stateParams){
          return MenuDataService.getItemsForCategory($stateParams.shortName);
        }]
      }

    })

  }


})();
