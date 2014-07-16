var tools = function()
{
	this.count = function(object)
	{
		var count = 0;
		for(var prs in object)
		{
			if(object.hasOwnProperty(prs)) count++;
		}
		return count; 
	}
}