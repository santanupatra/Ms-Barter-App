// Ionic Starter App
var app = angular.module('starter');
app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //******frontend style******//
        'frontend':['css/style.css'],
        //*** Controllers
       // 'dashboardCtrl': ['js/controllers/dashboardCtrl.js'],
        'login': ['js/controllers/loginCtrl.js'],
        'signup': ['js/controllers/signupCtrl.js'],
		'home': ['js/controllers/homeCtrl.js'],
        
        //*** Services
        
    },
     modules: [
        {
            name: 'ds.clock',
            files: ['js/dependency/angular-clock.js']
        },
        {
            name: 'ngFileUpload',
            files: ['js/dependency/ng-file-upload-shim.min.js','js/dependency/ng-file-upload.min.js']
        },
]
});

/*app.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});*/

app.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role'
}); 


