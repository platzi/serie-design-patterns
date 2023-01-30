/**
 * How to implement Prototype?
 *
 * 1. Declare a base class/interface prototype that contains
 *  clone methods
 * 2. Create concrete products who inherits/implements from
 *  prototype class
 */

class Car {
  constructor({ edition, model, airBags, color } = {}) {
    this._edition = edition || 'default';
    this._model = model || '';
    this._airBags = airBags || 0;
    this._color = color || 'default';
  }

  set airBags(howMany) {
    this._airBags = howMany;
  }

  set color(color) {
    this._color = color;
  }

  set model(model) {
    this._model = model;
  }

  set edition(edition) {
    this._edition = edition;
  }

  get airBags() {
    return this._airBags;
  }

  get color() {
    return this._color;
  }

  get model() {
    return this._model;
  }

  get edition() {
    return this._edition;
  }

  /** STEP 1 */
  clone() {
    throw new Error('Method not implemented!');
  }
}

/** STEP 2 */
class MastodonCar extends Car {
  constructor(carToClone) {
    super({
      edition: carToClone?.edition,
      color: carToClone?.color,
      model: carToClone?.model,
      airBags: carToClone?.airBags,
    });
  }

  clone() {
    return new MastodonCar(this);
  }
}

class Director {
  setProductionLine(productionLine) {
    this.productionLine = productionLine;
  }

  constructCvtEdition() {
    this.productionLine.setAirBags(4);
    this.productionLine.setColor('red');
    this.productionLine.setEditon('CVT');
  }

  constructSignatureEdition() {
    this.productionLine.setAirBags(8);
    this.productionLine.setColor('gray');
    this.productionLine.setEditon('Signature');
  }
}

class CarProductionLine {
  setAirBags(howMany) {
    throw new Error('Method not implemented!');
  }

  setColor(color) {
    throw new Error('Method not implemented!');
  }

  setEditon(edition) {
    throw new Error('Method not implemented!');
  }

  resetProductionLine(newCar) {
    throw new Error('Method not implemented!');
  }
}

/** STEP 2 */
class SedanProductionLine extends CarProductionLine {
  constructor({ factory }) {
    super();
    this.carFactory = factory;
    this.resetProductionLine(this.carFactory.create());
  }

  // We can use a factory here to determine which model use
  resetProductionLine(car) {
    this.sedanCar = car;
  }

  setAirBags(howMany) {
    this.sedanCar.airBags = howMany;
    return this;
  }

  setColor(color) {
    this.sedanCar.color = color;
    return this;
  }

  setEditon(edition) {
    this.sedanCar.edition = edition;
    return this;
  }

  /**
   * This method is not part of the original
   * production line
   */
  setModel() {
    this.sedanCar.model = 'sedan';
    return this;
  }

  build() {
    this.setModel();
    const sedanCar = this.sedanCar;
    this.resetProductionLine(this.carFactory.create());
    return sedanCar;
  }
}

class Factory {
  create() {
    throw new Error('Method not implemented!');
  }
}

class MastodonCarFactory extends Factory {
  create() {
    return new MastodonCar();
  }
}

function appBuilder(director) {
  const mastodonSedanProductionLine = new SedanProductionLine({
    factory: new MastodonCarFactory(),
  });

  director.setProductionLine(mastodonSedanProductionLine);
  director.constructCvtEdition();
  const mastodonSedanCvt = mastodonSedanProductionLine.build();
  console.log(mastodonSedanCvt);
  const mastodonSedanCvtClone = mastodonSedanCvt.clone();
  console.log(mastodonSedanCvtClone);

  director.constructSignatureEdition();
  const mastodonSedanSignature = mastodonSedanProductionLine.build();
  console.log(mastodonSedanSignature);
  const mastodonSedanSignatureClone = mastodonSedanSignature.clone();
  console.log(mastodonSedanSignatureClone);
}

appBuilder(new Director());
