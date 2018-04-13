angular.module('starter')
.service('changelanguage', function(availableLanguages,tmhDynamicLocale,availableLanguages,defaultLanguage,$translate,$window,$state) {   
  var CURRENT_LANGUAGE = '';  
  function applyLanguage(language) {
  tmhDynamicLocale.set(language.toLowerCase());
  };

  function getSuitableLanguage(language) {
    for (var index = 0; index < availableLanguages.length; index++) {
      //console.log(language.toLocaleLowerCase()) ; 
      //console.log(availableLanguages[index].toLowerCase())  ;
      if (availableLanguages[index].toLowerCase() === language.toLocaleLowerCase()) {
        return availableLanguages[index];
      }
    }
    return defaultLanguage;
  };

    var ns_changelanguage = function(language_code) {
        var language = getSuitableLanguage(language_code);
        applyLanguage(language);
	$translate.use(language);
        $window.localStorage["CURRENT_LANGUAGE"] = language_code; 
        //console.log($window.localStorage["CURRENT_LANGUAGE"]);
        $state.reload();
    }; 
    
    function get_current_language() {
        if ($window.localStorage["CURRENT_LANGUAGE"]) {
            CURRENT_LANGUAGE = $window.localStorage["CURRENT_LANGUAGE"];
        } else {
           CURRENT_LANGUAGE = "ar-sy";
        }
        console.log(CURRENT_LANGUAGE);
        return CURRENT_LANGUAGE ;
    }; 
 
return { 
   ns_changelanguage : ns_changelanguage,   
   get_current_language : get_current_language
 };       
        
});