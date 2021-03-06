---
title: Scala Cheatsheet
layout: page-with-contents-list
---

### Values And Variables

```scala
val a, b = 2 // Eval when set. Constant. Both set to 2.
lazy val a, b = 2 // Eval FIRST time used.
def y= 2 // Eval EVERY time used. Constant.
var z = 2 // Eval when set, can be updated, avoid.
```

### Tuples

```scala
val person = ("MN", 21, 1.84); println("Age:" + person._2) // In a Tuple, position starts with 1.
val (name,age,height) = person // Note: val (name, _, _) = person - will just set name.
```

### Types Are Classes

```scala
a.toString // As toString has no parameters the () are omitted.
"Martin".intersect("tiny")  // Expression "Martin" is a String object so we can use String methods.
5.to(10) == (5 to 10) // Expression 5 is an Int.
5.+(2) == 5 + 2 // a.method(b) == a method b.

var v = 0; v.+=(1); v+=1;  // v++ not allowed.
```

### Mathematical Functions

```scala
import math._  // same as import scala.math._ (scala can be omitted).
sqrt(2) // Obv. many many more functions.
```

### The apply Method

```scala
"hello"(0) == "hello".apply(0) // Both yield 'h'.
BigInt("100") == BigInt.apply("100")
```

### Conditional Expressions

```scala
val c = if (a >= 2) 2 else -2 // if(a >= 1) x = 1 else x = -1.  Needs x to be a var.
val d = if (a >= 2) 2 else () // () is a Class called Unit - it represents "no value".
```

### Block Expressions

```scala
val e = {val f = 2; val g = 2; f + g} // e == 4, takes last value of block.
val h = {val i = 2} // h == (), the Unit value. i == 2.
```

### Input / Output

```scala
print("Hello: "); println("Martin") // Hello: Martin
printf("Hello, %s! You are %d years old.\n", "Fred", 42)

val name = readLine("Your Name: ") // Note: only works in interactive session. 
print("You Age: "); val age = readInt()
```

### Loops

```scala
var i = 3
while (i > 0) { println(i); i -= 1 }
for (i <- 1 to 3) println(i) // Yields 1 2 3. Note: (i -< 3 to 1 by -1) is a desc loop.
for (i <- 0 until "dog".length) println(i.toString + ":" + "dog"(i) + ",") // Yields 0:d,1:o,2:g,
for (ch <- "Hello") println(ch) // Yields Hello

// Complex loop and loops with other vars.
for (i <- 0 to 1; j <- 10 to 12; if (j != 11)) println(i,j) // Yields 10 12 12 13
for (i <- 0 to 1; k = i + 10; j <- k to (k + 1)) println(i,j) // Yields 10 11 12 13 14 15

// Yield after for loop constructs a collection - called a comprehension.
for (i <- "Hi") yield BigInt(i) // Yields a collection of BigInt ascii values.

// Note: can use {} in place of the outer () in a for loop. {} can span multiple lines.
```

### Functions

```scala
def func( p1: Int, p2: Int = 0, p3: Int = 0) = (p1, p2, p3) // p2 defaults to 0.  Yields a Tuple.
val res = func( 2, p3 = 3 ) // Yields 2,0,3.
def fac(v: Int) = {var rv = 1; for( i <- 1 to v ) rv = rv * i; rv} // Returns Int.

// Recursive functions need a return type specifying.
def fac2(n: Int): Int = if (n <= 0) 1 else n * fac2(n - 1)

// Variable argument sets.
def sum(args: Int*) = { var tot = 0; for (i <- args) tot += i; tot }
sum(1,2,3)
sum(1 to 5: _*) // _* syntax is specific to parameters.

// Procedures - no "=" between (param) and {code...}
def proc( name: String ) {"Hello " + name} // Returns Unit ie. ().  Can declare as proc(...): Unit = {...}.
```

### Arrays

```scala
// Fixed length Arrays.
val nums = new Array[Int](10)
nums(0)=10; // Can update array elements.
val strs = Array("one","two") // no new.

// Variable Length Arrays - Array Buffers.
import scala.collection.mutable.ArrayBuffer
val buff = ArrayBuffer[Int]()
buff += 9; buff += (2,3,4,5,6)
buff.trimEnd(2)
buff.insert(2,7); buff // Insert 6 before index 2.
buff.remove(2,3); buff // Remove starting pos 2, 3 elements.
buff.toArray // Creates a fixed size Array from Array Buffer.
val arrBuff = nums.toBuffer // Creates an Array Buffer from a fixed size Array.

// Traverse Array.
for (i <- fixBuff) println(i)
for (i <- (0 until fixBuff.length).reverse) println(i, fixBuff(i)) // In reverse.
for (i <- (0 until (fixBuff.length, 2))) println(i, fixBuff(i)) // Every other.

// Transforming Arrays.
val re1 = for (i <- fixBuff if i > 0) yield 10/i
val re2 = fixBuff.filter(_ > 0).map(10 / _)
Array(1,2,3,4).sum // Works for Array Buffer too.
val fb = ArrayBuffer(1,3,2); fb.sorted
val a = Array(1, 7, 2); scala.util.Sorting.quickSort(a); a // a is now Array(1, 2, 7).
a.mkString( "<", ",", ">") // Yields "<1,7,2>" - Note: toString yields the data type.

// Multidimensional Arrays - Arrays of Arrays.
val matrix = Array.ofDim[Int](3,4); matrix(2)(1) = 15
val triangle = new Array[Array[Int]](10) // An Array of variable length Arrays.
for (i <- 0 until triangle.length) triangle(i) = new Array[Int](i + 1) // Triangle shaped Array.
```

