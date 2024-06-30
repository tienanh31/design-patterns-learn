import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  type PatternCategory = 'all' | 'creational' | 'structural' | 'behavioral';


  const designPatterns = [
    { id: 1, preTitle:'Creational Patterns', title: 'Abstract factory', image: require('../assets/images/camel.png'), imageDetail: require('../assets/images/abstract-factory.webp'), 
    description: 'A design pattern that provides an interface for creating interdependent objects or interconnected families without specifying their specific classes. The template is implemented by creating an abstract class, which is an interface for creating system components. Then classes are written that implement this interface.', 
    proscons: 'Pros: Reusability, Flexibility, Separation of Concerns.\nCons: Complexity, Can Lead to Overengineering.', 
    task: 'Implement the Abstract Factory pattern by creating interfaces for different types of coffee and their recipes. Create classes that implement these interfaces to provide specific types of coffee.',
    result: 'The Abstract Factory pattern allows for the creation of families of related objects without specifying their concrete classes. This provides flexibility and reusability in the codebase.',
    code: `
    protocol Coffee {
      func make()
    }
    
    class Espresso: Coffee {
      func make() {
        print("Coffee: Espresso")
      }
    }
    
    class Cappuccino: Coffee {
      func make() {
        print("Coffee: Cappuccino")
      }
    }
    
    class Latte: Coffee {
      func make() {
        print("Coffee: Latte")
      }
    }
    
    protocol CoffeeRecipe {
      func createCoffee() -> Coffee
    }
    
    class EspressoCoffeeRecipe: CoffeeRecipe {
      func createCoffee() -> Coffee {
        return Espresso()
      }
    }
    ` },
    {
      id: 2,
      preTitle:'Creational Patterns',
      imageDetail: require('../assets/images/builder.png'),
      title: 'Builder',
      image: require('../assets/images/bee.png'),
      description: 'The Builder pattern is a creational pattern that provides a way to construct a complex object step by step. The Builder pattern allows you to produce different types and representations of an object using the same construction code.',
      proscons: 'Pros: Allows you to construct objects step-by-step, Can construct different representations of the product, Isolates complex construction code from the business logic.\nCons: The overall complexity of the code increases, Requires creating a separate ConcreteBuilder for each type of product.',
      task: 'Implement the Builder pattern to create a variety of cars with different features, using the same construction process.',
      result: 'The Builder pattern separates the construction of a complex object from its representation, allowing the same construction process to create various representations.',
      code: `
      class Car {
        var seats: Int?
        var engine: String?
        var tripComputer: Bool?
        var GPS: Bool?
      }

      protocol Builder {
        func reset()
        func setSeats(_ number: Int)
        func setEngine(_ type: String)
        func setTripComputer(_ hasComputer: Bool)
        func setGPS(_ hasGPS: Bool)
      }

      class CarBuilder: Builder {
        private var car = Car()

        func reset() {
          car = Car()
        }

        func setSeats(_ number: Int) {
          car.seats = number
        }

        func setEngine(_ type: String) {
          car.engine = type
        }

        func setTripComputer(_ hasComputer: Bool) {
          car.tripComputer = hasComputer
        }

        func setGPS(_ hasGPS: Bool) {
          car.GPS = hasGPS
        }

        func getResult() -> Car {
          return car
        }
      }
      `},
      {
        id: 3,
        title: 'Factory method',
        image: require('../assets/images/bullfinch.png'),
        preTitle:'Creational Patterns',
      imageDetail: require('../assets/images/factory-method.png'),
        description: 'The Factory Method pattern is a creational pattern that defines an interface for creating an object, but lets subclasses alter the type of objects that will be created.',
        proscons: 'Pros: Provides a way to instantiate objects without exposing the instantiation logic, Promotes code reuse and decouples the code.\nCons: Can lead to a proliferation of classes, Can complicate the codebase.',
        task: 'Implement the Factory Method pattern to create different types of transportation vehicles using a common interface.',
        result: 'The Factory Method pattern allows subclasses to define which objects to create, providing flexibility and decoupling the code from the instantiation logic.',
        code: `
        protocol Transport {
          func deliver()
        }
  
        class Truck: Transport {
          func deliver() {
            print("Deliver by land in a box")
          }
        }
  
        class Ship: Transport {
          func deliver() {
            print("Deliver by sea in a container")
          }
        }
  
        protocol Logistics {
          func createTransport() -> Transport
        }
  
        class RoadLogistics: Logistics {
          func createTransport() -> Transport {
            return Truck()
          }
        }
  
        class SeaLogistics: Logistics {
          func createTransport() -> Transport {
            return Ship()
          }
        }
        `
      },
      {
        id: 4,
        title: 'Prototype',
        image: require('../assets/images/crab.png'),
        preTitle:'Creational Patterns',
      imageDetail: require('../assets/images/prototype.png'),
        description: 'The Prototype pattern is a creational pattern that allows cloning objects, even complex ones, without coupling to their specific classes.',
        proscons: 'Pros: Reduces the need for subclassing, Hides the complexities of creating new instances from the client.\nCons: Requires implementing a clone method, Can be complicated with complex object structures.',
        task: 'Implement the Prototype pattern to clone different types of shapes with their specific properties.',
        result: 'The Prototype pattern allows cloning objects without depending on their concrete classes, promoting code reuse and flexibility.',
        code: `
        protocol Shape {
          func clone() -> Shape
        }
  
        class Rectangle: Shape {
          var width: Int
          var height: Int
  
          init(width: Int, height: Int) {
            self.width = width
            self.height = height
          }
  
          func clone() -> Shape {
            return Rectangle(width: width, height: height)
          }
        }
  
        class Circle: Shape {
          var radius: Int
  
          init(radius: Int) {
            self.radius = radius
          }
  
          func clone() -> Shape {
            return Circle(radius: radius)
          }
        }
        `
      },
      {
        id: 5,
        title: 'Singleton',
        image: require('../assets/images/cat.png'),
        preTitle:'Creational Patterns',
      imageDetail: require('../assets/images/singleton.png'),
        description: 'The Singleton pattern is a creational pattern that ensures a class has only one instance and provides a global point of access to it.',
        proscons: 'Pros: Ensures a single instance, Provides a global point of access.\nCons: Can be difficult to test, Can mask bad design.',
        task: 'Implement the Singleton pattern to manage a configuration settings class that should only have one instance.',
        result: 'The Singleton pattern restricts the instantiation of a class to one object, providing a single point of access to it.',
        code: `
        class ConfigurationManager {
          static let shared = ConfigurationManager()
  
          private init() {}
  
          func getConfiguration() -> String {
            return "Configuration data"
          }
        }
        `
      },
      {
        id: 6,
        title: 'Adapter',
        image: require('../assets/images/deer.png'),
        preTitle:'Structural Patterns',
      imageDetail: require('../assets/images/adapter.png'),
        description: 'The Adapter pattern is a structural pattern that allows objects with incompatible interfaces to collaborate.',
        proscons: 'Pros: Allows incompatible interfaces to work together, Promotes code reuse.\nCons: Can add complexity to the code, Requires extra code for the adapter.',
        task: 'Implement the Adapter pattern to allow a new logging system to work with an old system interface.',
        result: 'The Adapter pattern enables the collaboration of objects with incompatible interfaces by converting the interface of a class into another interface the client expects.',
        code: `
        class OldLogger {
          func logMessage(_ message: String) {
            print("Old Logger: \(message)")
          }
        }
  
        protocol NewLogger {
          func log(_ message: String)
        }
  
        class LoggerAdapter: NewLogger {
          private let oldLogger: OldLogger
  
          init(oldLogger: OldLogger) {
            self.oldLogger = oldLogger
          }
  
          func log(_ message: String) {
            oldLogger.logMessage(message)
          }
        }
        `
      },
      {
        id: 7,
        title: 'Bridge',
        image: require('../assets/images/dog.png'),
        preTitle:'Structural Patterns',
        imageDetail: require('../assets/images/bridge.png'),
        description: 'The Bridge pattern is a structural pattern that lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently of each other.',
        proscons: 'Pros: Decouples the implementation from the abstraction, Promotes flexibility and scalability.\nCons: Can increase complexity, Requires careful design to implement correctly.',
        task: 'Implement the Bridge pattern to decouple the abstraction and implementation of a remote control and different types of devices.',
        result: 'The Bridge pattern decouples the abstraction from its implementation, allowing both to be developed independently and promoting flexibility and scalability.',
        code: `
        protocol Device {
          func turnOn()
          func turnOff()
          func setVolume(_ percent: Int)
        }
  
        class TV: Device {
          func turnOn() {
            print("TV is turned on")
          }
  
          func turnOff() {
            print("TV is turned off")
          }
  
          func setVolume(_ percent: Int) {
            print("TV volume set to \(percent)%")
          }
        }
  
        class Radio: Device {
          func turnOn() {
            print("Radio is turned on")
          }
  
          func turnOff() {
            print("Radio is turned off")
          }
  
          func setVolume(_ percent: Int) {
            print("Radio volume set to \(percent)%")
          }
        }
  
        class RemoteControl {
          private var device: Device
  
          init(device: Device) {
            self.device = device
          }
  
          func turnOn() {
            device.turnOn()
          }
  
          func turnOff() {
            device.turnOff()
          }
        }
        `
      },
      {
        id: 8,
        title: 'Composite',
        image: require('../assets/images/elephant.png'),
        preTitle:'Structural Patterns',
        imageDetail: require('../assets/images/composite.png'),
        description: 'The Composite pattern is a structural pattern that lets you compose objects into tree structures and then work with these structures as if they were individual objects.',
        proscons: 'Pros: Simplifies client code, Makes it easier to add new types of components.\nCons: Can make the design overly general, Can be challenging to implement with complex hierarchies.',
        task: 'Implement the Composite pattern to represent a hierarchy of graphical components such as shapes and groups of shapes.',
        result: 'The Composite pattern allows you to compose objects into tree structures, treating individual objects and compositions of objects uniformly.',
        code: `
        protocol Graphic {
          func draw()
        }
  
        class Dot: Graphic {
          func draw() {
            print("Drawing a dot")
          }
        }
  
        class Circle: Graphic {
          func draw() {
            print("Drawing a circle")
          }
        }
  
        class CompoundGraphic: Graphic {
          private var children: [Graphic] = []
  
          func add(_ child: Graphic) {
            children.append(child)
          }
  
          func remove(_ child: Graphic) {
            if let index = children.firstIndex(where: { $0 as AnyObject === child as AnyObject }) {
              children.remove(at: index)
            }
          }
  
          func draw() {
            for child in children {
              child.draw()
            }
          }
        }
        `
      },
      {
        id: 9,
        title: 'Decorator',
        image: require('../assets/images/fox.png'),
        preTitle:'Structural Patterns',
        imageDetail: require('../assets/images/decorator.png'),
        description: 'The Decorator pattern is a structural pattern that allows adding new behaviors to objects dynamically by placing these objects inside special wrapper objects, called decorators.',
        proscons: 'Pros: Adds responsibilities to objects dynamically, Promotes code reuse.\nCons: Can lead to a large number of small objects, Can make the code more complex to understand.',
        task: 'Implement the Decorator pattern to add different types of notifications to a basic notification system.',
        result: 'The Decorator pattern allows adding new behaviors to objects dynamically, promoting code reuse and flexibility.',
        code: `
        protocol Notifier {
          func send(message: String)
        }
  
        class BasicNotifier: Notifier {
          func send(message: String) {
            print("Sending message: \(message)")
          }
        }
  
        class NotifierDecorator: Notifier {
          private let wrappee: Notifier
  
          init(_ wrappee: Notifier) {
            self.wrappee = wrappee
          }
  
          func send(message: String) {
            wrappee.send(message: message)
          }
        }
  
        class SMSNotifier: NotifierDecorator {
          override func send(message: String) {
            super.send(message: message)
            print("Sending SMS notification: \(message)")
          }
        }
  
        class EmailNotifier: NotifierDecorator {
          override func send(message: String) {
            super.send(message: message)
            print("Sending Email notification: \(message)")
          }
        }
        `
      },
      {
        id: 10,
        title: 'Facade',
        image: require('../assets/images/facade.png'),
        preTitle:'Structural Patterns',
        imageDetail: require('../assets/images/builder.png'),
        description: 'The Facade pattern is a structural pattern that provides a simplified interface to a complex subsystem.',
        proscons: 'Pros: Simplifies the client interface, Promotes loose coupling between the client and the subsystem.\nCons: Can become a god object, Can hide important details of the subsystem.',
        task: 'Implement the Facade pattern to provide a simplified interface for a complex video conversion library.',
        result: 'The Facade pattern provides a simplified interface to a complex subsystem, promoting loose coupling and easier usage.',
        code: `
        class VideoFile {
          private var filename: String
  
          init(filename: String) {
            self.filename = filename
          }
  
          func getFilename() -> String {
            return filename
          }
        }
  
        class OggCompressionCodec {}
        class MPEG4CompressionCodec {}
  
        class CodecFactory {
          static func extract(_ file: VideoFile) -> Any {
            print("Extracting codec from file")
            return OggCompressionCodec()
          }
        }
  
        class VideoConverter {
          func convert(filename: String, format: String) -> VideoFile {
            let file = VideoFile(filename: filename)
            let sourceCodec = CodecFactory.extract(file)
            print("Converting video to \(format)")
            return VideoFile(filename: "\(filename).\(format)")
          }
        }
        `
      },
      {
        id: 11,
        title: 'Flyweight',
        image: require('../assets/images/giraffe.png'),
        preTitle:'Structural Patterns',
        imageDetail: require('../assets/images/flyweight.png'),
        description: 'The Flyweight pattern is a structural pattern that lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all the data in each object.',
        proscons: 'Pros: Reduces memory usage, Increases performance when working with large numbers of objects.\nCons: Can introduce complexity, Requires careful handling of shared state.',
        task: 'Implement the Flyweight pattern to manage a large number of tree objects in a forest with shared intrinsic state.',
        result: 'The Flyweight pattern reduces memory usage by sharing common parts of state between multiple objects, promoting efficiency and performance.',
        code: `
        class TreeType {
          private var name: String
          private var color: String
          private var texture: String
  
          init(name: String, color: String, texture: String) {
            self.name = name
            self.color = color
            self.texture = texture
          }
  
          func draw(x: Int, y: Int) {
            print("Drawing a tree \(name) at (\(x), \(y))")
          }
        }
  
        class Tree {
          private var x: Int
          private var y: Int
          private var type: TreeType
  
          init(x: Int, y: Int, type: TreeType) {
            self.x = x
            self.y = y
            self.type = type
          }
  
          func draw() {
            type.draw(x: x, y: y)
          }
        }
  
        class TreeFactory {
          private static var treeTypes: [String: TreeType] = [:]
  
          static func getTreeType(name: String, color: String, texture: String) -> TreeType {
            let key = "\(name)_\(color)_\(texture)"
            if let type = treeTypes[key] {
              return type
            } else {
              let type = TreeType(name: name, color: color, texture: texture)
              treeTypes[key] = type
              return type
            }
          }
        }
        `
      },
      {
        id: 12,
        title: 'Proxy',
        image: require('../assets/images/hippo.png'),
        preTitle:'Structural Patterns',
        imageDetail: require('../assets/images/proxy.png'),
        description: 'The Proxy pattern is a structural pattern that provides an object representing another object. A proxy controls access to the original object, allowing you to perform something either before or after the request gets through to the original object.',
        proscons: 'Pros: Controls access to the original object, Can add functionality to the original object without changing its code.\nCons: Can add complexity to the code, Can introduce a performance overhead.',
        task: 'Implement the Proxy pattern to control access to a resource-intensive object, like a large image, by creating a virtual proxy.',
        result: 'The Proxy pattern provides a surrogate or placeholder for another object, controlling access and adding functionality without modifying the original object.',
        code: `
        protocol Image {
          func display()
        }
  
        class RealImage: Image {
          private var filename: String
  
          init(filename: String) {
            self.filename = filename
            loadFromDisk()
          }
  
          func loadFromDisk() {
            print("Loading \(filename) from disk")
          }
  
          func display() {
            print("Displaying \(filename)")
          }
        }
  
        class ProxyImage: Image {
          private var realImage: RealImage?
          private var filename: String
  
          init(filename: String) {
            self.filename = filename
          }
  
          func display() {
            if realImage == nil {
              realImage = RealImage(filename: filename)
            }
            realImage?.display()
          }
        }
        `
      },
      {
        id: 13,
        title: 'Chain of responsibility',
        image: require('../assets/images/ladybug.png'),
        preTitle:'Behavioral Patterns',
        imageDetail: require('../assets/images/chain-of-responsibility.png'),
        description: 'The Chain of Responsibility pattern is a behavioral pattern that lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.',
        proscons: 'Pros: Reduces the coupling between the sender and receiver, Adds flexibility in assigning responsibilities to objects.\nCons: Can make it hard to observe the flow of requests, Can introduce performance overhead.',
        task: 'Implement the Chain of Responsibility pattern to handle different types of user requests in a support system, such as technical, billing, and general inquiries.',
        result: 'The Chain of Responsibility pattern allows passing requests along a chain of handlers, decoupling the sender and receiver and promoting flexibility in handling various requests.',
        code: `
        protocol SupportHandler {
          var nextHandler: SupportHandler? { get set }
          func handleRequest(_ request: String)
        }
  
        class TechnicalSupportHandler: SupportHandler {
          var nextHandler: SupportHandler?
  
          func handleRequest(_ request: String) {
            if request == "technical" {
              print("Handling technical request")
            } else {
              nextHandler?.handleRequest(request)
            }
          }
        }
  
        class BillingSupportHandler: SupportHandler {
          var nextHandler: SupportHandler?
  
          func handleRequest(_ request: String) {
            if request == "billing" {
              print("Handling billing request")
            } else {
              nextHandler?.handleRequest(request)
            }
          }
        }
  
        class GeneralSupportHandler: SupportHandler {
          var nextHandler: SupportHandler?
  
          func handleRequest(_ request: String) {
            if request == "general" {
              print("Handling general request")
            } else {
              nextHandler?.handleRequest(request)
            }
          }
        }
        `
      },
      {
        id: 14,
        title: 'Command',
        image: require('../assets/images/lama.png'),
        preTitle:'Behavioral Patterns',
        imageDetail: require('../assets/images/command.png'),
        description: 'The Command pattern is a behavioral pattern that turns a request into a stand-alone object that contains all information about the request. This transformation lets you parameterize methods with different requests, delay or queue a request’s execution, and support undoable operations.',
        proscons: 'Pros: Decouples the sender and receiver, Supports undo and redo operations.\nCons: Can result in a lot of small command classes, Can increase complexity.',
        task: 'Implement the Command pattern to create a text editor with commands for copying, pasting, and undoing actions.',
        result: 'The Command pattern encapsulates a request as an object, decoupling the sender and receiver and allowing for flexible command processing, including support for undoable operations.',
        code: `
        protocol Command {
          func execute()
          func undo()
        }
  
        class CopyCommand: Command {
          private var editor: Editor
  
          init(editor: Editor) {
            self.editor = editor
          }
  
          func execute() {
            editor.copy()
          }
  
          func undo() {
            // Implement undo logic
          }
        }
  
        class PasteCommand: Command {
          private var editor: Editor
  
          init(editor: Editor) {
            self.editor = editor
          }
  
          func execute() {
            editor.paste()
          }
  
          func undo() {
            // Implement undo logic
          }
        }
  
        class Editor {
          func copy() {
            print("Copying text")
          }
  
          func paste() {
            print("Pasting text")
          }
        }
        `
      },
      {
        id: 15,
        title: 'Interpreter',
        image: require('../assets/images/owl.png'),
        preTitle:'Behavioral Patterns',
        imageDetail: require('../assets/images/interpreter.png'),
        description: 'The Interpreter pattern is a behavioral pattern that defines a grammatical representation for a language and provides an interpreter to deal with this grammar. It is used to interpret expressions within a language.',
        proscons: 'Pros: Easy to change and extend the grammar, Promotes language-specific functionality.\nCons: Can be inefficient for complex grammars, Can be difficult to maintain with large sets of rules.',
        task: 'Implement the Interpreter pattern to interpret and evaluate simple mathematical expressions.',
        result: 'The Interpreter pattern provides a way to interpret expressions in a specific language, allowing for easy changes and extensions to the grammar.',
        code: `
        protocol Expression {
          func interpret(context: String) -> Bool
        }
  
        class TerminalExpression: Expression {
          private var data: String
  
          init(data: String) {
            self.data = data
          }
  
          func interpret(context: String) -> Bool {
            return context.contains(data)
          }
        }
  
        class OrExpression: Expression {
          private var expr1: Expression
          private var expr2: Expression
  
          init(expr1: Expression, expr2: Expression) {
            self.expr1 = expr1
            self.expr2 = expr2
          }
  
          func interpret(context: String) -> Bool {
            return expr1.interpret(context: context) || expr2.interpret(context: context)
          }
        }
  
        class AndExpression: Expression {
          private var expr1: Expression
          private var expr2: Expression
  
          init(expr1: Expression, expr2: Expression) {
            self.expr1 = expr1
            self.expr2 = expr2
          }
  
          func interpret(context: String) -> Bool {
            return expr1.interpret(context: context) && expr2.interpret(context: context)
          }
        }
        `
      },
      {
        id: 16,
        title: 'Iterator',
        image: require('../assets/images/panda.png'),
        preTitle:'Behavioral Patterns',
        imageDetail: require('../assets/images/iterator.png'),
        description: 'The Iterator pattern is a behavioral pattern that lets you traverse elements of a collection without exposing the underlying representation (list, stack, tree, etc.).',
        proscons: 'Pros: Simplifies the client interface, Promotes encapsulation and separation of concerns.\nCons: Can add complexity, Can be less efficient than a specialized traversal method.',
        task: 'Implement the Iterator pattern to traverse a collection of books in a library.',
        result: 'The Iterator pattern provides a way to traverse elements of a collection without exposing its underlying representation, promoting encapsulation and flexibility.',
        code: `
        protocol Iterator {
          func hasNext() -> Bool
          func next() -> String?
        }
  
        class BookIterator: Iterator {
          private var books: [String]
          private var index = 0
  
          init(books: [String]) {
            self.books = books
          }
  
          func hasNext() -> Bool {
            return index < books.count
          }
  
          func next() -> String? {
            if hasNext() {
              let book = books[index]
              index += 1
              return book
            } else {
              return nil
            }
          }
        }
  
        class BookCollection {
          private var books: [String]
  
          init(books: [String]) {
            self.books = books
          }
  
          func createIterator() -> Iterator {
            return BookIterator(books: books)
          }
        }
        `
      },
      {
        id: 17,
        title: 'Mediator',
        image: require('../assets/images/parrot.png'),
        preTitle:'Behavioral Patterns',
        imageDetail: require('../assets/images/mediator.png'),
        description: 'The Mediator pattern is a behavioral pattern that lets you reduce chaotic dependencies between objects. The pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object.',
        proscons: 'Pros: Reduces dependencies between components, Promotes loose coupling.\nCons: Can introduce complexity, Can become a god object if not designed carefully.',
        task: 'Implement the Mediator pattern to manage communication between different user interface components in a dialog box.',
        result: 'The Mediator pattern reduces dependencies between objects by restricting direct communications and forcing them to collaborate through a mediator object, promoting loose coupling and flexibility.',
        code: `
        protocol Mediator {
          func notify(sender: Component, event: String)
        }
  
        class DialogMediator: Mediator {
          private var components: [Component] = []
  
          func addComponent(_ component: Component) {
            components.append(component)
          }
  
          func notify(sender: Component, event: String) {
            for component in components {
              if component !== sender {
                component.receive(event: event)
              }
            }
          }
        }
  
        class Component {
          private let mediator: Mediator
  
          init(mediator: Mediator) {
            self.mediator = mediator
          }
  
          func send(event: String) {
            mediator.notify(sender: self, event: event)
          }
  
          func receive(event: String) {
            print("\(type(of: self)) received event: \(event)")
          }
        }
  
        class Button: Component {}
        class TextBox: Component {}
        `
      },
      {
        id: 18,
        title: 'Memento',
        image: require('../assets/images/platypus.png'),
        preTitle:'Behavioral Patterns',
        imageDetail: require('../assets/images/memento.webp'),
        description: 'The Memento pattern is a behavioral pattern that lets you capture the current state of an object without exposing its internal structure. You can later restore the object to this state if needed.',
        proscons: 'Pros: Preserves encapsulation, Allows state rollback.\nCons: Can consume a lot of memory, Requires careful implementation to avoid exposing internals.',
        task: 'Implement the Memento pattern to create an undo mechanism in a text editor.',
        result: 'The Memento pattern captures the current state of an object without exposing its internal structure, allowing you to restore the object to this state later if needed.',
        code: `
        class Editor {
          private var text: String = ""
  
          func setText(_ text: String) {
            self.text = text
          }
  
          func getText() -> String {
            return text
          }
  
          func save() -> Memento {
            return Memento(text: text)
          }
  
          func restore(memento: Memento) {
            self.text = memento.getText()
          }
        }
  
        class Memento {
          private let text: String
  
          init(text: String) {
            self.text = text
          }
  
          func getText() -> String {
            return text
          }
        }
        `
      },
      {
        id: 19,
        title: 'Observer',
        image: require('../assets/images/stingray.png'),
        preTitle:'Behavioral Patterns',
        imageDetail: require('../assets/images/observer.png'),
        description: 'The Observer pattern is a behavioral pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing.',
        proscons: 'Pros: Promotes loose coupling, Supports broadcast communication.\nCons: Can lead to memory leaks if observers are not properly removed, Can introduce performance overhead with many observers.',
        task: 'Implement the Observer pattern to notify a group of display elements when the state of a weather station changes.',
        result: 'The Observer pattern defines a subscription mechanism to notify multiple objects about events happening to the object they’re observing, promoting loose coupling and flexibility.',
        code: `
        protocol Observer {
          func update(temperature: Float)
        }
  
        class WeatherStation {
          private var observers: [Observer] = []
          private var temperature: Float = 0.0
  
          func addObserver(_ observer: Observer) {
            observers.append(observer)
          }
  
          func removeObserver(_ observer: Observer) {
            if let index = observers.firstIndex(where: { $0 as AnyObject === observer as AnyObject }) {
              observers.remove(at: index)
            }
          }
  
          func setTemperature(_ temperature: Float) {
            self.temperature = temperature
            notifyObservers()
          }
  
          private func notifyObservers() {
            for observer in observers {
              observer.update(temperature: temperature)
            }
          }
        }
  
        class DisplayElement: Observer {
          func update(temperature: Float) {
            print("Display updated with temperature: \(temperature)")
          }
        }
        `
      },
      {
        id: 20,
        title: 'State',
        image: require('../assets/images/turtle.png'),
        preTitle:'Behavioral Patterns',
        imageDetail: require('../assets/images/state.png'),
        description: 'The State pattern is a behavioral pattern that lets an object alter its behavior when its internal state changes. It appears as if the object changed its class.',
        proscons: 'Pros: Simplifies the code by eliminating large switch-case statements, Promotes encapsulation.\nCons: Can result in a large number of state classes, Can introduce complexity.',
        task: 'Implement the State pattern to manage the behavior of a document editor in different states such as editing, saving, and publishing.',
        result: 'The State pattern allows an object to alter its behavior when its internal state changes, promoting encapsulation and simplifying the code.',
        code: `
        protocol State {
          func handle(context: Document)
        }
  
        class EditingState: State {
          func handle(context: Document) {
            print("Document is in editing state")
            context.setState(PublishingState())
          }
        }
  
        class PublishingState: State {
          func handle(context: Document) {
            print("Document is in publishing state")
            context.setState(SavingState())
          }
        }
  
        class SavingState: State {
          func handle(context: Document) {
            print("Document is in saving state")
            context.setState(EditingState())
          }
        }
  
        class Document {
          private var state: State
  
          init(state: State) {
            self.state = state
          }
  
          func setState(_ state: State) {
            self.state = state
          }
  
          func applyState() {
            state.handle(context: self)
          }
        }
        `
      },
      {
        id: 21,
        title: 'Strategy',
        image: require('../assets/images/walrus.png'),
        preTitle:'Behavioral Patterns',
        imageDetail: require('../assets/images/strategy.png'),
        description: 'The Strategy pattern is a behavioral pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.',
        proscons: 'Pros: Promotes the use of composition over inheritance, Simplifies the code by separating algorithms.\nCons: Can increase the number of classes, Can make the code more complex to understand.',
        task: 'Implement the Strategy pattern to handle different sorting algorithms for a collection of objects.',
        result: 'The Strategy pattern allows you to define a family of algorithms, encapsulate each one in a separate class, and make them interchangeable, promoting flexibility and reusability.',
        code: `
        protocol SortingStrategy {
          func sort(_ data: [Int]) -> [Int]
        }
  
        class BubbleSort: SortingStrategy {
          func sort(_ data: [Int]) -> [Int] {
            print("Sorting using Bubble Sort")
            return data.sorted()
          }
        }
  
        class QuickSort: SortingStrategy {
          func sort(_ data: [Int]) -> [Int] {
            print("Sorting using Quick Sort")
            return data.sorted()
          }
        }
  
        class Context {
          private var strategy: SortingStrategy
  
          init(strategy: SortingStrategy) {
            self.strategy = strategy
          }
  
          func setStrategy(_ strategy: SortingStrategy) {
            self.strategy = strategy
          }
  
          func executeStrategy(_ data: [Int]) -> [Int] {
            return strategy.sort(data)
          }
        }
        `
      },
      {
        id: 22,
        title: 'Template method',
        image: require('../assets/images/whale.png'),
        preTitle:'Behavioral Patterns',
        imageDetail: require('../assets/images/template-method.png'),
        description: 'The Template Method pattern is a behavioral pattern that defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.',
        proscons: 'Pros: Promotes code reuse, Allows subclasses to customize specific steps of the algorithm.\nCons: Can make the code more difficult to understand, Can lead to a fragile base class problem.',
        task: 'Implement the Template Method pattern to create a series of steps for preparing different types of beverages such as tea and coffee.',
        result: 'The Template Method pattern defines the skeleton of an algorithm in the superclass, allowing subclasses to override specific steps without changing the algorithm\'s structure, promoting code reuse and flexibility.',
        code: `
        class Beverage {
          func prepare() {
            boilWater()
            brew()
            pourInCup()
            addCondiments()
          }
  
          func boilWater() {
            print("Boiling water")
          }
  
          func brew() {
            // Subclasses should override this method
          }
  
          func pourInCup() {
            print("Pouring into cup")
          }
  
          func addCondiments() {
            // Subclasses should override this method
          }
        }
  
        class Tea: Beverage {
          override func brew() {
            print("Steeping the tea")
          }
  
          override func addCondiments() {
            print("Adding lemon")
          }
        }
  
        class Coffee: Beverage {
          override func brew() {
            print("Dripping coffee through filter")
          }
  
          override func addCondiments() {
            print("Adding sugar and milk")
          }
        }
        `
      },
      {
        id: 23,
        title: 'Visitor',
        image: require('../assets/images/zebra.png'),
        preTitle:'Behavioral Patterns',
        imageDetail: require('../assets/images/visitor.png'),
        description: 'The Visitor pattern is a behavioral pattern that lets you separate algorithms from the objects on which they operate. It allows you to add further operations to objects without having to modify them.',
        proscons: 'Pros: Promotes separation of concerns, Makes it easy to add new operations.\nCons: Can violate the encapsulation of elements, Can introduce complexity with many visitor classes.',
        task: 'Implement the Visitor pattern to perform different operations on a collection of elements, such as printing their details and calculating their total.',
        result: 'The Visitor pattern separates algorithms from the objects on which they operate, allowing you to add new operations without modifying the objects, promoting flexibility and separation of concerns.',
        code: `
        protocol Element {
          func accept(visitor: Visitor)
        }
  
        class ConcreteElementA: Element {
          func accept(visitor: Visitor) {
            visitor.visit(element: self)
          }
  
          func operationA() -> String {
            return "Element A"
          }
        }
  
        class ConcreteElementB: Element {
          func accept(visitor: Visitor) {
            visitor.visit(element: self)
          }
  
          func operationB() -> String {
            return "Element B"
          }
        }
  
        protocol Visitor {
          func visit(element: ConcreteElementA)
          func visit(element: ConcreteElementB)
        }
  
        class ConcreteVisitor: Visitor {
          func visit(element: ConcreteElementA) {
            print("Visiting \(element.operationA())")
          }
  
          func visit(element: ConcreteElementB) {
            print("Visiting \(element.operationB())")
          }
        }
        `
      }
  ];

  const [filteredPatterns, setFilteredPatterns] = useState(designPatterns);
  const [selectedCategory, setSelectedCategory] = useState<PatternCategory>('all');
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  const filterPatterns = (category: PatternCategory) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredPatterns(designPatterns);
    } else if (category === 'creational') {
      setFilteredPatterns(designPatterns.filter(pattern => pattern.id <= 5));
    } else if (category === 'structural') {
      setFilteredPatterns(designPatterns.filter(pattern => pattern.id > 5 && pattern.id <= 12));
    } else if (category === 'behavioral') {
      setFilteredPatterns(designPatterns.filter(pattern => pattern.id > 12 && pattern.id <= 24));
    } else {
      setFilteredPatterns([]); // Current implementation only filters 'creational', you can add more conditions if needed
    }
  };

  const toggleDescription = () => {
    setDescriptionVisible(!descriptionVisible);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Design patterns</Text>
        <TouchableOpacity onPress={toggleDescription}>
          <Image
            source={descriptionVisible ? require('../assets/images/ion--ios-arrow-up.png') : require('../assets/images/ion--ios-arrow-down.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {descriptionVisible && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>Design patterns are typical solutions to common problems in software design. They are like blueprints that you can customize to solve a recurring design problem in your code.</Text>
        </View>
      )}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, selectedCategory === 'all' && styles.selectedFilterButton]} onPress={() => filterPatterns('all')}>
          <Text style={styles.filterText}>all</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, selectedCategory === 'creational' && styles.selectedFilterButton]} onPress={() => filterPatterns('creational')}>
          <Text style={styles.filterText}>creational</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, selectedCategory === 'structural' && styles.selectedFilterButton]} onPress={() => filterPatterns('structural')}>
          <Text style={styles.filterText}>structural</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, selectedCategory === 'behavioral' && styles.selectedFilterButton]} onPress={() => filterPatterns('behavioral')}>
          <Text style={styles.filterText}>behavioral</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {filteredPatterns.map((pattern) => (
          <TouchableOpacity key={pattern.id} style={styles.card} onPress={() => navigation.navigate('Detail', { pattern })}>
            <Image source={pattern.image} style={styles.cardImage} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>{pattern.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  descriptionContainer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  filterButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
  },
  selectedFilterButton: {
    backgroundColor: '#FFA500', // Orange color for selected button
  },
  filterText: {
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 150,
    height: 200,
    margin: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardTextContainer: {
    width: '100%',
    backgroundColor: '#FFD700', // Yellow background color for the title container
    paddingVertical: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000', // Black text color
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#f8f8f8',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#666',
  },
});

export default HomeScreen;