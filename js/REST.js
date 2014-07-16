var REST = function()
{
	this.get = function(method,callback,params = {})
	{
		var ajax = new ajaxBase();
		
		ajax.post('http://api.638.local/' + method,callback,params);	
	}
}