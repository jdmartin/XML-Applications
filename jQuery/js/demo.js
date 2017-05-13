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

    $('#button4').click(function() {
        $('#second li').toggleClass('invert');
    });

    $("button#button5").on('click', showNotesClick);
    function showNotesClick () {
        $('#second ul li:nth-child(5)').text('I\'m in ur list, making it unreliable.');
        $("button#button5").off('click').on('click', hideNotesClick);
        return false;
    }

    function hideNotesClick () {
        $('#second ul li:nth-child(5)').text('Five');
        $("button#button5").off('click').on('click', showNotesClick);
        return false;
    }
});