### Maps (hash tables)

```scala
val ages = Map("MN" -> 21, "FB" -> 44) // OR Map(("MN", 21), ("FB", 44)).  -> is pair operator.
val agesMut =  collection.mutable.Map("MN" -> 21, "FB" -> 44)
val mnAge = ages("MN") // Same as ages.get("MN").
val xxAge = ages.getOrElse("XX", 0) // Shortcut for if (ages.contains("XX")) ages("XX") else 0.
// ages2("MN") = 18 // not working in Intellij
agesMut += ("XX" -> 2, "YY" -> 34)
agesMut -= "FB"
val newAges = ages + ("XX" -> 16) // Note is ages was a var we could use age = ages + ...
for ((k, v) <- ages) println(k, v)
ages.keySet; ages.values // To yield the keys or the values.
val agesOrd = collection.immutable.SortedMap("MN" -> 18, "FB" -> 26) // Stores sorted on key.

// 'Zipping' Array to create a Map
val names3 = Array("MN", "FB"); val ages3 = Array(21, 34)
val people = names3.zip(ages3) // Yields Array((MN,21), (FB,34)).
```

### Classes (Note Classes can be nested)

```scala
class Per { var age = 0 }
val per = new Per() // Brackets not mandatory

// Getter/Setter methods are created for all fields (inc private but they are also private).
// With a val field only a getter is created. This allows:
per.age = 21; println(per.age) // Also per.age=_(21)

// Can replace/create getters and setters:
class Per2 {
   private var privAge = 0;
   def age = privAge // getter
   def age_=(newVal: Int) { if (newVal > privAge) privAge = newVa l} // Can't get younger
}
val per2 = new Per2
per2.age = 12; per2.age = 5; println(per2.age) // Prints 12

// Bean Properties (to match JavaBeans specification).  This will generate a getName():Unit
// method and a setName(newValue: String): Unit method.
// import scala.reflect.BeanProperty
// class Per3 { @BeanProperty var name: String = _ }

// Auxiliary Constructors (all aux' constructors must call previously defined constructor).
// They are all called this.
class Per4 {
   private var name = ""
   private var age = 0;
   def this(name: String) { this(); this.name = name }
   def this(name: String, age: Int) { this(name); this.age = age }
}
val p4a = new Per4; val p4b = new Per4("MN"); val p4c = new Per4("MN",21)

// Primary Constructor.  Is the code straight after definition.  With or without parameters.
class Per5 (val name: String = "no name") {
   private val whoMsg = "This is " + name // This is the constructor code.
   def who = whoMsg
}
val per5 = new Per5("MN"); println(per5.who) // Prints This is MN.
```

### Objects

```scala
// Singletons - Constructor run on first use.
object Accs { private var accNum = 0; def newAccNum() = { accNum += 1; accNum } }
println(Accs.newAccNum, Accs.newAccNum)

// Companion Objects.  Must be in same source file.  (In REPL use :paste mode to define).
class Accs2 {
   val accNum = Accs2.newAccNum() // As Class/Object share name, class can see object.
   private var bal = 0.0;
   def payIn(amt: Double) {bal += amt}
}
object Accs2 { private var accNum = 0; def newAccNum() = { accNum += 1; accNum } }

// Objects extending a Class or a Trait - TBC...

// The apply method.  eg. Array has an apply method so we can create an Array without
// specifying new.  Useful for declarations such as Array(Array(2,3), Array(3,4))
// Note: Array(100) calls apply and create an array of one Int value 100. new Array(100)
// creates an Array os 100 Int values of 0.

// Application Objects.
object HelloWorld { def main(args: Array[String]) {println("Hello World!")}}
object HelloWorld2 extends App {println("Hello world!")}

// Enumerations
object TrafficLightColor extends Enumeration {
   type TrafficLightColor = Value
   val Red, Yellow, Green = Value
}
import TrafficLightColor._
val x: TrafficLightColor = Red;
println(TrafficLightColor.values) // Yields a set of all the values.
```

### Packages

