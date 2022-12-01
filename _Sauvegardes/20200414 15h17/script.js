document.getElementById('test').innerHTML="<p>tesy</p>";
function picLoaded(event){
    var dispImg = document.getElementById('displayPic');
    dispImg.src = URL.createObjectURL(event.target.files[0]);
    dispImg.onload = function() {
        URL.revokeObjectURL(dispImg.src)
    }
    document.getElementById('start').style.display="none"
    document.getElementById('left').style.backgroundColor="transparent";
}
