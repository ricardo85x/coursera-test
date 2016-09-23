(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyShoppingController', ToBuyShoppingController)
  .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService){
    var list = this;
    list.items = ShoppingListCheckOffService.getToBuy();
    list.buy = function(idx){
      ShoppingListCheckOffService.buy(idx);
      if(list.items.length == 0){
        list.finish = "Everything is bought!";
      }
    }
  }

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService){
    var list = this;
    list.items = function(){
      var bought_items = ShoppingListCheckOffService.getBought();
      if(bought_items.length == 0){
        list.empty = "Nothing bought yet.";
      } else {
        list.empty = "";
      }
      return bought_items;
    }

  }

  function ShoppingListCheckOffService(){

    var service = this;

    var toBuy = [
      { name: 'cookies', quantity: 8 },
      { name: 'Apples', quantity: 5 },
      { name: 'Coconut', quantity: 2 },
      { name: 'Pizzas', quantity: 2 },
      { name: 'Grapefruit', quantity: 6 },

    ];
    var bought = [];

    service.buy = function(idx){
      bought.push(toBuy.splice(idx, 1)[0]);
    }

    service.getToBuy = function(){
      return toBuy;
    }

    service.getBought = function(){
      return bought;
    }

  }

})();
