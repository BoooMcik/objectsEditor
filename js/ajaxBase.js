var ajaxBase = function()
{
	this.url = '';
	this.data = {};
	this.type = 'POST';
	this.callback = '';
	this.errors = '';
	
	this.get = function()
	{
		var that = this;
		
		if(that.url == '')
			that.errors += 'ERROR: "url" can\'t be empty\r\n';
		
		if(that.errors == '')
		{
			$.ajax({
				url: that.url,
				type: that.type,
				data: that.data,
				success: that.callback
			});
			
			return true;
		}
		
		alert(that.errors);
		return false;
	}
	
	this.post = function(url,callback,params)
	{
		var params = {
			'url'	:	url,
			'type'	:	'POST',
			'data'	:	params,
			'callback' : callback
		};

		this.setConfig(params).get();
	}
	
	this.setConfig = function(params)
	{
		this.url = params.url;
		this.data = params.data;
		this.type = params.type;
		this.callback = params.callback;
		
		return this;
	}
}