var app = angular.module('starter');
app.controller('homeCtrl', function($location,$window,$ionicSideMenuDelegate,$ionicHistory,$ionicModal,$ionicPlatform,$scope, $state,$stateParams, $ionicPopup, AuthService,$window,$ionicLoading,$q,$ionicSlideBoxDelegate,$cordovaCamera, $cordovaFile, $cordovaFileTransfer,$cordovaDevice, $cordovaActionSheet,$rootScope,$cordovaGeolocation,$timeout,$interval,$ionicScrollDelegate,$translate,$cordovaDevice,$cordovaSocialSharing,$http,$cordovaImagePicker) { //,$cordovaOauth
  
 
 
$scope.fb = function(link){ 
 window.plugins.socialsharing.share(null, null, null,link);
};

$scope.productImages_path  = [];
  $scope.is_fav = 1;
      $scope.is_sold = 0;
      
      $scope.cat_id='';
      $scope.style_id='';
      $scope.search='';
      $scope.chosenPlace='';
      $scope.min_value='';
      $scope.max_value='';
 $scope.productImages = [];
// toArr, ccArr and bccArr must be an array, file can be either null, string or array
  

 //language 
 //device type
 /*ionic.Platform.ready(function() {
    var device = ionic.Platform.device();
    console.log(device.platform);
  });*/
//
$scope.hedttl = 0;
    $scope.serbar = 1;
$scope.serch_bar = function(){
  if($scope.serbar==1)
  {

    $scope.hedttl = 1;
    $scope.serbar = 0;
  }
  else
  {  
     /*window.setTimeout(function() {
           
        }, 1000);*/
      
     $scope.hedttl = 0;
    $scope.serbar = 1;
  }
};  
$scope.serch_bar1 = function(){ 
  if($scope.serbar==1)
  {

    $scope.hedttl = 1;
    $scope.serbar = 0;
  }
  else
  {  
     /*window.setTimeout(function() {
           
        }, 1000);*/
     $scope.hedttl = 0;
    $scope.serbar = 1;
  }
};
$scope.minZoom =1;
$scope.onSlideMove = function(data){ 

//alert("You have selected " + data.index + " tab");
};
setTimeout(function(){
      $ionicSlideBoxDelegate.update();
  },1000);
$scope.updateSlideStatus = function(slide){ 
 
//var ZoomFactor =$ionicScrollDelegate.getScrollPosition().zoom;
var ZoomFactor = 5;
console.log(ZoomFactor);


  //var ZoomFactor = '';// $ionicSlideBoxDelegate.$getByHandle('scrollHandle' +slide).getScrollPosition().zoom;
  if(ZoomFactor == $scope.minZoom)
  {
     $ionicSlideBoxDelegate.enableSlide('false');
  }
  else
  {
     $ionicSlideBoxDelegate.enableSlide('false');
  }
};


$scope.getchatlist = function(){
   //alert(product_id);
   //alert(seller_id);
   user_id = $scope.sessionuserInfo.accessId; 
   
if(!user_id)
{
  $sds = JSON.parse($window.localStorage["userInfo"]);
//console.log($sds.accessId);
  user_id = $sds.accessId;
} 



//alert($scope.seller_id);
//alert($scope.product_id);
AuthService.get_chat_list(user_id).then(function(result) { //console.log(result);alert();
     
    
    $scope.header_name = 'Home';
    $scope.chat_list = result.chat_list;
     // $scope.user_c = result.user_details;
//      $scope.chat_result = result.chat;
//     $scope.details_product = result.product;
//      $scope.showdiv = 1;
//      console.log($scope.user);
    }, function(err) {
//      var alertPopup = $ionicPopup.alert({
//        title: $translate.instant('False'),
//        template: $translate.instant('No details found')
//      });
    }) 
};




$scope.getchat = function(product_id,seller_id){
   //alert(product_id);
   //alert(seller_id);
   user_id = $scope.sessionuserInfo.accessId; 
   
if(!user_id)
{
  $sds = JSON.parse($window.localStorage["userInfo"]);
//console.log($sds.accessId);
  user_id = $sds.accessId;
} 

//alert(user_id);
$scope.product_id = product_id;
$scope.seller_id = seller_id;

//alert($scope.seller_id);
//alert($scope.product_id);
AuthService.get_chat(product_id,user_id,seller_id).then(function(result) { //console.log(result);alert();
     
    
    $scope.header_name = 'Home';
     // $scope.user_c = result.user_details;
      $scope.chat_result = result.chat;
     $scope.details_product = result.product;
      $scope.showdiv = 1;
//      console.log($scope.user);
    }, function(err) {
//      var alertPopup = $ionicPopup.alert({
//        title: $translate.instant('False'),
//        template: $translate.instant('No details found')
//      });
    }) 
};
$scope.close_chat = function(){ 
    $state.reload();
    $scope.showdiv = 0;
};
$scope.chat_open = function(){ alert();
    $scope.showme=true;
};
  //POP UP comment
 $scope.go_chat = function(product_id) { alert(product_id);
   $scope.data = {}
   //console.log($scope.sessionuserInfo);alert(data.i_name);
   $scope.data.user_name = $scope.sessionuserInfo.name ;
   $scope.data.user_email = $scope.sessionuserInfo.emailId ;
   $scope.data.txtv = '';
   var user_id = $scope.sessionuserInfo.accessId;
  // alert(user_id);
   $scope.product_id = data.i_id;
   if(user_id)
   {
	    $scope.data.user_id = user_id;
	  var tmp = '<input type="hidden" ng-model="data.user_name"><input type="hidden" ng-model="data.user_id"> <input type="hidden" ng-model="data.user_email"> <br><input type="hidden" ng-model="data.user_mobile"> <br> {{"Your"|translate}} {{"Message"|translate}}<textarea rows="5" ng-model="data.txtv"></textarea>';  
	}
   else
   {
	     $scope.data.user_id = '';
   var tmp = 'message<textarea rows="5" ng-model="data.txtv"></textarea>'; 
   }
   var myPopup = $ionicPopup.show({
     template: tmp,
     title: 'Chat',
     subTitle: '',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: 'Send',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.txtv) {
			   var alertPopup = $ionicPopup.alert({
       title: 'Error',
       template: 'All_filelds_are_mandatery'
     });
     alertPopup.then(function(res) {
      // console.log('Thank you for Comments');
     });
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           }  else if (!$scope.data.user_name) {
			   var alertPopup = $ionicPopup.alert({
       title: 'Error',
       template: 'All_filelds_are_mandatery'
     });
     alertPopup.then(function(res) {
      // console.log('Thank you for Comments');
     });
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           }else if (!$scope.data.user_email) {
			   var alertPopup = $ionicPopup.alert({
       title: 'Error',
       template: 'All_filelds_are_mandatery'
     });
     alertPopup.then(function(res) {
      // console.log('Thank you for Comments');
     });
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           }else {   
		    $scope.data.product = data.i_id;
                    $scope.data.user_mobile='';
			$scope.data.seller_id = data.user_id;
			$scope.data.product = data.i_name;
			var data1 = $scope.data;
			//console.log(data1);alert();
        AuthService.comment_product(data1,data.i_id).then(function(result) {  
		 console.log(result);
          if(result.ACK === 1)  {
			  $scope.data.user_name = '';
			  $scope.data.user_email = '';
			  $scope.data.user_mobile = '';
			  AuthService.get_comment_product(data.i_id).then(function(result) {
  //console.log(result);alert();
   $scope.comment = result.data;
   }, function(err) {
            console.log(err);
        });
             var alertPopup = $ionicPopup.alert({
       title: 'Success',
       template: 'Comment_on_this_product_success'
     });	
				
         } 
        }, function(err) {
            console.log(err);
        }); 
             return $scope.data.wifi;
           }
         }
       },
     ]
   });
   
  /* myPopup.then(function(res) {
     console.log('Tapped!', res);
   });*/
   
  };

