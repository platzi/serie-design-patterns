/**
 * How to implement Singleton?
 *
 * 1. Make the constructor private
 * 2. Create a static method who calls the private
 *  constructor and save the instance in a static variable
 */

class Singleton {
  static instance = undefined;

  /**
   * Constructor method, not private for syntax reasons, to be called
   * for static method
   * @param version value that represents the version of the instance
   */

  // STEP 1
  constructor(version) {
    this._version = version;
  }

  /**
   * Static method that returns unique created instance or create it
   * @param version used only to help us to differentiate the instances
   * @returns {Singleton} unique Singleton instance
   */

  // STEP 2
  static getInstance(version) {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(version);
    }

    return Singleton.instance;
  }

  /**
   * Singleton version attribute getter
   * @returns the version of the instance
   */
  get version() {
    return this._version;
  }
}

function appSingleton() {
  console.log('--- [JS] Calling appSingleton ---');
  const singleton1 = Singleton.getInstance('version-1');
  const singleton2 = Singleton.getInstance('version-2');
  const singleton3 = Singleton.getInstance('version-3');

  console.log(
    `singleton1 and singleton2 are equal? ${
      singleton1 === singleton2 ? 'yes' : 'no'
    }`
  );
  console.log(
    `singleton2 and singleton3 are equal? ${
      singleton2 === singleton3 ? 'yes' : 'no'
    }`
  );

  // Let's verify if the versions are equal too
  console.log(`singleton1 version: ${singleton1.version}`);
  console.log(`singleton2 version: ${singleton2.version}`);
  console.log(`singleton3 version: ${singleton3.version}`);
}

appSingleton();
