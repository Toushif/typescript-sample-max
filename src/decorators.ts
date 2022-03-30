function Logger(logString: string) {
    console.log("LOGGER FACTORY", arguments);
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

function WithTemplate(template: string, hookId: string) {
    console.log("TEMPLATE FACTORY");
    return function <T extends { new (...args: any[]): { name: string } }>(
        originalConstructor: T
    ) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log("Rendering template");
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1")!.textContent = this.name;
                }
            }
        };
    };
}

// @Logger('LOGGING - PERSON')
@Logger("LOGGING") //So Logger is a decorator which is basically a function which takes a constructor function as an argument. A decorator is executed when a class is defined, not instantiated. So a decorator always executes first. SO a decorator runs when JS finds a class(a constructor function - coz class is just a syntactic sugar right) associated with that decorator and it passes that class to that decorator and it executes.
//Here above Logger('LOGGIN') is actually a factory decorator which returns a decorator function when called. So we are passing the argument 'LOGGING' and execute the outer Logger function which in turns returns an anonymous function. This anonymous function does the main job where the class or constructor function is passed as explained above.
@WithTemplate("<h1>My Person Object</h1>", "app") //This is also aother decorator. SO if there are multple decorators then it is executed bottom up by javascript, i.e, first the WithTemplate decorator is executed and then the Logger is executed. But creation of decorator wise first Logger decorator is created and then WithTemplate decorator coz of synchronous behaviour of JS of parsing line by line.
class Person {
    name = "Max";

    constructor() {
        console.log("Creating person object...");
    }
}

const pers = new Person();

console.log(pers);

// ---

function Log(target: any, propertyName: string | Symbol) {
    console.log("Property decorator!");
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Accessor decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(
    target: any,
    name: string | Symbol,
    descriptor: PropertyDescriptor
) {
    console.log("Method decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log("Parameter decorator!");
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @Log //Here Log is a property decorator where it is called when a class is defined not instantiated. When Log is called - it is called with 2 arguments - first - either it's the prototype of the instance where the property is defined (for non-static normal class property), OR, the costructor function if the property is a static property; second - the name value of the property itself which could be a string or a Symbol.
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error("Invalid price - should be positive!");
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3 //Here Log3 is a method decorator where it is called when a class is defined not instantiated. When Log3 is called - it is called with 3 arguments - first - either it's the prototype of the instance where the method is defined (for non-static normal class method), OR, the costructor function if the method is a static method; second - the name value of the method itself which could be a string, Symbol or a number; and third - PropertyDescriptor or PropertySuccessor.
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

const p1 = new Product("Book", 19);
const p2 = new Product("Book 2", 29);

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    //Here 1st and 2nd args are required, but we do not use it in our autobind decorator, so we denoted those arguments as _ and _2 which will tell TS that it will not be used, so the warning will be gone. (We can also write _Toushif - anything after an underscore)
    /* console.log('Method decorator!-----------');
    console.log(target);
    console.log(name);
    console.log(descriptor);
    console.log('-------------'); */

    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}

class Printer {
    message = "This works!";

    // @Autobind
    showMessage() {
        console.log("show message..", this.message);
    }
}

const p = new Printer();
// p.showMessage();
console.log("show 1", p);
console.log("show 2", p.constructor); // this is same as show 4 and show 6
console.log("show 3", p.constructor.prototype); // same as show 5
console.log("show 4", Printer); // constructor function - same as show 2
console.log("show 5", Printer.prototype);
console.log("show 6", Printer.prototype.constructor); // this is same as show 4 above only - constructor function
console.log("show 7", Printer.prototype.constructor.prototype); //this again is same as show 5 and show 3 above
//   console.log('show 8', Printer.prototype.showMessage.__proto__.__proto__);

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);

// ---

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]; // ['required', 'positive']
    };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ["required"],
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ["positive"],
    };
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case "required":
                    isValid = isValid && !!obj[prop];
                    break;
                case "positive":
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleEl = document.getElementById("title") as HTMLInputElement;
    const priceEl = document.getElementById("price") as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);

    if (!validate(createdCourse)) {
        alert("Invalid input, please try again!");
        return;
    }
    console.log(createdCourse);
});
