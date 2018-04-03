var svgns = "http://www.w3.org/2000/svg";
var svg = document.getElementById('svg');
var input = document.getElementById('level');

const startX = 500;
const startY = 0;


var posX = startX;
var posY = startY;
var angle = 0;
var attribute = "";

var turnRight = function (value) {
    angle = (angle - value) % 360;
};

var turnLeft = function (value) {
    angle = (angle + value) % 360;
};

var preparePath = function (value) {
    //attribute += "M" + posX + " " + posY + " ";

    var radians = angle * Math.PI / 180.0;
    var dx = value * Math.sin(radians);
    var dy = value * Math.cos(radians);

    posX += dx;
    posY += dy;

    attribute += "L " + posX + " " + posY + " ";
};

var kochCurve = function (level, length) {
    if (level < 1) {
        preparePath (length);
    } else {
        kochCurve (level - 1, length / 3.0);
        turnLeft (60);
        kochCurve (level - 1, length / 3.0);
        turnRight (120);
        kochCurve (level - 1, length / 3.0);
        turnLeft (60);
        kochCurve (level - 1, length / 3.0);
    }
};


var draw = function (level, length) {
    while (svg.lastChild) {
        svg.removeChild(svg.lastChild);
    }

    attribute = "M" + posX + " " + posY + " ";
    for (var i = 0; i < 3; i++) {
        kochCurve(parseInt(input.value), length);
        turnRight(120);
    }
    attribute += "Z";

    console.log(attribute);

    var shape = document.createElementNS(svgns, "path");
    shape.setAttributeNS(null, "d", attribute);
    shape.setAttributeNS(null, "class", "path");
    svg.appendChild(shape);
};
input.value = 5;
input.min = 1;
input.max = 5;



