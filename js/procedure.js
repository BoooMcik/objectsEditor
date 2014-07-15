$(function(){
	
	if((new authorization).isAuthorized())
		(new actions).loadControlPanel();
	else
		(new template).get('loginForm','#main');
	
	$('#main').on('click','#submit',function(){
		(new authorization).login($('#login').val(),$('#password').val());
		console.info((new registry).get('token'));
	});
	
	$('#main').on('click','.menuItem',function(){
		console.info($(this).attr('data-action'))
		if($(this).attr('data-action') != undefined)
		{
			method = $(this).attr('data-action');
			(new actions)[method]();
		}
	});
});