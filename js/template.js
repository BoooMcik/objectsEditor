var template = function()
{

	this.data = '';
	
	this.get = function(name,id)
	{
		callback = function(data)
		{
			$(id).html(data);
		}
		
		var ajax = new ajaxBase();
		
		ajax.post( name + '.html',callback);
	}
}