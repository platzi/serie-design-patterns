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

interface CPU {
  setSeries(series: string): void;
}

interface Memory {
  setCapacityInGB(capacity: number): void;
}

interface Display {
  setResolution(): void;
}

// ----- Concrete products -----

// ***** CPU *****

class MobileCPU implements CPU {
  /**
   * @override setSeries() method
   */
  setSeries(series: string) {
    console.log(`[MOBILE] ${series}`);
  }
}

class LaptopCPU implements CPU {
  /**
   * @override setSeries() method
   */
  setSeries(series: string) {
    console.log(`[LAPTOP] ${series}`);
  }
}

// ***** Memory *****

class MobileMemory implements Memory {
  /**
   * @override setCapacityInGB() method
   */
  setCapacityInGB(capacity: number) {
    console.log(`[MOBILE] ${capacity}GB`);
  }
}

class LaptopMemory implements Memory {
  /**
   * @override setCapacityInGB() method
   */
  setCapacityInGB(capacity: number) {
    console.log(`[LAPTOP] ${capacity}GB`);
  }
}

// ***** Display *****

class PhoneDisplay implements Display {
  /**
   * @override setResolution() method
   */
  setResolution() {
    console.log(`[PHONE] 2340x1080`);
  }
}

class TabletDisplay implements Display {
  /**
   * @override setResolution() method
   */
  setResolution() {
    console.log(`[TABLET] 2048x1536`);
  }
}

class LaptopDisplay implements Display {
  /**
   * @override setResolution() method
   */
  setResolution() {
    console.log(`[LAPTOP] 2560x1600`);
  }
}

// ----- Abstract factory -----

interface DeviceFactory {
  createCPU(): CPU;
  createMemory(): Memory;
  createDisplay(): Display;
}

// ----- Concrete factories -----

class PhoneDeviceFactory implements DeviceFactory {
  /**
   * @override createCPU() method
   * @returns a cpu component to be used in mobile devices
   */
  createCPU() {
    return new MobileCPU();
  }

  /**
   * @override createMemory() method
   * @returns a memory component to be used in mobile devices
   */
  createMemory() {
    return new MobileMemory();
  }

  /**
   * @override createDisplay() method
   * @returns a display component to be used in phone devices
   */
  createDisplay() {
    return new PhoneDisplay();
  }
}

class TabletDeviceFactory implements DeviceFactory {
  /**
   * @override createCPU() method
   * @returns a cpu component to be used in mobile devices
   */
  createCPU() {
    return new MobileCPU();
  }

  /**
   * @override createMemory() method
   * @returns a memory component to be used in mobile devices
   */
  createMemory() {
    return new MobileMemory();
  }

  /**
   * @override createDisplay() method
   * @returns a display component to be used in phone devices
   */
  createDisplay() {
    return new TabletDisplay();
  }
}

class LaptopDeviceFactory implements DeviceFactory {
  /**
   * @override createCPU() method
   * @returns a cpu component to be used in laptops
   */
  createCPU() {
    return new LaptopCPU();
  }

  /**
   * @override createMemory() method
   * @returns a memory component to be used in laptops
   */
  createMemory() {
    return new LaptopMemory();
  }

  /**
   * @override createDisplay() method
   * @returns a display component to be used in laptops
   */
  createDisplay() {
    return new LaptopDisplay();
  }
}

type FactoryType = 'phone' | 'tablet' | 'laptop';
/**
 *
 * @param type type of factory family to create
 * @returns A device factory instance
 */
function createFactory(name: FactoryType): DeviceFactory {
  const factories = {
    phone: PhoneDeviceFactory,
    tablet: TabletDeviceFactory,
    laptop: LaptopDeviceFactory,
  };

  const Factory = factories[name];
  return new Factory();
}

/**
 * Main function
 * @param {Params} params devices factory and flag to indicate if is mobile
 */
type Params = { factory: DeviceFactory; isMobileFactory?: boolean };
function appAbstractFactory({
  factory,
  isMobileFactory = true,
}: Params) {
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
