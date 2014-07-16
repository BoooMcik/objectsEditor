var actions = function()
{
	this.logout = function()
	{
		(new authorization).logout();
	}
	
	this.loadControlPanel = function()
	{
		(new template).get('controlPanel','#main');
		(new template).get('mainPage','#body');
	}
	
	this.objects = function()
	{
		(new ajaxLoader('/images/ajaxLoader.gif')).show('#body');
		(new template).get('objectsPage','#body');
	}
	
	this.main = function()
	{
		(new ajaxLoader('/images/ajaxLoader.gif')).show('#body');
		(new template).get('mainPage','#body');
	}
	
	this.categoriesTypes = function()
	{
		(new ajaxLoader('/images/ajaxLoader.gif')).show('#body');
		
		var callback = function(data)
		{
			if(data.status == '200')
			{
				var line = $('.tableBody .contentLine');
				var i = 0;
				$.each(data.data,function(key, value){
					tmp = line.clone();
					tmp.find('.id').text(value.id);
					tmp.find('.name').text(value.name);
					tmp.removeClass('hide');
					if((i) % 2 == 0)
						tmp.removeClass('gray');
					$('.tableBody').append(tmp);
					i++;
				});
			}
		};
		
		var params = {
			'token'	:	(new registry).getToken()
		};
		
		(new REST).get('CategoriesTypes.get.json',callback,params);
		(new template).get('categoriesTypes','#body');
	}
}