/**
 * Created by Sandon on 2017/9/18.
 */

function insertionSort(array) {
  function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  var length = array.length,
    i,
    j;
  for (i = 1; i !== length; i++) {
    for (j = i; j !== 0; j--) {
      if (array[j - 1] > array[j]) {
        swap(array, j - 1, j);
      } else {
        break;
      }
    }
  }
  return array;
}