$scope.logout = function() { 
  user_id = $scope.sessionuserInfo.accessId;   
      
       AuthService.logout1(user_id).then(function(result) { //console.log(result);
      $scope.destroyCurrentSession();
      $ionicHistory.clearCache();
      $state.go('menu.home', null, {reload: true});
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: $translate.instant('False'),
        template: $translate.instant('not logout')
      });
    });
      
  };
$scope.product_zoom =function(index,images){
  $scope.activeSlide = index;
  $scope.all_image = images;
  $scope.showmodal('templates/image_template.html');
};
$scope.showmodal =function(url){
$ionicModal.fromTemplateUrl(url,{
  scope:$scope
}).then(function(modal){
  $scope.modal =modal;
  $scope.modal.show();
});
};
  // ============ Sign In =================
 /*q $scope.signin = function(data) {
	  alert($scope.device_id);
      AuthService.login(data).then(function(authenticated) {
      $scope.setCurrentSession(AuthService.getUserInfo()); 
	  
     // console.log(authenticated);
      $state.go('menu.timeline', {}, {reload: true});
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: $translate.instant('Login_failed'),
        template: $translate.instant('Please_check_credential')
      });
    });
  };*/
  $scope.go_home = function()
  {
	setTimeout(function(){
    $scope.header_name = 'Home';
       $state.go('menu.home', {}, {reload: true});
  },2000);  
 }
 $scope.refersh_home = function()
 {
  $scope.header_name = 'Home';
  $state.go('menu.home', {}, {reload: true});
 }
  
 $scope.go_search = function(id,type){
     
     $state.go('menu.search', {'id':id,'type':type}, {reload: true}); 
 }; 
 
 $scope.go_adv_search = function(id,type){
     
     $state.go('menu.adv_search', {}, {reload: true}); 
 };
  $scope.goSignin1 = function(){ 
  user_id = $scope.sessionuserInfo.accessId;
  if(user_id)
  {
	  $state.go('menu.home');
    
	  }
  else
  {
	$state.go('login');
  }
	};


$scope.goSigninup = function(){ 
  user_id = $scope.sessionuserInfo.accessId;
  if(user_id)
  {
    $state.go('menu.profile');
    
    }
  else
  {
  $state.go('signup');
  }
  };



$scope.userdetails_int = function(){ 
user_id = $scope.sessionuserInfo.accessId; 
if(!user_id)
{
  $sds = JSON.parse($window.localStorage["userInfo"]);
//console.log($sds.accessId);
  user_id = $sds.accessId;
} 

//alert(user_id);
AuthService.user_profile_int(user_id).then(function(result) { //console.log(result);alert();
      $scope.header_name = 'Home';
      $scope.user_c = result.user_details;
      $scope.user_p = result.user_details;
      //console.log($scope.user_p);
    }, function(err) {
//      var alertPopup = $ionicPopup.alert({
//        title: $translate.instant('False'),
//        template: $translate.instant('No details found')
//      });
    });
 };

  
$scope.get_notification = function(){
    
    user_id = $scope.sessionuserInfo.accessId; 
if(!user_id)
{
  $sds = JSON.parse($window.localStorage["userInfo"]);
//console.log($sds.accessId);
  user_id = $sds.accessId;
} 

//alert(user_id);
AuthService.get_notification(user_id).then(function(result) { //console.log(result);alert();
      $scope.header_name = 'Notification';
      $scope.notification = result.notification;
     // console.log($scope.user);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: $translate.instant('False'),
        template: $translate.instant('No notification found')
      });
    });
    
};

	$scope.logout = function() { 
  user_id = $scope.sessionuserInfo.accessId;   
      
       AuthService.logout(user_id).then(function(result) { //console.log(result);
      $scope.destroyCurrentSession();
      $ionicHistory.clearCache();
      $state.go('menu.home', null, {reload: true});
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: $translate.instant('False'),
        template: $translate.instant('not logout')
      });
    });
      
  };
 $scope.chat = function(friend_id){ 
 
	 user_id = $scope.sessionuserInfo.accessId;
	 if(friend_id == user_id)
	 {
		 var alertPopup = $ionicPopup.alert({
        title: $translate.instant('Own_Product'),
        template: $translate.instant('Own_Product_msg')
      }); 
	 }
	 else if(user_id )
	 {
		  $state.go('menu.chat', {id:friend_id}, {reload: true});
	 }
	 else
	 {
		 var alertPopup = $ionicPopup.alert({
        title: $translate.instant('Login'),
        template: $translate.instant('Please_Login_First')
      }); 
	}
	
	 //$state.go('menu.chat', {id:friend_id}, {reload: true});
	//$state.go('menu.chat');
	};


