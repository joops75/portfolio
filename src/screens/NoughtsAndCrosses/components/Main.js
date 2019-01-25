import React, { Component } from 'react';
import $ from "jquery";
import setNavandBackgroundStyles from '../../../assets/functions/setNavandBackgroundStyles';
import '../styles/main.css';

export default class NoughtsAndCrosses extends Component {
    componentWillUnmount() {
        $('#O').off()
        $('#X').off()
        $('.board').off() // remove all event handlers from all elements with class 'board'
    }
    componentDidMount() {
        setNavandBackgroundStyles('black', null, '#noughtsandcrosses');
        var O = false;
        var X = false;
        var start = false;
        var computer = false;
        var computerCopy = !!computer;
        var position = ['#', '#', '#', '#', '#', '#', '#', '#', '#'];
        var wins = 0;
        var losses = 0;
        var ties = 0;
        $('#O').click(function() {
            if (O==false&&start==false) {
                O = true;
                $('#O').removeClass('btn-primary');
                $('#O').addClass('btn-danger');
            }
            if (X==true&&start==false) {
                X = false;
                $('#X').removeClass('btn-danger');
                $('#X').addClass('btn-primary');
            }
        })
        $('#X').click(function() {
            if (X==false&&start==false) {
                X = true;
                $('#X').removeClass('btn-primary');
                $('#X').addClass('btn-danger');
            }
            if (O==true&&start==false) {
                O = false;
                $('#O').removeClass('btn-danger');
                $('#O').addClass('btn-primary');
            }
        })
        function turn() {
            if (computer==false) {
                if (O==true) {
                    return 'O';
                }
                else {
                    return 'X'
                }
            }
            else {
                if (O==true) {
                    return 'X';
                }
                else {
                    return 'O'
                }
            }
        }
        function winCheck(arr) {
            if ((arr[0]==turn()&&arr[1]==turn()&&arr[2]==turn())||(arr[3]==turn()&&arr[4]==turn()&&arr[5]==turn())||(arr[6]==turn()&&arr[7]==turn()&&arr[8]==turn())||(arr[0]==turn()&&arr[3]==turn()&&arr[6]==turn())||(arr[1]==turn()&&arr[4]==turn()&&arr[7]==turn())||(arr[2]==turn()&&arr[5]==turn()&&arr[8]==turn())||(arr[0]==turn()&&arr[4]==turn()&&arr[8]==turn())||(arr[2]==turn()&&arr[4]==turn()&&arr[6]==turn())) {
                return true;
            }
            else {
                return false;
            }
        }
        function generator() {
            var wrap = [];
            var arr1 = [];
            var arr2 = [];
            var arr3 = [];
            for (let i=0;i<9;i++) {
                var positionCopy = position.slice();
                if (positionCopy[i]=='#') {
                    positionCopy[i] = turn();
                    if (winCheck(positionCopy)==true) {
                        arr1.push(i);
                    }
                }
                for (let j=0;j<9;j++) {
                    var positionCopy2 = positionCopy.slice();
                    var temp2 = [];
                    if (position[j]=='#'&&position[i]=='#'&&(j!=i)) {
                        positionCopy2[j] = turn();
                        if (winCheck(positionCopy2)==true) {
                            temp2.push(i, j);
                            arr2.push(temp2);
                        }
                    }
                    for (let k=0;k<9;k++) {
                        var positionCopy3 = positionCopy2.slice();
                        var temp3 = [];
                        if (position[k]=='#'&&position[j]=='#'&&position[i]=='#'&&(k!=j)&&(k!=i)&&(j!=i)) {
                            positionCopy3[k] = turn();
                            if (winCheck(positionCopy3)==true) {
                                temp3.push(i, j, k);
                                arr3.push(temp3);
                            }
                        }
                    }
                }
            }
            wrap.push(arr1, arr2, arr3);
            return wrap;
        }
        function scorer(two, three) {
            var scores = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            if (two.length>0&&three.length>0) {
                for (let i=0;i<two.length;i++) {
                    for (let j=0;j<9;j++) {
                        if (two[i][0]==j) {
                            scores[j] += 100;
                        }
                    }
                }
                for (let i=0;i<three.length;i++) {
                    for (let j=0;j<9;j++) {
                        if (three[i][0]==j) {
                            scores[j] += 1;
                        }
                    }
                }
                return scores;
            }
            if (two.length>0) {
                for (let i=0;i<two.length;i++) {
                    for (let j=0;j<9;j++) {
                        if (two[i][0]==j) {
                            scores[j] += 100;
                        }
                    }
                }
                return scores;
            }
            if (three.length>0) {
                for (let i=0;i<three.length;i++) {
                    for (let j=0;j<9;j++) {
                        if (three[i][0]==j) {
                            scores[j] += 1;
                        }
                    }
                }
                return scores;
            }
        }
        function check() {
            if ((position[0]=='O'&&position[1]=='O'&&position[2]=='O')||(position[3]=='O'&&position[4]=='O'&&position[5]=='O')||(position[6]=='O'&&position[7]=='O'&&position[8]=='O')||(position[0]=='O'&&position[3]=='O'&&position[6]=='O')||(position[1]=='O'&&position[4]=='O'&&position[7]=='O')||(position[2]=='O'&&position[5]=='O'&&position[8]=='O')||(position[0]=='O'&&position[4]=='O'&&position[8]=='O')||(position[2]=='O'&&position[4]=='O'&&position[6]=='O')) {
                if (O==true) {
                    $('#choice').html('You have won!');
                    alert('You have won!' + '\n' + '\n' + position[0] + position[1] + position[2] + '\n' + position[3] + position[4] + position[5] + '\n' + position[6] + position[7] + position[8]);
                    wins++;
                    $('#wins').html(wins);
                    reset();
                }
                else {
                    $('#choice').html('You have lost!');
                    alert('You have lost!' + '\n' + '\n' + position[0] + position[1] + position[2] + '\n' + position[3] + position[4] + position[5] + '\n' + position[6] + position[7] + position[8]);
                    losses++;
                    $('#losses').html(losses);
                    reset();
                }
            }
            if ((position[0]=='X'&&position[1]=='X'&&position[2]=='X')||(position[3]=='X'&&position[4]=='X'&&position[5]=='X')||(position[6]=='X'&&position[7]=='X'&&position[8]=='X')||(position[0]=='X'&&position[3]=='X'&&position[6]=='X')||(position[1]=='X'&&position[4]=='X'&&position[7]=='X')||(position[2]=='X'&&position[5]=='X'&&position[8]=='X')||(position[0]=='X'&&position[4]=='X'&&position[8]=='X')||(position[2]=='X'&&position[4]=='X'&&position[6]=='X')) {
                if (X==true) {
                    $('#choice').html('You have won!');
                    alert('You have won!' + '\n' + '\n' + position[0] + position[1] + position[2] + '\n' + position[3] + position[4] + position[5] + '\n' + position[6] + position[7] + position[8]);
                    wins++;
                    $('#wins').html(wins);
                    reset();
                }
                else {
                    $('#choice').html('You have lost!');
                    alert('You have lost!' + '\n' + '\n' + position[0] + position[1] + position[2] + '\n' + position[3] + position[4] + position[5] + '\n' + position[6] + position[7] + position[8]);
                    losses++;
                    $('#losses').html(losses);
                    reset();
                }
            }
            if (position[0]!='#'&&position[1]!='#'&&position[2]!='#'&&position[3]!='#'&&position[4]!='#'&&position[5]!='#'&&position[6]!='#'&&position[7]!='#'&&position[8]!='#') {
                $('#choice').html('Tie!');
                alert('You have tied!' + '\n' + '\n' + position[0] + position[1] + position[2] + '\n' + position[3] + position[4] + position[5] + '\n' + position[6] + position[7] + position[8]);
                ties++;
                $('#ties').html(ties);
                reset();
            }
        }
        function reset() {
            O = false;
            X = false;
            start = false;
            computer = !computerCopy;
            computerCopy = !!computer;
            position = ['#', '#', '#', '#', '#', '#', '#', '#', '#'];
            $('#choice').html("Choose 'O' or 'X' and play:");
            $('#O').removeClass('btn-danger');
            $('#O').addClass('btn-primary');
            $('#X').removeClass('btn-danger');
            $('#X').addClass('btn-primary');
            $('.board').html('#');
            if (computer==true) {
                cpu();
            }
        }
        function cpu() {
            if (start==false) {
                start=true;
                if (Math.random()<0.5) {
                    O = true;
                    $('#O').removeClass('btn-primary');
                    $('#O').addClass('btn-danger');
                    $('#choice').html('The CPU has begun play!')
                }
                else {
                    X = true;
                    $('#X').removeClass('btn-primary');
                    $('#X').addClass('btn-danger');
                    $('#choice').html('The CPU has begun play!')
                }
            }
            var slot = -1;
            if (generator()[0].length>0) {
                slot = generator()[0][0];
            }
            if (slot==-1) {
                computer = !computer;
                if (generator()[0].length>0) {
                    slot = generator()[0][0];
                }
                computer = !computer;
            }
            if (slot==-1) {
                if (((position[0]=='O'&&position[4]=='X'&&position[8]=='O'&&position[2]=='#'&&position[6]=='#')||(position[2]=='O'&&position[4]=='X'&&position[6]=='O'&&position[0]=='#'&&position[8]=='#')||(position[0]=='X'&&position[4]=='O'&&position[8]=='X'&&position[2]=='#'&&position[6]=='#')||(position[2]=='X'&&position[4]=='O'&&position[6]=='X'&&position[0]=='#'&&position[8]=='#'))&&(position[1]=='#'&&position[3]=='#'&&position[5]=='#'&&position[7]=='#')) {
                    var rand = Math.random();
                    if (rand<0.25) {
                        slot = 1;
                    }
                    else if (rand<0.5) {
                        slot = 3;
                    }
                    else if (rand<0.75) {
                        slot = 5;
                    }
                    else {
                        slot = 7;
                    }
                }
            }
            var cpuScores = scorer(generator()[1], generator()[2]);
            computer = !computer;
            var playerScores = scorer(generator()[1], generator()[2]);
            computer = !computer;
            if (slot==-1) {
                if (cpuScores&&playerScores) {
                    var commonMax = 0;
                    for (let i=0;i<9;i++) {
                        if (playerScores[i]+cpuScores[i]>commonMax) {
                            commonMax = playerScores[i]+cpuScores[i];
                            slot = i;
                        }
                    }
                }
                else if (cpuScores) {
                    slot = cpuScores.indexOf(Math.max(...cpuScores));
                }
                else if (playerScores) {
                    slot = playerScores.indexOf(Math.max(...playerScores));
                }
            }
            computer = !computer;
            computer = !computer;
            if (slot==-1) {
                slot = Math.floor(Math.random()*9);
                while (position[slot]!='#') {
                    slot = Math.floor(Math.random()*9);
                }
            }
            position[slot] = turn();
            $('#'+slot).html('<font color="black">' + turn() + '</font>');
            computer = false;
        }
        
        $('.board').click(function() {
            if (O==true||X==true) {
                if (start==false) {
                    $('#choice').html('You have begun play!');
                    start = true;
                }
                if ($(this).text()=='#') {
                    $(this).html('<font color="black">' + turn() + '</font>');
                    position[this.id] = $(this).text();
                    computer = !computer;
                    check();
                }
                if (computer==true) {
                    cpu();
                    check();
                }
            }
        })
    }
    render() {
        return (
            <div id="noughtsandcrosses">
                <h2>Noughts and Crosses</h2>
                <p id='choice'>Choose 'O' or 'X' and play:</p>
                <div>
                    <button id='O' className='btn btn-primary'>O</button>
                    <button id='X' className='btn btn-primary'>X</button>
                </div>
                <br />
                <div>
                    <button id='0' className='btn board'>#</button>
                    <button id='1' className='btn board'>#</button>
                    <button id='2' className='btn board'>#</button>
                </div>
                <div>
                    <button id='3' className='btn board'>#</button>
                    <button id='4' className='btn board'>#</button>
                    <button id='5' className='btn board'>#</button>
                </div>
                <div>
                    <button id='6' className='btn board'>#</button>
                    <button id='7' className='btn board'>#</button>
                    <button id='8' className='btn board'>#</button>
                </div>
                <br />
                <table>
                    <tbody>
                        <tr>
                            <td className='right'>Wins:</td>
                            <td id='wins' className='left'>0</td>
                        </tr>
                        <tr>
                            <td className='right'>Losses:</td>
                            <td id='losses' className='left'>0</td>
                        </tr>
                        <tr>
                            <td className='right'>Ties:</td>
                            <td id='ties' className='left'>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
