angular.module('starter')
.service('AuthService', function($q, $http, $window,$rootScope,$ionicLoading,$httpParamSerializer) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var username = '';
  var userInfo = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;
 //alert(rootScope);
   function loadUserCredentials() {
    var token = $window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if ($window.localStorage["userInfo"]) {
        userInfo = JSON.parse($window.localStorage["userInfo"]);
     }
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    $window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }
   function useCredentials(token) {
    username = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;

    if (username == 'admin') {
      role = USER_ROLES.admin
    }
    if (username == 'user') {
      role = USER_ROLES.public
    } 

    // Set the token as header for your requests!
    //$http.defaults.headers.common['X-Auth-Token'] = token;
  }

  

  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    //$http.defaults.headers.common['X-Auth-Token'] = undefined;
    $window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    $window.localStorage["userInfo"] = '';
    userInfo = '';
  }
 
    function getUserInfo() {
      return userInfo;
  }
    
    var login = function(email,password,name,id) { 
    return $q(function(resolve, reject) {
    $ionicLoading.show({
      template: 'Loading....'
    }); 

	
    var encodedString = 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password)+
            '&device_id=' + encodeURIComponent(id) + '&device_name=' + encodeURIComponent(name);
    $http({
            method: 'POST',
            url: $rootScope.serviceurl+"users/login_api",
            data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (response) { 
             console.log(response); //alert(response);
             //alert(response.users.user_email);
              if(response.ACK == 1) {
                storeUserCredentials(response.users.user_email);
                userInfo = {
                    accessId: response.users.user_id,
                    emailId: response.users.user_email,
                    name : response.users.user_name,
					         mobile : response.users.phone,
          
                    };
                $window.localStorage["userInfo"] = JSON.stringify(userInfo);
                $ionicLoading.hide();
                resolve(response.users.user_email); 
              } else {
                  $ionicLoading.hide();
				 // return response.data;
				 
                  reject('Login Failed.');
				  //return response.data;
              }
           }).error(function () {
              $ionicLoading.hide(); 
              reject('Login Failed.');
            });
        });
    };
    

    
 var register = function(data) { 
	 $ionicLoading.show({
      template: 'Loading....'
    });    
   var encodedString = 'name=' + encodeURIComponent(data.name) +
						'&mobile_no=' + encodeURIComponent(data.phone) +  
						'&email=' + encodeURIComponent(data.email) +
						'&password=' + encodeURIComponent(data.password) +
            '&location=' + encodeURIComponent(data.location) ;
					   
	var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/registration_api",
			data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
	 
	 };



 var product_list = function(data) { 
   $ionicLoading.show({
      template: 'Loading....'
    });    
   var encodedString ='' ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/product_list_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
   
   };
   
   var get_notification = function(user_id){
    $ionicLoading.show({
      template: 'Loading....'
    });    
    var encodedString = 'user_id=' + encodeURIComponent(user_id) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/get_notification_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });   
   };
   
   var get_chat = function(product_id,user_id,seller_id){
       $ionicLoading.show({
      template: 'Loading....'
    });
      var encodedString = 'user_id=' + encodeURIComponent(user_id) +
              '&product_id=' + encodeURIComponent(product_id)+
              '&seller_id=' + encodeURIComponent(seller_id);
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/ChatContent_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });  
   };
   
   
   
   var get_chat_list = function(user_id){
       $ionicLoading.show({
      template: 'Loading....'
    });
      var encodedString = 'user_id=' + encodeURIComponent(user_id) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"products/chat_with_user_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });  
   };
   
   
   var insert_message = function(user_id,msg,seller_id,product_id){     
        var encodedString = 'user_id=' + encodeURIComponent(user_id) +
              '&product_id=' + encodeURIComponent(product_id)+
              '&seller_id=' + encodeURIComponent(seller_id)+
              '&chat_input='+ encodeURIComponent(msg);
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/ChatSave_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
		};
   var last_message = function(user_id,last_id,seller_id,product_id){     
        var encodedString = 'user_id=' + encodeURIComponent(user_id) +
              '&product_id=' + encodeURIComponent(product_id)+
              '&seller_id=' + encodeURIComponent(seller_id)+
              '&last_id=' + encodeURIComponent(last_id);
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/lastChat_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
		};
   
   
   
 var my_product_list = function(user_id) { 
   $ionicLoading.show({
      template: 'Loading....'
    });    
   var encodedString ='user_id=' + encodeURIComponent(user_id) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/my_product_list_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
   
   };
  
  
  var my_product_delete = function(id,user_id) { 
   $ionicLoading.show({
      template: 'Loading....'
    });    
   var encodedString ='user_id=' + encodeURIComponent(user_id) +
           '&id=' + encodeURIComponent(id);
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"products/my_product_delete_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
   
   };
  
  
   var my_product_request_list = function(user_id) { 
   $ionicLoading.show({
      template: 'Loading....'
    });    
   var encodedString ='user_id=' + encodeURIComponent(user_id) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"products/my_product_request_list_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
   
   };
  
  
  
  var my_product_fav_list = function(user_id) { 
   $ionicLoading.show({
      template: 'Loading....'
    });    
   var encodedString ='user_id=' + encodeURIComponent(user_id) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/my_product_sold_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
   
   };
  
  
  var category_list = function() { 
   $ionicLoading.show({
      template: 'Loading....'
    });    
   //var encodedString ='user_id=' + encodeURIComponent(user_id) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"categories/category_list_api",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
   
   };
 
 var category_list1 = function() { 
   $ionicLoading.show({
      template: 'Loading....'
    });    
   //var encodedString ='user_id=' + encodeURIComponent(user_id) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"categories/category_list_api",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
   
   };
   
   
   var subcategory_list1 = function(id) { 
    $ionicLoading.show({
       template: 'Loading....'
     });    
    var encodedString ='cat_id=' + encodeURIComponent(id) ;
              
   var req = {
             method: 'POST',
             url: $rootScope.serviceurl+"categories/sub_category_list_api",
             data: encodedString,
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         };
         return $http(req).then(function(res){ //console.log(res);  alert('res');
            $ionicLoading.hide();  
            return res.data; 
         });
    
    };


   var style_list = function() { 
   $ionicLoading.show({
      template: 'Loading....'
    });    
   //var encodedString ='user_id=' + encodeURIComponent(user_id) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"styles/style_list_api",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
   
   }; 
  
  
  var city_list = function() { 
   $ionicLoading.show({
      template: 'Loading....'
    });    
   //var encodedString ='user_id=' + encodeURIComponent(user_id) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/city_list_api",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
   
   };
  
