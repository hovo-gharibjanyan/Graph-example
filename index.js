Array.prototype.deleteFirstEl = function () {
  for (let i = 0; i < this.length; i++) {
    this[i].shift();
  }
  return this;
};
Array.prototype.myPush = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    this.push(arr[i]);
  }
  return this;
};

let arr = [
  [3, 1, 2],
  [3, 2, 3],
  [1, 1, 4],
  [2, 1, 4],
];

const filterArr = arr.filter((array, index) => {
  return index === arr.findIndex((a) => a.toString() === array.toString());
});

let arrBob = structuredClone(filterArr);
let arrAlice = structuredClone(filterArr);

function AliceBridge(array, result = []) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] === 1 || array[i][0] === 3) {
      result.push(array[i]);
    }
  }
  return result.deleteFirstEl();
}
let Alice = AliceBridge(arrAlice);

let AliceClone = structuredClone(Alice);

function BobBridge(array, result = []) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] === 2 || array[i][0] === 3) {
      result.push(array[i]);
    }
  }
  return result.deleteFirstEl();
}

let Bob = BobBridge(arrBob);

let BobClone = structuredClone(Bob);

let allAliceIsland = Alice[0];
let allBobIsland = Bob[0];

function trueOrFalse(arr2, arr1, a = 0) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      a++;
    }
  }
  if (a === 1) {
    return true;
  } else {
    return false;
  }
}

function ifHaveThatNumberAdd(arr1, arr2) {
  let p = 0;
  for (let i = 1; i < arr1.length; i++) {
    if (trueOrFalse(arr2, arr1[i])) {
      arr2.myPush(arr1[i]);
      p += 1;
    }
  }
  if (p !== 0) {
    return [arr2, p];
  } else {
    return false;
  }
}

function mainFunction(arr1, arr2) {
  while (true) {
    if (ifHaveThatNumberAdd(arr1, arr2)) {
      ifHaveThatNumberAdd(arr1, arr2);
    } else {
      break;
    }
  }
  return arr2;
}

function foo(arr, res = []) {
  arr.forEach((element) => {
    if (!res.includes(element)) {
      res.push(element);
    }
  });
  return res;
}

let bigIslandForAlice = foo(mainFunction(Alice, allAliceIsland)); // [1,2,3,4,6,5]
let bigIslandForBob = foo(mainFunction(Bob, allBobIsland)); // [1,2,3,4]

function endProblem(n) {
  if (bigIslandForAlice.length !== n || bigIslandForBob.length !== n) {
    return -1;
  } else {
    return forAliceAndBob(AliceClone, n) + forAliceAndBob(BobClone, n);
  }
}

function forAliceAndBob(arr, n, count = 0) {
  while (arr.length !== n - 1) {
    arr.pop();
    count += 1;
  }
  return count;
}

console.log(endProblem(4));
