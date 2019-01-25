import React, { Component } from 'react';
import $ from "jquery";
import { simonSound1, simonSound2, simonSound3, simonSound4 } from '../assets/audio';
import setNavandBackgroundStyles from '../../../assets/functions/setNavandBackgroundStyles';
import '../styles/main.css';
//use the react version of Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRegistered } from '@fortawesome/free-solid-svg-icons'

library.add(faRegistered);

export default class NoughtsAndCrosses extends Component {
    componentWillUnmount() {
        $('#switch-on').trigger('click') // turn unit off
        $('#switch-on').off()
        $('#switch-off').off()
        $('#start').off()
        $('#start-depress').off()
        $('#strict').off()
        $('#strict-depress').off()
        $('.up-left').off()
        $('.up-right').off()
        $('.bottom-left').off()
        $('.bottom-right').off()
    }
    componentDidMount() {
        setNavandBackgroundStyles(null, require('../assets/images/oak_floor_tileable_texture.png'), '#simongame');
        var strict = false;
        var on = false;
        var timer = 0;
        var flash;
        var busy = true;
        var sequence = [];
        var sequencer = -3;
        var play;
        var strokes = [];
        var correct = true;
        var win = 20;
        var lose = false;
        var guard = false;
        var count;
        var startGreen = 0.1;
        var startRed = 0.1;
        var startYellow = 0.155;
        var startBlue = 0.1;
        var interval = 100;
        var duration;
        var counterOff = 'rgb(80, 0, 0)';
        var counterOn = 'rgb(255, 50, 50)';
        var greenOff = 'rgb(0, 153, 51)';
        var greenOn = 'rgb(0, 203, 101)';
        var redOff = 'rgb(183, 0, 0)';
        var redOn = 'rgb(233, 0, 0)';
        var yellowOff = 'rgb(200, 200, 0)';
        var yellowOn = 'rgb(250, 250, 0)';
        var blueOff = 'rgb(0, 153, 205)';
        var blueOn = 'rgb(0, 203, 255)';
        $('#start-depress').mousedown(function() {
            $('#start-depress').hide();
            if (on==true) reset();
        })
        $('#start').mouseup(function() {
            $('#start-depress').show();
        })
        $('#start').mouseout(function() {
            $('#start-depress').show();
        })
        $('#strict-depress').mousedown(function() {
            $('#strict-depress').hide();
            if (on==true) {
            strict = !strict;
            color();
            }
        })
        $('#strict').mouseup(function() {
            $('#strict-depress').show();
        })
        
        $('#strict').mouseout(function() {
            $('#strict-depress').show();
        })
        function color() {
            if (strict==true) {
            $('#light').css('background', counterOn);
            }
            else {
            $('#light').css('background', counterOff);
            }
        }
        $('#switch-on').hide();
        $('#switch-off').click('on', function() {
            on = true;
            $('#switch-off').hide();
            $('#switch-on').show();
            powerOn();
        })
        $('#switch-on').click('on', function() {
            on = false;
            $('#switch-on').hide();
            $('#switch-off').show();
            reset()
        })
        function powerOn() {
            $('#counter').css('color', counterOn);
        }
        function greenLight() {
            clearInterval(duration);
            $('#green')[0].currentTime = startGreen;
            $('#green')[0].play();
            $('.up-left').css('background', greenOn);
        }
        function greenDark() {
            $('.up-left').css('background', greenOff);
        }
        function redLight() {
            clearInterval(duration);
            $('#red')[0].currentTime = startRed;
            $('#red')[0].play();
            $('.up-right').css('background', redOn);
        }
        function redDark() {
            $('.up-right').css('background', redOff);
        }
        function yellowLight() {
            clearInterval(duration);
            $('#yellow')[0].currentTime = startYellow;
            $('#yellow')[0].play();
            $('.bottom-left').css('background', yellowOn);
        }
        function yellowDark() {
            $('.bottom-left').css('background', yellowOff);
        }
        function blueLight() {
            clearInterval(duration);
            $('#blue')[0].currentTime = startBlue;
            $('#blue')[0].play();
            $('.bottom-right').css('background', blueOn);
        }
        function blueDark() {
            $('.bottom-right').css('background', blueOff);
        }
        $('.up-left').mousedown(function() {
            if (on==true&&busy==false) {
            clearInterval(duration);
            clearInterval(count);
            timer = 0;
            count = setInterval(countDown, 1000);
            greenLight();
            strokes.push(1);
            check();
            }
        })
        $('.up-left').mouseup(function() {
            if (guard==false) {
            greenDark();
            if ($('#green')[0].currentTime*1000-startGreen*1000<interval) {
                duration = setInterval(minDur($('#green')[0].currentTime*1000, startGreen*1000), 1);
            }
            else {
                $('#green')[0].pause();
            }
            }
        })
        $('.up-left').mouseout(function() {
            if (guard==false) {
            greenDark();
            if ($('#green')[0].currentTime*1000-startGreen*1000<interval) {
                duration = setInterval(minDur($('#green')[0].currentTime*1000, startGreen*1000), 1);
            }
            else {
                $('#green')[0].pause();
            }
            }
        })
        $('.up-right').mousedown(function() {
            if (on==true&&busy==false) {
            clearInterval(duration);
            clearInterval(count);
            timer = 0;
            count = setInterval(countDown, 1000);
            redLight();
            strokes.push(2);
            check();
            }
        })
        $('.up-right').mouseup(function() {
            if (guard==false) {
            redDark();
            if ($('#red')[0].currentTime*1000-startRed*1000<interval) {
                duration = setInterval(minDur($('#red')[0].currentTime*1000, startRed*1000), 1);
            }
            else {
                $('#red')[0].pause();
            }
            }
        })
        $('.up-right').mouseout(function() {
            if (guard==false) {
            redDark();
            if ($('#red')[0].currentTime*1000-startRed*1000<interval) {
                duration = setInterval(minDur($('#red')[0].currentTime*1000, startRed*1000), 1);
            }
            else {
                $('#red')[0].pause();
            }
            };
        })
        $('.bottom-left').mousedown(function() {
            if (on==true&&busy==false) {
            clearInterval(duration);
            clearInterval(count);
            timer = 0;
            count = setInterval(countDown, 1000);
            yellowLight();
            strokes.push(3);
            check();
            }
        })
        $('.bottom-left').mouseup(function() {
            if (guard==false) {
            yellowDark();
            if ($('#yellow')[0].currentTime*1000-startYellow*1000<interval) {
                duration = setInterval(minDur($('#yellow')[0].currentTime*1000, startYellow*1000), 1);
            }
            else {
                $('#yellow')[0].pause();
            }
            }
        })
        $('.bottom-left').mouseout(function() {
            if (guard==false) {
            yellowDark();
            if ($('#yellow')[0].currentTime*1000-startYellow*1000<interval) {
                duration = setInterval(minDur($('#yellow')[0].currentTime*1000, startYellow*1000), 1);
            }
            else {
                $('#yellow')[0].pause();
            }
            }
        })
        $('.bottom-right').mousedown(function() {
            if (on==true&&busy==false) {
            clearInterval(duration);
            clearInterval(count);
            timer = 0;
            count = setInterval(countDown, 1000);
            blueLight();
            strokes.push(4);
            check();
            }
        })
        $('.bottom-right').mouseup(function() {
            if (guard==false) {
            blueDark();
            if ($('#blue')[0].currentTime*1000-startBlue*1000<interval) {
                duration = setInterval(minDur($('#blue')[0].currentTime*1000, startBlue*1000), 1);
            }
            else {
                $('#blue')[0].pause();
            }
            }
        })
        $('.bottom-right').mouseout(function() {
            if (guard==false) {
            blueDark();
            if ($('#blue')[0].currentTime*1000-startBlue*1000<interval) {
                duration = setInterval(minDur($('#blue')[0].currentTime*1000, startBlue*1000), 1);
            }
            else {
                $('#blue')[0].pause();
            }
            }
        })
        function flasher() {
            timer++;
            if (timer%2!=0) $('#counter').css('color', counterOff);
            if (timer%2==0) $('#counter').css('color', counterOn);
            if (timer==4) {
            clearInterval(flash);
            timer = 0;
            random();
            }
        }
        function reset() {
            busy = true;
            clearInterval(flash);
            timer = 0;
            clearInterval(play);
            sequencer = -3;
            clearInterval(count);
            sequence = [];
            strokes = [];
            correct = true;
            $('#green')[0].pause();
            $('#red')[0].pause();
            $('#yellow')[0].pause();
            $('#blue')[0].pause();
            clearInterval(duration);
            if (on==false) {
            strict = false;
            $('#counter').css('color', counterOff);
            $('#counter').text('--');
            color();
            greenDark();
            redDark();
            yellowDark();
            blueDark();
            }
            else {
            if (lose==true) {
                $('#counter').text('LOSE');
                lose = false;
                flash = setInterval(flasher, 500);
            }
            else if (sequence.length==win) {
                $('#counter').text('WIN');
                flash = setInterval(flasher, 500);
            }
            else {
                $('#counter').text('--');
                greenDark();
                redDark();
                yellowDark();
                blueDark();
                flash = setInterval(flasher, 300);
            }
            }
        }
        function player() {
            guard = true;
            sequencer++;
            if (sequencer%2!=0) {
            greenDark();
            redDark();
            yellowDark();
            blueDark();
            $('#green')[0].pause();
            $('#red')[0].pause();
            $('#yellow')[0].pause();
            $('#blue')[0].pause();
            }
            else {
            if (sequence[sequencer/2]==1) {
                greenLight();
                $('#counter').text(display());
            }
            else if (sequence[sequencer/2]==2) {
                redLight();
                $('#counter').text(display());
            }
            else if (sequence[sequencer/2]==3) {
                yellowLight();
                $('#counter').text(display());
            }
            else if (sequence[sequencer/2]==4) {
                blueLight();
                $('#counter').text(display());
            }
            if (sequencer/2==sequence.length) {
                clearInterval(play);
                greenDark();
                redDark();
                yellowDark();
                blueDark();
                sequencer = -3;
                busy = false;
                guard = false;
                count = setInterval(countDown, 1000);
            }
            }
        }
        function random() {
            busy = true;
            if (correct==true) {
            var next = Math.floor(Math.random()*4+1);
            sequence.push(next);
            }
            play = setInterval(player, speed());
        }
        function check() {
            if (strokes.length==sequence.length&&strokes[strokes.length-1]==sequence[strokes.length-1]&&sequence.length==win) {
            reset();
            }
            else if (strokes[strokes.length-1]!=sequence[strokes.length-1]&&strict==true) {
            lose = true;
            reset();
            }
            else if (strokes[strokes.length-1]!=sequence[strokes.length-1]) {
            busy = true;
            strokes = [];
            correct = false;
            $('#counter').text('! !');
            clearInterval(count);
            timer = 0;
            flash = setInterval(flasher, 300);
            }
            else if (strokes.length==sequence.length&&strokes[strokes.length-1]==sequence[strokes.length-1]) {
            strokes = [];
            correct = true;
            clearInterval(count);
            timer = 0;
            random();
            }
        }
        function display() {
            var output = '';
            if (sequence.length<10) {
            output = '0' + sequence.length.toString();
            }
            else {
            output = sequence.length.toString();
            }
            return output;
        }
        function speed() {
            if (sequence.length<5) {
            return 506;
            }
            else if (sequence.length<9) {
            return 338;
            }
            else if (sequence.length<13) {
            return 225;
            }
            else {
            return 150;
            }
        }
        function countDown() {
            timer++;
            if (timer==5) {
            clearInterval(count);
            timer = 0;
            if (strict==false) {
                busy = true;
                strokes = [];
                correct = false;
                $('#counter').text('! !');
                flash = setInterval(flasher, 300);
            }
            else {
                lose = true;
                reset();
            }
            }
        }
        function minDur(time, startTime) {
            time++
            if (time-startTime==interval) {
            $('#green')[0].pause();
            $('#red')[0].pause();
            $('#yellow')[0].pause();
            $('#blue')[0].pause();
            clearInterval(duration);
            }
        }
    }
    render() {
        return (
            <div id="simongame">
                <audio id='green' type='audio/mpeg' src={simonSound1}></audio>
                <audio id='red' type='audio/mpeg' src={simonSound2}></audio>
                <audio id='yellow' type='audio/mpeg' src={simonSound3}></audio>
                <audio id='blue' type='audio/mpeg' src={simonSound4}></audio>
                <div className='base'>
                    <div className='center'>
                    <p>Simon</p>
                    <FontAwesomeIcon icon="registered" />
                    <div id='light'></div>
                    <div id='counter'>--</div>
                    <div id='start'></div>
                    <span id='start-depress'></span>
                    <div id='strict'></div>
                    <span id='strict-depress'></span>
                    <span id='count-text'>COUNT</span>
                    <span id='start-text'>START</span>
                    <span id='strict-text'>STRICT</span>
                    <div id='switch-well'></div>
                    <div id='switch-off'></div>
                    <div id='switch-on'></div>
                    <div id='off-text'>OFF</div>
                    <div id='on-text'>ON</div>
                    </div>
                    <div className='up-left'></div>
                    <div className='up-right'></div>
                    <div className='bottom-left'></div>
                    <div className='bottom-right'></div>
                </div>
            </div>
        );
    }
}
