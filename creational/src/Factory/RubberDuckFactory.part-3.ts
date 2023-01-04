import { BionicDuck, CommonDuck } from "./RubberDuckProducts.part-2";

/**
 *
 * Factory Method es un patrón de diseño creacional que
 * proporciona una interfaz para crear objetos en una
 * superclase, mientras permite a las subclases alterar
 * el tipo de objetos que se crearán.
 *
 * Ideas detras de codigo:
 *
 * 1. Programa a una interfaz no una implementación, Pag.45
 * 2. Composición sobre herencia
 */

/**
 * La clase Creadora declara el método de fábricación que
 * devuelve nuevos objetos de producto. Es importante que
 * el tipo de retorno de este método coincida con la
 * interfaz de producto.
 */

interface Factory {
  createProduct: () => void;
}

// interface Factory {
//   createProduct: () => void;
// }

class BionicDuckFactory implements Factory {
  createProduct() {
    return new BionicDuck();
  }
}

class CommonDuckFactory implements Factory {
  createProduct() {
    return new CommonDuck();
  }
}

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
const bionicDuckFactory = new BionicDuckFactory();
const commonDuckFactory = new CommonDuckFactory();
// const bionicDuckFactory = new BionicDuckFactory();
// const commonDuckFactory = new CommonDuckFactory();

// // Products
const bionicDuck = bionicDuckFactory.createProduct();
const commonDuck = commonDuckFactory.createProduct();
// const bionicDuck = bionicDuckFactory.createProduct();
// const commonDuck = commonDuckFactory.createProduct();

// // Let's make those ducks say QUACK!
bionicDuck.quack();
commonDuck.quack();
