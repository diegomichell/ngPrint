angular.module('app', ['ngPrint'])

.factory('people', function(){
	return function people(){

		return [{Name: 'Diego', Last: 'Michel', Age: 18},
		{Name: 'Lauren', Last: 'Ogg', Age: 26},
		{Name: 'Chills', Last: 'Tomate', Age: 53},
		{Name: 'Jone', Last: 'Doe', Age: 30},
		{Name: 'Liz', Last: 'Gillies', Age: 20},
		{Name: 'Mariela', Last: 'Calabaza', Age: 18},
		{Name: 'Smith', Last: 'Pecks', Age: 8},
		{Name: 'Goo', Last: 'Uff', Age: 34},
		{Name: 'Chiang', Last: 'Xing', Age: 35},
		{Name: 'Carmen', Last: 'Electra', Age: 65},
		{Name: 'Brad', Last: 'Pitt', Age: 87},
		{Name: 'Angelina', Last: 'Jolie', Age: 21},
		{Name: 'Gustavo', Last: 'Adolfo', Age: 27},
		{Name: 'Jorge', Last: 'Jorge', Age: 18},
		{Name: 'Elon', Last: 'Musk', Age: 30},
		{Name: 'Bill', Last: 'Gates', Age: 50},
		{Name: 'Joaquin', Last: 'Balaguer', Age: 80},
		];

	};
})

.controller('ClientReportCtrl', ['$scope', 'people', function($scope, people){

	$scope.reportTemplate = 'templates/template.html';
	$scope.people = people();

}]);
