/**
* pos Module
*
* Description
*/
angular.module('pos.controllers', [])

	.controller('formController', ['$scope' , 'POSService', '$rootScope' , function($scope , POSService , $rootScope){

		$scope.sheet = '';

		$scope.client_id = '';

		$scope.product_key = '';

		$scope.pack_key = '';

		POSService
			.getNextSheet()
            .then(function (sheet) {

                $scope.sheet = sheet;

            }); 



		$scope.pay_types = [];

		POSService
			.getAllPayTypes()
            .then(function (data) {

                $scope.pay_types = data;

            }); 

		$scope.sale_types = [];

		POSService
			.getAllSaleTypes()
            .then(function (data) {

                $scope.sale_types = data;

            }); 

		$scope.discounts = [
			{
				id: 1,
				name: 'Cliente',
				description : 'Cliente frecuente',
				type : 'quantity',
				amount : '200'
			},
			{
				id: 2,
				name: 'Productos',
				description : 'Numero de productos',
				type : 'percent',
				amount : '10'
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

		$scope.checkKey = function(event , type)
		{
			var type = type || 'product';

			if(event.which === 13)
			{
				if(type == 'product')
					$scope.getProduct();
				else if(type == 'pack')
					$scope.getPack();
				else if(type == 'client')
					$scope.getClient();

			}

		}

		$scope.getProduct = function ()
		{

			if($scope.product_key)
			{

				POSService
				.getProduct($scope.product_key , $rootScope.store_id)
	            .then(function (product) {

	            	if(product.hasOwnProperty('id'))
	            	{

		                var result = $rootScope.addProduct(product);

		                if(result.success)
		                {

			                $scope.product_key = '';

		                }

	            	}
	            	else
	            	{
	            		Materialize.toast('<div class="toast-error">No existe el producto con código '+$scope.product_key+'</div>', 3000);
	            	}

	            }); 
			}

		}

		$scope.getPack = function ()
		{

			if($scope.pack_key)
			{
				
				POSService
				.getPack($scope.pack_key , $rootScope.store_id)
	            .then(function (pack) {

	            	if(pack.hasOwnProperty('id'))
	            	{

		                var result = $rootScope.addPack(pack);

		                $scope.pack_key = '';

	            	}
	            	else
	            	{
	            		Materialize.toast('<div class="toast-error">No existe el paquete con código '+$scope.pack_key+'</div>', 3000);
	            	}

	            }); 

	        }
		}

		$scope.getClient = function ()
		{

			if($scope.client_id)
			{
				
				
				POSService
				.getClient($scope.client_id)
	            .then(function (client) {

	            	if(client.hasOwnProperty('id'))
	            	{

		                $rootScope.addClient(client);

		                $scope.client_id = '';

	            	}
	            	else
	            	{
	            		Materialize.toast('<div class="toast-error">No existe el cliente con código '+$scope.client_id+'</div>', 3000);
	            	}

	            }); 

	        }
		}

		$scope.addDiscount = function()
		{ 

			$rootScope.addDiscount($scope.discounts[$scope.discount] );

		}
		
	}])
	.controller('addDeliveryController', ['$scope', '$rootScope' , function($scope , $rootScope){

		$scope.addDelivery = function ()
		{

			$rootScope.addDelivery($scope.selectedDestination.originalObject);

		    $('#modal-add-delivery').closeModal();

		}

		
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
	.controller('searchProductController', ['$scope' , '$rootScope' , function($scope , $rootScope ){

		$scope.selectedPack = false;

		$scope.products = [];

        $scope.addProduct = function()
        {

        	if($scope.selectedProduct)
        	{

	        	var result = $rootScope.addProduct($scope.selectedProduct.originalObject); 

	        	if(result.success)
	        	{

		        	$scope.selectedProduct = false;

		        	$scope.$broadcast('angucomplete-alt:clearInput');

		        	$('#modal-product').closeModal();

		        }

		    }
        }
		
	}])
	.controller('searchPackController', ['$scope' , '$rootScope' , function($scope , $rootScope){

		$scope.selectedPack = false;
		
		$scope.packs = [];

        $scope.addPack = function()
        {

        	if($scope.selectedPack)
        	{

	        	$rootScope.addPack($scope.selectedPack.originalObject); 

		        $scope.selectedPack = false;

		        $scope.$broadcast('angucomplete-alt:clearInput');

		        $('#modal-pack').closeModal();

        	}
        }
		
	}])
	.controller('searchClientController', ['$scope' , '$rootScope' , function($scope , $rootScope){

		$scope.selectedClient = false;
		
		$scope.clients = [];

        $scope.addClient = function()
        {

        	if($scope.selectedClient)
        	{

	        	$rootScope.addClient($scope.selectedClient.originalObject); 

		        $scope.selectedClient = false;

		        $scope.$broadcast('angucomplete-alt:clearInput');

		        $('#modal-client').closeModal();

        	}
        }
		
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
	.controller('tableProductsController', ['$scope' , '$rootScope', function($scope , $rootScope){

		$scope.calculateTotal = function(id)
		{
			if($rootScope.productsSelected.hasOwnProperty(id))
			{
				var price = parseFloat($rootScope.productsSelected[id].price);

				var quantity = parseInt($rootScope.productsSelected[id].quantity);

				var total = price * quantity;

				$rootScope.productsSelected[id].total = total;

			}

        	$rootScope.calculateTotals();
        	
		}

		$scope.removeProduct = function (k , product)
		{
			$rootScope.removeProduct(k , product);
		}

		$scope.checkAvailability = function (product)
		{
			return $rootScope.checkAvailability(product);
		}


	}])