class Singleton {
    // static to be used without an instance
    private static _instance: Singleton;
 
    // Only available inside of the class
    private constructor() {}
 
    /**
     * This static creation method acts as a constructor. 
     * Internally calls the private constructor to create a new class instance and saves it in a static field. 
     * All following calls to this method return the cached object.
     */
    public static getInstance() {
        if(!this._instance) {
            Singleton._instance = new Singleton();
        }
 
        return this._instance;
    }
}
 
const obj1 = Singleton.getInstance();
const obj2 = Singleton.getInstance();
const obj3 = new Singleton(); // Not possible since constructor is private
 
console.log(obj1 === obj2); // true
