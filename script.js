// Initialisation
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
var modif = 0;

document.getElementById('popup').style.display="none";
document.getElementById('nav').style.display="none";

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

var start = document.getElementById('start');
var left = document.getElementById('left');
var popup = document.getElementById('popup');

// -> Chargement de l'image     Etat:Fonctionnel
document.getElementById('input').onchange = function(e) {
    img.onload = picLoaded;
    img.onerror = failed;
    img.src = URL.createObjectURL(this.files[0]);
};
//Lorsque image sélectionnée pour édition
function onPic() {
    modif = 1;
    start.style.display="none";
    left.style.backgroundColor="transparent";
    left.style.border="none";
    document.getElementById('selectPic').style.display="none";
    document.getElementById('allFiltersOptions').style.display="block";
    left.style.display="none";
    document.getElementById('nav').style.display="block";
    actionStack.push(new stack("importPic"));
    valueStack.push(new stack(0));
}
//Img uploadée par utilisateur
function picLoaded() {
    onPic();
    canvas.width = this.width;
    canvas.height = this.height;
    ctx.drawImage(this, 0,0);
    if (canvas.width > canvas.height) {
        if (canvas.width > 1000) {
            canvas.style.width="1000px";
        }
    } else {
        if(canvas.height > 700) {
            canvas.style.height="700px";
        }
    }
    /*if (canvas.width > canvas.height) {
        while (canvas.style.width > 1000) {
            canvas.style.width/=2;
            canvas.style.height/=2;
        }
    } else {
        while (canvas.style.height > 700) {
            canvas.style.width/=2;
            canvas.style.height/=2;
        }
    }*/
}
//Img de test choisie
function picChoosed(picture) {
    onPic();
    switch (picture){
        case 'flowers':
            img.src="Images/poppy-5058494_1000.jpg";
            break;
        case 'sunsetLandscape':
            img.src="Images/landscape-4920705_1000.jpg";
            break; 
        case 'road':
            img.src="Images/road-220058_1000.jpg";
            break;
        case 'wave':
            img.src="Images/beach-2179183_1000.jpg"
            break;
        case 'nightCactus':
            img.src="Images/milky-way-923738_1000.jpg"
            break;
        case 'lakeSunset':
            img.src="Images/lake-696098_1000.jpg"
            break;
        case 'mountain':
            img.src="Images/mountains-736886_1000.jpg"
            break;
        case 'cat':
            img.src="Images/cat-4877274_1000.jpg"
            break;
    }
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0,0);
}
//Upload échoué
function failed() {
  alert("L'upload a échoué. Veuillez réessayer.");
}
//Charger une nouvelle image
function rePic() {
    window.location.reload();
}

// -> Enregistrement de l'image     Etat:Fonctionnel
function saveAs() {
    var download = document.getElementById("download");
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}
// Afficher guide après chargement image
function dispGuide(){
    start.style.display="block";
    left.style.backgroundColor="#96B8FF";
    canvas.style.display="none";
    left.style.border="2px solid blue";
    left.style.display="block";
    popup.style.display="block";

}
//Afficher image en cours d'édition
function dispEditor() {
    start.style.display="none";
    left.style.backgroundColor="transparent";
    left.style.border="none";
    document.getElementById('editor-zone').style.height="canvas.height";
    canvas.style.display="inline-block";
    left.style.display="none";
    popup.style.display="none";
}
//Confirmer avant d'actualiser
window.onbeforeunload = function(){
    if (modif==1){
        return 'Vous allez perdre vos modifications. Êtes-vous sûr de vouloir quitter ?';
    }
};
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
}

// Enregistrer les modifs sur canvas
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
        let count = 1;
        if (actionStack[actionStack.length-1]._action != actionStack[actionStack.length-2]._action && actionStack[actionStack.length-2]._action != "importPic") { //Si les 2 dernières actions sont différentes.
            count=2;
        }
        for (let i=0; i<count; i++){
            actionStack.pop(); // Supprimer la dernière action de la pile
            valueStack.pop();
            lastAction = actionStack[actionStack.length-1]._action; // Récupérer la dernière action effectuée
            lastValue = valueStack[valueStack.length-1]._action; // Dernière valeur
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
            alert("Toutes les modifications ont déjà été annulées.");
        }
    } else {
        console.log("Empty");
        alert("Toutes les modifications ont déjà été annulées.");
    }
}
//Appliquer filtre à sa valeur par défaut
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