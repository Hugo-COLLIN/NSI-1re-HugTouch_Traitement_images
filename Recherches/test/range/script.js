function run() {
  var one = document.getElementById("range1").value;
  document.getElementById('out1').value = one;
  var two = document.getElementById("range2").value;
  document.getElementById('out2').value = two;
}

function setNewValue(val) {
  var r1 = document.getElementById("range1");
  r1val = parseInt(r1.value) + val;
  if (r1val >= 0 && r1val <= 100) {
    r1.value = r1val;
    document.getElementById('out1').value = r1val;
  }

  var r2 = document.getElementById("range2");
  r2val = parseInt(r2.value) + val;
  if (r2val >= 0 && r2val <= 100) {
    r2.value = r2val;
    document.getElementById('out2').value = r2val;
  }
}


///nex
var confirmOnLeave = function(msg) {
 
    window.onbeforeunload = function (e) {
        e = e || window.event;
        msg = msg || '';
 
        // For IE and Firefox
        if (e) {e.returnValue = msg;}
 
        // For Chrome and Safari
        return msg;
    };
 
};
 
// message de confirmation générique du navigateur
confirmOnLeave();
 
// message de confirmation personnalisé
confirmOnLeave('Vous allez perdre votre travail, êtes vous sûr(e) de vouloir quitter la page ?');