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
					tmp.find('.edit').find('img').attr('data-id',value.id);
					tmp.find('.remove').find('img').attr('data-id',value.id);
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
	
	this.editTypesCategory = function()
	{
		(new modalWindow('editTypesCategoryWindow')).show();
	}
	
	this.deleteTypeCategory = function(sender)
	{
		var params = {
			'OK'	:	{
				'element'	:	'.okButton',
				'attr'		:	'data-action',
				'value'		:	'confirmTypeCategoryDelete'
			},
			'Cancel'	:	{
				'element'	:	'.cancelButton',
				'attr'		:	'data-action',
				'value'		:	'cancelTypeCategoryDelete'
			},
			'ID'		:	{
				'element'	:	'#id',
				'attr'		:	'value',
				'value'		:	sender.attr('data-id')
			},
			'Offset'	:	{
				'element'	:	'#confirmWindow',
				'css'		:	'margin-top',
				'value'		:	((sender.offset().top - 200) < 0) ? '0' : (sender.offset().top - 200) + "px"
			}
		};
		
		console.info(params);
		(new modalWindow).showConfirmWindow(params);
	}
	
	this.cancelTypeCategoryDelete = function()
	{
		this.closeWindow();		
	}
	
	this.confirmTypeCategoryDelete = function()
	{
		var callback = function(data)
		{
			console.info(data);
		};
		
		var params = {
			'token'	:	(new registry).getToken(),
			'id'	:	$((new modalWindow).getConfirmWindowId()).find('#id').val()
		};
		
		(new REST).get('CategoriesTypes.delete.json',callback,params);
		this.closeWindow();
	}
	
	this.closeWindow = function()
	{
		(new modalWindow).close();
		this.categoriesTypes();
	}
}