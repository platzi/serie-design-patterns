/**
 * How to implement Builder
 *
 * 1. Declare base builder base class/interface who will define
 *  the general steps for build products, each builder must
 *  implement functionality for these steps.
 *
 * Base builder:
 *  - CarProductionLine
 *
 * Build steps:
 *  - setAirBags
 *  - setColor
 *  - setEdition
 *  - resetProductionLine
 *
 * 2. Implement concrete builders subclasses that offer different
 *  versions of the build steps. These builders could create
 *  concrete products or base ones. Depends on what we need.
 *
 *  SedanProductionLine: build() -> {Mastodon|Rhino}Car | Car
 *  RhinoProductionLine: build() -> {Mastodon|Rhino}Car | Car
 *
 * 3. Implement Product classes, these ones could not inherit/implement
 *  from base class/interface.
 *
 *  For the problem we will make the builder returns the
 *  product base class.
 *
 *  Base product:
 *    - BaseCar
 *
 *  Concrete products:
 *    - MastodonSedanCar
 *    - RhinoSedanCar
 *
 * 4. Implement director class, this one will know the build
 *  process for each product, so we can create specific
 *  configurations for the products.
 *
 *  Product representations
 *      constructCvtEdition
 *      constructSignatureEdition
 *
 * Notes:
 *  The code of this file has some modifications with the version showed
 *  during the course.
 *
 *  Change 1: In resetProductionLine function, the cars to be created
 *  must be sedan cars (mastodon sedan, rhino sedan), since the production
 *  line don't create sedans, but receive and personalize sedan cars to
 *  match different versions (CVT, Signature).
 *
 *  Change 2: Rename model to modelToCustomizeInLine as the param to be passed
 *  in production line object creation.
 *
 *  Change 3: Rename Car class to BaseCar.
 *
 *  Change 4: Rename class MastodonCar to MastodonSedanCar.
 *
 *  Change 5: Rename class RhinoCar to RhinoSedanCar.
 *
 *  Change 6: Delete function setModel and remove function call at build
 *  method in SedanProductionLine class. Make the model assignment directly
 *  in Mastodon and Rhino car classes constructors.
 *
 *  Change 7: Add more comments to code.
 *
 *  Change 8: Rename file to builder.main.js
 */

// STEP 1
class CarProductionLine {
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
   * @param {number} edition sedan edition to be set to car
   */
  setEdition(edition) {
    throw new Error('Method not implemented!');
  }

  /**
   * Emulates how the production line receives a new
   * car to work.
   */
  resetProductionLine() {
    throw new Error('Method not implemented!');
  }
}

// STEP 2
class SedanProductionLine extends CarProductionLine {
  /**
   * For now the production line class is composed (creating) by the
   * different sedan car models. Ideally the line should receive the
   * sedan car instance as param, an aggregation relationship.
   *
   * @param {string} modelToCustomizeInLine car model to customize in the line
   */
  constructor({ modelToCustomizeInLine }) {
    super();
    this.setModelToBuild(modelToCustomizeInLine);
    this.resetProductionLine();
  }

  /**
   * @override setAirBags() method
   * @param {number} howMany aribags number
   * @returns {SedanProductionLine} production line working instance
   */
  setAirBags(howMany) {
    this.sedanCar.airBags = howMany;
    return this;
  }

  /**
   * @override setColor() method
   * @param {string} color car color
   * @returns {SedanProductionLine} production line working instance
   */
  setColor(color) {
    this.sedanCar.color = color;
    return this;
  }

  /**
   * @override setEdition() method
   * @param {string} edition car edition
   * @returns {SedanProductionLine} production line working instance
   */
  setEdition(edition) {
    this.sedanCar.edition = edition;
    return this;
  }

  /**
   * @param {string} model car model to be build in line
   */
  setModelToBuild(model) {
    this.modelToCustomizeInLine = model;
  }

  /**
   * Emulates how the production line receives a new
   * sedan car to be customized for match the desired editions.
   */
  resetProductionLine() {
    this.sedanCar =
      this.modelToCustomizeInLine === 'mastodon'
        ? new MastodonSedanCar()
        : new RhinoSedanCar();
  }

  /**
   * Restart production line and returns customized sedan car instance
   * @returns {MastodonSedanCar | RhinoSedanCar} sedan car instance
   */
  build() {
    const sedanCar = this.sedanCar;
    this.resetProductionLine();
    return sedanCar;
  }
}

// STEP 3
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

class MastodonSedanCar extends BaseCar {
  constructor() {
    super();
    this.model = 'sedan';
  }
}

class RhinoSedanCar extends BaseCar {
  constructor() {
    super();
    this.model = 'sedan';
  }
}

// STEP 4
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
    this.productionLine
      .setAirBags(4)
      .setColor('blue')
      .setEdition('CVT');
  }

  /**
   * Sedan Signature Edition customization steps
   */
  constructSignatureEdition() {
    this.productionLine
      .setAirBags(8)
      .setColor('red')
      .setEdition('Signature');
  }
}

/**
 * Main function
 */
function appBuilder(director) {
  console.log('--- [JS] Calling appBuilder ---');

  if (!director) {
    console.log('--- No director provided ---');
    return;
  }

  const mastodonSedanProductionLine = new SedanProductionLine({
    modelToCustomizeInLine: 'mastodon',
  });

  director.setProductionLine(mastodonSedanProductionLine);

  director.constructCvtEdition();
  const mastodnSedanCvt = mastodonSedanProductionLine.build();
  console.log('--- Mastodon Sedan CVT ---');
  console.log(mastodnSedanCvt);

  director.constructSignatureEdition();
  const mastodonSedanSignature = mastodonSedanProductionLine.build();
  console.log('--- Mastodon Sedan Signature ---');
  console.log(mastodonSedanSignature);
}

appBuilder(new Director());
