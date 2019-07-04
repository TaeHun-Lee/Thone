var container;
var doorQ;
var postDiv;
var xLimit;
var yLimit;
window.onload = function() {
    container = document.getElementById("container");
    postDiv = document.getElementById("postDiv");
    doorQ = [];
    doorQ[0] = document.createElement("div");
    doorQ[1] = document.createElement("div");
    container.appendChild(doorQ[0]);
    container.appendChild(doorQ[1]);
    xLimit = window.outerWidth;
    yLimit = window.outerHeight;
    for(var i = 0; i < 2; i++){
        doorQ[i].style.width = "96em";
        doorQ[i].style.height = "22.55em";
        doorQ[i].style.zIndex = "0";
        doorQ[i].style.position = "absolute";
        doorQ[i].style.background = "black";
    }
    doorQ[0].style.top = "0";
    doorQ[1].style.top = doorQ[0].style.height;
    setTimeout(doorOpen, 3000);
    setTimeout(thunder, 5000);
};

function doorOpen() {
    container.removeChild(postDiv);
    var timer = setInterval(function(){
        var substr1 = doorQ[0].style.height.split("em");
        var substr2 = doorQ[1].style.top.split("em");
        var currentHeight1 = parseFloat(substr1[0]);
        var currentHeight2 = parseFloat(substr2[0]);
        if (currentHeight1 <= 0.0) {
            doorClose(timer);
            return;
        }
        currentHeight1 -= 0.05;
        currentHeight2 += 0.05;
        doorQ[0].style.height = String(currentHeight1) + "em";
        doorQ[1].style.top = String(currentHeight2) + "em";
        doorQ[1].style.height = String(currentHeight1) + "em";
    }, 1);
}

function doorClose(timer) {
    timerReset(timer);
    doorQ[1].parentNode.removeChild(doorQ[1]);
    doorQ[0].parentNode.removeChild(doorQ[0]);
}

function thunder() {
    var elemArr = document.createElement("div");
    container.appendChild(elemArr);
    var currentX = xLimit / 2 + 50;
    var currentY = -40;
    var count = 0;
    var timer = setInterval(function(){
        thunderTime(-10, 10, (yLimit/2) - 20);
    }, 1);

    function thunderTime(xvec, yvec, yvecLimit) {
        var newElem = document.createElement("div");
        newElem.style.position = "absolute";
        newElem.style.display = "block";
        newElem.style.width = "3px";
        newElem.style.height = "3px";
        newElem.style.borderRadius = "1px";
        newElem.style.left = currentX + "px";
        currentX += xvec;
        newElem.style.top = currentY + "px";
        currentY += yvec;
        if (yvec > 0) {
            if (currentY >= yvecLimit && count < 3) {
                if (count == 2) {
                    timerReset(timer);
                    return;
                }
                else {
                    timerReset(timer);
                    timer = setInterval(function(){
                        thunderTime(15, -5, (yLimit/4) - 15);
                    }, 1);
                    count++;
                    return;
                }
            }
        }
        else {
            if (currentY <= yvecLimit && count < 2) {
                timerReset(timer);
                timer = setInterval(function(){
                    thunderTime(-5, 15, yLimit);
                }, 1);
                count++;
                return;
            }
        }
        newElem.style.background = "#ffffe6";
        elemArr.appendChild(newElem);
    }
}

function timerReset(timer){
    clearInterval(timer);
}