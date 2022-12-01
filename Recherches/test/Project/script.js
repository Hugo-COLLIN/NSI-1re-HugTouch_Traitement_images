var canvas = document.getElementById('canvas');
    var blur = document.getElementById('blur');
    var brightness = document.getElementById('brightness');
    var opacity = document.getElementById('opacity');
    var sepia = document.getElementById('opacity');

    var ctx = canvas.getContext('2d')
    var image = new Image();
    //     painting = false,
    // lastX = 0,
    // lastY = 0,
    // lineThickness = 1;



image.src = 'http://corehtml5canvas.com/code-live/shared/images/countrypath.jpg';
image.onload = function(e) {
   ctx.drawImage(image, 0, 0,400,400);
};

function drawCanvas() {
  ctx.filter = `blur(${blur.value}px) brightness(${brightness.value}%)  opacity(${opacity.value}%)`;
  ctx.drawImage(image, 0, 0,400,400);  
}
blur.addEventListener('input', drawCanvas);
brightness.addEventListener('input',drawCanvas);
opacity.addEventListener('input', drawCanvas);


// // canvas.width = canvas.height = 600;

// canvas.onmousedown = function(e) {
//     painting = true;
//     ctx.fillStyle = "green";
//     lastX = e.pageX - this.offsetLeft;
//     lastY = e.pageY - this.offsetTop;
// };

// canvas.onmouseup = function(e){
//     painting = false;
// }

// canvas.onmousemove = function(e) {
//     if (painting) {
//         mouseX = e.pageX - this.offsetLeft;
//         mouseY = e.pageY - this.offsetTop;

//         // find all points between        
//         var x1 = mouseX,
//             x2 = lastX,
//             y1 = mouseY,
//             y2 = lastY;


//         var steep = (Math.abs(y2 - y1) > Math.abs(x2 - x1));
//         if (steep){
//             var x = x1;
//             x1 = y1;
//             y1 = x;

//             var y = y2;
//             y2 = x2;
//             x2 = y;
//         }
//         if (x1 > x2) {
//             var x = x1;
//             x1 = x2;
//             x2 = x;

//             var y = y1;
//             y1 = y2;
//             y2 = y;
//         }

//         var dx = x2 - x1,
//             dy = Math.abs(y2 - y1),
//             error = 0,
//             de = dy / dx,
//             yStep = -1,
//             y = y1;
        
//         if (y1 < y2) {
//             yStep = 1;
//         }
       
//         lineThickness = 5 - Math.sqrt((x2 - x1) *(x2-x1) + (y2 - y1) * (y2-y1))/10;
//         if(lineThickness < 1){
//             lineThickness = 1;   
//         }

//         for (var x = x1; x < x2; x++) {
//             if (steep) {
//                 ctx.fillRect(y, x, lineThickness , lineThickness );
//             } else {
//                 ctx.fillRect(x, y, lineThickness , lineThickness );
//             }
            
//             error += de;
//             if (error >= 0.5) {
//                 y += yStep;
//                 error -= 1.0;
//             }
//         }



//         lastX = mouseX;
//         lastY = mouseY;

//     }
// }



