export default url => {
    const relativePathNoHashArr = url && url.match(/\/#\/[^#]*/);
    return url && relativePathNoHashArr && relativePathNoHashArr[0];
}
