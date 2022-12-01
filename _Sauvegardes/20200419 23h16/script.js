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
//var imageDataSource = ctx.getImageData(0, 0,img.width,img.height);

var xTransl=0;
var yTransl=0;
var xScale=1;
var yScale=1;

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
    ctx.save();
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
    canvas.width = img.width * coeffSize;
    canvas.height = img.height * coeffSize;
    ctx.scale(coeffSize,coeffSize);
    ctx.drawImage(img, 0, 0);
    ctx.save();
    document.getElementById('sizeText').innerHTML="Taille : x " + coeffSize;
}

function shrink() {
    coeffSize/=2;
    canvas.width = img.width * coeffSize;
    canvas.height = img.height * coeffSize;
    ctx.scale(coeffSize,coeffSize);
    ctx.drawImage(img, 0, 0);
    ctx.save();
    document.getElementById('sizeText').innerHTML="Taille : x " + coeffSize;
}

// -> Filtres inversion    Etat:Fonctionnel
function horizontalReverse() {
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
}

// -> Filtres couleur   Etat:Non-fonctionnel
function orangeFilter() {
    
}

function redFilter() {
    ctx.drawImage(img,0,0);
    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
    var pixCan = imgData.data;
    for ( var i=0; i < pixCan.length; i +=4) {
        pixCan[i] *=1.3;
        pixCan[i+1] /=1.2;
        pixCan[i+2] /=1.2;
    }
    ctx.putImageData(imgData,0,0);
}

function greyFilter() {
    ctx.drawImage(img,0,0);
    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
    var pixCan = imgData.data;
    for ( var i=0; i < pixCan.length; i +=4) {
        var gris= 1/3 * (pixCan[i]+pixCan[i+1]+pixCan[i+2]);
        pixCan[i] = gris;
        pixCan[i+1] = gris;
        pixCan[i+2] = gris;
    }
    ctx.putImageData(imgData,0,0);    
}

function lightgreyFilter() {
    ctx.drawImage(img,0,0);
    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
    var pixCan = imgData.data;
    for ( var i=0; i < pixCan.length; i +=4) {
        var gris= (1/3 * (pixCan[i]+pixCan[i+1]+pixCan[i+2]))*2;
        pixCan[i] = gris;
        pixCan[i+1] = gris;
        pixCan[i+2] = gris;
    }
    ctx.putImageData(imgData,0,0);    
}

/*function gris(){
        alert("gris appuyé");
		var imageDataResult=ctx.createImageData(image.width,image.height);
		var gris;
		for(var i=0,l=imageDataSource.data.length;i<l;i=i+4){
            //console.log(i);
			gris=(imageDataSource.data[i]+imageDataSource.data[i+1]+imageDataSource.data[i+2])/3;
			imageDataResult.data[i]=gris;
			imageDataResult.data[i+1]=gris;
			imageDataResult.data[i+2]=gris;
			imageDataResult.data[i+3]=imageDataSource.data[i+3]; //Transparence non modifiée
		}
        alert("5");
/*Pour rendre le résultat visible à l'écran, il faut envoyer dans le {{{canvas}}} l'image dont les informations figurent dans {{{imageDataResult}}} qui vient d'être créé.*/
        /*alert("10");
		ctx.putImageData(imageDataResult,0,0);
        alert("20");
	}*/








// -> Filtres effets    Etat:non-fonctionnel
function blur() {
    ctx.filter = 'blur(4px)';
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
}
*/



