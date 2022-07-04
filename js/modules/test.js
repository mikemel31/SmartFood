var isValid = function(s) {
    if (s.length % 2 !== 0) {return console.log(false)}
    for (let i = 0; i < s.length-1; i++) {
        const test = s.slice(i, i+2)
        console.log(test)
        if (test.localeCompare('()') !== 0 || test !== '{}' || test !== '[]') {return console.log(false)} else {return console.log(true)}
    }
 };

 isValid('()');