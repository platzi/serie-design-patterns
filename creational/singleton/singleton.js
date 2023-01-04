class Singleton {
  constructor(prop) {
    this.prop = prop;
 
    // instance prop is added with dot notation
    if(typeof Singleton.instance === "object") {
      return Singleton.instance;
    }
 
    // Only the first version of the instance is being assigned
    Singleton.instance = this;
    return this;
  }
}
 
const obj = new Singleton("first version");
const obj2 = new Singleton("second version");
 
console.log(obj === obj2); // true
