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

// -> Chargement de l'image
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

// -> Enregistrement de l'image
function saveAs() {
    var download = document.getElementById("download");
    var imgFinal = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
    
    
    
    /*var imgFinal = canvas.toDataURL();
    //document.write('<img src="'+img+'"/>');
    prev = window.location.href;
    window.location.href = data.replace("image/png", "image/octet-stream");
    window.location.href = prev;*/
}

function download() {
    var download = document.getElementById("download");
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
    //download.setAttribute("download","archive.png");
}




// -> Filtres taille
var coeffSize=1;
document.getElementById('sizeText').innerHTML="Taille : x " + coeffSize; 

function enlarge() {
    coeffSize*=2
    canvas.width = img.width * coeffSize;
    canvas.height = img.height  * coeffSize;				
    ctx.scale(coeffSize,coeffSize);
    ctx.drawImage(img, 0, 0);
    ctx.save();
    document.getElementById('sizeText').innerHTML="Taille : x " + coeffSize;
}

function shrink() {
    coeffSize/=2;
    canvas.width = img.width * coeffSize;
    canvas.height = img.height  * coeffSize;				
    ctx.scale(coeffSize,coeffSize);
    ctx.drawImage(img, 0, 0);
    ctx.save();
    document.getElementById('sizeText').innerHTML="Taille : x " + coeffSize;
}

// Filtres inversion

function horizontalReverse() {
    alert(img.src);
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    this.ctx.drawImage(img.src, 0, 0);
    
    /*var it = 0;
    for (i = canvas.width - 1; i >= 0; i--) {
        for (j = 0; j < canvas.height; j++) {
            ctx.fillStyle = getColor(sourceData, it, j, w);
            ctx.fillRect(i, j, 1, 1);	
        }
        it++;
    }
    /*ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(img.src, 0, 0);*/
}





function clockwise(){
    ctx.translate(canvas.height, 0);
    ctx.rotate(Math.PI / 2);  
    ctx.drawImage(img.src, 0, 0);
}



































































/*function picLoaded(){
    var dispImg = document.getElementById('displayPic');
    dispImg.src = URL.createObjectURL(event.target.files[0]);
    dispImg.onload = function() {
        URL.revokeObjectURL(dispImg.src)
    }
    document.getElementById('start').style.display="none";
    document.getElementById('left').style.backgroundColor="transparent";
    return (dispImg);
}*/

/*
document.getElementById('picLoaded').onchange = function(e) {
  var img = new Image();
  img.onload = picOnCanvas;
  img.onerror = failed;
  img.src = URL.createObjectURL(this.files[0]);
};




function picOnCanvas(){
    document.getElementById('start').style.display="none";
    document.getElementById('left').style.backgroundColor="transparent";
    
    var canvas = document.getElementById('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0,0);
    
    /*var canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.onload=function(){
		canvas.width=image.width;
		canvas.height=image.height;
		ctx.drawImage(image,0,0);
		imageDataSource = ctx.getImageData(0, 0,image.width,image.height);
    }
    img.src = URL.createObjectURL(event.target.files[0]);
}


function failed() {
  alert("Erreur de chargement : veuillez réessayer.");
}*/



