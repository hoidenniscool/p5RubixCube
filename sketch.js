var angle = 0;
var rubixRowAngle = 0;
var angleCamera = 0;
var cameraX;
var cameraZ;
var rubixBlocks = [];
var rubixSpeed = [1,2,4,8,16,32,64,128,256];
var size = 25;
var moveCorn = size * 2;
var rubixSize = 3;
var rubixRow = 0;
var rubixRotatedX = false;
var rubixRotatedY = false;
var rubixRotatedZ = false;
var rotateSpeed = 90/8;
//var rotateSpeed = 2.25;
var scrableCount = 0;

const white = 1;
const orange = 2;
const green = 3;
const red = 4;
const blue = 5;
const yellow = 6;
const black = 7;

p5.disableFriendlyErrors = true;

function setup() {
    createCanvas(800, 600, WEBGL);
    rubixSize = parseInt(document.getElementById("RubixSize").value);
    rubixBlocks = [];
    cameraX = 1;
    cameraZ = (height / 2) / tan(PI / 6);
    var depth = floor(rubixSize / 2)
    var beginDepth = 0 - floor(rubixSize / 2)


    for (var x = beginDepth; x <= depth; x++) {
        for (var y = beginDepth; y <= depth; y++) {
            for (var z = beginDepth; z <= depth; z++) {
                if (x == beginDepth || x == depth || y == beginDepth || y == depth || z == beginDepth || z == depth) {
                    var vector = new Vector(x * moveCorn, y * moveCorn, z * moveCorn);
                    var colors = [white, orange, green, red, blue, yellow];
                    rubixBlocks.push(new RubixBlock(vector, colors));
                }
            }
        }
    }

}

function draw() {
    background(0);
    //Camera();
    camera((height / 2) / tan(PI / 6), 0, 0, 0, 0, 0, 0, 1, 0)

    if (angle > 360) {
        angle = 0;
    } else {
        angle++;
    }    
    rotateX(parseInt(document.getElementById("RotateX").value) * Math.PI / 180);
    rotateY(parseInt(document.getElementById("RotateY").value) * Math.PI / 180);
    rotateZ(parseInt(document.getElementById("RotateZ").value) * Math.PI / 180);

    if (scrableCount != 0 && !rubixRotatedX && !rubixRotatedY && !rubixRotatedZ) {
        ScrableRubix();
        scrableCount--;
    }

    if(!rubixRotatedX && !rubixRotatedY && !rubixRotatedZ) {
        rotateSpeed = 90 / rubixSpeed[parseInt(document.getElementById("RotateSpeed").value)];
    }
   
    CreateRubixCube();
}

function Camera() {
    var cameraZ = Math.cos(angleCamera * Math.PI / 180) * (height / 2) / tan(PI / 6)
    var cameraX = Math.cos((90 - angleCamera) * Math.PI / 180) * (height / 2) / tan(PI / 6)
    camera(cameraX, -150, cameraZ, 0, 0, 0, 0, 1, 0)
    if (angleCamera > 360) {
        angleCamera = 0;
    } else {
        angleCamera++;
    }
}

function ScrableRubix() {
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    var depth = floor(rubixSize / 2);
    var randomNm1 = randomIntFromInterval(1,3);
    var randomNm2 = randomIntFromInterval(depth * -1, depth);
    if (randomNm1 == 1) {
        RubixRotateX(randomNm2)
    } else if (randomNm1 == 2) {
        RubixRotateY(randomNm2)
    } else if (randomNm1 == 3) {
        RubixRotateZ(randomNm2)
    }
}

function GetColor(type) {
    if (type == 1) {
        return new Color(255, 255, 255)
    } else if (type == 2) {
        return new Color(255, 165, 0)
    }
    else if (type == 3) {
        return new Color(11, 102, 35)
    }
    else if (type == 4) {
        return new Color(255, 0, 0)
    }
    else if (type == 5) {
        return new Color(0, 0, 255)
    }
    else if (type == 6) {
        return new Color(250, 210, 1)
    }
    else if (type == 7) {
        return new Color(0, 0, 0)
    }
}

function RubixRotateX(row) {
    if (!rubixRotatedX && !rubixRotatedY && !rubixRotatedZ) {
        rubixRow = row
        rubixRotatedX = true
    }
}

function RubixRotateY(row) {
    if (!rubixRotatedX && !rubixRotatedY && !rubixRotatedZ) {
        rubixRow = row
        rubixRotatedY = true
    }
}

function RubixRotateZ(row) {
    if (!rubixRotatedX && !rubixRotatedY && !rubixRotatedZ) {
        rubixRow = row
        rubixRotatedZ = true
    }
}

