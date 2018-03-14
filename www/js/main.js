var app = angular.module('starter');
app.run(function($ionicPlatform,tmhDynamicLocale, $cordovaGlobalization,$cordovaPush,$window,$state,AuthService) {
			//push
			//push
	
		
$ionicPlatform.ready(function() {
  /*document.addEventListener("pause", onPause, false);

function onPause() { //console.log('go to back ground');
//user_id = $scope.sessionuserInfo.accessId;
AuthService.update_online_status(0).then(function(result) { //console.log(result);alert();
     
    }, function(err) {
      
    });
    // Handle the pause event
}
document.addEventListener("resume", onResume, false);

function onResume() { //console.log('fore ground');
AuthService.update_online_status(1).then(function(result) { //console.log(result);alert();
     
    }, function(err) {
      
    });
    // Handle the resume event
}*/
  //alert('open');
  
	/*//push
	var push = PushNotification.init({
    android: {
        senderID: "550184654111"
    },
    browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    },
    ios: {
        alert: "true",
        badge: "true",
        sound: "true"
    },
    windows: {}
});

push.on('registration', function(data) {
    // data.registrationId
	//console.log(data.registrationId);alert();
});

push.on('notification', function(data) {
    // data.message,
    // data.title,
    // data.count,
    // data.sound,
    // data.image,
    // data.additionalData
});

push.on('error', function(e) {alert('error');
    // e.message
});
	//push*/
	// PUSH START ================================================	

if(ionic.Platform.isIOS()){
	window.push = PushNotification.init({
                android: {
                    senderID: "953848896225",
                    forceShow: "true"
                }
            });	


}
else if(ionic.Platform.isAndroid()){
	
		window.push = PushNotification.init({
                android: {
                    senderID: "953848896225",
                    forceShow: "true"
                }
            });	
}

       if(ionic.Platform.isIOS()==true || ionic.Platform.isAndroid()==true){     
            window.push.on('registration', function(data) {
                console.log('got push ==>>> ',data.registrationId);
				$window.localStorage["device_token_id"]=data.registrationId;
               // $rootScope.MyUUid = data.registrationId;
			   
			var deviceInformation = ionic.Platform.device();
			//console.log(deviceInformation);
			//$rootScope.Mydevicetype = deviceInformation.platform.toLowerCase();
			$window.localStorage["Mydevicetype"]=deviceInformation.platform.toLowerCase();
			
            });

            window.push.on('notification', function(data) { //alert();
                console.log('new',data);
                //alert(JSON.stringify(data));
                //$window.localStorage.setItem("push_que",data.additionalData.type);
                if(data.additionalData.type=='chat')
                {
                    $state.go('menu.product_details',{id:data.additionalData.product_id});
                }
                else if(data.additionalData.type=='request')
                {
                   $state.go('menu.request_list',{});
                }
                else if(data.additionalData.type=='acctept')
                {
                   $state.go('menu.product_details',{id:data.additionalData.product_id});
                }
                else if(data.additionalData.type=='decline')
                {
                   $state.go('menu.product_details',{id:data.additionalData.product_id});
                }
               /* else if(data.additionalData.type=='second min auction')
                {
                    $state.go('user.home');
                }
                else if(data.additionalData.type=='free bid')
                {
                    $state.go('user.home');
                }
                else if(data.additionalData.type=='won auction')
                {
                    $state.go('user.won_auction');
                }
                else if(data.additionalData.type=='lost auction')
                {
                    $state.go('user.closeauction');
                }*/
                push.finish();
                // data.message,
                // data.title,
                // data.count,
                // data.sound,
                // data.image,
                // data.additionalData
            });
	   }
	// END OF PUSH ===================================================
   
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
  });
});
app.config(function ($ionicConfigProvider,tmhDynamicLocaleProvider, $translateProvider) {
$ionicConfigProvider.views.maxCache(0);

}); 

app.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
          // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
         // FastClick.attach(document.body);

        // Set some reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // GLOBAL APP SCOPE
     
       
		//$rootScope.serviceurl = "http://localhost/osclass/webservice/";
		//$rootScope.serviceurl = "http://104.131.83.218/team6/classified/webservice/";
		//team6/classified
   // $rootScope.serviceurl = "http://104.131.83.218/team6/shoping/";
$rootScope.serviceurl = "http://msbarter.sg/demo/";
    }]);

app.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                //componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val()); 
                    var geoComponents = scope.gPlace.getPlace();
                var latitude = geoComponents.geometry.location.lat();
                var longitude = geoComponents.geometry.location.lng();
                scope.auto_lat = latitude;
                scope.auto_long = longitude;
                
                
                });
            });
        }
    };
});

app.factory('Auth', function () {
   if (window.localStorage['session']) {
      var _user = JSON.parse(window.localStorage['session']);
   }
   var setUser = function (session) {
      _user = session;
      window.localStorage['session'] = JSON.stringify(_user);
   }

   return {
      setUser: setUser,
      isLoggedIn: function () {
         return _user ? true : false;
      },
      getUser: function () {
         return _user;
      },
      logout: function () {
         window.localStorage.removeItem("session");
         window.localStorage.removeItem("list_dependents");
         _user = null;
      }
   }
});
app.directive('googleplace', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, model) {
            var options = {
                types: [],
                //componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                scope.$apply(function () {
                    model.$setViewValue(element.val());
                    var geoComponents = scope.gPlace.getPlace();
                    console.log(geoComponents);
                    var latitude = geoComponents.geometry.location.lat();
                    var longitude = geoComponents.geometry.location.lng();
                    scope.auto_lat = latitude;
                    scope.auto_long = longitude;


                });
            });
        }
    };
});