/**
 * How to implement Factory Method?
 *
 * 1. Declare base product class/interface, this will be returned by
 *  factory class and their sub classes.
 *
 * Base product:
 *  - BaseCar
 *
 * 2. Implement concrete products sub classes that inherits/implements
 *  the base product class/interface.
 *
 * Concrete products:
 *  - MastodonCar
 *  - RhinoCar
 *
 * 3. Declare base factory class/interface that returns objects that match
 *  the base product, not the concrete ones.
 *
 * Base factory:
 *  - CarFactory
 *
 * 4. Implement concrete factories sub classes that inherits/implements
 *  the base factory class/interface. These classes will return concrete
 *  products in their factory method.
 *
 * Concrete factories:
 *  - MastodonCarFactory
 *  - RhinoCarFactory
 *
 */

/** STEP 1 */
interface BaseCar {
  showCost(): void;
}

/** STEP 2 */
class MastodonCar implements BaseCar {
  /** @override showCost() method */
  showCost(): void {
    console.log('Mastodon Car Cost: 300,000 MXN');
  }
}

class RhinoCar implements BaseCar {
  /** @implements showCost() method */
  showCost(): void {
    console.log('Rhino Car Cost: 100,000 MXN');
  }
}

/** STEP 3 */
interface CarFactory {
  makeCar(): BaseCar;
}

/** STEP 4 */
class MastodonCarFactory implements CarFactory {
  /**
   * @implements makeCar() method
   * @returns MastodonCar
   */
  makeCar(): BaseCar {
    return new MastodonCar();
  }
}

class RhinoCarFactory implements CarFactory {
  /**
   * @implements makeCar() method
   * @returns RhinoCar
   */
  makeCar(): BaseCar {
    return new RhinoCar();
  }
}

/**
 * Main function
 * @param factory Car factory
 */
function appFactory(factory: CarFactory) {
  console.log('--- [TS] Calling appFactory ---');
  const car: BaseCar = factory.makeCar();
  car.showCost();
}

/**
 * We could change the kind of factory to use
 * since all of them implement the same behaviour.
 */
appFactory(new MastodonCarFactory());
appFactory(new RhinoCarFactory());

type FactoryName = 'mastodon' | 'rhino';
/**
 * Let's abstract the factories creation
 * @param name name of the factory to create
 * @returns A car factory instance
 */
function createFactory(name: FactoryName) {
  const factories = {
    mastodon: MastodonCarFactory,
    rhino: RhinoCarFactory,
  };

  const FactoryClass = factories[name];
  return new FactoryClass();
}

/**
 * Instead of using new() operator, we abstract the
 * factories creation and we just indicate the name
 */
appFactory(createFactory('mastodon'));
appFactory(createFactory('rhino'));

// This is not relevant for the course, don't worry about this
export {};
