
function vecToMatrix(v) {
  return [
    [v.x],
    [v.y],
    [v.z]
  ]
}

function matrixToVec(m) {
  let v = createVector(m[0][0], m[1][0])
  if (m.length > 2) {
    v.z = m[2][0]
  }
  return v;
}

function matmul(a, b) {

  const colsA = a[0].length;
  const rowsA = a.length;
  const colsB = b[0].length;
  const rowsB = b.length;

  if (colsA != rowsB) {
    console.log(`${colsA} does not equal ${rowsB}`)
    return;
  }

  let result = [];

  for (let i = 0; i < rowsA; i++) {
    result[i] = []
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < rowsB; k++) {
        sum += a[i][k] * b[k][j]
      }
      result[i][j] = sum;
    }
  }

  return result;
}
