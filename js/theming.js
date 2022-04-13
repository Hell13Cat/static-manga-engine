function addstylesheet(name_short) {
    var head = document.head;
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    name_style = "css/color-"+name_short+".css"
    link.href = name_style;
    link.id = "currentstylesheet";
    head.appendChild(link);
}

function startstylepage() {
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)theme\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if(cookieValue == "") {
        addstylesheet("dark");
    } else {
        
        addstylesheet(cookieValue);
    }
}

function swap_theme(num) {
    if(num == 1) {
        document.cookie = "theme=dark; max-age=2592000; secure";
        document.getElementById('currentstylesheet').remove();
        addstylesheet("dark");
    } else if (num == 2) {
        document.cookie = "theme=light; max-age=2592000; secure";
        document.getElementById('currentstylesheet').remove();
        addstylesheet("light");
    } else {
        // Ignore
    }
}