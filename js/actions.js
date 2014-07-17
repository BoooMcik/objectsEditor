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
	
	this.editTypesCategory = function(sender)
	{
		
		var callback = function(data)
		{
			var params = {
				'WindowHeight'	:	{
					'element'	:	'#editTypesCategoryWindow',
					'css'		:	'height',
					'value'		:	'100px'
				},
				'OK'	:	{
					'element'	:	'.okButton',
					'attr'		:	'data-action',
					'value'		:	'confirmTypeCategoryEdit'
				},
				'Cancel'	:	{
					'element'	:	'.cancelButton',
					'attr'		:	'data-action',
					'value'		:	'closeWindow'
				},
				'Offset'	:	{
					'element'	:	'#editTypesCategoryWindow',
					'css'		:	'margin-top',
					'value'		:	((sender.offset().top - 200) < 0) ? '0' : (sender.offset().top - 200) + "px"
				}
			};
			if(sender.attr('data-id') != undefined)
			{
				params.Name = {
					'element'	:	'#name',
					'attr'		:	'value',
					'value'		:	data.data[0].name
				};
				params.ID = {
					'element'	:	'#id',
					'attr'		:	'value',
					'value'		:	sender.attr('data-id')
				};
			}
			
			(new modalWindow('editTypesCategoryWindow')).show(params);		
		}
		
		var data = {
			'token'	:	(new registry).getToken(),
			'id'	:	sender.attr('data-id')
		};
		
		(new REST).get('CategoriesTypes.get.json',callback,data)
		
	}
	
	this.confirmTypeCategoryEdit = function(sender)
	{
		if($('#name').val() == '')
		{
			alert('Не заполнено название');
			return;
		}
		
		var data = {
				'token'	:	(new registry).getToken(),
				'name'	:	$('#name').val()
		};	
		
		var that = this;
		
		var callback = function(data)
		{
			if(data.status == '200')
				that.closeWindow()
			else
				alert('Ошибка при создании категории');
		};
		
		if($('#id').val() == '')
		{
			(new REST).get('CategoriesTypes.add.json',callback,data);
		} else {
			data.id = $('#id').val();
			(new REST).get('CategoriesTypes.edit.json',callback,data);
		}
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
				'value'		:	'closeWindow'
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
		
		(new modalWindow).showConfirmWindow(params);
	}
	
	this.confirmTypeCategoryDelete = function()
	{
	
		var that = this;
	
		var callback = function(data)
		{
			that.closeWindow();
		};
		
		var params = {
			'token'	:	(new registry).getToken(),
			'id'	:	$((new modalWindow).getConfirmWindowId()).find('#id').val()
		};
		
		(new REST).delete('CategoriesTypes.delete.json',callback,params);

	}
	
	this.closeWindow = function()
	{
		(new modalWindow).close();
		this.categoriesTypes();
	}
}