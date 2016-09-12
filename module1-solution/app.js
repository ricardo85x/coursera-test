(function(){
  'use strict';

  angular.module('Module1App', [])
  .controller('LunchController', LunchController) {

    LunchController.$inject = "$scope";

    function LunchController($scope) {

      $scope.foods = "";

      $scope.checkFood = function(){

        $scope.foods = $scope.foods.trim();

        var items = $scope.foods.split(",")

        alert(item.length);

      };
    };

  };

})();
