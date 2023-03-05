/**
 * How to implement Abstract Factory?
 *
 * 1. Declare base products classes/interfaces for each product
 *  in the catalog.
 *
 * Base products:
 *  - MastodonCar
 *  - RhinoCar
 *
 * 2. Implement concrete products classes that inherits/implements
 *  base products classes/interfaces, the number of concrete prodcuts
 *  will depend on the number of families.
 *
 * Concrete products:
 *  - MastodonSedanCar
 *  - MastodonHatchbackCar
 *  - RhinoSedanCar
 *  - RhinoHatchbackCar
 *
 * 3. Declare abstract factory class/interface that declare creation
 *  methods for each base product. The return value could be the base
 *  products types or concrete products types.
 *
 * Abstract Factory:
 *   - CarFactory
 *      * createMastodonCar(): MastodonCar
 *      * createRhinoCar(): RhinoCar
 *
 * 4. Create concrete factories that implements/inherits from the
 *  abstract factory behaviour and implements all the products creation
 *  methods. The number of concrete factories will depend of the number
 *  of product families.
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
  /** @override useGPS() method */
  useGPS(): void {
    console.log('[SEDAN] Mastodon GPS');
  }
}

class MastodonHatchbackCar implements MastodonCar {
  /** @override useGPS() method */
  useGPS(): void {
    console.log('[HATCHBACK] Mastodon GPS');
  }
}

class RhinoSedanCar implements RhinoCar {
  /** @override useGPS() method */
  useGPS(): void {
    console.log('[SEDAN] Rhino GPS');
  }
}

class RhinoHatchbackCar implements RhinoCar {
  /** @override useGPS() method */
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
  /**
   * @override createMastodon() method
   * @returns MastodonSedanCar
   */
  createMastodon(): MastodonCar {
    return new MastodonSedanCar();
  }

  createRhino(): RhinoCar {
    /**
     * @override createRhino() method
     * @returns RhinoSedanCar
     */
    return new RhinoSedanCar();
  }
}

class HatchbackCarFactory implements CarAbstractFactory {
  /**
   * @override createMastodon() method
   * @returns MastodonHatchbackCar
   */
  createMastodon(): MastodonCar {
    return new MastodonHatchbackCar();
  }

  createRhino(): RhinoCar {
    /**
     * @override createMastodon() method
     * @returns RhinoHatchbackCar
     */
    return new RhinoHatchbackCar();
  }
}

/**
 * Main function
 * @param factory Car factory
 */
function appCarFactory(factory: CarAbstractFactory) {
  console.log('--- [TS] Calling appFactory ---');
  if (!factory) {
    console.log('--- No factory provided ---');
    return;
  }

  const mastodon: MastodonCar = factory.createMastodon();
  const rhino: RhinoCar = factory.createRhino();

  mastodon.useGPS();
  rhino.useGPS();
}

/**
 * You could change the Factory as you wish since
 * all of them implement the same behaviour.
 */
appCarFactory(new HatchbackCarFactory());
appCarFactory(new SedanCarFactory());

type FactoryType = 'sedan' | 'hatchback';
/**
 * Let's abstract the factories creation
 * @param type type of factory family to create
 * @returns A car factory instance
 */
function createFactory(type: FactoryType): CarAbstractFactory {
  const factories = {
    sedan: SedanCarFactory,
    hatchback: HatchbackCarFactory,
  };

  const Factory = factories[type];
  return new Factory();
}

/**
 * Instead of using new() operator, we abstract the
 * factories creation and we just indicate the type
 * as a parameter
 */
appCarFactory(createFactory('hatchback'));
appCarFactory(createFactory('sedan'));

// This is not relevant for the course, don't worry about this
export {};
