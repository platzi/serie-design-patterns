/**
 *
 * Prototype challenge:
 *
 * Add RhinoCar class, create instances and clone it.
 *
 * Steps followed to implement the solution:
 *
 * 1. Add RhinoSedanCar class
 * 2. Add RhinoSedanCarFactory class
 * 3. Add setCarFactory method to CarProductionLine class to allow change
 *  car factory to be used
 * 4. Rename mastodonSedanProductionLine by sedanProductionLine
 * 5. Add setProductionLineCarFactory method in Director class
 */

type AvailableColors = 'red' | 'black' | 'gray' | 'blue' | 'default';
type EditionsType = 'cvt' | 'signature' | 'default';
type CarConstructorParams = {
  edition: EditionsType;
  model: string;
  airBags: number;
  color: AvailableColors;
};

// ----- Base product -----

abstract class BaseCar {
  private _edition: EditionsType;
  private _model: string;
  private _airBags: number;
  private _color: AvailableColors;

  /**
   * In case that no value for some property is passed, a default
   * value has been assigned to each one.
   *
   * @param edition edition of car like cvt/signature
   * @param model car model like sedan/hatchback
   * @param airBags number of car air bags
   * @param color car color
   */
  constructor({
    edition = 'default',
    model = '',
    airBags = 0,
    color = 'default',
  }: CarConstructorParams) {
    this._edition = edition;
    this._model = model;
    this._airBags = airBags;
    this._color = color;
  }

  /**
   * Base car edition attribute setter
   * @param edition car edition
   */
  set edition(edition: EditionsType) {
    this._edition = edition;
  }

  /**
   * Base car model attribute setter
   * @param model car model (sedan/hatchbak)
   */
  set model(model: string) {
    this._model = model;
  }

  /**
   * Base car airBags attribute setter
   * @param howMany airbags number
   */
  set airBags(howMany: number) {
    this._airBags = howMany;
  }

  /**
   * Base car color attribute setter
   * @param color car color from a specific list
   */
  set color(color: AvailableColors) {
    this._color = color;
  }

  /**
   * Base car airBags attribute getter
   * @returns airbags number
   */
  get airBags() {
    return this._airBags;
  }

  /**
   * Base car color attribute getter
   * @returns car color
   */
  get color() {
    return this._color;
  }

  /**
   * Base car edition attribute getter
   * @returns car edition
   */
  get edition() {
    return this._edition;
  }

  /**
   * Base car model attribute getter
   * @returns car model
   */
  get model() {
    return this._model;
  }

  /**
   * Abastract method to be implemented by all the classes
   * that inherits from BaseCar.
   */
  abstract clone(): BaseCar;
}

// ----- Concrete products -----

class MastodonSedanCar extends BaseCar {
  /**
   * We use constructor overload in this part to allow us to create
   * a new MastodonSedanCar from zero or based in other instance of
   * the class using the same constructor.
   *
   * About the overload, is the creation of different methods with
   * the same name but with different parameters (different signature).
   *
   * @param carToClone instance of MastodonSedanCar
   */
  constructor(carToClone?: MastodonSedanCar);
  constructor(carToClone: MastodonSedanCar) {
    super({
      edition: carToClone?.edition,
      color: carToClone?.color,
      model: 'sedan',
      airBags: carToClone?.airBags,
    });
  }

  /**
   * @override clone() method
   * @returns a mastodon sedan car configured as the original
   */
  clone(): MastodonSedanCar {
    return new MastodonSedanCar(this);
  }
}

class RhinoSedanCar extends BaseCar {
  /**
   * We use constructor overload in this part to allow us to create
   * a new RhinoSedanCar from zero or based in other instance of
   * the class using the same constructor.
   *
   * About the overload, is the creation of different methods with
   * the same name but with different parameters (different signature).
   *
   * @param carToClone instance of RhinoSedanCar
   */
  constructor(carToClone?: RhinoSedanCar);
  constructor(carToClone: RhinoSedanCar) {
    super({
      edition: carToClone?.edition,
      color: carToClone?.color,
      model: 'sedan',
      airBags: carToClone?.airBags,
    });
  }

  /**
   * @override clone() method
   * @returns a mastodon sedan car configured as the original
   */
  clone(): RhinoSedanCar {
    return new RhinoSedanCar(this);
  }
}

// ----- Base factory -----

interface CarFactory {
  create(): BaseCar;
}

// ----- Concrete factories -----

class MastodonSedanCarFactory implements CarFactory {
  create(): BaseCar {
    return new MastodonSedanCar();
  }
}

