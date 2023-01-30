/**
 * How to implement Singleton?
 *
 * 1. Make the constructor private
 * 2. Create a static method who calls the private
 *  constructor and save the instance in a static variable
 */
class SingletonTS {
  private static instance: SingletonTS;
  private version: string;

  private constructor(version: string) {
    this.version = version;
  }

  static getInstance(version: string): SingletonTS {
    if (!SingletonTS.instance) {
      SingletonTS.instance = new SingletonTS(version);
    }

    return SingletonTS.instance;
  }

  getVersion(): string {
    return this.version;
  }
}

function appSingletonTS() {
  const singleton1 = SingletonTS.getInstance('version-1');
  const singleton2 = SingletonTS.getInstance('version-2');
  const singleton3 = SingletonTS.getInstance('version-3');

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

appSingletonTS();
