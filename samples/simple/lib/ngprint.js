angular.module("ngPrint", [])

.directive('printer', ['$templateRequest', '$sce', '$compile', '$timeout', '$http',function($templateRequest, $sce, $compile, $timeout, $http){

  return {
    restrict: 'A',
    scope: {
      printerData: '=',
      printerExtra: '=',
      printerOnError: '&'
    },
    link: function(scope, element, attrs) {

        element.on('click', function(){
        var printerData = scope.printerData;
        var printerExtra = scope.printerExtra;
        var printerOnError = scope.printerOnError;
        var printOnClient = attrs.printOnClient || false;
        var printerServerUrl = attrs.serverUrl;
        var printerDownloadUrl = attrs.printerDownloadUrl;

        var reportTemplateUrl  = attrs.reportTemplateUrl;
        var reportTitle = attrs.reportTitle;

        $templateRequest(reportTemplateUrl).then(function(html) {

            var template = angular.element(html);

            var el = $compile(template)(scope);

            $timeout(function() {
              var htmlReport = el.html();

              if(printOnClient)
              {

                var pdf = new jsPDF('p', 'pt', 'letter');

                if(!pdf)
                {
                  console.log("jsPDF library not found.");
                  return;
                }

                var canvas = pdf.canvas;
                canvas.height = 72 * 11;
                canvas.width= 72 * 8.5;

                html2pdf(htmlReport, pdf, function(pdf) {
                      pdf.save(reportTitle + '.pdf');
                });

              }
              else
              {

                $http.post(serverUrl, { title : reportTitle, content: htmlReport},
                { headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function(fileName){

                  window.location = printerDownloadUrl+fileName;

                });
              }

            }, 300);

        }, function() {

            if(printerOnError) {
                printerOnError();
            }
            else {
              console.log("An error ocurred while generating pdf document");
            }

        });

      });

    }

  };

}]);
