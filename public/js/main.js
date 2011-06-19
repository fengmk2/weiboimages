var socket = new io.Socket();
socket.connect();
socket.on('message', function(data){ 
	$(document).trigger(data);
});

var Status = {
	effects: [
	          ['slide', 'up', 'down'], ['slide', 'down', 'up'],
	          ['clip', 'vertical', 'horizontal'], ['clip', 'horizontal', 'vertical'],
	          ['clip', 'vertical', 'vertical'], ['clip', 'horizontal', 'horizontal'],
	          ['drop', 'up', 'down'], ['drop', 'down', 'up']
	],
    onNewStatus: function(ev) {
    	var count = $('#wrapper').children().length;
        $(ev.statuses).each(function(_, status){
        	$('<img/>').attr('src', status.bmiddle_pic).load(function(){
        		var index = Math.floor(Math.random() * count);
        		var $container = $($('#wrapper').children()[index]);
        		var $oldCube = $('.cube', $container);
        		var screen_name_link = '<a href="{{t_url}}" target="_blank">@{{screen_name}}</a>'.format(status.user);
        		var $newCube = $('<div class="cube"><span class="name"></span></div>');
        		$newCube.prepend(this);
        		$('.name', $newCube).html(screen_name_link);
        		$newCube.prepend(this).hide();
        		$container.append($newCube);
        		var effect = Status.effects[Math.floor(Math.random() * Status.effects.length)];
        		$newCube.show(effect[0], { direction: effect[1] }, 1800);
        		$oldCube.hide(effect[0], { direction: effect[2] }, 1800, function() {
        			$(this).remove();
        		});
        	}); 
        });
    },
    positionAll: function(){
        var columns = 5;
        var width = parseInt($('.container').css('width'));
    	$('.container').each(function(index, item){
    		$(item).css('top', 10 + parseInt(index / columns) * width +'px')
    			   .css('left', 10 + (index % columns) * width +'px');
    	});
    }
};

$(document).bind("newStatus", Status.onNewStatus).ready(Status.positionAll);