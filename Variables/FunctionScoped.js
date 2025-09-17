// TOPIC
// Variable Scope with 'var' keyword
// var is function scoped (limited to function scope)

// CONSIDERATIONS
// when we declare a variable with var in a partial view
// when we declare a variable with var in a shared view component
// debugging issues with var-declared varibles as our program scales

// QUIZ
// 1) Will this code run?
// 2) If the code runs, what will be logged for each numbered log statement?

if (!x){
    x = 5;
    console.log('1)', x);
}

console.log('2)', x); 
var x,y = 2;

function overlapingScope(){
    var y = 1;
    if(x){
        y++;
    }
}

console.log('3)', y);