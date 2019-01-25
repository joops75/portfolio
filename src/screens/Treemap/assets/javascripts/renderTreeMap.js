function renderTreeMap(e, defaultData) {

    d3.selectAll('svg').remove();

    const dataType = e ? e.target.id : defaultData;
    let data = dataMap[dataType][0];
    data = convertValuesToMillions(data);
    d3.select('#title')
      .html(dataMap[dataType][1]);
    d3.select('#description')
      .html(dataMap[dataType][2]);

    const width = 1000;
    const height = 800;

    const treemap = data => d3.treemap()
                              .size([width, height])
                              .padding(1)
                              .round(true)
                              (d3.hierarchy(data)
                              .sum(d => +d.value)
                              .sort((a, b) => b.height - a.height || b.value - a.value))

    const root = treemap(data);

    const color = d3.interpolateSpectral;

    const colorMap = createColorMap(data);

    const fontSize = 10;

    const svg = d3.select('#page')
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height)
                  .style('font-size', fontSize + 'px');

    const leaf = svg.selectAll('g')
                    .data(root.leaves())
                    .enter()
                    .append('g')
                    .attr('transform', d => `translate(${d.x0},${d.y0})`);

    leaf.append('rect')
        .attr('class', 'tile')
        .attr('data-name', d => d.data.name)
        .attr('data-category', d => d.data.category)
        .attr('data-value', d => d.data.value)
        .attr('fill', d => { while (d.depth > 1) d = d.parent; return color(colorMap[d.data.name]); })
        // .attr('fill', d => color(colorMap[d.data.category])) // also works
        .attr('original-fill', d => { while (d.depth > 1) d = d.parent; return color(colorMap[d.data.name]); })
        .attr('fill-opacity', 1.0)
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .on('mouseover', function() {
            d3.select(this)
              .attr('fill', 'rgb(200, 0, 0)');
            
            d3.select('#name')
              .html(`<b>Name:</b> ${this.dataset.name}`);
            
            d3.select('#category')
              .html(`<b>Category:</b> ${this.dataset.category}`);
            
            d3.select('#value')
              .html(`<b>Value:</b> $${this.dataset.value} million`);

            d3.select('#tooltip')
              .attr('data-value', this.dataset.value)
              .style('display', 'inline')
              .style('left', coords[0] - 230 / 2 + 'px')
              .style('top', coords[1] - document.getElementById('tooltip').clientHeight - 20 + 'px')
              .transition()
              .duration(500)
              .style('opacity', 1);

        })
        .on('mouseout', function() {
            let current = d3.select(this);
            current.attr('fill', current.attr('original-fill'));

            d3.select('#tooltip')
              .transition()
              .duration(500)
              .style('opacity', 0);
        })

    leaf.append('text')
        .selectAll('tspan')
        .data(d => sentenceSplitter(d.data.name, d.x1 - d.x0, fontSize))
        .enter()
        .append('tspan')
        .attr('x', 3)
        .attr('y', (d, i) => (i + 1) * 1.2 * fontSize)
        .text(d => d);

    const legendRows = 4;
    const boxSize = 2 * fontSize;
    const boxAndLabelWidth = 8.5 * boxSize;

    const legend = d3.select('#legend')
                     .append('svg')
                     .attr('width', Math.ceil(data.children.length / legendRows) * boxAndLabelWidth)
                     .attr('height', legendRows * boxSize);

    const lg = legend.selectAll('g')
                     .data(data.children)
                     .enter()
                     .append('g')
                     .attr('transform', (d, i) => `translate(${Math.floor(i / legendRows) * boxAndLabelWidth}, ${i % legendRows * boxSize})`);

    lg.append('rect')
      .attr('class', 'legend-item')
      .attr('width', boxSize)
      .attr('height', boxSize)
      .attr('fill', d => color(colorMap[d.name]));

    lg.append('text')
      .attr('x', 1.5 * boxSize)
      .attr('y', 0.8 * boxSize)
      .text(d => d.name)
      .style('font-size', 0.75 * boxSize + 'px');


}

renderTreeMap(null, 'videoGameSales');