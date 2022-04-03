"use strict";
console.log('-------------------Interface Start-----------------------');
let add;
add = (n1, n2) => {
    return n1 + n2;
};
class PersonClass {
    constructor(n) {
        this.age = 30;
        if (n) {
            this.name = n;
        }
    }
    greet(phrase) {
        if (this.name) {
            console.log(phrase + " " + this.name);
        }
        else {
            console.log("Hi!");
        }
    }
}
let user1;
user1 = new PersonClass();
let user2 = new PersonClass('Toushif');
// user1.name = 'Manu';
user1.greet("Hi there - I am");
user2.greet('Hi');
console.log('-------------------Interface End-----------------------');
//# sourceMappingURL=interfaces.js.map