// TOPIC
// Variable Scope with 'let' or 'const' keywords
// let and const are block scoped (limited to block scope)

// CONSIDERATIONS
// hoisting behavior of let and const
// temporal dead zone (TDZ) with let and const 
// debugging issues with let/const-declared variables as our program scales

// QUIZ
// 1) Will this code run?
// 2) Do you spot any potential temporal dead zone (TDZ) issues?
// 3) If the code runs, what will be logged for each numbered log statement?

if(!x){
    x = 5;
    console.log('1)', x);
}

let x,y = 2;

function test(){
    let y = 1;
    if(x){
        y++;
    }
}
console.log('2)', y);
