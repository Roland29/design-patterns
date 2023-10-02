/**
 * The Facade class provides a simple interface to the complex logic of one or
 * several subsystems. The Facade delegates the client requests to the
 * appropriate objects within the subsystem. The Facade is also responsible for
 * managing their lifecycle. All of this shields the client from the undesired
 * complexity of the subsystem.
 */
class FacadeConverter {
  protected subsystem1: AudioConverter;

  protected subsystem2: VideoConverter;

  /**
   * Depending on your application's needs, you can provide the Facade with
   * existing subsystem objects or force the Facade to create them on its own.
   */
  constructor(subsystem1?: AudioConverter, subsystem2?: VideoConverter) {
    this.subsystem1 = subsystem1 || new AudioConverter();
    this.subsystem2 = subsystem2 || new VideoConverter();
  }

  /**
   * The Facade's methods are convenient shortcuts to the sophisticated
   * functionality of the subsystems. However, clients get only to a fraction
   * of a subsystem's capabilities.
   */
  public convert(): string {
    let result = 'Facade initializes subsystems:\n';
    result += this.subsystem1.format();
    result += this.subsystem2.format();
    result += 'Facade orders subsystems to perform the action:\n';
    result += this.subsystem1.compress();
    result += this.subsystem2.compressFaster();

    return result;
  }
}

/**
 * The Subsystem can accept requests either from the facade or client directly.
 * In any case, to the Subsystem, the Facade is yet another client, and it's not
 * a part of the Subsystem.
 */
class AudioConverter {
  public format(): string {
    return 'AudioConverter: formatted!\n';
  }

  // ...

  public compress(): string {
    return 'AudioConverter: compress!\n';
  }
}

/**
 * Some facades can work with multiple subsystems at the same time.
 */
class VideoConverter {
  public format(): string {
    return 'VideoConverter: Get formatted!\n';
  }

  // ...

  public compressFaster(): string {
    return 'VideoConverter: Fire compress!';
  }
}

/**
 * The client code works with complex subsystems through a simple interface
 * provided by the Facade. When a facade manages the lifecycle of the subsystem,
 * the client might not even know about the existence of the subsystem. This
 * approach lets you keep the complexity under control.
 */
function clientCode(facade: FacadeConverter) {
  // ...

  console.log(facade.convert());

  // ...
}

/**
 * The client code may have some of the subsystem's objects already created. In
 * this case, it might be worthwhile to initialize the Facade with these objects
 * instead of letting the Facade create new instances.
 */
const subsystem1 = new AudioConverter();
const subsystem2 = new VideoConverter();
const facade = new FacadeConverter(subsystem1, subsystem2);
clientCode(facade);
