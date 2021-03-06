function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function start() {
    var last_ch_id = document.cookie.replace(/(?:(?:^|.*;\s*)idchaptlast\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if(last_ch_id == "") {
        document.getElementById('lastchbutton').textContent = "Последней главы нет";
        document.getElementById('lastchbutton').disabled = true;
    } else {
        document.getElementById('lastchbutton').textContent = "Последняя глава";
    }
    var requestURL = "index.json";
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        if (request.status != 200) {
            document.getElementById('titlesys').textContent = "Ошибка " + request.status + ":" + request.statusText;
            document.getElementById('progresspage').style.display = "none";
        } else {
            var json_ready = request.response;
            list_splash = json_ready["splash"];
            var splash_num = getRandomInt(0, list_splash.length);
            document.title = list_splash[splash_num];
            var list_ch = json_ready["manga"];
            var index;
            for (index = 0; index < list_ch.length; ++index) {
                manga_info = list_ch[index]
                let manga_one = document.createElement('div');
                if ((index+1)%2 === 0) {
                    manga_one.className = "nav-card index-nav-card index-manga-one-1";
                } else {
                    manga_one.className = "nav-card index-nav-card index-manga-one-2";
                }
                let manga_one_ref = document.createElement('a');
                manga_one_ref.href = "manga.html#" + manga_info["id"];
                manga_one_ref.textContent = manga_info["name"];
                manga_one_ref.className = "links index-manga-links";
                let manga_one_cover = document.createElement('img');
                manga_one_cover.src = manga_info["cover"];
                manga_one_cover.className = "index-manga-cover";
                manga_one.append(manga_one_cover);
                manga_one.append(document.createElement('br'));
                manga_one.append(manga_one_ref);
                document.getElementById('helper1').before(manga_one);
            }
            document.getElementById('bodydiv').style.visibility = "visible";
            document.getElementById('progresspage').style.display = "none";
        }
    };
    request.onerror = function() {
        document.getElementById('titlesys').textContent = "Ошибка запроса!";
        document.getElementById('progresspage').style.display = "none";
    };
}

function last_ch_go(){
    var last_ch_id = document.cookie.replace(/(?:(?:^|.*;\s*)idchaptlast\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    ref_go = "ch.html#" + last_ch_id;
    document.location.replace(ref_go);
}