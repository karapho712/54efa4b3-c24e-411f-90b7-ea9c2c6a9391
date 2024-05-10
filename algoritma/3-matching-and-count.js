function countQueryOccurrences(INPUT, QUERY) {
  let count = 0;
  let totalCount = 0;
  let storage = [];

  for (let i = 0; i < QUERY.length; i++) {
    for (let j = 0; j < INPUT.length; j++) {
      if (QUERY[i] === INPUT[j]) {
        count++;
        totalCount++;
      }
    }
    storage.push({ [QUERY[i]]: count})
    count = 0
  }

  return {count, totalCount, storage};
}

function generateSentence(data, query) {
    let sentence = "";

    const keys = data.map(obj => Object.keys(obj)[0]);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = data[i][key];

        const description = query.includes(key) ? `terdapat ${value} pada INPUT` : `tidak ada pada INPUT`;

        sentence += `kata '${key}' ${description}`;

        if (i < keys.length - 1) {
            sentence += ", ";
        }
    }

    return sentence;
}

INPUT = ['xc', 'dz', 'bbb', 'dz']  
QUERY = ['bbb', 'ac', 'dz']  

const occurrences = countQueryOccurrences(INPUT, QUERY);
const sentence = generateSentence(occurrences.storage, QUERY)
console.log(occurrences)
console.log(sentence)
