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
    //a = acc[i].classList.toggle("active");
    //a.style.display = "none";
    //acc[lastOpened].style.display="none";
    //lastOpened=i;
}


// Traitement de l'image
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var img = new Image();
var actionsStack = [];
var returnedStack = [];

var blur = document.getElementById('blur');
var brightness = document.getElementById('brightness');
var contrast = document.getElementById('contrast');
var grayscale = document.getElementById('grayscale');
var invert = document.getElementById('invert');
//var opacite = document.getElementById('opacite');
var saturate = document.getElementById('saturate');
var sepia = document.getElementById('sepia');
var hueRotate = document.getElementById('hueRotate');
var x=0; //valeur du dernier filtre
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
    ctx.filter = `blur(${blur.value}px) brightness(${brightness.value}%) contrast(${contrast.value}%) invert(${invert.value}%) saturate(${saturate.value}%) sepia(${sepia.value}%) grayscale(${grayscale.value}%) hue-rotate(${hueRotate.value}deg)`;
    ctx.globalAlpha = opacite.value/10;
    ctx.drawImage(img, 0, 0,canvas.width,canvas.height);  
    document.getElementById('blurTxt').innerHTML=blur.value + "px";
    document.getElementById('brightnessTxt').innerHTML=brightness.value + "%";
    document.getElementById('contrastTxt').innerHTML=contrast.value + "%";
    document.getElementById('grayscaleTxt').innerHTML=grayscale.value + "%";
    document.getElementById('invertTxt').innerHTML=invert.value + "%";
    document.getElementById('saturateTxt').innerHTML=saturate.value + "%";
    document.getElementById('sepiaTxt').innerHTML=sepia.value + "%";
    document.getElementById('hueRotateTxt').innerHTML=hueRotate.value + "°";
    document.getElementById('opacite').innerHTML=opacite.value*10 + "%"
}

blur.addEventListener('input', drawCanvas);
brightness.addEventListener('input',drawCanvas);
contrast.addEventListener('input',drawCanvas);
grayscale.addEventListener('input',drawCanvas);
invert.addEventListener('input',drawCanvas);
opacite.addEventListener('input',drawCanvas);
saturate.addEventListener('input',drawCanvas);
sepia.addEventListener('input',drawCanvas);
hueRotate.addEventListener('input',drawCanvas);
blur.addEventListener('change', function(){
    actionsStack.push(new ActionStack(blur));
    console.log("blur");
})

function newValue(val, filter) {
    switch (filter){
        case 'bluring':
            blur.value = parseInt(blur.value) + val;
            drawCanvas();
            break;
        case 'brightness':
            brightness.value = parseInt(brightness.value) + val;
            drawCanvas();
            break;
        case 'contrast':
            contrast.value = parseInt(contrast.value) + val;
            drawCanvas();
            break;
        case 'grayscale':
            grayscale.value = parseInt(grayscale.value) + val;
            drawCanvas();
            break;
        case 'invert':
            invert.value = parseInt(invert.value) + val;
            drawCanvas();
            break;
        case 'saturate':
            saturate.value = parseInt(saturate.value) + val;
            drawCanvas();
            break;
        case 'sepia':
            sepia.value = parseInt(sepia.value) + val;
            drawCanvas();
            break;
        case 'hueRotate':
            hueRotate.value = parseInt(hueRotate.value) + val;
            drawCanvas();
            break;
        case 'opacite':
            opacite.value = parseInt(opacite.value) + val;
            drawCanvas();
            break;
    }
}


/*function newValue(val, filter) {
    newVal = parseInt(blur.value) + val;
    if (newVal >= 0 && newVal <= 100) {
        blur.value = newVal;
        drawCanvas();
  }
}*/

function apply(filter) {
    alert("yes");
    switch (filter){
        case 'bluring':
            blur.value = parseInt(blur.value) + val;
            drawCanvas();
            break;
        case 'brightness':
            brightness.value = parseInt(brightness.value) + val;
            drawCanvas();
            break;
        case 'contrast':
            contrast.value = parseInt(contrast.value) + val;
            drawCanvas();
            break;
        case 'grayscale':
            grayscale.value = parseInt(grayscale.value) + val;
            drawCanvas();
            break;
        case 'invert':
            invert.value = parseInt(invert.value) + val;
            drawCanvas();
            break;
        case 'saturate':
            saturate.value = parseInt(saturate.value) + val;
            drawCanvas();
            break;
        case 'sepia':
            sepia.value = parseInt(sepia.value) + val;
            drawCanvas();
            break;
        case 'hueRotate':
            hueRotate.value = parseInt(hueRotate.value) + val;
            drawCanvas();
            break;
        case 'opacite':
            opacite.value = parseInt(opacite.value) + val;
            drawCanvas();
            break;
    }
}


//ACTIONS_STACK.push(new ActionStack("clockwise"))









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








