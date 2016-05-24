/**
 * Version: 1.0.0
 * @Author: Diego Michel <diego.ivan.perez.michel@gmail.com>
 * Drop me a line and lets make web printing great again.
 *
 * License: MIT - 2016
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

angular.module("ngPrint", [])

.directive('printer', ['$templateRequest', '$sce', '$compile', '$timeout', '$http', function($templateRequest, $sce, $compile, $timeout, $http) {

    return {
        restrict: 'A',
        scope: {
            printerData: '=',
            printerExtra: '=',
            printerOnError: '&'
        },
        link: function(scope, element, attrs) {

            element.on('click', function() {
                var printerData = scope.printerData;
                var printerExtra = scope.printerExtra;
                var printerOnError = scope.printerOnError;
                var printOnClient = attrs.printOnClient || false;
                var printerServerUrl = attrs.serverUrl;
                var printerDownloadUrl = attrs.printerDownloadUrl;

                var reportTemplateUrl = attrs.reportTemplateUrl;
                var reportTitle = attrs.reportTitle;

                $templateRequest(reportTemplateUrl).then(function(html) {

                    var template = angular.element(html);

                    var el = $compile(template)(scope);

                    $timeout(function() {
                        var htmlReport = el.html();

                        if (printOnClient) {

                            var pdf = new jsPDF('p', 'pt', 'letter');

                            if (!pdf) {
                                console.log("jsPDF library not found.");
                                return;
                            }

                            var canvas = pdf.canvas;
                            canvas.height = 72 * 11;
                            canvas.width = 72 * 8.5;

                            html2pdf(htmlReport, pdf, function(pdf) {
                                pdf.save(reportTitle + '.pdf');
                            });

                        } else {

                            $http.post(serverUrl, {
                                title: reportTitle,
                                content: htmlReport
                            }, {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).success(function(fileName) {

                                window.location = printerDownloadUrl + fileName;

                            });
                        }

                    }, 300);

                }, function() {

                    if (printerOnError) {
                        printerOnError();
                    } else {
                        console.log("An error ocurred while generating pdf document");
                    }

                });

            });

        }

    };

}]);
