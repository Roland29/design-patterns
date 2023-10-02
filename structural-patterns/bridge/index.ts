/**
 * The Abstraction defines the interface for the "control" part of the two class
 * hierarchies. It maintains a reference to an object of the Implementation
 * hierarchy and delegates all the real work to this object.
 */
class RemoteControl {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  public togglePower(): string {
    if (this.device.isEnabled()) {
      this.device.disable();
      return 'off';
    } else this.device.enable();
    return 'on';
  }
}

/**
 * You can extend the Abstraction without changing the Implementation classes.
 */
class ExtendedAbstraction extends RemoteControl {
  public mute(): string {
    this.device.setVolume(0);
    return 'Muted';
  }
}

/**
 * The Implementation defines the interface for all implementation classes. It
 * doesn't have to match the Abstraction's interface. In fact, the two
 * interfaces can be entirely different. Typically the Implementation interface
 * provides only primitive operations, while the Abstraction defines higher-
 * level operations based on those primitives.
 */
interface Device {
  isEnabled(): boolean;
  disable(): void;
  enable(): void;
  setVolume(percent: number): void;
}

/**
 * Each Concrete Implementation corresponds to a specific platform and
 * implements the Implementation interface using that platform's API.
 */
class TV implements Device {
  public isEnabled(): boolean {
    return true;
  }
  public disable(): void {}
  public enable(): void {}
  public setVolume(percent: number): void {}
}

class Radio implements Device {
  public isEnabled(): boolean {
    return false;
  }
  public disable(): void {}
  public enable(): void {}
  public setVolume(percent: number): void {}
}

/**
 * Except for the initialization phase, where an Abstraction object gets linked
 * with a specific Implementation object, the client code should only depend on
 * the Abstraction class. This way the client code can support any abstraction-
 * implementation combination.
 */
function clientCode(abstraction: RemoteControl) {
  // ..

  console.log(abstraction.togglePower());

  // ..
}

/**
 * The client code should be able to work with any pre-configured abstraction-
 * implementation combination.
 */
let implementation = new TV();
let abstraction = new RemoteControl(implementation);
clientCode(abstraction);

console.log('');

implementation = new Radio();
abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);
