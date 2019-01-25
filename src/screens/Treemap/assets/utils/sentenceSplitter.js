import { arrayOfStringsLength } from './arrayOfStringsLength';

function sentenceSplitter(str, width, fontSize) {
    str = str.replace(/\//g, ' + ')
    const splitSentence = str.split(' ');
    const optimizedSplitSentence = [];
    const lineLength = Math.floor(width / (fontSize * 0.57));
    let currentPhrase = [];
    for (let i = 0; i < splitSentence.length; i ++) {
        if (arrayOfStringsLength(currentPhrase.concat(splitSentence[i])) < lineLength) {
            currentPhrase.push(splitSentence[i]);
        }
        else {
            if (currentPhrase.length) optimizedSplitSentence.push(currentPhrase.join(' '));
            currentPhrase = [splitSentence[i]];
        }
        if (i === splitSentence.length - 1) {
            optimizedSplitSentence.push(currentPhrase.join(' '));
        }
    }
    return optimizedSplitSentence;
}

export { sentenceSplitter };
