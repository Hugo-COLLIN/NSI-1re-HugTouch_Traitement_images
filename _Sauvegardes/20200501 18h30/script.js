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
var lastAction = 0;
var lastValue = 0;
var count=0;

var bluring = document.getElementById('bluring');
var brightness = document.getElementById('brightness');
var contrast = document.getElementById('contrast');
var grayscale = document.getElementById('grayscale');
var invert = document.getElementById('invert');
var saturate = document.getElementById('saturate');
var sepia = document.getElementById('sepia');
var hueRotate = document.getElementById('hueRotate');

var blurTxt = document.getElementById('blurTxt');
var brightnessTxt = document.getElementById('brightnessTxt');
var contrastTxt = document.getElementById('contrastTxt');
var grayscaleTxt = document.getElementById('grayscaleTxt');
var invertTxt = document.getElementById('invertTxt');
var saturateTxt = document.getElementById('saturateTxt');
var sepiaTxt = document.getElementById('sepiaTxt');
var hueRotateTxt = document.getElementById('hueRotateTxt');

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
    actionStack.push(new stack("importPic"));
    valueStack.push(new stack(0));
    document.getElementById('allFiltersOptions').style.display="block";
    document.getElementById('editor-zone').style.height=canvas.height;
}
function failed() {
  alert("L'upload a échoué. Veuillez réessayer.");
}

// -> Enregistrement de l'image     Etat:Fonctionnel
function saveAs() {
    var download = document.getElementById("download");
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}

// -> Filtres effets    Etat:Fonctionnel
function newValue(val=0, filter) {
    switch (filter){
        case 'bluring':
            bluring.value = parseInt(bluring.value) + val;
            blurTxt.innerHTML=bluring.value + "px";
            break;
        case 'brightness':
            brightness.value = parseInt(brightness.value) + val;
            brightnessTxt.innerHTML=brightness.value + "%";
            break;
        case 'contrast':
            contrast.value = parseInt(contrast.value) + val;
            contrastTxt.innerHTML=contrast.value + "%";
            break;
        case 'grayscale':
            grayscale.value = parseInt(grayscale.value) + val;
            grayscaleTxt.innerHTML=grayscale.value + "%";
            break;
        case 'invert':
            invert.value = parseInt(invert.value) + val;
            invertTxt.innerHTML=invert.value + "%";
            break;
        case 'saturate':
            saturate.value = parseInt(saturate.value) + val;
            saturateTxt.innerHTML=saturate.value + "%";
            break;
        case 'sepia':
            sepia.value = parseInt(sepia.value) + val;
            sepiaTxt.innerHTML=sepia.value + "%";
            break;
        case 'hueRotate':
            hueRotate.value = parseInt(hueRotate.value) + val;
            hueRotateTxt.innerHTML=hueRotate.value + "°";
            break;
    }
    ctx.filter = `blur(${bluring.value}px) brightness(${brightness.value}%) contrast(${contrast.value}%) invert(${invert.value}%) saturate(${saturate.value}%) sepia(${sepia.value}%) grayscale(${grayscale.value}%) hue-rotate(${hueRotate.value}deg)`;
    ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
}

