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
        $(ev.statuses).each(function(index, status){
        	$('<img/>').attr('src', status.bmiddle_pic).load(function(){
                var numChildren = $('#wrapper').children().length;
        		var index = Math.floor(Math.random() * numChildren);
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
//        		var effect = Status.effects[Math.floor(Math.random() * Status.effects.length)];
//        		$newCube[effect]('slow');
//        		$oldCube[effect]('slow', function() {
//        			$(this).remove();
//        		});
//        		if ($.browser.webkit){
//            		$newCube = $('<div class="cube in"><span class="name"></span></div>');
//            		$newCube.prepend(this);
//            		$('.name', $newCube).html(screen_name_link);
//            		$container.addClass('animating').append($newCube);
//            		$oldCube.addClass('out').bind('webkitAnimationEnd', function(){
//            			$container.removeClass('animating');
//            			$(this).remove();
//            		});
//    		    } else {
//    		        $('img', $oldCube).attr('src', status.bmiddle_pic);
//            		$('.name', $oldCube).html(screen_name_link);
//    		    }
        	}); 
        });
    },
    positionAll: function(){
        var columns = 5;
        var width = parseInt($('.container').css('width'));
    	$('.container').each(function(index, item){
    		$(item).css('top', 10+parseInt(index / columns) * width +'px')
    			   .css('left', 10+(index % columns) * width +'px');
    	});
    }
};

$(document).bind("newStatus", Status.onNewStatus).ready(Status.positionAll);