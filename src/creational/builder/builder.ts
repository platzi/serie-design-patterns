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
interface CarProductionLine {
  setAirBags(howMany: number): CarProductionLine;
  setColor(color: AvailableColors): CarProductionLine;
  setEdition(edition: string): CarProductionLine;
  resetProductionLine(): void;
}

/** STEP 2 */
type CarCatalog = 'mastodon' | 'rhino';
type ConstructorParams = { model: CarCatalog };
class SedanProductionLine implements CarProductionLine {
  private sedanCar!: Car;
  private internalModel!: CarCatalog;

  constructor({ model }: ConstructorParams) {
    this.setInternalModel(model);
    this.resetProductionLine();
  }

  setAirBags(howMany: number): SedanProductionLine {
    this.sedanCar.airBags = howMany;
    return this;
  }

  setColor(color: AvailableColors): SedanProductionLine {
    this.sedanCar.color = color;
    return this;
  }

  setEdition(edition: string): SedanProductionLine {
    this.sedanCar.edition = edition;
    return this;
  }

  setInternalModel(model: CarCatalog) {
    this.internalModel = model;
  }

  setModel() {
    this.sedanCar.model = 'sedan';
  }

  // We can use a factory here to determine which model use
  resetProductionLine() {
    this.sedanCar =
      this.internalModel === 'mastodon'
        ? new MastodonCar()
        : new RhinoCar();
  }

  build(): Car {
    this.setModel();
    const sedanCar = this.sedanCar;
    this.resetProductionLine();
    return sedanCar;
  }
}

/** STEP 3 */
type AvailableColors = 'red' | 'black' | 'gray' | 'blue';
class Car {
  private _edition!: string;
  private _model!: string;
  private _airBags: number = 2;
  private _color: AvailableColors = 'black';

  set airBags(howMany: number) {
    this._airBags = howMany;
  }

  set color(color: AvailableColors) {
    this._color = color;
  }

  set edition(edition: string) {
    this._edition = edition;
  }

  set model(model: string) {
    this._model = model;
  }
}

class MastodonCar extends Car {
  constructor() {
    super();
  }
}

class RhinoCar extends Car {
  constructor() {
    super();
  }
}

/** STEP 4 */
class Director {
  private productionLine!: CarProductionLine;

  setProductionLine(productionLine: CarProductionLine) {
    this.productionLine = productionLine;
  }

  constructCvtEdition(): void {
    this.productionLine
      .setAirBags(4)
      .setColor('blue')
      .setEdition('CVT');
  }

  constructSignatureEdition(): void {
    this.productionLine
      .setAirBags(8)
      .setColor('gray')
      .setEdition('Signature');
  }
}

function appBuilder(director: Director) {
  const mastodonSedanProductionLine = new SedanProductionLine({
    model: 'mastodon',
  });

  director.setProductionLine(mastodonSedanProductionLine);
  director.constructCvtEdition();
  const mastodonSedanCvt = mastodonSedanProductionLine.build();
  console.log(mastodonSedanCvt);

  director.constructSignatureEdition();
  const mastodonSedanSignature = mastodonSedanProductionLine.build();
  console.log(mastodonSedanSignature);
}

appBuilder(new Director());

export {};
