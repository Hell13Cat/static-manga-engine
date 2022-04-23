function start() {
    var id_chapt = window.location.hash.replace("#", "");
    var requestURL = "json/" + id_chapt + ".json";
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        if (request.status != 200) {
            document.getElementById('title').textContent = "Ошибка " + request.status + ":" + request.statusText;
            document.getElementById('progress').style.visibility = "hidden";
        } else {
            var json_ready = request.response;
            document.getElementById("cardinfo").style.visibility = "visible";
            document.getElementById('title').textContent = json_ready["name"];
            document.title = json_ready["name"];
            document.getElementById('cover').src = json_ready["cover"];
            document.getElementById('cardinfo1').textContent = "Автор: " + json_ready["author"];
            document.getElementById('cardinfo2').textContent = "Статус тайтла: " + json_ready["status_ti"];
            document.getElementById('cardinfo3').textContent = "Статус перевода: " + json_ready["status_tl"];
            document.getElementById('descriptionmanga').textContent = json_ready["description"];
            var list_ch = json_ready["ch"];
            var index;
            for (index = 0; index < list_ch.length; ++index) {
                let ch_p_one = document.createElement('p');
                let ch_one = document.createElement('a');
                ch_one.href = "ch.html#" + list_ch[index]["id"];
                ch_one.textContent = list_ch[index]["name"]
                ch_p_one.append(ch_one);
                document.getElementById('helper1').before(ch_p_one);
            }
            document.getElementById('bodydiv').style.visibility = "visible";
            document.getElementById('progress').style.visibility = "hidden";
        }
    }
    request.onerror = function() {
        document.getElementById('title').textContent = "Ошибка запроса!";
    };
}