$scope.chat_list = function(){ 
	 $state.go('menu.chat_list');
	//$state.go('menu.chat');
	};


   

$scope.login_check = function(){
	 user_id = $scope.sessionuserInfo.accessId;
	 if(user_id )
	 {
		 $state.go('menu.addpost',{},{reload: true});
	 }
	 else
	 {
		 var alertPopup = $ionicPopup.alert({
        title: $translate.instant('Login'),
        template: $translate.instant('Please_Login_First')
      }); 
	}
	};
 
$scope.goedit = function(){ 
  $state.go('menu.profile', {}, {reload: true});
};


$scope.update_profile = function(user){

AuthService.update_profile(user).then(function(result) { console.log(result);
      $scope.header_name = 'Home';
      $scope.user = user;
      //console.log($scope.user);
      var alertPopup = $ionicPopup.alert({
        title: 'True',
        template: 'Profile updated successfully'
      });
    }, function(err) { console.log(err);
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'profile not up'
      });
    });

};

$scope.userdetails = function(){  
user_id = $scope.sessionuserInfo.accessId;
if(!user_id)
{
  $sds = JSON.parse($window.localStorage["userInfo"]);
//console.log($sds.accessId);
  user_id = $sds.accessId;
} 

//alert(user_id);
AuthService.user_profile(user_id).then(function(result) { //console.log(result);
      $scope.header_name = 'Home';
      $scope.user = result.user_details;
      console.log($scope.user);
    }, function(err) { console.log(err);
      var alertPopup = $ionicPopup.alert({
        title: $translate.instant('False'),
        template: $translate.instant('No user found')
      });
    });
 };
////

$scope.goproductedit = function(id){ 
  $state.go('menu.edit_product', {'id':id}, {reload: true});
};


$scope.update_product = function(user){

AuthService.update_profile(user).then(function(result) { console.log(result);
      $scope.header_name = 'Home';
      $scope.user = user;
      //console.log($scope.user);
      var alertPopup = $ionicPopup.alert({
        title: 'True',
        template: 'Profile updated successfully'
      });
    }, function(err) { console.log(err);
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'profile not up'
      });
    });

};
$scope.product_edit_details = function(){ 
 var id = $stateParams.id;   
  user_id = $scope.sessionuserInfo.accessId;  
 AuthService.product_details_edit(id).then(function(result) { //console.log(result);alert();
      
     $scope.ratingsObject1 = {
        iconOn : 'ion-ios-circle-filled',
        iconOff : 'ion-ios-circle-outline',
        iconOnColor: '#e65b95',
        iconOffColor:  'rgb(200, 100, 100)',
        rating:  result.product.item_condition,
        minRating:0,
        max:10,
        callback: function(rating) {
          $scope.ratingsCallback(rating);
        }
      };
    
    
   $scope.ratingsCallback = function(rating) {  //alert(rating);
	  $scope.item_condition = rating;
          //alert($scope.item_condition);
        console.log('Selected rating is : ', rating);
      };
     $scope.header_name = 'Product Search';
      $scope.product = result.product;
      $scope.cat_id = result.product.category_id;
      $scope.chosenPlace = result.product.location;
      $scope.find_sub_category($scope.cat_id);
      //$state.go('menu.search');
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No product found'
      });
    });
};

////

$scope.category_list = function(){  
    
    $scope.ratingsObject1 = {
        iconOn : 'ion-ios-circle-filled',
        iconOff : 'ion-ios-circle-outline',
        iconOnColor: '#e65b95',
        iconOffColor:  'rgb(200, 100, 100)',
        rating:  0,
        minRating:0,
        max:10,
        callback: function(rating) {
          $scope.ratingsCallback(rating);
        }
      };
    
    
   $scope.ratingsCallback = function(rating) {  //alert(rating);
	  $scope.item_condition = rating;
          //alert($scope.item_condition);
        console.log('Selected rating is : ', rating);
      }; 
//alert(user_id);
AuthService.category_list().then(function(result) { //console.log(result);
      $scope.header_name = 'Home';
      $scope.category = result.category;
      $scope.style = result.style;
      $scope.currency = result.currency;
      //console.log( $scope.currency);
    }, function(err) { console.log(err);
      var alertPopup = $ionicPopup.alert({
        title: $translate.instant('False'),
        template: $translate.instant('No category found')
      });
    });
 };


$scope.find_sub_category = function(cat_id){  
//alert(cat_id);
AuthService.sub_category_list(cat_id).then(function(result) { //console.log(result);
      $scope.header_name = 'Home';
      $scope.product_sub_category = result.category;
      
      console.log( $scope.sub_category);
    }, function(err) { console.log(err);
      var alertPopup = $ionicPopup.alert({
        title: $translate.instant('False'),
        template: $translate.instant('No category found')
      });
    });
 };


