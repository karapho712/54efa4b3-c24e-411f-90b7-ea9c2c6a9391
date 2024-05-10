function longestWord(string) {
    var str = string.split(" ");
    var longest = 0;
    var word = null;
    var count = 0;
    for (var i = 0; i < str.length; i++) {
        if (longest < str[i].length) {
            longest = str[i].length;
            word = str[i];
        }
    }
    count = word.length
    return `${word}: ${count} character` ;
}
console.log(longestWord('Saya sangat senang mengerjakan soal algoritma'))

