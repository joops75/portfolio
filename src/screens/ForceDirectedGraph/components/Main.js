import React, { Component } from 'react';
import * as d3 from 'd3';
import data from '../assets/data/countries.json';
import setNavandBackgroundStyles from '../../../assets/functions/setNavandBackgroundStyles';
import '../styles/main.css';

class ForceDirectedGraph extends Component {
    constructor(props) {
        super(props)
        
        this.buildGraph = this.buildGraph.bind(this)
    }
    componentWillUnmount() {
        d3.selectAll('#forcedirectedgraph img').on('.', null) // to remove all listeners with no name, specify . as the typename
    }
    componentDidMount() {
        setNavandBackgroundStyles('rgb(179, 179, 255)', null, '#forcedirectedgraph')
        // Wait 0.5s before building graph to allow the navbar time to collapse so
        // the correct navHeight value can be determined for correct image placement.
        setTimeout(this.buildGraph, 500)
    }
    buildGraph() {
        const w = 1000
        const h = 1000
        const frameMargin = 20
        const frameWidth = w + frameMargin * 2 //included in the css #heading width value so as to give a fixed headingHeight value regardless of device
        const navElement = document.querySelector('nav')
        const navHeight = navElement ? navElement.clientHeight : 0
        const headingHeight = document.getElementById('heading').clientHeight
        const frameHeight = h + headingHeight + frameMargin
        
        d3.select('#frame')
          .style('width', frameWidth + 'px')
          .style('height', frameHeight + 'px')
        
        d3.select('#chart')
          .style('width', w + 'px')
          .style('height', h + 'px')
        
        const vertScrollBar = window.innerHeight - navHeight < frameHeight ? 16 : 0 //scrollbar is 16 pixels wide when displayed
        
        const xPosition = function(xCoord) {
            if (frameWidth < window.innerWidth - vertScrollBar) {
                return 0.5 * (window.innerWidth - w) - vertScrollBar + xCoord
            }
            
            return frameMargin + xCoord - vertScrollBar / 2
        }
        
        const yPosition = function(yCoord) {
            return navHeight + headingHeight + yCoord
        }
        
        // d3.json('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json') // alternative api call
        //     .then(data => {

            const simulation = d3.forceSimulation(data.nodes)
                                .force("link", d3.forceLink(data.links).id(d => d.index))
                                .force("charge", d3.forceManyBody().strength(-60).distanceMax(170))
                                .force("center", d3.forceCenter(w / 2, h / 2))

            const svg = d3.select('#chart')
                        .append('svg')
                        .attr('width', w)
                        .attr('height', h)
            
            const link = svg.selectAll('line')
                            .data(data.links)
                            .enter()
                            .append('line')
                            .style('stroke', 'grey')
                            .style('stroke-width', 1)
            
            const node = d3.select('#chart')
                            .selectAll('img')
                            .data(data.nodes)
                            .enter()
                            .append('img')
                            .attr('class', function(d) {return 'flag flag-' + d.code})
                            .call(this.drag(simulation))
                            .on('mouseover', function(d) {
                                d3.select('#tooltip')
                                    .transition()
                                    .duration(500)
                                    .style('opacity', 1)
                                    .style('left', xPosition(d.x) + 23 + 'px')
                                    .style('top', yPosition(d.y) - 5 + 'px')
                                    .text(d.country)
                                    .style('display', 'inline')
                                    // move tooltip to foreground to position over images
                                    .style('z-index', 1)
                            })
                            .on('mouseout', function() {
                                d3.select('#tooltip')
                                    .transition()
                                    .duration(500)
                                    .style('opacity', 0)
                                    // move tooltip to background so as not to obstruct image mouseover events
                                    .style('z-index', -1)
                            })
            
            simulation.on('tick', function() {
            
                link.attr('x1', function(d) {return d.source.x})
                    .attr('y1', function(d) {return d.source.y})
                    .attr('x2', function(d) {return d.target.x})
                    .attr('y2', function(d) {return d.target.y})
            
                node.style('left', function(d) {return xPosition(d.x) + 'px'})
                    .style('top', function(d) {return yPosition(d.y) + 2 + 'px'})
            
            })
        // })
        // .catch(err => console.error(err))
    }

    drag(simulation) {
  
        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        
        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
        
        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
        
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    render() {
        return (
            <div id='forcedirectedgraph'>
                <div>
                    <h2 id='heading'>D3 Force Directed Graph - National Contiguity</h2>
                    <div id='chart'></div>
                </div>
                <div id='tooltip'></div>
            </div>
        );
    }
}

export default ForceDirectedGraph;
