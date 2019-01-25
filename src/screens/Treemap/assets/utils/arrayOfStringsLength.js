function arrayOfStringsLength(arr) {
    if (arr.length === 0) return 0;

    let totalLength = arr.length - 1;
    for (let str of arr) {
        totalLength += str.length;
    }
    return totalLength;
}

export { arrayOfStringsLength };
