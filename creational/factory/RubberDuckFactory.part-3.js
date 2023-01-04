"use strict";
exports.__esModule = true;
var RubberDuckProducts_part_2_1 = require("./RubberDuckProducts.part-2");
// interface Factory {
//   createProduct: () => void;
// }
var BionicDuckFactory = /** @class */ (function () {
    function BionicDuckFactory() {
    }
    BionicDuckFactory.prototype.createProduct = function () {
        return new RubberDuckProducts_part_2_1.BionicDuck();
    };
    return BionicDuckFactory;
}());
var CommonDuckFactory = /** @class */ (function () {
    function CommonDuckFactory() {
    }
    CommonDuckFactory.prototype.createProduct = function () {
        return new RubberDuckProducts_part_2_1.CommonDuck();
    };
    return CommonDuckFactory;
}());
// class BionicDuckFactory implements Factory {
//   createProduct() {
//     return new BionicDuckProduct();
//   }
// }
// class CommonDuckFactory implements Factory {
//   createProduct() {
//     return new CommonDuckProduct();
//   }
// }
// Factories
var bionicDuckFactory = new BionicDuckFactory();
var commonDuckFactory = new CommonDuckFactory();
// const bionicDuckFactory = new BionicDuckFactory();
// const commonDuckFactory = new CommonDuckFactory();
// // Products
var bionicDuck = bionicDuckFactory.createProduct();
var commonDuck = commonDuckFactory.createProduct();
// const bionicDuck = bionicDuckFactory.createProduct();
// const commonDuck = commonDuckFactory.createProduct();
// // Let's make those ducks say QUACK!
bionicDuck.quack();
commonDuck.quack();
