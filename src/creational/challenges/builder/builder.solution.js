/**
 *
 * Builder challenge:
 *
 * Implement Hatchback production line class
 * and create a new build process for car sport version.
 *
 * Steps followed to implemente the solution:
 *
 * 1. Implement all the  functionality in CarProductionLine
 *  and not in concrete builders
 * 2. Create a new production line class for hatchback
 * 3. Create concrete product and concrete factory for mastodon hatchback
 * 4. Create new build process for apply Sport type customization
 *
 */

// ----- Builder -----

class CarProductionLine {
  /**
   * @param {CarFactory} factory car factory instance
   */
  constructor({ factory }) {
    this.carFactory = factory;
    this.resetProductionLine(this.carFactory.create());
  }

  /**
   * @override setAirBags() method
   * @param {number} howMany aribags number
   * @returns {CarProductionLine} production line working instance
   */
  setAirBags(howMany) {
    this.car.airBags = howMany;
    return this;
  }

  /**
   * @override setColor() method
   * @param {string} color car color
   * @returns {CarProductionLine} production line working instance
   */
  setColor(color) {
    this.car.color = color;
    return this;
  }

  /**
   * @override setEdition() method
   * @param {string} edition car edition
   * @returns {CarProductionLine} production line working instance
   */
  setEdition(edition) {
    this.car.edition = edition;
    return this;
  }

  /**
   * @override resetProductionLine() method
   * @param {BaseCar} car new car to be customized by the production line
   */
  resetProductionLine(car) {
    this.car = car;
  }

  /**
   * Restart production line and returns customized sedan car instance.
   *
   * For this case we decided to set BaseCar as return type.
   *
   * @returns {BaseCar} base car instance
   */
  build() {
    const car = this.car;
    this.resetProductionLine(this.carFactory.create());
    return car;
  }
}

// ----- Concrete Builders -----

/**
 * In this case we didn't need to override any of the methods of
 * CarProductionLine, even we can use only the base class but
 * just to be more explicit we declare both production line classs.
 */

class SedanProductionLine extends CarProductionLine {}
class HatchbackProductionLine extends CarProductionLine {}

// ----- Base Product -----

class BaseCar {
  constructor() {
    this._edition = '';
    this._model = '';
    this._airBags = 2;
    this._color = 'black';
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
   * @param {string} color car color
   */
  set color(color) {
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
}

// ----- Concrete products -----

class MastodonSedanCar extends BaseCar {
  constructor() {
    super();
    this.model = 'sedan';
  }
}

class MastodonHatchbackCar extends BaseCar {
  constructor() {
    super();
    this.model = 'hatchback';
  }
}

// ----- Base factory -----

class CarFactory {
  create() {
    throw new Error('Method not implemented!');
  }
}

// ----- Concrete factories -----

class MastodonSedanCarFactory extends CarFactory {
  create() {
    return new MastodonSedanCar();
  }
}
class MastodonHatchbackCarFactory extends CarFactory {
  create() {
    return new MastodonHatchbackCar();
  }
}

// ----- Director -----

class Director {
  /**
   * Set the production line to be used for the director to build editions
   * @param {CarProductionLine} productionLine contains concrete customization steps implementation
   */
  setProductionLine(productionLine) {
    this._productionLine = productionLine;
  }

  /**
   * Add this getter method to return prodcution line
   * @returns {CarProductionLine} production line used by director
   */
  get productionLine() {
    return this._productionLine;
  }

  /**
   * CVT Edition customization steps
   */
  constructCvtEdition() {
    this.productionLine
      .setAirBags(4)
      .setColor('blue')
      .setEdition('cvt');
  }

  /**
   * Signature Edition customization steps
   */
  constructSignatureEdition() {
    this.productionLine
      .setAirBags(8)
      .setColor('red')
      .setEdition('signature');
  }

  /**
   * Sport Edition customization steps
   */
  constructSportEdition() {
    this.productionLine
      .setAirBags(4)
      .setColor('gray')
      .setEdition('sport');
  }
}

/**
 * Main function
 */
function appBuilder(director) {
  console.log('--- [JS] Calling appBuilder ---\n');

  if (!director) {
    console.log('--- No director provided ---');
    return;
  }

  // Sedan production line
  director.setProductionLine(
    new SedanProductionLine({
      factory: new MastodonSedanCarFactory(),
    })
  );

  director.constructCvtEdition();
  const mastodonSedanCvt = director.productionLine.build();
  console.log('--- Mastodon Sedan CVT ---\n');
  console.log(mastodonSedanCvt);

  director.constructSignatureEdition();
  const mastodonSedanSignature = director.productionLine.build();
  console.log('\n--- Mastodon Sedan Signature ---\n');
  console.log(mastodonSedanSignature);

  // Hatchback production line
  director.setProductionLine(
    new HatchbackProductionLine({
      factory: new MastodonHatchbackCarFactory(),
    })
  );

  director.constructCvtEdition();
  const mastodonHatchbackCvt = director.productionLine.build();
  console.log('\n--- Mastodon Hatchback CVT ---\n');
  console.log(mastodonHatchbackCvt);

  director.constructSignatureEdition();
  const mastodonHatchbackSignature = director.productionLine.build();
  console.log('\n--- Mastodon Hatchback Signature ---\n');
  console.log(mastodonHatchbackSignature);

  // Build sport edition
  director.constructSportEdition();
  const mastodonHatchbackSport = director.productionLine.build();
  console.log('\n--- Mastodon Hatchback Sport ---\n');
  console.log(mastodonHatchbackSport);
}

appBuilder(new Director());
