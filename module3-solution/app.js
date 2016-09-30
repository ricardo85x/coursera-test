(function(){
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective)
  .directive('itemsLoaderIndicator', ItemsLoaderIndicatorDirective);

  function ItemsLoaderIndicatorDirective(){
    var ddo = {
      templateUrl: 'loader/itemsloaderindicator.template.html',
      link: ItemsLoaderIndicatorLinkDirective
    };
    return ddo;
  }

  function ItemsLoaderIndicatorLinkDirective(scope, element){
      scope.$watch('menu.isLoading', function(newValue, oldValue){
        if(newValue == true) {
         element.find('div').css('display', 'block');
       } else {
         element.find('div').css('display', 'none');
       }
      });
  }

  function FoundItemsDirective(){

    var ddo = {
      templateUrl: 'found-items.html',
      scope: {
        found: '<',
        onRemove: '&',
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true,
    };

    return ddo;
  }

  function FoundItemsDirectiveController(){
    var list = this;
    // Just declared, I found no use for this controller on my app
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var menu = this;
    menu.foundItems = [];
    menu.searchTerm = "";
    menu.isLoading = false;
    menu.hasError = false;

    menu.searchItems = function(){
      if(menu.searchTerm.trim() == ""){
        menu.foundItems = [];
        menu.hasError = true
        return;
      }

      menu.isLoading = true;

      var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm)
      promise.then(function(response){
        menu.isLoading = false;
        menu.foundItems = response;
        if(menu.foundItems.length == 0){
          menu.hasError = true;
        } else {
          menu.hasError = false;
        }

      })
      .catch(function(error){
        menu.isLoading = false;
        console.log("Ops!", error)
      })

    };

    menu.removeItem = function(index){
      menu.foundItems.splice(index.index, 1);
      if(menu.foundItems.length == 0){
        menu.hasError = true;
      } else {
        menu.hasError = false;
      }
    }
  }


  MenuSearchService.$inject = ["$http", "ApiBasePath"]
  function MenuSearchService($http, ApiBasePath){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm){
      var response = $http({
        method: "GET",
        url: ApiBasePath + "/menu_items.json"
      })
      .then(function(response){

         var foundItems = [];
         angular.forEach(response.data.menu_items, function(item){
           if(item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1){
             foundItems.push(item)
           }
         });
         return foundItems;
       })

      return response;
    };
  }

})();
