// Function to find the smallest number in the array
const findSmallestNumber = arr => {
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
};
let arr1 = [12, 6, 10, 2, 45, 100];
console.log(findSmallestNumber(arr1));

// Function to find the least frequent item in the array
const findLeastFrequentItem = arr => {
    const frequencyMap = arr.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(frequencyMap).reduce((leastFrequent, item) => 
        frequencyMap[item] < frequencyMap[leastFrequent] ? item : leastFrequent
    );
};

let arr3 = [3, 'c', 'c', 'a', 2, 3, 'c', 3, 'c', 2, 4, 9, 9];
console.log(findLeastFrequentItem(arr3)); 

// Function to remove duplicates from an array
const removeDuplicates = arr => {
    const uniqueItems = [];
    const itemCounts = arr.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});

    for (const item in itemCounts) {
        if (itemCounts[item] === 1) {
            uniqueItems.push(item);
        }
    }

    return uniqueItems;
};

let arr2 = [7, 9, 1, 'a', 'a', 'f', 9, 4, 2, 'd', 'd'];
console.log(removeDuplicates(arr2)); 

// Function to concatenate arrays into sentences
const concatArrays = data => {
    return data.map(arr => arr.join(' '));
};

let data = [
  ["The", "little", "horse"],
  ["Plane", "over", "the", "ocean"],
  ["Chocolate", "ice", "cream", "is", "awesome"],
  ["this", "is", "a", "long", "sentence"]
];

console.log(concatArrays(data)); 