//user public profile

/*var user_profile = function(user_id){ alert(user_id);
  $ionicLoading.show({
      template: 'Loading....'
    });    
   var encodedString ='user_id=' + encodeURIComponent(user_id) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/user_profile_api",
        data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};*/

  var logout = function(user_id) {
    
	/*var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"service.php?action=logout&user_id="+user_id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){
           $ionicLoading.hide();  
           return res.data; 
        });*/
	destroyUserCredentials();
  };
 
  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };
 
  loadUserCredentials();
  
   var setUser = function(user_data) {
	   console.log(user_date);
    //window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
	  alert();
   // return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };
var logout1 = function(user_id) {
    
  /*var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"service.php?action=logout&user_id="+user_id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){
           $ionicLoading.hide();  
           return res.data; 
        });*/
  destroyUserCredentials();
  };


var user_profile = function(user_id){ 
  $ionicLoading.show({
      template: 'Loading....'
    });    
   var encodedString ='user_id=' + encodeURIComponent(user_id) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/user_profile_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};

var category_list = function(){ 
//  $ionicLoading.show({
//      template: 'Loading....'
//    });    
   
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"products/product_category_api",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};



var sub_category_list = function(cat_id){ //alert(cat_id);
//  $ionicLoading.show({
//      template: 'Loading....'
//    });    
   //var encodedString ='user_id=' + encodeURIComponent(user_id) ;
  var encodedString ='cat_id=' + encodeURIComponent(cat_id) ;           
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"products/product_sub_category_api",
           data: encodedString,
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};



var add_favourite = function(user_id,id){ //alert(cat_id);
//  $ionicLoading.show({
//      template: 'Loading....'
//    });    
   //var encodedString ='user_id=' + encodeURIComponent(user_id) ;
  var encodedString ='user_id=' + encodeURIComponent(user_id)+
   '&product_id=' + encodeURIComponent(id) ;           
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"products/product_favourite_add_api",
           data: encodedString,
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};


var product_decline = function(user_id,id){ //alert(cat_id);
//  $ionicLoading.show({
//      template: 'Loading....'
//    });    
   //var encodedString ='user_id=' + encodeURIComponent(user_id) ;
  var encodedString ='user_id=' + encodeURIComponent(user_id)+
   '&id=' + encodeURIComponent(id) ;           
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"products/product_decline_api",
           data: encodedString,
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};


var product_accept = function(user_id,id){ //alert(cat_id);
//  $ionicLoading.show({
//      template: 'Loading....'
//    });    
   //var encodedString ='user_id=' + encodeURIComponent(user_id) ;
  var encodedString ='user_id=' + encodeURIComponent(user_id)+
   '&id=' + encodeURIComponent(id) ;           
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"products/product_accept_api",
           data: encodedString,
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};
product_accept



var product_request = function(user_id,id,seller_id){ //alert(cat_id);
//  $ionicLoading.show({
//      template: 'Loading....'
//    });    
   //var encodedString ='user_id=' + encodeURIComponent(user_id) ;
  var encodedString ='user_id=' + encodeURIComponent(user_id)+
   '&product_id=' + encodeURIComponent(id) +
   '&seller_id=' + encodeURIComponent(seller_id);           
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"products/product_request_api",
           data: encodedString,
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};


var remove_favourite = function(user_id,id){ //alert(cat_id);
//  $ionicLoading.show({
//      template: 'Loading....'
//    });    
   //var encodedString ='user_id=' + encodeURIComponent(user_id) ;
  var encodedString ='user_id=' + encodeURIComponent(user_id)+
   '&product_id=' + encodeURIComponent(id) ;           
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"products/product_favourite_remove_api",
           data: encodedString,
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};


var add_product = function(data){ 
    console.log(data);
    
    ////alert(cat_id);
//  $ionicLoading.show({
//      template: 'Loading....'
//    });    
   var encodedString ='product=' + encodeURIComponent(JSON.stringify(data)) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"products/product_add_api",
           data: encodedString,
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};

var edit_product = function(data){ 
    console.log(data);
    
    ////alert(cat_id);
//  $ionicLoading.show({
//      template: 'Loading....'
//    });    
   var encodedString ='product=' + encodeURIComponent(JSON.stringify(data)) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"products/product_edit_api",
           data: encodedString,
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};

var update_profile = function(data){

  $ionicLoading.show({
      template: 'Loading....'
    });    
  var encodedString = 'name=' + encodeURIComponent(data.name) +
            '&mobile_no=' + encodeURIComponent(data.mobile_no) +  
            '&email=' + encodeURIComponent(data.email) +
            '&location=' + encodeURIComponent(data.location) +
            '&id=' + encodeURIComponent(data.id) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/user_profile_update_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};

var user_profile_int = function(user_id){ 
      
   var encodedString ='user_id=' + encodeURIComponent(user_id) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/user_profile_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};



var product_search = function(id,type){ 
      
   var encodedString ='id=' + encodeURIComponent(id) +
            '&type=' + encodeURIComponent(type);
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/search_product_list_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};

var adv_product_search = function(cat_id,style_id,search,chosenPlace,min_value,max_value){ 
      
   var encodedString ='cat_id=' + encodeURIComponent(cat_id) +
            '&style_id=' + encodeURIComponent(style_id)+
            '&location=' + encodeURIComponent(chosenPlace)+
            '&search=' + encodeURIComponent(search)+
            '&min_value=' + encodeURIComponent(min_value)+
            '&max_value=' + encodeURIComponent(max_value);
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/adv_search_product_list_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};



var product_details = function(id,user_id){ 
      
   var encodedString ='product_id=' + encodeURIComponent(id)+
          '&user_id=' + encodeURIComponent(user_id) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"products/product_details_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};


var product_details_edit = function(id){ 
      
   var encodedString ='product_id=' + encodeURIComponent(id);
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"products/product_details_edit_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(res){ //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return res.data; 
        });
};


