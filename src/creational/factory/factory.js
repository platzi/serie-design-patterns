/**
 * How to implement Factory?
 *
 * 1. Make all Products follow the same interface/contract.
 * 2. Make all Factorories follow the same interface/contract
 *  and declare a create (factory) method that returns objects
 *  that follow the common Product interface.
 * 3. Create Products subclasses as you require.
 * 3. Create Factories subclasses for each type of Product that
 *  you have. Implement the factory/create method to return
 *  the correct Prodcut in each subclass.
 */

/** Class representing a Base Car */
class BaseCar {
  showCost() {
    throw new Error("Method showCost not implemented!");
  }
}

class MastodonCar extends BaseCar {
  /** @override showCost() method */
  showCost() {
    console.log("Mastodon car cost $50,000 USD");
  }
}

class RhinoCar extends BaseCar {
  /** @override showCost() method */
  showCost() {
    console.log("Mastodon car cost $70,000 USD");
  }
}

/** Class representing a Base Factory */
class BaseCarFactory {
  produceCar() {
    throw new Error("Method produceCar() not implemented!");
  }
}

/** Class representing a Mastodon Car Factory. */
class MastodonCarFactory extends BaseCarFactory {
  /** @override create method */
  produceCar() {
    return new MastodonCar();
  }
}

/** Class representing a Mastodon Car Factory. */
class RhinoCarFactory extends BaseCarFactory {
  /** @override create method */
  produceCar() {
    return new RhinoCar();
  }
}

function app(factory) {
  if (!factory) {
    return;
  }

  const car = factory.produceCar();
  car.showCost();
  car.countWheels();
}

/**
 * We could change the Factory as you wish since
 * all of them implement the same behaviour.
 */
app(new MastodonCarFactory());
app(new RhinoCarFactory());

/**
 * Let's abstract the factories creation
 * @param type type of car factory
 * @returns A car factory instance based
 */
function createFactory(type) {
  const factories = {
    mastodon: MastodonCarFactory,
    rhino: RhinoCarFactory,
  };

  const factory = new factories[type]();
  return factory;
}

/**
 * Instead of using new() operator, we abstract the
 * factories creation and we just indicate the type
 */
app(createFactory("mastodon"));
app(createFactory("rhino"));
