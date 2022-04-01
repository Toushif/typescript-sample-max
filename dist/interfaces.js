"use strict";
console.log('-------------------Interface Start-----------------------');
var add;
add = function (n1, n2) {
    return n1 + n2;
};
var PersonClass = /** @class */ (function () {
    function PersonClass(n) {
        this.age = 30;
        if (n) {
            this.name = n;
        }
    }
    PersonClass.prototype.greet = function (phrase) {
        if (this.name) {
            console.log(phrase + " " + this.name);
        }
        else {
            console.log("Hi!");
        }
    };
    return PersonClass;
}());
var user1;
user1 = new PersonClass();
// user1.name = 'Manu';
user1.greet("Hi there - I am");
console.log(user1.greet('Toushif'));
console.log('-------------------Interface End-----------------------');
//# sourceMappingURL=interfaces.js.map