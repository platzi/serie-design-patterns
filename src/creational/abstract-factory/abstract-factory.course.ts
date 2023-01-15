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
 */

interface MastodonCarAbstract {
  doSomeOperation(): void;
}

class SedanMastodonCar implements MastodonCarAbstract {
  doSomeOperation(): void {
    console.log("[Sedan] Mastodon");
  }
}

class CompactMastodonCar implements MastodonCarAbstract {
  doSomeOperation(): void {
    console.log("[Compact] Mastodon");
  }
}

interface RhinoCarAbstract {
  doSomeOperation(): void;
}

class SedanRhinoCar implements RhinoCarAbstract {
  doSomeOperation(): void {
    console.log("[Sedan] Rhino");
  }
}

class CompactRhinoCar implements RhinoCarAbstract {
  doSomeOperation(): void {
    console.log("[Compact] Rhino");
  }
}

interface CarFactory {
  createMastodonCar(): MastodonCarAbstract;
  createRhinoCar(): RhinoCarAbstract;
}

class SedanCarFactory implements CarFactory {
  createMastodonCar(): MastodonCarAbstract {
    return new SedanMastodonCar();
  }

  createRhinoCar(): RhinoCarAbstract {
    return new SedanRhinoCar();
  }
}

class CompactCarFactory implements CarFactory {
  createMastodonCar(): MastodonCarAbstract {
    return new CompactMastodonCar();
  }

  createRhinoCar(): RhinoCarAbstract {
    return new CompactRhinoCar();
  }
}

function appAbstractFactory(factory: CarFactory) {
  const mastodonCar: MastodonCarAbstract = factory.createMastodonCar();
  const rhinoCar: RhinoCarAbstract = factory.createRhinoCar();

  mastodonCar.doSomeOperation();
  rhinoCar.doSomeOperation();
}

function createFactory(type: "sedan" | "compact") {
  const factories = {
    sedan: SedanCarFactory,
    compact: CompactCarFactory,
  };

  const Factory = factories[type];
  return new Factory();
}

appAbstractFactory(createFactory("sedan"));
appAbstractFactory(createFactory("compact"));
