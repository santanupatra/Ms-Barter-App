var app = angular.module('starter');
app.controller('signupCtrl', function($scope,$cordovaGeolocation, $state, $ionicPopup, AuthService,$window,$ionicLoading,$q) { //,$cordovaOauth
  $scope.data = {};
  $scope.signup = function(data,loc) {   //console.log(data);alert(); 
  $scope.isDisabled  = false;	
  //data.location = loc.formatted_address;
  //alert(data.location);
  if(data.email == data.cnfemail)
  {
  if(data.password == data.cnfpassword)
  {
      data.name = data.username;
      AuthService.register(data).then(function(response) { //console.log(response);
			$scope.isDisabled  = true;									   
			if(response.ACK==1)
			{ 
				$state.go('login', {}, {reload: true});
				var alertPopup = $ionicPopup.alert({
					title: 'Success!',
					template: 'Registration Success! Please Check Your Registered Email To Login '
				  });
				$scope.isDisabled  = false;	
				$state.go('login', {}, {reload: true});
			}
			else {
        $scope.isDisabled  = false; 
				var alertPopup = $ionicPopup.alert({
					title: 'Unsuccess!',
					template: response.msg
				  });
			}
      
      
    }, function(err) { //console.log(err);alert(err);
        var alertPopup = $ionicPopup.alert({
        title: 'Registration failed!',
        template: 'Some problem occurs'
      });
    });  
}
else
{
  var alertPopup = $ionicPopup.alert({
        title: 'Registration failed!',
        template: 'Password and Confirm password not match'
      });
}
}
else
{
  var alertPopup = $ionicPopup.alert({
        title: 'Registration failed!',
        template: 'Email and Confirm Email not match'
      });
}


  };
  // ============ Sign In =================
  $scope.signin = function(email,password) { 
  //push
  $scope.device_id = $window.localStorage["device_token_id"];

	/*var push = PushNotification.init({
    android: {
        senderID: "953848896225"
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
});*/

//push.on('registration', function(data) {
    // data.registrationId
	//console.log(data.registrationId);alert();
	//$scope.device_id = data.registrationId;
	 var device = ionic.Platform.device();
	 var device_name = device.platform;
	// alert($scope.device_id);
      AuthService.login(email,password,device_name,$scope.device_id).then(function(authenticated) {
      $scope.setCurrentSession(AuthService.getUserInfo()); 
	  
     // console.log(authenticated);alert();
      $state.go('menu.home', {}, {reload: true});
    
	}, function(err) { //console.log(err);alert();
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
//});


	//push
	
  };





   $scope.forget_pass = function(email,password) { 

      AuthService.forget_pass(email).then(function(result) { 



if(result.ACK == 1)
{
       var alertPopup = $ionicPopup.alert({
        title: 'Forgot Password Success!',
        template: 'Please check your email to recover your password . '
      });
      $state.go('login', {}, {reload: true});
 }
 else{
   var alertPopup = $ionicPopup.alert({
        title: 'Forgot Password Faild!',
        template: result.msg
      });
 }   
  }, function(err) { 
      var alertPopup = $ionicPopup.alert({
        title: 'Forgot Password!',
        template: 'This email is not registered!'
      });
    });
  };


  
   $scope.register = function(){ 
  user_id = $scope.sessionuserInfo.accessId;
  if(user_id)
  {
    $state.go('menu.home');
    }
  else
  {
  $state.go('signup');
  }
  };

  
   $scope.forget = function(){
  $state.go('forget');
  };
  $scope.goSignin = function(){
	$state.go('login', {}, {reload: true});
	};
$scope.forget_password = function(email){
	 AuthService.forgetpassword(email).then(function(result) {
    //console.log(result);alert();
	  if(result.ACK == 1)
	  {
		   var alertPopup = $ionicPopup.alert({
        title: 'Mail send',
        template: 'Please check your email to reset your password'
      });
     // console.log(authenticated);alert();
      $state.go('login', {}, {reload: true});
	  }
	  else
	  {
		   var alertPopup = $ionicPopup.alert({
        title: 'Email not exist',
        template: 'Your email is not exist. Please enter registered email..'
      });
	  }
    
	}, function(err) { //console.log(err);alert();
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
	};


//fblogin
var fbLoginSuccess = function () {
            console.log('Success');
            alert('success');
        };

        var fbLoginError = function () {
            console.log('Error');
            alert('error');
        };

var fbLoginSuccess = function (response) {
            if (!response.authResponse) {
                fbLoginError("Cannot find the authResponse");
                return;
            }

            var authResponse = response.authResponse;

            getFacebookProfileInfo(authResponse)
            .then(function (profileInfo) {
                //console.log(profileInfo);
                $scope.fbSubmitWithEmail(profileInfo);
                //        if(profileInfo.email)
                //        {

                //        }
                //        else
                //        {
                //            $scope.need_email = true;
                //            var alertPopup = $ionicPopup.alert({
                //                title: $translate.instant('lang_login_failed'),
                //                template: $translate.instant('lang_email_not_available')
                //              });
                //        }
                //$ionicLoading.hide();
                //$state.go('app.home');
            }, function (fail) {
                // Fail get profile info
                //console.log('profile info fail', fail);
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: fail
                });
            });
        };

        $scope.fbSubmitWithEmail = function (profileInfo) { 
            AuthService.fblogin(profileInfo).then(function (authenticated) { console.log(authenticated);
                if (authenticated.ACK == 1) {
                 // storeUserCredentials(authenticated.users.email);
                $scope.setCurrentSession(AuthService.getUserInfo()); 

                    $state.go('menu.home', {}, {reload: true});
                    $scope.need_email = false;
                } else if (authenticated.ACK == 2) {
                  $scope.setCurrentSession(AuthService.getUserInfo()); 
                    $state.go('menu.edit_profile_social', {}, {reload: true});
                } 
                else if(authenticated.ACK == 3)
                {
                 // storeUserCredentials(authenticated.users.email);
                $scope.setCurrentSession(AuthService.getUserInfo()); 
                  $state.go('menu.home', {}, {reload: true});
                }
                else {
                    if (authenticated.rgisteredUsing == 'fb') {
                        var alertPopup = $ionicPopup.alert({
                            title: $translate.instant('lang_login_failed'),
                            template: $translate.instant('lang_please_use_facebook_login')
                        });
                    } else if (authenticated.rgisteredUsing == 'gp') {
                        var alertPopup = $ionicPopup.alert({
                            title: $translate.instant('lang_login_failed'),
                            template: $translate.instant('lang_please_use_google_login')
                        });
                    } else if (authenticated.rgisteredUsing == 'normal') {
                        var alertPopup = $ionicPopup.alert({
                            title: $translate.instant('lang_login_failed'),
                            template: $translate.instant('lang_please_use_email_password_login')
                        });
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Login faild',
                            template: authenticated.msg
                        });
                    }
                }

                $ionicLoading.hide();
            });
        };

        // This is the fail callback from the login method
        var fbLoginError = function (error) {console.log(error);
            console.log('fbLoginError', error);
            $ionicLoading.hide();
        };

        // This method is to get the user profile info from the facebook api
        var getFacebookProfileInfo = function (authResponse) {
            var info = $q.defer();

            facebookConnectPlugin.api('/me?fields=email,first_name,last_name,gender,picture&access_token=' + authResponse.accessToken, ["public_profile"],
                    function (response) {
                        //console.log(response);
                        info.resolve(response);
                    },
                    function (response) {
                        console.log(response);
                        info.reject(response);
                    }
            );
            return info.promise;
        };

        //This method is executed when the user press the "Login with facebook" button
        $scope.facebookSignIn = function () {
            facebookConnectPlugin.getLoginStatus(function (success) { 
                // Ask the permissions you need. You can learn more about
                // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
                facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
            });
        };

        $scope.flogout = function () {
            facebookConnectPlugin.logout(function () {
                alert('hi');
            });
        };
//end fblogin




$scope.change_password = function(password,oldpassword){
	 user_id = $scope.sessionuserInfo.accessId;
	 AuthService.changepassword(password,oldpassword,user_id).then(function(result) {
    //console.log(result);alert();
	  if(result.ACK == 1)
	  {
		   var alertPopup = $ionicPopup.alert({
        title: 'Password Change',
        template: 'Password change successfully. It effect on next login'
      });
     // console.log(authenticated);alert();
      $state.go('menu.profile', {}, {reload: true});
	  }
	  else
	  {
		   var alertPopup = $ionicPopup.alert({
        title: 'Old password wrong',
        template: 'Please enter your current password..'
      });
	  }
    
	}, function(err) { //console.log(err);alert();
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
	};

 $scope.twitterSignIn = function(){
     
     
     
     
     
          TwitterConnect.login(
  function(result) {
    TwitterConnect.showUser(
  function(result1) {

            AuthService.twitterlogin(result1).then(function (authenticated) { //console.log(authenticated);
                if (authenticated.ACK == 1) {
                 // storeUserCredentials(authenticated.users.email);
                
$scope.user_type =   $scope.sessionuserInfo.user_type;
                    $state.go('menu.home', {}, {reload: true});
                    $scope.need_email = false;
                } else if (authenticated.ACK == 2) {
                    $scope.user_type =   $scope.sessionuserInfo.user_type;
                    $state.go('menu.edit_profile_social', {}, {reload: true});
                } 
                else if(authenticated.ACK == 3)
                {
                 // storeUserCredentials(authenticated.users.email);
                $scope.user_type =   $scope.sessionuserInfo.user_type;
                  $state.go('menu.home', {}, {reload: true});
                }
                else {
                    if (authenticated.rgisteredUsing == 'fb') {
                        var alertPopup = $ionicPopup.alert({
                            title: $translate.instant('lang_login_failed'),
                            template: $translate.instant('lang_please_use_facebook_login')
                        });
                    } else if (authenticated.rgisteredUsing == 'gp') {
                        var alertPopup = $ionicPopup.alert({
                            title: $translate.instant('lang_login_failed'),
                            template: $translate.instant('lang_please_use_google_login')
                        });
                    } else if (authenticated.rgisteredUsing == 'normal') {
                        var alertPopup = $ionicPopup.alert({
                            title: $translate.instant('lang_login_failed'),
                            template: $translate.instant('lang_please_use_email_password_login')
                        });
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'login faild',
                            template: 'Login faild please try again'
                        });
                    }
                }

                $ionicLoading.hide();
            });
        
    /*console.log('User Profile:');
    console.log(result1);
    console.log('Twitter name :'+result1.name);
     console.log('Twitter location :'+result1.location);
      console.log('Twitter image :'+result1.profile_image_url);
      console.log('Twitter id :'+result1.id);*/
  }, function(error) {
    console.log('Error retrieving user profile');
    console.log(error);
  }
);

    console.log('Successful login!');
    console.log(result);
  }, function(error) {
    console.log('Error logging in');
    console.log(error);
  }
);
        };
$scope.cms_terms = function(id){ 
 var id = id;   
   
 AuthService.cms(id).then(function(result) { 
    $scope.val = result.cms;
    console.log(result.cms);
     var alertPopup = $ionicPopup.alert({
        title: $scope.val.CmsPage.page_title,
        template: $scope.val.CmsPage.page_description
      });
      //$state.go('menu.search');
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No CMS found'
      });
    });
};


$scope.city_list = function(){ 
    
  
    AuthService.city_list().then(function(result) { //console.log(result);alert();
         //$scope.header_name = 'Style';
         $scope.city = result.city;
       }, function(err) {
         var alertPopup = $ionicPopup.alert({
           title: 'False',
           template: 'No city found'
         });
       });
   
   };
});




