function convertValuesToMillions(data) {
    const valuesAreInMillions = /\./.test(data.children[0].children[0].value)
    if (valuesAreInMillions) return data;
    
    for (let subData1 of data.children) {
        for (let subData2 of subData1.children) {
            let num = +subData2.value;
            subData2.value = '' + Math.round(num / 10000) / 100;
        }
    }
    return data;
}

export { convertValuesToMillions };