class RhinoSedanCarFactory implements CarFactory {
  create(): BaseCar {
    return new RhinoSedanCar();
  }
}

// ----- Base builder -----

interface CarProductionLine {
  setAirBags(howMany: number): SedanProductionLine;
  setColor(color: AvailableColors): SedanProductionLine;
  setEdition(edition: EditionsType): SedanProductionLine;
  setCarFactory(factory: CarFactory): void;
  resetProductionLine(car: BaseCar): void;
}

// ----- Concrete builder -----

type ConstructorParams = { factory: CarFactory };
class SedanProductionLine implements CarProductionLine {
  private sedanCar!: BaseCar;
  private carFactory!: CarFactory;

  /**
   *
   * @param factory car factory instance
   */
  constructor({ factory }: ConstructorParams) {
    this.carFactory = factory;
    this.resetProductionLine(this.carFactory.create());
  }

  /**
   * @override setAirBags() method
   * @param howMany airbags number
   * @returns production line working instance
   */
  setAirBags(howMany: number): SedanProductionLine {
    this.sedanCar.airBags = howMany;
    return this;
  }

  /**
   * @override setColor() method
   * @param color car color
   * @returns production line working instance
   */
  setColor(color: AvailableColors): SedanProductionLine {
    this.sedanCar.color = color;
    return this;
  }

  /**
   * @override setEdition() method
   * @param  edition car edition
   * @returns production line working instance
   */
  setEdition(edition: EditionsType): SedanProductionLine {
    this.sedanCar.edition = edition;
    return this;
  }

  /**
   * @override setCarFactory() method
   * @param factory car factory to be used by production line
   */
  setCarFactory(factory: CarFactory) {
    this.carFactory = factory;
    this.resetProductionLine(this.carFactory.create());
  }

  /**
   * @override resetProductionLine() method
   * @param car new car to be customized by the production line
   */
  resetProductionLine(car: BaseCar) {
    this.sedanCar = car;
  }

  /**
   * Restart production line and returns customized sedan car instance.
   *
   * For this case we decided to set BaseCar as return type.
   *
   * @returns base car instance
   */
  build(): BaseCar {
    const sedanCar = this.sedanCar;
    this.resetProductionLine(this.carFactory.create());
    return sedanCar;
  }
}

// ----- Director -----

class Director {
  private productionLine!: CarProductionLine;

  /**
   * Set the production line to be used for the director to build editions
   * @param productionLine contains concrete customization steps implementation
   */
  setProductionLine(productionLine: CarProductionLine) {
    this.productionLine = productionLine;
  }

  /**
   * Set a new car factory to be used by the production line
   * @param carFactory new car factory
   */
  setProductionLineCarFactory(carFactory: CarFactory) {
    this.productionLine.setCarFactory(carFactory);
  }

  /**
   * Sedan CVT Edition customization steps
   */
  constructCvtEdition(): void {
    this.productionLine
      .setAirBags(4)
      .setColor('blue')
      .setEdition('cvt');
  }

  /**
   * Sedan Signature Edition customization steps
   */
  constructSignatureEdition(): void {
    this.productionLine
      .setAirBags(8)
      .setColor('gray')
      .setEdition('signature');
  }
}

/**
 * Main function
 */
function appPrototype(director: Director) {
  console.log('--- [TS] Calling appPrototype ---\n');

  if (!director) {
    console.log('--- No director provided ---');
    return;
  }

  const sedanProductionLine = new SedanProductionLine({
    factory: new MastodonSedanCarFactory(),
  });

  director.setProductionLine(sedanProductionLine);

  director.constructCvtEdition();
  const mastodonSedanCvt = sedanProductionLine.build();
  console.log('--- Mastodon Sedan CVT ---\n');
  console.log(mastodonSedanCvt);

  const mastodonSedanCvtClone = mastodonSedanCvt.clone();
  console.log('\n--- Mastodon Sedan CVT Clone ---\n');
  console.log(mastodonSedanCvtClone);

  /**
   * 1. We update the car factory to used Rhino cars factory
   * 2. Create Rhino cars and clone them
   * */
  director.setProductionLineCarFactory(new RhinoSedanCarFactory());
  director.constructCvtEdition();
  const rhinoSedanCvt = sedanProductionLine.build();
  console.log('\n--- Rhino Sedan CVT ---\n');
  console.log(rhinoSedanCvt);

  const rhinoSedanCvtClone = rhinoSedanCvt.clone();
  console.log('\n--- Rhino Sedan CVT Clone ---\n');
  console.log(rhinoSedanCvtClone);
}

appPrototype(new Director());

// This is not relevant for the course, don't worry about this
export {};
