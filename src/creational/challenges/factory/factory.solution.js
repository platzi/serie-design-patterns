/**
 *
 * Factory Method challenge:
 *
 * Make a HttpAdapters factory.
 *
 * Steps followed to implemente the solution:
 *
 * 1. Add HttpAdapter base product class
 * 2. Add concrete implementation of HttpAdapter: RestHttpAdapter
 * 3. Add HttpAdapterFactory base factory class
 * 4. Add concrete implementation of HttpAdapterFactory: RestHttpAdapterFactory
 */

// ----- Concrete product -----

/**
 * HttpAdapter base class
 */
class HttpAdapter {
  /**
   * @param {string} type adapter type eg. REST, GraphQL
   */
  constructor(type) {
    this._type = type;
  }

  get() {
    console.log('Method not implemented!');
  }

  post() {
    console.log('Method not implemented!');
  }

  put() {
    console.log('Method not implemented!');
  }

  delete() {
    console.log('Method not implemented!');
  }

  /**
   * @returns {string} adapter type
   */
  get type() {
    return this._type;
  }
}

class RestHttpAdapter extends HttpAdapter {
  constructor() {
    super('REST');
  }

  /** @override get() method */
  get() {
    console.log(`[${this.type}] GET method`);
  }

  /** @override post() method */
  post() {
    console.log(`[${this.type}] POST method`);
  }

  /** @override put() method */
  put() {
    console.log(`[${this.type}] PUT method`);
  }

  /** @override delete() method */
  delete() {
    console.log(`[${this.type}] DELETE method`);
  }
}

// ----- Factory -----

class HttpAdapterFactory {
  makeAdapter() {
    throw new Error('Method not implemented!');
  }
}

class RestHttpAdapterFactory extends HttpAdapterFactory {
  /**
   * @override makeAdapter() method
   * @returns HttpAdapter
   */
  makeAdapter() {
    return new RestHttpAdapter();
  }
}

/**
 * Main function
 * @param {HttpAdapterFactory} factory HttpAdapter factory
 */
function appFactory(factory) {
  console.log('--- [JS] Calling appFactory ---\n');

  if (!factory) {
    console.log('--- No factory provided ---');
    return;
  }

  const adapter = factory.makeAdapter();
  console.log(`Http Adapter is ${adapter.type}\n`);
  adapter.get();
  adapter.post();
  adapter.put();
  adapter.delete();
}

/**
 * You could change the Factory as you wish since
 * all of them implement the same behaviour.
 */
appFactory(new RestHttpAdapterFactory());
