/**
 * The Builder interface specifies methods for creating the different parts of
 * the Product objects.
 */
interface Builder {
    setSeats(number: number): void;
    setEngine(engine: string): void;
    setGps(gps: boolean): void;
}

/**
 * The Concrete Builder classes follow the Builder interface and provide
 * specific implementations of the building steps. Your program may have several
 * variations of Builders, implemented differently.
 */
class ConcreteBuilderCar implements Builder {
    private car: Car;

    /**
     * A fresh builder instance should contain a blank product object, which is
     * used in further assembly.
     */
    constructor() {
        this.reset();
    }

    public reset(): void {
        this.car = new Car();
    }

    /**
     * All production steps work with the same product instance.
     */
    public setSeats(number: number): void {
        this.car.parts.push(`Add ${number} seats`);
    }

    public setEngine(engine:  string): void {
        this.car.parts.push(`Add ${engine} engine`);
    }

    public setGps(gps: boolean): void {
        this.car.parts.push( gps ? 'Add GPS' : 'No GPS');
    }

    /**
     * Concrete Builders are supposed to provide their own methods for
     * retrieving results. That's because various types of builders may create
     * entirely different products that don't follow the same interface.
     * Therefore, such methods cannot be declared in the base Builder interface
     * (at least in a statically typed programming language).
     *
     * Usually, after returning the end result to the client, a builder instance
     * is expected to be ready to start producing another product. That's why
     * it's a usual practice to call the reset method at the end of the
     * `getProduct` method body. However, this behavior is not mandatory, and
     * you can make your builders wait for an explicit reset call from the
     * client code before disposing of the previous result.
     */
    public getCar(): Car {
        const result = this.car;
        this.reset();
        return result;
    }
}

/**
 * It makes sense to use the Builder pattern only when your products are quite
 * complex and require extensive configuration.
 *
 * Unlike in other creational patterns, different concrete builders can produce
 * unrelated products. In other words, results of various builders may not
 * always follow the same interface.
 */
class Car {
    public parts: string[] = [];

    public listParts(): void {
        console.log(`Car parts: ${this.parts.join(', ')}\n`);
    }
}

/**
 * The Director is only responsible for executing the building steps in a
 * particular sequence. It is helpful when producing products according to a
 * specific order or configuration. Strictly speaking, the Director class is
 * optional, since the client can control builders directly.
 */
class Director {
    private builder: Builder;

    /**
     * The Director works with any builder instance that the client code passes
     * to it. This way, the client code may alter the final type of the newly
     * assembled product.
     */
    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }

    /**
     * The Director can construct several product variations using the same
     * building steps.
     */
    public buildMinimalManualCar(): void {
        this.builder.setSeats(2);
        this.builder.setEngine('v6');
        this.builder.setGps(false);
    }

    public buildFullFeaturedCar(engine: string): void {
        this.builder.setSeats(4);
        this.builder.setEngine(engine);
        this.builder.setGps(true);
    }
}

/**
 * The client code creates a builder object, passes it to the director and then
 * initiates the construction process. The end result is retrieved from the
 * builder object.
 */
function clientCode(director: Director) {
    const builder = new ConcreteBuilderCar();
    director.setBuilder(builder);

    console.log('Standard basic car:');
    director.buildMinimalManualCar();
    builder.getCar().listParts();

    console.log('Standard full featured car:');
    director.buildFullFeaturedCar('automatic');
    builder.getCar().listParts();

    // Remember, the Builder pattern can be used without a Director class.
    console.log('Custom car:');
    builder.setSeats(0);
    builder.setEngine('v8');
    builder.getCar().listParts();
}

const director = new Director();
clientCode(director);