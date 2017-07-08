/**
 * Since `var` declaration are hoisted, this happens
 */
 function getValue(condition) {
     if (condition) {
         var value = "blue";
         // other code
         return value;
     } else {
         // value exists here with a value of undefined
         return null;
     }
     // value exists here with a value of undefined
 }

 /**
  * `let` declarations are not hoisted and it should be in the beginning like `c`
  */
  function getValue(condition) {
     if (condition) {
         let value = "blue";
         // other code
         return value;
     } else {
         // value doesn't exist here
         return null;
     }
     // value doesn't exist here
 }

 /**
  * You can't reclare a variable with `let`
  */
  var count = 30;
 // Syntax error
 let count = 40;

 /**
  * However this doesn't throw error, because it is in different scope
  */
  var count = 30;
 // Does not throw an error
 if (condition) {
     let count = 40;
     // more code
 }

 /**
  * `const` declarations
  */
  // Valid constant
 const maxItems = 30;

 // Syntax error: missing initialization
 const name;
 /**
  * can't redeclare
  */
var message = "Hello!";
let age = 25;

 // Each of these would throw an error.
 const message = "Goodbye!";
 const age = 30;
/**
 * Can't change `const` value
 */
 const maxItems = 5;

 maxItems = 6;      // throws error

 /**
  * can't change object binding, but can change it value
  */
  const person = {
     name: "Nicholas"
 };

 // works
 person.name = "Greg";

 // throws an error
 person = {
     name: "Greg"
 };

 /**
  * Temporal Dead Zone (TDZ)
  * I don't quite understand this, but take it just like c
  * `let` declarations must be top of the code block
  */
  if (condition) {
     console.log(typeof value);  // ReferenceError!
     let value = "blue";
 }
/**
 * But since `let` declarations is optional and still `var` is valid, this happens
 */

console.log(typeof value);     // "undefined"
if (condition) {
    let value = "blue";
}
/**
 * Block binding in loops
 * Behaviour of `var`, `let` and `const`
 */
 for (var i = 0; i < 10; i++) {
     process(items[i]);
 }
 // i is still accessible here
 console.log(i);                     // 10

for (let i = 0; i < 10; i++) {
    process(items[i]);
}
// i is not accessible here - throws an error
console.log(i);


var funcs = [];
for (var i = 0; i < 10; i++) {
    funcs.push(function() { console.log(i); });
}
funcs.forEach(function(func) {
    func();     // outputs the number "10" ten times
});

//work around with anonymous, closure, IIFE function
var funcs = [];
for (var i = 0; i < 10; i++) {
    funcs.push((function(value) {
        return function() {
            console.log(value);
        }
    }(i)));
}
funcs.forEach(function(func) {
    func();     // outputs 0, then 1, then 2, up to 9
});


// Don't know how, but `i` is recreated everytime
var funcs = [];
for (let i = 0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
}
funcs.forEach(function(func) {
    func();     // outputs 0, then 1, then 2, up to 9
});

// same for `for-in` and `for-of` loops
var funcs = [],
    object = {
        a: true,
        b: true,
        c: true
    };
for (let key in object) {
    funcs.push(function() {
        console.log(key);
    });
}
funcs.forEach(function(func) {
    func();     // outputs "a", then "b", then "c"
});

// `const` not recreated??!!!
var funcs = [];

// throws an error after one iteration
for (const i = 0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
}


// `const` recreated in `for-in` and `for-of` loops though. WTF??!!
var funcs = [],
    object = {
        a: true,
        b: true,
        c: true
    };
// doesn't cause an error
for (const key in object) {
    funcs.push(function() {
        console.log(key);
    });
}
funcs.forEach(function(func) {
    func();     // outputs "a", then "b", then "c"
});


/**
 * Global Block Bindings
 */
// in a browser
var RegExp = "Hello!";
console.log(window.RegExp);     // "Hello!"
var ncz = "Hi!";
console.log(window.ncz);        // "Hi!"

// in a browser
let RegExp = "Hello!";
console.log(RegExp);                    // "Hello!"
console.log(window.RegExp === RegExp);  // false
const ncz = "Hi!";
console.log(ncz);                       // "Hi!"
console.log("ncz" in window);           // false


/**
 * Strings and RegExp
 */

/**
 * Probably I won't need it in my career. 16bit Unicode can't have symbols for
 * languages like `japanese` it needs 32 bit. So JS uses 2 chars to represent
 * One char. This makes issues when working with 32bit chars.
 * This update solves the issues
 */
var text = "𠮷";
console.log(text.length);           // 2
console.log(/^.$/.test(text));      // false
console.log(text.charAt(0));        // ""
console.log(text.charAt(1));        // ""
console.log(text.charCodeAt(0));    // 55362
console.log(text.charCodeAt(1));    // 57271


