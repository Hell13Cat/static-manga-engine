function load_page_first() {
    var id_chapt = window.location.hash.replace("#", "");
    chapt_ref = id_chapt.split("_");
    document.cookie = "idchaptlast="+id_chapt+"; max-age=2592000; secure";
    var requestURL = "img/" + chapt_ref[0] + "/info.json";
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        if (request.status != 200) {
            document.getElementById('titlesys').textContent = "Ошибка " + request.status + ":" + request.statusText;
            document.getElementById('progresspage').style.display = "none";
        } else {
            width_page = document.documentElement.scrollWidth;
            if(width_page <= 800){
                document.getElementById('pc_elem').remove()
            } else {
                document.getElementById('mobile_elem').remove()
            }
            var json_tmp = request.response;
            var json_ready = json_tmp["ch_data"][chapt_ref[1]]
            document.getElementById('prevbutton').style.visibility = "hidden";
            document.getElementById('namech').textContent = json_ready["name_ch"];
            document.title = json_ready["name_ch"];
            document.getElementById('infotitle').textContent = json_ready["name_ch"];
            document.getElementById('infostart').textContent = json_ready["start"];
            document.getElementById('infoend').textContent = json_ready["end"];
            document.getElementById('totalpage').textContent = Number(json_ready["end"])+1;
            document.getElementById('infohead').textContent = json_ready["head"];
            if (json_ready["num"]>json_tmp["start"]){
                if (json_ready["num"]<json_tmp["end"]){
                    document.getElementById('infoflipch').textContent = "prev next";
                } else {
                    document.getElementById('infoflipch').textContent = "prev";
                }
            } else {
                document.getElementById('infoflipch').textContent = "next";
            }
            crs_start = "img/" + chapt_ref[0] + "/" + chapt_ref[1] + "/" + json_ready["start"] + "." + json_ready["ext"];
            document.getElementById('mangapage').src = crs_start;
            document.getElementById('progresspage').style.display = "none";
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
        document.getElementById('namech').remove();
        document.getElementById('copyright').style.visibility = "collapse";
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            let title_tag = document.createElement('h2');
            title_tag.id = "namech";
            title_tag.textContent = document.getElementById('infotitle').textContent;
            document.getElementById('title_ch').append(title_tag);
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
            var next_link = root + ref_cute1[2] + "/" + ref_cute1[1] + "/" + next_num + "." + ref_cute2[1];
            document.getElementById('curentpage').textContent = next_num+1;
            document.getElementById('mangapage').src = next_link;
            if(next_num == min) {
                document.getElementById('prevbutton').style.visibility = "hidden";
            } else if (next_num == max) {
                info_ch_flip = document.getElementById('infoflipch').textContent;
                if(info_ch_flip.includes("next")) {
                    document.getElementById('nextbutton').textContent = "Глава >";
                } else {
                    document.getElementById('nextbutton').style.visibility = "hidden";
                }
            } else {
                document.getElementById('nextbutton').textContent = "Страница >";
                document.getElementById('prevbutton').style.visibility = "visible";
                document.getElementById('nextbutton').style.visibility = "visible";
            }
        } else {
            document.getElementById('progressimage').style.visibility = "hidden";
            document.getElementById('progressimage2').style.visibility = "hidden";
        }
    } else {
        var id_chapt = window.location.hash.replace("#", "");
        chapt_ref = id_chapt.split("_");
        next_chapters = Number(chapt_ref[1]) + 1;
        ref_go = "ch.html#" + chapt_ref[0] + "_" + next_chapters;
        document.location.replace(ref_go);
        location.reload();
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



