console.log('-------------------Practice Start-----------------------');
interface AddFn {
    (a: number, b: number): number;
}

interface Named {
    readonly name?: string;
    outputName?: string;
}

interface random {
    check: boolean;
    readonly name: string;
    func: (a: string) => void;
}

class random implements random {
    check: boolean = true;
    so: string;

    constructor(public names: string) {
        this.so = names;
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