var text = "𠮷a";
console.log(text.charCodeAt(0));    // 55362
console.log(text.charCodeAt(1));    // 57271
console.log(text.charCodeAt(2));    // 97
console.log(text.codePointAt(0));   // 134071
console.log(text.codePointAt(1));   // 57271
console.log(text.codePointAt(2));   // 97


function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
}
console.log(is32Bit("𠮷"));         // true
console.log(is32Bit("a"));          // false


console.log(String.fromCodePoint(134071));  // "𠮷"

/**
 * There is also `normalize()` function which I don't understand
 */

/**
 * When using RegExp with 32 bit chars, use `u` flag
 */

var text = "𠮷";
console.log(text.length);           // 2
console.log(/^.$/.test(text));      // false
console.log(/^.$/u.test(text));     // true

function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}
console.log(codePointLength("abc"));    // 3
console.log(codePointLength("𠮷bc"));   // 3


// Test whether browser supports `u` flag
function hasRegExpU() {
    try {
        var pattern = new RegExp(".", "u");
        return true;
    } catch (ex) {
        return false;
    }
}

/**
 * Other string methods
 */

var msg = "Hello world!";

console.log(msg.startsWith("Hello"));       // true
console.log(msg.endsWith("!"));             // true
console.log(msg.includes("o"));             // true

console.log(msg.startsWith("o"));           // false
console.log(msg.endsWith("world!"));        // true
console.log(msg.includes("x"));             // false

console.log(msg.startsWith("o", 4));        // true
console.log(msg.endsWith("o", 8));          // true
console.log(msg.includes("o", 8));          // false

console.log("x".repeat(3));         // "xxx"
console.log("hello".repeat(2));     // "hellohello"
console.log("abc".repeat(4));       // "abcabcabcabc"

// Practical uses
// indent using a specified number of spaces
var indent = " ".repeat(4),
    indentLevel = 0;

// whenever you increase the indent
var newIndent = indent.repeat(++indentLevel);

/**
 * Another flat `y` which is sticky
 * Don't know what that means
 */
 var text = "hello1 hello2 hello3",
     pattern = /hello\d\s?/,
     result = pattern.exec(text),
     globalPattern = /hello\d\s?/g,
     globalResult = globalPattern.exec(text),
     stickyPattern = /hello\d\s?/y,
     stickyResult = stickyPattern.exec(text);

 console.log(result[0]);         // "hello1 "
 console.log(globalResult[0]);   // "hello1 "
 console.log(stickyResult[0]);   // "hello1 "

 pattern.lastIndex = 1;
 globalPattern.lastIndex = 1;
 stickyPattern.lastIndex = 1;

 result = pattern.exec(text);
 globalResult = globalPattern.exec(text);
 stickyResult = stickyPattern.exec(text);

 console.log(result[0]);         // "hello1 "
 console.log(globalResult[0]);   // "hello2 "
 console.log(stickyResult[0]);   // Error! stickyResult is null


 var text = "hello1 hello2 hello3",
    pattern = /hello\d\s?/,
    result = pattern.exec(text),
    globalPattern = /hello\d\s?/g,
    globalResult = globalPattern.exec(text),
    stickyPattern = /hello\d\s?/y,
    stickyResult = stickyPattern.exec(text);

console.log(result[0]);         // "hello1 "
console.log(globalResult[0]);   // "hello1 "
console.log(stickyResult[0]);   // "hello1 "

console.log(pattern.lastIndex);         // 0
console.log(globalPattern.lastIndex);   // 7
console.log(stickyPattern.lastIndex);   // 7

result = pattern.exec(text);
globalResult = globalPattern.exec(text);
stickyResult = stickyPattern.exec(text);

console.log(result[0]);         // "hello1 "
console.log(globalResult[0]);   // "hello2 "
console.log(stickyResult[0]);   // "hello2 "

console.log(pattern.lastIndex);         // 0
console.log(globalPattern.lastIndex);   // 14
console.log(stickyPattern.lastIndex);   // 14

// Testing sticky property is used in RegExp or not
var pattern = /hello\d/y;
console.log(pattern.sticky);    // true

// Check browser supports `y` tag
function hasRegExpY() {
    try {
        var pattern = new RegExp(".", "y");
        return true;
    } catch (ex) {
        return false;
    }
}

/**
 * Duplicating RegExp
 */

 var re1 = /ab/i,
     re2 = new RegExp(re1);

var re1 = /ab/i,
// throws an error in ES5, okay in ES6
re2 = new RegExp(re1, "g");

console.log(re1.toString());            // "/ab/i"
console.log(re2.toString());            // "/ab/g"

console.log(re1.test("ab"));            // true
console.log(re2.test("ab"));            // true

console.log(re1.test("AB"));            // true
console.log(re2.test("AB"));            // false

