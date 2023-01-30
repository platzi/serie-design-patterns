/**
 * How to implement Singleton?
 *
 * 1. Make the constructor private
 * 2. Create a static method who calls the private
 *  constructor and save the instance in a static variable
 */
class Singleton {
  static instance = undefined;

  constructor(version) {
    this.version = version;
  }

  static getInstance(version) {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(version);
    }

    return Singleton.instance;
  }

  getVersion() {
    return this.version;
  }
}

function appSingleton() {
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
  console.log(`singleton1 version: ${singleton1.getVersion()}`);
  console.log(`singleton2 version: ${singleton2.getVersion()}`);
  console.log(`singleton3 version: ${singleton3.getVersion()}`);
}

appSingleton();
