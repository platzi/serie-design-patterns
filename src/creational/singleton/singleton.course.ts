/**
 * How to implement Singleton?
 *
 * 1. Make the constructor method private. This help us to avoid the use of new() operator.
 * 2. Create a static method that works as constructor. Behind scenes, this will call the private
 * constructor to create an instance and save it in a static attribute.
 */
class Singleton {}
