(function(){
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ["$scope"];

  function LunchCheckController($scope) {

    $scope.foods = "";
    $scope.message = "";
    $scope.warn = "";

    $scope.checkFood = function(){

      $scope.foods = $scope.foods.trim();
      var tmpItens = $scope.foods.split(",")

      var items = []
      angular.forEach(tmpItens, function(item){
        var item_trim = item.trim();
        if (item_trim != ""){
          items.push(item_trim)
        }
      });

      if(items.length == 0) {
        $scope.warn = "warning";
        $scope.message = "Please enter data first";
      }else {
        if(items.length < 4){
          $scope.message = "Enjoy!";
        } else {
          $scope.message = "Too much!";
        }
        $scope.warn = "correct";
      }

    };
  };



})();
