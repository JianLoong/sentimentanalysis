importScripts("../lexicons/afinn165.min.js")

let buildFreq = (repliesText) => {
    let result = [];

    if (repliesText === undefined)
        return 0;
    let convert = repliesText.replace(/[^\w\s]/gi, '').toLowerCase().split(" ");
    let totalScore = 0;
    for (let i = 0; i < convert.length; i++) {
        let currentWord = convert[i];
        totalScore += afinn165[currentWord] || 0;
        const score = {
            currentWord: afinn165[currentWord]
        }
        //result.push(score)
    }
    //console.log(totalScore);
    return totalScore;
}

onmessage = function (e) {
    const intensity = buildFreq(e.data);
    postMessage(intensity);
}