//favourite
$scope.add_favourite = function(id){ 
 user_id = $scope.sessionuserInfo.accessId;

  if(user_id)
  {
	  AuthService.add_favourite(user_id,id).then(function(result) { //console.log(result);alert();
     if(result.ACK == 1)
       {
           var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: 'Product add to favorite'
      });
          $scope.products = result.product;
          //$scope.myproduct_fav_list();
          //$state.go('menu.public_profile',{},{reload: true});
          
        }
     else
        {
          //alert(result.ACK);
        }
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'Product not add to favorite'
      });
    });
}
  else
  {
	var alertPopup = $ionicPopup.alert({
        title: 'Login',
        template:'Please Login First'
      }); 
  }
};





$scope.remove_favourite = function(id){ 
 user_id = $scope.sessionuserInfo.accessId;

  if(user_id)
  {
	  AuthService.remove_favourite(user_id,id).then(function(result) { //console.log(result);alert();
     if(result.ACK == 1)
       {
           var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: 'Product remove from favorite'
      });
          $scope.products = result.product;
          //$scope.myproduct_fav_list();
        }
     else
        {
          //alert(result.ACK);
        }
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'Product not add to favorite'
      });
    });
}
  else
  {
	var alertPopup = $ionicPopup.alert({
        title: 'Login',
        template: 'Please_Login_First'
      }); 
  }
};


//request
$scope.product_request_rq = function(id,seller_id){
    
 user_id = $scope.sessionuserInfo.accessId;

  if(user_id)
  {
	  AuthService.product_request(user_id,id,seller_id).then(function(result) { //console.log(result);alert();
     if(result.ACK == 1)
       {
           var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: 'Product request successfully'
      });
          $scope.products = result.product;
        }
     else
        {
          //alert(result.ACK);
        }
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'Product not requestd'
      });
    });
}
  else
  {
	var alertPopup = $ionicPopup.alert({
        title: 'Login',
        template: 'Please Login First'
      }); 
  }
};


// IMAGE UPLOAD Profile
 
 $scope.loadImage_p = function() { 
  var options = {
    title: 'select image',
    buttonLabels: ['Load from library', 'camera'],
    addCancelButtonWithLabel: 'Cancel',
    androidEnableCancelButton : true,
  };
  $cordovaActionSheet.show(options).then(function(btnIndex) {
    var type = null;
    if (btnIndex === 1) {
      type = Camera.PictureSourceType.PHOTOLIBRARY;
    } else if (btnIndex === 2) {
      type = Camera.PictureSourceType.CAMERA;
    }
    if (type !== null) {
      $scope.selectPictures(type);
    }
  });
};
$scope.selectPictures = function(sourceType) {
  var options = {
    quality: 100,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: sourceType,
    correctOrientation: true,
    saveToPhotoAlbum: false
  };
 /*var options = {
  destinationType: Camera.DestinationType.FILE_URI,
        quality: 75,
        targetWidth:720,
        correctOrientation: true,
        encodingType: Camera.EncodingType.JPEG,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
 };*/
  $cordovaCamera.getPicture(options).then(function(imagePath) {
    plugins.crop.promise(imagePath,{quality: 100})
.then(function success (newPath) {  
    imagePath = newPath ;         
    // Grab the file name of the photo in the temporary directory
    var currentName = imagePath.replace(/^.*[\\\/]/, '');
 //var currentName1 = newPath.replace(/^.*[\\\/]/, '');
 //console.log(currentName);
 //console.log(currentName1);
    //Create a new name for the photo
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
 
    // If you are trying to load image from the gallery on Android we need special treatment!
    if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) { //alert('camera');
      window.FilePath.resolveNativePath(imagePath, function(entry) { //alert(entry);
        window.resolveLocalFileSystemURL(entry, success, fail);
        function fail(e) {
          console.error('Error: ', e);
        }
 
        function success(fileEntry) {
          var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
          // Only copy because of access rights
          $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
            $scope.image_p = newFileName;
      $scope.image_path = namePath + newFileName;
      //
       log_user_id = $scope.sessionuserInfo.accessId;
     var url = $rootScope.serviceurl+"users/profile_image_api"
      // File for Upload
      var targetPath = $scope.pathForImage3($scope.image_p);
     // alert(targetPath);
      // File name only
      var filename = newFileName;
      var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename,'id':log_user_id}
      };
     
      $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) { //console.log(result); alert(result);
         var alertPopup = $ionicPopup.alert({
             title: 'Success',
             template: 'Profile Image Change Success Fully'
      });
       });
      //
          }, function(error){
            $scope.showAlert('Error', error.exception);
          });
        };
      }
    );
    } else { 
      var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    //console.log(imagePath);
    //console.log(newPath);
    //alert(newPath);
      // Move the file to permanent storage
      $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
        $scope.image_p = newFileName;  //alert(cordova.file.dataDirectory);
      //alert(result.last_id);
      // Destination URL

       log_user_id = $scope.sessionuserInfo.accessId;
     var url = $rootScope.serviceurl+"users/profile_image_api"
      // File for Upload
      var targetPath = $scope.pathForImage3($scope.image_p);
     // alert(targetPath);
      // File name only
      var filename = newFileName;
      var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename,'id':log_user_id}
      };
     
      $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) { //console.log(result); alert(result);
         var alertPopup = $ionicPopup.alert({
             title: 'Success',
             template: 'Profile Image Change Success Fully'
      });
       });
      
      }, function(error){
        $scope.showAlert('Error', error.exception);
      });
    }
                           });
  },
  function(err){
    // Not always an error, maybe cancel was pressed...
  })
};

// Returns the local path inside the app for an image
$scope.pathForImage3 = function(image) { 
  if (image) { 
  return cordova.file.dataDirectory + image;
   
  } else {
    //alert($scope.user);
     //return 'http://104.131.83.218//team6/sports/static_image/no_image.png';
  }
};

//end profile image


