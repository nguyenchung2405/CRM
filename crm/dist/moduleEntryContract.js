var RemoteContract;
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "webpack/container/entry/RemoteContract":
/*!***********************!*\
  !*** container entry ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var moduleMap = {
	"./ButtonContractService": function() {
		return __webpack_require__.e("src_App_js").then(function() { return function() { return (__webpack_require__(/*! ./src/App.js */ "./src/App.js")); }; });
	},
	"./MenuContractService": function() {
		return __webpack_require__.e("src_components_sidebar_Sidebar_js").then(function() { return function() { return (__webpack_require__(/*! ./src/components/sidebar/Sidebar.js */ "./src/components/sidebar/Sidebar.js")); }; });
	}
};
var get = function(module, getScope) {
	__webpack_require__.R = getScope;
	getScope = (
		__webpack_require__.o(moduleMap, module)
			? moduleMap[module]()
			: Promise.resolve().then(function() {
				throw new Error('Module "' + module + '" does not exist in container.');
			})
	);
	__webpack_require__.R = undefined;
	return getScope;
};
var init = function(shareScope, initScope) {
	if (!__webpack_require__.S) return;
	var name = "default"
	var oldScope = __webpack_require__.S[name];
	if(oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");
	__webpack_require__.S[name] = shareScope;
	return __webpack_require__.I(name, initScope);
};

// This exports getters to disallow modifications
__webpack_require__.d(exports, {
	get: function() { return get; },
	init: function() { return init; }
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	!function() {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = function(chunkId) {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce(function(promises, key) {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "profile:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key, chunkId) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			};
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/sharing */
/******/ 	!function() {
/******/ 		__webpack_require__.S = {};
/******/ 		var initPromises = {};
/******/ 		var initTokens = {};
/******/ 		__webpack_require__.I = function(name, initScope) {
/******/ 			if(!initScope) initScope = [];
/******/ 			// handling circular init calls
/******/ 			var initToken = initTokens[name];
/******/ 			if(!initToken) initToken = initTokens[name] = {};
/******/ 			if(initScope.indexOf(initToken) >= 0) return;
/******/ 			initScope.push(initToken);
/******/ 			// only runs once
/******/ 			if(initPromises[name]) return initPromises[name];
/******/ 			// creates a new share scope if needed
/******/ 			if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 			// runs all init snippets from all modules reachable
/******/ 			var scope = __webpack_require__.S[name];
/******/ 			var warn = function(msg) { return typeof console !== "undefined" && console.warn && console.warn(msg); };
/******/ 			var uniqueName = "profile";
/******/ 			var register = function(name, version, factory, eager) {
/******/ 				var versions = scope[name] = scope[name] || {};
/******/ 				var activeVersion = versions[version];
/******/ 				if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 			};
/******/ 			var initExternal = function(id) {
/******/ 				var handleError = function(err) { warn("Initialization of sharing external failed: " + err); };
/******/ 				try {
/******/ 					var module = __webpack_require__(id);
/******/ 					if(!module) return;
/******/ 					var initFn = function(module) { return module && module.init && module.init(__webpack_require__.S[name], initScope); }
/******/ 					if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 					var initResult = initFn(module);
/******/ 					if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 				} catch(err) { handleError(err); }
/******/ 			}
/******/ 			var promises = [];
/******/ 			switch(name) {
/******/ 				case "default": {
/******/ 					register("@reduxjs/toolkit", "1.9.0", function() { return __webpack_require__.e("node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js-_8bb30").then(function() { return function() { return __webpack_require__(/*! ./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js"); }; }); });
/******/ 					register("antd", "4.24.3", function() { return __webpack_require__.e("node_modules_antd_es_index_js-_81d70").then(function() { return function() { return __webpack_require__(/*! ./node_modules/antd/es/index.js */ "./node_modules/antd/es/index.js"); }; }); });
/******/ 					register("axios", "0.27.2", function() { return __webpack_require__.e("node_modules_axios_index_js").then(function() { return function() { return __webpack_require__(/*! ./node_modules/axios/index.js */ "./node_modules/axios/index.js"); }; }); });
/******/ 					register("moment", "2.29.4", function() { return __webpack_require__.e("node_modules_moment_moment_js").then(function() { return function() { return __webpack_require__(/*! ./node_modules/moment/moment.js */ "./node_modules/moment/moment.js"); }; }); });
/******/ 					register("react-dom", "18.2.0", function() { return __webpack_require__.e("node_modules_react-dom_index_js-_8bc81").then(function() { return function() { return __webpack_require__(/*! ./node_modules/react-dom/index.js */ "./node_modules/react-dom/index.js"); }; }); });
/******/ 					register("react-redux", "8.0.5", function() { return __webpack_require__.e("node_modules_react-redux_es_index_js-_fcc20").then(function() { return function() { return __webpack_require__(/*! ./node_modules/react-redux/es/index.js */ "./node_modules/react-redux/es/index.js"); }; }); });
/******/ 					register("react-router-dom", "6.4.3", function() { return __webpack_require__.e("node_modules_react-router-dom_dist_index_js-_48e81").then(function() { return function() { return __webpack_require__(/*! ./node_modules/react-router-dom/dist/index.js */ "./node_modules/react-router-dom/dist/index.js"); }; }); });
/******/ 					register("react", "18.2.0", function() { return __webpack_require__.e("node_modules_react_index_js").then(function() { return function() { return __webpack_require__(/*! ./node_modules/react/index.js */ "./node_modules/react/index.js"); }; }); });
/******/ 				}
/******/ 				break;
/******/ 			}
/******/ 			if(!promises.length) return initPromises[name] = 1;
/******/ 			return initPromises[name] = Promise.all(promises).then(function() { return initPromises[name] = 1; });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/consumes */
/******/ 	!function() {
/******/ 		var parseVersion = function(str) {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			var p=function(p){return p.split(".").map((function(p){return+p==p?+p:p}))},n=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(str),r=n[1]?p(n[1]):[];return n[2]&&(r.length++,r.push.apply(r,p(n[2]))),n[3]&&(r.push([]),r.push.apply(r,p(n[3]))),r;
/******/ 		}
/******/ 		var versionLt = function(a, b) {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			a=parseVersion(a),b=parseVersion(b);for(var r=0;;){if(r>=a.length)return r<b.length&&"u"!=(typeof b[r])[0];var e=a[r],n=(typeof e)[0];if(r>=b.length)return"u"==n;var t=b[r],f=(typeof t)[0];if(n!=f)return"o"==n&&"n"==f||("s"==f||"u"==n);if("o"!=n&&"u"!=n&&e!=t)return e<t;r++}
/******/ 		}
/******/ 		var rangeToString = function(range) {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			var r=range[0],n="";if(1===range.length)return"*";if(r+.5){n+=0==r?">=":-1==r?"<":1==r?"^":2==r?"~":r>0?"=":"!=";for(var e=1,a=1;a<range.length;a++){e--,n+="u"==(typeof(t=range[a]))[0]?"-":(e>0?".":"")+(e=2,t)}return n}var g=[];for(a=1;a<range.length;a++){var t=range[a];g.push(0===t?"not("+o()+")":1===t?"("+o()+" || "+o()+")":2===t?g.pop()+" "+g.pop():rangeToString(t))}return o();function o(){return g.pop().replace(/^\((.+)\)$/,"$1")}
/******/ 		}
/******/ 		var satisfy = function(range, version) {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			if(0 in range){version=parseVersion(version);var e=range[0],r=e<0;r&&(e=-e-1);for(var n=0,i=1,a=!0;;i++,n++){var f,s,g=i<range.length?(typeof range[i])[0]:"";if(n>=version.length||"o"==(s=(typeof(f=version[n]))[0]))return!a||("u"==g?i>e&&!r:""==g!=r);if("u"==s){if(!a||"u"!=g)return!1}else if(a)if(g==s)if(i<=e){if(f!=range[i])return!1}else{if(r?f>range[i]:f<range[i])return!1;f!=range[i]&&(a=!1)}else if("s"!=g&&"n"!=g){if(r||i<=e)return!1;a=!1,i--}else{if(i<=e||s<g!=r)return!1;a=!1}else"s"!=g&&"n"!=g&&(a=!1,i--)}}var t=[],o=t.pop.bind(t);for(n=1;n<range.length;n++){var u=range[n];t.push(1==u?o()|o():2==u?o()&o():u?satisfy(u,version):!o())}return!!o();
/******/ 		}
/******/ 		var ensureExistence = function(scopeName, key) {
/******/ 			var scope = __webpack_require__.S[scopeName];
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) throw new Error("Shared module " + key + " doesn't exist in shared scope " + scopeName);
/******/ 			return scope;
/******/ 		};
/******/ 		var findVersion = function(scope, key) {
/******/ 			var versions = scope[key];
/******/ 			var key = Object.keys(versions).reduce(function(a, b) {
/******/ 				return !a || versionLt(a, b) ? b : a;
/******/ 			}, 0);
/******/ 			return key && versions[key]
/******/ 		};
/******/ 		var findSingletonVersionKey = function(scope, key) {
/******/ 			var versions = scope[key];
/******/ 			return Object.keys(versions).reduce(function(a, b) {
/******/ 				return !a || (!versions[a].loaded && versionLt(a, b)) ? b : a;
/******/ 			}, 0);
/******/ 		};
/******/ 		var getInvalidSingletonVersionMessage = function(scope, key, version, requiredVersion) {
/******/ 			return "Unsatisfied version " + version + " from " + (version && scope[key][version].from) + " of shared singleton module " + key + " (required " + rangeToString(requiredVersion) + ")"
/******/ 		};
/******/ 		var getSingleton = function(scope, scopeName, key, requiredVersion) {
/******/ 			var version = findSingletonVersionKey(scope, key);
/******/ 			return get(scope[key][version]);
/******/ 		};
/******/ 		var getSingletonVersion = function(scope, scopeName, key, requiredVersion) {
/******/ 			var version = findSingletonVersionKey(scope, key);
/******/ 			if (!satisfy(requiredVersion, version)) typeof console !== "undefined" && console.warn && console.warn(getInvalidSingletonVersionMessage(scope, key, version, requiredVersion));
/******/ 			return get(scope[key][version]);
/******/ 		};
/******/ 		var getStrictSingletonVersion = function(scope, scopeName, key, requiredVersion) {
/******/ 			var version = findSingletonVersionKey(scope, key);
/******/ 			if (!satisfy(requiredVersion, version)) throw new Error(getInvalidSingletonVersionMessage(scope, key, version, requiredVersion));
/******/ 			return get(scope[key][version]);
/******/ 		};
/******/ 		var findValidVersion = function(scope, key, requiredVersion) {
/******/ 			var versions = scope[key];
/******/ 			var key = Object.keys(versions).reduce(function(a, b) {
/******/ 				if (!satisfy(requiredVersion, b)) return a;
/******/ 				return !a || versionLt(a, b) ? b : a;
/******/ 			}, 0);
/******/ 			return key && versions[key]
/******/ 		};
/******/ 		var getInvalidVersionMessage = function(scope, scopeName, key, requiredVersion) {
/******/ 			var versions = scope[key];
/******/ 			return "No satisfying version (" + rangeToString(requiredVersion) + ") of shared module " + key + " found in shared scope " + scopeName + ".\n" +
/******/ 				"Available versions: " + Object.keys(versions).map(function(key) {
/******/ 				return key + " from " + versions[key].from;
/******/ 			}).join(", ");
/******/ 		};
/******/ 		var getValidVersion = function(scope, scopeName, key, requiredVersion) {
/******/ 			var entry = findValidVersion(scope, key, requiredVersion);
/******/ 			if(entry) return get(entry);
/******/ 			throw new Error(getInvalidVersionMessage(scope, scopeName, key, requiredVersion));
/******/ 		};
/******/ 		var warnInvalidVersion = function(scope, scopeName, key, requiredVersion) {
/******/ 			typeof console !== "undefined" && console.warn && console.warn(getInvalidVersionMessage(scope, scopeName, key, requiredVersion));
/******/ 		};
/******/ 		var get = function(entry) {
/******/ 			entry.loaded = 1;
/******/ 			return entry.get()
/******/ 		};
/******/ 		var init = function(fn) { return function(scopeName, a, b, c) {
/******/ 			var promise = __webpack_require__.I(scopeName);
/******/ 			if (promise && promise.then) return promise.then(fn.bind(fn, scopeName, __webpack_require__.S[scopeName], a, b, c));
/******/ 			return fn(scopeName, __webpack_require__.S[scopeName], a, b, c);
/******/ 		}; };
/******/ 		
/******/ 		var load = /*#__PURE__*/ init(function(scopeName, scope, key) {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return get(findVersion(scope, key));
/******/ 		});
/******/ 		var loadFallback = /*#__PURE__*/ init(function(scopeName, scope, key, fallback) {
/******/ 			return scope && __webpack_require__.o(scope, key) ? get(findVersion(scope, key)) : fallback();
/******/ 		});
/******/ 		var loadVersionCheck = /*#__PURE__*/ init(function(scopeName, scope, key, version) {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return get(findValidVersion(scope, key, version) || warnInvalidVersion(scope, scopeName, key, version) || findVersion(scope, key));
/******/ 		});
/******/ 		var loadSingleton = /*#__PURE__*/ init(function(scopeName, scope, key) {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getSingleton(scope, scopeName, key);
/******/ 		});
/******/ 		var loadSingletonVersionCheck = /*#__PURE__*/ init(function(scopeName, scope, key, version) {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadStrictVersionCheck = /*#__PURE__*/ init(function(scopeName, scope, key, version) {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getValidVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadStrictSingletonVersionCheck = /*#__PURE__*/ init(function(scopeName, scope, key, version) {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getStrictSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadVersionCheckFallback = /*#__PURE__*/ init(function(scopeName, scope, key, version, fallback) {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return get(findValidVersion(scope, key, version) || warnInvalidVersion(scope, scopeName, key, version) || findVersion(scope, key));
/******/ 		});
/******/ 		var loadSingletonFallback = /*#__PURE__*/ init(function(scopeName, scope, key, fallback) {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return getSingleton(scope, scopeName, key);
/******/ 		});
/******/ 		var loadSingletonVersionCheckFallback = /*#__PURE__*/ init(function(scopeName, scope, key, version, fallback) {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return getSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadStrictVersionCheckFallback = /*#__PURE__*/ init(function(scopeName, scope, key, version, fallback) {
/******/ 			var entry = scope && __webpack_require__.o(scope, key) && findValidVersion(scope, key, version);
/******/ 			return entry ? get(entry) : fallback();
/******/ 		});
/******/ 		var loadStrictSingletonVersionCheckFallback = /*#__PURE__*/ init(function(scopeName, scope, key, version, fallback) {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return getStrictSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var installedModules = {};
/******/ 		var moduleToHandlerMapping = {
/******/ 			"webpack/sharing/consume/default/moment/moment": function() { return loadStrictVersionCheckFallback("default", "moment", [1,2,29,4], function() { return __webpack_require__.e("node_modules_moment_moment_js").then(function() { return function() { return __webpack_require__(/*! moment */ "./node_modules/moment/moment.js"); }; }); }); },
/******/ 			"webpack/sharing/consume/default/react-dom/react-dom": function() { return loadSingletonVersionCheckFallback("default", "react-dom", [1,18,2,0], function() { return __webpack_require__.e("node_modules_react-dom_index_js-_8bc80").then(function() { return function() { return __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"); }; }); }); },
/******/ 			"webpack/sharing/consume/default/react/react": function() { return loadSingletonVersionCheckFallback("default", "react", [1,18,2,0], function() { return __webpack_require__.e("node_modules_react_index_js").then(function() { return function() { return __webpack_require__(/*! react */ "./node_modules/react/index.js"); }; }); }); },
/******/ 			"webpack/sharing/consume/default/@reduxjs/toolkit/@reduxjs/toolkit": function() { return loadStrictVersionCheckFallback("default", "@reduxjs/toolkit", [1,1,8,5], function() { return __webpack_require__.e("node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js-_8bb31").then(function() { return function() { return __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js"); }; }); }); },
/******/ 			"webpack/sharing/consume/default/axios/axios": function() { return loadStrictVersionCheckFallback("default", "axios", [2,0,27,2], function() { return __webpack_require__.e("node_modules_axios_index_js").then(function() { return function() { return __webpack_require__(/*! axios */ "./node_modules/axios/index.js"); }; }); }); },
/******/ 			"webpack/sharing/consume/default/react-redux/react-redux": function() { return loadStrictVersionCheckFallback("default", "react-redux", [1,8,0,2], function() { return __webpack_require__.e("node_modules_react-redux_es_index_js-_fcc21").then(function() { return function() { return __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js"); }; }); }); },
/******/ 			"webpack/sharing/consume/default/antd/antd": function() { return loadStrictVersionCheckFallback("default", "antd", [1,4,23,0], function() { return __webpack_require__.e("node_modules_antd_es_index_js-_81d71").then(function() { return function() { return __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js"); }; }); }); },
/******/ 			"webpack/sharing/consume/default/react-router-dom/react-router-dom": function() { return loadStrictVersionCheckFallback("default", "react-router-dom", [1,6,4,1], function() { return __webpack_require__.e("node_modules_react-router-dom_dist_index_js-_48e80").then(function() { return function() { return __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js"); }; }); }); }
/******/ 		};
/******/ 		// no consumes in initial chunks
/******/ 		var chunkMapping = {
/******/ 			"node_modules_antd_es_index_js-_81d70": [
/******/ 				"webpack/sharing/consume/default/moment/moment",
/******/ 				"webpack/sharing/consume/default/react-dom/react-dom",
/******/ 				"webpack/sharing/consume/default/react/react"
/******/ 			],
/******/ 			"node_modules_react-dom_index_js-_8bc81": [
/******/ 				"webpack/sharing/consume/default/react/react"
/******/ 			],
/******/ 			"node_modules_react-redux_es_index_js-_fcc20": [
/******/ 				"webpack/sharing/consume/default/react-dom/react-dom",
/******/ 				"webpack/sharing/consume/default/react/react"
/******/ 			],
/******/ 			"node_modules_react-router-dom_dist_index_js-_48e81": [
/******/ 				"webpack/sharing/consume/default/react/react"
/******/ 			],
/******/ 			"src_App_js": [
/******/ 				"webpack/sharing/consume/default/react/react",
/******/ 				"webpack/sharing/consume/default/@reduxjs/toolkit/@reduxjs/toolkit",
/******/ 				"webpack/sharing/consume/default/moment/moment",
/******/ 				"webpack/sharing/consume/default/axios/axios",
/******/ 				"webpack/sharing/consume/default/react-redux/react-redux",
/******/ 				"webpack/sharing/consume/default/antd/antd",
/******/ 				"webpack/sharing/consume/default/react-router-dom/react-router-dom"
/******/ 			],
/******/ 			"src_components_sidebar_Sidebar_js": [
/******/ 				"webpack/sharing/consume/default/react/react",
/******/ 				"webpack/sharing/consume/default/antd/antd",
/******/ 				"webpack/sharing/consume/default/react-router-dom/react-router-dom",
/******/ 				"webpack/sharing/consume/default/moment/moment"
/******/ 			],
/******/ 			"node_modules_react-redux_es_index_js-_fcc21": [
/******/ 				"webpack/sharing/consume/default/react-dom/react-dom"
/******/ 			],
/******/ 			"node_modules_antd_es_index_js-_81d71": [
/******/ 				"webpack/sharing/consume/default/react-dom/react-dom"
/******/ 			]
/******/ 		};
/******/ 		__webpack_require__.f.consumes = function(chunkId, promises) {
/******/ 			if(__webpack_require__.o(chunkMapping, chunkId)) {
/******/ 				chunkMapping[chunkId].forEach(function(id) {
/******/ 					if(__webpack_require__.o(installedModules, id)) return promises.push(installedModules[id]);
/******/ 					var onFactory = function(factory) {
/******/ 						installedModules[id] = 0;
/******/ 						__webpack_require__.m[id] = function(module) {
/******/ 							delete __webpack_require__.c[id];
/******/ 							module.exports = factory();
/******/ 						}
/******/ 					};
/******/ 					var onError = function(error) {
/******/ 						delete installedModules[id];
/******/ 						__webpack_require__.m[id] = function(module) {
/******/ 							delete __webpack_require__.c[id];
/******/ 							throw error;
/******/ 						}
/******/ 					};
/******/ 					try {
/******/ 						var promise = moduleToHandlerMapping[id]();
/******/ 						if(promise.then) {
/******/ 							promises.push(installedModules[id] = promise.then(onFactory)['catch'](onError));
/******/ 						} else onFactory(promise);
/******/ 					} catch(e) { onError(e); }
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"RemoteContract": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = function(chunkId, promises) {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise(function(resolve, reject) { installedChunkData = installedChunks[chunkId] = [resolve, reject]; });
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = function(event) {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkprofile"] = self["webpackChunkprofile"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("webpack/container/entry/RemoteContract");
/******/ 	RemoteContract = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlRW50cnlDb250cmFjdC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSwrREFBK0Qsb0JBQW9CLHNFQUFzRTtBQUN6SixFQUFFO0FBQ0Y7QUFDQSxzRkFBc0Ysb0JBQW9CLG9IQUFvSDtBQUM5TjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsYUFBYTtBQUNoQyxvQkFBb0I7QUFDcEIsQ0FBQzs7Ozs7O1VDakNEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDL0JBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7Ozs7O1dDUkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NKQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRCw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsdUJBQXVCLDRCQUE0QjtXQUNuRDtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIsb0JBQW9CO1dBQ3JDO1dBQ0EsbUdBQW1HLFlBQVk7V0FDL0c7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLDRDQUE0QyxtQkFBbUI7V0FDL0Q7V0FDQTtXQUNBLG1FQUFtRSxpQ0FBaUM7V0FDcEc7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDeENBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ0pBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsNEJBQTRCO1dBQzVCO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esb0pBQW9KO1dBQ3BKO1dBQ0E7V0FDQSxvQ0FBb0M7V0FDcEM7V0FDQTtXQUNBO1dBQ0EsbUNBQW1DO1dBQ25DO1dBQ0E7V0FDQTtXQUNBLElBQUksYUFBYTtXQUNqQjtXQUNBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxnSEFBZ0gsb0JBQW9CLDhKQUE4SixJQUFJO1dBQzVWLDJDQUEyQyx1RkFBdUYsb0JBQW9CLDBHQUEwRyxJQUFJO1dBQ3BRLDRDQUE0Qyw4RUFBOEUsb0JBQW9CLHNHQUFzRyxJQUFJO1dBQ3hQLDZDQUE2QyxnRkFBZ0Ysb0JBQW9CLDBHQUEwRyxJQUFJO1dBQy9QLGdEQUFnRCx5RkFBeUYsb0JBQW9CLDhHQUE4RyxJQUFJO1dBQy9RLGlEQUFpRCw4RkFBOEYsb0JBQW9CLHdIQUF3SCxJQUFJO1dBQy9SLHNEQUFzRCxxR0FBcUcsb0JBQW9CLHNJQUFzSSxJQUFJO1dBQ3pULDRDQUE0Qyw4RUFBOEUsb0JBQW9CLHNHQUFzRyxJQUFJO1dBQ3hQO1dBQ0E7V0FDQTtXQUNBO1dBQ0EscUVBQXFFLGdDQUFnQztXQUNyRzs7Ozs7V0NsREE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDZkE7V0FDQTtXQUNBLG1CQUFtQixxQ0FBcUMsaUJBQWlCLEdBQUcscUVBQXFFO1dBQ2pKO1dBQ0E7V0FDQTtXQUNBLHFDQUFxQyxhQUFhLEVBQUUsd0RBQXdELDJCQUEyQiw0QkFBNEIsMkJBQTJCLCtDQUErQyxtQ0FBbUM7V0FDaFI7V0FDQTtXQUNBO1dBQ0EscUJBQXFCLDhCQUE4QixTQUFTLHNEQUFzRCxnQkFBZ0IsZUFBZSxLQUFLLDZEQUE2RCxTQUFTLFNBQVMsUUFBUSxlQUFlLEtBQUssZUFBZSxxR0FBcUcsV0FBVyxhQUFhO1dBQzdZO1dBQ0E7V0FDQTtXQUNBLGdCQUFnQiw4QkFBOEIscUJBQXFCLFlBQVksc0JBQXNCLFNBQVMsaURBQWlELDZGQUE2RixXQUFXLHVCQUF1QiwyQkFBMkIsd0JBQXdCLEtBQUssb0NBQW9DLG9CQUFvQix3QkFBd0Isb0JBQW9CLFNBQVMsS0FBSyx5QkFBeUIsS0FBSyxnQ0FBZ0MseUJBQXlCLFFBQVEsZUFBZSxLQUFLLGVBQWUsNERBQTREO1dBQ3RvQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLDBCQUEwQjtXQUMxQjtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQSxDQUFDO1dBQ0Q7V0FDQTtXQUNBLENBQUM7V0FDRDtXQUNBO1dBQ0E7V0FDQSxDQUFDO1dBQ0Q7V0FDQTtXQUNBO1dBQ0EsQ0FBQztXQUNEO1dBQ0E7V0FDQTtXQUNBLENBQUM7V0FDRDtXQUNBO1dBQ0E7V0FDQSxDQUFDO1dBQ0Q7V0FDQTtXQUNBO1dBQ0EsQ0FBQztXQUNEO1dBQ0E7V0FDQTtXQUNBLENBQUM7V0FDRDtXQUNBO1dBQ0E7V0FDQSxDQUFDO1dBQ0Q7V0FDQTtXQUNBO1dBQ0EsQ0FBQztXQUNEO1dBQ0E7V0FDQTtXQUNBLENBQUM7V0FDRDtXQUNBO1dBQ0E7V0FDQSxDQUFDO1dBQ0Q7V0FDQTtXQUNBLCtEQUErRCxvRkFBb0YsZ0ZBQWdGLG9CQUFvQixpRkFBaUYsSUFBSSxJQUFJO1dBQ2hWLHFFQUFxRSwwRkFBMEYseUZBQXlGLG9CQUFvQixzRkFBc0YsSUFBSSxJQUFJO1dBQzFXLDZEQUE2RCxzRkFBc0YsOEVBQThFLG9CQUFvQiw4RUFBOEUsSUFBSSxJQUFJO1dBQzNVLG1GQUFtRiw2RkFBNkYsZ0hBQWdILG9CQUFvQixxSEFBcUgsSUFBSSxJQUFJO1dBQ2piLDZEQUE2RCxtRkFBbUYsOEVBQThFLG9CQUFvQiw4RUFBOEUsSUFBSSxJQUFJO1dBQ3hVLHlFQUF5RSx3RkFBd0YsOEZBQThGLG9CQUFvQiw2RkFBNkYsSUFBSSxJQUFJO1dBQ3hYLDJEQUEyRCxrRkFBa0YsdUZBQXVGLG9CQUFvQiwrRUFBK0UsSUFBSSxJQUFJO1dBQy9VLG1GQUFtRiw2RkFBNkYscUdBQXFHLG9CQUFvQix5R0FBeUcsSUFBSTtXQUN0WjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTTtXQUNOLEtBQUssV0FBVztXQUNoQixHQUFHO1dBQ0g7V0FDQTs7Ozs7V0MvTUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQzs7V0FFakM7V0FDQTtXQUNBO1dBQ0EsS0FBSztXQUNMLGVBQWU7V0FDZjtXQUNBLDJEQUEyRCxvRUFBb0U7V0FDL0g7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU07V0FDTjtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxtQ0FBbUM7V0FDcEU7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1dDdkZBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvZmlsZS93ZWJwYWNrL2NvbnRhaW5lci1lbnRyeSIsIndlYnBhY2s6Ly9wcm9maWxlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Byb2ZpbGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcHJvZmlsZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHJvZmlsZS93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL3Byb2ZpbGUvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL3Byb2ZpbGUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9wcm9maWxlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJvZmlsZS93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vcHJvZmlsZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Byb2ZpbGUvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9wcm9maWxlL3dlYnBhY2svcnVudGltZS9zaGFyaW5nIiwid2VicGFjazovL3Byb2ZpbGUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vcHJvZmlsZS93ZWJwYWNrL3J1bnRpbWUvY29uc3VtZXMiLCJ3ZWJwYWNrOi8vcHJvZmlsZS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9wcm9maWxlL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9wcm9maWxlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vcHJvZmlsZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcHJvZmlsZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG1vZHVsZU1hcCA9IHtcblx0XCIuL0J1dHRvbkNvbnRyYWN0U2VydmljZVwiOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwic3JjX0FwcF9qc1wiKS50aGVuKGZ1bmN0aW9uKCkgeyByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiAoX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9zcmMvQXBwLmpzICovIFwiLi9zcmMvQXBwLmpzXCIpKTsgfTsgfSk7XG5cdH0sXG5cdFwiLi9NZW51Q29udHJhY3RTZXJ2aWNlXCI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJzcmNfY29tcG9uZW50c19zaWRlYmFyX1NpZGViYXJfanNcIikudGhlbihmdW5jdGlvbigpIHsgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gKF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vc3JjL2NvbXBvbmVudHMvc2lkZWJhci9TaWRlYmFyLmpzICovIFwiLi9zcmMvY29tcG9uZW50cy9zaWRlYmFyL1NpZGViYXIuanNcIikpOyB9OyB9KTtcblx0fVxufTtcbnZhciBnZXQgPSBmdW5jdGlvbihtb2R1bGUsIGdldFNjb3BlKSB7XG5cdF9fd2VicGFja19yZXF1aXJlX18uUiA9IGdldFNjb3BlO1xuXHRnZXRTY29wZSA9IChcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9kdWxlTWFwLCBtb2R1bGUpXG5cdFx0XHQ/IG1vZHVsZU1hcFttb2R1bGVdKClcblx0XHRcdDogUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNb2R1bGUgXCInICsgbW9kdWxlICsgJ1wiIGRvZXMgbm90IGV4aXN0IGluIGNvbnRhaW5lci4nKTtcblx0XHRcdH0pXG5cdCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uUiA9IHVuZGVmaW5lZDtcblx0cmV0dXJuIGdldFNjb3BlO1xufTtcbnZhciBpbml0ID0gZnVuY3Rpb24oc2hhcmVTY29wZSwgaW5pdFNjb3BlKSB7XG5cdGlmICghX193ZWJwYWNrX3JlcXVpcmVfXy5TKSByZXR1cm47XG5cdHZhciBuYW1lID0gXCJkZWZhdWx0XCJcblx0dmFyIG9sZFNjb3BlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5TW25hbWVdO1xuXHRpZihvbGRTY29wZSAmJiBvbGRTY29wZSAhPT0gc2hhcmVTY29wZSkgdGhyb3cgbmV3IEVycm9yKFwiQ29udGFpbmVyIGluaXRpYWxpemF0aW9uIGZhaWxlZCBhcyBpdCBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkIHdpdGggYSBkaWZmZXJlbnQgc2hhcmUgc2NvcGVcIik7XG5cdF9fd2VicGFja19yZXF1aXJlX18uU1tuYW1lXSA9IHNoYXJlU2NvcGU7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLkkobmFtZSwgaW5pdFNjb3BlKTtcbn07XG5cbi8vIFRoaXMgZXhwb3J0cyBnZXR0ZXJzIHRvIGRpc2FsbG93IG1vZGlmaWNhdGlvbnNcbl9fd2VicGFja19yZXF1aXJlX18uZChleHBvcnRzLCB7XG5cdGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBnZXQ7IH0sXG5cdGluaXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gaW5pdDsgfVxufSk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZiA9IHt9O1xuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG5cdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmYpLnJlZHVjZShmdW5jdGlvbihwcm9taXNlcywga2V5KSB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5idW5kbGUuanNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwicHJvZmlsZTpcIjtcbi8vIGxvYWRTY3JpcHQgZnVuY3Rpb24gdG8gbG9hZCBhIHNjcmlwdCB2aWEgc2NyaXB0IHRhZ1xuX193ZWJwYWNrX3JlcXVpcmVfXy5sID0gZnVuY3Rpb24odXJsLCBkb25lLCBrZXksIGNodW5rSWQpIHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwgfHwgcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIikgPT0gZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIiwgZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpO1xuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uKHByZXYsIGV2ZW50KSB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaChmdW5jdGlvbihmbikgeyByZXR1cm4gZm4oZXZlbnQpOyB9KTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH07XG5cdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgdW5kZWZpbmVkLCB7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSksIDEyMDAwMCk7XG5cdHNjcmlwdC5vbmVycm9yID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmVycm9yKTtcblx0c2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25sb2FkKTtcblx0bmVlZEF0dGFjaCAmJiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG59OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5TID0ge307XG52YXIgaW5pdFByb21pc2VzID0ge307XG52YXIgaW5pdFRva2VucyA9IHt9O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5JID0gZnVuY3Rpb24obmFtZSwgaW5pdFNjb3BlKSB7XG5cdGlmKCFpbml0U2NvcGUpIGluaXRTY29wZSA9IFtdO1xuXHQvLyBoYW5kbGluZyBjaXJjdWxhciBpbml0IGNhbGxzXG5cdHZhciBpbml0VG9rZW4gPSBpbml0VG9rZW5zW25hbWVdO1xuXHRpZighaW5pdFRva2VuKSBpbml0VG9rZW4gPSBpbml0VG9rZW5zW25hbWVdID0ge307XG5cdGlmKGluaXRTY29wZS5pbmRleE9mKGluaXRUb2tlbikgPj0gMCkgcmV0dXJuO1xuXHRpbml0U2NvcGUucHVzaChpbml0VG9rZW4pO1xuXHQvLyBvbmx5IHJ1bnMgb25jZVxuXHRpZihpbml0UHJvbWlzZXNbbmFtZV0pIHJldHVybiBpbml0UHJvbWlzZXNbbmFtZV07XG5cdC8vIGNyZWF0ZXMgYSBuZXcgc2hhcmUgc2NvcGUgaWYgbmVlZGVkXG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oX193ZWJwYWNrX3JlcXVpcmVfXy5TLCBuYW1lKSkgX193ZWJwYWNrX3JlcXVpcmVfXy5TW25hbWVdID0ge307XG5cdC8vIHJ1bnMgYWxsIGluaXQgc25pcHBldHMgZnJvbSBhbGwgbW9kdWxlcyByZWFjaGFibGVcblx0dmFyIHNjb3BlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5TW25hbWVdO1xuXHR2YXIgd2FybiA9IGZ1bmN0aW9uKG1zZykgeyByZXR1cm4gdHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS53YXJuICYmIGNvbnNvbGUud2Fybihtc2cpOyB9O1xuXHR2YXIgdW5pcXVlTmFtZSA9IFwicHJvZmlsZVwiO1xuXHR2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbihuYW1lLCB2ZXJzaW9uLCBmYWN0b3J5LCBlYWdlcikge1xuXHRcdHZhciB2ZXJzaW9ucyA9IHNjb3BlW25hbWVdID0gc2NvcGVbbmFtZV0gfHwge307XG5cdFx0dmFyIGFjdGl2ZVZlcnNpb24gPSB2ZXJzaW9uc1t2ZXJzaW9uXTtcblx0XHRpZighYWN0aXZlVmVyc2lvbiB8fCAoIWFjdGl2ZVZlcnNpb24ubG9hZGVkICYmICghZWFnZXIgIT0gIWFjdGl2ZVZlcnNpb24uZWFnZXIgPyBlYWdlciA6IHVuaXF1ZU5hbWUgPiBhY3RpdmVWZXJzaW9uLmZyb20pKSkgdmVyc2lvbnNbdmVyc2lvbl0gPSB7IGdldDogZmFjdG9yeSwgZnJvbTogdW5pcXVlTmFtZSwgZWFnZXI6ICEhZWFnZXIgfTtcblx0fTtcblx0dmFyIGluaXRFeHRlcm5hbCA9IGZ1bmN0aW9uKGlkKSB7XG5cdFx0dmFyIGhhbmRsZUVycm9yID0gZnVuY3Rpb24oZXJyKSB7IHdhcm4oXCJJbml0aWFsaXphdGlvbiBvZiBzaGFyaW5nIGV4dGVybmFsIGZhaWxlZDogXCIgKyBlcnIpOyB9O1xuXHRcdHRyeSB7XG5cdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG5cdFx0XHRpZighbW9kdWxlKSByZXR1cm47XG5cdFx0XHR2YXIgaW5pdEZuID0gZnVuY3Rpb24obW9kdWxlKSB7IHJldHVybiBtb2R1bGUgJiYgbW9kdWxlLmluaXQgJiYgbW9kdWxlLmluaXQoX193ZWJwYWNrX3JlcXVpcmVfXy5TW25hbWVdLCBpbml0U2NvcGUpOyB9XG5cdFx0XHRpZihtb2R1bGUudGhlbikgcmV0dXJuIHByb21pc2VzLnB1c2gobW9kdWxlLnRoZW4oaW5pdEZuLCBoYW5kbGVFcnJvcikpO1xuXHRcdFx0dmFyIGluaXRSZXN1bHQgPSBpbml0Rm4obW9kdWxlKTtcblx0XHRcdGlmKGluaXRSZXN1bHQgJiYgaW5pdFJlc3VsdC50aGVuKSByZXR1cm4gcHJvbWlzZXMucHVzaChpbml0UmVzdWx0WydjYXRjaCddKGhhbmRsZUVycm9yKSk7XG5cdFx0fSBjYXRjaChlcnIpIHsgaGFuZGxlRXJyb3IoZXJyKTsgfVxuXHR9XG5cdHZhciBwcm9taXNlcyA9IFtdO1xuXHRzd2l0Y2gobmFtZSkge1xuXHRcdGNhc2UgXCJkZWZhdWx0XCI6IHtcblx0XHRcdHJlZ2lzdGVyKFwiQHJlZHV4anMvdG9vbGtpdFwiLCBcIjEuOS4wXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwibm9kZV9tb2R1bGVzX3JlZHV4anNfdG9vbGtpdF9kaXN0X3JlZHV4LXRvb2xraXRfZXNtX2pzLV84YmIzMFwiKS50aGVuKGZ1bmN0aW9uKCkgeyByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL25vZGVfbW9kdWxlcy9AcmVkdXhqcy90b29sa2l0L2Rpc3QvcmVkdXgtdG9vbGtpdC5lc20uanMgKi8gXCIuL25vZGVfbW9kdWxlcy9AcmVkdXhqcy90b29sa2l0L2Rpc3QvcmVkdXgtdG9vbGtpdC5lc20uanNcIik7IH07IH0pOyB9KTtcblx0XHRcdHJlZ2lzdGVyKFwiYW50ZFwiLCBcIjQuMjQuM1wiLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShcIm5vZGVfbW9kdWxlc19hbnRkX2VzX2luZGV4X2pzLV84MWQ3MFwiKS50aGVuKGZ1bmN0aW9uKCkgeyByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL25vZGVfbW9kdWxlcy9hbnRkL2VzL2luZGV4LmpzICovIFwiLi9ub2RlX21vZHVsZXMvYW50ZC9lcy9pbmRleC5qc1wiKTsgfTsgfSk7IH0pO1xuXHRcdFx0cmVnaXN0ZXIoXCJheGlvc1wiLCBcIjAuMjcuMlwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShcIm5vZGVfbW9kdWxlc19heGlvc19pbmRleF9qc1wiKS50aGVuKGZ1bmN0aW9uKCkgeyByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyAqLyBcIi4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzXCIpOyB9OyB9KTsgfSk7XG5cdFx0XHRyZWdpc3RlcihcIm1vbWVudFwiLCBcIjIuMjkuNFwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShcIm5vZGVfbW9kdWxlc19tb21lbnRfbW9tZW50X2pzXCIpLnRoZW4oZnVuY3Rpb24oKSB7IHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vbm9kZV9tb2R1bGVzL21vbWVudC9tb21lbnQuanMgKi8gXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbW9tZW50LmpzXCIpOyB9OyB9KTsgfSk7XG5cdFx0XHRyZWdpc3RlcihcInJlYWN0LWRvbVwiLCBcIjE4LjIuMFwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShcIm5vZGVfbW9kdWxlc19yZWFjdC1kb21faW5kZXhfanMtXzhiYzgxXCIpLnRoZW4oZnVuY3Rpb24oKSB7IHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9pbmRleC5qcyAqLyBcIi4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9pbmRleC5qc1wiKTsgfTsgfSk7IH0pO1xuXHRcdFx0cmVnaXN0ZXIoXCJyZWFjdC1yZWR1eFwiLCBcIjguMC41XCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwibm9kZV9tb2R1bGVzX3JlYWN0LXJlZHV4X2VzX2luZGV4X2pzLV9mY2MyMFwiKS50aGVuKGZ1bmN0aW9uKCkgeyByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9pbmRleC5qcyAqLyBcIi4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2luZGV4LmpzXCIpOyB9OyB9KTsgfSk7XG5cdFx0XHRyZWdpc3RlcihcInJlYWN0LXJvdXRlci1kb21cIiwgXCI2LjQuM1wiLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShcIm5vZGVfbW9kdWxlc19yZWFjdC1yb3V0ZXItZG9tX2Rpc3RfaW5kZXhfanMtXzQ4ZTgxXCIpLnRoZW4oZnVuY3Rpb24oKSB7IHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vZGlzdC9pbmRleC5qcyAqLyBcIi4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vZGlzdC9pbmRleC5qc1wiKTsgfTsgfSk7IH0pO1xuXHRcdFx0cmVnaXN0ZXIoXCJyZWFjdFwiLCBcIjE4LjIuMFwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShcIm5vZGVfbW9kdWxlc19yZWFjdF9pbmRleF9qc1wiKS50aGVuKGZ1bmN0aW9uKCkgeyByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL25vZGVfbW9kdWxlcy9yZWFjdC9pbmRleC5qcyAqLyBcIi4vbm9kZV9tb2R1bGVzL3JlYWN0L2luZGV4LmpzXCIpOyB9OyB9KTsgfSk7XG5cdFx0fVxuXHRcdGJyZWFrO1xuXHR9XG5cdGlmKCFwcm9taXNlcy5sZW5ndGgpIHJldHVybiBpbml0UHJvbWlzZXNbbmFtZV0gPSAxO1xuXHRyZXR1cm4gaW5pdFByb21pc2VzW25hbWVdID0gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24oKSB7IHJldHVybiBpbml0UHJvbWlzZXNbbmFtZV0gPSAxOyB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJ2YXIgcGFyc2VWZXJzaW9uID0gZnVuY3Rpb24oc3RyKSB7XG5cdC8vIHNlZSB3ZWJwYWNrL2xpYi91dGlsL3NlbXZlci5qcyBmb3Igb3JpZ2luYWwgY29kZVxuXHR2YXIgcD1mdW5jdGlvbihwKXtyZXR1cm4gcC5zcGxpdChcIi5cIikubWFwKChmdW5jdGlvbihwKXtyZXR1cm4rcD09cD8rcDpwfSkpfSxuPS9eKFteLStdKyk/KD86LShbXitdKykpPyg/OlxcKyguKykpPyQvLmV4ZWMoc3RyKSxyPW5bMV0/cChuWzFdKTpbXTtyZXR1cm4gblsyXSYmKHIubGVuZ3RoKyssci5wdXNoLmFwcGx5KHIscChuWzJdKSkpLG5bM10mJihyLnB1c2goW10pLHIucHVzaC5hcHBseShyLHAoblszXSkpKSxyO1xufVxudmFyIHZlcnNpb25MdCA9IGZ1bmN0aW9uKGEsIGIpIHtcblx0Ly8gc2VlIHdlYnBhY2svbGliL3V0aWwvc2VtdmVyLmpzIGZvciBvcmlnaW5hbCBjb2RlXG5cdGE9cGFyc2VWZXJzaW9uKGEpLGI9cGFyc2VWZXJzaW9uKGIpO2Zvcih2YXIgcj0wOzspe2lmKHI+PWEubGVuZ3RoKXJldHVybiByPGIubGVuZ3RoJiZcInVcIiE9KHR5cGVvZiBiW3JdKVswXTt2YXIgZT1hW3JdLG49KHR5cGVvZiBlKVswXTtpZihyPj1iLmxlbmd0aClyZXR1cm5cInVcIj09bjt2YXIgdD1iW3JdLGY9KHR5cGVvZiB0KVswXTtpZihuIT1mKXJldHVyblwib1wiPT1uJiZcIm5cIj09Znx8KFwic1wiPT1mfHxcInVcIj09bik7aWYoXCJvXCIhPW4mJlwidVwiIT1uJiZlIT10KXJldHVybiBlPHQ7cisrfVxufVxudmFyIHJhbmdlVG9TdHJpbmcgPSBmdW5jdGlvbihyYW5nZSkge1xuXHQvLyBzZWUgd2VicGFjay9saWIvdXRpbC9zZW12ZXIuanMgZm9yIG9yaWdpbmFsIGNvZGVcblx0dmFyIHI9cmFuZ2VbMF0sbj1cIlwiO2lmKDE9PT1yYW5nZS5sZW5ndGgpcmV0dXJuXCIqXCI7aWYocisuNSl7bis9MD09cj9cIj49XCI6LTE9PXI/XCI8XCI6MT09cj9cIl5cIjoyPT1yP1wiflwiOnI+MD9cIj1cIjpcIiE9XCI7Zm9yKHZhciBlPTEsYT0xO2E8cmFuZ2UubGVuZ3RoO2ErKyl7ZS0tLG4rPVwidVwiPT0odHlwZW9mKHQ9cmFuZ2VbYV0pKVswXT9cIi1cIjooZT4wP1wiLlwiOlwiXCIpKyhlPTIsdCl9cmV0dXJuIG59dmFyIGc9W107Zm9yKGE9MTthPHJhbmdlLmxlbmd0aDthKyspe3ZhciB0PXJhbmdlW2FdO2cucHVzaCgwPT09dD9cIm5vdChcIitvKCkrXCIpXCI6MT09PXQ/XCIoXCIrbygpK1wiIHx8IFwiK28oKStcIilcIjoyPT09dD9nLnBvcCgpK1wiIFwiK2cucG9wKCk6cmFuZ2VUb1N0cmluZyh0KSl9cmV0dXJuIG8oKTtmdW5jdGlvbiBvKCl7cmV0dXJuIGcucG9wKCkucmVwbGFjZSgvXlxcKCguKylcXCkkLyxcIiQxXCIpfVxufVxudmFyIHNhdGlzZnkgPSBmdW5jdGlvbihyYW5nZSwgdmVyc2lvbikge1xuXHQvLyBzZWUgd2VicGFjay9saWIvdXRpbC9zZW12ZXIuanMgZm9yIG9yaWdpbmFsIGNvZGVcblx0aWYoMCBpbiByYW5nZSl7dmVyc2lvbj1wYXJzZVZlcnNpb24odmVyc2lvbik7dmFyIGU9cmFuZ2VbMF0scj1lPDA7ciYmKGU9LWUtMSk7Zm9yKHZhciBuPTAsaT0xLGE9ITA7O2krKyxuKyspe3ZhciBmLHMsZz1pPHJhbmdlLmxlbmd0aD8odHlwZW9mIHJhbmdlW2ldKVswXTpcIlwiO2lmKG4+PXZlcnNpb24ubGVuZ3RofHxcIm9cIj09KHM9KHR5cGVvZihmPXZlcnNpb25bbl0pKVswXSkpcmV0dXJuIWF8fChcInVcIj09Zz9pPmUmJiFyOlwiXCI9PWchPXIpO2lmKFwidVwiPT1zKXtpZighYXx8XCJ1XCIhPWcpcmV0dXJuITF9ZWxzZSBpZihhKWlmKGc9PXMpaWYoaTw9ZSl7aWYoZiE9cmFuZ2VbaV0pcmV0dXJuITF9ZWxzZXtpZihyP2Y+cmFuZ2VbaV06ZjxyYW5nZVtpXSlyZXR1cm4hMTtmIT1yYW5nZVtpXSYmKGE9ITEpfWVsc2UgaWYoXCJzXCIhPWcmJlwiblwiIT1nKXtpZihyfHxpPD1lKXJldHVybiExO2E9ITEsaS0tfWVsc2V7aWYoaTw9ZXx8czxnIT1yKXJldHVybiExO2E9ITF9ZWxzZVwic1wiIT1nJiZcIm5cIiE9ZyYmKGE9ITEsaS0tKX19dmFyIHQ9W10sbz10LnBvcC5iaW5kKHQpO2ZvcihuPTE7bjxyYW5nZS5sZW5ndGg7bisrKXt2YXIgdT1yYW5nZVtuXTt0LnB1c2goMT09dT9vKCl8bygpOjI9PXU/bygpJm8oKTp1P3NhdGlzZnkodSx2ZXJzaW9uKTohbygpKX1yZXR1cm4hIW8oKTtcbn1cbnZhciBlbnN1cmVFeGlzdGVuY2UgPSBmdW5jdGlvbihzY29wZU5hbWUsIGtleSkge1xuXHR2YXIgc2NvcGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLlNbc2NvcGVOYW1lXTtcblx0aWYoIXNjb3BlIHx8ICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oc2NvcGUsIGtleSkpIHRocm93IG5ldyBFcnJvcihcIlNoYXJlZCBtb2R1bGUgXCIgKyBrZXkgKyBcIiBkb2Vzbid0IGV4aXN0IGluIHNoYXJlZCBzY29wZSBcIiArIHNjb3BlTmFtZSk7XG5cdHJldHVybiBzY29wZTtcbn07XG52YXIgZmluZFZlcnNpb24gPSBmdW5jdGlvbihzY29wZSwga2V5KSB7XG5cdHZhciB2ZXJzaW9ucyA9IHNjb3BlW2tleV07XG5cdHZhciBrZXkgPSBPYmplY3Qua2V5cyh2ZXJzaW9ucykucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRyZXR1cm4gIWEgfHwgdmVyc2lvbkx0KGEsIGIpID8gYiA6IGE7XG5cdH0sIDApO1xuXHRyZXR1cm4ga2V5ICYmIHZlcnNpb25zW2tleV1cbn07XG52YXIgZmluZFNpbmdsZXRvblZlcnNpb25LZXkgPSBmdW5jdGlvbihzY29wZSwga2V5KSB7XG5cdHZhciB2ZXJzaW9ucyA9IHNjb3BlW2tleV07XG5cdHJldHVybiBPYmplY3Qua2V5cyh2ZXJzaW9ucykucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRyZXR1cm4gIWEgfHwgKCF2ZXJzaW9uc1thXS5sb2FkZWQgJiYgdmVyc2lvbkx0KGEsIGIpKSA/IGIgOiBhO1xuXHR9LCAwKTtcbn07XG52YXIgZ2V0SW52YWxpZFNpbmdsZXRvblZlcnNpb25NZXNzYWdlID0gZnVuY3Rpb24oc2NvcGUsIGtleSwgdmVyc2lvbiwgcmVxdWlyZWRWZXJzaW9uKSB7XG5cdHJldHVybiBcIlVuc2F0aXNmaWVkIHZlcnNpb24gXCIgKyB2ZXJzaW9uICsgXCIgZnJvbSBcIiArICh2ZXJzaW9uICYmIHNjb3BlW2tleV1bdmVyc2lvbl0uZnJvbSkgKyBcIiBvZiBzaGFyZWQgc2luZ2xldG9uIG1vZHVsZSBcIiArIGtleSArIFwiIChyZXF1aXJlZCBcIiArIHJhbmdlVG9TdHJpbmcocmVxdWlyZWRWZXJzaW9uKSArIFwiKVwiXG59O1xudmFyIGdldFNpbmdsZXRvbiA9IGZ1bmN0aW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgcmVxdWlyZWRWZXJzaW9uKSB7XG5cdHZhciB2ZXJzaW9uID0gZmluZFNpbmdsZXRvblZlcnNpb25LZXkoc2NvcGUsIGtleSk7XG5cdHJldHVybiBnZXQoc2NvcGVba2V5XVt2ZXJzaW9uXSk7XG59O1xudmFyIGdldFNpbmdsZXRvblZlcnNpb24gPSBmdW5jdGlvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikge1xuXHR2YXIgdmVyc2lvbiA9IGZpbmRTaW5nbGV0b25WZXJzaW9uS2V5KHNjb3BlLCBrZXkpO1xuXHRpZiAoIXNhdGlzZnkocmVxdWlyZWRWZXJzaW9uLCB2ZXJzaW9uKSkgdHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS53YXJuICYmIGNvbnNvbGUud2FybihnZXRJbnZhbGlkU2luZ2xldG9uVmVyc2lvbk1lc3NhZ2Uoc2NvcGUsIGtleSwgdmVyc2lvbiwgcmVxdWlyZWRWZXJzaW9uKSk7XG5cdHJldHVybiBnZXQoc2NvcGVba2V5XVt2ZXJzaW9uXSk7XG59O1xudmFyIGdldFN0cmljdFNpbmdsZXRvblZlcnNpb24gPSBmdW5jdGlvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikge1xuXHR2YXIgdmVyc2lvbiA9IGZpbmRTaW5nbGV0b25WZXJzaW9uS2V5KHNjb3BlLCBrZXkpO1xuXHRpZiAoIXNhdGlzZnkocmVxdWlyZWRWZXJzaW9uLCB2ZXJzaW9uKSkgdGhyb3cgbmV3IEVycm9yKGdldEludmFsaWRTaW5nbGV0b25WZXJzaW9uTWVzc2FnZShzY29wZSwga2V5LCB2ZXJzaW9uLCByZXF1aXJlZFZlcnNpb24pKTtcblx0cmV0dXJuIGdldChzY29wZVtrZXldW3ZlcnNpb25dKTtcbn07XG52YXIgZmluZFZhbGlkVmVyc2lvbiA9IGZ1bmN0aW9uKHNjb3BlLCBrZXksIHJlcXVpcmVkVmVyc2lvbikge1xuXHR2YXIgdmVyc2lvbnMgPSBzY29wZVtrZXldO1xuXHR2YXIga2V5ID0gT2JqZWN0LmtleXModmVyc2lvbnMpLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG5cdFx0aWYgKCFzYXRpc2Z5KHJlcXVpcmVkVmVyc2lvbiwgYikpIHJldHVybiBhO1xuXHRcdHJldHVybiAhYSB8fCB2ZXJzaW9uTHQoYSwgYikgPyBiIDogYTtcblx0fSwgMCk7XG5cdHJldHVybiBrZXkgJiYgdmVyc2lvbnNba2V5XVxufTtcbnZhciBnZXRJbnZhbGlkVmVyc2lvbk1lc3NhZ2UgPSBmdW5jdGlvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikge1xuXHR2YXIgdmVyc2lvbnMgPSBzY29wZVtrZXldO1xuXHRyZXR1cm4gXCJObyBzYXRpc2Z5aW5nIHZlcnNpb24gKFwiICsgcmFuZ2VUb1N0cmluZyhyZXF1aXJlZFZlcnNpb24pICsgXCIpIG9mIHNoYXJlZCBtb2R1bGUgXCIgKyBrZXkgKyBcIiBmb3VuZCBpbiBzaGFyZWQgc2NvcGUgXCIgKyBzY29wZU5hbWUgKyBcIi5cXG5cIiArXG5cdFx0XCJBdmFpbGFibGUgdmVyc2lvbnM6IFwiICsgT2JqZWN0LmtleXModmVyc2lvbnMpLm1hcChmdW5jdGlvbihrZXkpIHtcblx0XHRyZXR1cm4ga2V5ICsgXCIgZnJvbSBcIiArIHZlcnNpb25zW2tleV0uZnJvbTtcblx0fSkuam9pbihcIiwgXCIpO1xufTtcbnZhciBnZXRWYWxpZFZlcnNpb24gPSBmdW5jdGlvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikge1xuXHR2YXIgZW50cnkgPSBmaW5kVmFsaWRWZXJzaW9uKHNjb3BlLCBrZXksIHJlcXVpcmVkVmVyc2lvbik7XG5cdGlmKGVudHJ5KSByZXR1cm4gZ2V0KGVudHJ5KTtcblx0dGhyb3cgbmV3IEVycm9yKGdldEludmFsaWRWZXJzaW9uTWVzc2FnZShzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikpO1xufTtcbnZhciB3YXJuSW52YWxpZFZlcnNpb24gPSBmdW5jdGlvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikge1xuXHR0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLndhcm4gJiYgY29uc29sZS53YXJuKGdldEludmFsaWRWZXJzaW9uTWVzc2FnZShzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikpO1xufTtcbnZhciBnZXQgPSBmdW5jdGlvbihlbnRyeSkge1xuXHRlbnRyeS5sb2FkZWQgPSAxO1xuXHRyZXR1cm4gZW50cnkuZ2V0KClcbn07XG52YXIgaW5pdCA9IGZ1bmN0aW9uKGZuKSB7IHJldHVybiBmdW5jdGlvbihzY29wZU5hbWUsIGEsIGIsIGMpIHtcblx0dmFyIHByb21pc2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLkkoc2NvcGVOYW1lKTtcblx0aWYgKHByb21pc2UgJiYgcHJvbWlzZS50aGVuKSByZXR1cm4gcHJvbWlzZS50aGVuKGZuLmJpbmQoZm4sIHNjb3BlTmFtZSwgX193ZWJwYWNrX3JlcXVpcmVfXy5TW3Njb3BlTmFtZV0sIGEsIGIsIGMpKTtcblx0cmV0dXJuIGZuKHNjb3BlTmFtZSwgX193ZWJwYWNrX3JlcXVpcmVfXy5TW3Njb3BlTmFtZV0sIGEsIGIsIGMpO1xufTsgfTtcblxudmFyIGxvYWQgPSAvKiNfX1BVUkVfXyovIGluaXQoZnVuY3Rpb24oc2NvcGVOYW1lLCBzY29wZSwga2V5KSB7XG5cdGVuc3VyZUV4aXN0ZW5jZShzY29wZU5hbWUsIGtleSk7XG5cdHJldHVybiBnZXQoZmluZFZlcnNpb24oc2NvcGUsIGtleSkpO1xufSk7XG52YXIgbG9hZEZhbGxiYWNrID0gLyojX19QVVJFX18qLyBpbml0KGZ1bmN0aW9uKHNjb3BlTmFtZSwgc2NvcGUsIGtleSwgZmFsbGJhY2spIHtcblx0cmV0dXJuIHNjb3BlICYmIF9fd2VicGFja19yZXF1aXJlX18ubyhzY29wZSwga2V5KSA/IGdldChmaW5kVmVyc2lvbihzY29wZSwga2V5KSkgOiBmYWxsYmFjaygpO1xufSk7XG52YXIgbG9hZFZlcnNpb25DaGVjayA9IC8qI19fUFVSRV9fKi8gaW5pdChmdW5jdGlvbihzY29wZU5hbWUsIHNjb3BlLCBrZXksIHZlcnNpb24pIHtcblx0ZW5zdXJlRXhpc3RlbmNlKHNjb3BlTmFtZSwga2V5KTtcblx0cmV0dXJuIGdldChmaW5kVmFsaWRWZXJzaW9uKHNjb3BlLCBrZXksIHZlcnNpb24pIHx8IHdhcm5JbnZhbGlkVmVyc2lvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHZlcnNpb24pIHx8IGZpbmRWZXJzaW9uKHNjb3BlLCBrZXkpKTtcbn0pO1xudmFyIGxvYWRTaW5nbGV0b24gPSAvKiNfX1BVUkVfXyovIGluaXQoZnVuY3Rpb24oc2NvcGVOYW1lLCBzY29wZSwga2V5KSB7XG5cdGVuc3VyZUV4aXN0ZW5jZShzY29wZU5hbWUsIGtleSk7XG5cdHJldHVybiBnZXRTaW5nbGV0b24oc2NvcGUsIHNjb3BlTmFtZSwga2V5KTtcbn0pO1xudmFyIGxvYWRTaW5nbGV0b25WZXJzaW9uQ2hlY2sgPSAvKiNfX1BVUkVfXyovIGluaXQoZnVuY3Rpb24oc2NvcGVOYW1lLCBzY29wZSwga2V5LCB2ZXJzaW9uKSB7XG5cdGVuc3VyZUV4aXN0ZW5jZShzY29wZU5hbWUsIGtleSk7XG5cdHJldHVybiBnZXRTaW5nbGV0b25WZXJzaW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgdmVyc2lvbik7XG59KTtcbnZhciBsb2FkU3RyaWN0VmVyc2lvbkNoZWNrID0gLyojX19QVVJFX18qLyBpbml0KGZ1bmN0aW9uKHNjb3BlTmFtZSwgc2NvcGUsIGtleSwgdmVyc2lvbikge1xuXHRlbnN1cmVFeGlzdGVuY2Uoc2NvcGVOYW1lLCBrZXkpO1xuXHRyZXR1cm4gZ2V0VmFsaWRWZXJzaW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgdmVyc2lvbik7XG59KTtcbnZhciBsb2FkU3RyaWN0U2luZ2xldG9uVmVyc2lvbkNoZWNrID0gLyojX19QVVJFX18qLyBpbml0KGZ1bmN0aW9uKHNjb3BlTmFtZSwgc2NvcGUsIGtleSwgdmVyc2lvbikge1xuXHRlbnN1cmVFeGlzdGVuY2Uoc2NvcGVOYW1lLCBrZXkpO1xuXHRyZXR1cm4gZ2V0U3RyaWN0U2luZ2xldG9uVmVyc2lvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHZlcnNpb24pO1xufSk7XG52YXIgbG9hZFZlcnNpb25DaGVja0ZhbGxiYWNrID0gLyojX19QVVJFX18qLyBpbml0KGZ1bmN0aW9uKHNjb3BlTmFtZSwgc2NvcGUsIGtleSwgdmVyc2lvbiwgZmFsbGJhY2spIHtcblx0aWYoIXNjb3BlIHx8ICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oc2NvcGUsIGtleSkpIHJldHVybiBmYWxsYmFjaygpO1xuXHRyZXR1cm4gZ2V0KGZpbmRWYWxpZFZlcnNpb24oc2NvcGUsIGtleSwgdmVyc2lvbikgfHwgd2FybkludmFsaWRWZXJzaW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgdmVyc2lvbikgfHwgZmluZFZlcnNpb24oc2NvcGUsIGtleSkpO1xufSk7XG52YXIgbG9hZFNpbmdsZXRvbkZhbGxiYWNrID0gLyojX19QVVJFX18qLyBpbml0KGZ1bmN0aW9uKHNjb3BlTmFtZSwgc2NvcGUsIGtleSwgZmFsbGJhY2spIHtcblx0aWYoIXNjb3BlIHx8ICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oc2NvcGUsIGtleSkpIHJldHVybiBmYWxsYmFjaygpO1xuXHRyZXR1cm4gZ2V0U2luZ2xldG9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSk7XG59KTtcbnZhciBsb2FkU2luZ2xldG9uVmVyc2lvbkNoZWNrRmFsbGJhY2sgPSAvKiNfX1BVUkVfXyovIGluaXQoZnVuY3Rpb24oc2NvcGVOYW1lLCBzY29wZSwga2V5LCB2ZXJzaW9uLCBmYWxsYmFjaykge1xuXHRpZighc2NvcGUgfHwgIV9fd2VicGFja19yZXF1aXJlX18ubyhzY29wZSwga2V5KSkgcmV0dXJuIGZhbGxiYWNrKCk7XG5cdHJldHVybiBnZXRTaW5nbGV0b25WZXJzaW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgdmVyc2lvbik7XG59KTtcbnZhciBsb2FkU3RyaWN0VmVyc2lvbkNoZWNrRmFsbGJhY2sgPSAvKiNfX1BVUkVfXyovIGluaXQoZnVuY3Rpb24oc2NvcGVOYW1lLCBzY29wZSwga2V5LCB2ZXJzaW9uLCBmYWxsYmFjaykge1xuXHR2YXIgZW50cnkgPSBzY29wZSAmJiBfX3dlYnBhY2tfcmVxdWlyZV9fLm8oc2NvcGUsIGtleSkgJiYgZmluZFZhbGlkVmVyc2lvbihzY29wZSwga2V5LCB2ZXJzaW9uKTtcblx0cmV0dXJuIGVudHJ5ID8gZ2V0KGVudHJ5KSA6IGZhbGxiYWNrKCk7XG59KTtcbnZhciBsb2FkU3RyaWN0U2luZ2xldG9uVmVyc2lvbkNoZWNrRmFsbGJhY2sgPSAvKiNfX1BVUkVfXyovIGluaXQoZnVuY3Rpb24oc2NvcGVOYW1lLCBzY29wZSwga2V5LCB2ZXJzaW9uLCBmYWxsYmFjaykge1xuXHRpZighc2NvcGUgfHwgIV9fd2VicGFja19yZXF1aXJlX18ubyhzY29wZSwga2V5KSkgcmV0dXJuIGZhbGxiYWNrKCk7XG5cdHJldHVybiBnZXRTdHJpY3RTaW5nbGV0b25WZXJzaW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgdmVyc2lvbik7XG59KTtcbnZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG52YXIgbW9kdWxlVG9IYW5kbGVyTWFwcGluZyA9IHtcblx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L21vbWVudC9tb21lbnRcIjogZnVuY3Rpb24oKSB7IHJldHVybiBsb2FkU3RyaWN0VmVyc2lvbkNoZWNrRmFsbGJhY2soXCJkZWZhdWx0XCIsIFwibW9tZW50XCIsIFsxLDIsMjksNF0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwibm9kZV9tb2R1bGVzX21vbWVudF9tb21lbnRfanNcIikudGhlbihmdW5jdGlvbigpIHsgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgbW9tZW50ICovIFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L21vbWVudC5qc1wiKTsgfTsgfSk7IH0pOyB9LFxuXHRcIndlYnBhY2svc2hhcmluZy9jb25zdW1lL2RlZmF1bHQvcmVhY3QtZG9tL3JlYWN0LWRvbVwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIGxvYWRTaW5nbGV0b25WZXJzaW9uQ2hlY2tGYWxsYmFjayhcImRlZmF1bHRcIiwgXCJyZWFjdC1kb21cIiwgWzEsMTgsMiwwXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJub2RlX21vZHVsZXNfcmVhY3QtZG9tX2luZGV4X2pzLV84YmM4MFwiKS50aGVuKGZ1bmN0aW9uKCkgeyByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISByZWFjdC1kb20gKi8gXCIuL25vZGVfbW9kdWxlcy9yZWFjdC1kb20vaW5kZXguanNcIik7IH07IH0pOyB9KTsgfSxcblx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L3JlYWN0L3JlYWN0XCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbG9hZFNpbmdsZXRvblZlcnNpb25DaGVja0ZhbGxiYWNrKFwiZGVmYXVsdFwiLCBcInJlYWN0XCIsIFsxLDE4LDIsMF0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwibm9kZV9tb2R1bGVzX3JlYWN0X2luZGV4X2pzXCIpLnRoZW4oZnVuY3Rpb24oKSB7IHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oLyohIHJlYWN0ICovIFwiLi9ub2RlX21vZHVsZXMvcmVhY3QvaW5kZXguanNcIik7IH07IH0pOyB9KTsgfSxcblx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L0ByZWR1eGpzL3Rvb2xraXQvQHJlZHV4anMvdG9vbGtpdFwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIGxvYWRTdHJpY3RWZXJzaW9uQ2hlY2tGYWxsYmFjayhcImRlZmF1bHRcIiwgXCJAcmVkdXhqcy90b29sa2l0XCIsIFsxLDEsOCw1XSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJub2RlX21vZHVsZXNfcmVkdXhqc190b29sa2l0X2Rpc3RfcmVkdXgtdG9vbGtpdF9lc21fanMtXzhiYjMxXCIpLnRoZW4oZnVuY3Rpb24oKSB7IHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oLyohIEByZWR1eGpzL3Rvb2xraXQgKi8gXCIuL25vZGVfbW9kdWxlcy9AcmVkdXhqcy90b29sa2l0L2Rpc3QvcmVkdXgtdG9vbGtpdC5lc20uanNcIik7IH07IH0pOyB9KTsgfSxcblx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L2F4aW9zL2F4aW9zXCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbG9hZFN0cmljdFZlcnNpb25DaGVja0ZhbGxiYWNrKFwiZGVmYXVsdFwiLCBcImF4aW9zXCIsIFsyLDAsMjcsMl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwibm9kZV9tb2R1bGVzX2F4aW9zX2luZGV4X2pzXCIpLnRoZW4oZnVuY3Rpb24oKSB7IHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oLyohIGF4aW9zICovIFwiLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanNcIik7IH07IH0pOyB9KTsgfSxcblx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L3JlYWN0LXJlZHV4L3JlYWN0LXJlZHV4XCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbG9hZFN0cmljdFZlcnNpb25DaGVja0ZhbGxiYWNrKFwiZGVmYXVsdFwiLCBcInJlYWN0LXJlZHV4XCIsIFsxLDgsMCwyXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJub2RlX21vZHVsZXNfcmVhY3QtcmVkdXhfZXNfaW5kZXhfanMtX2ZjYzIxXCIpLnRoZW4oZnVuY3Rpb24oKSB7IHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oLyohIHJlYWN0LXJlZHV4ICovIFwiLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvaW5kZXguanNcIik7IH07IH0pOyB9KTsgfSxcblx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L2FudGQvYW50ZFwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIGxvYWRTdHJpY3RWZXJzaW9uQ2hlY2tGYWxsYmFjayhcImRlZmF1bHRcIiwgXCJhbnRkXCIsIFsxLDQsMjMsMF0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwibm9kZV9tb2R1bGVzX2FudGRfZXNfaW5kZXhfanMtXzgxZDcxXCIpLnRoZW4oZnVuY3Rpb24oKSB7IHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oLyohIGFudGQgKi8gXCIuL25vZGVfbW9kdWxlcy9hbnRkL2VzL2luZGV4LmpzXCIpOyB9OyB9KTsgfSk7IH0sXG5cdFwid2VicGFjay9zaGFyaW5nL2NvbnN1bWUvZGVmYXVsdC9yZWFjdC1yb3V0ZXItZG9tL3JlYWN0LXJvdXRlci1kb21cIjogZnVuY3Rpb24oKSB7IHJldHVybiBsb2FkU3RyaWN0VmVyc2lvbkNoZWNrRmFsbGJhY2soXCJkZWZhdWx0XCIsIFwicmVhY3Qtcm91dGVyLWRvbVwiLCBbMSw2LDQsMV0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwibm9kZV9tb2R1bGVzX3JlYWN0LXJvdXRlci1kb21fZGlzdF9pbmRleF9qcy1fNDhlODBcIikudGhlbihmdW5jdGlvbigpIHsgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgcmVhY3Qtcm91dGVyLWRvbSAqLyBcIi4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vZGlzdC9pbmRleC5qc1wiKTsgfTsgfSk7IH0pOyB9XG59O1xuLy8gbm8gY29uc3VtZXMgaW4gaW5pdGlhbCBjaHVua3NcbnZhciBjaHVua01hcHBpbmcgPSB7XG5cdFwibm9kZV9tb2R1bGVzX2FudGRfZXNfaW5kZXhfanMtXzgxZDcwXCI6IFtcblx0XHRcIndlYnBhY2svc2hhcmluZy9jb25zdW1lL2RlZmF1bHQvbW9tZW50L21vbWVudFwiLFxuXHRcdFwid2VicGFjay9zaGFyaW5nL2NvbnN1bWUvZGVmYXVsdC9yZWFjdC1kb20vcmVhY3QtZG9tXCIsXG5cdFx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L3JlYWN0L3JlYWN0XCJcblx0XSxcblx0XCJub2RlX21vZHVsZXNfcmVhY3QtZG9tX2luZGV4X2pzLV84YmM4MVwiOiBbXG5cdFx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L3JlYWN0L3JlYWN0XCJcblx0XSxcblx0XCJub2RlX21vZHVsZXNfcmVhY3QtcmVkdXhfZXNfaW5kZXhfanMtX2ZjYzIwXCI6IFtcblx0XHRcIndlYnBhY2svc2hhcmluZy9jb25zdW1lL2RlZmF1bHQvcmVhY3QtZG9tL3JlYWN0LWRvbVwiLFxuXHRcdFwid2VicGFjay9zaGFyaW5nL2NvbnN1bWUvZGVmYXVsdC9yZWFjdC9yZWFjdFwiXG5cdF0sXG5cdFwibm9kZV9tb2R1bGVzX3JlYWN0LXJvdXRlci1kb21fZGlzdF9pbmRleF9qcy1fNDhlODFcIjogW1xuXHRcdFwid2VicGFjay9zaGFyaW5nL2NvbnN1bWUvZGVmYXVsdC9yZWFjdC9yZWFjdFwiXG5cdF0sXG5cdFwic3JjX0FwcF9qc1wiOiBbXG5cdFx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L3JlYWN0L3JlYWN0XCIsXG5cdFx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L0ByZWR1eGpzL3Rvb2xraXQvQHJlZHV4anMvdG9vbGtpdFwiLFxuXHRcdFwid2VicGFjay9zaGFyaW5nL2NvbnN1bWUvZGVmYXVsdC9tb21lbnQvbW9tZW50XCIsXG5cdFx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L2F4aW9zL2F4aW9zXCIsXG5cdFx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L3JlYWN0LXJlZHV4L3JlYWN0LXJlZHV4XCIsXG5cdFx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L2FudGQvYW50ZFwiLFxuXHRcdFwid2VicGFjay9zaGFyaW5nL2NvbnN1bWUvZGVmYXVsdC9yZWFjdC1yb3V0ZXItZG9tL3JlYWN0LXJvdXRlci1kb21cIlxuXHRdLFxuXHRcInNyY19jb21wb25lbnRzX3NpZGViYXJfU2lkZWJhcl9qc1wiOiBbXG5cdFx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L3JlYWN0L3JlYWN0XCIsXG5cdFx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L2FudGQvYW50ZFwiLFxuXHRcdFwid2VicGFjay9zaGFyaW5nL2NvbnN1bWUvZGVmYXVsdC9yZWFjdC1yb3V0ZXItZG9tL3JlYWN0LXJvdXRlci1kb21cIixcblx0XHRcIndlYnBhY2svc2hhcmluZy9jb25zdW1lL2RlZmF1bHQvbW9tZW50L21vbWVudFwiXG5cdF0sXG5cdFwibm9kZV9tb2R1bGVzX3JlYWN0LXJlZHV4X2VzX2luZGV4X2pzLV9mY2MyMVwiOiBbXG5cdFx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L3JlYWN0LWRvbS9yZWFjdC1kb21cIlxuXHRdLFxuXHRcIm5vZGVfbW9kdWxlc19hbnRkX2VzX2luZGV4X2pzLV84MWQ3MVwiOiBbXG5cdFx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L3JlYWN0LWRvbS9yZWFjdC1kb21cIlxuXHRdXG59O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmNvbnN1bWVzID0gZnVuY3Rpb24oY2h1bmtJZCwgcHJvbWlzZXMpIHtcblx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGNodW5rTWFwcGluZywgY2h1bmtJZCkpIHtcblx0XHRjaHVua01hcHBpbmdbY2h1bmtJZF0uZm9yRWFjaChmdW5jdGlvbihpZCkge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZE1vZHVsZXMsIGlkKSkgcmV0dXJuIHByb21pc2VzLnB1c2goaW5zdGFsbGVkTW9kdWxlc1tpZF0pO1xuXHRcdFx0dmFyIG9uRmFjdG9yeSA9IGZ1bmN0aW9uKGZhY3RvcnkpIHtcblx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tpZF0gPSAwO1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1baWRdID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIF9fd2VicGFja19yZXF1aXJlX18uY1tpZF07XG5cdFx0XHRcdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHR2YXIgb25FcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XG5cdFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW2lkXTtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW2lkXSA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRcdFx0XHRcdGRlbGV0ZSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbaWRdO1xuXHRcdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dmFyIHByb21pc2UgPSBtb2R1bGVUb0hhbmRsZXJNYXBwaW5nW2lkXSgpO1xuXHRcdFx0XHRpZihwcm9taXNlLnRoZW4pIHtcblx0XHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZE1vZHVsZXNbaWRdID0gcHJvbWlzZS50aGVuKG9uRmFjdG9yeSlbJ2NhdGNoJ10ob25FcnJvcikpO1xuXHRcdFx0XHR9IGVsc2Ugb25GYWN0b3J5KHByb21pc2UpO1xuXHRcdFx0fSBjYXRjaChlKSB7IG9uRXJyb3IoZSk7IH1cblx0XHR9KTtcblx0fVxufSIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIlJlbW90ZUNvbnRyYWN0XCI6IDBcbn07XG5cbl9fd2VicGFja19yZXF1aXJlX18uZi5qID0gZnVuY3Rpb24oY2h1bmtJZCwgcHJvbWlzZXMpIHtcblx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpID8gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdIDogdW5kZWZpbmVkO1xuXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cblx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkgeyBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTsgfSk7XG5cdFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuXHRcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcblx0XHRcdFx0XHR2YXIgdXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpO1xuXHRcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHRcdFx0XHR2YXIgbG9hZGluZ0VuZGVkID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpKSB7XG5cdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG5cdFx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhWzFdKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5sKHVybCwgbG9hZGluZ0VuZGVkLCBcImNodW5rLVwiICsgY2h1bmtJZCwgY2h1bmtJZCk7XG5cdFx0XHRcdH0gZWxzZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHRcdFx0fVxuXHRcdH1cbn07XG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSBmdW5jdGlvbihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkge1xuXHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuXHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXHR2YXIgcnVudGltZSA9IGRhdGFbMl07XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZShmdW5jdGlvbihpZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMDsgfSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rcHJvZmlsZVwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtwcm9maWxlXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIG1vZHVsZSBjYWNoZSBhcmUgdXNlZCBzbyBlbnRyeSBpbmxpbmluZyBpcyBkaXNhYmxlZFxuLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCJ3ZWJwYWNrL2NvbnRhaW5lci9lbnRyeS9SZW1vdGVDb250cmFjdFwiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==