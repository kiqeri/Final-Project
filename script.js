var data_menu = null;
var data_div = null;
var new_data = null;
function show() {
    var xhttp;
    var filter_data = null;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            filter_data = document.getElementById("filter_data").value;
            data_menu = JSON.parse(this.responseText).results;

            if (filter_data == null || filter_data == "") {
                new_data = data_menu;
            } else {
                new_data = data_menu.filter(a =>
                    a.name.toUpperCase().indexOf(filter_data.toUpperCase()) > -1 ||
                    a.price.toUpperCase().indexOf(filter_data.toUpperCase()) > -1
                );
            }

            data_div = "<div class='row'>";

            for (var i = 0; i < new_data.length; i++) {
                data_div += "<div class='col-lg-4 col-md-6 col-sm-12'>";
                data_div += "<img src='menu/" + new_data[i].img + "' class='card-img-top' alt=''>";
                data_div += "<div class='card'>";
                data_div += "<div class='card-body'>";
                data_div += "<h5 class='card-title'>" + new_data[i].name + "</h5>";
                data_div += "<p>" + formatRupiah(new_data[i].price, 'Rp. ') + "</p>";
                data_div += "</div></div></div>";
            }

            data_div += "</div>";

            document.getElementById("txtHasil").innerHTML = data_div;

        }
    };
    xhttp.overrideMimeType("application/json");
    xhttp.open("GET", "data/menu.json", true);
    xhttp.send();
}

/* Tampilin modal subscribe*/
var seconds = 1;
function secondPassed() {
    var minutes = Math.round((seconds - 30) / 60);
    var remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }

    if (seconds == 0) {
        clearInterval(countdownTimer);
        $('#newsletterModal').modal('show');
    } else {
        seconds--;
    }
}

var countdownTimer = setInterval(secondPassed, 1000);

var data_blog = null;
var new_blog = null;
var new_div = null;
var filter_month;
function show_blog(filter_month) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data_blog = JSON.parse(this.responseText).results;

            if (filter_month == null || filter_month == "") {
                new_blog = data_blog;
            } else {
                new_blog = data_blog.filter(a =>
                    a.month.indexOf(filter_month) > -1
                );
            }

            new_div = "<div class='post'>";

            for (var i = 0; i < new_blog.length; i++) {
                new_div += "<h2 class='blog-post-title'>" + new_blog[i].title + "</h2>";
                new_div += "<p class='post-date'>" + new_blog[i].date + "</p>";
                new_div += "<p>" + new_blog[i].body + "</p>";
            }

            new_div += "</div>";

            document.getElementById("blog_posts").innerHTML = new_div;

        }
    };
    xhttp.overrideMimeType("application/json");
    xhttp.open("GETJSON", "data/blog.json", true);
    xhttp.send();
}

function formatRupiah(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}