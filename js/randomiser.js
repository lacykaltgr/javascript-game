function keveres() {
	const listacska = ["a", "b", "C", "D", "e"];
    console.log(shuffle(listacska)[0]);
}


function shuffle(obj) {
	return sample(obj, Infinity);
	  }
	  
	  // Sample **n** random values from a collection using the modern version of the
	  // [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
function sample(obj, n, guard) {
//	if (n == null || guard) {
//	  if (!isArrayLike(obj)) obj = values(obj);
//	  return obj[random(obj.length - 1)];
//	}
//	var sample = isArrayLike(obj) ? clone(obj) : values(obj);
	var sample = clone(obj);
	var length = getLength(sample);
	n = Math.max(Math.min(n, length), 0);
	var last = length - 1;
	for (var index = 0; index < n; index++) {
	  var rand = random(index, last);
	  var temp = sample[index];
	  sample[index] = sample[rand];
	  sample[rand] = temp;
	}
	return sample.slice(0, n);
  }

  function keys(obj) {
	if (!isObject(obj)) return [];
	if (nativeKeys) return nativeKeys(obj);
	var _keys = [];
	for (var key in obj) if (_has(obj, key)) _keys.push(key);
	// Ahem, IE < 9.
	if (hasEnumBug) collectNonEnumProps(obj, _keys);
	return _keys;
  }

  function values(obj) {
	var _keys = keys(obj);
	var length = _keys.length;
	var values = Array(length);
	for (var i = 0; i < length; i++) {
	  values[i] = obj[_keys[i]];
	}
	return values;
  }


  // Baseline setup
// --------------

// Establish the root object, `window` (`self`) in the browser, `global`
// on the server, or `this` in some virtual machines. We use `self`
// instead of `window` for `WebWorker` support.
var root = typeof self == 'object' && self.self === self && self ||
typeof global == 'object' && global.global === global && global ||
Function('return this')() ||
{};

// Save bytes in the minified (but not gzipped) version:
var ArrayProto = Array.prototype, ObjProto = Object.prototype;
var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

// Create quick reference variables for speed access to core prototypes.
var push = ArrayProto.push,
slice = ArrayProto.slice,
toString = ObjProto.toString,
hasOwnProperty = ObjProto.hasOwnProperty;

// All **ECMAScript 5** native function implementations that we hope to use
// are declared here.
var nativeIsArray = Array.isArray,
nativeKeys = Object.keys,
nativeCreate = Object.create;

// Create references to these builtin functions because we override them.
var _isNaN = root.isNaN,
_isFinite = root.isFinite;

// Naked function reference for surrogate-prototype-swapping.
var Ctor = function(){};

// The Underscore object. All exported functions below are added to it in the
// modules/index-all.js using the mixin function.
function _(obj) {
if (obj instanceof _) return obj;
if (!(this instanceof _)) return new _(obj);
this._wrapped = obj;
}

// Internal function that returns an efficient (for current engines) version
// of the passed-in callback, to be repeatedly applied in other Underscore
// functions.
function optimizeCb(func, context, argCount) {
if (context === void 0) return func;
switch (argCount == null ? 3 : argCount) {
case 1: return function(value) {
return func.call(context, value);
};
// The 2-argument case is omitted because we’re not using it.
case 3: return function(value, index, collection) {
return func.call(context, value, index, collection);
};
case 4: return function(accumulator, value, index, collection) {
return func.call(context, accumulator, value, index, collection);
};
}
return function() {
return func.apply(context, arguments);
};
}

// An internal function to generate callbacks that can be applied to each
// element in a collection, returning the desired result — either `identity`,
// an arbitrary callback, a property matcher, or a property accessor.
function baseIteratee(value, context, argCount) {
if (value == null) return identity;
if (isFunction(value)) return optimizeCb(value, context, argCount);
if (isObject(value) && !isArray(value)) return matcher(value);
return property(value);
}

// External wrapper for our callback generator. Users may customize
// `_.iteratee` if they want additional predicate/iteratee shorthand styles.
// This abstraction hides the internal-only argCount argument.
_.iteratee = iteratee;
function iteratee(value, context) {
return baseIteratee(value, context, Infinity);
}

// The function we actually call internally. It invokes _.iteratee if
// overridden, otherwise baseIteratee.
function cb(value, context, argCount) {
if (_.iteratee !== iteratee) return _.iteratee(value, context);
return baseIteratee(value, context, argCount);
}

// Some functions take a variable number of arguments, or a few expected
// arguments at the beginning and then a variable number of values to operate
// on. This helper accumulates all remaining arguments past the function’s
// argument length (or an explicit `startIndex`), into an array that becomes
// the last argument. Similar to ES6’s "rest parameter".
function restArguments(func, startIndex) {
startIndex = startIndex == null ? func.length - 1 : +startIndex;
return function() {
var length = Math.max(arguments.length - startIndex, 0),
rest = Array(length),
index = 0;
for (; index < length; index++) {
rest[index] = arguments[index + startIndex];
}
switch (startIndex) {
case 0: return func.call(this, rest);
case 1: return func.call(this, arguments[0], rest);
case 2: return func.call(this, arguments[0], arguments[1], rest);
}
var args = Array(startIndex + 1);
for (index = 0; index < startIndex; index++) {
args[index] = arguments[index];
}
args[startIndex] = rest;
return func.apply(this, args);
};
}

// An internal function for creating a new object that inherits from another.
function baseCreate(prototype) {
if (!isObject(prototype)) return {};
if (nativeCreate) return nativeCreate(prototype);
Ctor.prototype = prototype;
var result = new Ctor;
Ctor.prototype = null;
return result;
}

function shallowProperty(key) {
return function(obj) {
return obj == null ? void 0 : obj[key];
};
}

function _has(obj, path) {
return obj != null && hasOwnProperty.call(obj, path);
}

function deepGet(obj, path) {
var length = path.length;
for (var i = 0; i < length; i++) {
if (obj == null) return void 0;
obj = obj[path[i]];
}
return length ? obj : void 0;
}

// Helper for collection methods to determine whether a collection
// should be iterated as an array or as an object.
// Related: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
// Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var getLength = shallowProperty('length');
function isArrayLike(collection) {
var length = getLength(collection);
return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
}



function random(min, max) {
	if (max == null) {
	  max = min;
	  min = 0;
	}
	return min + Math.floor(Math.random() * (max - min + 1));
  }

function clone(obj) {
	if (!isObject(obj)) return obj;
	return isArray(obj) ? obj.slice() : extend({}, obj);
  }

function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }
  
var isArray = nativeIsArray || tagTester('Array');