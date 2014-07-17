var modalWindow = function(templateFile)
{
	this.templateFile = templateFile;
	this.modalWindowPlace = '#fullWindow';
	$('#fullHeight').height($(window).height());

	
	this.show = function(data)
	{
		(new template).get(this.templateFile,this.modalWindowPlace,data,true);
		$(this.modalWindowPlace).css('display','block');
	}
	
	this.close = function()
	{
		$(this.modalWindowPlace).find('.window').remove();
		$(this.modalWindowPlace).css('display','none');
	}
	
	this.showConfirmWindow = function(params)
	{
		(new template).get('confirmWindow',this.modalWindowPlace,params,true);
		$(this.modalWindowPlace).css('display','block');
	}
	
	this.getConfirmWindowId = function()
	{
		return '#confirmWindow';
	}
}