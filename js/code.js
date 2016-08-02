$(document).ready(function() {

  $('table.tarif').ngResponsiveTables({
    smallPaddingCharNo: 13,
    mediumPaddingCharNo: 18,
    largePaddingCharNo: 30
  });

  $('table.form').ngResponsiveTables({
    smallPaddingCharNo: 13,
    mediumPaddingCharNo: 18,
    largePaddingCharNo: 30
  });


  var hash = window.location.hash || null;
  var tarifItem = null;

//console.log(hash);
  if (hash && hash === '#lightbox') {
      $('.overlay, .lightbox').show();
  }


  $('.overlay').click(function() {
    $('.overlay, .lightbox').hide();
    window.location.hash = '';
  });

  $('.open_lightbox').click(function () {
    $('.overlay, .lightbox').show();
    tarifItem = $(this).attr('data-tarif');
    if (tarifItem) {
      tarifItem--;
      $('.tarif-select option').each(function (index, value) {
        if (tarifItem === index) {
          $('.tarif-select option:contains("'+ this.value +'")').attr('selected', 'selected');
        }
      });

    }
  });


  function subscribe(data) {

    $.ajax({
        url: 'http://cdn.stopsovetnik.ru/subscribe',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        //dataType: 'json',
        async: true,
        success: function(msg) {
            $('#subscribeForm').html('<h4 style="text-align:center;">Спасибо! Вам скоро придет письмо с простой инструкцией.</h4>');
            setTimeout(function () {
              $('.overlay').trigger('click');
            }, 5000);
        }
    });
  }

  $('#subscribeForm').submit(function (e) {
    //console.log(e.target);
    var data = {};

    $('#subscribeForm :input').each(function(){
     var input = $(this); // This is the jquery object of the input, do what you will
     var name = input[0].name;

     if (name) {
      data[name] = input.val();
     }

    });

    subscribe(data);
  });


});



/**
* NG Responsive Tables v1.0
* Inspiration: http://css-tricks.com/examples/ResponsiveTables/responsive.php
* Author: Tomislav Matijević
* List of functions:
*	- targetTable: Searches for each table row , find td and take its current index.
*      Apply to that index same index of table head or td in first table row ( in case there are no table header applied )
*	- checkForTableHead: If there is no table head defined, use td in first table row as table head (prevention mode)
* Config:
* - Adjust paddings
* - On each td there is class named "tdno[index]", so you can modify each td if you need custom padding
*/

(function ( $ ) {
	$.fn.ngResponsiveTables = function(options) {
		var defaults = {
		smallPaddingCharNo: 5,
		mediumPaddingCharNo: 10,
		largePaddingCharNo: 15
		},
		$selElement = this,
		ngResponsiveTables = {
			opt: '',
			dataContent: '',
			globalWidth: 0,
		init: function(){
			this.opt = $.extend( defaults, options );
			ngResponsiveTables.targetTable();
		},
		targetTable: function(){
			var that = this;
			$selElement.find('tr').each(function(){
				$(this).find('td').each(function(i, v){
					that.checkForTableHead( $(this), i );
					$(this).addClass('tdno' + i);
				});
			});
		},
		checkForTableHead: function(element, index){
			if( $selElement.find('th').length ){
				this.dataContent = $selElement.find('th')[index].textContent;
			}else{
				this.dataContent = $selElement.find('tr:first td')[index].textContent;
			}
			// This padding is for large texts inside header of table
			// Use small, medium and large paddingMax values from defaults to set-up offsets for each class
			if( this.opt.smallPaddingCharNo > $.trim(this.dataContent).length ){
				element.addClass('small-padding');
			}else if( this.opt.mediumPaddingCharNo > $.trim(this.dataContent).length ){
				element.addClass('medium-padding');
			}else{
				element.addClass('large-padding');
			}
			element.attr('data-content', this.dataContent);
		}
	};

	$(function(){
		ngResponsiveTables.init();
	});
		return this;
	};

}( jQuery ));
