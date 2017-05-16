$(document).ready(function() {
    //This checks for the existence of a #header, and caches its contents in $stickyEl
    //Then, when it scrolls, we toggle a css class 'sticky', which keeps it positioned at the top.
    if ($("#header").length > 0) {
        $(window).bind("load", function() {
            var $window = $(window),
                $stickyEl = $('#header'),
                elTop = $stickyEl.offset().top;

            $window.scroll(function() {
                $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
            });
        });
    }

    $("a#help").on('click', showHelpClick);

    function showHelpClick() {
        $(this).toggleClass('showHelp');
        $('div#helpbox').show()
            .toggleClass('helpactive');
        $("a#help").off('click').on('click', hideHelpClick);
        return false;
    }

    function hideHelpClick() {
        $(this).toggleClass('showHelp');
        $('div#helpbox').toggleClass('helpactive')
            .hide();
        $("a#help").off('click').on('click', showHelpClick);
        return false;
    }

    $("button#enbiggen").on('click', enbiggenMapClick);

    function enbiggenMapClick() {
        $('div#map').width("90%").height("70%");
        var myEl = document.getElementById('map');

        myEl.addEventListener('click', function() {
            google.maps.event.trigger(map, "resize");
        }, false);
        $("button#enbiggen").text("Ensmallen the Map");
        $("button#enbiggen").off('click').on('click', disEnbiggenMapClick);
        return false;
    }

    function disEnbiggenMapClick() {
        $('div#map').width("70%").height("50%");
        var myEl = document.getElementById('map');

        myEl.addEventListener('click', function() {
            google.maps.event.trigger(map, "resize");
        }, false);
        $('button#enbiggen').text("Enbiggen the Map");
        $("button#enbiggen").off('click').on('click', enbiggenMapClick);
        return false;
    }
});
