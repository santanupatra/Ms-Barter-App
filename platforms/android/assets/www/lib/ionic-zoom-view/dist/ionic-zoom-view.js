"use strict";

(function () {

  "use strict";

  var zoomView = function ($compile, $ionicModal, $ionicPlatform) {
    return {

      restrict: "A",

      link: function link(scope, elem, attr) {

        $ionicPlatform.ready(function () {

          elem.attr("ng-click", "showZoomView()");
          elem.removeAttr("zoom-view");
          $compile(elem)(scope);

          var zoomViewTemplate = "\n          <style>\n          .zoom-view .scroll {  }\n          </style>\n          <ion-modal-view class=\"zoom-view\">\n          <ion-header-bar>\n          <h1 class=\"title\"></h1>\n          <button ng-click=\"closeZoomView()\" class=\"button button-clear button-dark\">Close</button>\n          </ion-header-bar>\n          <ion-content>\n          <ion-scroll zooming=\"true\" direction=\"xy\" delegate-handle=\"zoom-pane\" class=\"zoom-pane\" min-zoom=\"1\" max-zoom=\"15\" overflow-scroll=\"false\" style=\"width: 400px; height: 400px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; \">\n          <img ng-src=\"{{ngSrc}}\" style=\"width: 100%;height:100% display:block; margin: auto; padding: 10px; \"></img>\n          </ion-scroll>\n          </ion-content>\n          </ion-modal-view>\n          ";

          scope.zoomViewModal = $ionicModal.fromTemplate(zoomViewTemplate, {
            scope: scope,
            animation: "slide-in-up" });

          scope.showZoomView = function () {
            scope.zoomViewModal.show();
            scope.ngSrc = attr.zoomSrc;
          };

          scope.closeZoomView = function () {
            scope.zoomViewModal.hide();
          };
        });
      } };
  };

  angular.module("ionic-zoom-view", []).directive("zoomView", zoomView);
})();