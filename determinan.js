function calculateDeterminant() {
    var matrixInput = document.getElementById('matrixInput').value;
    var matrixRows = matrixInput.trim().split('\n');
    var order = Math.sqrt(matrixRows[0].trim().split(/\s+/).length); // Menghitung ordo matriks
    var matrix = matrixRows.map(row => row.trim().split(/\s+/).map(Number));
    
    var determinant = findDeterminant(matrix);
    var explanation = explainDeterminant(matrix);

    displayResult(determinant, explanation);
}

function findDeterminant(matrix) {
    var order = matrix.length;
    if (order === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    } else if (order === 3) {
        return (
            matrix[0][0] * matrix[1][1] * matrix[2][2] +
            matrix[0][1] * matrix[1][2] * matrix[2][0] +
            matrix[0][2] * matrix[1][0] * matrix[2][1] -
            matrix[0][2] * matrix[1][1] * matrix[2][0] -
            matrix[0][0] * matrix[1][2] * matrix[2][1] -
            matrix[0][1] * matrix[1][0] * matrix[2][2]
        );
    } else if (order === 4) {
        return (
            matrix[0][0] * matrix[1][1] * matrix[2][2] * matrix[3][3] +
            matrix[0][1] * matrix[1][2] * matrix[2][3] * matrix[3][0] +
            matrix[0][2] * matrix[1][3] * matrix[2][0] * matrix[3][1] +
            matrix[0][3] * matrix[1][0] * matrix[2][1] * matrix[3][2] -
            matrix[0][3] * matrix[1][2] * matrix[2][1] * matrix[3][0] -
            matrix[0][0] * matrix[1][3] * matrix[2][2] * matrix[3][1] -
            matrix[0][1] * matrix[1][0] * matrix[2][3] * matrix[3][2] -
            matrix[0][2] * matrix[1][1] * matrix[2][0] * matrix[3][3]
        );
    } else {
        return 'Perhitungan determinan untuk ordo ' + order + 'x' + order + ' belum diimplementasikan.';
    }
}
function explainDeterminant(matrix) {
    var order = matrix.length;
    if (order === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    } else if (order === 3) {
        return (
            matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
            matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
            matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
        );
    } else if (order === 4) {
        return (
            matrix[0][0] * (
                matrix[1][1] * (matrix[2][2] * matrix[3][3] - matrix[2][3] * matrix[3][2]) -
                matrix[1][2] * (matrix[2][1] * matrix[3][3] - matrix[2][3] * matrix[3][1]) +
                matrix[1][3] * (matrix[2][1] * matrix[3][2] - matrix[2][2] * matrix[3][1])
            ) -
            matrix[0][1] * (
                matrix[1][0] * (matrix[2][2] * matrix[3][3] - matrix[2][3] * matrix[3][2]) -
                matrix[1][2] * (matrix[2][0] * matrix[3][3] - matrix[2][3] * matrix[3][0]) +
                matrix[1][3] * (matrix[2][0] * matrix[3][2] - matrix[2][2] * matrix[3][0])
            ) +
            matrix[0][2] * (
                matrix[1][0] * (matrix[2][1] * matrix[3][3] - matrix[2][3] * matrix[3][1]) -
                matrix[1][1] * (matrix[2][0] * matrix[3][3] - matrix[2][3] * matrix[3][0]) +
                matrix[1][3] * (matrix[2][0] * matrix[3][1] - matrix[2][1] * matrix[3][0])
            ) -
            matrix[0][3] * (
                matrix[1][0] * (matrix[2][1] * matrix[3][2] - matrix[2][2] * matrix[3][1]) -
                matrix[1][1] * (matrix[2][0] * matrix[3][2] - matrix[2][2] * matrix[3][0]) +
                matrix[1][2] * (matrix[2][0] * matrix[3][1] - matrix[2][1] * matrix[3][0])
            )
        );
    } else {
        // Metode ekspansi kofaktor untuk ordo lebih tinggi
        var determinant = 0;
        for (var j = 0; j < order; j++) {
            determinant += matrix[0][j] * cofactor(matrix, 0, j);
        }
        return determinant;
    }
}

function cofactor(matrix, row, col) {
    var minorMatrix = [];
    for (var i = 0; i < matrix.length; i++) {
        if (i !== row) {
            var minorRow = [];
            for (var j = 0; j < matrix[i].length; j++) {
                if (j !== col) {
                    minorRow.push(matrix[i][j]);
                }
            }
            minorMatrix.push(minorRow);
        }
    }
    var sign = (row + col) % 2 === 0 ? 1 : -1;
    return sign * findDeterminant(minorMatrix);
}

// function explainDeterminant(matrix) {
//     var order = matrix.length;
//     if (order === 2) {
//         var a = matrix[0][0];
//         var b = matrix[0][1];
//         var c = matrix[1][0];
//         var d = matrix[1][1];

//         var explanation = `Langkah-langkah perhitungan determinan:\n`;
//         explanation += `Determinan = ad - bc\n`;
//         explanation += `= (${a} * ${d}) - (${b} * ${c})\n`;
//         explanation += `= ${a * d} - ${b * c}\n`;
//         explanation += `= ${a * d - b * c}`;
//         return explanation;
//     } else if (order === 3) {
//         var a = matrix[0][0], b = matrix[0][1], c = matrix[0][2];
//         var d = matrix[1][0], e = matrix[1][1], f = matrix[1][2];
//         var g = matrix[2][0], h = matrix[2][1], i = matrix[2][2];

