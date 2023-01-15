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

/** Interface that indicates a Car behaviour. */
interface BaseCar {
  showCost(): void;
}

/** Class representing a Mastodon Car. */
class MastodonCar implements BaseCar {
  showCost(): void {
    console.log("Mastodon car cost $50,000 USD");
  }
}

/** Class representing a Rhino Car. */
class RhinoCar implements BaseCar {
  showCost(): void {
    console.log("Mastodon car cost $70,000 USD");
  }
}

/** Interface that indicates a Car Factory behaviour. */
interface BaseCarFactory {
  produceCar(): BaseCar;
}

/** Class representing a Mastodon Car Factory. */
class MastodonCarFactory implements BaseCarFactory {
  /**
   * Create method that returns an instance of MastodonCar
   * @returns MastodonCar
   */
  produceCar(): BaseCar {
    return new MastodonCar();
  }
}

/** Class representing a Rhino Car Factory. */
class RhinoCarFactory implements BaseCarFactory {
  /**
   * Create method that returns an instance of RhinoCar
   * @returns RhinoCar
   */
  produceCar(): BaseCar {
    return new RhinoCar();
  }
}

function appFactory(factory: BaseCarFactory) {
  const car: BaseCar = factory.produceCar();
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
 * @param FactoryType type of car factory
 * @returns A car factory instance based
 */
type FactoryType = "mastodon" | "rhino";
function createFactory(type: FactoryType): BaseCarFactory {
  const factories = {
    mastodon: MastodonCarFactory,
    rhino: RhinoCarFactory,
  };

  const factory = new factories[type]();
  return factory;
}

appFactory(createFactory("mastodon"));
appFactory(createFactory("rhino"));

// JS, TS para señalar las diferencis puntuales, de cualquier forma encontraras
// ambos en el repo, y los diagramas que veras, varian en un par de cosas.