//start banner image
// IMAGE UPLOAD Profile
 
 $scope.loadImage_b = function() { 
  var options = {
    title: 'select_image',
    buttonLabels: ['Load from library', 'camera'],
    addCancelButtonWithLabel: 'Cancel',
    androidEnableCancelButton : true,
  };
  $cordovaActionSheet.show(options).then(function(btnIndex) {
    var type = null;
    if (btnIndex === 1) {
      type = Camera.PictureSourceType.PHOTOLIBRARY;
    } else if (btnIndex === 2) {
      type = Camera.PictureSourceType.CAMERA;
    }
    if (type !== null) {
      $scope.selectPictures1(type);
    }
  });
};
$scope.selectPictures1 = function(sourceType) {
  var options = {
    quality: 100,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: sourceType,
    correctOrientation: true,
    saveToPhotoAlbum: false
  };
 /*var options = {
  destinationType: Camera.DestinationType.FILE_URI,
        quality: 75,
        targetWidth:720,
        correctOrientation: true,
        encodingType: Camera.EncodingType.JPEG,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
 };*/
  $cordovaCamera.getPicture(options).then(function(imagePath) {
    plugins.crop.promise(imagePath,{quality: 100})
.then(function success (newPath) {  
    imagePath = newPath ;         
    // Grab the file name of the photo in the temporary directory
    var currentName = imagePath.replace(/^.*[\\\/]/, '');
 //var currentName1 = newPath.replace(/^.*[\\\/]/, '');
 //console.log(currentName);
 //console.log(currentName1);
    //Create a new name for the photo
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
 
    // If you are trying to load image from the gallery on Android we need special treatment!
    if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) { //alert('camera');
      window.FilePath.resolveNativePath(imagePath, function(entry) { //alert(entry);
        window.resolveLocalFileSystemURL(entry, success, fail);
        function fail(e) {
          console.error('Error: ', e);
        }
 
        function success(fileEntry) {
          var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
          // Only copy because of access rights
          $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
            $scope.image_b = newFileName;
      $scope.image_path = namePath + newFileName;
      //
       log_user_id = $scope.sessionuserInfo.accessId;
     var url = $rootScope.serviceurl+"users/profile_banner_image_api"
      // File for Upload
      var targetPath = $scope.pathForImage3($scope.image_b);
     // alert(targetPath);
      // File name only
      var filename = newFileName;
      var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename,'id':log_user_id}
      };
     
      $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) { //console.log(result); alert(result);
         var alertPopup = $ionicPopup.alert({
             title: 'Success',
             template: 'Profile banner Image Change Success Fully'
      });
       });
      //
          }, function(error){
            $scope.showAlert('Error', error.exception);
          });
        };
      }
    );
    } else { 
      var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    //console.log(imagePath);
    //console.log(newPath);
    //alert(newPath);
      // Move the file to permanent storage
      $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
        $scope.image_b = newFileName;  //alert(cordova.file.dataDirectory);
      //alert(result.last_id);
      // Destination URL

       log_user_id = $scope.sessionuserInfo.accessId;
     var url = $rootScope.serviceurl+"users/profile_banner_image_api"
      // File for Upload
      var targetPath = $scope.pathForImage4($scope.image_b);
     // alert(targetPath);
      // File name only
      var filename = newFileName;
      var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename,'id':log_user_id}
      };
     
      $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) { //console.log(result); alert(result);
         var alertPopup = $ionicPopup.alert({
             title: 'Success',
             template: 'Profile banner Image Change Success Fully'
      });
       });
      
      }, function(error){
        $scope.showAlert('Error', error.exception);
      });
    }
                           });
  },
  function(err){
    // Not always an error, maybe cancel was pressed...
  })
};

// Returns the local path inside the app for an image
$scope.pathForImage4 = function(image) { 
  if (image) { 
  return cordova.file.dataDirectory + image;
   
  } else {
    //alert($scope.user);
     //return 'http://104.131.83.218//team6/sports/static_image/no_image.png';
  }
};

//end image



 $scope.product = function(){


       AuthService.product_list().then(function(result) { //console.log(result);
      $scope.header_name = 'Home';
      $scope.product = result.product;
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No product found'
      });
    });
 };


 $scope.myproduct_list_url  =function(id){
  $ionicSideMenuDelegate.toggleLeft();
  //$exposeAside.active =1;
  $scope.header_name = 'My Product';
  $state.go('menu.my_product',{'id':id},{reload: true});
 };
 
 
 $scope.go_product_details  =function(id){ //alert(id);
  //$ionicSideMenuDelegate.toggleLeft();
  //$exposeAside.active =1;
  $scope.header_name = 'My Product';
  $state.go('menu.product_details',{id:id},{reload: true});
 };


$scope.myproduct_list = function(){
    var user_id = $stateParams.id;
  //user_id = $scope.sessionuserInfo.accessId;
 AuthService.my_product_list(user_id).then(function(result) { //console.log(result);alert();
      $scope.header_name = 'My Product';
      $scope.my_product = result.product;
      //$state.go('menu.my_product');
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No product found'
      });
    });

};




$scope.myproduct_delete = function(id){
    var confirmPopup = $ionicPopup.confirm({
     title: 'Delete Product',
     template: 'Are you sure you want to delete this product?'
   });

   confirmPopup.then(function(res) {
     if(res) {
  user_id = $scope.sessionuserInfo.accessId;
 AuthService.my_product_delete(id,user_id).then(function(result) { //console.log(result);alert();
      var alertPopup = $ionicPopup.alert({
        title: 'True',
        template: 'Product deleted successfully'
      });
      $scope.my_product = result.product;
      //$state.go('menu.my_product');
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No product found'
      });
    });
} else {
      //alert('You are not sure');
     }
   });
};

$scope.product_request = function(){
  user_id = $scope.sessionuserInfo.accessId;
 AuthService.my_product_request_list(user_id).then(function(result) { //console.log(result);alert();
      $scope.header_name = 'My Product';
      $scope.product = result.product;
//      console.log($scope.productes);
//      alert();
      //$state.go('menu.my_product');
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No product request found'
      });
    });

};


