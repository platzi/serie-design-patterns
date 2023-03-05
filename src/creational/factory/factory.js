/**
 * How to implement Factory Method?
 *
 * 1. Declare base product class/interface, this will be returned by
 *  factory class and their sub classes.
 * 2. Implement concrete products sub classes that inherits/implements
 *  the base product class/interface.
 * 3. Declare factory class/interface that returns objects that match
 *  the base product, not the concrete ones.
 * 4. Implement concrete factories sub classes that inherits/implements
 *  the base factory class/interface. These classes will return concrete
 *  products in their factory method.
 */

/** STEP 1 */
class BaseCar {
  showCost() {
    throw new Error('Method not implemented!');
  }
}

/** STEP 2 */
class MastodonCar extends BaseCar {
  /** @override showCost() method */
  showCost() {
    console.log('Mastodon Car Cost: 300,000 MXN');
  }
}

class RhinoCar extends BaseCar {
  /** @override showCost() method */
  showCost() {
    console.log('Rhino Car Cost: 100,000 MXN');
  }
}

/** STEP 3 */
class CarFactory {
  makeCar() {
    throw new Error('Method not implemented!');
  }
}

/** STEP 4 */
class MastodonCarFactory extends CarFactory {
  /**
   * @override makeCar() method
   * @returns MastodonCar
   */
  makeCar() {
    return new MastodonCar();
  }
}

class RhinoCarFactory extends CarFactory {
  /**
   * @override makeCar() method
   * @returns RhinoCar
   */
  makeCar() {
    return new RhinoCar();
  }
}

/**
 * Main function
 * @param {CarFactory} factory Car factory
 */
function appFactory(factory) {
  console.log('--- [JS] Calling appFactory ---');
  if (!factory) {
    console.log('--- No factory provided ---');
    return;
  }

  const car = factory.makeCar();
  car.showCost();
}

/**
 * You could change the Factory as you wish since
 * all of them implement the same behaviour.
 */
appFactory(new MastodonCarFactory());
appFactory(new RhinoCarFactory());

/**
 *
 * @param {string} name name of the factory to create
 * @returns {MastodonCarFactory | RhinoCarFactory} A car factory instance
 */
function createFactory(name) {
  const factories = {
    mastodon: MastodonCarFactory,
    rhino: RhinoCarFactory,
  };

  const FactoryClass = factories[name];
  return new FactoryClass();
}

/**
 * Instead of using new() operator, we abstract the
 * factories creation and we just indicate the type
 * as a parameter
 */
appFactory(createFactory('mastodon'));
appFactory(createFactory('rhino'));
