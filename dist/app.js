"use strict";
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ"] = 1] = "READ";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
;
const person = {
    hobbies: ['Books', 'Crypto', 54, [12, { aa: 'aa' }], false],
    roles: Role.ADMIN
};
let aa;
// const btn = document.querySelector('button')
console.log('Toushif');
//# sourceMappingURL=app.js.map