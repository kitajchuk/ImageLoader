/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/test.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ImageLoader.js":
/*!************************!*\
  !*** ./ImageLoader.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ImageLoader; });\n/* harmony import */ var properjs_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! properjs-controller */ \"./node_modules/properjs-controller/Controller.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\nvar ImageLoader = /*#__PURE__*/function (_Controller) {\n  _inherits(ImageLoader, _Controller);\n\n  var _super = _createSuper(ImageLoader);\n\n  function ImageLoader(options) {\n    var _this;\n\n    _classCallCheck(this, ImageLoader);\n\n    _this = _super.call(this);\n    _this._executor = options.executor ? options.executor.bind(_assertThisInitialized(_this)) : _this.executor.bind(_assertThisInitialized(_this));\n    _this._elements = options.elements || []; // allow empty?\n\n    _this._property = options.property || \"data-src\";\n    _this._loadType = options.loadType || \"async\";\n    _this._numLoaded = 0;\n    _this._num2Load = _this._elements.length;\n    _this._transitionDelay = options.transitionDelay || 0;\n    _this._transitionDuration = options.transitionDuration || 400;\n    _this._resolved = false;\n\n    if (!_this._num2Load) {\n      _this.resolve();\n    } else if (_this._loadType === \"sync\") {\n      _this.sync();\n    } else {\n      _this.async();\n    }\n\n    return _this;\n  }\n\n  _createClass(ImageLoader, [{\n    key: \"executor\",\n    value: function executor(el) {\n      var bounds = el.getBoundingClientRect();\n      return bounds.top < window.innerHeight && bounds.bottom > 0;\n    }\n  }, {\n    key: \"async\",\n    value: function async() {\n      var _this2 = this;\n\n      this.go(function () {\n        if (_this2._resolved) {\n          _this2.stop();\n        } else {\n          _this2.handle();\n        }\n      });\n    }\n  }, {\n    key: \"sync\",\n    value: function sync() {\n      var _this3 = this;\n\n      var syncLoad = function syncLoad() {\n        var elem = _this3._elements[_this3._numLoaded];\n        _this3._numLoaded++;\n\n        _this3.load(elem, function (error) {\n          if (!error && !_this3._resolved) {\n            syncLoad();\n          }\n        });\n      };\n\n      syncLoad();\n    }\n  }, {\n    key: \"load\",\n    value: function load(element, callback) {\n      var _this4 = this;\n\n      var image = null;\n      var timeout = null;\n      var isFunc = typeof callback === \"function\";\n      var isImage = element.nodeName === \"IMG\";\n      var source = element.getAttribute(this._property);\n\n      if (isImage) {\n        image = element;\n      } else {\n        image = new Image();\n      }\n\n      element.setAttribute(\"data-imageloader\", false);\n      timeout = setTimeout(function () {\n        clearTimeout(timeout);\n\n        image.onload = function () {\n          _this4.fire(\"load\", element);\n\n          if (!isImage) {\n            element.style.backgroundImage = \"url(\".concat(source, \")\");\n            image = null;\n          }\n\n          element.setAttribute(\"data-imageloader\", true);\n          timeout = setTimeout(function () {\n            clearTimeout(timeout);\n\n            if (_this4._numLoaded === _this4._num2Load && !_this4._resolved) {\n              _this4.resolve(true);\n            } else if (isFunc) {\n              // Errors first\n              callback(false);\n            }\n          }, _this4._transitionDuration);\n        };\n\n        image.onerror = function () {\n          _this4.fire(\"error\", element);\n\n          if (_this4._numLoaded === _this4._num2Load && !_this4._resolved) {\n            _this4.resolve(true);\n          } else if (isFunc) {\n            // Errors first\n            callback(true);\n          }\n        };\n\n        image.src = source;\n      }, this._transitionDelay);\n      return this;\n    }\n  }, {\n    key: \"handle\",\n    value: function handle() {\n      var elems = this.getNotLoaded();\n      var len = elems.length;\n\n      for (var i = 0; i < len; i++) {\n        if (this._executor(elems[i])) {\n          this._numLoaded++;\n          this.load(elems[i]);\n        }\n      }\n    }\n  }, {\n    key: \"getNotLoaded\",\n    value: function getNotLoaded() {\n      var elems = [];\n\n      for (var i = 0; i < this._elements.length; i++) {\n        if (!this._elements[i].getAttribute(\"data-imageloader\")) {\n          elems.push(this._elements[i]);\n        }\n      }\n\n      return elems;\n    }\n  }, {\n    key: \"resolve\",\n    value: function resolve() {\n      this._resolved = true;\n      this.fire(\"done\");\n    }\n  }]);\n\n  return ImageLoader;\n}(properjs_controller__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./ImageLoader.js?");

