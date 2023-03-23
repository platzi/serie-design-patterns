/**
 *
 * Abstract Factory challenge:
 *
 * Make factories families that implement the creation of each product.
 *
 * Steps followed to implement the solution:
 *
 * 1. Add base products clases for each component
 * 2. Add concrete products classes for each version of the components
 *  to be used in each device
 * 3. Add DeviceFactory abstract factory class
 * 4. Add concrete implementations of DeviceFactory for each device
 *  and implement the creation method for each component
 */

// ----- Base products -----

class CPU {
  setSeries(series) {
    throw new Error('Method not implemented!');
  }
}

class Memory {
  setCapacityInGB(capacity) {
    throw new Error('Method not implemented!');
  }
}

class Display {
  setResolution() {
    throw new Error('Method not implemented!');
  }
}

// ----- Concrete products -----

// ***** CPU *****

class MobileCPU extends CPU {
  /**
   * @override setSeries() method
   */
  setSeries(series) {
    console.log(`[MOBILE] ${series}`);
  }
}

class LaptopCPU extends CPU {
  /**
   * @override setSeries() method
   */
  setSeries(series) {
    console.log(`[LAPTOP] ${series}`);
  }
}

// ***** Memory *****

class MobileMemory extends Memory {
  /**
   * @override setCapacityInGB() method
   */
  setCapacityInGB(capacity) {
    console.log(`[MOBILE] ${capacity}GB`);
  }
}

class LaptopMemory extends Memory {
  /**
   * @override setCapacityInGB() method
   */
  setCapacityInGB(capacity) {
    console.log(`[LAPTOP] ${capacity}GB`);
  }
}

// ***** Display *****

class PhoneDisplay extends Display {
  /**
   * @override setResolution() method
   */
  setResolution() {
    console.log(`[PHONE] 2340x1080`);
  }
}

class TabletDisplay extends Display {
  /**
   * @override setResolution() method
   */
  setResolution() {
    console.log(`[TABLET] 2048x1536`);
  }
}

class LaptopDisplay extends Display {
  /**
   * @override setResolution() method
   */
  setResolution() {
    console.log(`[LAPTOP] 2560x1600`);
  }
}

// ----- Abstract factory -----

class DeviceFactory {
  createCPU() {
    throw new Error('Method not implemented!');
  }

  createMemory() {
    throw new Error('Method not implemented!');
  }

  createDisplay() {
    throw new Error('Method not implemented!');
  }
}

// ----- Concrete factories -----

class PhoneDeviceFactory extends DeviceFactory {
  /**
   * @override createCPU() method
   * @returns {MobileCPU} a cpu component to be used in mobile devices
   */
  createCPU() {
    return new MobileCPU();
  }

  /**
   * @override createMemory() method
   * @returns {MobileMemory} a memory component to be used in mobile devices
   */
  createMemory() {
    return new MobileMemory();
  }

  /**
   * @override createDisplay() method
   * @returns {PhoneDisplay} a display component to be used in phone devices
   */
  createDisplay() {
    return new PhoneDisplay();
  }
}

class TabletDeviceFactory extends DeviceFactory {
  /**
   * @override createCPU() method
   * @returns {MobileCPU} a cpu component to be used in mobile devices
   */
  createCPU() {
    return new MobileCPU();
  }

  /**
   * @override createMemory() method
   * @returns {MobileMemory} a memory component to be used in mobile devices
   */
  createMemory() {
    return new MobileMemory();
  }

  /**
   * @override createDisplay() method
   * @returns {TabletDisplay} a display component to be used in phone devices
   */
  createDisplay() {
    return new TabletDisplay();
  }
}

class LaptopDeviceFactory extends DeviceFactory {
  /**
   * @override createCPU() method
   * @returns {LaptopCPU} a cpu component to be used in laptops
   */
  createCPU() {
    return new LaptopCPU();
  }

  /**
   * @override createMemory() method
   * @returns {LaptopCPU} a memory component to be used in laptops
   */
  createMemory() {
    return new LaptopMemory();
  }

  /**
   * @override createDisplay() method
   * @returns {LaptopCPU} a display component to be used in laptops
   */
  createDisplay() {
    return new LaptopDisplay();
  }
}

/**
 *
 * @param {string} type type of factory family to create
 * @returns {PhoneDeviceFactory | TabletDeviceFactory | LaptopDeviceFactory} A device factory instance
 */
function createFactory(type) {
  const factories = {
    phone: PhoneDeviceFactory,
    tablet: TabletDeviceFactory,
    laptop: LaptopDeviceFactory,
  };

  const Factory = factories[type];
  return new Factory();
}

/**
 * Main function
 * @param {{ factory: DeviceFactory, isMobileFactory: boolean }} params devices factory and flag to indicate if is mobile
 */
function appAbstractFactory({ factory, isMobileFactory = true }) {
  console.log('\n--- [JS] Calling appAbstractFactory ---\n');
  if (!factory) {
    console.log('--- No factory provided ---');
    return;
  }

  const cpu = factory.createCPU();
  const memory = factory.createMemory();
  const display = factory.createDisplay();

  cpu.setSeries(isMobileFactory ? 'MB001' : 'LP001');
  memory.setCapacityInGB(isMobileFactory ? 16 : 32);
  display.setResolution();
}

appAbstractFactory({
  factory: createFactory('phone'),
});
appAbstractFactory({
  factory: createFactory('tablet'),
});
appAbstractFactory({
  factory: createFactory('laptop'),
  isMobileFactory: false,
});
