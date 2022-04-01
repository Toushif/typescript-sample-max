"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    console.log("LOGGER FACTORY", arguments);
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    console.log("TEMPLATE FACTORY");
    return function (originalConstructor) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _ = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _[_i] = arguments[_i];
                }
                var _this = _super.call(this) || this;
                console.log("Rendering template");
                var hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").textContent = _this.name;
                }
                return _this;
            }
            return class_1;
        }(originalConstructor));
    };
}
// @Logger('LOGGING - PERSON')
var Person = /** @class */ (function () {
    function Person() {
        this.name = "Max";
        console.log("Creating person object...");
    }
    Person = __decorate([
        Logger("LOGGING") //So Logger is a decorator which is basically a function which takes a constructor function as an argument. A decorator is executed when a class is defined, not instantiated. So a decorator always executes first. SO a decorator runs when JS finds a class(a constructor function - coz class is just a syntactic sugar right) associated with that decorator and it passes that class to that decorator and it executes.
        //Here above Logger('LOGGIN') is actually a factory decorator which returns a decorator function when called. So we are passing the argument 'LOGGING' and execute the outer Logger function which in turns returns an anonymous function. This anonymous function does the main job where the class or constructor function is passed as explained above.
        ,
        WithTemplate("<h1>My Person Object</h1>", "app") //This is also aother decorator. SO if there are multple decorators then it is executed bottom up by javascript, i.e, first the WithTemplate decorator is executed and then the Logger is executed. But creation of decorator wise first Logger decorator is created and then WithTemplate decorator coz of synchronous behaviour of JS of parsing line by line.
    ], Person);
    return Person;
}());
var pers = new Person();
console.log(pers);
// ---
function Log(target, propertyName) {
    console.log("Property decorator!");
    console.log(target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log("Accessor decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log("Method decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log("Parameter decorator!");
    console.log(target);
    console.log(name);
    console.log(position);
}
var Product = /** @class */ (function () {
    function Product(t, p) {
        this.title = t;
        this._price = p;
    }
    Object.defineProperty(Product.prototype, "price", {
        set: function (val) {
            if (val > 0) {
                this._price = val;
            }
            else {
                throw new Error("Invalid price - should be positive!");
            }
        },
        enumerable: false,
        configurable: true
    });
    Product.prototype.getPriceWithTax = function (tax) {
        return this._price * (1 + tax);
    };
    __decorate([
        Log //Here Log is a property decorator where it is called when a class is defined not instantiated. When Log is called - it is called with 2 arguments - first - either it's the prototype of the instance where the property is defined (for non-static normal class property), OR, the costructor function if the property is a static property; second - the name value of the property itself which could be a string or a Symbol.
    ], Product.prototype, "title", void 0);
    __decorate([
        Log2
    ], Product.prototype, "price", null);
    __decorate([
        Log3 //Here Log3 is a method decorator where it is called when a class is defined not instantiated. When Log3 is called - it is called with 3 arguments - first - either it's the prototype of the instance where the method is defined (for non-static normal class method), OR, the costructor function if the method is a static method; second - the name value of the method itself which could be a string, Symbol or a number; and third - PropertyDescriptor or PropertySuccessor.
        ,
        __param(0, Log4)
    ], Product.prototype, "getPriceWithTax", null);
    return Product;
}());
var p1 = new Product("Book", 19);
var p2 = new Product("Book 2", 29);
function Autobind(_, _2, descriptor) {
    //Here 1st and 2nd args are required, but we do not use it in our autobind decorator, so we denoted those arguments as _ and _2 which will tell TS that it will not be used, so the warning will be gone. (We can also write _Toushif - anything after an underscore)
    /* console.log('Method decorator!-----------');
    console.log(target);
    console.log(name);
    console.log(descriptor);
    console.log('-------------'); */
    var originalMethod = descriptor.value;
    var adjDescriptor = {
        configurable: true,
        enumerable: false,
        get: function () {
            var boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
var Printer = /** @class */ (function () {
    function Printer() {
        this.message = "This works!";
    }
    // @Autobind
    Printer.prototype.showMessage = function () {
        console.log("show message..", this.message);
    };
    return Printer;
}());
var p = new Printer();
// p.showMessage();
console.log("show 1", p);
console.log("show 2", p.constructor); // this is same as show 4 and show 6
console.log("show 3", p.constructor.prototype); // same as show 5
console.log("show 4", Printer); // constructor function - same as show 2
console.log("show 5", Printer.prototype);
console.log("show 6", Printer.prototype.constructor); // this is same as show 4 above only - constructor function
console.log("show 7", Printer.prototype.constructor.prototype); //this again is same as show 5 and show 3 above
//   console.log('show 8', Printer.prototype.showMessage.__proto__.__proto__);
var button = document.querySelector("button");
button.addEventListener("click", p.showMessage);
var registeredValidators = {};
function Required(target, propName) {
    var _a;
    registeredValidators[target.constructor.name] = __assign(__assign({}, registeredValidators[target.constructor.name]), (_a = {}, _a[propName] = ["required"], _a));
}
function PositiveNumber(target, propName) {
    var _a;
    registeredValidators[target.constructor.name] = __assign(__assign({}, registeredValidators[target.constructor.name]), (_a = {}, _a[propName] = ["positive"], _a));
}
function validate(obj) {
    var objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    var isValid = true;
    for (var prop in objValidatorConfig) {
        for (var _i = 0, _a = objValidatorConfig[prop]; _i < _a.length; _i++) {
            var validator = _a[_i];
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
var Course = /** @class */ (function () {
    function Course(t, p) {
        this.title = t;
        this.price = p;
    }
    __decorate([
        Required
    ], Course.prototype, "title", void 0);
    __decorate([
        PositiveNumber
    ], Course.prototype, "price", void 0);
    return Course;
}());
var courseForm = document.querySelector("form");
courseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var titleEl = document.getElementById("title");
    var priceEl = document.getElementById("price");
    var title = titleEl.value;
    var price = +priceEl.value;
    var createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert("Invalid input, please try again!");
        return;
    }
    console.log(createdCourse);
});
//# sourceMappingURL=decorators.js.map