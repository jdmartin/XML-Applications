$(document).ready(function() {

    $('div').on('click', '#button1', paintIt);

    $('div').on('click', '#button2', editList);

    $('div').on('click', '#button3', swapDivs);

    $('div').on('click', '#button4', forValhallaClick);

    $("div").on('click', 'button#button5', apertureScience);

    $("div").on('click', 'button#button6', addListItems);


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

    function paintIt() {
        if ($.trim($(this).text()) === 'Paint It') {
            $(this).text('Unpaint It');
        }
        $('link[href="css/jquerydemo2.css"]').attr('href','css/jquerydemo3.css');
        $("button#button1").off('click').on('click', unpaintIt);
        return false;
    }

    function unpaintIt() {
        if ($.trim($(this).text()) === 'Unpaint It') {
            $(this).text('Paint It');
        } 
        $('link[href="css/jquerydemo3.css"]').attr('href','css/jquerydemo2.css');
        $("button#button1").off('click').on('click', paintIt);
        return false;
    }

    function addListItems() {
        var formInput = $('input[type="text"]').val() // Get value of textarea
        var replacementVal = '<li>' + formInput + '</li>'
        $('ul#original').append(replacementVal);
        return false;
    }

    function swapDivs() {
        $('input[type="checkbox"]').remove();

        var second = $("#second").html();
        var third = $("#third").html();
        $("#second").html(third);
        $("#third").html(second);
        $("button#button3").off('click').on('click', unswapDivs);
        return false;
    }

    function unswapDivs() {
        $('input[type="checkbox"]').remove();

        var second = $("#second").html();
        var third = $("#third").html();
        $("#second").html(third);
        $("#third").html(second);
        $("button#button3").off('click').on('click', swapDivs);
        return false;
    }

    function forValhallaClick() {
        $('ul#original li:nth-child(1)').text('Legends never die. <blink> 4 eva!').blink({color:'white'}, {color:'black'}, 100);
        $("button#button4").off('click').on('click', ragnarokClick);
        return false;
    }

    function ragnarokClick() {
        $('ul#original li:nth-child(1)').text('One').blink({color:'black'},{color:'black'},0);
        $("button#button4").off('click').on('click', forValhallaClick);
        return false;
    }

    function apertureScience() {
        $('#second').toggleClass('secret');
        $('#secret').toggleClass('secret');
        $('#footer p').text('The Cake Is A Lie.');
        $("button#button5").off('click').on('click', theCakeIsALie);
        return false;
    }

    function theCakeIsALie() {
        $('#secret').toggleClass('secret');
        $('#second').toggleClass('secret');
        $('#footer p').text('I\'m still the footer');
        $("button#button5").off('click').on('click', apertureScience);
        return false;
    }

    function editList() {
        $('input[type="checkbox"]').remove();

        $("ul#original li").each(function(index) {
            var insertBoxes = '<input type="checkbox" name="' + index + '"> ';
            $('ul#original li').eq(index).prepend(insertBoxes);
        });

        $('input[type="checkbox"]').click(function() {
            var removeItem = $(this).attr("name");
            $('ul#original li').eq(removeItem).remove();
            editList();
        });
    }
});
