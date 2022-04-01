console.log('-------------------Practice Start-----------------------');
interface AddFn {
    (a: number, b: number): number;
}

interface Named {
    readonly name?: string;
    outputName?: string;
}

class random {
    check: boolean = true;
    ss: any;

    constructor(public names: string) {
        // this.ss = names
    }
}

const hi = (yo: any) => {
    console.log("yo", yo);
};

hi("Toushif");
const cl = new random("Boris");
console.log("clllllll", cl);

// class ITDep extends random {

// }

// const val = new ITDep('Toushif');
// console.log(val.names);
// let check = null;
// const store = check ?? 'Hi';
console.log('-------------------Practice End-----------------------');