/**
 * How to implement Builder
 *
 * 1. Declare Builder base class/interface who will define
 *  the general steps for build products, each build must
 *  implement these steps.
 *
 *  CarProductionLine
 *      setAirBags
 *      setColor
 *      setEdition
 *      resetProductionLine
 *
 * 2. Implement concrete builders subclasses that offer different
 *  versions of the build steps. These builders could create
 *  concrete products, not abstract ones.
 *
 *  SedanProductionLine: build() -> Car
 *  RhinoProductionLine: build() -> Car
 *
 * 3. Implement Product classes, these ones could not belong
 *  to the same interface or base class.
 *
 *  For the problem we will make the builder returns the
 *  product base class
 *
 *  Class Car
 *  Class MastodonCar
 *  Class RhinoCar
 *
 * 4. Implement director class, this one will know the build
 *  process for each product, so we can create specific
 *  configurations for the products.
 *
 *  Product representations
 *      constructCvtEdition
 *      constructSignatureEdition
 */

/** STEP 1 */
class CarProductionLine {
  setAirBags(airBagsNumber) {
    throw new Error('Method not implemented!');
  }
  setColor(color) {
    throw new Error('Method not implemented!');
  }
  setEdition(edition) {
    throw new Error('Method not implemented!');
  }
  resetProductionLine() {
    throw new Error('Method not implemented!');
  }
}

/** STEP 2 */
class SedanProductionLine extends CarProductionLine {
  constructor({ model }) {
    super();
    this.setInternalModel(model);
    this.resetProductionLine();
  }

  setAirBags(howMany) {
    this.sedanCar.airBags = howMany;
    return this;
  }

  setColor(color) {
    this.sedanCar.color = color;
    return this;
  }

  setEdition(edition) {
    this.sedanCar.edition = edition;
    return this;
  }

  setInternalModel(model) {
    this.internalModel = model;
  }

  setModel() {
    this.sedanCar.model = 'sedan';
  }

  resetProductionLine() {
    this.sedanCar =
      this.internalModel === 'mastodon'
        ? new MastodonCar()
        : new RhinoCar();
  }

  build() {
    // aqui falta llamar al  model
    this.setModel();
    const sedanCar = this.sedanCar;
    this.resetProductionLine();
    return sedanCar;
  }
}

/** STEP 3 */
class Car {
  constructor() {
    this._edition = '';
    this._model = '';
    this._airBags = 2;
    this._color = 'black';
  }

  set airBags(howMany) {
    this._airBags = howMany;
  }

  set color(color) {
    this._color = color;
  }

  set edition(edition) {
    this._edition = edition;
  }

  set model(model) {
    this._model = model;
  }
}

class MastodonCar extends Car {
  constructor() {
    super();
  }
}

/** STEP 4 */
class Director {
  setProductionLine(productionLine) {
    this.productionLine = productionLine;
  }

  constructCvtEdition() {
    this.productionLine
      .setAirBags(4)
      .setColor('blue')
      .setEdition('CVT');
  }

  constructSignatureEdition() {
    this.productionLine
      .setAirBags(8)
      .setColor('red')
      .setEdition('Signature');
  }
}

function appBuilder(director) {
  const mastodonSedanProductionLine = new SedanProductionLine({
    model: 'mastodon',
  });

  director.setProductionLine(mastodonSedanProductionLine);
  director.constructCvtEdition();
  const mastodnSedanCvt = mastodonSedanProductionLine.build();
  console.log(mastodnSedanCvt);

  director.constructSignatureEdition();
  const mastodnSedanSignature = mastodonSedanProductionLine.build();
  console.log(mastodnSedanSignature);
}

appBuilder(new Director());
