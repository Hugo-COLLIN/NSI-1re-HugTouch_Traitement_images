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

var blur = document.getElementById('blur');
var brightness = document.getElementById('brightness');
var contrast = document.getElementById('contrast');
var grayscale = document.getElementById('grayscale');
var invert = document.getElementById('invert');
var opacite = document.getElementById('opacite');
var saturate = document.getElementById('saturate');
var sepia = document.getElementById('sepia');

//var x=1;
//var imageDataSource = ctx.getImageData(0, 0,img.width,img.height);

//var xTransl=0;
//var yTransl=0;
//var xScale=1;
//var yScale=1;

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
/*function redFilter() {
    ctx.drawImage(img,0,0);
    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
    var pixCan = imgData.data;
    for ( var i=0; i < pixCan.length; i +=4) {
        pixCan[i] *=1.3;
        pixCan[i+1] /=1.2;
        pixCan[i+2] /=1.2;
    }
    ctx.putImageData(imgData,0,0);
}*/

/*
function redFilter() {
  //ctx.drawImage(img,0,0);

  if (tmpImg == null){
    tmpImg = ctx.getImageData(0,0,canvas.width,canvas.height);
  }

  var pixCan = tmpImg.data;
  for ( var i=0; i < pixCan.length; i +=4) {
    pixCan[i] *=1.3;
    pixCan[i+1] /=1.2;
    pixCan[i+2] /=1.2;
  }
  ctx.putImageData(tmpImg,0,0);
}

function blueFilter() {
  //ctx.drawImage(img,0,0);

  if (tmpImg == null){
    tmpImg = ctx.getImageData(0,0,canvas.width,canvas.height);
  }

  var pixCan = tmpImg.data;
  for ( var i=0; i < pixCan.length; i +=4) {
    pixCan[i] *=1.3;
    pixCan[i+1] /=1.2;
    pixCan[i+2] /=1.2;
  }
  ctx.putImageData(tmpImg,0,0);
}

*/

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

function lightFilter() {
    ctx.drawImage(img,0,0);
    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
    var pixCan = imgData.data;
    for ( var i=0; i < pixCan.length; i +=4) {
        pixCan[i] *= 2;
        pixCan[i+1] *= 2;
        pixCan[i+2] *= 2;
    }
    ctx.putImageData(imgData,0,0);    
}

// -> Filtres effets    Etat:non-fonctionnel
/*function blurFilter() {
    x+=1;
    ctx.filter = 'blur(4px)';
    ctx.drawImage(img, 0, 0);
    ctx.save;
}

function eclairFilter() {
    ctx.filter = 'brightness(0.5)';
    ctx.drawImage(img, 0, 0);
    ctx.save;

}*/


function drawCanvas() {
    alert("yes");
    ctx.filter = `blur(${blur.value}px) brightness(${brightness.value}%) contrast(${contrast.value}%) grayscale(${grayscale.value}%) invert(${invert.value}%) saturate(${saturate.value}%) sepia(${sepia.value}%)`;
    //ctx.filter = `blur(${blur.value}px) brightness(${brightness.value}%) contrast(${contrast.value}%) grayscale(${grayscale.value}%) invert(${invert.value}%) opacite(${opacite.value}%) saturate(${saturate.value}%) sepia(${sepia.value}%)`;
    document.getElementById('blurTxt').innerHTML=blur.value + "px";
    ctx.drawImage(img, 0, 0,canvas.width,canvas.height);  
}

blur.addEventListener('input', drawCanvas);
brightness.addEventListener('input',drawCanvas);
contrast.addEventListener('input',drawCanvas);
grayscale.addEventListener('input',drawCanvas);
invert.addEventListener('input',drawCanvas);
//opacite.addEventListener('input',drawCanvas);
saturate.addEventListener('input',drawCanvas);
sepia.addEventListener('input',drawCanvas);



function newValue(val) {
    alert("activé")
    drawCanvas();
    newVal = parseInt(blur.value) + val;
    if (newVal >= 0 && newVal <= 100) {
        blur.value = newVal;
        drawCanvas();
  }
}

















/*
function setNewValue(val, filter) {
    switch (filter) {
        case 'blur':
            r1val = parseInt(blur.value) + val;
            if (r1val >= 0 && r1val <= 100) {
                blur.value = r1val;
                //document.getElementById('out1').value = r1val;
            }
            break;
    //drawCanvas;
    }
  }
}*/







/*modifVal(val) {
    switch (val) {
        case(blur+):
            blur.value += 1;
            output.innerHTML = blur.value;
            break;
    }
}*/









/*
function toDefault(value) {
    switch (value) {
        case ''
    }
}

*/








