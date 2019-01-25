function createColorMap(data) {
    const map = {};
    let index = -1;
    for (let category of data.children) {
        if (map[category.name] === undefined) {
            index ++;
            map[category.name] = index;
        }
    }
    for (let name in map) {
        map[name] = map[name] / index;
    }
    return map;
}

export { createColorMap };
