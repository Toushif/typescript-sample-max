interface AddFn {
    (a: number, b: number): number;
}

interface Named {
    readonly name?: string;
    outputName?: string;
}

class random {
    check: boolean = true;

    constructor(public names: string) {

    }
}

// class ITDep extends random {
    
// }

// const val = new ITDep('Toushif');
// console.log(val.names); 
// let check = null;
// const store = check ?? 'Hi';