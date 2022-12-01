// Traitement de l'image
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var img = new Image();

var actionStack = [];
var valueStack = [];
class stack {   // Objet représentant un élément dans la pile de transformation
  constructor(action) {
    this._action = action; // nom de l'action effectuée
  }
}
//var returnStack = [];

var bluring = document.getElementById('bluring');
var brightness = document.getElementById('brightness');
var contrast = document.getElementById('contrast');
var grayscale = document.getElementById('grayscale');
var invert = document.getElementById('invert');
var saturate = document.getElementById('saturate');
var sepia = document.getElementById('sepia');
var hueRotate = document.getElementById('hueRotate');


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
    document.getElementById('allFiltersOptions').style.display="block";
    document.getElementById('editor-zone').style.height=canvas.height;
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
}


// -> Filtres effets    Etat:Fonctionnel
function newValue(val, filter) {
    switch (filter){
        case 'bluring':
            bluring.value = parseInt(bluring.value) + val;
            document.getElementById('blurTxt').innerHTML=bluring.value + "px";
            break;
        case 'brightness':
            brightness.value = parseInt(brightness.value) + val;
            document.getElementById('brightnessTxt').innerHTML=brightness.value + "%";
            break;
        case 'contrast':
            contrast.value = parseInt(contrast.value) + val;
            document.getElementById('contrastTxt').innerHTML=contrast.value + "%";
            break;
        case 'grayscale':
            grayscale.value = parseInt(grayscale.value) + val;
            document.getElementById('grayscaleTxt').innerHTML=grayscale.value + "%";
            break;
        case 'invert':
            invert.value = parseInt(invert.value) + val;
            document.getElementById('invertTxt').innerHTML=invert.value + "%";
            break;
        case 'saturate':
            saturate.value = parseInt(saturate.value) + val;
            document.getElementById('saturateTxt').innerHTML=saturate.value + "%";
            break;
        case 'sepia':
            sepia.value = parseInt(sepia.value) + val;
            document.getElementById('sepiaTxt').innerHTML=sepia.value + "%";
            break;
        case 'hueRotate':
            hueRotate.value = parseInt(hueRotate.value) + val;
            document.getElementById('hueRotateTxt').innerHTML=hueRotate.value + "°";
            break;
    }
    ctx.filter = `blur(${bluring.value}px) brightness(${brightness.value}%) contrast(${contrast.value}%) invert(${invert.value}%) saturate(${saturate.value}%) sepia(${sepia.value}%) grayscale(${grayscale.value}%) hue-rotate(${hueRotate.value}deg)`;
    ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
}


/*function newValue(val, filter) {
    newVal = parseInt(blur.value) + val;
    if (newVal >= 0 && newVal <= 100) {
        blur.value = newVal;
        drawCanvas();
  }
}*/

function apply(filter, value) {
    switch (filter){
        case 'bluring':
            actionStack.push(new stack("bluring"));
            valueStack.push(new stack(bluring.value));
            console.log(actionStack[actionStack.length-1]._action);
            console.log(valueStack[valueStack.length-1]._action);
            break;
        case 'brightness':
            
            break;
        case 'contrast':
            
            break;
        case 'grayscale':
            
            break;
        case 'invert':
            
            break;
        case 'saturate':
            
            break;
        case 'sepia':
            
            break;
        case 'hueRotate':
            
            break;
    }
}


function restore() {
    console.log("restore");
    if (actionStack.length > 0){  // Si la pile contient des actions, revenir en arrière
        console.log("BEFORE ACTIONS_STACK :", actionStack);
        var lastAction = actionStack[actionStack.length-1]._action;
        alert(lastAction); // Récupérer la dernière action effectuée
        switch(lastAction) {
            case 'bluring':
                bluring.value = parseInt(bluring.value) + val;
                document.getElementById('blurTxt').innerHTML=bluring.value + "px";
                break;
            case 'brightness':
                
                break;
            case 'contrast':
            
                break;
            case 'grayscale':
            
                break;
            case 'invert':
            
                break;
            case 'saturate':
            
                break;
            case 'sepia':
            
                break;
            case 'hueRotate':
            
                break;
            case 'afterImport':
                
                break;
        }

        /*if (lastAction == "clockwise"){ // Vérifier quel action a été effectuée en dernier et réaliser l'inverse/annulation
        console.log("Reverse clockwise");
            ctx.rotate(-90 * Math.PI / 180);
            ctx.translate(-canvas.height, 0);
        } else if (lastAction == "inverseClockwise"){
            console.log("Reverse inverseClockwise");
            ctx.translate(canvas.height, 0);
            ctx.rotate(90 * Math.PI / 180);
        }*/
        
        ctx.drawImage(img, 0, 0,canvas.width,canvas.height); // Dessiner l'image à nouveau
        actionStack.pop(); // Supprimer la dernière action de la pile
        console.log("AFTER ACTIONS_STACK :", actionStack);
    } else {
        console.log("Empty")
    }
}

//ACTIONS_STACK.push(new ActionsStack("clockwise"))









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

/*
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
*/


/*
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
*/

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
/*
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
*/