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
}