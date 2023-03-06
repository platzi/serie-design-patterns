/**
 * Account Class
 *
 * Besides the class diagram says we need to have getters and setters
 * function with specific names, we can use the get and set keywords
 * to implement them in a more "javascriptic" way.
 *
 * Using them we can access props with dot notation, eg:
 *
 * account.owner
 * account.money
 *
 * And we can modify the values of the instance using the same idea, eg:
 *
 * account.owner = "New Owner"
 * account.money = 42
 */

/**
 * Class that represents a bank account.
 *
 * Receives two parameters for creation:
 *
 *  owner: string
 *  money: number
 */
class Account {
  constructor(owner, money) {
    this._owner = owner;
    this._money = money;
  }

  /**
   * Account owner attribute getter
   * @returns {string} customer name
   */
  get owner() {
    return this._owner;
  }

  /**
   * Account owner attribute setter
   * @param {string} owner customer name
   */
  set owner(owner) {
    this._owner = owner;
  }

  /**
   * Account money attribute getter
   * @returns {number} customer money
   */
  get money() {
    return this._money;
  }

  /**
   * Account money attribute setter
   * @param {number} money customer money
   */
  set money(money) {
    this._money = money;
  }
}

class Bank {
  // static to be used without an instance
  static _instance = undefined;

  constructor() {
    // Hyphen (_) used here for name the getter as "accounts" and not have a conflict
    this._accounts = [];
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
    if (!Bank._instance) {
      Bank._instance = new Bank();
    }

    return Bank._instance;
  }

  /**
   * Return customer accounts
   * @returns {Account[]} customers accounts
   */
  get accounts() {
    return this._accounts;
  }

  /**
   * Add new account to bank accounts list
   * @param {Account} account new customer account
   */
  addNewAccount(account) {
    this._accounts.push(account);
  }
}

function appSingleton() {
  const bankFirstInstance = Bank.getInstance();
  bankFirstInstance.addNewAccount(new Account('Yor Forger', 300));
  const bankSecondInstance = Bank.getInstance();
  bankSecondInstance.addNewAccount(new Account('Loid Forger', 200));

  /**
   * This will be true! The same instance in being referenced for both
   * variables.
   */
  console.log(bankFirstInstance === bankSecondInstance); // true
  /**
   * This will be true too!
   * The pointer in memory is pointing to the same spot in the memory.
   */
  console.log(bankFirstInstance.accounts === bankSecondInstance.accounts);
}

appSingleton();
