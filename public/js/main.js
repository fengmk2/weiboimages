var socket = new io.Socket();
socket.connect();
socket.on('message', function(data){ 
	$(document).trigger(data);
});

var Status = {
    onNewStatus: function(ev) {
        $(ev.statuses).each(function(index, status){
        	$('<img/>').attr('src', status.bmiddle_pic).load(function(){
                var numChildren = $('#wrapper').children().length;
        		var index = Math.floor(Math.random() * numChildren);
        		var $container = $($('#wrapper').children()[index]);
        		var $oldCube = $('.cube', $container);
                if ($.browser.webkit){
            		$newCube = $('<div class="cube in"><span class="name"></span></div>');
            		$newCube.prepend(this);
            		$('.name', $newCube).html('<a href="{{t_url}}" target="_blank">@{{screen_name}}</a>'.format(status.user));
            		$container.addClass('animating').append($newCube);
            		$oldCube.addClass('out').bind('webkitAnimationEnd', function(){
            			$container.removeClass('animating');
            			$(this).remove();
            		});
    		    } else {
    		        $('img', $oldCube).attr('src', status.bmiddle_pic);
            		$('.name', $oldCube).html(status.screen_name);
    		    }
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