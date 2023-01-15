/**
 * How to implement abstract factory?
 *
 * 1. Define Products interface
 * 2. Create Concrete Products
 * 3. Create abstract factory interface that declares
 *  a set of methods fro creating each of the Products
 * 4. Create concrete factories that implement all creation
 *  methods defined in abstract factory interface
 *
 */

/** @interface Concrete product A */
interface ProductA {
  doSomeOperationA(): void;
}

class ConcreteProductA1 implements ProductA {
  doSomeOperationA(): void {
    console.log("Concrete implementation 1 of Product A");
  }
}
class ConcreteProductA2 implements ProductA {
  doSomeOperationA(): void {
    console.log("Concrete implementation 2 of Product A");
  }
}

/** @interface Concrete product B */
interface ProductB {
  doSomeOperationB(): void;
}

class ConcreteProductB1 implements ProductB {
  doSomeOperationB(): void {
    console.log("Concrete implementation 1 of Product B");
  }
}

class ConcreteProductB2 implements ProductB {
  doSomeOperationB(): void {
    console.log("Concrete implementation 2 of Product B");
  }
}

/** @interface  */
interface AbstractFactory {
  createProductA(): ProductA;
  createProductB(): ProductB;
}

/** @class Factory that returns the variant 1 of each Product */
class ConcreteFactoryA implements AbstractFactory {
  /**
   *
   * @returns Concrete implementation 1 of Product A
   */
  createProductA(): ProductA {
    return new ConcreteProductA1();
  }

  /**
   *
   * @returns Concrete implementation 1 of Product B
   */
  createProductB(): ProductB {
    return new ConcreteProductB1();
  }
}

class ConcreteFactoryB implements AbstractFactory {
  /**
   *
   * @returns Concrete implementation 2 of Product A
   */
  createProductA(): ProductA {
    return new ConcreteProductA2();
  }

  /**
   *
   * @returns Concrete implementation 2 of Product B
   */
  createProductB(): ProductB {
    return new ConcreteProductB2();
  }
}

function appAbstractFactory(factory: AbstractFactory) {
  const productA: ProductA = factory.createProductA();
  const productB: ProductB = factory.createProductB();

  productA.doSomeOperationA();
  productB.doSomeOperationB();
}

appAbstractFactory(new ConcreteFactoryA());
appAbstractFactory(new ConcreteFactoryB());
