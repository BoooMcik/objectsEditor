var registry = function()
{
	this.get = function(key)
	{
		return (localStorage.getItem(key) == undefined) ? false : localStorage.getItem(key);
	}
	
	this.set = function(key,value)
	{
		localStorage.setItem(key,value);
	}
	
	this.unset = function(key)
	{
		localStorage.removeItem(key);
	}
}