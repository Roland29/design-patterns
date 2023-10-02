/**
 * The base Component interface defines operations that can be altered by
 * decorators.
 */
interface DataSource {
  writeData(): string;
  readData(): string;
}

/**
 * Concrete Components provide default implementations of the operations. There
 * might be several variations of these classes.
 */
class FileDataSource implements DataSource {
  public writeData(): string {
    return 'writeData';
  }
  public readData(): string {
    return 'readData';
  }
}

/**
 * The base Decorator class follows the same interface as the other components.
 * The primary purpose of this class is to define the wrapping interface for all
 * concrete decorators. The default implementation of the wrapping code might
 * include a field for storing a wrapped component and the means to initialize
 * it.
 */
class DataSourceDecorator implements DataSource {
  protected component: DataSource;

  constructor(component: DataSource) {
    this.component = component;
  }

  /**
   * The Decorator delegates all work to the wrapped component.
   */
  public writeData(): string {
    return this.component.writeData();
  }

  public readData(): string {
    return this.component.readData();
  }
}

/**
 * Concrete Decorators call the wrapped object and alter its result in some way.
 */
class EncryptionDecorator extends DataSourceDecorator {
  /**
   * Decorators may call parent implementation of the operation, instead of
   * calling the wrapped object directly. This approach simplifies extension
   * of decorator classes.
   */
  public writeData(): string {
    return `EncryptionDecorator(${super.writeData()})`;
  }
}

/**
 * Decorators can execute their behavior either before or after the call to a
 * wrapped object.
 */
class CompressionDecorator extends DataSourceDecorator {
  public readData(): string {
    return `CompressionDecorator(${super.readData()})`;
  }
}

/**
 * The client code works with all objects using the Component interface. This
 * way it can stay independent of the concrete classes of components it works
 * with.
 */
function clientCode(component: DataSource) {
  // ...

  console.log(`RESULT: ${component.readData()}`);
  console.log(`RESULT: ${component.writeData()}`);

  // ...
}

/**
 * This way the client code can support both simple components...
 */
const fileDataSource = new FileDataSource();
console.log("Client: I've got a simple component:");
clientCode(fileDataSource);
console.log('');

/**
 * ...as well as decorated ones.
 *
 * Note how decorators can wrap not only simple components but the other
 * decorators as well.
 */
const decorator1 = new EncryptionDecorator(fileDataSource);
const decorator2 = new CompressionDecorator(decorator1);
console.log("Client: Now I've got a decorated component:");
clientCode(decorator2);