function Cube(rubixBlock) {
    push()

    if (rubixBlock.row.x == rubixRow && rubixRotatedX) {
        rubixBlock.degree.x += rotateSpeed;
        rubixBlock.angle.x = (rubixBlock.degree.x) * Math.PI / 180;
        //rubixBlock.row.y = 0
        //rubixBlock.row.z * -1
    }

    rotateX(rubixBlock.angle.x);

    if (rubixBlock.row.y == rubixRow && rubixRotatedY) {
        rubixBlock.degree.y += rotateSpeed;
        rubixBlock.angle.y = (rubixBlock.degree.y) * Math.PI / 180;
    }

    rotateY(rubixBlock.angle.y);

    if (rubixBlock.row.z == rubixRow && rubixRotatedZ) {
        rubixBlock.degree.z += rotateSpeed;
        rubixBlock.angle.z = (rubixBlock.degree.z) * Math.PI / 180;
    }

    rotateZ(rubixBlock.angle.z);

    var depth = floor(rubixSize / 2);
    var vector = rubixBlock.pos;
    var colors = rubixBlock.colors;
    translate(vector.x, vector.y, vector.z);

    if (rubixBlock.row.z == depth) {
        beginShape(); // voorkant
        var color = GetColor(colors[0])
        fill(color.r, color.g, color.b);
        vertex(size, size, size);
        vertex(-size, size, size);
        vertex(-size, -size, size);
        vertex(size, -size, size);
        endShape(CLOSE);
    }

    if (rubixBlock.row.y == depth) {
        beginShape(); //onderkant
        color = GetColor(colors[1])
        fill(color.r, color.g, color.b);
        vertex(size, size, size);
        vertex(size, size, -size);
        vertex(-size, size, -size);
        vertex(-size, size, size);
        endShape(CLOSE);
    }

    if (rubixBlock.row.x == depth) {
        beginShape(); //rechterkant
        color = GetColor(colors[2])
        fill(color.r, color.g, color.b);
        vertex(size, size, size);
        vertex(size, -size, size);
        vertex(size, -size, -size);
        vertex(size, size, -size);
        endShape(CLOSE);
    }

    if (rubixBlock.row.z == depth * -1) {
        beginShape(); //achterkant
        color = GetColor(colors[3])
        fill(color.r, color.g, color.b);
        vertex(-size, -size, -size);
        vertex(size, -size, -size);
        vertex(size, size, -size);
        vertex(-size, size, -size);
        endShape(CLOSE);
    }

    if (rubixBlock.row.y == depth * -1) {
        beginShape(); //bovenkant
        color = GetColor(colors[4])
        fill(color.r, color.g, color.b);
        vertex(-size, -size, -size);
        vertex(-size, -size, size);
        vertex(size, -size, size);
        vertex(size, -size, -size);
        endShape(CLOSE);
    }

    if (rubixBlock.row.x == depth * -1) {
        beginShape(); //linkerkant
        color = GetColor(colors[5])
        fill(color.r, color.g, color.b);
        vertex(-size, -size, -size);
        vertex(-size, size, -size);
        vertex(-size, size, size);
        vertex(-size, -size, size);
        endShape(CLOSE);
    }

    pop()
}

function CreateRubixCube() {
    if (rubixRotatedX) {
        if (rubixRowAngle != 90) {
            rubixRowAngle += rotateSpeed;
        } else {
            rubixRowAngle = 0;
            rubixRotatedX = false

            //rubixBlocks = dupRubix.concat(rowNewX)
            rubixBlocks.forEach(function (x) { x.angle.x = 0; x.degree.x = 0 });
            var rowNewX = rubixBlocks.filter(x => x.row.x == rubixRow);
            rowNewX.forEach(function (x) {
                TurnColorX(x);
                var oldZ = x.row.z;
                x.row.z = x.row.y;
                x.row.y = oldZ * -1;

                x.pos.z = moveCorn * x.row.z;
                x.pos.y = moveCorn * x.row.y;
            });
        }
    }

    if (rubixRotatedY) {
        if (rubixRowAngle != 90) {
            rubixRowAngle += rotateSpeed;
        } else {
            rubixRowAngle = 0;
            rubixRotatedY = false

            //debugger;
            //rubixBlocks = dupRubix.concat(rowNewX)

            rubixBlocks.forEach(function (x) { x.angle.y = 0; x.degree.y = 0 });
            var rowNewY = rubixBlocks.filter(x => x.row.y == rubixRow);
            rowNewY.forEach(function (x) {
                TurnColorY(x);
                var oldx = x.row.x;
                x.row.x = x.row.z;
                x.row.z = oldx * -1;

                x.pos.z = moveCorn * x.row.z;
                x.pos.x = moveCorn * x.row.x;
            });
        }
    }

    if (rubixRotatedZ) {
        if (rubixRowAngle != 90) {
            rubixRowAngle += rotateSpeed;
        } else {
            rubixRowAngle = 0;
            rubixRotatedZ = false;

            rubixBlocks.forEach(function (x) { x.angle.z = 0; x.degree.z = 0 });
            var rowNewZ = rubixBlocks.filter(x => x.row.z == rubixRow);
            rowNewZ.forEach(function (x) {
                TurnColorZ(x);
                var oldy = x.row.y;
                x.row.y = x.row.x;
                x.row.x = oldy * -1;

                x.pos.y = moveCorn * x.row.y;
                x.pos.x = moveCorn * x.row.x;
            });
        }
    }

    for (var i = 0; i < rubixBlocks.length; i++) {
        Cube(rubixBlocks[i]);
    }
}

function TurnColorX(Block) {
    var dupColor = Block.colors.slice();

    Block.colors[3] = dupColor[4];
    Block.colors[4] = dupColor[0];
    Block.colors[0] = dupColor[1];
    Block.colors[1] = dupColor[3];
}

function TurnColorY(Block) {
    var dupColor = Block.colors.slice();

    Block.colors[2] = dupColor[0];
    Block.colors[3] = dupColor[2];
    Block.colors[5] = dupColor[3];
    Block.colors[0] = dupColor[5];
}

function TurnColorZ(Block) {
    var dupColor = Block.colors.slice();

    Block.colors[2] = dupColor[4];
    Block.colors[1] = dupColor[2];
    Block.colors[5] = dupColor[1];
    Block.colors[4] = dupColor[5];
}

class RubixBlock {
    constructor(pos, colors) {
        this.pos = pos
        this.colors = colors
        this.angle = new Vector(0, 0, 0);
        this.degree = new Vector(0, 0, 0);
        this.row = new Vector(this.pos.x / (size * 2), this.pos.y / (size * 2), this.pos.z / (size * 2))
    }
}

class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}