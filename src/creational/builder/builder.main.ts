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
 *  Change 8: Created a builder.types file and moved some of the type definitions
 *  inside of it.
 *
 *  Change 9: Rename file to builder.main.ts
 */

import {
  AvailableColors,
  CarCatalog,
  EditionsType,
} from '@creational/builder/builder.types';

// STEP 1
interface CarProductionLine {
  setAirBags(howMany: number): CarProductionLine;
  setColor(color: AvailableColors): CarProductionLine;
  setEdition(edition: string): CarProductionLine;
  resetProductionLine(): void;
}

// STEP 2
type ConstructorParams = { modelToCustomizeInLine: CarCatalog };
class SedanProductionLine implements CarProductionLine {
  private sedanCar!: BaseCar;
  private modelToCustomizeInLine!: CarCatalog;

  /**
   * For now the production line class is composed (creating) by the
   * different sedan car models. Ideally the line should receive the
   * sedan car instance as param, an aggregation relationship.
   *
   * @param modelToCustomizeInLine car model to customize in the line
   */
  constructor({ modelToCustomizeInLine }: ConstructorParams) {
    this.setModelToBuild(modelToCustomizeInLine);
    this.resetProductionLine();
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
   * @param {string} model car model to be build in line
   */
  setModelToBuild(model: CarCatalog) {
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
   * Restart production line and returns customized sedan car instance.
   *
   * For this case we decided to set BaseCar as return type.
   *
   * @returns base car instance
   */
  build(): BaseCar {
    const sedanCar = this.sedanCar;
    this.resetProductionLine();
    return sedanCar;
  }
}

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
    this.productionLine.setAirBags(4).setColor('blue').setEdition('CVT');
  }

  /**
   * Sedan Signature Edition customization steps
   */
  constructSignatureEdition(): void {
    this.productionLine
      .setAirBags(8)
      .setColor('gray')
      .setEdition('Signature');
  }
}

/**
 * Main function
 */
function appBuilder(director: Director) {
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
  const mastodonSedanCvt = mastodonSedanProductionLine.build();
  console.log('--- Mastodon Sedan CVT ---');
  console.log(mastodonSedanCvt);

  director.constructSignatureEdition();
  const mastodonSedanSignature = mastodonSedanProductionLine.build();
  console.log('--- Mastodon Sedan Signature ---');
  console.log(mastodonSedanSignature);
}

appBuilder(new Director());

// This is not relevant for the course, don't worry about this
export {};