$scope.product_accept = function(req_id){
  user_id = $scope.sessionuserInfo.accessId;
 AuthService.product_accept(user_id,req_id).then(function(result) { //console.log(result);alert();
      $scope.header_name = 'My Product';
      $scope.product = result.product;
//      console.log($scope.productes);
//      alert();
      //$state.go('menu.my_product');
      var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: 'Product request accept successfully'
      });
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No product found'
      });
    });

};

$scope.product_decline = function(req_id){
  user_id = $scope.sessionuserInfo.accessId;
 AuthService.product_decline(user_id,req_id).then(function(result) { //console.log(result);alert();
      $scope.header_name = 'My Product';
      $scope.product = result.product;
//      console.log($scope.productes);
//      alert();
      //$state.go('menu.my_product');
      var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: 'Product request decline successfully'
      });
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No product found'
      });
    });

};

$scope.myproduct_fav_list = function(){ 
  user_id = $scope.sessionuserInfo.accessId;
 AuthService.my_product_fav_list(user_id).then(function(result) { //console.log(result);alert();
      $scope.header_name = 'My Product';
      $scope.my_fav_product = result.product.favourite;
      $scope.my_sold_product = result.product.sold;
      $scope.user = result.product.user;
      $scope.is_fav = 1;
      $scope.is_sold = 0;
      console.log($scope.my_fav_product);
      //$state.go('menu.my_product');
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No product found'
      });
    });

};
$scope.is_solds = function(){ 
    $scope.is_fav = 1;
      $scope.is_sold = 0;
};

$scope.is_favs = function(){ 
    $scope.is_fav = 0;
      $scope.is_sold = 1;
};
$scope.abcc = function()
{
  alert('dfgdfg');
}
$scope.category_list1 = function(){
    
    
    
  user_id = $scope.sessionuserInfo.accessId;
 AuthService.category_list1().then(function(result) { //console.log(result);alert();
      $scope.header_name = 'category';
      $scope.category = result.category;
      $scope.style = result.style;
      $scope.currency = result.currency;
      //$state.go('menu.my_product');
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No category found'
      });
    });

};
$scope.subcategory_list1 = function(){
    
    //alert('hii');
  var id = $stateParams.id;
   $scope.cat_name = $stateParams.name;
  user_id = $scope.sessionuserInfo.accessId;
 AuthService.subcategory_list1(id).then(function(result) { //console.log(result);alert();
      $scope.header_name = 'category';
      $scope.subcategory = result.category;
      //$scope.style = result.style;
      //$scope.currency = result.currency;
      //$state.go('menu.my_product');
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No subcategory found'
      });
    });

};

$scope.style_list = function(){
    
  user_id = $scope.sessionuserInfo.accessId;
 AuthService.style_list().then(function(result) { //console.log(result);alert();
      $scope.header_name = 'Style';
      $scope.style = result.style;
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No style found'
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

$scope.product_add = function(data,cat_id,item_condition,chosenPlace){
   user_id = $scope.sessionuserInfo.accessId;
    data.images = $scope.productImages;
    //alert(data.image);
    data.location = chosenPlace;
    data.user_id = user_id;
    data.category_id = cat_id;
    data.item_condition  =item_condition;
     
 AuthService.add_product(data).then(function(result) { //console.log(result);alert();
      $scope.productImages = [];
     $scope.header_name = 'Add Product';
     var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: 'Product added successfully'
      });
      $state.go('menu.my_product',{'id':user_id}, {reload: true});
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No product added'
      });
    });

};


$scope.product_edit = function(data,cat_id,item_condition,chosenPlace){
   user_id = $scope.sessionuserInfo.accessId;
   //console.log(data);
   //alert();
    //data.images = $scope.productImages;
    //alert(data.image);
    data.location = chosenPlace;
    data.user_id = user_id;
    data.category_id = cat_id;
    data.item_condition  =item_condition;
    data.image = $scope.product_image;
    data.image2 = $scope.product_image2;
    data.image3 = $scope.product_image3;
 AuthService.edit_product(data).then(function(result) { //console.log(result);alert();
      $scope.productImages = [];
     //$scope.header_name = 'Edit Product';
     var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: 'Product edited successfully'
      });
      $state.go('menu.my_product',{'id':user_id}, {reload: true});
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No product edited'
      });
    });

};





$scope.go_product_search = function(id,type){ 
    $state.go('menu.search',{'id':id,'type':type});
// AuthService.product_search(id,type).then(function(result) { //console.log(result);alert();
//      $scope.header_name = 'Product Search';
//      $scope.ser_product = result.product;
//      $state.go('menu.search');
//    }, function(err) {
//      var alertPopup = $ionicPopup.alert({
//        title: $translate.instant('False'),
//        template: $translate.instant('No product found')
//      });
//    });
};


$scope.product_search = function(){ 
 var id = $stateParams.id;   
  var type = $stateParams.type;  
 AuthService.product_search(id,type).then(function(result) { //console.log(result);alert();
      $scope.header_name = 'Product Search';
      $scope.ser_product = result.product;
      //$state.go('menu.search');
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No product found'
      });
    });
};



$scope.adv_product_search = function(cat_id,style_id,search,chosenPlace,min_value,max_value){ 
  
 AuthService.adv_product_search(cat_id,style_id,search,chosenPlace,min_value,max_value).then(function(result) { //console.log(result);alert();
      $scope.header_name = 'Product Search';
      $scope.ser_product = result.product;
      //$state.go('menu.search');
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No product found'
      });
    });
};

