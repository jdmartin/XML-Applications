$(document).ready(function() {
    $('#button1').click(function() {
        $('#nav').toggleClass('active');
    });

    $('#button2').click(function() {
        $('#second ul li:nth-child(1)').toggleClass('invert');
    });

    $('#button3').click(function() {
        $('#second ul li:nth-child(3)').toggleClass('invert');
    });

    $('#button4').on('click', forValhallaClick);

    $("button#button5").on('click', showNotesClick);

    jQuery.fn.extend({
        blink: function(params1, params2, timer) {
            return this.each(function() {
                var e = jQuery(this);
                if (params1) e.data('_blink_params1', params1);
                if (params2) e.data('_blink_params2', params2);
                if (timer) e.data('_blink_timer', timer);
                e.css('transition', 'none');
                if (e.data('_blink_state')) {
                    e.animate(e.data('_blink_params2'), e.data('_blink_timer'), function() {
                        e.blink();
                    });
                    e.data('_blink_state', 0);
                } else {
                    e.animate(e.data('_blink_params1'), e.data('_blink_timer'), function() {
                        e.blink();
                    });
                    e.data('_blink_state', 1);
                }
            });
        }
    });

    function showNotesClick() {
        $('#second ul li:nth-child(5)').text('I\'m in ur list, making it unreliable.');
        $("button#button5").off('click').on('click', hideNotesClick);
        return false;
    }

    function hideNotesClick() {
        $('#second ul li:nth-child(5)').text('Five');
        $("button#button5").off('click').on('click', showNotesClick);
        return false;
    }

    function forValhallaClick() {
        $('#second ul li:nth-child(1)').text('Legends never die. <blink> 4 eva!').blink({color:'white'}, {color:'black'}, 100);
        $("button#button4").off('click').on('click', ragnarokClick);
        return false;
    }

    function ragnarokClick() {
        $('#second ul li:nth-child(1)').text('One').blink({color:'black'},{color:'black'},0);
        $("button#button4").off('click').on('click', forValhallaClick);
        return false;
    }
});
