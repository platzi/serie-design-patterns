/**
 * Factory Method es un patrón de diseño creacional que
 * proporciona una interfaz para crear objetos en una
 * superclase, mientras permite a las subclases alterar
 * el tipo de objetos que se crearán.
 *
 * Problema: Nuestra fabrica de patitos de hule es muy buena
 * creando patos comunes y corrientes.
 *
 * Un día al CEO se le ocurre la increible idea de sacar un tipo
 * nuevo de pato de hule...el Pato Biónico!
 *
 * Ese fue el momento en el que los programadores sintieron el
 * verdadero terror!
 *
 * Veamos que pasó!
 */

class Factory {
  createDuck(duckType: string) {
    if (duckType === "bionico") {
      return new BionicDuck();
    }

    return new CommonDuck();
  }
}

class CommonDuck {
  quack() {
    console.log("duck common");
  }
}

class BionicDuck {
  quack() {
    console.log("duck bionic");
  }
}

const factory = new Factory().createDuck("common");
