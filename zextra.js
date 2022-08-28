const arr1 = [2, 3, 1, 2, 5, 6, 7, 3, 3, 4];
const arr2 = [3, 1, 2, 1, 3, 4, 5, 6, 3, 7];

function recurringNumbers(arr) {
  for (let i = 0; i < arr.length; i++) {
    let duplicate = false;
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        duplicate = true;
      }
    }
  }
}
