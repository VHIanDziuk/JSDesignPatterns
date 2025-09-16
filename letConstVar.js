/*
    Here, we will attempt to answer the most important questions:

    1) What is the difference between let, const, and var keywords in JavaScript?
    2) If you never use var again, will your code still work?
    3) TikTok has strong opinions about using let or const, should I listen to my favorite influencer?

*/

// 1) What is the difference between let, const, and var keywords in JavaScript?
// var is function-scoped, while let and const are block-scoped.
// var declarations are hoisted and initialized with undefined, while let and const declarations are hoisted but not initialized.
// const variables must be assigned a value at the time of declaration and cannot be reassigned, while let variables can be reassigned.

// Var Example:
// What is the output of this code?
function varTest(toggle) {
    if (toggle) {
        x = 2;
        console.log(x);
    }
    console.log(x);
}
varTest(true);

var x = 1;
varTest(false);
console.log(x);

// Let Example:
// What is the output of this code?
function letTest(toggle) {
    if (toggle) {
        let y = 2;
        console.log(y);
    }
    console.log(y);
}
letTest(true);
// if you uncomment the following lines, what will happen?
// letTest(false);
// console.log(y);