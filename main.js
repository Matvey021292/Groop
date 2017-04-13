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
    });

    //preload image
    function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
        	$('.thumbnails .upload').before('<li class="thumb "><span class="thumb-container"><img src="http://img.grouponcdn.com/msse/24e8u1eFsD2J5hs8yAzS5KhJjSgG/24-960x720.jpg"></span><span class="remove"></span></li>');
            $('.thumb').last().find('img').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

	$("#upload-input-file").change(function(){
	    readURL(this);
	});

	$('.thumbnails .upload').click(function (e) {
		$("#upload-input-file").click();
	});

	$('.slides').on('click', 'img', function(e) {
		$('.thumb').removeClass('selected');
		$(this).parents('.thumb').addClass('selected');
		$('.uploaded').attr('src', $(this).attr('src'));
	});
	
	$('.slides').on('click', '.remove', function(e) {
		$(this).parent().remove();
		$('.uploaded').attr('src',$('.slides').first().find('img').attr('src'))

	});


});