/***/ }),

/***/ "./node_modules/properjs-controller/Controller.js":
/*!********************************************************!*\
  !*** ./node_modules/properjs-controller/Controller.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Controller; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar raf = window.requestAnimationFrame;\nvar caf = window.cancelAnimationFrame;\n\nvar Controller = /*#__PURE__*/function () {\n  function Controller() {\n    _classCallCheck(this, Controller);\n\n    // Unique event IDs\n    this._uid = 0;\n    this._uprop = \"properjsUID\"; // Store for event handlers\n\n    this._handlers = {}; // RAF manager props\n\n    this._started = false;\n    this._paused = false;\n    this._cycle = null;\n  }\n\n  _createClass(Controller, [{\n    key: \"uid\",\n    value: function uid() {\n      this._uid = this._uid + 1;\n      return this._uid;\n    }\n  }, {\n    key: \"go\",\n    value: function go(callback) {\n      var _this = this;\n\n      if (this._started) {\n        return this;\n      }\n\n      this._started = true;\n\n      this._anim = function (elapsed) {\n        _this._cycle = raf(_this._anim);\n\n        if (typeof callback === \"function\") {\n          callback(elapsed);\n        }\n      };\n\n      this._cycle = raf(this._anim);\n    }\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      this._paused = true;\n      return this;\n    }\n  }, {\n    key: \"play\",\n    value: function play() {\n      this._paused = false;\n      return this;\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      caf(this._cycle);\n      this._paused = false;\n      this._started = false;\n      this._cycle = null;\n      return this;\n    }\n  }, {\n    key: \"on\",\n    value: function on(event, handler) {\n      var events = event.split(\" \");\n      handler[this._uprop] = this.uid();\n\n      for (var i = events.length; i--;) {\n        if (typeof handler === \"function\") {\n          if (!this._handlers[events[i]]) {\n            this._handlers[events[i]] = [];\n          }\n\n          this._handlers[events[i]].push(handler);\n        }\n      }\n\n      return this;\n    }\n  }, {\n    key: \"off\",\n    value: function off(event, handler) {\n      if (!this._handlers[event]) {\n        return this;\n      }\n\n      if (handler) {\n        this._offOne(event, handler);\n      } else {\n        this._offAll(event);\n      }\n\n      return this;\n    }\n  }, {\n    key: \"fire\",\n    value: function fire(event) {\n      if (!this._handlers[event]) {\n        return this;\n      }\n\n      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n        args[_key - 1] = arguments[_key];\n      }\n\n      for (var i = this._handlers[event].length; i--;) {\n        this._handlers[event][i].apply(this, args);\n      }\n\n      return this;\n    }\n  }, {\n    key: \"_offOne\",\n    value: function _offOne(event, handler) {\n      for (var i = 0, len = this._handlers[event].length; i < len; i++) {\n        if (handler[this._uprop] === this._handlers[event][i][this._uprop]) {\n          this._handlers[event].splice(i, 1);\n\n          break;\n        }\n      }\n    }\n  }, {\n    key: \"_offAll\",\n    value: function _offAll(event) {\n      for (var i = this._handlers[event].length; i--;) {\n        this._handlers[event][i] = null;\n      }\n\n      delete this._handlers[event];\n    }\n  }]);\n\n  return Controller;\n}();\n\n\n\n//# sourceURL=webpack:///./node_modules/properjs-controller/Controller.js?");

/***/ }),

/***/ "./test/test.js":
/*!**********************!*\
  !*** ./test/test.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ImageLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ImageLoader */ \"./ImageLoader.js\");\n\nvar loader = new _ImageLoader__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  elements: document.querySelectorAll(\".image\"),\n  property: \"data-src\",\n  // default\n  executor: function executor(el) {\n    // default\n    var bounds = el.getBoundingClientRect();\n    return bounds.top < window.innerHeight && bounds.bottom > 0;\n  },\n  loadType: \"async\" // default\n\n});\nloader.on(\"load\", function (el) {\n  console.log(\"loaded\", el.src);\n}).on(\"error\", function (el) {\n  console.log(\"error\", el.src);\n}).on(\"done\", function () {\n  console.log(\"done\");\n});\n\n//# sourceURL=webpack:///./test/test.js?");

/***/ })

/******/ });