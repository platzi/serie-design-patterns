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
class Account {
  constructor(owner, money) {
    this._owner = owner;
    this._money = money;
  }

  get owner() {
    return this._owner;
  }

  set owner(owner) {
    this._owner = owner;
  }

  get money() {
    return this._money;
  }

    set money(money) {
    this._money = money;
  }
}

class Bank {
  constructor() {
    this._accounts = [];
    // instance prop is added with dot notation
    if(typeof Bank._instance === "object") {
      return Bank._instance;
    }
   
    // Only the first version of the instance is being assigned
    Bank._instance = this;
    return this;
  }

  get accounts() {
    return this._accounts;
  }

  addNewAccount(account) {
    this._accounts.push(account);
  }
}
   
const bankFirstInstance = new Bank();
bankFirstInstance.addNewAccount(new Account("Yor Forger", 300));
const bankSecondInstance = new Bank();
bankSecondInstance.addNewAccount(new Account("Loid Forger", 200));
   
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
  