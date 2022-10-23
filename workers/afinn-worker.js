importScripts("../lexicons/afinn165.min.js");
importScripts("../util/lemmas_en.js");

const regex = /[!"#$%&'()*+,./:;<=>?@[\]^_`{|}~]/g;

const removePunctuation = (string) => {
  return string.replace(regex, "").toLowerCase();
};

const loadRawText = (text) => {
  const str = removePunctuation(text);
  const arr = str.split(" ");

  return arr;
};

let buildFreq = (repliesText) => {
  if (repliesText === undefined) return 0;
  let words = loadRawText(repliesText);
  let totalScore = 0;
  for (let word of words) {
    if (word in lemma) word = lemma[word];
    if (word in afinn165) {
        totalScore += afinn165[word];
    }
  }
  return totalScore;
};

onmessage = function (e) {
  const intensity = buildFreq(e.data);
  postMessage(intensity);
};
