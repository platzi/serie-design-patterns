"use strict";
/**
 * Ideas detras de codigo
 *
 * 1. Composición sobre herencia
 */
exports.__esModule = true;
exports.CommonDuck = exports.BionicDuck = void 0;
var BionicDuck = /** @class */ (function () {
    function BionicDuck() {
    }
    BionicDuck.prototype.quack = function () {
        console.log("Bionic");
    };
    return BionicDuck;
}());
exports.BionicDuck = BionicDuck;
var CommonDuck = /** @class */ (function () {
    function CommonDuck() {
    }
    CommonDuck.prototype.quack = function () {
        console.log("Common");
    };
    return CommonDuck;
}());
exports.CommonDuck = CommonDuck;
// export interface DuckProduct {
//   quack: () => void;
// }
// export class BionicDuckProduct implements DuckProduct {
//   quack() {
//     console.log("I'm a Bionic Duck");
//   }
// }
// export class CommonDuckProduct implements DuckProduct {
//   quack() {
//     console.log("I'm a common Duck");
//   }
// }