function apply(filter) {
    for (let i=0; i < actionStack.length-1; i++){
        if (actionStack[i]._action == filter){
            count += 1;
        }
    }
    if (count = 0) {
        actionStack.push(new stack(filter));
        count=0;
        alert(count);
        if (filter=='brightness' || filter=='contrast' || filter=='saturate') {
            alert("azer");
            valueStack.push(new stack(100));
        } else {
            alert("bing");
            valueStack.push(new stack(0));
        }
    console.log(actionStack[actionStack.length-1]._action + valueStack[valueStack.length-1]._action);
    }
    switch (filter){
        case 'bluring':
            actionStack.push(new stack("bluring"));
            valueStack.push(new stack(bluring.value));
            break;
        case 'brightness':
            actionStack.push(new stack("brightness"));
            valueStack.push(new stack(brightness.value));
            break;
        case 'contrast':
            actionStack.push(new stack("contrast"));
            valueStack.push(new stack(contrast.value));
            break;
        case 'grayscale':
            actionStack.push(new stack("grayscale"));
            valueStack.push(new stack(grayscale.value));
            break;
        case 'invert':
            actionStack.push(new stack("invert"));
            valueStack.push(new stack(invert.value));
            break;
        case 'saturate':
            actionStack.push(new stack("saturate"));
            valueStack.push(new stack(saturate.value));
            break;
        case 'sepia':
            actionStack.push(new stack("sepia"));
            valueStack.push(new stack(sepia.value));
            break;
        case 'hueRotate':
            actionStack.push(new stack("hueRotate"));
            valueStack.push(new stack(hueRotate.value));
            break;
    }
    console.log("Apply : " + actionStack[actionStack.length-1]._action + valueStack[valueStack.length-1]._action);
}

function restore() {
    if (actionStack.length > 1){  // Si la pile contient des actions, revenir en arrière
        actionStack.pop(); // Supprimer la dernière action de la pile
        valueStack.pop();
        lastAction = actionStack[actionStack.length-1]._action; // Récupérer la dernière action effectuée
        lastValue = valueStack[valueStack.length-1]._action;
        switch(lastAction) {
            case 'bluring':
                bluring.value = lastValue;
                newValue(0, "bluring");
                break;
            case 'brightness':
                brightness.value = lastValue;
                newValue(0, "brightness");
                break;
            case 'contrast':
                contrast.value = lastValue;
                newValue(0, "contrast");
                break;
            case 'grayscale':
                grayscale.value = lastValue;
                newValue(0, "grayscale");
                break;
            case 'invert':
                invert.value = lastValue;
                newValue(0, "invert");
                break;
            case 'saturate':
                saturate.value = lastValue;
                newValue(0, "saturate");
                break;
            case 'sepia':
                sepia.value = lastValue;
                newValue(0, "sepia");
                break;
            case 'hueRotate':
                hueRotate.value = lastValue;
                newValue(0, "hueRotate");
                break;
            case 'importPic':
                bluring.value = invert.value = sepia.value = grayscale.value = hueRotate.value = 0;
                brightness.value = contrast.value = saturate.value = 100;
                blurTxt.innerHTML = "0px";
                invertTxt.innerHTML = sepiaTxt.innerHTML = grayscaleTxt.innerHTML = "0%";
                brightnessTxt.innerHTML = contrastTxt.innerHTML = saturateTxt.innerHTML = "100%";
                hueRotateTxt.innerHTML = "0°";
                ctx.filter = `blur(${bluring.value}px) brightness(${brightness.value}%) contrast(${contrast.value}%) invert(${invert.value}%) saturate(${saturate.value}%) sepia(${sepia.value}%) grayscale(${grayscale.value}%) hue-rotate(${hueRotate.value}deg)`;
                break;
        }

        ctx.drawImage(img, 0, 0,canvas.width,canvas.height); // Dessiner l'image à nouveau
        console.log("Restore :", actionStack[actionStack.length-1]._action + valueStack[valueStack.length-1]._action);
    } else {
        console.log("Empty");
        alert("Toutes les modifications ont déjà été annulées.")
    }
}





/*function newValue(val, filter) {
    newVal = parseInt(blur.value) + val;
    if (newVal >= 0 && newVal <= 100) {
        blur.value = newVal;
        drawCanvas();
  }
}*/





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



/*if (lastAction == "clockwise"){ // Vérifier quel action a été effectuée en dernier et réaliser l'inverse/annulation
        console.log("Reverse clockwise");
            ctx.rotate(-90 * Math.PI / 180);
            ctx.translate(-canvas.height, 0);
        } else if (lastAction == "inverseClockwise"){
            console.log("Reverse inverseClockwise");
            ctx.translate(canvas.height, 0);
            ctx.rotate(90 * Math.PI / 180);
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