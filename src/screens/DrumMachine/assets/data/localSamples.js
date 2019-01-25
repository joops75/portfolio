const names = [['heater-1', 'heater-2', 'heater-3', 'heater-4', 'clap', 'open-hh', 'kick-n-hat', 'kick', 'closed-hh'],
               ['chord-1', 'chord-2', 'chord-3', 'shaker', 'open-hh', 'closed-hh', 'punchy-kick', 'side-stick', 'snare']]

var setOne = []
var setTwo = []

for (let i = 0; i < names.length; i ++) {
  for (let j = 0; j < names[i].length; j ++) {
    if (!i) setOne.push({ id: names[i][j], soundFile: require('./set 1/' + names[i][j] + '.mp3') })
    else setTwo.push({ id: names[i][j], soundFile: require('./set 2/' + names[i][j] + '.mp3') })
  }
}

export {setOne, setTwo}
