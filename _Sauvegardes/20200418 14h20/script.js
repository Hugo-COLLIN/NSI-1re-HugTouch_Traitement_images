//Menu
var acc = document.getElementsByClassName("options");
//var lastOpened=100;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var filtres = this.nextElementSibling;
        if (filtres.style.display === "block") {
            filtres.style.display = "none";
        } else {
            filtres.style.display = "block";
        }
    });
    //acc[lastOpened].style.display="none";
    //lastOpened=i;
}


// Traitement de l'image
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var img = new Image();
test=img.src;
canvas.width = img.width;
canvas.height = img.height;

// -> Chargement de l'image     Etat:Fonctionnel
document.getElementById('input').onchange = function(e) {
    img.onload = picLoaded;
    img.onerror = failed;
    img.src = URL.createObjectURL(this.files[0]);
};
function picLoaded() {
    document.getElementById('start').style.display="none";
    document.getElementById('left').style.backgroundColor="transparent";
    canvas.width = this.width;
    canvas.height = this.height;
    ctx.drawImage(this, 0,0);
    ctx.restore();
    document.getElementById('allFiltersOptions').style.display="block";
}
function failed() {
  alert("L'éditeur ne traîte pas ce type de fichiers.");
}
/*function restore() {
    ctx.restore();
}*/

// -> Enregistrement de l'image     Etat:Fonctionnel
function saveAs() {
    var download = document.getElementById("download");
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
    //download.setAttribute("download","archive.png");
}




// -> Filtres taille    Etat:Fonctionnel
var coeffSize=1;
document.getElementById('sizeText').innerHTML="Taille : x " + coeffSize; 

function enlarge() {
    coeffSize*=2
    canvas.width *= coeffSize;
    canvas.height *= coeffSize;				
    ctx.scale(coeffSize,coeffSize);
    ctx.drawImage(img, 0, 0);
    //ctx.save();
    document.getElementById('sizeText').innerHTML="Taille : x " + coeffSize;
}

function shrink() {
    coeffSize/=2;
    canvas.width *= coeffSize;
    canvas.height *= coeffSize;				
    ctx.scale(coeffSize,coeffSize);
    ctx.drawImage(img, 0, 0);
    //ctx.save();
    document.getElementById('sizeText').innerHTML="Taille : x " + coeffSize;
}

// -> Filtres inversion    Etat:Fonctionnel
function horizontalReverse() {
    //alert(img.src);
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(img, 0, 0);
}

function verticalReverse() {
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    ctx.drawImage(img, 0, 0);
}

// -> Filtres rotation  Etat:Non-fonctionnel
function clockwise(){
    ctx.translate(canvas.height, 0);
    ctx.rotate(Math.PI / 2);  
    ctx.drawImage(img, 0, 0);
    /*var a = canvas.height;
    canvas.width = canvas.height;
    canvas.height = a;*/
}








/*function pivoter (angle) {
    if (angle === 90) {
        var degres = Math.PI/2;
    }
    else if (angle === -90) {
        var degres = -1*Math.PI/2;
    }
    /*else if (angle == '180') {
        var degres = Math.PI;
    } 
     
        // Si on pivote d'un quart de tour, on s'assure que l'image ne fait pas plus de 500px de hauteur.
    if (angle !== 180) {
        zoom = 500/canvas.width;
        if (zoom > 1) {
            zoom = 1;
        }
        canvas.width *= zoom;
        canvas.height *= zoom;
    }
     
    // REDIMENSIONNEMENT DU CANVAS SI QUART DE TOUR
    if (angle !== 180) {
        var a = canvas.height;
        canvas.width = canvas.height;
        canvas.height = a;
    }
     
        // ON DETERMINE LA TRANSLATION EN FONCTION DE LA ROTATION
    var tx = 0, ty = 0;
    switch(degres)
    {
        case Math.PI/2 :
            tx = canvas.height;
            break;
        case Math.PI :
            tx = canvas.width;
            ty = canvas.height;
        break;
        case -Math.PI/2 :
            ty = canvas.width;
        break;
    }
     
    // ON EFFACE, SE PLACE, PIVOTE ET REVIENT AU POINT DE DEPART
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(tx, ty);
    ctx.rotate(degres);
    ctx.drawImage(img.src, 0, 0, img.width, img.height);
    ctx.restore();
}*/




// -> Filtres couleur   Etat:Non-fonctionnel
function orangeFilter() {
    
}

// -> Filtres effets    Etat:non-fonctionnel
function blur() {
    ctx.filter = 'blur(4px)';
}














































