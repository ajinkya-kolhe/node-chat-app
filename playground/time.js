const moment = require('moment');

// var date = moment();
// date.add(100, 'years').subtract(9, 'months')
// console.log(date.format('MMM Do, YYYY'));



var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 12345678;
var date = moment(createdAt);
console.log(date.format('hh:mm a'));
