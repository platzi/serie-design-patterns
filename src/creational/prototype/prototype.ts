/**
 * How to implement Prototype?
 *
 * 1. Declare a base class/interface prototype that contains
 *  clone methods.
 *
 *  If the base prototype is a class could be an abstract one
 *  to maintain some basic behaviour and implement the clone
 *  method in the sub class.
 *
 *  Base prototype:
 *    - BaseCar
 *
 * 2. Create concrete products who inherits/implements from
 *  prototype class and override clone method functionality.
 *
 *  Concrete products:
 *    - MastodonSedanCar
 *
 * Notes:
 *  The code of this file has some modifications with the version showed
 *  during the course.
 *
 *  Change 1: Renamed Car class name to BaseCar.
 *
 *  Change 2: Renamed MastodonCar class name to MastodonSedanCar.
 *
 *  Change 3: Change return types of functions defined in CarProductionLine
 *  to return the actual instance to chain methods as we did in builder.ts.
 *
 *  Change 4: Change the way we define default values for params passed
 *  to BaseCar constructor.
 *
 *  Change 5: Rename Factory interface to CarFactory
 *
 */

type AvailableColors = 'red' | 'black' | 'gray' | 'blue' | 'default';
type EditionsType = 'cvt' | 'signature' | 'default';
type CarConstructorParams = {
  edition: EditionsType;
  model: string;
  airBags: number;
  color: AvailableColors;
};

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

  // STEP 1

  /**
   * Abastract method to be implemented by all the classes
   * that inherits from BaseCar.
   */
  abstract clone(): BaseCar;
}

// STEP 2
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

// ------ [BEGIN] Use of Factory Method pattern ------

interface CarFactory {
  create(): BaseCar;
}

class MastodonSedanCarFactory implements CarFactory {
  create(): BaseCar {
    return new MastodonSedanCar();
  }
}

// ------ [END] Use of Factory Method pattern ------

// ------ [BEGIN] Builder pattern similar code ------

interface CarProductionLine {
  setAirBags(howMany: number): SedanProductionLine;
  setColor(color: AvailableColors): SedanProductionLine;
  setEdition(edition: EditionsType): SedanProductionLine;
  resetProductionLine(car: BaseCar): void;
}

type ConstructorParams = { factory: CarFactory };
class SedanProductionLine implements CarProductionLine {
  private sedanCar!: BaseCar;
  private carFactory!: CarFactory;

  /**
   *
   * Unlike the original implementation in builder.ts, this version
   * of sedan production line receives as param a car factory instance
   * that is in charge of create new cars to be customized. The line
   * will not know anything about the kind of car that the factory is
   * creating.
   *
   * In builder.ts the prodction line was "composed" by the car to
   * customize, here we have an aggregation relationship, the production
   * line "has" a car.
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
   * Sedan CVT Edition customization steps
   */
  constructCvtEdition(): void {
    this.productionLine.setAirBags(4).setColor('blue').setEdition('cvt');
  }

  /**
   * Sedan Signature Edition customization steps
   */
  constructSignatureEdition(): void {
    this.productionLine.setAirBags(8).setColor('gray').setEdition('signature');
  }
}

// ------ [END] Builder pattern similar code ------

/**
 * Main function
 */
function appPrototype(director: Director) {
  console.log('--- [TS] Calling appPrototype ---\n');

  if (!director) {
    console.log('--- No director provided ---');
    return;
  }

  const mastodonSedanProductionLine = new SedanProductionLine({
    factory: new MastodonSedanCarFactory(),
  });

  director.setProductionLine(mastodonSedanProductionLine);

  director.constructCvtEdition();
  const mastodonSedanCvt = mastodonSedanProductionLine.build();
  console.log('--- Mastodon Sedan CVT ---\n');
  console.log(mastodonSedanCvt);

  const mastodonSedanCvtPrototype = mastodonSedanCvt.clone();
  console.log('--- Mastodon Sedan CVT Clone ---\n');
  console.log(mastodonSedanCvtPrototype);

  director.constructSignatureEdition();
  const mastodonSedanSignature = mastodonSedanProductionLine.build();
  console.log('--- Mastodon Sedan Signature ---\n');
  console.log(mastodonSedanSignature);

  const mastodonSedanSignaturePrototype = mastodonSedanSignature.clone();
  console.log('--- Mastodon Sedan Signature Clone ---\n');
  console.log(mastodonSedanSignaturePrototype);
}

appPrototype(new Director());

// This is not relevant for the course, don't worry about this
export {};
