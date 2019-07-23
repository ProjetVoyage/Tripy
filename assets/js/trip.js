$(".btn").click(function (e) {

    var start = $("#travel_startDate").datepicker("getDate");
    var end = $("#travel_endDate").datepicker("getDate");

    today = new Date();

    var test_jour_depart = myfunc(today, start);
    var test_jour_retour = myfunc(today, end);
    var test_depart_retour = myfunc(start, end);

    if (test_jour_depart <= 0) {
        e.preventDefault();
        alert('Attention ! La date du jour ne peut être antérieur à celle du départ !');
    } else if (test_jour_retour <= 0) {e.preventDefault();
        alert('Attention ! La date du retour ne peut être antérieur à celle du jour !');
    } else if (test_depart_retour <= 0) {e.preventDefault();
        alert('Attention ! La date du retour ne peut être antérieur à celle du départ !');
    }
});

function myfunc(start, end) {
    days = (end - start) / (1000 * 60 * 60 * 24);
    return Math.round(days);
}