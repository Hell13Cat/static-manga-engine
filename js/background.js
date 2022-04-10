function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function mainbg() {
    let bg_list_pc = ["bg/1.jpg", "bg/2.jpg", "bg/3.jpg"];
    let bg_list_m = ["bg/11m.jpg", "bg/12m.jpg", "bg/13m.jpg", "bg/21m.jpg", "bg/31m.jpg", "bg/32m.jpg", "bg/33m.jpg"];
    const pageWidth = document.documentElement.scrollWidth;
    const pageHeight = document.documentElement.scrollHeight
    if (pageWidth > pageHeight) {
        num_bg = getRandomInt(0, 2);
        bg_select = bg_list_pc[num_bg]
    } else {
        num_bg = getRandomInt(0, 6);
        bg_select = bg_list_m[num_bg]
    }
    document.getElementById('page').style.background = '#000000 url('+bg_select+') repeat';
    document.getElementById('page').style.backgroundSize = '120%';
}