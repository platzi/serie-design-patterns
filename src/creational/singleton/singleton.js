/**
 * How to implement Singleton?
 *
 * 1. Make the constructor method private. This help us to avoid the use of new() operator.
 * 2. Create a static method that works as constructor. Behind scenes, this will call the private
 * constructor to create an instance and save it in a static attribute.
 */
class Singleton {
  constructor(prop) {
    this.prop = prop;

    // instance prop is added with dot notation
    if (typeof Singleton.instance === "object") {
      return Singleton.instance;
    }

    // Only the first version of the instance is being assigned
    Singleton.instance = this;
    return this;
  }
}

function appSingleton() {
  const obj = new Singleton("first version");
  const obj2 = new Singleton("second version");

  console.log(obj === obj2); // true
}
