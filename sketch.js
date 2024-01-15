


let title = "Miyamoto Sail"
let points = [];
let projectedPoints = []
let darkMode = true;

const colours = {
  light: 230,
  dark: 12
}


let seed;

let angleX = Math.PI/2;
let angleY = 0;
// let angleZ = 0;
// let angleZ = Math.PI*2-Math.PI/3;
let angleZ = Math.PI * 1.5;

function keyPressed() {

  // Press arrow keys to change the seed
  if (keyCode === 39) seed++; redraw()
  if (keyCode === 37) seed--; redraw()

  // Press 'S' key to save SVG file
  if (keyCode === 83) save(`${filename()}.svg`)

  // Press 'D' key to toggle dark mode
  if (keyCode === 68) darkMode = !darkMode; redraw()
}

function filename() {
  return `${title}_seed=${seed}_${width}x${height}`
}


function setup() {
  seed = floor(random(1000000))
  createCanvas(windowWidth, windowHeight, SVG);
  // noLoop()
for (let i = 0; i < 20; i++) {
  points.push(createVector(-0.9, 0.9, 1.2-((i/20) * 1)))
}

for (let j = 0; j < 20; j++) {
  for (let i = 0; i < 20; i++) {
    let x = (i/20) - 0.5;
    let y = (j/20) - 0.5;
    let p = createVector(x * 1.5, y * 1.5, -1);
    points.push(p)
  }
}



  console.table(points)
}

function draw() {
  strokeWeight(0.5)
  if (darkMode) {
    background(colours.dark)
    stroke(colours.light)
} else {
    background(colours.light)
    stroke(colours.dark)
}

  angleZ += 0.005



  projectedPoints = [];
  // points = []


  let rotationX = [
    [1, 0, 0],
    [0, cos(angleX), -sin(angleX)],
    [0, sin(angleX), cos(angleX)]
  ]

  let rotationY = [
    [cos(angleY), 0, sin(angleY)],
    [0, 1, 0],
    [-sin(angleY), 0, cos(angleY)]
  ]

  let rotationZ = [
    [cos(angleZ), -sin(angleZ), 0],
    [sin(angleZ), cos(angleZ), 0],
    [0, 0, 1]
  ]


  translate(width/2, height/2);

  for (let p of points) {
    // p.mult(200)
    let rotated = vecToMatrix(p)
 

 
    rotated = matmul(rotationY, rotated);
    rotated = matmul(rotationZ, rotated);
    rotated = matmul(rotationX, rotated);


    // console.table(rotated)
    let distance = 5;
    let rotVec = matrixToVec(rotated)
    let z = 1 / (distance - rotVec.z);


    // let f = (windowHeight/2) * (cos(TAU/3)/sin(TAU/3)) / 2

    let projection = [
      [z, 0, 0],
      [0, z, 0]
    ];

    // projection = [
    //   [1, 0, 0],
    //   [0, 1, 0]
    // ]
    
    

    let projectedPoint = matmul(projection, rotated)
    n = matrixToVec(projectedPoint)
    n.mult(1000)
    n = createVector((n.x), (n.y))
    projectedPoints.push(n)
  }

  for (let i = 20; i < projectedPoints.length; i++) {
    // point(p.x, p.y)
    // for (let j = 0; j < 20; j++)
    // if (i % 2 === 0) stroke('red')
    // else stroke('white')
    connect(projectedPoints[i], projectedPoints[i % 20])
    // let r = random(projectedPoints);
    // connect(p, r)
  }


  // for (let i = 0; i < 4; i++) {
  //   connect(projectedPoints[i], projectedPoints[(i + 1) % 4])
  //   connect(projectedPoints[i + 4], projectedPoints[4 + (i + 1) % 4])
  //   connect(projectedPoints[i], projectedPoints[i+4])
  // }
}

function connect(a, b) {
  line(a.x, a.y, b.x, b.y)
}