$scope.product_details = function(){ 
 var id = $stateParams.id;   
  user_id = $scope.sessionuserInfo.accessId;  
 AuthService.product_details(id,user_id).then(function(result) { //console.log(result);alert();
    
     $scope.ratingsObject1 = {
        iconOn : 'ion-ios-circle-filled',
        iconOff : 'ion-ios-circle-outline',
        iconOnColor: '#e65b95',
        iconOffColor:  'rgb(200, 100, 100)',
        rating:  5,
        minRating:0,
        max:10,
        callback: function(rating) {
          $scope.ratingsCallback(rating);
        }
      };
    
    
   $scope.ratingsCallback = function(rating) {  //alert(rating);
	  $scope.item_condition = rating;
          //alert($scope.item_condition);
        console.log('Selected rating is : ', rating);
      };
     $scope.header_name = 'Product Search';
      $scope.products = result.product;
      //$state.go('menu.search');
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'False',
        template: 'No product found'
      });
    });
};



// IMAGE UPLOAD product
 
 $scope.loadImage_product = function() { 
  var options = {
    title: 'select_image',
    buttonLabels: ['Load from library', 'camera'],
    addCancelButtonWithLabel: 'Cancel',
    androidEnableCancelButton : true,
  };
  $cordovaActionSheet.show(options).then(function(btnIndex) {
    var type = null;
    if (btnIndex === 1) {
      type = Camera.PictureSourceType.PHOTOLIBRARY;
    } else if (btnIndex === 2) {
      type = Camera.PictureSourceType.CAMERA;
    }
    if (type !== null) {
      $scope.selectPictures_product(type);
    }
  });
};
$scope.selectPictures_product = function(sourceType) { 
  var options = {
    quality: 100,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: sourceType,
    correctOrientation: true,
    saveToPhotoAlbum: false
  };
 
  $cordovaCamera.getPicture(options).then(function(imagePath) { 
    plugins.crop.promise(imagePath,{quality: 100})
.then(function success (newPath) {  
    imagePath = newPath ;         
    // Grab the file name of the photo in the temporary directory
    var currentName = imagePath.replace(/^.*[\\\/]/, '');
 //alert(imagePath);
    //Create a new name for the photo
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
 
    // If you are trying to load image from the gallery on Android we need special treatment!
    if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) { //alert('camera');
      window.FilePath.resolveNativePath(imagePath, function(entry) { //alert(entry);
        window.resolveLocalFileSystemURL(entry, success, fail);
        function fail(e) {
          console.error('Error: ', e);
        }
 
        function success(fileEntry) {
          var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
          // Only copy because of access rights
          $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
            //$scope.image_p = newFileName;
      $scope.image_path = namePath + newFileName;
      
      //alert($scope.image_path);
      
    $scope.productImages_path.push($scope.image_path);
      
      //
       log_user_id = $scope.sessionuserInfo.accessId;
     var url = $rootScope.serviceurl+"products/product_image_api"
      // File for Upload
      var targetPath = $scope.pathForImage_prd(newFileName);
     // alert(targetPath);
      // File name only
      var filename = newFileName;
      var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename,'id':log_user_id}
      };
     $ionicLoading.show({
      template: 'Loading....'
    });
      $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) { //console.log(result); alert(result);
        
        $ionicLoading.hide();  
          var allimg= result.response;
    $scope.productImages.push(allimg);
       });
      //
          }, function(error){
            $scope.showAlert('Error', error.exception);
          });
        };
      }
    );
    } else { 
      var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    
      // Move the file to permanent storage
      $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
        
      // Destination URL

       log_user_id = $scope.sessionuserInfo.accessId;
     var url = $rootScope.serviceurl+"products/product_image_api"
      // File for Upload
      var targetPath = $scope.pathForImage_prd(newFileName);
      //alert(targetPath);
      // File name only
      var filename = newFileName;
      var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename,'id':log_user_id}
      };
     
      $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) { //console.log(result); alert(result);

var allimg= result.response;
    $scope.productImages.push(allimg);
       });
      
      }, function(error){
        $scope.showAlert('Error', error.exception);
      });
    }
                           });
  },
  function(err){
    // Not always an error, maybe cancel was pressed...
  })
};
//edit product image

// IMAGE UPLOAD product
 
 $scope.loadImage_product_edit = function(id) { 
     
  var options = {
    title: 'select_image',
    buttonLabels: ['Load from library', 'camera'],
    addCancelButtonWithLabel: 'Cancel',
    androidEnableCancelButton : true,
  };
  $cordovaActionSheet.show(options).then(function(btnIndex) {
    var type = null;
    if (btnIndex === 1) {
      type = Camera.PictureSourceType.PHOTOLIBRARY;
    } else if (btnIndex === 2) {
      type = Camera.PictureSourceType.CAMERA;
    }
    if (type !== null) {
      $scope.selectPictures_product_edit(type,id);
    }
  });
};
$scope.selectPictures_product_edit = function(sourceType,id) { 
  var options = {
    quality: 100,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: sourceType,
    correctOrientation: true,
    saveToPhotoAlbum: false
  };
 
  $cordovaCamera.getPicture(options).then(function(imagePath) { 
    plugins.crop.promise(imagePath,{quality: 100})
.then(function success (newPath) {  
    imagePath = newPath ;         
    // Grab the file name of the photo in the temporary directory
    var currentName = imagePath.replace(/^.*[\\\/]/, '');
 //alert(imagePath);
    //Create a new name for the photo
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
 
    // If you are trying to load image from the gallery on Android we need special treatment!
    if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) { //alert('camera');
      window.FilePath.resolveNativePath(imagePath, function(entry) { //alert(entry);
        window.resolveLocalFileSystemURL(entry, success, fail);
        function fail(e) {
          console.error('Error: ', e);
        }
 
        function success(fileEntry) {
          var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
          // Only copy because of access rights
          $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
            //$scope.image_p = newFileName;
      $scope.image_path = namePath + newFileName;
      //
       log_user_id = $scope.sessionuserInfo.accessId;
     var url = $rootScope.serviceurl+"products/product_image_api"
      // File for Upload
      var targetPath = $scope.pathForImage_prd(newFileName);
     // alert(targetPath);
      // File name only
      var filename = newFileName;
      var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename,'id':log_user_id}
      };
     $ionicLoading.show({
      template: 'Loading....'
    }); 
      $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) { //console.log(result); alert(result);
        //var allimg= result.response;
    //$scope.productImages.push(allimg);
    $ionicLoading.hide(); 
    if(id == 1)
    {
      $scope.product_image = result.response;  
      //alert( $scope.product_image);
    }
    else if(id == 2)
    {
      $scope.product_image2 = result.response; 
      //alert( $scope.product_image2);
    }
    else if(id == 3)
    {
        $scope.product_image3 = result.response;
        //alert( $scope.product_image3);
    }
    
       });
      //
          }, function(error){
            $scope.showAlert('Error', error.exception);
          });
        };
      }
    );
    } else { 
      var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    
      // Move the file to permanent storage
      $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
        
      // Destination URL

       log_user_id = $scope.sessionuserInfo.accessId;
     var url = $rootScope.serviceurl+"products/product_image_api"
      // File for Upload
      var targetPath = $scope.pathForImage_prd(newFileName);
      //alert(targetPath);
      // File name only
      var filename = newFileName;
      var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename,'id':log_user_id}
      };
     $ionicLoading.show({
      template: 'Loading....'
    });
      $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) { //console.log(result); alert(result);
$ionicLoading.hide();
if(id == 1)
    {
      $scope.product_image = result.response;  
      
    }
    else if(id == 2)
    {
      $scope.product_image2 = result.response; 
     
    }
    else if(id == 3)
    {
        $scope.product_image3 = result.response;
       
    }

//var allimg= result.response;
    //$scope.productImages.push(allimg);
    //$scope.product.id = result.response;
       });
      
      }, function(error){
        $scope.showAlert('Error', error.exception);
      });
    }
                           });
  },
  function(err){
    // Not always an error, maybe cancel was pressed...
  })
};


