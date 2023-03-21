/**
 * Product Class
 *
 * We can access props with dot notation, eg:
 *
 * account.owner
 * account.money
 *
 * And we can modify the values of the instance using the same idea, eg:
 *
 * account.owner = "New Owner"
 * account.money = 42
 */

class Product {
  constructor(id, name, cost) {
    this._id = id;
    this._name = name;
    this._cost = cost;
  }

  /**
   * Product id attribute getter
   * @returns {string} product id
   */
  get id() {
    return this._id;
  }

  /**
   * Product id attribute setter
   * @param {string} id product id
   */
  set id(id) {
    this._id = id;
  }

  /**
   * Product name attribute getter
   * @returns {string} product name
   */
  get name() {
    return this._name;
  }

  /**
   * Product name attribute setter
   * @param {string} name product name
   */
  set name(name) {
    this._name = name;
  }

  /**
   * Product cost attribute getter
   * @returns {number} product cost
   */
  get cost() {
    return this._cost;
  }

  /**
   * Product cost attribute setter
   * @param {number} cost product cost
   */
  set cost(cost) {
    this._cost = cost;
  }
}

class ShoppingCar {
  // static to be used without an instance
  static _instance = undefined;

  constructor() {
    // Hyphen (_) used here for name the getter as "products" and not have a conflict
    this._products = [];
  }

  /**
   * This static creation method acts as a constructor.
   *
   * Internally calls the private constructor to create a new class
   * instance and saves it in a static field.
   *
   * All following calls to this method return the cached object.
   */
  static getInstance() {
    if (!ShoppingCar._instance) {
      ShoppingCar._instance = new ShoppingCar();
    }

    return ShoppingCar._instance;
  }

  /**
   * Return products in shopping car
   * @returns {Product[]} shopping car products
   */
  get products() {
    return this._products;
  }

  /**
   * Add new product to shopping car
   * @param {Product} product new product to be added
   */
  add(product) {
    this._products.push(product);
  }

  /**
   * Delete a product in shopping car
   * @param {string} id product id
   */
  deleteById(id) {
    this._products = this._products.filter(
      (product) => product.id !== id
    );
  }
}

function appSingleton() {
  // Create new shopping car
  const shoppingCar = ShoppingCar.getInstance();

  // First product
  shoppingCar.add(
    new Product(
      'BK001',
      'Design Patterns: Elements of Reusable Object-Oriented Software',
      750
    )
  );

  // Second product
  shoppingCar.add(
    new Product('BK002', 'Introduction to Algorithms', 1000)
  );

  // Get existing shopping car instance
  const shoppingCarNewInstance = ShoppingCar.getInstance();
  shoppingCarNewInstance.add(new Product('BK003', 'Compilers', 900));

  console.log('\n--- Shopping Car products ---\n');
  console.log(shoppingCar.products);

  console.log('\n--- Shopping Car New Instance products ---\n');
  console.log(shoppingCarNewInstance.products);

  // Products list must be the same
  console.log('\n--- Are shopping cars products the same? ---\n');
  console.log(shoppingCar.products === shoppingCarNewInstance.products); // true

  // The number of elements in the list must be the same, in this case 3
  console.log(
    '\n--- Is shopping car number of products in both instances equal? ---\n'
  );
  console.log(
    shoppingCar.products.length ===
      shoppingCarNewInstance.products.length
  );

  // Let's delete second product
  shoppingCarNewInstance.deleteById('BK002');
  console.log('\n--- Product deleted: BK002---\n');

  // The number of elements in the list must be the same, in this case 2
  console.log('\n--- Shopping Car products ---\n');
  console.log(shoppingCar.products);

  console.log('\n--- Shopping Car New Instance products ---\n');
  console.log(shoppingCarNewInstance.products);

  console.log(
    '\n--- Is shopping car number of products in both instances equal? ---\n'
  );
  console.log(
    shoppingCar.products.length ===
      shoppingCarNewInstance.products.length
  );
}

appSingleton();
