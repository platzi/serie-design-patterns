/**
 * How to implement Singleton?
 *
 * 1. Make the constructor method private. This help us to avoid the use of new() operator.
 * 2. Create a static method that works as constructor. Behind scenes, this will call the private
 * constructor to create an instance and save it in a static attribute.
 */
class SingletonN {
  // static to be used without an instance
  private static _instance: SingletonN;

  // Only available inside of the class
  private constructor() {}

  /**
   * This static creation method acts as a constructor.
   * Internally calls the private constructor to create a new class instance and saves it in a static field.
   * All following calls to this method return the cached object.
   */
  public static getInstance() {
    if (!this._instance) {
      SingletonN._instance = new SingletonN();
    }

    return this._instance;
  }
}

function appSingletonN() {
  const obj1 = SingletonN.getInstance();
  const obj2 = SingletonN.getInstance();
  // const obj3 = new SingletonN(); // Not possible since constructor is private

  console.log(obj1 === obj2); // true
}

appSingletonN();
