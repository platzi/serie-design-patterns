/**
 * How to implement Factory?
 *
 * 1. Declare base product class/interface, this will be returned by
 *  factory class and their sub classes.
 * 2. Implement concrete products sub classes that inherits/implements
 *  the base product class/interface.
 * 3. Declare factory class/interface that returns objects that match
 *  the base product, not the concrete products.
 * 4. Implement concrete factories sub classes that inherits/implements
 *  the base factory class/interface. These classes will return concrete
 *  products in their factory method.
 */

/** STEP 1 */
interface BaseCar {
  showCost(): void;
}

/** STEP 2 */
class MastodonCar implements BaseCar {
  showCost(): void {
    console.log('Mastodon Car Cost: 300,000 MXN');
  }
}

class RhinoCar implements BaseCar {
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
  makeCar(): BaseCar {
    return new MastodonCar();
  }
}

class RhinoCarFactory implements CarFactory {
  makeCar(): BaseCar {
    return new RhinoCar();
  }
}

/** Let's test our implementation */
function appFactory(factory: CarFactory) {
  const car: BaseCar = factory.makeCar();
  car.showCost();
}

/**
 * We could change the Factory as you wish since
 * all of them implement the same behaviour.
 */
appFactory(new MastodonCarFactory());
appFactory(new RhinoCarFactory());

/**
 * Let's abstract the factories creation
 * @param type type of car factory
 * @returns A car factory instance based
 */
type FactoryType = 'mastodon' | 'rhino';
function createFactory(type: FactoryType) {
  const factories = {
    mastodon: MastodonCarFactory,
    rhino: RhinoCarFactory,
  };

  const factoryClass = factories[type];
  return new factoryClass();
}

/**
 * Instead of using new() operator, we abstract the
 * factories creation and we just indicate the type
 */
appFactory(createFactory('mastodon'));
appFactory(createFactory('rhino'));

// This is not relevant for the course, don't worry about this
export {};
