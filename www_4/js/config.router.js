var app = angular.module('starter');
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {
    
    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

    // LAZY MODULES
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: jsRequires.modules
    }); 

$stateProvider
	.state('menu', {
			url: '/',
			abstract: true,
			resolve: loadSequence('home'),
			templateUrl: 'templates/basetemplates/menutemplate.html',
			controller: 'homeCtrl'
		})
	
		
	// with parent
	.state('splash_after', {
			url: '/',
			resolve: loadSequence('home'),
			templateUrl: 'templates/splash.html',
			controller: 'homeCtrl'
			
		  })
	/*.state('splash_after', {
        url: '/',
		resolve: loadSequence('home'),
        views: {
            'menuContent': {
                templateUrl: 'templates/detail.html',
                controller: 'homeCtrl'
            }
        }
    })*/
	.state('login', {
			url: '/login',
			resolve: loadSequence('signup'),
			templateUrl: 'templates/sign_in.html',
			controller: 'signupCtrl'
			
		  })
	.state('signup', {
			url: '/signup',
			resolve: loadSequence('signup'),
			templateUrl: 'templates/register.html',
			controller: 'signupCtrl'
			
		  })
	.state('forget', {
			url: '/forget',
			resolve: loadSequence('signup'),
			templateUrl: 'templates/forget_password.html',
			controller: 'signupCtrl'
			
		  })
	/*.state('change_password', {
			url: '/change_password',
			resolve: loadSequence('signup'),
			templateUrl: 'templates/change_password.html',
			controller: 'signupCtrl'
			
		  })*/
	.state('menu.home', {
        url: 'home',
		resolve: loadSequence('home'),
        views: {
            'menuContent': {
                templateUrl: 'templates/style.html',
                controller: 'homeCtrl',
                cache:false
            }
        }
    })
	.state('menu.profile', {
        url: 'profile',
		resolve: loadSequence('home'),
        views: {
            'menuContent': {
                templateUrl: 'templates/edit_profile.html',
                controller: 'homeCtrl',
                cache:false
            }
        }
    })
    .state('menu.public_profile', {
        url: 'public_profile',
		resolve: loadSequence('home'),
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'homeCtrl',
                cache:false
            }
        }
    })
    
     .state('menu.category', {
        url: 'category',
		resolve: loadSequence('home'),
        views: {
            'menuContent': {
                templateUrl: 'templates/category.html',
                controller: 'homeCtrl'
            }
        }
    })
    .state('menu.subcategory', {
        url: 'subcategory/:id/:name',
		resolve: loadSequence('home'),
        views: {
            'menuContent': {
                templateUrl: 'templates/subcategory.html',
                controller: 'homeCtrl'
            }
        }
    })
    
    .state('menu.notification', {
        url: 'notification',
		resolve: loadSequence('home'),
        views: {
            'menuContent': {
                templateUrl: 'templates/notification.html',
                controller: 'homeCtrl'
            }
        }
    })
    
    
    .state('menu.my_product', {
        url: 'my_product/:id',
		resolve: loadSequence('home'),
        views: {
            'menuContent': {
                templateUrl: 'templates/my_product.html',
                controller: 'homeCtrl'
            }
        }
    })
    .state('menu.search', {
        url: 'search/:id/:type',
		resolve: loadSequence('home'),
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'homeCtrl'
            }
        }
    })
    
    
    
    .state('menu.adv_search', {
        url: 'adv_search/',
		resolve: loadSequence('home'),
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html',
                controller: 'homeCtrl'
            }
        }
    })
    
    
    .state('menu.add_product', {
        url: 'add_product',
		resolve: loadSequence('home'),
        views: {
            'menuContent': {
                templateUrl: 'templates/add_post.html',
                controller: 'homeCtrl'
            }
        }
    })
    
    
    .state('menu.edit_product', {
        url: 'edit_product/:id',
		resolve: loadSequence('home'),
        views: {
            'menuContent': {
                templateUrl: 'templates/product_edit.html',
                controller: 'homeCtrl'
            }
        }
    })
    
    .state('menu.product_details', {
        url: 'product_details/:id',
		resolve: loadSequence('home'),
        views: {
            'menuContent': {
                templateUrl: 'templates/product_detail.html',
                controller: 'homeCtrl'
            }
        }
    })
    
    
    .state('menu.request_list', {
        url: 'request_list',
		resolve: loadSequence('home'),
        views: {
            'menuContent': {
                templateUrl: 'templates/request_list.html',
                controller: 'homeCtrl'
            }
        }
    })
    
    
	.state('menu.chat_list', {
        url: 'chat_list',
		resolve: loadSequence('home'),
        views: {
            'menuContent': {
                templateUrl: 'templates/chat_list.html',
                controller: 'homeCtrl'
            }
        }
    })
    
	 .state('test', {
			url: '/test',
			resolve: loadSequence('home'),
			templateUrl: 'templates/search_advance-bck.html',
			controller: 'homeCtrl'
			
		  })

  
  ;  
 
$urlRouterProvider.otherwise('/');
   function loadSequence() {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q',
			function ($ocLL, $q) {
			    var promise = $q.when(1);
			    for (var i = 0, len = _args.length; i < len; i++) {
			        promise = promiseThen(_args[i]);
			    }
			    return promise;

			    function promiseThen(_arg) {
			        if (typeof _arg == 'function')
			            return promise.then(_arg);
			        else
			            return promise.then(function () {
			                var nowLoad = requiredData(_arg);
			                if (!nowLoad)
			                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
			                return $ocLL.load(nowLoad);
			            });
			    }

			    function requiredData(name) {
			        if (jsRequires.modules)
			            for (var m in jsRequires.modules)
			                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
			                    return jsRequires.modules[m];
			        return jsRequires.scripts && jsRequires.scripts[name];
			    }
			}]
           };
      }

}]);