/**
 * Finding flags in ES5
 */
 function getFlags(re) {
     var text = re.toString();
     return text.substring(text.lastIndexOf("/") + 1, text.length);
 }
 // toString() is "/ab/g"
 var re = /ab/g;
 console.log(getFlags(re));          // "g"


/**
 * Just got better in ES6
 */
 var re = /ab/g;

 console.log(re.source);     // "ab"
 console.log(re.flags);      // "g"


/**
 * Template Literals
 */
 let message = `Hello world!`; // Note that `` ticks. It is NOT 'single quote'

 console.log(message);               // "Hello world!"
 console.log(typeof message);        // "string"
 console.log(message.length);        // 12

 let message = `\`Hello\` world!`;

console.log(message);               // "`Hello` world!"
console.log(typeof message);        // "string"
console.log(message.length);        // 14

// Multiline Strings in ES5
var message = "Multiline \
string";
console.log(message);       // "Multiline string"


var message = "Multiline \n\
string";
console.log(message);       // "Multiline
                            //  string"


var message = [
    "Multiline ",
    "string"
].join("\n");

let message = "Multiline \n" +
    "string";

/**
 * Just got better in ES6
 */
 let message = `Multiline
 string`;
 console.log(message);           // "Multiline
                                 //  string"
 console.log(message.length);    // 16

 let message = `Multiline
                string`;

 console.log(message);           // "Multiline
                                 //  string"
 console.log(message.length);    // 31

 let html = `
<div>
    <h1>Title</h1>
</div>`.trim();

/**
 * Substitue variables without concatenation like
 * var name = 'Venkat'
 * var message = 'My Name is ' + name;
 */
let name = "Nicholas",
    message = `Hello, ${name}.`;

console.log(message);       // "Hello, Nicholas."

let count = 10,
    price = 0.25,
    message = `${count} items cost $${(count * price).toFixed(2)}.`;

console.log(message);       // "10 items cost $2.50."

/**
 * Tagged Templates
 * I don't know why it is needed. Not clear from example
 */

 function passthru(literals, ...substitutions) {
     let result = "";

     // run the loop only for the substitution count
     for (let i = 0; i < substitutions.length; i++) {
         result += literals[i];
         result += substitutions[i];
     }

     // add the last literal
     result += literals[literals.length - 1];

     return result;
 }

 let count = 10,
     price = 0.25,
     message = passthru`${count} items cost $${(count * price).toFixed(2)}.`;

 console.log(message);       // "10 items cost $2.50."

 /**
  * Default parameter values in ES5
  */
  function makeRequest(url, timeout, callback) {
     timeout = timeout || 2000;
     callback = callback || function() {};
     // the rest of the function
 }

// More safer version because timeout can be 0
 function makeRequest(url, timeout, callback) {
     timeout = (typeof timeout !== "undefined") ? timeout : 2000;
     callback = (typeof callback !== "undefined") ? callback : function() {};
     // the rest of the function
 }

/**
 * Default parameter values in ES6
 */
 function makeRequest(url, timeout = 2000, callback = function() {}) {
     // the rest of the function
 }

 // uses default timeout and callback
 makeRequest("/foo");
 // uses default callback
 makeRequest("/foo", 500);
 // doesn't use defaults
 makeRequest("/foo", 500, function(body) {
     doSomething(body);
 });

// No default value for 3rd parameter? This is fine.
function makeRequest(url, timeout = 2000, callback) {
    // the rest of the function
}
// Only `undefined` can be used to trigger default value

// uses default timeout
makeRequest("/foo", undefined, function(body) {
    doSomething(body);
});
// uses default timeout
makeRequest("/foo");
// doesn't use default timeout
makeRequest("/foo", null, function(body) {
    doSomething(body);
});

