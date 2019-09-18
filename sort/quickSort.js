const testArr = [6, 1, 2, 7, 9, 3, 4, 6, 6, 6, 5, 10, 8];

/**
 *  递归版会创建很多数组 内存占用过多 - 快速排序
 *  选第一个元素作为参考值，比参考值小的都放到左面，比参考值大的都放在右面 
 */
const quickSortRecursive = arr => {
  const refer = arr[0];
  let leftArr = [], rightArr = [];
  if (arr.length < 1) {
    return arr;
  }
  for (let i = 1, len = arr.length; i < len; i++) {
    if (arr[i] > refer) {
      rightArr.push(arr[i]);
    }
    else {
      leftArr.push(arr[i])
    }
  }
  return quickSortRecursive(leftArr).concat(refer).concat(quickSortRecursive(rightArr));
};

const recursiveResult = quickSortRecursive(testArr);
// console.log(recursiveResult, testArr);


/**
 * 递归 但是没有创新很多数组，节约内存 - 快速排序
 * 左右双指针
 */

const quickSort = arr => {
  const qs = (arr, start, end) => {
    if (end - start < 1) {
      return arr;
    }
    let left = start, right = end;
    let refer = arr[start];
    while (left < right) {
      while (left < right && arr[right] >= refer) {
        right--;
      }
      arr[left] = arr[right];
      while (left < right && arr[left] < refer) {
        left++;
      }
      arr[right] = arr[left];
    }
    arr[left] = refer;
    qs(arr, 0, left);
    qs(arr, left + 1, end);
    return arr;
  }

  let start = 0;
  let end = arr.length - 1;
  return qs(arr, start, end);
};



const result = quickSort(testArr);

// console.log('result', result)