function sumDiagonal(matrix) {
    let firstSum = 0, secondSum = 0;
    for (let i = 0; i < matrix.length; i++) {
        firstSum += matrix[i][i]; 
        secondSum += matrix[i][matrix.length - 1 - i]; 
    }
    return firstSum - secondSum;
}

const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]
const result = sumDiagonal(matrix);
console.log(result)