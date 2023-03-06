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
 *  Change 2: Renamed MastodonSedanCar class name to MastodonSedanCar.
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

// STEP 1
class BaseCar {
  /**
   * In case that no value for some property is passed, a default
   * value has been assigned to each one.
   *
   * @param edition edition of car like cvt/signature
   * @param model car model like sedan/hatchback
   * @param airBags number of car air bags
   * @param color car color
   */
  constructor({ edition = '', model = '', airBags = 0, color = '' } = {}) {
    this._edition = edition;
    this._model = model;
    this._airBags = airBags;
    this._color = color;
  }

  /**
   * Base car edition attribute setter
   * @param {string} edition car edition
   */
  set edition(edition) {
    this._edition = edition;
  }

  /**
   * Base car model attribute setter
   * @param {string} model car model (sedan/hatchbak)
   */
  set model(model) {
    this._model = model;
  }

  /**
   * Base car airBags attribute setter
   * @param {number} howMany airbags number
   */
  set airBags(howMany) {
    this._airBags = howMany;
  }

  /**
   * Base car color attribute setter
   * @param {string} color car color from a specific list
   */
  set color(color) {
    this._color = color;
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
   * Abastract method to be implemented by all the classes
   * that inherits from BaseCar.
   */
  clone() {
    throw new Error('Method not implemented!');
  }
}

// STEP 2
class MastodonSedanCar extends BaseCar {
  /**
   * Since JS is not strict with the functions signature
   * verification we don't need to do constructor overload.
   * We can use the same signature for all the cases.
   *
   * @param carToClone instance of MastodonSedanCar
   */
  constructor(carToClone) {
    super({
      edition: carToClone?.edition,
      model: 'sedan',
      airBags: carToClone?.airBags,
      color: carToClone?.color,
    });
  }

  /**
   * @override clone() method
   * @returns a mastodon sedan car configured as the original
   */
  clone() {
    return new MastodonSedanCar(this);
  }
}

// ------ [BEGIN] Use of Factory Method pattern ------

class CarFactory {
  create() {
    throw new Error('Method not implemented!');
  }
}

class MastodonSedanCarFactory extends CarFactory {
  create() {
    return new MastodonSedanCar();
  }
}

// ------ [END] Use of Factory Method pattern ------

// ------ [BEGIN] Builder pattern similar code ------

class CarProductionLine {
  /**
   * @param {string} edition sedan edition to be set to car
   */
  setEdition(edition) {
    throw new Error('Method not implemented!');
  }

  /**
   * @param {number} howMany number of airbags to be set to car
   */
  setAirBags(howMany) {
    throw new Error('Method not implemented!');
  }

  /**
   * @param {string} color color to be set to car
   */
  setColor(color) {
    throw new Error('Method not implemented!');
  }

  /**
   * Emulates how the production line receives a new
   * car to work.
   *
   * @param {BaseCar} newCar new car instance to customize
   */
  resetProductionLine(newCar) {
    throw new Error('Method not implemented!');
  }
}

class SedanProductionLine extends CarProductionLine {
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
  constructor({ factory }) {
    super();
    this.carFactory = factory;
    this.resetProductionLine(this.carFactory.create());
  }

  /**
   * @override setEdition() method
   * @param  edition car edition
   * @returns production line working instance
   */
  setEditon(edition) {
    this.sedanCar.edition = edition;
    return this;
  }

  /**
   * @override setAirBags() method
   * @param howMany airbags number
   * @returns production line working instance
   */
  setAirBags(howMany) {
    this.sedanCar.airBags = howMany;
    return this;
  }

  /**
   * @override setColor() method
   * @param color car color
   * @returns production line working instance
   */
  setColor(color) {
    this.sedanCar.color = color;
    return this;
  }

  /**
   * @override resetProductionLine() method
   * @param car new car to be customized by the production line
   */
  resetProductionLine(car) {
    this.sedanCar = car;
  }

  /**
   * Restart production line and returns customized sedan car instance.
   *
   * For this case we decided to set BaseCar as return type.
   *
   * @returns {BaseCar} base car instance
   */
  build() {
    const sedanCar = this.sedanCar;
    this.resetProductionLine(this.carFactory.create());
    return sedanCar;
  }
}

class Director {
  /**
   * Set the production line to be used for the director to build editions
   * @param {CarProductionLine} productionLine contains concrete customization steps implementation
   */
  setProductionLine(productionLine) {
    this.productionLine = productionLine;
  }

  /**
   * Sedan CVT Edition customization steps
   */
  constructCvtEdition() {
    this.productionLine.setAirBags(4).setColor('red').setEditon('cvt');
  }

  /**
   * Sedan Signature Edition customization steps
   */
  constructSignatureEdition() {
    this.productionLine.setAirBags(8).setColor('gray').setEditon('signature');
  }
}

// ------ [END] Builder pattern similar code ------

/**
 * Main function
 */
function appPrototype(director) {
  console.log('--- [JS] Calling appPrototype ---\n');

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

  const mastodonSedanCvtClone = mastodonSedanCvt.clone();
  console.log('--- Mastodon Sedan CVT Clone ---\n');
  console.log(mastodonSedanCvtClone);

  director.constructSignatureEdition();
  const mastodonSedanSignature = mastodonSedanProductionLine.build();
  console.log('--- Mastodon Sedan Signature ---\n');
  console.log(mastodonSedanSignature);

  const mastodonSedanSignatureClone = mastodonSedanSignature.clone();
  console.log('--- Mastodon Sedan Signature Clone ---\n');
  console.log(mastodonSedanSignatureClone);
}

appPrototype(new Director());
