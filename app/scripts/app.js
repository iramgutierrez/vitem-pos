/**
* pos Module
*
* Description
*/
angular.module('pos', [
	'ui.materialize' ,
	'angucomplete' , 
    'pos.controllers',
    'expenses.services'
    ]).

	controller('formController', ['$scope', function($scope){

		$scope.sheet = '12345678';

		$scope.pay_types = [
			{
				id: 1,
				name: 'Efectivo'
			},
			{
				id: 2,
				name: 'Tarjeta'
			}
		];

		$scope.sale_types = [
			{
				id: 1,
				name: 'Contado'
			},
			{
				id: 2,
				name: 'Apartado'
			}
		];

		$scope.discounts = [
			{
				id: 1,
				name: 'Cliente',
				description : 'Descuento por cliente frecuente'
			}
		]
		

		var currentTime = new Date();
		$scope.currentTime = currentTime;
		$scope.month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
		$scope.monthShort = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
		$scope.weekdaysFull = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
		$scope.weekdaysLetter = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
		$scope.today = 'Hoy';
		$scope.clear = 'Limpiar';
		$scope.close = 'Cerrar';
		$scope.onStart = function () {
		    console.log('onStart');
		};
		$scope.onRender = function () {
		    console.log('onRender');
		};
		$scope.onOpen = function () {
		    console.log('onOpen');
		};
		$scope.onClose = function () {
		    console.log('onClose');
		};
		$scope.onSet = function () {
		    console.log('onSet');
		};
		$scope.onStop = function () {
		    console.log('onStop');
		};
		
	}])
	.controller('resumeController', ['$scope', function($scope){

		$scope.seller = {

			name : "Fernanda Gonzalez"
		};

		$scope.client = {
			name : 'Iram Gutiérrez'
		};

		$scope.subtotal = 34567.45;
		$scope.total = 987654.12;
		$scope.discount = 344.34
		$scope.delivery = 200
		
	}])
	.controller('searchProductController', ['$scope' , '$q', '$log' , '$timeout' , function($scope , $q , $log , $timeout){

		$scope.products = [
            {
            	id: "1",
            	name: 'Lampara sapiente',
            	key: 'yb72pnb',
            	model: 'pariatur',
            	stock: 13 
            },
        ];
		
	}])
	.controller('searchPackController', ['$scope' , '$q', '$log' , '$timeout' , function($scope , $q , $log , $timeout){

		$scope.packs = [
            {
            	id: "1",
            	name: 'Lampara sapiente',
            	key: 'yb72pnb',
            	model: 'pariatur',
            	stock: 13 
            },
        ];
		
	}])
	.controller('searchClientController', ['$scope', function($scope){

		$scope.clients = [
            {
            	id: "1",
            	name: 'Iram Gutiérrez',
            	email: 'iramgutzglez@gmail.com'
            },
        ];
		
	}])
	.controller('headerController', ['$scope', function($scope){

		$scope.lock = false;

		$scope.lockScreen = function(){

			$scope.lock = true;

		}

		$scope.unLockScreen = function(){

			$scope.lock = false;

		}

		
	}])