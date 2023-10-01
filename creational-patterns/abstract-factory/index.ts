/**
 * The Abstract Factory interface declares a set of methods that return
 * different abstract products. These products are called a family and are
 * related by a high-level theme or concept. Products of one family are usually
 * able to collaborate among themselves. A family of products may have several
 * variants, but the products of one variant are incompatible with products of
 * another.
 */
interface AbstractGUIFactory {
    createButton(): AbstractButton;

    createCheckbox(): AbstractCheckbox;
}

/**
 * Concrete Factories produce a family of products that belong to a single
 * variant. The factory guarantees that resulting products are compatible. Note
 * that signatures of the Concrete Factory's methods return an abstract product,
 * while inside the method a concrete product is instantiated.
 */
class MacFactory implements AbstractGUIFactory {
    public createButton(): AbstractButton {
        return new ConcreteMacButton();
    }

    public createCheckbox(): AbstractCheckbox {
        return new ConcreteMacCheckbox();
    }
}

/**
 * Each Concrete Factory has a corresponding product variant.
 */
class WindowsFactory implements AbstractGUIFactory {
    public createButton(): AbstractButton {
        return new ConcreteWindowsButton();
    }

    public createCheckbox(): AbstractCheckbox {
        return new ConcreteWindowsCheckbox();
    }
}

/**
 * Each distinct product of a product family should have a base interface. All
 * variants of the product must implement this interface.
 */
interface AbstractButton {
    usefulFunctionButton(): string;
}

/**
 * These Concrete Products are created by corresponding Concrete Factories.
 */
class ConcreteMacButton implements AbstractButton {
    public usefulFunctionButton(): string {
        return 'The result of the button from mac.';
    }
}

class ConcreteWindowsButton implements AbstractButton {
    public usefulFunctionButton(): string {
        return 'The result of the button from windows.';
    }
}

/**
 * Here's the base interface of another product. All products can interact
 * with each other, but proper interaction is possible only between products of
 * the same concrete variant.
 */
interface AbstractCheckbox {
    /**
     * Product B is able to do its own thing...
     */
    usefulFunctionCheckbox(): string;

    /**
     * ...but it also can collaborate with the ProductA.
     *
     * The Abstract Factory makes sure that all products it creates are of the
     * same variant and thus, compatible.
     */
    anotherUsefulFunctionCheckbox(collaborator: AbstractButton): string;
}

/**
 * These Concrete Products are created by corresponding Concrete Factories.
 */
class ConcreteMacCheckbox implements AbstractCheckbox {

    public usefulFunctionCheckbox(): string {
        return 'The result of the mac checkbox.';
    }

    /**
     * The variant, Product B1, is only able to work correctly with the variant,
     * Product A1. Nevertheless, it accepts any instance of AbstractProductA as
     * an argument.
     */
    public anotherUsefulFunctionCheckbox(collaborator: AbstractButton): string {
        const result = collaborator.usefulFunctionButton();
        return `The result of the Mac Checkbox collaborating with the (${result})`;
    }
}

class ConcreteWindowsCheckbox implements AbstractCheckbox {

    public usefulFunctionCheckbox(): string {
        return 'The result of the windows checkbox.';
    }

    /**
     * The variant, Product B2, is only able to work correctly with the variant,
     * Product A2. Nevertheless, it accepts any instance of AbstractProductA as
     * an argument.
     */
    public anotherUsefulFunctionCheckbox(collaborator: AbstractButton): string {
        const result = collaborator.usefulFunctionButton();
        return `The result of the Windows Checkbox collaborating with the (${result})`;
    }
}

/**
 * The client code works with factories and products only through abstract
 * types: AbstractFactory and AbstractProduct. This lets you pass any factory or
 * product subclass to the client code without breaking it.
 */
function clientCode(factory: AbstractGUIFactory) {
    const productA = factory.createButton();
    const productB = factory.createCheckbox();

    console.log(productB.usefulFunctionCheckbox());
    console.log(productB.anotherUsefulFunctionCheckbox(productA));
}

/**
 * The client code can work with any concrete factory class.
 */
console.log('Client: Testing client code with the first factory type...');
clientCode(new MacFactory());

console.log('');

console.log('Client: Testing the same client code with the second factory type...');
clientCode(new WindowsFactory());