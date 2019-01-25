import * as d3 from 'd3';

function getCoords(e) {
    e = d3.event;
    const x = e.pageX;
    const y = e.pageY;
    return [x, y];
}

export { getCoords };
