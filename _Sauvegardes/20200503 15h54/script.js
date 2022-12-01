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
var verifFilter = 0;

document.getElementById('canvas').style.display="none";

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
    document.getElementById('left').style.border="none";
    canvas.width = this.width;
    canvas.height = this.height;
    ctx.drawImage(this, 0,0);
    actionStack.push(new stack("importPic"));
    valueStack.push(new stack(0));
    document.getElementById('allFiltersOptions').style.display="block";
    document.getElementById('canvas').style.display="block";
    document.getElementById('editor-zone').style.height=canvas.height;
    document.getElementById('selectPic').style.display="none";
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

function dispGuide(){
    document.getElementById('start').style.display="block";
    /*document.getElementById('start').style.content="\002B";*/
    document.getElementById('left').style.backgroundColor="#96B8FF";
    document.getElementById('canvas').style.display="none";
}

// Appliquer des filtres sur le canvas   Etat:Fonctionnel
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
    
    if (actionStack[actionStack.length-1]._action != filter &&  verifFilter == 0 /*&& actionStack != ["importPic"]*/) {
        actionStack.push(new stack(filter));
        verifFilter = 1;
        let lastSameFilter = "x";
        for (let i=0; i < actionStack.length-1; i++){
            if (actionStack[i]._action == filter){
                lastSameFilter = i;
            }
        }
        if (lastSameFilter == "x"){
            //toDefault(filter);
            if (filter == "brightness" || filter == "contrast" || filter == "saturate") {
                valueStack.push(new stack(100));
            } else {
                valueStack.push(new stack(0));
            }
        } else {
            valueStack.push(new stack(valueStack[lastSameFilter]._action));
        }
        console.log(actionStack[actionStack.length-1]._action + valueStack[valueStack.length-1]._action);
    }
    //let count=0;
}

// Enregistrer les modifs canvas
function apply(filter) {
    verifFilter = 0;
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

// Revenir en arrière dans les modifications
function restore() {
    if (actionStack.length > 1){  // Si la pile contient des actions
        /*let deletedFilter = actionStack[actionStack.length-1]._action;
        let count=0;
        for (let i=0; i < actionStack.length-1; i++){
            if (actionStack[i]._action == deletedFilter){
                count += 1;
            }
        }
        if (count == 1) { //1 occurence du filtre signifie son initialisation.
            //console.log("Delete : " + actionStack[actionStack.length-1]._action + valueStack[valueStack.length-1]._action);
            toDefault(deletedFilter);
            actionStack.pop();
            valueStack.pop();
            console.log("Restore : " + actionStack[actionStack.length-1]._action + valueStack[valueStack.length-1]._action);
        }
        */
        let count = 1;
        if (actionStack[actionStack.length-1]._action != actionStack[actionStack.length-2]._action && actionStack[actionStack.length-2]._action != "importPic") {
            //restore;
            count=2;
            //actionStack.pop();
            //valueStack.pop();
        }
        for (let i=0; i<count; i++){
            actionStack.pop(); // Supprimer la dernière action de la pile
            valueStack.pop();
            //console.log("Delete : " + actionStack[actionStack.length-1]._action + valueStack[valueStack.length-1]._action);
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
        }
        ctx.drawImage(img, 0, 0,canvas.width,canvas.height); // Dessiner l'image à nouveau
        console.log("Restore :", actionStack[actionStack.length-1]._action + valueStack[valueStack.length-1]._action);
        if (actionStack[actionStack.length-1]._action == "importPic") {
            console.log("Empty");
            alert("Toutes les modifications ont déjà été annulées.")
        }
    } else {
        console.log("Empty");
        alert("Toutes les modifications ont déjà été annulées.")
    }
}

function toDefault (filter) {
    switch(filter) {
        case 'bluring':
            bluring.value = 0;
            blurTxt.innerHTML = "0px";
            break;
        case 'brightness':
            brightness.value = 100;
            brightnessTxt.innerHTML = "100%";
            break;
        case 'contrast':
            contrast.value=100;
            contrastTxt.innerHTML = "100%";
            break;
        case 'grayscale':
            grayscale.value = 0;
            grayscaleTxt.innerHTML = "0%";
            break;
        case 'invert':
            invert.value = 0;
            invertTxt.innerHTML = "0%";
            break;
        case 'saturate':
            saturate.value=100;
            saturateTxt.innerHTML = "100%";
            break;
        case 'sepia':
            sepia.value=0;
            sepiaTxt.innerHTML = "0%";
            break;
        case 'hueRotate':
            hueRotate.value=0;
            hueRotateTxt.innerHTML = "0°";
            break;
    }
    ctx.filter = `blur(${bluring.value}px) brightness(${brightness.value}%) contrast(${contrast.value}%) invert(${invert.value}%) saturate(${saturate.value}%) sepia(${sepia.value}%) grayscale(${grayscale.value}%) hue-rotate(${hueRotate.value}deg)`;
    ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
}



















/*
var confirmOnLeave = function(msg) {
 
        window.onunload = function (e) {
            e = e || window.event;
            msg = msg || '';
 
            // For IE and Firefox
            if (e) {e.returnValue = msg;}
 
            // For Chrome and Safari
            return msg;
        };
 
    };
// message de confirmation personnalisé
confirmOnLeave('Vous allez perdre votre travail, êtes vous sûr(e) de vouloir quitter la page ?');

*/


























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