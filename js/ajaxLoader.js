var ajaxLoader = function(img)
{
	this.loader = '<div style="display:none;" id="ajaxLoader"><img src="' + img + '" /><div>';
	
	this.show = function(object)
	{
		var that = this;
		$(object).html(that.loader);
		$("#ajaxLoader").css('display','block');
	}
	
	this.hide = function()
	{
		$('#ajaxLoader').css('display' , 'none');
		$('#ajaxLoader').hide();			
	}
}