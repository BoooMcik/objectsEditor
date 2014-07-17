var REST = function()
{
	this.get = function(method,callback,params)
	{
		var ajax = new ajaxBase();
		
		ajax.post('http://rest.my.local/' + method,callback,params);	
	}
}