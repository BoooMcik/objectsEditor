var authorization = function()
{
	this.login = function(login,password)
	{
		(new ajaxLoader('/images/ajaxLoader.gif')).show('#main');
		
		var callback = function(data,status)
		{
			if(status == 'success')
			{
				(new registry).set('token',data.token);
				(new actions).loadControlPanel();
				(new ajaxLoader).hide();
			}
		}
		
		
		var ajax = new ajaxBase();
		
		ajax.post('http://rest.my.local/users.logout.json',callback,{
			'login' 	: login,
			'password' 	: password
		});		
	}
	
	this.isAuthorized = function()
	{
		return (new registry).get('token') != false;
	}
	
	this.logout = function()
	{
	
		(new ajaxLoader('/images/ajaxLoader.gif')).show('#main');
	
		var callback = function(data,status)
		{
			if(status == 'success')
			{
				(new registry).unset('token');
				(new template).get('loginForm','#main');
				(new ajaxLoader).hide();
			}
		}
		
		var ajax = new ajaxBase();
		
		ajax.post('http://rest.my.local/users.logout.json',callback,{
			'token' 	: (new registry).get('token')
		});			
	}
}