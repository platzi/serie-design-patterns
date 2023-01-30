/**
 * How to implement Prototype?
 *
 * 1. Declare a base class/interface prototype that contains
 *  clone methods
 * 2. Create concrete products who inherits/implements from
 *  prototype class
 */

type AvailableColors = 'red' | 'black' | 'gray' | 'default';
type EditionsType = 'cvt' | 'signature' | 'default';
type CarConstructorParams = {
  edition: EditionsType;
  model: string;
  airBags: number;
  color: AvailableColors;
};
abstract class Car {
  private _edition: EditionsType;
  private _model: string;
  private _airBags: number;
  private _color: AvailableColors;

  constructor({
    edition,
    model,
    airBags,
    color,
  }: CarConstructorParams) {
    this._edition = edition || 'default';
    this._model = model || '';
    this._airBags = airBags || 0;
    this._color = color || 'default';
  }

  set airBags(howMany: number) {
    this._airBags = howMany;
  }

  set color(color: AvailableColors) {
    this._color = color;
  }

  set model(model: string) {
    this._model = model;
  }

  set edition(edition: 'cvt' | 'signature' | 'default') {
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
  abstract clone(): Car;
}

class MastodonCar extends Car {
  constructor(carToClone?: MastodonCar);
  constructor(carToClone: MastodonCar) {
    super({
      edition: carToClone?.edition,
      color: carToClone?.color,
      model: carToClone?.model,
      airBags: carToClone?.airBags,
    });
  }

  /** STEP 2 */
  clone(): MastodonCar {
    return new MastodonCar(this);
  }
}

class Director {
  private productionLine!: CarProductionLine;

  setProductionLine(productionLine: CarProductionLine) {
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

interface CarProductionLine {
  setAirBags(howMany: number): void;
  setColor(color: AvailableColors): void;
  setEditon(edition: string): void;
  resetProductionLine(car: Car): void;
}

type ConstructorParams = { factory: Factory };
class SedanProductionLine implements CarProductionLine {
  private sedanCar!: Car;
  private carFactory!: Factory;

  constructor({ factory }: ConstructorParams) {
    this.carFactory = factory;
    this.resetProductionLine(this.carFactory.create());
  }

  // We can use a factory here to determine which model use
  resetProductionLine(car: Car) {
    this.sedanCar = car;
  }

  setAirBags(howMany: number): SedanProductionLine {
    this.sedanCar.airBags = howMany;
    return this;
  }

  setColor(color: AvailableColors): SedanProductionLine {
    this.sedanCar.color = color;
    return this;
  }

  setEditon(edition: 'cvt' | 'signature'): SedanProductionLine {
    this.sedanCar.edition = edition;
    return this;
  }

  // This method is not part of the production line
  setModel(): SedanProductionLine {
    this.sedanCar.model = 'sedan';
    return this;
  }

  build(): Car {
    this.setModel();
    const sedanCar = this.sedanCar;
    this.resetProductionLine(this.carFactory.create());
    return sedanCar;
  }
}

interface Factory {
  create(): Car;
}

class MastodonCarFactory implements Factory {
  create(): Car {
    return new MastodonCar();
  }
}

function appBuilder(director: Director) {
  const mastodonSedanProductionLine = new SedanProductionLine({
    factory: new MastodonCarFactory(),
  });

  director.setProductionLine(mastodonSedanProductionLine);
  director.constructCvtEdition();
  const mastodonSedanCvt = mastodonSedanProductionLine.build();
  console.log(mastodonSedanCvt);
  const mastodonSedanCvtPrototype = mastodonSedanCvt.clone();
  console.log(mastodonSedanCvtPrototype);

  director.constructSignatureEdition();
  const mastodonSedanSignature = mastodonSedanProductionLine.build();
  console.log(mastodonSedanSignature);
  const mastodonSedanSignaturePrototype =
    mastodonSedanSignature.clone();
  console.log(mastodonSedanSignaturePrototype);
}

appBuilder(new Director());

export {};
