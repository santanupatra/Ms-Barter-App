 angular.module('starter')
.controller('AppCtrl', function($scope, $state, $ionicSideMenuDelegate,AuthService, $ionicPopup,$ionicHistory,$location ) {
    $scope.sessionuserInfo = AuthService.getUserInfo() ;
   
    
    
    $scope.toggleLeft  = function() {
     $ionicSideMenuDelegate.toggleLeft();
    };
    
    $scope.myGoBack = function() {
     $backView = $ionicHistory.backView();
     $backView.go();
    }; 
    $scope.go = function ( path ) {
	       $location.path( path );
    };
   
    

    $scope.setCurrentSession = function(sinfo) {
    $scope.sessionuserInfo = sinfo ;
    };

    $scope.destroyCurrentSession = function() {
    $scope.sessionuserInfo = '' ;
    };

     $scope.logout123 = function() { //alert();
	user_id = $scope.sessionuserInfo.accessId;	 
      AuthService.logout(user_id);
      $scope.destroyCurrentSession();
      $ionicHistory.clearCache();
      $state.go('menu.home', null, {reload: true});
       $ionicSideMenuDelegate.toggleLeft(false); // close
  };
  

$scope.myGoBack = function() {
    $ionicHistory.goBack();
  };

});