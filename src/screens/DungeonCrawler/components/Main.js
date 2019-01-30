import React from 'react';
import $ from 'jquery';
import setNavandBackgroundStyles from '../../../assets/functions/setNavandBackgroundStyles';
import '../styles/main.css';
//use the react version of Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowUp, faArrowDown, faArrowLeft, faArrowRight);

var playerColor = 'blue'
var enemyColor = 'red'
var healthPackColor = 'green'
var weaponColor = 'orange'
var holeColor = 'brown'
var bossColor = 'purple'
var floorColor = 'white'
var spaceColor = 'grey'
var nonDisplayColor = 'black'
var defaultColor = 'magenta'
var wKeyDown = false
var sKeyDown = false
var aKeyDown = false
var dKeyDown = false
var timer
var walkingSpeed = 100
var Enemy = function(num, dungeon) {
  var type = 'enemy'
  var name = 'enemy ' + num
  var health = dungeon * 20
  var attack = 7
  var XP = dungeon * 8
  this.getType = function() {return type}
  this.getName = function() {return name}
  this.getHealth = function() {return health}
  this.setHealth = function(damage) {health -= damage}
  this.getAttack = function() {return Math.min(99, dungeon * (Math.floor(Math.random() * ((attack + 1) - (attack - 1) + 1)) + (attack - 1)))}
  this.getXP = function() {return XP}
}
var Weapon = function(name, power) {
  var type = 'weapon'
  var weaponName = name
  var weaponPower = power
  this.getType = function() {return type}
  this.getName = function() {return weaponName}
  this.getWeaponPower = function() {return weaponPower}
}
var HealthPack = function(num, dungeon) {
  var type = 'health pack'
  var name = 'health pack ' + num
  var healthValue = dungeon * 10
  this.getType = function() {return type}
  this.getName = function() {return name}
  this.getHealthValue = function() {return healthValue}
}
var Hole = function() {
  var type = 'hole'
  var name = 'hole'
  this.getType = function() {return type}
  this.getName = function() {return name}
}
var Boss = function(dungeon) {
  var type = 'boss'
  var name = 'boss'
  var bossMultiplier = 4
  var health = dungeon * 20 * bossMultiplier
  var attack = 20
  var XP = 100
  this.getType = function() {return type}
  this.getName = function() {return name}
  this.getHealth = function() {return health}
  this.setHealth = function(damage) {health -= damage}
  this.getAttack = function() {return Math.min(99, dungeon * (Math.floor(Math.random() * ((attack + bossMultiplier) - (attack - bossMultiplier) + 1)) + (attack - bossMultiplier)))}
  this.getXP = function() {return XP}
}
class Engine extends React.Component {
  constructor(props) {
    super(props)
    var tilePixels = Math.round(Math.max(screen.availHeight, screen.availWidth) / (1366/12))
    this.state = {
      tilesHor: 100,
      tilesVer: 100,
      tileSize: tilePixels,
      viewRadius: 6,
      map: [],
      windowView: [],
      playerLocation: [],
      scopeView: true,
      iScopeViewRange: [],
      jScopeViewRange: [],
      scopeViewRange: [],
      navbarHeight: 56,
      headerAndFooterHeight: 130,
      health: 100,
      weapon: 'bare hands',
      weaponPower: 7,
      attack: 7,
      level: 1,
      nextLevel: 60,
      dungeon: 1,
      finalDungeon: 4,
      enemyDamage: 0,
      currentEntity: ''
    }
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.animateWalk = this.animateWalk.bind(this)
    this.handleClick1 = this.handleClick1.bind(this)
    this.handleClick2 = this.handleClick2.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }
  componentWillMount() {
    this.generateGrid()
  }
  componentDidMount() {
    setNavandBackgroundStyles('black', null, '#dungeoncrawler')
    document.getElementById('toggleScopeViewButton').style.display = 'none'
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
    window.addEventListener('resize', this.handleResize)
    var headerAndFooterHeight = document.getElementById('height 1').clientHeight + document.getElementById('height 2').clientHeight
    if (this.state.headerAndFooterHeight != headerAndFooterHeight) {
      this.setState({
        headerAndFooterHeight: headerAndFooterHeight
      })
    }
    this.windowView(this.state.map, headerAndFooterHeight)
  }
  componentWillUnmount() {
    clearInterval(timer)
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
    window.removeEventListener('resize', this.handleResize)
    $('#toggleScopeViewButton').off()
    $('#restart').off()
  }
  generateGrid(dungeon) {
    var grid = []
    for (let i = 0; i < this.state.tilesVer; i++) {
      var arr = []
      for (let j = 0; j < this.state.tilesHor; j++) {
        arr.push('s')
        if (j == this.state.tilesHor - 1) {
          grid.push(arr)
        }
      }
    }
    this.generateRoom(grid, dungeon)
  }
  generateRoom(map, dungeon) {
    var maxRoomLength = 18
    var minRoomLength = 3
    var rooms = 0
    while (rooms <25) {
      let i = Math.floor(Math.random() * (this.state.tilesVer - maxRoomLength))
      let i2 = i + Math.floor(Math.random() * (maxRoomLength - minRoomLength + 1)) + minRoomLength -1
      let j = Math.floor(Math.random() * (this.state.tilesHor - maxRoomLength))
      let j2 = j + Math.floor(Math.random() * (maxRoomLength - minRoomLength + 1)) + minRoomLength -1
      if (rooms == 0) {
        map = this.fill(map, i, i2, j, j2)
        rooms++
      }
      else if ((map[i][j] == 'w' || map[i][j2] == 'w' || map[i2][j] == 'w' || map[i2][j2] == 'w') && this.spaceCheck(map, i, i2, j, j2)) {
        map = this.fill(map, i, i2, j, j2)
        rooms++
      }
    }
    map = this.removeWalls(map)
    map = this.itemMaker(map, dungeon)
    this.windowView(map)
  }
  fill(map, i, i2, j, j2) {
    for (let k = i; k <= i2; k++) {
      for (let l = j; l <= j2; l++) {
        if (k == i || k == i2 || l == j || l == j2) {
          map[k][l] = 'w'
        }
        else {
          map[k][l] = 'f'
        }
      }
    }
    return map
  }
  spaceCheck(map, i, i2, j, j2) {
    var emptySpaceCount = 0
    var areaCount = 0
    for (let k = i; k <= i2; k++) {
      for (let l = j; l <= j2; l++) {
        areaCount++
        if (map[k][l] == 's') {
          emptySpaceCount++
        }
      }
    }
    if (emptySpaceCount / areaCount > 0.95) {
      return true
    }
    else {
      return false
    }
  }
  removeWalls(map) {
    for (let i = 0; i < this.state.tilesVer; i++) {
      for (let j = 0; j < this.state.tilesHor; j++) {
        if (map[i][j] == 'w') {
          map[i][j] = 'f'
        }
      }
    }
    return map
  }
  itemMaker(map, dungeon) {
    if (!dungeon) dungeon = this.state.dungeon * 1
    var items = []
    items.push('player')
    for (let i = 1; i <= 10; i++) {
      var enemy = new Enemy(i, dungeon)
      var healthPack = new HealthPack(i, dungeon)
      items.push(enemy, healthPack)
    }
    var weapon = ''
    var weaponPower = 0
    switch (dungeon) {
      case 1:
        weapon = 'stick'
        weaponPower = 10
        break
      case 2:
        weapon = 'knife'
        weaponPower = 14
        break
      case 3:
        weapon = 'mace'
        weaponPower = 19
        break
      case 4:
        weapon = 'broad sword'
        weaponPower = 25
        break
    }
    items.push(new Weapon(weapon, weaponPower))
    if (dungeon != this.state.finalDungeon) {
      items.push(new Hole())
    }
    else {
      items.push(new Boss(dungeon))
    }
    var item
    for (let i = 0; i < items.length; i++) {
      item = items[i]
      map = this.spawner(map, item)
    }
    return map
  }
  spawner(map, item) {
    var xCoord = Math.floor(Math.random() * this.state.tilesHor)
    var yCoord = Math.floor(Math.random() * this.state.tilesVer)
    while (!map[yCoord - 1] || !map[yCoord + 1] || !map[yCoord][xCoord - 1] || !map[yCoord][xCoord + 1] || map[yCoord][xCoord] != 'f' || map[yCoord - 1][xCoord - 1] != 'f' || map[yCoord - 1][xCoord ] != 'f' || map[yCoord - 1][xCoord + 1] != 'f' || map[yCoord][xCoord - 1] != 'f' || map[yCoord][xCoord + 1] != 'f' || map[yCoord + 1][xCoord - 1] != 'f' || map[yCoord + 1][xCoord] != 'f' || map[yCoord + 1][xCoord + 1] != 'f') {
      xCoord = Math.floor(Math.random() * this.state.tilesHor)
      yCoord = Math.floor(Math.random() * this.state.tilesVer)
    }
    map[yCoord][xCoord] = item
    return map
  }
  windowView(map, headerAndFooterHeight) {
    var playerLocation = this.getCoords(map, 'player')
    var windowUpperY = playerLocation[0] - Math.floor(0.5 * this.displayHeight(headerAndFooterHeight) / this.state.tileSize)
    var windowLowerY = windowUpperY + Math.min(this.state.tilesVer - 1, Math.floor(this.displayHeight(headerAndFooterHeight) / this.state.tileSize) - 1)
    if (windowUpperY < 0) {
      windowUpperY = 0
      windowLowerY = windowUpperY + Math.min(this.state.tilesVer - 1, Math.floor(this.displayHeight(headerAndFooterHeight) / this.state.tileSize) - 1)
    }
    if (windowLowerY > this.state.tilesVer - 1) {
      windowLowerY = this.state.tilesVer - 1
      windowUpperY = windowLowerY - Math.min(this.state.tilesVer - 1, Math.floor(this.displayHeight(headerAndFooterHeight) / this.state.tileSize) - 1)
    }
    var windowLeftX = playerLocation[1] - Math.floor(0.5 * window.innerWidth / this.state.tileSize)
    var windowRightX = windowLeftX + Math.min(this.state.tilesHor - 1, Math.floor(window.innerWidth / this.state.tileSize) - 1)
    if (windowLeftX < 0) {
      windowLeftX = 0
      windowRightX = windowLeftX + Math.min(this.state.tilesHor - 1, Math.floor(window.innerWidth / this.state.tileSize) - 1)
    }
    if (windowRightX > this.state.tilesHor - 1) {
      windowRightX = this.state.tilesHor - 1
      windowLeftX = windowRightX - Math.min(this.state.tilesHor - 1, Math.floor(window.innerWidth / this.state.tileSize) - 1)
    }
    var windowView = []
    for (let i = windowUpperY; i <= windowLowerY; i++) {
      var arr = []
      for (let j = windowLeftX; j <= windowRightX; j++) {
        arr.push(map[i][j])
        if (j == windowRightX) {
          windowView.push(arr)
        }
      }
    }
    var scopeViewPlayerLocation = this.getCoords(windowView, 'player')
    var iScopeViewRange = []
    var jScopeViewRange = []
    for (let i = scopeViewPlayerLocation[0] - this.state.viewRadius; i <= scopeViewPlayerLocation[0] + this.state.viewRadius; i++) {
      iScopeViewRange.push(i)
    }
    for (let j = scopeViewPlayerLocation[1] - this.state.viewRadius; j <= scopeViewPlayerLocation[1] + this.state.viewRadius; j++) {
      jScopeViewRange.push(j)
    }
    var scopeViewRange = []
    for (let k = 0; k < iScopeViewRange.length; k++) {
      for (let l = 0; l < jScopeViewRange.length; l++) {
        var arr = []
        if (!((k == 0 && l == 0) || (k == 0 && l == 1) || (k == 0 && l == 2 || (k == 0 && l == jScopeViewRange.length - 1) || (k == 0 && l == jScopeViewRange.length - 2) || (k == 0 && l == jScopeViewRange.length - 3) || (k == 1 && l == 0) || (k == 1 && l == 1) || (k == 1 && l == jScopeViewRange.length - 1) || (k == 1 && l == jScopeViewRange.length - 2) || (k == 2 && l == 0) || (k == 2 && l == jScopeViewRange.length - 1) || (k == iScopeViewRange.length - 3 && l == 0) || (k == iScopeViewRange.length - 3 && l == jScopeViewRange.length - 1) || (k == iScopeViewRange.length - 2 && l == 0) || (k == iScopeViewRange.length - 2 && l == 1) || (k == iScopeViewRange.length - 2 && l == jScopeViewRange.length - 1) || (k == iScopeViewRange.length - 2 && l == jScopeViewRange.length - 2) || (k == iScopeViewRange.length - 1 && l == 0) || (k == iScopeViewRange.length - 1 && l == 1) || (k == iScopeViewRange.length - 1 && l == 2) || (k == iScopeViewRange.length - 1 && l == jScopeViewRange.length - 1) || (k == iScopeViewRange.length - 1 && l == jScopeViewRange.length - 2) || (k == iScopeViewRange.length - 1 && l == jScopeViewRange.length - 3)))) {
          arr.push(iScopeViewRange[k], jScopeViewRange[l])
        scopeViewRange.push(arr)
        }
      }
    }
    this.setState({
      map: map,
      windowView: windowView,
      playerLocation: playerLocation,
      iScopeViewRange: iScopeViewRange,
      jScopeViewRange: jScopeViewRange,
      scopeViewRange: scopeViewRange
    })
  }
  getCoords(map, searchObject) {
    var coords = []
    for (let i = 0; i < this.state.tilesVer; i++) {
      for (let j = 0; j < this.state.tilesHor; j++) {
        if (map[i][j] == searchObject) {
          coords.push(i, j)
          return coords
        }
        if (typeof map[i][j] === 'object') {
          if (map[i][j].getName() == searchObject) {
            coords.push(i, j)
            return coords
          }
        }
      }
    }
  }
  displayHeight(headerAndFooterHeight) {
    if (!headerAndFooterHeight) headerAndFooterHeight = this.state.headerAndFooterHeight
    if (window.innerHeight - headerAndFooterHeight < 200) {
      return 200
    }
    else {
      return window.innerHeight - headerAndFooterHeight - this.state.navbarHeight
    }
  }
  handleClick1() {
    var scopeView = this.state.scopeView
    this.setState({
      scopeView: !scopeView
    })
  }
  handleClick2() {
    this.reset()
  }
  handleKeyDown(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'ArrowUp') e.preventDefault() // prevents arrow keys scrolling page if scrollbar present
    if (wKeyDown == false && sKeyDown == false && aKeyDown == false && dKeyDown == false && (e.key == 'ArrowUp' || e.key == 'ArrowDown' || e.key == 'ArrowLeft' || e.key == 'ArrowRight')) {
      timer = setInterval(this.animateWalk, walkingSpeed)
    }
    if (wKeyDown == false && e.key == 'ArrowUp') {
      wKeyDown = true
      if (!sKeyDown && !aKeyDown && !dKeyDown) {
        this.animateWalk()
      }
    }
    if (sKeyDown == false && e.key == 'ArrowDown') {
      sKeyDown = true
      if (!wKeyDown && !aKeyDown && !dKeyDown) {
        this.animateWalk()
      }
    }
    if (aKeyDown == false && e.key == 'ArrowLeft') {
      aKeyDown = true
      if (!sKeyDown && !wKeyDown && !dKeyDown) {
        this.animateWalk()
      }
    }
    if (dKeyDown == false && e.key == 'ArrowRight') {
      dKeyDown = true
      if (!sKeyDown && !aKeyDown && !wKeyDown) {
        this.animateWalk()
      }
    }
  }
  animateWalk() {
    var i = 0
    var j = 0
    if (wKeyDown == true) {
      i--
    }
    if (sKeyDown == true) {
      i++
    }
    if (aKeyDown == true) {
      j--
    }
    if (dKeyDown == true) {
      j++
    }
    // var mapCopy = JSON.parse(JSON.stringify(this.state.map))//doesn't copy objects within array, instead strips them and leaves them empty
    // var mapCopy = jQuery.extend(true, {}, this.state.map)//deep copy of array using jQuery works but performance is sluggish
    var mapCopy = this.state.map//works but is not a copy
    if (this.state.map[this.state.playerLocation[0] + i][this.state.playerLocation[1] + j] == 'f') {
      var playerLocation = []
      playerLocation.push(this.state.playerLocation[0] + i, this.state.playerLocation[1] + j)
      mapCopy[this.state.playerLocation[0]][this.state.playerLocation[1]] = 'f'
      mapCopy[playerLocation[0]][playerLocation[1]] = 'player'
      this.windowView(mapCopy)
    }
    else if (typeof this.state.map[this.state.playerLocation[0] + i][this.state.playerLocation[1] + j] === 'object') {
      this.interact(i, j, mapCopy)
    }
  }
  interact(i, j, mapCopy) {
    var entity = this.state.map[this.state.playerLocation[0] + i][this.state.playerLocation[1] + j]
    if (entity.getType() == 'enemy' || entity.getType() == 'boss') {
      var attackVariance = Math.round(this.state.attack / 7)
      var attack = Math.floor(Math.random() * ((this.state.attack + attackVariance) - (this.state.attack - attackVariance) + 1)) + (this.state.attack - attackVariance)
      $('#damageReport').css('display', 'inline').fadeOut(2000)
      this.setState({
        enemyDamage: attack,
        currentEntity: entity.getType()
      })
      entity.setHealth(attack)
      if (entity.getHealth() <= 0) {
        mapCopy[this.state.playerLocation[0] + i][this.state.playerLocation[1] + j] = 'f'
        var nextLevel = this.state.nextLevel * 1
        nextLevel -= entity.getXP()
        if (nextLevel > 0) {
          this.setState({
            nextLevel: nextLevel
          })
        }
        else {
          var playerLevel = this.state.level + 1
          nextLevel = playerLevel * 60 + nextLevel
          var weaponPower = this.state.weaponPower * 1
          this.setState({
            level: playerLevel,
            nextLevel: nextLevel,
            attack: playerLevel * weaponPower
          })
        }
        if (entity.getType() == 'boss') {
          this.windowView(mapCopy)
          alert('You beat the boss and won the game!')
          this.reset()
        }
      }
      else {
        var playerHealth = this.state.health * 1
        playerHealth -= entity.getAttack()
        if (playerHealth < 0) {
          playerHealth = 0
        }
        this.setState({
          health: playerHealth
        })
        if (playerHealth == 0) {
          alert('You died!')
          this.reset()
        }
      }
    }
    else if (entity.getType() == 'weapon') {
      var newWeaponName = entity.getName()
      var newWeaponPower = entity.getWeaponPower()
      var playerLevel = this.state.level * 1
      this.setState({
        weapon: newWeaponName,
        weaponPower: newWeaponPower,
        attack: playerLevel * newWeaponPower
      })
      mapCopy[this.state.playerLocation[0]][this.state.playerLocation[1]] = 'f'
      mapCopy[this.state.playerLocation[0] + i][this.state.playerLocation[1] + j] = 'player'
    }
    else if (entity.getType() == 'health pack') {
      var health = this.state.health * 1
      health += entity.getHealthValue()
      if (health > 100) {
        health = 100
      }
      this.setState({
        health: health
      })
      mapCopy[this.state.playerLocation[0]][this.state.playerLocation[1]] = 'f'
      mapCopy[this.state.playerLocation[0] + i][this.state.playerLocation[1] + j] = 'player'
    }
    else if (entity.getType() == 'hole') {
      var dungeon = this.state.dungeon + 1
      this.setState({
        dungeon: dungeon
      })
      wKeyDown = false
      sKeyDown = false
      aKeyDown = false
      dKeyDown = false
      clearInterval(timer)
      this.generateGrid()
    }
    if (entity.getType() != 'hole' && entity.getType() != 'boss' && playerHealth != 0) {
      this.windowView(mapCopy)
    }
  }
  reset() {
    wKeyDown = false
    sKeyDown = false
    aKeyDown = false
    dKeyDown = false
    clearInterval(timer)
	var dungeon = 1
    this.setState({
      health: 100,
      weapon: 'bare hands',
      weaponPower: 7,
      attack: 7,
      level: 1,
      nextLevel: 60,
      dungeon: dungeon
    })
    this.generateGrid(dungeon)
  }
  handleKeyUp(e) {
    switch (e.key) {
      case 'ArrowUp':
        wKeyDown = false
        break
      case 'ArrowDown':
        sKeyDown = false
        break
      case 'ArrowLeft':
        aKeyDown = false
        break
      case 'ArrowRight':
        dKeyDown = false
        break
    }
    if (wKeyDown == false && sKeyDown == false && aKeyDown == false && dKeyDown == false) {
      clearInterval(timer)
    }
  }
  handleResize() {
    this.windowView(this.state.map, this.state.headerAndFooterHeight)
  }
  render() {
    return (
      <div id="dungeoncrawler">
        <DisplayHeader state={this.state} onClick1={this.handleClick1} onClick2={this.handleClick2} />
        <DisplayGrid state={this.state} />
        <DisplayFooter state={this.state} />
      </div>
    )
  }
}
var DisplayHeader = function(props) {
  return (
    <div id='height 1'>
      <h1>Roguelike Dungeon Crawler</h1>
      <div>Mission: Kill the boss in Dungeon {props.state.finalDungeon}!</div>
      <span>Health: {props.state.health}%</span>
      <span>Weapon: {props.state.weapon}</span>
      <span>Attack: {props.state.attack}</span>
      <span>Player Level: {props.state.level}</span>
      <span>Next Level: {props.state.nextLevel} XP</span>
      <span>Dungeon: {props.state.dungeon}</span>
      <button id='toggleScopeViewButton' onClick={props.onClick1}>Toggle scope view</button>
      <button id='restart' onClick={props.onClick2}>Restart</button>
      <div>
        <span style={{color: nonDisplayColor}}> * </span>
        <span id='damageReport' style={{display: 'none'}}>{props.state.currentEntity} health - {props.state.enemyDamage}</span>
        <span style={{color: nonDisplayColor}}> * </span>
      </div>
    </div>
  )
}
var DisplayGrid = function(props) {
  var rows = props.state.windowView.map(function(row, rowNumber) {
    return <DisplayRow key={'DisplayGrid_' + rowNumber} state={props.state} row={row} rowNumber={rowNumber} />
  })
  return (
    <div>
      {rows}
    </div>
  )
}
var DisplayRow = function(props) {
  var tiles = props.row.map(function(tile, columnNumber) {
    return <DisplayTile key={'DisplayRow_' + props.rowNumber + '_' + columnNumber} state={props.state} tile={tile} rowNumber={props.rowNumber} columnNumber={columnNumber} />
  })
  var style = {
    width: props.state.windowView[0].length * props.state.tileSize,
    margin: 'auto'
  }
  return (
    <div className='row' style={style}>{/* row is a Bootstrap class */}
      {tiles}
    </div>
  )
}
var DisplayTile = function(props) {
  var color = ''
  var display = false
  if (props.state.scopeView) {
    for (let i = 0; i < props.state.scopeViewRange.length; i++) {
      if (props.state.scopeViewRange[i][0] == props.rowNumber && props.state.scopeViewRange[i][1] == props.columnNumber) {
        display = true
        break
      }
    }
  }
  if (!display && props.state.scopeView) {
    color = nonDisplayColor
  }
  else {
    switch (props.tile) {
      case 's':
        color = spaceColor
        break
      case 'f':
        color = floorColor
        break
      case 'player':
        color = playerColor
        break
      default:
        color = defaultColor
    }
    if (typeof props.tile === 'object') {
      switch (props.tile.getType()) {
        case 'enemy':
          color = enemyColor
          break
        case 'health pack':
          color = healthPackColor
          break
        case 'weapon':
          color = weaponColor
          break
        case 'hole':
          color = holeColor
          break
        case 'boss':
          color = bossColor
          break
        default:
          color = defaultColor
      }
    }
  }
  var style = {
    display: 'inline-block',
    width: props.state.tileSize,
    height: props.state.tileSize,
    background: color,
    color: color,
    // border: '1px solid black'
  }
  return (
    <div style={style}>
      
    </div>
  )
}
var DisplayFooter = function(props) {
  var controlsStyle = function() {
    return ({
      display: 'inline',
      margin: '0px 5px -1px 15px'
    })
  }
  var legendStyle = function(color) {
    return ({
      display: 'inline-block',
      width: props.state.tileSize,
      height: props.state.tileSize,
      background: color,
      color: color,
      margin: '0px 5px -1px 15px'
    })
  }
  return (
    <div id='height 2'>
      <div>Controls: 
        {/* <div style={controlsStyle()}><i className='fa fa-arrow-up'></i> = up arrow</div>
        <div style={controlsStyle()}><i className='fa fa-arrow-down'></i> = down arrow</div>
        <div style={controlsStyle()}><i className='fa fa-arrow-left'></i> = left arrow</div>
        <div style={controlsStyle()}><i className='fa fa-arrow-right'></i> = right arrow</div> */}
        <div style={controlsStyle()}><FontAwesomeIcon icon="arrow-up" /> = up arrow</div>
        <div style={controlsStyle()}><FontAwesomeIcon icon="arrow-down" /> = down arrow</div>
        <div style={controlsStyle()}><FontAwesomeIcon icon="arrow-left" /> = left arrow</div>
        <div style={controlsStyle()}><FontAwesomeIcon icon="arrow-right" /> = right arrow</div>
                    
      </div>
      <div>Legend: 
        <div style={legendStyle(playerColor)}></div>
        <div style={{display: 'inline'}}>= player</div>
        <div style={legendStyle(enemyColor)}></div>
        <div style={{display: 'inline'}}>= enemy</div>
        <div style={legendStyle(healthPackColor)}></div>
        <div style={{display: 'inline'}}>= health pack (+ {new HealthPack(null, props.state.dungeon).getHealthValue()}%)</div>
        <div style={legendStyle(weaponColor)}></div>
        <div style={{display: 'inline'}}>= weapon</div>
        <div style={legendStyle(holeColor)}></div>
        <div style={{display: 'inline'}}>= hole (to next dungeon)</div>
        <div style={legendStyle(bossColor)}></div>
        <div style={{display: 'inline'}}>= boss (be careful!)</div>
      </div>
    </div>
  )
}

// ReactDOM.render(<Engine />, document.getElementById('output'))
export default Engine;