// Returns the local path inside the app for an image
$scope.pathForImage_prd = function(image) { 
  if (image) { 
  return cordova.file.dataDirectory + image;
   
  } else {
    //alert($scope.user);
     //return 'http://104.131.83.218//team6/sports/static_image/no_image.png';
  }
};

//end product image

//message section
  
  
$scope.addmessage = function(msg,product){ 
    //console.log('ftghfg');
    document.body.classList.add('keyboard-open');
  $scope.isDisabledchat = true;
   $scope.msg4='';
  // alert($scope.msg4);
	  log_user_id = $scope.sessionuserInfo.accessId;
	     AuthService.insert_message(log_user_id,msg,product.user_id,product.product_id).then(function(result) {
			console.log(result);
		//alert(result.ACK);
          if(result.ACK === 1)  { $scope.isDisabledchat = false;
			// alert(result.last_id);
      console.log(result.inst_message);
            var myEl = angular.element( document.querySelector( '#sw_msg' ) );
     myEl.append(result.inst_message);
	  $scope.msg4='';
	  $scope.last_id = result.last_chat.last_chat_id;
          //alert($scope.last_id);
	 $ionicScrollDelegate.scrollBottom();
	 $scope.isDisabledchat = false;
			//console.log(result);
		  }
          else { 
              $scope.auctionlist = "";
            }
        }, function(err) {
            console.log(err);
        });
	   };
  
   $scope.addmessage_rq = function(msg,product,seller){ 
    //console.log('ftghfg');
    document.body.classList.add('keyboard-open');
  $scope.isDisabledchat = true;
   $scope.msg4='';
  // alert($scope.msg4);
	  log_user_id = $scope.sessionuserInfo.accessId;
	     AuthService.insert_message(log_user_id,msg,seller,product).then(function(result) {
			console.log(result);
		//alert(result.ACK);
          if(result.ACK === 1)  { $scope.isDisabledchat = false;
			// alert(result.last_id);
      console.log(result.inst_message);
            var myEl = angular.element( document.querySelector( '#sw_msg' ) );
     myEl.append(result.inst_message);
	  $scope.msg4='';
	  $scope.last_id = result.last_chat.last_chat_id;
          //alert($scope.last_id);
	 $ionicScrollDelegate.scrollBottom();
	 $scope.isDisabledchat = false;
			//console.log(result);
		  }
          else { 
              $scope.auctionlist = "";
            }
        }, function(err) {
            console.log(err);
        });
	   }; 
    
    
    
           
$interval(function () { 
		//console.log($scope.friend_id);
		//console.log($scope.last_id);
		log_user_id = $scope.sessionuserInfo.accessId;
      
      var current_path = $location.path();
    
    res = current_path.split("/");
    if(res[1] == 'product_details' || res[1] == 'request_list')
    {  
		if($scope.last_id && $scope.seller_id && log_user_id)
		{  
			log_user_id = $scope.sessionuserInfo.accessId;
			//$scope.last_id = $scope.last_id;
		//var last_id = $scope.last_id;	
    $scope.not_last = $scope.last_id;
		var friend_id = $scope.friend_id; console.log($scope.last_id);
		   AuthService.last_message(log_user_id,$scope.last_id,$scope.seller_id,$scope.product_id).then(function(result) {
			console.log(result);
          if(result.ACK === 1)  {
			 
            var myEl = angular.element( document.querySelector( '#sw_msg' ) );
     myEl.append(result.update_message);
	  $scope.msg='';
	  $scope.last_id = result.last_chat_id;
	 $ionicScrollDelegate.scrollBottom();
			//console.log(result);
		  }
          else { 
              $scope.auctionlist = "";
            }
        }, function(err) {
            console.log(err);
        });
		 
	   }
       }
	
  }, 10000);

//end message section




$ionicPlatform.registerBackButtonAction(function (event) {
      if ($state.current.name === "home" || $state.current.name === "/") {
          $ionicPopup.confirm({
              title: 'System warning',
              template: 'Are you sure you want to exit?'
           }).then(function (res) {
                if (res) {
                   ionic.Platform.exitApp();
                }
           });
        } else {
            navigator.app.backHistory();
        }
  }, 100);


//end class	
});




