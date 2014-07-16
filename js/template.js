var template = function()
{

	this.data = '';
	
	this.get = function(name,id, params = {}, append = false)
	{
		callback = function(data)
		{
			
			if(append == false)
				$(id).html(data);
			else
				$(id).append(data);
			if((new tools).count(params) != 0)
			{
				$.each(params,function(key,value){
					if(value.attr != undefined)
						$(value.element).attr(value.attr,value.value);
					if(value.css != undefined)
						$(value.element).css(value.css,value.value);
				});
			}
		}
		
		var ajax = new ajaxBase();
		
		ajax.post( name + '.html',callback);
	}
}