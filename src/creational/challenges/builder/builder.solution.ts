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

type AvailableColors = 'red' | 'black' | 'gray' | 'blue' | 'default';
type ConstructorParams = { factory: CarFactory };
type EditionsType = 'cvt' | 'signature' | 'sport' | 'default';
class CarProductionLine {
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

// ----- Concrete builders ----

/**
 * In this case we didn't need to override any of the methods of
 * CarProductionLine, even we can use only the base class but
 * just to be more explicit we declare both production line classs.
 */

class SedanProductionLine extends CarProductionLine {}
class HatchbackProductionLine extends CarProductionLine {}

// ----- Base product

// STEP 3
class BaseCar {
  private _edition!: EditionsType;
  private _model!: string;
  private _airBags: number = 2;
  private _color: AvailableColors = 'black';

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
   * Base car edition attribute setter
   * @param {string} edition car edition
   */
  set edition(edition: EditionsType) {
    this._edition = edition;
  }

  /**
   * Base car model attribute setter
   * @param {string} model car model (sedan/hatchbak)
   */
  set model(model: string) {
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

interface CarFactory {
  create(): BaseCar;
}

// ----- Concrete factories -----

class MastodonSedanCarFactory implements CarFactory {
  create(): BaseCar {
    return new MastodonSedanCar();
  }
}

class MastodonHatchbackCarFactory implements CarFactory {
  create(): BaseCar {
    return new MastodonHatchbackCar();
  }
}

// ----- Director -----

export class Director {
  private _productionLine!: CarProductionLine;

  /**
   * Set the production line to be used for the director to build editions
   * @param productionLine contains concrete customization steps implementation
   */
  setProductionLine(productionLine: CarProductionLine) {
    this._productionLine = productionLine;
  }

  /**
   * Add this getter method to return prodcution line
   * @returns production line used by director
   */
  get productionLine() {
    return this._productionLine;
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
function appBuilder(director: Director) {
  console.log('--- [TS] Calling appBuilder ---\n');

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

// This is not relevant for the course, don't worry about this
export {};
