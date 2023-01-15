/**
 * How to implement abstract factory?
 *
 * 1. Define Products interface
 * 2. Create concrete Products
 * 3. Create abstract factory interface that declares
 *  a set of methods fro creating each of the Products
 * 4. Create concrete factories that implement all creation
 *  methods defined in abstract factory interface
 *
 * Taking the context of the Cars production process:
 *
 * 1. Products interfaces:
 *  - MastodonCarAbstract
 *  - RhinoCarAbstract
 *
 * 2. Concrete Products
 *  - MastodonSedanCar
 *  - MastodonCompactCar
 *  - RhinoSedanCar
 *  - RhinoCompactCar
 *
 * 3. Abstract Factory
 *   - CarFactory
 *      * createMastodonCar()
 *      * createRhinoCar()
 *
 * 4. Concrete Factories
 *  - SedanCarFactory
 *  - CompactCarFactory
 *
 * AF: comes from Abstract Factory
 *
 *
 */

// /** @interface Concrete product A */
// interface MastodonCarAF {
//   doSomeOperationA(): void;
// }

// class SedanMastodonCar implements MastodonCarAF {
//   doSomeOperationA(): void {
//     console.log("[Sedan] Mastodon Car implementation");
//   }
// }
// class CompactMastodonCar implements MastodonCarAF {
//   doSomeOperationA(): void {
//     console.log("[Compact] Mastodon Car implementation");
//   }
// }

// /** @interface Concrete product B */
// interface RhinoCarAF {
//   doSomeOperationB(): void;
// }

// class SedanRhinoCar implements RhinoCarAF {
//   doSomeOperationB(): void {
//     console.log("[Sedan] Rhino Car implementation");
//   }
// }

// class CompactRhinoCar implements RhinoCarAF {
//   doSomeOperationB(): void {
//     console.log("[Compact] Rhino car implementation");
//   }
// }

// /** @interface Abstract Factory interface */
// interface CarFactory {
//   createMastodonCar(): MastodonCarAF;
//   createRhinoCar(): RhinoCarAF;
// }

// /** @class Factory that returns the variant 1 of each Product */
// class SedanCarFactory implements CarFactory {
//   /**
//    *
//    * @returns Concrete implementation 1 of Product A
//    */
//   createMastodonCar(): MastodonCarAF {
//     return new SedanMastodonCar();
//   }

//   /**
//    *
//    * @returns [Sedan] Rhino Car implementation
//    */
//   createRhinoCar(): RhinoCarAF {
//     return new SedanRhinoCar();
//   }
// }
// class CompactCarFactory implements CarFactory {
//   /**
//    *
//    * @returns Rhino car compact version implementation of Product A
//    */
//   createMastodonCar(): MastodonCarAF {
//     return new CompactMastodonCar();
//   }

//   /**
//    *
//    * @returns [Compact] Rhino car implementation
//    */
//   createRhinoCar(): RhinoCarAF {
//     return new CompactRhinoCar();
//   }
// }

// function appCarFactory(factory: CarFactory) {
//   const MastodonCar: MastodonCarAF = factory.createMastodonCar();
//   const RhinoCar: RhinoCarAF = factory.createRhinoCar();

//   MastodonCar.doSomeOperationA();
//   RhinoCar.doSomeOperationB();
// }

// appCarFactory(new SedanCarFactory());
// appCarFactory(new CompactCarFactory());
