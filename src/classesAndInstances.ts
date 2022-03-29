abstract class Department {
    //if a class is marked as abstrtact then you cannot instantiate that class anymore, because abstract class means that it is only a blueprint or a shell for other classes to extend this class and use its properties and methods. YOu can only instantiate the classes which extends the abstract class.
    static fiscalYear = 2020; // a static property is craeted so it can be used globally directly without instantiating the class again and again. Just Department.fiscalYear will return the value when accessed outside the class. So you cannot do this.fiscalYear inside the class coz fiscalYear is not a property of the intance of this class anymore.
    // private readonly id: string;
    // private name: string;
    fiscalYear: string = ""; //here there is no namespace collision, as this fiscalYear is a class property unlike staic property

    protected employees: string[] = [];

    constructor(protected readonly id: string, public name: string) {
        //just like const we can mark a class property as readonly which cannot be changed later anywhere.
        // this.id = id;
        // this.name = n;
        // console.log(Department.fiscalYear);
    }

    static createEmployee(name: string) {
        return { name: name };
    }

    abstract describe(this: Department): void; //here in describe method we have this of type Department as parameter because only classes that extends the Department class can only use it, no other object will be able to use this method anymore .

    addEmployee(employee: string) {
        // validation etc
        // this.id = 'd2';
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    admins: string[];
    constructor(id: string, admins: string[]) {
        super(id, "IT");
        this.admins = admins;
    }

    describe() {
        console.log("IT Department - ID: " + this.id);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No report found.");
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error("Please pass in a valid value!");
        }
        this.addReport(value);
    }

    private constructor(id: string, private reports: string[]) {
        //to create a singleton class always add private in front of constructor, that way outside the class you cannot create multiple instances of this class. You can only craete a single instance inside this class only as below getInstances()
        super(id, "Accounting");
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (AccountingDepartment.instance) {
            //here if AccountingDepartment.instance or this.instance is undefined (whcih it will be initially) then skip the if block and create a new instance below or else always return the same instance. THis is how singleton work - you create the class instance only once and then just use the same instance thereafter.
            return this.instance;
        }
        this.instance = new AccountingDepartment("d2", []);
        return this.instance;
    }

    describe() {
        console.log("Accounting Department - ID: " + this.id);
    }

    addEmployee(name: string) {
        if (name === "Max") {
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }
}

const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment("d1", ["Max"]);

it.addEmployee("Max");
it.addEmployee("Manu");

// it.employees[2] = 'Anna';

it.describe();
it.name = "NEW NAME";
it.printEmployeeInformation();

console.log(it);

// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting, accounting2);

accounting.mostRecentReport = "Year End Report";
accounting.addReport("Something went wrong...");
console.log(accounting.mostRecentReport);

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// accountingCopy.describe();
