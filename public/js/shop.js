jQuery.noConflict();
jQuery(document).ready(function($){


 
/*========Login=========*/
	$("#FormLogin").submit(function(){
		$('.msg-alert').html('');
		$('.progress-bar').show();
		$.ajax({
			type: 'POST',
			url: ajaxURL+'tb-content/modules/member/user/act.login.php',
			data: $("#FormLogin").serialize(),
			dataType: 'json',
			success: function(data)
			{
				if(!data.error)
				{
						$('.msg-alert').html('<div class="alert alert-success">'+data.alert+'</div>');
						window.location = baseURL+'member.html';
						
				}
				else
				{
						$('.msg-alert').html('<div class="alert alert-warning">'+data.alert+'</div>');
				}
				$('.progress-bar').hide();
			}
		});
		return false;
	});
/*========Daftar=========*/
	$("#FormSignin").submit(function(){
		$('.msg-alert').html('');
		$('.progress-bar').show();
		$.ajax({
			type: 'POST',
			url: ajaxURL+'tb-content/modules/member/user/act.signup.php',
			data: $("#FormSignin").serialize(),
			dataType: 'json',
			success: function(data)
			{
				if(!data.error)
				{
					$(":input","#FormSignin")
					.val("")
					.attr("readonly","readonly");
						$('.msg-alert').html('<div class="alert alert-success"><ul>'+data.alert+'</ul></div>');
						
						
				}
				else
				{
						$('#password').val('');
						$('.msg-alert').html('<div class="alert alert-warning"><ul>'+data.alert+'</ul></div>');
				}
				Recaptcha.reload();
				$('.progress-bar').hide();
			}
		});
		return false;
	});



/*========Simpan alamat==========*/
	$("#FormAlamat").submit(function(){
		$('.msg-alert').html('');
		$('.progress-bar').show();
		$.ajax({
			type: 'POST',
			url: ajaxURL+'tb-content/modules/member/user/act.prov.php',
			data: $("#FormAlamat").serialize(),
			dataType: 'json',
			success: function(data)
			{
				if(!data.error)
				{
						$('.msg-alert').html('<div class="alert alert-success">'+data.alert+'</div>');
						window.location = baseURL+'member.html';
						
				}
				else
				{
						$('.msg-alert').html('<div class="alert alert-warning">'+data.msg_alert+'</div>');
				}
				$('.progress-bar').hide();
			}
		});
		return false;
	});
/*==============Edit Alamat==========*/
	$(".edit-alamat").click(function(e){
		e.preventDefault();
		var id=$(this).data('id');
		$.ajax({
			type: 'POST',
			url: ajaxURL+'tb-content/modules/member/user/act.alm-edit.php',
			data: {id:id},
			dataType: 'json',
			success: function(data)
			{
				if(!data.error)
				{
											
				}
				else
				{

				}
				
			}
		});
		return false;
	});
/*==============Delete alamat==========*/
	$(".del-alamat").click(function(e){
		e.preventDefault();
		var delid=$(this).data('id');
		$.ajax({
		type: 'POST',
		url: ajaxURL+'tb-content/modules/member/user/act.prov.php',
		data: {delid:delid},
		dataType: 'json',
		success: function(data)
			{
				window.location = baseURL+'member.html';
			}
		});
		return false;
	});


$(".id_utama").on('change', function(e){
	e.preventDefault();
	var cekalamat=$(this).attr('id');
	$.ajax({
		type: 'POST',
		url: ajaxURL+'tb-content/modules/member/user/act.prov.php',
		data: {cekalamat:cekalamat},
		dataType: 'json'
		});
	return false;
});	

/*---------------------------------------------------
	modal boostrap produk
----------------------------------------------------*/
	  $('.detail').on('click', function(e){
	  	e.preventDefault();	/*--untuk menghentikan reload--*/
	  	var produkID	= $(this).data('album');
	  	detailproduk(produkID);
	  	});
	  	function detailproduk(produkID){
            $.ajax({
				type: 'POST',
				url: ajaxURL+'tb-content/modules/produk/user/produk.dinamic.php',
				data: {produk:produkID},
				dataType: 'json',
				success: function(data){
					$(this).lightGallery({
						dynamic: true,
						dynamicEl: data.photos
					})
				}
			});	
			return false;
        };
	/*---------------------------------------------------
	Menampilkan modal untuk add to cart
	----------------------------------------------------*/
	function belicart(dataid){
		var xajaxFile = ajaxURL+"tb-content/modules/produk/user/modal.php";
		$('.msg-alert').html('');
		$.ajax({
			type: 'POST',
			url: xajaxFile,
			data: {id:dataid},
			dataType: 'json',
			success: function(data){
				
				if(!data.error){
					$("#myModal").modal('show');
					$(".msg-alert").html(data.alert);
					$(".nama_barang").html(data.namabarang);
		
				}
				else{
					$(".msg-alert").html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span class="glyphicon glyphicon-exclamation-sign iconleft" aria-hidden="true"></span> '+data.alert+"</div>");
				}
				$('#qtymin').click(function(){
					var fromqty=parseInt($('#fromqty').val())-1;
					if(fromqty<=1)
						{
							$('#fromqty').val('1');
						}
					else
						{
							$('#fromqty').val(fromqty);
						}
					});
					$('#qtyplus').click(function(){
					var fromqty=parseInt($('#fromqty').val())+1;
					$('#fromqty').val(fromqty);
				});
				$(function() {
					$('#fromqty-input').on('keydown', '#fromqty', function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
				});
			}
		});
		return false;
	}

$(".beli").on('click', function(e){
		e.preventDefault();
		belicart($(this).attr('data-id'));
});


/*---------------------------------------------------
	cek Categori 
	----------------------------------------------------
$(window).resize(function(){
			if ($(window).width() >= 800){	
				$(".cate-carousel .owl-item").attr('style', 'width: 100px !important');
			}
		});	*/
		if($('.section-catalogue .cate .cate-carousel span').length >6)
		{
			$(".cate-carousel").owlCarousel({
				items : 6,
				lazyLoad : true,
				navigation : true,
				navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
				pagination : false,
				itemsDesktop : [1199, 4],
		        itemsDesktopSmall : [979, 4],
		        itemsTablet : [768, 4],
		        itemsTabletSmall : false,
		        itemsMobile : [479, 2],
			});
		}
		else
		{
			$('.cate .cate-carousel .btn.btn-default').css('display','inline-block').css('margin-bottom','5px');
		}


		$(".data-cate").click(function(e){
			e.preventDefault();
			var idcat=$(this).data('id');

			produklist(idcat);


			


			$(".beli").on('click', function(e){
			e.preventDefault();
			belicart($(this).attr('data-id'));
			});


			$('.detail').on('click', function(e){
			e.preventDefault();	/*--untuk menghentikan reload--*/
			var produkID	= $(this).data('album');
			detailproduk(produkID);
			});


			$(".cate-carousel span").removeClass('active');
			$("#cat_"+idcat).addClass('active');
			
		
		});

		function produklist(idcat){
			jQuery(function ($) {

				$.ajax({
					type: 'POST',
					url: ajaxURL+'tb-content/themes/paramarakids/dataJson/produklist.php',
					data: {idcat:idcat},
					dataType: 'json',
						success: function(data){
							
							$(".produk-home").html(data.listProduk);

							$(".produk-linkcat").attr('href',data.linkcat);

							$(".beli").on('click', function(e){
							e.preventDefault();
							belicart($(this).attr('data-id'));
							});


							$('.detail').on('click', function(e){
							e.preventDefault();	/*--untuk menghentikan reload--*/
							var produkID	= $(this).data('album');
							detailproduk(produkID);


							});
						}
					});
				});
			
		};
 produklist();

/*---------------------------------------------------
setcookie for preorder
----------------------------------------------------*/
/*		 $("li .order-type-Readystok").on("click", function(event) {
	 	event.preventDefault();
		var preorder =$.cookie("preorder");
		if(preorder!=1){
				$.cookie("preorder", "1", { expires: 7, path: '/'  });
				window.location = $(this).attr('href');
				}
		else{
			
			$.cookie("preorder", "0", { expires: 7, path: '/'  });
			window.location = $(this).attr('href');
		}
		
	});
if($.cookie('preorder')==1)
	{
		$('.skin-style').attr('href',themeURL+'assets/css/skin4.css');
	}
---------------------------------------------------
proses memasukan ke kranjang
----------------------------------------------------*/	 
	$("#beliBarang").submit(function(){
		var xajaxFile = ajaxURL+"tb-content/modules/produk/user/act.cart.php";
		$('.progress-bar').show();
		$.ajax({
			type: 'POST',
			url: xajaxFile,
			data: $("#beliBarang").serialize(),
			dataType: 'json',
			success: function(data){

				$(".tbl-cart").html(data.listcart);

					/*untuk memmanggil fungsi delet*/
					$('.delcart').on('click', function(e){
						e.preventDefault();
						var del=$(this).data('id');
						delcart(del);
					});

					/*untuk memmanggil fungsi beli*/
					$(".beli").on('click', function(e){
							e.preventDefault();
							belicart($(this).attr('data-id'));
					});

					$(".ttlcart").text(data.ttlcart);
					$(".cart-amunt").text(data.totaldiscart);
					$(".beratsatuan").text(data.beratsatuan);
					$(".item_holder").html(data.listcart);
	
				if(!data.error){
					$("#myModal").modal('hide');
					$(".product-count").text(data.quant);
						
					}
				else{
					//alert($('.border-qty').text());
					$(".msg-cart").html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span class="glyphicon glyphicon-exclamation-sign iconleft" aria-hidden="true"></span> Stok tidak mencukupi</div>');
					}
				$('.progress-bar').hide();
			}
		});
		return false;
	});	
	$('.delcart').on('click', function(e){
			e.preventDefault();
			var del=$(this).data('id');
			delcart(del);
	});

/*fungsi delete--*/
	function delcart(del){
		///alert(del);
	  	var xajaxFile = ajaxURL+"tb-content/modules/produk/user/act.cart.php";
		//var del = del;
		$('.msg-cart').html('');
		$('.totaldiskon').html('');
		$(".beratsatuan").html('');
		$.ajax({
			type: 'POST',
			url: xajaxFile,
			data: ({del:del}),
			dataType: 'json',
			success: function(data){
				
				if(!data.errordel){
						$(".tbl-cart").html(data.listcart);

						$('.delcart').on('click', function(e){
						e.preventDefault();
						var del=$(this).data('id');
						delcart(del);
						});
						/*untuk memmanggil fungsi beli*/
						$(".beli").on('click', function(e){
						e.preventDefault();
						belicart($(this).attr('data-id'));
						});
						$(".ttlcart").html(data.ttlcart);
						$(".cart-amunt").html(data.totaldiscart);
						$(".beratsatuan").html(data.beratsatuan);
						$(".quanty").html('<span>'+data.quant+'</span>');
						$(".item_holder").html(data.listcart);
					}
					else
					{
						window.location = baseURL+'shop.html';

					}
			}
		});
		return false;
	}
	
/*----------------------------------------------------
	list Detail cart
----------------------------------------------------*/
$(".detail-list-cart").on('click', function(e){
		e.preventDefault();
		var mini_cart= $('.mini_cart').attr('class');
		//alert(mini_cart);
		var cart =$.cookie("cart");
		if(!cart)
		{
			alert('Cart is empty');
		}
		else
		{
			
			if(mini_cart=='mini_cart open')
			{
				$('.mini_cart').hide().attr('class','mini_cart').fadeIn( 0 ).fadeOut( 500 );
			}
			else
			{

				$('.mini_cart').show().attr('class','mini_cart open').fadeOut( 0 ).fadeIn( 500 );
			}
			//window.location = baseURL+'detail-cart.html';	
		}
		
			
	});

/*---------------------------------------------------
	Detail Produk
----------------------------------------------------*/
	$('#veiwimg img').click(function(){
		var imgmini = $(this).attr('src');
		var imglarge = $(this).attr('data-img');
		var imglamakecil = $("#hasil img").attr("src");
		var imglamalarge = $("#hasil img").attr("data-magnify-src");
		var imgid = $(this).attr("id");
		$('#hasil').fadeOut( 0 );
		$('#hasil').fadeIn( 500 );
		$('#hasil').html('<img  src="'+imgmini+'" id="jajal" data-magnify-src="'+imglarge+'">');
		if($(window).width() > 767.9)
		{   
		$('#jajal').magnify();
		}
			
		 $("#veiwimg #"+imgid).fadeOut( 0 );
		 $("#veiwimg #"+imgid).fadeIn( 500 );
		 $("#veiwimg #"+imgid).attr("src",imglamakecil).attr("data-img",imglamalarge);
		
	});
	/*----------------------------------------------------
if($(window).width() > 767.9)
{   
$('#jajal').magnify();
}
	
	checkout-step
	----------------------------------------------------*/
	$(".checkout-step").on('click', function(e){
		e.preventDefault();
		$('.formcekout').fadeOut( 0 );
		$('.formcekout').fadeIn( 500 );
		$('.action').fadeOut( 0 );
		$('.action').fadeIn( 500 );
		$('.action').hide();
		$('.progress-bar').show();
		window.location = baseURL+'pengiriman.html';
		//var test = $('.action').fadeIn( 500 );

		//$('.formcekout').load(ajaxURL+"tb-content/modules/produk/shipping/step_2.php");	
			
	});

	/*----------------------------------------------------
	checkout-step-2 
	----------------------------------------------------*/
	/*----------------------------------------------------
	Get-kota
	----------------------------------------------------*/
	$('.GetProv').change(function(){
		var idselect = $(this).val();
		var id = $(this).attr('id');
		prov(id,idselect);
		
		
	}); 
	/*----------------------------------------------------
	Get-kota
	----------------------------------------------------*/
	$('.Getkota').change(function(){
		var idselect = $(this).val();
		var id = $(this).attr('id');
		kecamatan(id,idselect);
		
		
	}); 
		/*----------------------------------------------------
	Get-cost
	----------------------------------------------------*/
	$('.Getkecamatan').change(function(){
		var idselect = $(this).val();
		var id = $(this).attr('id');
		cost(id,idselect);
		
		
	}); 
			/*----------------------------------------------------
	Get-Ongkir
	----------------------------------------------------*/
	$('.Getcost').change(function(){
		var idselect = $(this).val();
		var id = $(this).attr('id');
		ongkir(id,idselect);
		
		
	}); 
/*----------------------------------------------------
	function Get-kota
	----------------------------------------------------*/
	function prov(id,idselect){
		$(".Getkota").html('<option value="" >loading...</option>');
		$.ajax({
		type: 'POST',
		url: ajaxURL+'tb-content/modules/produk/shipping/act.cost.php',
		data: {idselect:idselect,id:id},
		dataType: 'json',
		success: function(data){
				var el = $.map( data.select , function( index, value ) {
					 return('<option value="'+value+'" >'+index+'</option>');
				//alert( index + ": " + value );
					});
					$(".Getkota").html(el.join(""));
					
				}
		});
		return false;
	};

/*----------------------------------------------------
	function Get-kecamatan
	----------------------------------------------------*/
	function kecamatan(id,idselect){
		$(".Getkecamatan").html('<option value="" >loading...</option>');
		$.ajax({
		type: 'POST',
		url: ajaxURL+'tb-content/modules/produk/shipping/act.cost.php',
		data: {idselect:idselect,id:id},
		dataType: 'json',
		success: function(data){
				var el = $.map( data.select , function( index, value ) {
					 return('<option value="'+value+'" >'+index+'</option>');
						});
					$(".Getkecamatan").html(el.join(""));
					
				}
		});
		return false;
	};


/*----------------------------------------------------
	function Get-Cost
	----------------------------------------------------*/
	function cost(id,idselect){
		$(".Getcost").html('<option value="" >loading...</option>');
		$.ajax({
		type: 'POST',
		url: ajaxURL+'tb-content/modules/produk/shipping/act.cost.php',
		data: {idselect:idselect,id:id},
		dataType: 'json',
		success: function(data){
				var el = $.map( data.select , function( index, value ) {
					 return('<option value="'+value+'" >'+index+'</option>');
						});
					$(".Getcost").html(el.join(""));
					
				}
		});
		return false;
	};
	/*----------------------------------------------------
	function Get-ongkir
	----------------------------------------------------*/
	function ongkir(id,idselect){
		$(".ongkir").html('loading...');
		$.ajax({
		type: 'POST',
		url: ajaxURL+'tb-content/modules/produk/shipping/act.cost.php',
		data: {idselect:idselect,id:id},
		dataType: 'json',
		success: function(data){
				//alert(data.select);
					$(".ongkir").html(data.select);
					$(".totaldiskon").html(data.total);
					$("#ttlongkir").val(data.ongkir);
				}
		});
		return false;
	};

	/*----------------------------------------------------
	function Checkout
	----------------------------------------------------*/
	$("#FormCheckout").submit(function(){
		$('.msg-alert').html('');
		$('.progress-bar').show();
		$.ajax({
			type: 'POST',
			url: ajaxURL+'tb-content/modules/produk/shipping/act.finisCheckout.php',
			data: $("#FormCheckout").serialize(),
			dataType: 'json',
			success: function(data)
			{
				if(!data.error)
				{
						$('.msg-alert').html(data.msg_alert);
						window.location = baseURL+'pembayaran.html?trx='+data.tran;
						
				}
				else
				{
						$('.msg-alert').html('<div class="alert alert-warning">'+data.alert+'</div>');
				}
				$('.progress-bar').hide();
				Recaptcha.reload();
			}
		});
		return false;
	});
/*----------------------------------------------------
	konfirmasi
----------------------------------------------------*/
$(".bank_anda").on('change', function(e){
	e.preventDefault();
	var lain=$(this).val();
	if(lain=='Bank Lainnya'){
		$('.BankLainnya').fadeOut( 0 );
		$('.BankLainnya').fadeIn( 500 );
		$('.BankLainnya').show();
	}
	else
	{
		$('.BankLainnya').fadeOut( 0 );
		$('.BankLainnya').fadeIn( 500 );
		$('.BankLainnya').hide();
	}
	

});
/*----------------------------------------------------
	konfirmasiform
----------------------------------------------------*/
$(function()
	{
			$('#FormKonfirmasi').on('keydown', '#nominal', function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
		});
/*----------------------------------------------------
	function Checkout
	----------------------------------------------------*/
	$("#FormKonfirmasi").submit(function(){
		    var formData = new FormData($(this)[0]);
			$('.msg-alert').html();
			$('.progress-bar').show();
		    $.ajax({
		        url: ajaxURL+'tb-content/modules/produk/konfirmasi/act.konfirmasi.php',
		        type: 'POST',
		        data: formData,
		        async: false,
		        dataType: 'json',
		        success: function (data) {

					if(!data.error) 
					{
						$(":input","#FormKonfirmasi")
						.val("")
						.attr("readonly","readonly");
						$('#preview').attr('src','');
						$('.msg-alert').html('<div class="alert alert-success">'+data.alertmsg+'</div>');
					}
					else
					{
						$('.msg-alert').html('<div class="alert alert-danger">'+data.alertmsg+'</div>');		
						
					}
					Recaptcha.reload();
					$('.progress-bar').hide();
		        },
		        cache: false,
		        contentType: false,
		        processData: false
		    });

		    return false;
	});
   /* datepicker */
				$(".date-picker").datepicker({
					format: "yyyy-mm-dd",
					autoclose: true,
					todayHighlight: true
				})

/*=======Detail produk===============*/

$('.size li').click(function(){

		var id=$(this).attr('id');
		var idsize=$(this).data('id');
		var selKeyVal = $(this).attr("class");
	
           if(selKeyVal!="size-select select")
				{
					if(selKeyVal!="active"){
						$(this).addClass('select');
						$('.size-toadd').append('<tr id="'+id+'"><td>'+idsize+'<input name="add_ukuran[]" value="'+idsize+'" type="hidden"></td><td><input type="text" id="fromqty" maxlength="4" name="add_qty[]" class="form-control qty-group" value="1"></td><td><a href="#" id="'+id+'" class="cel-size"><i class="fa fa-times"></i></a></td></tr>');
	
					}
					
				}
				else
				{
					$(this).removeClass('select');
					$('.size-toadd #'+id).remove();
				}
				$('.size-toadd #'+id+' .cel-size').click(function(e){
							e.preventDefault();
				celsize(id);
				});
		
		return false;
});
$('.size-toadd .cel-size').click(function(e){
	e.preventDefault();
	var id=$(this).attr('id');
	celsize(id);
});
function celsize(id){
	$('.size-toadd #'+id).remove();
	$('.size #'+id).removeClass('select');
	var count=$('.size-toadd tr').size();
	if(count==1)
	{
		$("#Modaldetail").modal('hide');
		$('.progress-bar').hide();

	}
//alert($('.size #'+id));
};

$('.beli-detail').click(function(){
	var select=false;
		$('.size li').each(function() {
			if($(this).attr('class')=="size-select select")
			{
				select=true;
				$('.size-toadd #'+$(this).attr('id')).show();

			}
			
		$('.size-toadd #'+$(this).attr('id')).on('keydown', '#fromqty', function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
		

		});

		if(select!=true)
		{
			alert('select the size first');
		}
		else
		{
			$("#Modaldetail").modal('show');

		}

	return false;
});

	$("#DetailAddcart").submit(function(){
		var xajaxFile = ajaxURL+"tb-content/modules/produk/user/act.detailcart.php";
		$('.progress-bar').show();

		$.ajax({
			type: 'POST',
			url: xajaxFile,
			data: $("#DetailAddcart").serialize(),
			dataType: 'json',
			success: function(data){
				if(!data.error){
					//$('.quanty').html('<span>'+data.ttlqty+'</span>');
						//alert(data.alert)
						window.location = window.location.href;
					}
				else{
					$('.msg-alert').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span class="glyphicon glyphicon-exclamation-sign iconleft" aria-hidden="true"></span>'+data.alert+'</div>');
					}
				$('.progress-bar').hide();
			}
		});
		return false;
	});	
	

/*=======chekout chek================*/
$('#email').keyup(function(){
		$('#alert_email').attr('class','control-group');
});
$('#username').keyup(function(){
		$('#alert_username').attr('class','control-group');
});
$('#telp').keyup(function(){
		$('#alert_telp').attr('class','control-group');
});

$('#prov').change(function(){
		$('#alert_prov').attr('class','control-group');
});
$('#kota').change(function(){
		$('#alert_kota').attr('class','control-group');
});
$('#kecamatan').change(function(){
		$('#alert_kec').attr('class','control-group');
});

$('.check-information').click(function(){
	var email=$('#email').val();
	var username=$('#username').val();
	var telp=$('#telp').val();
	var error=false;
	if(!email){
			$('#alert_email').attr('class','control-group has-error');
			error=true;
		}
	if(!username){
			$('#alert_username').attr('class','control-group has-error');
			error=true;
		}
	if(!telp){
			$('#alert_telp').attr('class','control-group has-error');
			error=true;
		}
	if(!error){
			//alert('success');
			$('.contact-shipping').show().fadeOut( 0 ).fadeIn( 300 );
			$('.check-information').hide().fadeIn( 0 ).fadeOut( 300 );
		}
	});

$('.check-shipping').click(function(){
	var prov=$('#prov').val();
	var kota=$('#kota').val();
	var kecamatan=$('#kecamatan').val();
	var error=false;
	if(prov==0){
			$('#alert_prov').attr('class','control-group has-error');
			error=true;
		}
	if(kota==0){
			$('#alert_kota').attr('class','control-group has-error');
			error=true;
		}
	if(kecamatan==0){
			$('#alert_kec').attr('class','control-group has-error');
			error=true;
		}
	if(!error){
			//alert('success');
			$('.contact-expedition').show().fadeOut( 0 ).fadeIn( 300 );
			$('.check-shipping').hide().fadeIn( 0 ).fadeOut( 300 );
		}
	});


});