//         var explanation = `Langkah-langkah perhitungan determinan:\n`;
//         explanation += `Determinan = (aei + bfg + cdh) - (ceg + bdi + afh)\n`;
//         explanation += `= (${a} * ${e} * ${i}) + (${b} * ${f} * ${g}) + (${c} * ${d} * ${h}) - `;
//         explanation += `(${c} * ${e} * ${g}) - (${b} * ${d} * ${i}) - (${a} * ${f} * ${h})\n`;
//         explanation += `= ${a * e * i} + ${b * f * g} + ${c * d * h} - ${c * e * g} - ${b * d * i} - ${a * f * h}\n`;
//         explanation += `= ${a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h}`;
//         return explanation;
//     } else if (order === 4) {
//         var a = matrix[0][0], b = matrix[0][1], c = matrix[0][2], d = matrix[0][3];
//         var e = matrix[1][0], f = matrix[1][1], g = matrix[1][2], h = matrix[1][3];
//         var i = matrix[2][0], j = matrix[2][1], k = matrix[2][2], l = matrix[2][3];
//         var m = matrix[3][0], n = matrix[3][1], o = matrix[3][2], p = matrix[3][3];

//         var explanation = `Langkah-langkah perhitungan determinan:\n`;
//         explanation += `Determinan = adfi + bfgj + cegk + dhlp - dhfo - belp - aclm - egip\n`;
//         explanation += `= (${a} * ${f} * ${k} * ${p}) + (${b} * ${g} * ${l} * ${m}) + (${c} * ${e} * ${i} * ${o}) + (${d} * ${h} * ${j} * ${n}) - `;
//         explanation += `(${d} * ${f} * ${h} * ${o}) - (${b} * ${e} * ${l} * ${p}) - (${a} * ${c} * ${m} * ${n}) - (${e} * ${g} * ${i} * ${p})\n`;
//         explanation += `= ${a * f * k * p} + ${b * g * l * m} + ${c * e * i * o} + ${d * h * j * n} - ${d * f * h * o} - ${b * e * l * p} - ${a * c * m * n} - ${e * g * i * p}\n`;
//         explanation += `= ${a * f * k * p + b * g * l * m + c * e * i * o + d * h * j * n - d * f * h * o - b * e * l * p - a * c * m * n - e * g * i * p}`;
//         return explanation;
//     } else {
//         return 'Penjelasan perhitungan determinan untuk ordo ' + order + 'x' + order + ' belum tersedia.';
//     }
// }

function explainDeterminant(matrix) {
    var order = matrix.length;
    if (order === 2) {
        var a = matrix[0][0], b = matrix[0][1];
        var c = matrix[1][0], d = matrix[1][1];

        var explanation = `Langkah-langkah perhitungan determinan:\n`;
        explanation += `Determinan = ad - bc\n`;
        explanation += `= (${a} * ${d}) - (${b} * ${c})\n`;
        explanation += `= ${a * d} - ${b * c}\n`;
        explanation += `= ${a * d - b * c}`;
        return explanation;
    } else if (order === 3) {
        var a = matrix[0][0], b = matrix[0][1], c = matrix[0][2];
        var d = matrix[1][0], e = matrix[1][1], f = matrix[1][2];
        var g = matrix[2][0], h = matrix[2][1], i = matrix[2][2];

        var explanation = `Langkah-langkah perhitungan determinan:\n`;
        explanation += `Determinan = aei + bfg + cdh - ceg - bdi - afh\n`;
        explanation += `= (${a} * ${e} * ${i}) + (${b} * ${f} * ${g}) + (${c} * ${d} * ${h}) - `;
        explanation += `(${c} * ${e} * ${g}) - (${b} * ${d} * ${i}) - (${a} * ${f} * ${h})\n`;
        explanation += `= ${a * e * i} + ${b * f * g} + ${c * d * h} - ${c * e * g} - ${b * d * i} - ${a * f * h}\n`;
        explanation += `= ${a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h}`;
        return explanation;
    } else if (order === 4) {
        var a = matrix[0][0], b = matrix[0][1], c = matrix[0][2], d = matrix[0][3];
        var e = matrix[1][0], f = matrix[1][1], g = matrix[1][2], h = matrix[1][3];
        var i = matrix[2][0], j = matrix[2][1], k = matrix[2][2], l = matrix[2][3];
        var m = matrix[3][0], n = matrix[3][1], o = matrix[3][2], p = matrix[3][3];

        var explanation = `Langkah-langkah perhitungan determinan:\n`;
        explanation += `Determinan = adfi + bfgj + cegk + dhlp - dhfo - belp - aclm - egip\n`;
        explanation += `= (${a} * ${f} * ${k} * ${p}) + (${b} * ${g} * ${l} * ${m}) + (${c} * ${e} * ${i} * ${o}) + (${d} * ${h} * ${j} * ${n}) - `;
        explanation += `(${d} * ${f} * ${h} * ${o}) - (${b} * ${e} * ${l} * ${p}) - (${a} * ${c} * ${m} * ${n}) - (${e} * ${g} * ${i} * ${p})\n`;
        explanation += `= ${a * f * k * p} + ${b * g * l * m} + ${c * e * i * o} + ${d * h * j * n} - ${d * f * h * o} - ${b * e * l * p} - ${a * c * m * n} - ${e * g * i * p}\n`;
        explanation += `= ${a * f * k * p + b * g * l * m + c * e * i * o + d * h * j * n - d * f * h * o - b * e * l * p - a * c * m * n - e * g * i * p}`;
        return explanation;
    } else {
        return 'Penjelasan perhitungan determinan untuk ordo ' + order + 'x' + order + ' belum tersedia.';
    }
}

function displayResult(determinant, explanation) {
    var resultContainer = document.getElementById('result');
    var explanationContainer = document.getElementById('explanation');
    resultContainer.innerHTML = '<h3>Determinant:</h3>' + determinant;
    explanationContainer.innerHTML = '<h3>Explanation:</h3><pre>' + explanation + '</pre>';
}


