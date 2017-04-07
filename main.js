var $ = jQuery;
$(document).ready(function(){
	$('.regular-price-wrap > input').keyup(function(e){
		var self = 	$(this);
		self.removeClass('error');
		var parent = $(this).parent().parent();
		parent.find('.error-text').each(function(){
			$(this).hide();
		});
		if(isNaN(self.val())) {
			parent.find('.bad-range').show();
			self.addClass('error');
            return;
		} else if(self.val() < 2){
            parent.find('.too-small').show();
            self.addClass('error');
            return;
		} else if(self.val() > 999){
            parent.find('.too-large').show();
            self.addClass('error');
            return;
        } else {
        	if(self.hasClass('regularPrice')) {
        		$('.deal_value').find('dd').text('$' + self.val());
        	} else if(self.hasClass('discountAmount')){
                $('.deal_discount').find('dd').text(self.val() + '%');
            }
            $(this).parents('.accordion-body').find('.btn-buy').prop('disabled', false);
        }

	});
	
	$('.btn-buy').click(function (e) {
		e.preventDefault();
		$(this).parents('.accordion-group').removeClass('open').addClass('closed').addClass('completed');
		$(this).parents('.accordion-group ').parent().next().find('.accordion-group').removeClass('closed').addClass('open');
    });

	$('.accordion-heading a').click(function (e) {
		e.preventDefault();
		$('.accordion-group').removeClass('open').addClass('closed');
		if(!$(this).parents('.accordion-group').hasClass('completed')) {
			return false;
		}
        $(this).parents('.accordion-group').removeClass('closed').addClass('open');
		return false;
    })


});