```scala
// Every package can have a single package object.  it shares the same name as the package
// and is declared at the same level (within the same parent package) as the package.

// Top of package notation - no braces required.  Chained definitions.
// -------------------------------
// package com.horstmann.impatient
// package people
// class Person ...
// -------------------------------

//package animal {
//   package object people {
//      val defaultName = "John Q. Public"
//   }
//   package people {
//      class Person {
//         var name = defaultName // A constant from the package
//      }
//   }
//}

// Can import all members of a package using import com.abc._
import java.awt.Color._
val colour1 = RED //Color.RED

// Once imported can access package members using shorter name.  Imports can be included
// anywhere in the code.  They follow usual scope rules which is useful when using them to
// deliver shorter names.
def dummy {
   import java.awt._
   val af = event.ActionEvent.ACTION_FIRST // java.awt.event.ActionEvent.ACTION_FIRST
}

import java.awt.{Color, Font} // Import only a few members
import java.awt.{Color => AwtColor} // Rename members
```

### Inheritance

```scala
// Notes: Only a primary subclass constructor can call super class constructor.

// Extending a Class
class Person3 {
   protected var sex = "unknown"
   var name = "unknown"
   var age = 0
   def getName: String = { "Name:" + name }
   def getAge: String = { "age:" + age }
}
class Worker extends Person3 {
   var salary = 0.0
   sex = "hidden" // sex is visible within subclass even though protected.
   override val getAge: String = "hidden" // override def with a String val
   override def getName: String = {
      "Worker:" + super.getName // Call the superclass method.
   }
}
val per = new Person3;
val wkr = new Worker; wkr.name="Fred"; wkr.getName  // Yields Worker:Name:Fred
// Note wkr.age and per.age not visible.
(wkr.isInstanceOf[Person3], wkr.isInstanceOf[Worker])  // True, True
(wkr.getClass == classOf[Person3], wkr.getClass == classOf[Worker]) // False, True

// per2 has type Person{def greeting: String}.  This could be used a a parameter:
// def meet( p: Person{def greeting: String}) { println(p.name + p.greeting) }
val per2 = new Person3 {
   def greeting = {"Hello!" + name}
}

// Abstract Class cannot be instantiated - forms the basis of other classes.
abstract class Person4 { def id: Int } // abstract method - we don't know how to calc.
class Worker4 extends Person4 { def id: Int = 1231 } // Override keyword not required.
```

### Files

```scala
import com.sun.org.apache.bcel.internal.classfile.SourceFile
import scala.io.Source

// Text Files, URLS
val srcFile = Source.fromFile("c:/MJN/dummy.txt", "UTF-8")
val lineIterator = srcFile.getLines; for (l <- lineIterator) {println(l)}
val lines = srcFile.getLines.toArray
val contents = srcFile.mkString
for (c <- srcFile) println(c) // Read characters.
val words = srcFile.mkString.split("\\s+") // Array of words sep by whitespace.
srcFile.close() // Close when finished.

val srcFile2 = Source.fromURL("http://www.mjnurse.uk", "UTF-8"); srcFile2.close()
val srcFile3 = Source.fromString("one two three"); srcFile3.close() // Useful for debug.

// Write Test Files - Scala has no built in support so use java.io.PrintWriter
// val out = new PrintWriter("numbers.txt"); for (i <- 1 to 5) out.println(i); out.close()

// Binary Files - scala has no provision for binary files so use Java
// val file = new File(filename); val in = new FileInputStream(file)
// val bytes = new Array[Byte](file.length.toInt)
// in.read(bytes); in.close()

// Serialization
// class Person6 extends Serializable { val name = "unknown" }
// val fred = new Person6
//  import java.io._
// Serialize
// val out = new ObjectOutputStream(new FileOutputStream("/tmp/test.obj"))
// out.writeObject(fred); out.close()
// Deserialize
// val in = new ObjectInputStream(new FileInputStream("/tmp/test.obj"))
// val savedFred = in.readObject().asInstanceOf[Person6]
```

### sys Process

```scala
import sys.process._
"c:/MJN/hello.bat" !  // Runs cmd

"c:/MJN/hello.bat" !! // Runs cmd returns String

// #| is pipe, #> and #< are redirect.
// "ls" #| "grep xxx" !
// "ls" #> new File("x") !
```

### Regexp

```scala
import util.matching.Regex
val numPattern = "[0-9]+".r
for (n <- numPattern.findAllIn("a11b12c13")) println(n) // Yields 11 12 13
numPattern.findAllIn("a 2 3").toArray // Yields Array(2,3)
numPattern.replaceAllIn("a 2 3", "x").toArray // Yields Array(a,x,x)
val spacePattern = """\s+""".r  // Instead of "\\s+"
for (s <- spacePattern.findAllIn("abc 12 def")) println("found") // Yields found found

// Regexp Groups
val numItemPttn = "([0-9]+) ([a-z]+)".r()
val numItemPttn(num, item) = "99 bottles" // Yields num=99, item=bottles
for (numItemPttn(num, item) <- numItemPttn.findAllIn("5 cats, 3 dogs")) { println(item, num)} // Yields (cats,5)(dogs,3)
```
<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 20/09/28 23:08</p>
