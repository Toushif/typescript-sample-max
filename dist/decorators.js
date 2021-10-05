"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(logString) {
    console.log('LOGGER FACTORY', arguments);
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    console.log('TEMPLATE FACTORY');
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                console.log('Rendering template');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
// @Logger('LOGGING - PERSON')
let Person = class Person {
    constructor() {
        this.name = 'Max';
        console.log('Creating person object...');
    }
};
Person = __decorate([
    Logger('LOGGING') //So Logger is a decorator which is basically a function which takes a constructor function as an argument. A decorator is executed when a class is defined, not instantiated. So a decorator always executes first. SO a decorator runs when JS finds a class(a constructor function - coz class is just a syntactic sugar right) associated with that decorator and it passes that class to that decorator and it executes. 
    //Here above Logger('LOGGIN') is actually a factory decorator which returns a decorator function when called. So we are passing the argument 'LOGGING' and execute the outer Logger function which in turns returns an anonymous function. This anonymous function does the main job where the class or constructor function is passed as explained above. 
    ,
    WithTemplate('<h1>My Person Object</h1>', 'app') //This is also aother decorator. SO if there are multple decorators then it is executed bottom up by javascript, i.e, first the WithTemplate decorator is executed and then the Logger is executed. But creation of decorator wise first Logger decorator is created and then WithTemplate decorator coz of synchronous behaviour of JS of parsing line by line. 
], Person);
const pers = new Person();
console.log(pers);
// ---
function Log(target, propertyName) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Invalid price - should be positive!');
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log //Here Log is a property decorator where it is called when a class is defined not instantiated. When Log is called - it is called with 2 arguments - first - either it's the prototype of the instance where the property is defined (for non-static normal class property), OR, the costructor function if the property is a static property; second - the name value of the property itself which could be a string or a Symbol.
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3 //Here Log3 is a method decorator where it is called when a class is defined not instantiated. When Log3 is called - it is called with 3 arguments - first - either it's the prototype of the instance where the method is defined (for non-static normal class method), OR, the costructor function if the method is a static method; second - the name value of the method itself which could be a string, Symbol or a number; and third - PropertyDescriptor or PropertySccessor. 
    ,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);
function Autobind(_, _2, descriptor) {
    /* console.log('Method decorator!-----------');
    console.log(target);
    console.log(name);
    console.log(descriptor);
    console.log('-------------'); */
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = 'This works!';
    }
    // @Autobind
    showMessage() {
        console.log('show message..', this.message);
    }
}
const p = new Printer();
// p.showMessage();
console.log('show 1', p);
console.log('show 2', p.constructor); // this is same as show 4 and show 6
console.log('show 3', p.constructor.prototype); // same as show 5
console.log('show 4', Printer); // constructor function - same as show 2
console.log('show 5', Printer.prototype);
console.log('show 6', Printer.prototype.constructor); // this is same as show 4 above only - constructor function
console.log('show 7', Printer.prototype.constructor.prototype); //this again is same as show 5 and show 3 above
//   console.log('show 8', Printer.prototype.showMessage.__proto__.__proto__); 
const button = document.querySelector('button');
button.addEventListener('click', p.showMessage);
const registeredValidators = {};
function Required(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['required'] });
}
function PositiveNumber(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['positive'] });
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('Invalid input, please try again!');
        return;
    }
    console.log(createdCourse);
});
//# sourceMappingURL=decorators.js.map