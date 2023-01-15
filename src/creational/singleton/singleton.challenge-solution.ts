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
  private _owner: string;
  private _money: number;

  constructor(owner: string, money: number) {
    this._owner = owner;
    this._money = money;
  }

  public get owner(): string {
    return this._owner;
  }

  public set owner(owner: string) {
    this._owner = owner;
  }

  public get money(): number {
    return this._money;
  }

  public set money(money: number) {
    this._money = money;
  }
}

class Bank {
  // static to be used without an instance
  private static _instance: Bank;
  private _accounts: Array<Account> = [];

  // Only available inside of the class
  private constructor() {}

  /**
   * This static creation method acts as a constructor.
   * Internally calls the private constructor to create a new class instance and saves it in a static field.
   * All following calls to this method return the cached object.
   */
  public static getInstance() {
    if (!this._instance) {
      Bank._instance = new Bank();
    }

    return this._instance;
  }

  public addNewAccount(account: Account) {
    this._accounts.push(account);
  }

  public get accounts(): Array<Account> {
    return this._accounts;
  }
}

const bankFirstInstance = Bank.getInstance();
bankFirstInstance.addNewAccount(new Account("Yor Forger", 300));
const bankSecondInstance = Bank.getInstance();
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

/**
 * "The export {} statement indicates that the file is an ES module.
 * In TypeScript, any file containing a top-level import or export
 * is considered to be a module.
 *
 * Without top-level import or export declarations, the file gets treated
 * as a script whose contents are available in the global scope (and to other modules).
 *
 * This is what causes the name clash between our name variable and the name variable declared in TypeScript global typings.
 * Another way to fix this is to use another name to declare the variable that does not clash with the global typings."
 *
 * This answer comes from:
 * https://codingbeautydev.com/blog/typescript-cannot-redeclare-block-scoped-variable/
 */
export {};
