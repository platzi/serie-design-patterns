/**
 * How to implement Abstract Factory?
 *
 * 1. Declare base products classes/interfaces for each product
 *  in the catalog.
 *
 * Products interfaces:
 *  - MastodonCar
 *  - RhinoCar
 *
 * 2. Implement concrete products classes that inherits/implements
 *  base products classes/interfaces, for each of the family types.
 *
 * Concrete Products:
 *  - MastodonSedanCar
 *  - MastodonHatchbackCar
 *  - RhinoSedanCar
 *  - RhinoHatchbackCar
 *
 * 3. Declare abstract factory class/interface that declare creation
 *  methods for each base product.
 *
 * Abstract Factory:
 *   - CarFactory
 *      * createMastodonCar(): Mastodon
 *      * createRhinoCar(): Rhino
 *
 * 4. Create concrete factories that implements all of the defined
 *  creation methods in the abstract factory.
 *
 * Concrete Factories:
 *  - SedanCarFactory
 *  - HatchbackCarFactory
 *
 */

/** STEP 1 */
interface MastodonCar {
  useGPS(): void;
}

interface RhinoCar {
  useGPS(): void;
}

/** STEP 2 */
class MastodonSedanCar implements MastodonCar {
  useGPS(): void {
    console.log('[SEDAN] Mastodon GPS');
  }
}

class MastodonHatchbackCar implements MastodonCar {
  useGPS(): void {
    console.log('[HATCHBACK] Mastodon GPS');
  }
}

class RhinoSedanCar implements RhinoCar {
  useGPS(): void {
    console.log('[SEDAN] Rhino GPS');
  }
}

class RhinoHatchbackCar implements RhinoCar {
  useGPS() {
    console.log('[HATCHBACK] Rhino GPS');
  }
}

/** STEP 3 */
interface CarAbstractFactory {
  createMastodon(): MastodonCar;
  createRhino(): RhinoCar;
}

/** STEP 4 */
class SedanCarFactory implements CarAbstractFactory {
  createMastodon(): MastodonCar {
    return new MastodonSedanCar();
  }

  createRhino(): RhinoCar {
    return new RhinoSedanCar();
  }
}

class HatchbackCarFactory implements CarAbstractFactory {
  createMastodon(): MastodonCar {
    return new MastodonHatchbackCar();
  }

  createRhino(): RhinoCar {
    return new RhinoHatchbackCar();
  }
}

function appCarFactory(factory: CarAbstractFactory) {
  const mastodon: MastodonCar = factory.createMastodon();
  const rhino: RhinoCar = factory.createRhino();

  mastodon.useGPS();
  rhino.useGPS();
}

/** Passing a concrete factory */
appCarFactory(new HatchbackCarFactory());
appCarFactory(new SedanCarFactory());

type FactoryType = 'sedan' | 'hatchback';
function createFactory(type: FactoryType): CarAbstractFactory {
  const factories = {
    sedan: SedanCarFactory,
    hatchback: HatchbackCarFactory,
  };

  const Factory = factories[type];
  return new Factory();
}

/** Having a factory of factories implementation */
appCarFactory(createFactory('sedan'));
appCarFactory(createFactory('hatchback'));

// This is not relevant for the course, don't worry about this
export {};
