/*function download() {
var download = document.getElementById("download");
var image = document.getElementById("myCanvas").toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
download.setAttribute("href", image);
//download.setAttribute("download","archive.png");
}*/

/*function inverse(canvasTarget, imageSource) 
{
    var canvasTarget = document.getElementById('canvasid');
    var imageSource = new Image();
    imageSource.onload  = function () 
    {
        viewCanvas.width = imageSource.width;
        viewCanvas.height = imageSource.height;
        canvasTarget.width = w;
        canvasTarget.height = h;
        var ctxtarget = canvasTarget.getContext("2d");   
        ctxtarget.translate(w, 0);
        ctxtarget.scale(-1, 1);
        ctxtarget.drawImage(image, 0, 0);
}


inverse("canvasid", "peanut.jpg");*/

/*
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

ctx.filter = 'blur(4px)';
ctx.font = '48px serif';
ctx.fillText('Hello world', 50, 100);


function pivoter (angle) {
    if (angle == '+90') {
        var degres = Math.PI/2;
    }
    else if (angle == '-90') {
        var degres = Math.PI/2 * -1;
    }
    else if (angle == '180') {
        var degres = Math.PI;
    }  
     
        // Si on pivote d'un quart de tour, on s'assure que l'image ne fait pas plus de 500px de hauteur.
    if (angle != '180') {
        zoom = 500/largeur_image;
        if (zoom > 1) {
            zoom = 1;
        }
        largeur_image *= zoom;
        hauteur_image *= zoom;
    }
     
    // REDIMENSIONNEMENT DU CANVAS SI QUART DE TOUR
    if (angle != '180') {
        div_canvas.style.width = hauteur_image + 'px';
        div_canvas.style.height = largeur_image + 'px';
                 
        canvas_base.style.width = hauteur_image + 'px';
        canvas_base.style.height = largeur_image + 'px';
        canvas_base.width = hauteur_image;
        canvas_base.height = largeur_image;
                 
        canvas_mesures.style.width = hauteur_image + 'px';
        canvas_mesures.style.height = largeur_image + 'px';
        canvas_mesures.width = hauteur_image;
        canvas_mesures.height = largeur_image;
    }
     
        // ON DETERMINE LA TRANSLATION EN FONCTION DE LA ROTATION
    var tx = 0, ty = 0;
    switch(degres)
    {
        case Math.PI/2 :
            tx = hauteur_image;
            break;
        case Math.PI :
            tx = largeur_image;
            ty = hauteur_image;
        break;
        case -Math.PI/2 :
            ty = largeur_image;
        break;
    }
     
    // ON EFFACE, SE PLACE, PIVOTE ET REVIENT AU POINT DE DEPART
    context.clearRect(0, 0, canvas_base.width, canvas_base.height);
        context.save();
    context.translate(tx, ty);
    context.rotate(degres);
    context.drawImage(image, 0, 0, largeur_image, hauteur_image);
        context.restore();
}*/