var twitterlogin = function(data){

 
   $ionicLoading.show({
      template: 'Loading....'
    });    
   var encodedString = 'name=' + encodeURIComponent(data.name) +
           'email=' + encodeURIComponent(data.email) +
            '&twitter_user_id=' + encodeURIComponent(data.id) +  
            '&location=' + encodeURIComponent(data.location) +
            '&fb_image=' + encodeURIComponent(data.profile_image_url) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/twitter_registration_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(response){ console.log(response);

if(response.data.ACK != 0) { 
                //storeUserCredentials(response.data.users.email);
                userInfo = {
                    accessId: response.data.users.user_id,
                    emailId: response.data.users.email,
                    name : response.data.users.name,
                   userimage : response.data.users.user_image,
                   address: response.data.users.address
          
                    };
                    console.log(userInfo);
                $window.localStorage["userInfo"] = JSON.stringify(userInfo);
                
                $window.localStorage["userid"] = response.data.users.user_id;
                $ionicLoading.hide();
                //resolve(response.data.users.email); 
              }
               else {
                  $ionicLoading.hide();
         // return response.data;
         
                  reject('Login Failed.');
          //return response.data;
              }
        //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return response.data; 
        });
   
   


};

var fblogin  =function(data){
 
   $ionicLoading.show({
      template: 'Loading....'
    });    
   var encodedString = 'name=' + encodeURIComponent(data.first_name + data.last_name) +
            '&fb_user_id=' + encodeURIComponent(data.id) +  
            '&email=' + encodeURIComponent(data.email) +
            '&fb_image=' + encodeURIComponent(data.picture.data.url) ;
             
  var req = {
            method: 'POST',
            url: $rootScope.serviceurl+"users/fblogin_api",
      data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return $http(req).then(function(response){ console.log(response);

if(response.data.ACK != 0) { 
                storeUserCredentials(response.data.users.email);
                userInfo = {
                    accessId: response.data.users.user_id,
                    emailId: response.data.users.email,
                    name : response.data.users.name,
                   userimage : response.data.users.user_image,
                   address: response.data.users.address
          
                    };

                    console.log(userInfo);
                $window.localStorage["userInfo"] = JSON.stringify(userInfo);
                $window.localStorage["userid"] = response.data.users.user_id;
                $ionicLoading.hide();
                //resolve(response.data.users.email); 
              }
               else {
                  $ionicLoading.hide();
         // return response.data;
         
                  //reject('Login Failed.');
          //return response.data;
              }
        //console.log(res);  alert('res');
           $ionicLoading.hide();  
           return response.data; 
        });
   
   

};

		
  return {
		login : login,
		logout : logout,
		register : register,
		getUserInfo : getUserInfo,
		logout1 : logout1,
    product_list : product_list,
    my_product_list : my_product_list,
    //gpluslogin:gpluslogin,
    fblogin:fblogin,
    user_profile:user_profile,
    user_profile_int :user_profile_int,
    update_profile : update_profile,
    category_list : category_list,
    category_list1 : category_list1,
    product_search : product_search,
    my_product_fav_list : my_product_fav_list,
    sub_category_list : sub_category_list,
    add_product : add_product,
    product_details : product_details,
    add_favourite :add_favourite,
    remove_favourite : remove_favourite,
    product_request : product_request,
    my_product_request_list : my_product_request_list,
    product_accept : product_accept,
    product_decline : product_decline,
    style_list : style_list,
    product_details_edit : product_details_edit,
    edit_product : edit_product,
    my_product_delete :my_product_delete,
    get_notification : get_notification,
    get_chat : get_chat,
    insert_message : insert_message,
    last_message : last_message,
    get_chat_list : get_chat_list,
    adv_product_search :adv_product_search,
    city_list:city_list,
    twitterlogin:twitterlogin,
    subcategory_list1:subcategory_list1,
    
    
    isAuthenticated: function() {return isAuthenticated;},
    checkUniqueValue: function(table, field, value) {
        var encodedString = 'table=' + encodeURIComponent(table)+'&field=' + encodeURIComponent(field) + '&value=' + encodeURIComponent(value) ;    
        var req = {
         method: 'POST',
         url: $rootScope.serviceurl+"checkdata",
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         data: encodedString
        };
        return $http(req).then(function(res){
            return res.data.isUnique;
        });
    },
    username: function() {return username;},
    role: function() {return role;}
  };
})
/*.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
 
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}); */