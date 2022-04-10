function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function start() {
    document.getElementById('bodydiv').style.visibility = "hidden";
    var requestURL = "index.json";
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        if (request.status != 200) {
            document.getElementById('titlesys').textContent = "Ошибка " + request.status + ":" + request.statusText;
            document.getElementById('progresspage').style.visibility = "hidden";
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
                manga_one.className = "carda";
                let manga_one_ref = document.createElement('a');
                manga_one_ref.href = "manga.html#" + manga_info["id"];
                manga_one_ref.textContent = manga_info["name"];
                let manga_one_cover = document.createElement('img');
                manga_one_cover.src = manga_info["cover"];
                manga_one_cover.className = "cover";
                manga_one.append(manga_one_cover);
                manga_one.append(manga_one_ref);
                document.getElementById('helper1').before(manga_one);
            }
            document.getElementById('bodydiv').style.visibility = "visible";
            document.getElementById('progresspage').style.visibility = "hidden";
        }
    };
    request.onerror = function() {
        document.getElementById('titlesys').textContent = "Ошибка запроса!";
        document.getElementById('progresspage').style.visibility = "hidden";
    };
}