/**
 * In ES5 non strict mode,
 * arguments object reflects the changes made to named parameters
 */
 function mixArgs(first, second) {
     console.log(first === arguments[0]);   //true
     console.log(second === arguments[1]);  //true
     first = "c";
     second = "d";
     console.log(first === arguments[0]);   //true
     console.log(second === arguments[1]);  //true
 }
 mixArgs("a", "b");

 /**
  * In ES5 strict mode, arguments object won't reflect changes
  */
  function mixArgs(first, second) {
      "use strict";
      console.log(first === arguments[0]);  //true
      console.log(second === arguments[1]); //true
      first = "c";
      second = "d"
      console.log(first === arguments[0]);  //false
      console.log(second === arguments[1]); //false
  }
  mixArgs("a", "b");

  /**
   * ES6 is same as ES5 strict mode. Regardless of mode
   */
   // not in strict mode
 function mixArgs(first, second = "b") {
     console.log(arguments.length); // 1. Since there is only one argument passed when calling function
     console.log(first === arguments[0]);   // true
     console.log(second === arguments[1]);  // false. Because arguments[1] is undefined
     first = "c";
     second = "d"
     console.log(first === arguments[0]);   // false
     console.log(second === arguments[1]);  // false
 }
 mixArgs("a");

 /**
  * Default parameters expressions.
  * It is not necessary for default values to be primitive.
  * It can be an expression
  */
  function getValue() {
     return 5;
 }
 // getValue with be executed when `add` called with one parameter
 // Remember the `()` or else you end up passing a function object
 function add(first, second = getValue()) {
     return first + second;
 }
 console.log(add(1, 1));     // 2
 console.log(add(1));        // 6

 /**
  * expression is evaluated only when the function is called.
  * So both of this examples are possible
  */
  function add(first, second = getValue()) {
      return first + second;
  }

  function add(first, second = first) {
      return first + second;
  }

  console.log(add(1, 1));     // 2
  console.log(add(1));        // 2

  /**
   * This is not possible
   */
   function add(first = second, second) {
     return first + second;
 }

 console.log(add(1, 1));         // 2
 console.log(add(undefined, 1)); // throws error

 /**
  * In ES5, this is how you deal with rest of the parameters
  */
  function pick(object) {
     let result = Object.create(null);
     // start at the second parameter
     for (let i = 1, len = arguments.length; i < len; i++) {
         result[arguments[i]] = object[arguments[i]];
     }
     return result;
 }

 let book = {
     title: "Understanding ECMAScript 6",
     author: "Nicholas C. Zakas",
     year: 2015
 };

 let bookData = pick(book, "author", "year");

 console.log(bookData.author);   // "Nicholas C. Zakas"
 console.log(bookData.year);     // 2015
/**
 * ES6 got better with `rest parameter` indicated by preceeding `...`
 * It(`keys`) will be an array
 */
 function pick(object, ...keys) {
     let result = Object.create(null);
     for (let i = 0, len = keys.length; i < len; i++) {
         result[keys[i]] = object[keys[i]];
     }
     return result;
 }

 // Syntax error: Can't have a named parameter after rest parameters
function pick(object, ...keys, last) {
    let result = Object.create(null);

    for (let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = object[keys[i]];
    }

    return result;
}

let object = {
    // Syntax error: Can't use rest param in setter
    set name(...value) {
        // do something
    }
};

/**
 * Function constructor. Never used this in ES5.
 * Don't know about its use in ES6
 */
 var add = new Function("first", "second", "return first + second");
 console.log(add(1, 1));     // 2

 var add = new Function("first", "second = first", "return first + second");
console.log(add(1, 1));     // 2
console.log(add(1));        // 2

var pickFirst = new Function("...args", "return args[0]");
console.log(pickFirst(1, 2));   // 1

/**
 * Spread operator.
 * `rest param` takes multiple arguments and combine them into one array
 * `spread operator` takes an array and split them into individual values
 */
 let value1 = 25,
     value2 = 50;

 console.log(Math.max(value1, value2));      // 50

 let values = [25, 50, 75, 100]
 // Unnecessarily complex with usage of `apply` and `this` binding
 // because max() only takes individual, comma separated values
 console.log(Math.max.apply(Math, values));  // 100

// spread operator `...` comes to rescue
 let values = [25, 50, 75, 100]
// equivalent to
// console.log(Math.max(25, 50, 75, 100));
console.log(Math.max(...values));           // 100

let values = [-25, -50, -75, -100]
console.log(Math.max(...values, 0));        // 0

/**
 * When using anonymous functions, debugging becomes difficult
 * ES6 introduces `name` property for all functions
 */
 function doSomething() {
     // ...
 }

 var doAnotherThing = function() {
     // ...
 };

 console.log(doSomething.name);          // "doSomething"
 console.log(doAnotherThing.name);       // "doAnotherThing"

 var doSomething = function doSomethingElse() {
    // ...
};

var person = {
    get firstName() {
        return "Nicholas"
    },
    sayName: function() {
        console.log(this.name);
    }
}

console.log(doSomething.name);      // "doSomethingElse"
console.log(person.sayName.name);   // "sayName"

var descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
console.log(descriptor.get.name); // "get firstName"

var doSomething = function() {
    // ...
};

console.log(doSomething.bind().name);   // "bound doSomething"
console.log((new Function()).name);     // "anonymous"

/**
 * You can use functions for dual purpose in ES5
 * which leads to confusion
 */
 function Person(name) {
     this.name = name;
 }

 var person = new Person("Nicholas");
 var notAPerson = Person("Nicholas");

 console.log(person);        // "[Object object]"
 console.log(notAPerson);    // "undefined"

 /**
  * ES6 adds [[Call]] and [[Construct]] methods
  * without `new` [[Call]] method is called
  * with `new` [[Construct]] method is called
  */
