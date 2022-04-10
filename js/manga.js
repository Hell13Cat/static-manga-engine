function load_page_first() {
    document.getElementById('bodydiv').style.visibility = "hidden";
    var id_chapt = window.location.hash.replace("#", "");
    var requestURL = "img/" + id_chapt + "/info.json";
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        if (request.status != 200) {
            document.getElementById('titlesys').textContent = "Ошибка " + request.status + ":" + request.statusText;
            document.getElementById('progresspage').style.visibility = "hidden";
        } else {
            width_page = document.documentElement.scrollWidth;
            if(width_page <= 800){
                document.getElementById('pc_elem').remove()
            } else {
                document.getElementById('mobile_elem').remove()
            }
            var json_ready = request.response;
            document.getElementById('prevbutton').style.visibility = "hidden";
            document.getElementById('namech').textContent = json_ready["name_ch"];
            document.title = json_ready["name_ch"];
            document.getElementById('infostart').textContent = json_ready["start"];
            document.getElementById('infoend').textContent = json_ready["end"];
            document.getElementById('infohead').textContent = json_ready["head"];
            crs_start = "img/" + id_chapt + "/" + json_ready["start"] + "." + json_ready["ext"];
            document.getElementById('mangapage').src = crs_start;
            document.getElementById('progresspage').style.visibility = "hidden";
            var manga_page = document.getElementById('mangapage');
            document.getElementById('bodydiv').style.visibility = "visible";
            manga_page.onload = function(){
                document.getElementById('progressimage').style.visibility = "hidden";
                document.getElementById('progressimage2').style.visibility = "hidden";
            };
        }
    }
    request.onerror = function() {
        document.getElementById('titlesys').textContent = "Ошибка запроса!";
    };
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.getElementById('title_ch').style.visibility = "collapse";
        document.getElementById('copyright').style.visibility = "collapse";
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.getElementById('title_ch').style.visibility = "visible";
            document.getElementById('copyright').style.visibility = "visible";
            document.exitFullscreen();
        }
    }
}

function manga_page(count) {
    var head_info = document.getElementById('infohead').textContent;
    document.location.href = "manga.html#" + head_info;
}

function page_flip(count) {
    document.getElementById('progressimage').style.visibility = "visible";
    document.getElementById('progressimage2').style.visibility = "visible";
    window.scrollTo(0, 0);
    var min = parseInt(document.getElementById('infostart').textContent);
    var max = parseInt(document.getElementById('infoend').textContent);
    var root = "img/";
    var current_link = document.getElementById('mangapage').src;
    let ref_cute1 = current_link.split('/').reverse();
    let ref_cute2 = ref_cute1[0].split('.');
    current_num = parseInt(ref_cute2[0]);
    if(current_num + count <= max){
        if(current_num + count >= min){
            var next_num = current_num + count;
            var next_link = root + ref_cute1[1] + "/" + next_num + "." + ref_cute2[1];
            document.getElementById('mangapage').src = next_link;
            if(next_num == min) {
                document.getElementById('prevbutton').style.visibility = "hidden";
            } else if (next_num == max) {
                document.getElementById('nextbutton').style.visibility = "hidden";
            } else {
                document.getElementById('prevbutton').style.visibility = "visible";
                document.getElementById('nextbutton').style.visibility = "visible";
            }
        } else {
            document.getElementById('progressimage').style.visibility = "hidden";
            document.getElementById('progressimage2').style.visibility = "hidden";
        }
        
    } else {
        document.getElementById('progressimage').style.visibility = "hidden";
        document.getElementById('progressimage2').style.visibility = "hidden";
    }
    var manga_page = document.getElementById('mangapage');
    manga_page.onload = function (){
        document.getElementById('progressimage').style.visibility = "hidden";
        document.getElementById('progressimage2').style.visibility = "hidden";
    };
}
document.onkeydown = function(e) {
    if (e.key == "ArrowLeft"){
        page_flip(-1)
    } else if (e.key == "ArrowRight") {
        page_flip(1)
    } else {
        // Ignore
    }
}



