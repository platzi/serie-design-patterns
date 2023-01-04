/**
 * Ideas detras de codigo
 *
 * 1. Composición sobre herencia
 */

// Here you will put the interface
interface Duck {
  quack: () => void;
}

export class BionicDuck implements Duck {
  quack() {
    console.log("Bionic");
  }
}

export class CommonDuck implements Duck {
  quack() {
    console.log("Common");
  }
}

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
