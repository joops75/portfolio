import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import USCountyData from '../assets/data/US County Data.json';
import USEducationData from '../assets/data/US Education Data.json';
import setNavandBackgroundStyles from '../../../assets/functions/setNavandBackgroundStyles';
import '../styles/main.css';

let coords = [];

class Choropleth extends Component {
    componentDidMount() {
        // document.getElementById('page').addEventListener('mousemove', this.getCoords);
        d3.select('#page').on('mousemove', this.getCoords); // listener transmits event via d3.event
        setNavandBackgroundStyles('rgb(230, 215, 51)', null, '#choropleth');
        this.makeChoropleth();
    }

    componentWillUnmount() {
        // document.getElementById('page').removeEventListener('mousemove', this.getCoords);
        // for (let element of document.getElementsByTagName('g')) {
        //     element.removeEventListener('mouseover', this.handleMouseOver);
        //     element.removeEventListener('mouseout', this.handleMouseOut);
        // }
        d3.select('#choropleth #page').on('mousemove', null);
        d3.selectAll('#choropleth .county').on('.', null); // to remove all listeners with no name, specify . as the typename
    }

    getCoords() {
        const e = d3.event // assign the current event using d3 if d3 was used to bind the listener
        const x = e.pageX;
        const y = e.pageY;
        coords = [x, y];
    }

    makeChoropleth() {        
        // change order of county data to match that of education data
        const fipsIndexMappings = {};
        for (let i in USEducationData) {
            const index = USEducationData[i].fips;
            fipsIndexMappings[index] = i;
        }
        
        const countyGeometries = new Array(USEducationData.length);
        for (let geometry of USCountyData.objects.counties.geometries) {
            const fips = geometry.id;
            const index = fipsIndexMappings[fips];
            countyGeometries[index] = geometry;
        }
        
        // re-assign county data to match order of education data
        USCountyData.objects.counties = {
            'type': 'GeometryCollection',
            'geometries': countyGeometries
        };
        
        const format = d3.format('');
        
        const width = 960;
        const height = 600;
        const path = d3.geoPath();
        
        const svg = d3.select('#page')
                      .append('svg')
                      .attr('width', width)
                      .attr('height', height)
        
        const bachelorsOrHigherExtent = d3.extent(USEducationData, item => item.bachelorsOrHigher);
        
        const numberOfColors = 5;
        
        const color = d3.scaleQuantize()
                        .domain(bachelorsOrHigherExtent)
                        .range(d3.schemeBlues[numberOfColors])
                    
        const x = d3.scaleLinear()
                    .domain(d3.extent(color.domain()))
                    .rangeRound([500, 740]);
        
        const g = svg.append('g')
                     .attr('id', 'legend')
                     .attr('transform', 'translate(100, 40)');
        
        g.selectAll('rect')
         .data(color.range().map(d => color.invertExtent(d)))
         .enter()
         .append('rect')
         .attr('height', 8)
         .attr('x', d => x(d[0]))
         .attr('width', d => x(d[1]) - x(d[0]))
         .attr('fill', d => color(d[0]));
        
        g.append('text')
         .attr('id', 'description')
         .attr('x', x.range()[0])
         .attr('y', -6)
         .attr('fill', 'black')
         .attr('text-anchor', 'start')
         .attr('font-weight', 'bold')
         .attr('font-size', 12)
         .attr('font-family', 'Bookman Old Style, Arial')
         .text('Population % with bachelors or higher');
        
        g.call(d3.axisBottom(x)
         .tickSize(13)
         .tickFormat(format)
        //  .tickValues(color.range().slice(1).map(d => color.invertExtent(d)[0])))
         .tickValues(new Array(numberOfColors + 1).fill(1).reduce((prev, cur, i) => {
            prev.push(i * (bachelorsOrHigherExtent[1] - bachelorsOrHigherExtent[0]) / numberOfColors + bachelorsOrHigherExtent[0])
            return prev
         }, [])))
         // remove outermost ticks and top line group
         .select('.domain')
         .remove();
        
        svg.append('g')
           .selectAll('path')
           .data(topojson.feature(USCountyData, USCountyData.objects.counties).features)
           .enter().append('path')
           .attr('fill', (d, i) => color(USEducationData[i].bachelorsOrHigher))
           .attr('stroke', 'black')
           .attr('stroke-width', 0.5)
          //  .attr('shape-rendering', 'crispEdges')
           .attr('original-fill', (d, i) => color(USEducationData[i].bachelorsOrHigher))
           .attr('d', path)
           .attr('class', 'county')
           .attr('data-fips', (d, i) => USEducationData[i].fips)
           .attr('data-education', (d, i) => USEducationData[i].bachelorsOrHigher)
           .attr('data-state', (d, i) => USEducationData[i].state)
           .attr('data-county', (d, i) => USEducationData[i].area_name)
           .on('mouseover', this.handleMouseOver)
           .on('mouseout', this.handleMouseOut)
    }

    handleMouseOver() {
        d3.select(this)
          .attr('fill', 'rgb(200, 0, 0)');
          
        d3.select('#education')
          .html(`Education level: ${this.dataset.education} %`);
          
        d3.select('#fips')
          .html(`FIPS: ${this.dataset.fips}`);
        
        d3.select('#county')
          .html(`County: ${this.dataset.county}`);
          
        d3.select('#state')
          .html(`State: ${this.dataset.state}`);
        
        d3.select('#tooltip')
          .attr('data-education', this.dataset.education)
          .style('display', 'inline')
          .style('left', coords[0] - 230 / 2 + 'px')
          .style('top', coords[1] - document.getElementById('tooltip').clientHeight - 20 + 'px')
          .transition()
          .duration(500)
          .style('opacity', 1);
    }

    handleMouseOut() {
        let current = d3.select(this);
        current.attr('fill', current.attr('original-fill'));

        d3.select('#tooltip')
          .transition()
          .duration(500)
          .style('opacity', 0)
    }

    render() {
        return (
            <div id="choropleth">
                <div id="title">US Education Data</div>
                <div id="page"></div>
                <div id="tooltip">
                    <div id="education">text</div>
                    <div id="fips">text</div>
                    <div id="county">text</div>
                    <div id="state">text</div>
                </div>
            </div>
        );
    }
}

export default Choropleth;
