/**
* pos Module
*
* Description
*/
angular.module('pos', [
	'ui.materialize' ,
	'angucomplete-alt' , 
    'pos.controllers',
    'pos.services'
    ]
).run([ '$rootScope' , function($rootScope){

	$rootScope.productsSelected = [];

	$rootScope.productsSelectedCtrl = [];

    $rootScope.delivery = false;

    $rootScope.discount = false;

    $rootScope.WSUrl = 'http://localhost/vitem/public/';

    $rootScope.store_id = 2;

    $rootScope.client = false;

    $rootScope.subtotal = 0;

    $rootScope.delivery_cost = 0;

    $rootScope.discount_amount = 0;

    $rootScope.discount_description = '';

    $rootScope.discount_type = false;

    $rootScope.total = 0;

    $rootScope.addClient = function(client)
    {
        $rootScope.client = client;

        Materialize.toast('<div class="toast-success">Cliente asignado.</div>', 3000);
    }

    $rootScope.addPack = function(pack)
    {

        angular.forEach(pack.products, function(product, key) {

          $rootScope.addProduct(product , product.pivot.quantity);

        });

    }


    $rootScope.addProduct = function(product , quantity)
    {
    	var result = {};

        var quantity = quantity || 1;

        var newProduct = false;

    	if(!$rootScope.productsSelectedCtrl.hasOwnProperty('product_'+product.id))
    	{

            newProduct = true;

    		product.quantity = quantity;

	        product.total = product.price * quantity;

	        $rootScope.productsSelectedCtrl['product_'+product.id] = true;

	        $rootScope.productsSelected.push(product);

	        result = {
	        	success : true,
	        	message : 'Producto con ID '+product.id+' agregado.'
	        };


    	}
    	else
    	{

	        result = {
	        	success : false,
	        	message : 'El producto con ID '+product.id+' ya se encuentra en la venta.'
	        };

    	}

    	var class_toast = (result.success) ? 'success' : 'error';

	    Materialize.toast('<div class="toast-'+class_toast+'">'+result.message+'</div>', 3000);

        var available = $rootScope.checkAvailability(product);

        if(!available && newProduct)
        {
            Materialize.toast('<div class="toast-error">Cantidad de producto con ID '+product.id+' supera la disponibilidad en tienda.</div>', 3000);
        }

        $rootScope.calculateTotals();

    	return result;      	

    }

    $rootScope.calculateTotals = function()
    {
        $rootScope.calculateSubTotal();
        $rootScope.calculateDiscount();
        $rootScope.calculateTotal();
    }

    $rootScope.calculateTotal = function()
    {       

        var subtotal = $rootScope.subtotal;

        var delivery = $rootScope.delivery_cost;

        var discount = $rootScope.discount_amount;

        var total = parseFloat(subtotal) + parseFloat(delivery) - parseFloat(discount); console.log(total)

        $rootScope.total = total;
    }

    $rootScope.calculateSubTotal = function()
    {
        var subtotal = 0;

        angular.forEach($rootScope.productsSelected , function (product , key)
        {

            if(!isNaN(product.total))
            {
                subtotal = subtotal + product.total;
            }

        })

        $rootScope.subtotal = subtotal;
    }

    $rootScope.calculateDiscount = function()
    { 
        if($rootScope.discount)
        {

            var subtotal = $rootScope.subtotal;

            var delivery_cost = $rootScope.delivery_cost;

            subtotal = subtotal + delivery_cost; console.log(subtotal);

            var discount_amount = $rootScope.discount.amount;

            var discount_description = '';

            var discount_type = $rootScope.discount.type;

            if(discount_type)
            {   

                if(discount_type == 'percent')
                { console.log('daf')

                    discount_description = '(-'+discount_amount+'%)'

                    discount_amount = (discount_amount/100)*subtotal;

                }

            }

            $rootScope.discount_amount = discount_amount;

            $rootScope.discount_description = discount_description;

            $rootScope.discount_type = discount_type;
        }

    }

    $rootScope.addDiscount = function (discount)
    {

        $rootScope.discount = discount;

        $rootScope.calculateTotals();

        Materialize.toast('<div class="toast-success">Descuento agregado.</div>', 3000);
    }

    $rootScope.addDelivery = function (delivery)
    {

        $rootScope.delivery = delivery;

        $rootScope.delivery_cost = delivery.cost; console.log(delivery);

        $rootScope.calculateTotals();

        Materialize.toast('<div class="toast-success">Entrega agregada.</div>', 3000);

    }

    $rootScope.removeProduct = function (k , product)
    {

    	if(product.hasOwnProperty('id'))
    	{
    		delete $rootScope.productsSelectedCtrl['product_'+product.id];

    		$rootScope.productsSelected.splice(k,1);

	    	Materialize.toast('<div class="toast-success">Producto eliminado de la venta</div>', 3000);

    	}

        $rootScope.calculateTotals();


    }

    $rootScope.checkAvailability = function (product)
    {

        return !( isNaN(product.quantity) || (product.quantity > product.stock_in_stores[$rootScope.store_id]) );
    }



 }])