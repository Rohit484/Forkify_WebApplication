// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"802c60e168e525e821838345552f6b22":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "4d61647a15c7e55c13d21bde57a73580";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"f086586adad1a66736ff5e8287c8016f":[function(require,module,exports) {
require('./bundle-manifest').register(JSON.parse("{\"13d21bde57a73580\":\"controller.4d61647a.js\",\"18fbd9fd0aa0d331\":\"icons.6486f98d.svg\"}"));
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"ba8df6b71e73837c465d69bebde6e64d":[function(require,module,exports) {
"use strict";

var mapping = {};

function register(pairs) {
  var keys = Object.keys(pairs);

  for (var i = 0; i < keys.length; i++) {
    mapping[keys[i]] = pairs[keys[i]];
  }
}

function resolve(id) {
  var resolved = mapping[id];

  if (resolved == null) {
    throw new Error('Could not resolve bundle with id ' + id);
  }

  return resolved;
}

module.exports.register = register;
module.exports.resolve = resolve;
},{}],"175e469a7ea7db1c8c0744d04372621f":[function(require,module,exports) {
"use strict";

require("core-js/modules/web.immediate.js");

var model = _interopRequireWildcard(require("./model.js"));

var _config = require("./config.js");

var _recipeView = _interopRequireDefault(require("./views/recipeView.js"));

var _searchView = _interopRequireDefault(require("./views/searchView.js"));

var _resultsView = _interopRequireDefault(require("./views/resultsView.js"));

var _paginationView = _interopRequireDefault(require("./views/paginationView.js"));

var _bookmarksView = _interopRequireDefault(require("./views/bookmarksView.js"));

var _addRecipeView = _interopRequireDefault(require("./views/addRecipeView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  async
} = require("q");

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    _recipeView.default.renderSpinner(); // 0) Update results view to mark selected search result


    _resultsView.default.update(model.getSearchResultsPage()); // 1) Updating bookmarks view


    _bookmarksView.default.update(model.state.bookmarks); // 2) Loading recipe


    await model.loadRecipe(id); // 3) Rendering recipe

    _recipeView.default.render(model.state.recipe);
  } catch (err) {
    _recipeView.default.renderError();

    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    _resultsView.default.renderSpinner(); // 1) Get search query


    const query = _searchView.default.getQuery();

    if (!query) return; // 2) Load search results

    await model.loadSearchResults(query); // 3) Render results

    _resultsView.default.render(model.getSearchResultsPage()); // 4) Render initial pagination buttons


    _paginationView.default.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  _resultsView.default.render(model.getSearchResultsPage(goToPage)); // 2) Render NEW pagination buttons


  _paginationView.default.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings); // Update the recipe view

  _recipeView.default.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);else model.deleteBookmark(model.state.recipe.id); // 2) Update recipe view

  _recipeView.default.update(model.state.recipe); // 3) Render bookmarks


  _bookmarksView.default.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  _bookmarksView.default.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    _addRecipeView.default.renderSpinner(); // Upload the new recipe data


    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe); // Render recipe

    _recipeView.default.render(model.state.recipe); // Success message


    _addRecipeView.default.renderMessage(); // Render bookmark view


    _bookmarksView.default.render(model.state.bookmarks); // Change ID in URL


    window.history.pushState(null, "", `#${model.state.recipe.id}`); // Close form window

    setTimeout(function () {
      _addRecipeView.default.toggleWindow();
    }, _config.MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error("💥", err);

    _addRecipeView.default.renderError(err.message);
  }
};

const init = function () {
  _bookmarksView.default.addHandlerRender(controlBookmarks);

  _recipeView.default.addHandlerRender(controlRecipes);

  _recipeView.default.addHandlerUpdateServings(controlServings);

  _recipeView.default.addHandlerAddBookmark(controlAddBookmark);

  _searchView.default.addHandlerSearch(controlSearchResults);

  _paginationView.default.addHandlerClick(controlPagination);

  _addRecipeView.default.addHandlerUpload(controlAddRecipe);
};

init();
},{"q":"79fa48f5262d250aa23868f2ed4cb43d","core-js/modules/web.immediate.js":"140df4f8e97a45c53c66fead1f5a9e92","./model.js":"aabf248f40f7693ef84a0cb99f385d1f","./views/recipeView.js":"bcae1aced0301b01ccacb3e6f7dfede8","./views/searchView.js":"c5d792f7cac03ef65de30cc0fbb2cae7","./views/resultsView.js":"eacdbc0d50ee3d2819f3ee59366c2773","./views/paginationView.js":"d2063f3e7de2e4cdacfcb5eb6479db05","./views/bookmarksView.js":"7ed9311e216aa789713f70ebeec3ed40","./views/addRecipeView.js":"4dd83c2a08c1751220d223c54dc70016","./config.js":"09212d541c5c40ff2bd93475a904f8de"}],"79fa48f5262d250aa23868f2ed4cb43d":[function(require,module,exports) {
var define;

var process = require("process");

// vim:ts=4:sts=4:sw=4:

/*!
 *
 * Copyright 2009-2017 Kris Kowal under the terms of the MIT
 * license found at https://github.com/kriskowal/q/blob/v1/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
(function (definition) {
  "use strict"; // This file will function properly as a <script> tag, or a module
  // using CommonJS and NodeJS or RequireJS module formats.  In
  // Common/Node/RequireJS, the module exports the Q API and when
  // executed as a simple <script>, it creates a Q global instead.
  // Montage Require

  if (typeof bootstrap === "function") {
    bootstrap("promise", definition); // CommonJS
  } else if (typeof exports === "object" && typeof module === "object") {
    module.exports = definition(); // RequireJS
  } else if (typeof define === "function" && define.amd) {
    define(definition); // SES (Secure EcmaScript)
  } else if (typeof ses !== "undefined") {
    if (!ses.ok()) {
      return;
    } else {
      ses.makeQ = definition;
    } // <script>

  } else if (typeof window !== "undefined" || typeof self !== "undefined") {
    // Prefer window over self for add-on scripts. Use self for
    // non-windowed contexts.
    var global = typeof window !== "undefined" ? window : self; // Get the `window` object, save the previous Q global
    // and initialize Q as a global.

    var previousQ = global.Q;
    global.Q = definition(); // Add a noConflict function so Q can be removed from the
    // global namespace.

    global.Q.noConflict = function () {
      global.Q = previousQ;
      return this;
    };
  } else {
    throw new Error("This environment was not anticipated by Q. Please file a bug.");
  }
})(function () {
  "use strict";

  var hasStacks = false;

  try {
    throw new Error();
  } catch (e) {
    hasStacks = !!e.stack;
  } // All code after this point will be filtered from stack traces reported
  // by Q.


  var qStartingLine = captureLine();
  var qFileName; // shims
  // used for fallback in "allResolved"

  var noop = function () {}; // Use the fastest possible means to execute a task in a future turn
  // of the event loop.


  var nextTick = function () {
    // linked list of tasks (single, with head node)
    var head = {
      task: void 0,
      next: null
    };
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false; // queue for late tasks, used by unhandled rejection tracking

    var laterQueue = [];

    function flush() {
      /* jshint loopfunc: true */
      var task, domain;

      while (head.next) {
        head = head.next;
        task = head.task;
        head.task = void 0;
        domain = head.domain;

        if (domain) {
          head.domain = void 0;
          domain.enter();
        }

        runSingle(task, domain);
      }

      while (laterQueue.length) {
        task = laterQueue.pop();
        runSingle(task);
      }

      flushing = false;
    } // runs a single function in the async queue


    function runSingle(task, domain) {
      try {
        task();
      } catch (e) {
        if (isNodeJS) {
          // In node, uncaught exceptions are considered fatal errors.
          // Re-throw them synchronously to interrupt flushing!
          // Ensure continuation if the uncaught exception is suppressed
          // listening "uncaughtException" events (as domains does).
          // Continue in next event to avoid tick recursion.
          if (domain) {
            domain.exit();
          }

          setTimeout(flush, 0);

          if (domain) {
            domain.enter();
          }

          throw e;
        } else {
          // In browsers, uncaught exceptions are not fatal.
          // Re-throw them asynchronously to avoid slow-downs.
          setTimeout(function () {
            throw e;
          }, 0);
        }
      }

      if (domain) {
        domain.exit();
      }
    }

    nextTick = function (task) {
      tail = tail.next = {
        task: task,
        domain: isNodeJS && process.domain,
        next: null
      };

      if (!flushing) {
        flushing = true;
        requestTick();
      }
    };

    if (typeof process === "object" && process.toString() === "[object process]" && process.nextTick) {
      // Ensure Q is in a real Node environment, with a `process.nextTick`.
      // To see through fake Node environments:
      // * Mocha test runner - exposes a `process` global without a `nextTick`
      // * Browserify - exposes a `process.nexTick` function that uses
      //   `setTimeout`. In this case `setImmediate` is preferred because
      //    it is faster. Browserify's `process.toString()` yields
      //   "[object Object]", while in a real Node environment
      //   `process.toString()` yields "[object process]".
      isNodeJS = true;

      requestTick = function () {
        process.nextTick(flush);
      };
    } else if (typeof setImmediate === "function") {
      // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
      if (typeof window !== "undefined") {
        requestTick = setImmediate.bind(window, flush);
      } else {
        requestTick = function () {
          setImmediate(flush);
        };
      }
    } else if (typeof MessageChannel !== "undefined") {
      // modern browsers
      // http://www.nonblocking.io/2011/06/windownexttick.html
      var channel = new MessageChannel(); // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
      // working message ports the first time a page loads.

      channel.port1.onmessage = function () {
        requestTick = requestPortTick;
        channel.port1.onmessage = flush;
        flush();
      };

      var requestPortTick = function () {
        // Opera requires us to provide a message payload, regardless of
        // whether we use it.
        channel.port2.postMessage(0);
      };

      requestTick = function () {
        setTimeout(flush, 0);
        requestPortTick();
      };
    } else {
      // old browsers
      requestTick = function () {
        setTimeout(flush, 0);
      };
    } // runs a task after all other tasks have been run
    // this is useful for unhandled rejection tracking that needs to happen
    // after all `then`d tasks have been run.


    nextTick.runAfter = function (task) {
      laterQueue.push(task);

      if (!flushing) {
        flushing = true;
        requestTick();
      }
    };

    return nextTick;
  }(); // Attempt to make generics safe in the face of downstream
  // modifications.
  // There is no situation where this is necessary.
  // If you need a security guarantee, these primordials need to be
  // deeply frozen anyway, and if you don’t need a security guarantee,
  // this is just plain paranoid.
  // However, this **might** have the nice side-effect of reducing the size of
  // the minified code by reducing x.call() to merely x()
  // See Mark Miller’s explanation of what this does.
  // http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming


  var call = Function.call;

  function uncurryThis(f) {
    return function () {
      return call.apply(f, arguments);
    };
  } // This is equivalent, but slower:
  // uncurryThis = Function_bind.bind(Function_bind.call);
  // http://jsperf.com/uncurrythis


  var array_slice = uncurryThis(Array.prototype.slice);
  var array_reduce = uncurryThis(Array.prototype.reduce || function (callback, basis) {
    var index = 0,
        length = this.length; // concerning the initial value, if one is not provided

    if (arguments.length === 1) {
      // seek to the first value in the array, accounting
      // for the possibility that is is a sparse array
      do {
        if (index in this) {
          basis = this[index++];
          break;
        }

        if (++index >= length) {
          throw new TypeError();
        }
      } while (1);
    } // reduce


    for (; index < length; index++) {
      // account for the possibility that the array is sparse
      if (index in this) {
        basis = callback(basis, this[index], index);
      }
    }

    return basis;
  });
  var array_indexOf = uncurryThis(Array.prototype.indexOf || function (value) {
    // not a very good shim, but good enough for our one use of it
    for (var i = 0; i < this.length; i++) {
      if (this[i] === value) {
        return i;
      }
    }

    return -1;
  });
  var array_map = uncurryThis(Array.prototype.map || function (callback, thisp) {
    var self = this;
    var collect = [];
    array_reduce(self, function (undefined, value, index) {
      collect.push(callback.call(thisp, value, index, self));
    }, void 0);
    return collect;
  });

  var object_create = Object.create || function (prototype) {
    function Type() {}

    Type.prototype = prototype;
    return new Type();
  };

  var object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
    obj[prop] = descriptor.value;
    return obj;
  };

  var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

  var object_keys = Object.keys || function (object) {
    var keys = [];

    for (var key in object) {
      if (object_hasOwnProperty(object, key)) {
        keys.push(key);
      }
    }

    return keys;
  };

  var object_toString = uncurryThis(Object.prototype.toString);

  function isObject(value) {
    return value === Object(value);
  } // generator related shims
  // FIXME: Remove this function once ES6 generators are in SpiderMonkey.


  function isStopIteration(exception) {
    return object_toString(exception) === "[object StopIteration]" || exception instanceof QReturnValue;
  } // FIXME: Remove this helper and Q.return once ES6 generators are in
  // SpiderMonkey.


  var QReturnValue;

  if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
  } else {
    QReturnValue = function (value) {
      this.value = value;
    };
  } // long stack traces


  var STACK_JUMP_SEPARATOR = "From previous event:";

  function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks && promise.stack && typeof error === "object" && error !== null && error.stack) {
      var stacks = [];

      for (var p = promise; !!p; p = p.source) {
        if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
          object_defineProperty(error, "__minimumStackCounter__", {
            value: p.stackCounter,
            configurable: true
          });
          stacks.unshift(p.stack);
        }
      }

      stacks.unshift(error.stack);
      var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
      var stack = filterStackString(concatedStacks);
      object_defineProperty(error, "stack", {
        value: stack,
        configurable: true
      });
    }
  }

  function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];

    for (var i = 0; i < lines.length; ++i) {
      var line = lines[i];

      if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
        desiredLines.push(line);
      }
    }

    return desiredLines.join("\n");
  }

  function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
  }

  function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);

    if (attempt1) {
      return [attempt1[1], Number(attempt1[2])];
    } // Anonymous functions: "at filename:lineNumber:columnNumber"


    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);

    if (attempt2) {
      return [attempt2[1], Number(attempt2[2])];
    } // Firefox style: "function@filename:lineNumber or @filename:lineNumber"


    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);

    if (attempt3) {
      return [attempt3[1], Number(attempt3[2])];
    }
  }

  function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
      return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];
    return fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine;
  } // discover own file name and line number range for filtering stack
  // traces


  function captureLine() {
    if (!hasStacks) {
      return;
    }

    try {
      throw new Error();
    } catch (e) {
      var lines = e.stack.split("\n");
      var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
      var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);

      if (!fileNameAndLineNumber) {
        return;
      }

      qFileName = fileNameAndLineNumber[0];
      return fileNameAndLineNumber[1];
    }
  }

  function deprecate(callback, name, alternative) {
    return function () {
      if (typeof console !== "undefined" && typeof console.warn === "function") {
        console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
      }

      return callback.apply(callback, arguments);
    };
  } // end of shims
  // beginning of real work

  /**
   * Constructs a promise for an immediate reference, passes promises through, or
   * coerces promises from different systems.
   * @param value immediate reference or promise
   */


  function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (value instanceof Promise) {
      return value;
    } // assimilate thenables


    if (isPromiseAlike(value)) {
      return coerce(value);
    } else {
      return fulfill(value);
    }
  }

  Q.resolve = Q;
  /**
   * Performs a task in a future turn of the event loop.
   * @param {Function} task
   */

  Q.nextTick = nextTick;
  /**
   * Controls whether or not long stack traces will be on
   */

  Q.longStackSupport = false;
  /**
   * The counter is used to determine the stopping point for building
   * long stack traces. In makeStackTraceLong we walk backwards through
   * the linked list of promises, only stacks which were created before
   * the rejection are concatenated.
   */

  var longStackCounter = 1; // enable long stacks if Q_DEBUG is set

  if (typeof process === "object" && process && process.env && undefined) {
    Q.longStackSupport = true;
  }
  /**
   * Constructs a {promise, resolve, reject} object.
   *
   * `resolve` is a callback to invoke with a more resolved value for the
   * promise. To fulfill the promise, invoke `resolve` with any value that is
   * not a thenable. To reject the promise, invoke `resolve` with a rejected
   * thenable, or invoke `reject` with the reason directly. To resolve the
   * promise to another thenable, thus putting it in the same state, invoke
   * `resolve` with that other thenable.
   */


  Q.defer = defer;

  function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [],
        progressListeners = [],
        resolvedPromise;
    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
      var args = array_slice(arguments);

      if (messages) {
        messages.push(args);

        if (op === "when" && operands[1]) {
          // progress operand
          progressListeners.push(operands[1]);
        }
      } else {
        Q.nextTick(function () {
          resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
        });
      }
    }; // XXX deprecated


    promise.valueOf = function () {
      if (messages) {
        return promise;
      }

      var nearerValue = nearer(resolvedPromise);

      if (isPromise(nearerValue)) {
        resolvedPromise = nearerValue; // shorten chain
      }

      return nearerValue;
    };

    promise.inspect = function () {
      if (!resolvedPromise) {
        return {
          state: "pending"
        };
      }

      return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
      try {
        throw new Error();
      } catch (e) {
        // NOTE: don't try to use `Error.captureStackTrace` or transfer the
        // accessor around; that causes memory leaks as per GH-111. Just
        // reify the stack trace as a string ASAP.
        //
        // At the same time, cut off the first line; it's always just
        // "[object Promise]\n", as per the `toString`.
        promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
        promise.stackCounter = longStackCounter++;
      }
    } // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.


    function become(newPromise) {
      resolvedPromise = newPromise;

      if (Q.longStackSupport && hasStacks) {
        // Only hold a reference to the new promise if long stacks
        // are enabled to reduce memory usage
        promise.source = newPromise;
      }

      array_reduce(messages, function (undefined, message) {
        Q.nextTick(function () {
          newPromise.promiseDispatch.apply(newPromise, message);
        });
      }, void 0);
      messages = void 0;
      progressListeners = void 0;
    }

    deferred.promise = promise;

    deferred.resolve = function (value) {
      if (resolvedPromise) {
        return;
      }

      become(Q(value));
    };

    deferred.fulfill = function (value) {
      if (resolvedPromise) {
        return;
      }

      become(fulfill(value));
    };

    deferred.reject = function (reason) {
      if (resolvedPromise) {
        return;
      }

      become(reject(reason));
    };

    deferred.notify = function (progress) {
      if (resolvedPromise) {
        return;
      }

      array_reduce(progressListeners, function (undefined, progressListener) {
        Q.nextTick(function () {
          progressListener(progress);
        });
      }, void 0);
    };

    return deferred;
  }
  /**
   * Creates a Node-style callback that will resolve or reject the deferred
   * promise.
   * @returns a nodeback
   */


  defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
      if (error) {
        self.reject(error);
      } else if (arguments.length > 2) {
        self.resolve(array_slice(arguments, 1));
      } else {
        self.resolve(value);
      }
    };
  };
  /**
   * @param resolver {Function} a function that returns nothing and accepts
   * the resolve, reject, and notify functions for a deferred.
   * @returns a promise that may be resolved with the given resolve and reject
   * functions, or rejected by a thrown exception in resolver
   */


  Q.Promise = promise; // ES6

  Q.promise = promise;

  function promise(resolver) {
    if (typeof resolver !== "function") {
      throw new TypeError("resolver must be a function.");
    }

    var deferred = defer();

    try {
      resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
      deferred.reject(reason);
    }

    return deferred.promise;
  }

  promise.race = race; // ES6

  promise.all = all; // ES6

  promise.reject = reject; // ES6

  promise.resolve = Q; // ES6
  // XXX experimental.  This method is a way to denote that a local value is
  // serializable and should be immediately dispatched to a remote upon request,
  // instead of passing a reference.

  Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
  };

  Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
  };
  /**
   * If two promises eventually fulfill to the same value, promises that value,
   * but otherwise rejects.
   * @param x {Any*}
   * @param y {Any*}
   * @returns {Any*} a promise for x and y if they are the same, but a rejection
   * otherwise.
   *
   */


  Q.join = function (x, y) {
    return Q(x).join(y);
  };

  Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
      if (x === y) {
        // TODO: "===" should be Object.is or equiv
        return x;
      } else {
        throw new Error("Q can't join: not the same: " + x + " " + y);
      }
    });
  };
  /**
   * Returns a promise for the first of an array of promises to become settled.
   * @param answers {Array[Any*]} promises to race
   * @returns {Any*} the first promise to be settled
   */


  Q.race = race;

  function race(answerPs) {
    return promise(function (resolve, reject) {
      // Switch to this once we can assume at least ES5
      // answerPs.forEach(function (answerP) {
      //     Q(answerP).then(resolve, reject);
      // });
      // Use this in the meantime
      for (var i = 0, len = answerPs.length; i < len; i++) {
        Q(answerPs[i]).then(resolve, reject);
      }
    });
  }

  Promise.prototype.race = function () {
    return this.then(Q.race);
  };
  /**
   * Constructs a Promise with a promise descriptor object and optional fallback
   * function.  The descriptor contains methods like when(rejected), get(name),
   * set(name, value), post(name, args), and delete(name), which all
   * return either a value, a promise for a value, or a rejection.  The fallback
   * accepts the operation name, a resolver, and any further arguments that would
   * have been forwarded to the appropriate method above had a method been
   * provided with the proper name.  The API makes no guarantees about the nature
   * of the returned object, apart from that it is usable whereever promises are
   * bought and sold.
   */


  Q.makePromise = Promise;

  function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
      fallback = function (op) {
        return reject(new Error("Promise does not support operation: " + op));
      };
    }

    if (inspect === void 0) {
      inspect = function () {
        return {
          state: "unknown"
        };
      };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
      var result;

      try {
        if (descriptor[op]) {
          result = descriptor[op].apply(promise, args);
        } else {
          result = fallback.call(promise, op, args);
        }
      } catch (exception) {
        result = reject(exception);
      }

      if (resolve) {
        resolve(result);
      }
    };

    promise.inspect = inspect; // XXX deprecated `valueOf` and `exception` support

    if (inspect) {
      var inspected = inspect();

      if (inspected.state === "rejected") {
        promise.exception = inspected.reason;
      }

      promise.valueOf = function () {
        var inspected = inspect();

        if (inspected.state === "pending" || inspected.state === "rejected") {
          return promise;
        }

        return inspected.value;
      };
    }

    return promise;
  }

  Promise.prototype.toString = function () {
    return "[object Promise]";
  };

  Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false; // ensure the untrusted promise makes at most a
    // single call to one of the callbacks

    function _fulfilled(value) {
      try {
        return typeof fulfilled === "function" ? fulfilled(value) : value;
      } catch (exception) {
        return reject(exception);
      }
    }

    function _rejected(exception) {
      if (typeof rejected === "function") {
        makeStackTraceLong(exception, self);

        try {
          return rejected(exception);
        } catch (newException) {
          return reject(newException);
        }
      }

      return reject(exception);
    }

    function _progressed(value) {
      return typeof progressed === "function" ? progressed(value) : value;
    }

    Q.nextTick(function () {
      self.promiseDispatch(function (value) {
        if (done) {
          return;
        }

        done = true;
        deferred.resolve(_fulfilled(value));
      }, "when", [function (exception) {
        if (done) {
          return;
        }

        done = true;
        deferred.resolve(_rejected(exception));
      }]);
    }); // Progress propagator need to be attached in the current tick.

    self.promiseDispatch(void 0, "when", [void 0, function (value) {
      var newValue;
      var threw = false;

      try {
        newValue = _progressed(value);
      } catch (e) {
        threw = true;

        if (Q.onerror) {
          Q.onerror(e);
        } else {
          throw e;
        }
      }

      if (!threw) {
        deferred.notify(newValue);
      }
    }]);
    return deferred.promise;
  };

  Q.tap = function (promise, callback) {
    return Q(promise).tap(callback);
  };
  /**
   * Works almost like "finally", but not called for rejections.
   * Original resolution value is passed through callback unaffected.
   * Callback may return a promise that will be awaited for.
   * @param {Function} callback
   * @returns {Q.Promise}
   * @example
   * doSomething()
   *   .then(...)
   *   .tap(console.log)
   *   .then(...);
   */


  Promise.prototype.tap = function (callback) {
    callback = Q(callback);
    return this.then(function (value) {
      return callback.fcall(value).thenResolve(value);
    });
  };
  /**
   * Registers an observer on a promise.
   *
   * Guarantees:
   *
   * 1. that fulfilled and rejected will be called only once.
   * 2. that either the fulfilled callback or the rejected callback will be
   *    called, but not both.
   * 3. that fulfilled and rejected will not be called in this turn.
   *
   * @param value      promise or immediate reference to observe
   * @param fulfilled  function to be called with the fulfilled value
   * @param rejected   function to be called with the rejection exception
   * @param progressed function to be called on any progress notifications
   * @return promise for the return value from the invoked callback
   */


  Q.when = when;

  function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
  }

  Promise.prototype.thenResolve = function (value) {
    return this.then(function () {
      return value;
    });
  };

  Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
  };

  Promise.prototype.thenReject = function (reason) {
    return this.then(function () {
      throw reason;
    });
  };

  Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
  };
  /**
   * If an object is not a promise, it is as "near" as possible.
   * If a promise is rejected, it is as "near" as possible too.
   * If it’s a fulfilled promise, the fulfillment value is nearer.
   * If it’s a deferred promise and the deferred has been resolved, the
   * resolution is "nearer".
   * @param object
   * @returns most resolved (nearest) form of the object
   */
  // XXX should we re-do this?


  Q.nearer = nearer;

  function nearer(value) {
    if (isPromise(value)) {
      var inspected = value.inspect();

      if (inspected.state === "fulfilled") {
        return inspected.value;
      }
    }

    return value;
  }
  /**
   * @returns whether the given object is a promise.
   * Otherwise it is a fulfilled value.
   */


  Q.isPromise = isPromise;

  function isPromise(object) {
    return object instanceof Promise;
  }

  Q.isPromiseAlike = isPromiseAlike;

  function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
  }
  /**
   * @returns whether the given object is a pending promise, meaning not
   * fulfilled or rejected.
   */


  Q.isPending = isPending;

  function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
  }

  Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
  };
  /**
   * @returns whether the given object is a value or fulfilled
   * promise.
   */


  Q.isFulfilled = isFulfilled;

  function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
  }

  Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
  };
  /**
   * @returns whether the given object is a rejected promise.
   */


  Q.isRejected = isRejected;

  function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
  }

  Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
  }; //// BEGIN UNHANDLED REJECTION TRACKING
  // This promise library consumes exceptions thrown in handlers so they can be
  // handled by a subsequent promise.  The exceptions get added to this array when
  // they are created, and removed when they are handled.  Note that in ES6 or
  // shimmed environments, this would naturally be a `Set`.


  var unhandledReasons = [];
  var unhandledRejections = [];
  var reportedUnhandledRejections = [];
  var trackUnhandledRejections = true;

  function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
      trackUnhandledRejections = true;
    }
  }

  function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
      return;
    }

    if (typeof process === "object" && typeof process.emit === "function") {
      Q.nextTick.runAfter(function () {
        if (array_indexOf(unhandledRejections, promise) !== -1) {
          process.emit("unhandledRejection", reason, promise);
          reportedUnhandledRejections.push(promise);
        }
      });
    }

    unhandledRejections.push(promise);

    if (reason && typeof reason.stack !== "undefined") {
      unhandledReasons.push(reason.stack);
    } else {
      unhandledReasons.push("(no stack) " + reason);
    }
  }

  function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
      return;
    }

    var at = array_indexOf(unhandledRejections, promise);

    if (at !== -1) {
      if (typeof process === "object" && typeof process.emit === "function") {
        Q.nextTick.runAfter(function () {
          var atReport = array_indexOf(reportedUnhandledRejections, promise);

          if (atReport !== -1) {
            process.emit("rejectionHandled", unhandledReasons[at], promise);
            reportedUnhandledRejections.splice(atReport, 1);
          }
        });
      }

      unhandledRejections.splice(at, 1);
      unhandledReasons.splice(at, 1);
    }
  }

  Q.resetUnhandledRejections = resetUnhandledRejections;

  Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
  };

  Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
  };

  resetUnhandledRejections(); //// END UNHANDLED REJECTION TRACKING

  /**
   * Constructs a rejected promise.
   * @param reason value describing the failure
   */

  Q.reject = reject;

  function reject(reason) {
    var rejection = Promise({
      "when": function (rejected) {
        // note that the error has been handled
        if (rejected) {
          untrackRejection(this);
        }

        return rejected ? rejected(reason) : this;
      }
    }, function fallback() {
      return this;
    }, function inspect() {
      return {
        state: "rejected",
        reason: reason
      };
    }); // Note that the reason has not been handled.

    trackRejection(rejection, reason);
    return rejection;
  }
  /**
   * Constructs a fulfilled promise for an immediate reference.
   * @param value immediate reference
   */


  Q.fulfill = fulfill;

  function fulfill(value) {
    return Promise({
      "when": function () {
        return value;
      },
      "get": function (name) {
        return value[name];
      },
      "set": function (name, rhs) {
        value[name] = rhs;
      },
      "delete": function (name) {
        delete value[name];
      },
      "post": function (name, args) {
        // Mark Miller proposes that post with no name should apply a
        // promised function.
        if (name === null || name === void 0) {
          return value.apply(void 0, args);
        } else {
          return value[name].apply(value, args);
        }
      },
      "apply": function (thisp, args) {
        return value.apply(thisp, args);
      },
      "keys": function () {
        return object_keys(value);
      }
    }, void 0, function inspect() {
      return {
        state: "fulfilled",
        value: value
      };
    });
  }
  /**
   * Converts thenables to Q promises.
   * @param promise thenable promise
   * @returns a Q promise
   */


  function coerce(promise) {
    var deferred = defer();
    Q.nextTick(function () {
      try {
        promise.then(deferred.resolve, deferred.reject, deferred.notify);
      } catch (exception) {
        deferred.reject(exception);
      }
    });
    return deferred.promise;
  }
  /**
   * Annotates an object such that it will never be
   * transferred away from this process over any promise
   * communication channel.
   * @param object
   * @returns promise a wrapping of that object that
   * additionally responds to the "isDef" message
   * without a rejection.
   */


  Q.master = master;

  function master(object) {
    return Promise({
      "isDef": function () {}
    }, function fallback(op, args) {
      return dispatch(object, op, args);
    }, function () {
      return Q(object).inspect();
    });
  }
  /**
   * Spreads the values of a promised array of arguments into the
   * fulfillment callback.
   * @param fulfilled callback that receives variadic arguments from the
   * promised array
   * @param rejected callback that receives the exception if the promise
   * is rejected.
   * @returns a promise for the return value or thrown exception of
   * either callback.
   */


  Q.spread = spread;

  function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
  }

  Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
      return fulfilled.apply(void 0, array);
    }, rejected);
  };
  /**
   * The async function is a decorator for generator functions, turning
   * them into asynchronous generators.  Although generators are only part
   * of the newest ECMAScript 6 drafts, this code does not cause syntax
   * errors in older engines.  This code should continue to work and will
   * in fact improve over time as the language improves.
   *
   * ES6 generators are currently part of V8 version 3.19 with the
   * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
   * for longer, but under an older Python-inspired form.  This function
   * works on both kinds of generators.
   *
   * Decorates a generator function such that:
   *  - it may yield promises
   *  - execution will continue when that promise is fulfilled
   *  - the value of the yield expression will be the fulfilled value
   *  - it returns a promise for the return value (when the generator
   *    stops iterating)
   *  - the decorated function returns a promise for the return value
   *    of the generator or the first rejected promise among those
   *    yielded.
   *  - if an error is thrown in the generator, it propagates through
   *    every following yield until it is caught, or until it escapes
   *    the generator function altogether, and is translated into a
   *    rejection for the promise returned by the decorated generator.
   */


  Q.async = async;

  function async(makeGenerator) {
    return function () {
      // when verb is "send", arg is a value
      // when verb is "throw", arg is an exception
      function continuer(verb, arg) {
        var result; // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
        // engine that has a deployed base of browsers that support generators.
        // However, SM's generators use the Python-inspired semantics of
        // outdated ES6 drafts.  We would like to support ES6, but we'd also
        // like to make it possible to use generators in deployed browsers, so
        // we also support Python-style generators.  At some point we can remove
        // this block.

        if (typeof StopIteration === "undefined") {
          // ES6 Generators
          try {
            result = generator[verb](arg);
          } catch (exception) {
            return reject(exception);
          }

          if (result.done) {
            return Q(result.value);
          } else {
            return when(result.value, callback, errback);
          }
        } else {
          // SpiderMonkey Generators
          // FIXME: Remove this case when SM does ES6 generators.
          try {
            result = generator[verb](arg);
          } catch (exception) {
            if (isStopIteration(exception)) {
              return Q(exception.value);
            } else {
              return reject(exception);
            }
          }

          return when(result, callback, errback);
        }
      }

      var generator = makeGenerator.apply(this, arguments);
      var callback = continuer.bind(continuer, "next");
      var errback = continuer.bind(continuer, "throw");
      return callback();
    };
  }
  /**
   * The spawn function is a small wrapper around async that immediately
   * calls the generator and also ends the promise chain, so that any
   * unhandled errors are thrown instead of forwarded to the error
   * handler. This is useful because it's extremely common to run
   * generators at the top-level to work with libraries.
   */


  Q.spawn = spawn;

  function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
  } // FIXME: Remove this interface once ES6 generators are in SpiderMonkey.

  /**
   * Throws a ReturnValue exception to stop an asynchronous generator.
   *
   * This interface is a stop-gap measure to support generator return
   * values in older Firefox/SpiderMonkey.  In browsers that support ES6
   * generators like Chromium 29, just use "return" in your generator
   * functions.
   *
   * @param value the return value for the surrounding generator
   * @throws ReturnValue exception with the value.
   * @example
   * // ES6 style
   * Q.async(function* () {
   *      var foo = yield getFooPromise();
   *      var bar = yield getBarPromise();
   *      return foo + bar;
   * })
   * // Older SpiderMonkey style
   * Q.async(function () {
   *      var foo = yield getFooPromise();
   *      var bar = yield getBarPromise();
   *      Q.return(foo + bar);
   * })
   */


  Q["return"] = _return;

  function _return(value) {
    throw new QReturnValue(value);
  }
  /**
   * The promised function decorator ensures that any promise arguments
   * are settled and passed as values (`this` is also settled and passed
   * as a value).  It will also ensure that the result of a function is
   * always a promise.
   *
   * @example
   * var add = Q.promised(function (a, b) {
   *     return a + b;
   * });
   * add(Q(a), Q(B));
   *
   * @param {function} callback The function to decorate
   * @returns {function} a function that has been decorated.
   */


  Q.promised = promised;

  function promised(callback) {
    return function () {
      return spread([this, all(arguments)], function (self, args) {
        return callback.apply(self, args);
      });
    };
  }
  /**
   * sends a message to a value in a future turn
   * @param object* the recipient
   * @param op the name of the message operation, e.g., "when",
   * @param args further arguments to be forwarded to the operation
   * @returns result {Promise} a promise for the result of the operation
   */


  Q.dispatch = dispatch;

  function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
  }

  Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    Q.nextTick(function () {
      self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
  };
  /**
   * Gets the value of a property in a future turn.
   * @param object    promise or immediate reference for target object
   * @param name      name of property to get
   * @return promise for the property value
   */


  Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
  };

  Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
  };
  /**
   * Sets the value of a property in a future turn.
   * @param object    promise or immediate reference for object object
   * @param name      name of property to set
   * @param value     new value of property
   * @return promise for the return value
   */


  Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
  };

  Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
  };
  /**
   * Deletes a property in a future turn.
   * @param object    promise or immediate reference for target object
   * @param name      name of property to delete
   * @return promise for the return value
   */


  Q.del = // XXX legacy
  Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
  };

  Promise.prototype.del = // XXX legacy
  Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
  };
  /**
   * Invokes a method in a future turn.
   * @param object    promise or immediate reference for target object
   * @param name      name of method to invoke
   * @param value     a value to post, typically an array of
   *                  invocation arguments for promises that
   *                  are ultimately backed with `resolve` values,
   *                  as opposed to those backed with URLs
   *                  wherein the posted value can be any
   *                  JSON serializable object.
   * @return promise for the return value
   */
  // bound locally because it is used by other methods


  Q.mapply = // XXX As proposed by "Redsandro"
  Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
  };

  Promise.prototype.mapply = // XXX As proposed by "Redsandro"
  Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
  };
  /**
   * Invokes a method in a future turn.
   * @param object    promise or immediate reference for target object
   * @param name      name of method to invoke
   * @param ...args   array of invocation arguments
   * @return promise for the return value
   */


  Q.send = // XXX Mark Miller's proposed parlance
  Q.mcall = // XXX As proposed by "Redsandro"
  Q.invoke = function (object, name
  /*...args*/
  ) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
  };

  Promise.prototype.send = // XXX Mark Miller's proposed parlance
  Promise.prototype.mcall = // XXX As proposed by "Redsandro"
  Promise.prototype.invoke = function (name
  /*...args*/
  ) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
  };
  /**
   * Applies the promised function in a future turn.
   * @param object    promise or immediate reference for target function
   * @param args      array of application arguments
   */


  Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
  };

  Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
  };
  /**
   * Calls the promised function in a future turn.
   * @param object    promise or immediate reference for target function
   * @param ...args   array of application arguments
   */


  Q["try"] = Q.fcall = function (object
  /* ...args*/
  ) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
  };

  Promise.prototype.fcall = function
    /*...args*/
  () {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
  };
  /**
   * Binds the promised function, transforming return values into a fulfilled
   * promise and thrown errors into a rejected one.
   * @param object    promise or immediate reference for target function
   * @param ...args   array of application arguments
   */


  Q.fbind = function (object
  /*...args*/
  ) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
      return promise.dispatch("apply", [this, args.concat(array_slice(arguments))]);
    };
  };

  Promise.prototype.fbind = function
    /*...args*/
  () {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
      return promise.dispatch("apply", [this, args.concat(array_slice(arguments))]);
    };
  };
  /**
   * Requests the names of the owned properties of a promised
   * object in a future turn.
   * @param object    promise or immediate reference for target object
   * @return promise for the keys of the eventually settled object
   */


  Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
  };

  Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
  };
  /**
   * Turns an array of promises into a promise for an array.  If any of
   * the promises gets rejected, the whole array is rejected immediately.
   * @param {Array*} an array (or promise for an array) of values (or
   * promises for values)
   * @returns a promise for an array of the corresponding values
   */
  // By Mark Miller
  // http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled


  Q.all = all;

  function all(promises) {
    return when(promises, function (promises) {
      var pendingCount = 0;
      var deferred = defer();
      array_reduce(promises, function (undefined, promise, index) {
        var snapshot;

        if (isPromise(promise) && (snapshot = promise.inspect()).state === "fulfilled") {
          promises[index] = snapshot.value;
        } else {
          ++pendingCount;
          when(promise, function (value) {
            promises[index] = value;

            if (--pendingCount === 0) {
              deferred.resolve(promises);
            }
          }, deferred.reject, function (progress) {
            deferred.notify({
              index: index,
              value: progress
            });
          });
        }
      }, void 0);

      if (pendingCount === 0) {
        deferred.resolve(promises);
      }

      return deferred.promise;
    });
  }

  Promise.prototype.all = function () {
    return all(this);
  };
  /**
   * Returns the first resolved promise of an array. Prior rejected promises are
   * ignored.  Rejects only if all promises are rejected.
   * @param {Array*} an array containing values or promises for values
   * @returns a promise fulfilled with the value of the first resolved promise,
   * or a rejected promise if all promises are rejected.
   */


  Q.any = any;

  function any(promises) {
    if (promises.length === 0) {
      return Q.resolve();
    }

    var deferred = Q.defer();
    var pendingCount = 0;
    array_reduce(promises, function (prev, current, index) {
      var promise = promises[index];
      pendingCount++;
      when(promise, onFulfilled, onRejected, onProgress);

      function onFulfilled(result) {
        deferred.resolve(result);
      }

      function onRejected(err) {
        pendingCount--;

        if (pendingCount === 0) {
          var rejection = err || new Error("" + err);
          rejection.message = "Q can't get fulfillment value from any promise, all " + "promises were rejected. Last error message: " + rejection.message;
          deferred.reject(rejection);
        }
      }

      function onProgress(progress) {
        deferred.notify({
          index: index,
          value: progress
        });
      }
    }, undefined);
    return deferred.promise;
  }

  Promise.prototype.any = function () {
    return any(this);
  };
  /**
   * Waits for all promises to be settled, either fulfilled or
   * rejected.  This is distinct from `all` since that would stop
   * waiting at the first rejection.  The promise returned by
   * `allResolved` will never be rejected.
   * @param promises a promise for an array (or an array) of promises
   * (or values)
   * @return a promise for an array of promises
   */


  Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");

  function allResolved(promises) {
    return when(promises, function (promises) {
      promises = array_map(promises, Q);
      return when(all(array_map(promises, function (promise) {
        return when(promise, noop, noop);
      })), function () {
        return promises;
      });
    });
  }

  Promise.prototype.allResolved = function () {
    return allResolved(this);
  };
  /**
   * @see Promise#allSettled
   */


  Q.allSettled = allSettled;

  function allSettled(promises) {
    return Q(promises).allSettled();
  }
  /**
   * Turns an array of promises into a promise for an array of their states (as
   * returned by `inspect`) when they have all settled.
   * @param {Array[Any*]} values an array (or promise for an array) of values (or
   * promises for values)
   * @returns {Array[State]} an array of states for the respective values.
   */


  Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
      return all(array_map(promises, function (promise) {
        promise = Q(promise);

        function regardless() {
          return promise.inspect();
        }

        return promise.then(regardless, regardless);
      }));
    });
  };
  /**
   * Captures the failure of a promise, giving an oportunity to recover
   * with a callback.  If the given promise is fulfilled, the returned
   * promise is fulfilled.
   * @param {Any*} promise for something
   * @param {Function} callback to fulfill the returned promise if the
   * given promise is rejected
   * @returns a promise for the return value of the callback
   */


  Q.fail = // XXX legacy
  Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
  };

  Promise.prototype.fail = // XXX legacy
  Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
  };
  /**
   * Attaches a listener that can respond to progress notifications from a
   * promise's originating deferred. This listener receives the exact arguments
   * passed to ``deferred.notify``.
   * @param {Any*} promise for something
   * @param {Function} callback to receive any progress notifications
   * @returns the given promise, unchanged
   */


  Q.progress = progress;

  function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
  }

  Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
  };
  /**
   * Provides an opportunity to observe the settling of a promise,
   * regardless of whether the promise is fulfilled or rejected.  Forwards
   * the resolution to the returned promise when the callback is done.
   * The callback can return a promise to defer completion.
   * @param {Any*} promise
   * @param {Function} callback to observe the resolution of the given
   * promise, takes no arguments.
   * @returns a promise for the resolution of the given promise when
   * ``fin`` is done.
   */


  Q.fin = // XXX legacy
  Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
  };

  Promise.prototype.fin = // XXX legacy
  Promise.prototype["finally"] = function (callback) {
    if (!callback || typeof callback.apply !== "function") {
      throw new Error("Q can't apply finally callback");
    }

    callback = Q(callback);
    return this.then(function (value) {
      return callback.fcall().then(function () {
        return value;
      });
    }, function (reason) {
      // TODO attempt to recycle the rejection with "this".
      return callback.fcall().then(function () {
        throw reason;
      });
    });
  };
  /**
   * Terminates a chain of promises, forcing rejections to be
   * thrown as exceptions.
   * @param {Any*} promise at the end of a chain of promises
   * @returns nothing
   */


  Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
  };

  Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
      // forward to a future turn so that ``when``
      // does not catch it and turn it into a rejection.
      Q.nextTick(function () {
        makeStackTraceLong(error, promise);

        if (Q.onerror) {
          Q.onerror(error);
        } else {
          throw error;
        }
      });
    }; // Avoid unnecessary `nextTick`ing via an unnecessary `when`.


    var promise = fulfilled || rejected || progress ? this.then(fulfilled, rejected, progress) : this;

    if (typeof process === "object" && process && process.domain) {
      onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
  };
  /**
   * Causes a promise to be rejected if it does not get fulfilled before
   * some milliseconds time out.
   * @param {Any*} promise
   * @param {Number} milliseconds timeout
   * @param {Any*} custom error message or Error object (optional)
   * @returns a promise for the resolution of the given promise if it is
   * fulfilled before the timeout, otherwise rejected.
   */


  Q.timeout = function (object, ms, error) {
    return Q(object).timeout(ms, error);
  };

  Promise.prototype.timeout = function (ms, error) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
      if (!error || "string" === typeof error) {
        error = new Error(error || "Timed out after " + ms + " ms");
        error.code = "ETIMEDOUT";
      }

      deferred.reject(error);
    }, ms);
    this.then(function (value) {
      clearTimeout(timeoutId);
      deferred.resolve(value);
    }, function (exception) {
      clearTimeout(timeoutId);
      deferred.reject(exception);
    }, deferred.notify);
    return deferred.promise;
  };
  /**
   * Returns a promise for the given value (or promised value), some
   * milliseconds after it resolved. Passes rejections immediately.
   * @param {Any*} promise
   * @param {Number} milliseconds
   * @returns a promise for the resolution of the given promise after milliseconds
   * time has elapsed since the resolution of the given promise.
   * If the given promise rejects, that is passed immediately.
   */


  Q.delay = function (object, timeout) {
    if (timeout === void 0) {
      timeout = object;
      object = void 0;
    }

    return Q(object).delay(timeout);
  };

  Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
      var deferred = defer();
      setTimeout(function () {
        deferred.resolve(value);
      }, timeout);
      return deferred.promise;
    });
  };
  /**
   * Passes a continuation to a Node function, which is called with the given
   * arguments provided as an array, and returns a promise.
   *
   *      Q.nfapply(FS.readFile, [__filename])
   *      .then(function (content) {
   *      })
   *
   */


  Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
  };

  Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
  };
  /**
   * Passes a continuation to a Node function, which is called with the given
   * arguments provided individually, and returns a promise.
   * @example
   * Q.nfcall(FS.readFile, __filename)
   * .then(function (content) {
   * })
   *
   */


  Q.nfcall = function (callback
  /*...args*/
  ) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
  };

  Promise.prototype.nfcall = function
    /*...args*/
  () {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
  };
  /**
   * Wraps a NodeJS continuation passing function and returns an equivalent
   * version that returns a promise.
   * @example
   * Q.nfbind(FS.readFile, __filename)("utf-8")
   * .then(console.log)
   * .done()
   */


  Q.nfbind = Q.denodeify = function (callback
  /*...args*/
  ) {
    if (callback === undefined) {
      throw new Error("Q can't wrap an undefined function");
    }

    var baseArgs = array_slice(arguments, 1);
    return function () {
      var nodeArgs = baseArgs.concat(array_slice(arguments));
      var deferred = defer();
      nodeArgs.push(deferred.makeNodeResolver());
      Q(callback).fapply(nodeArgs).fail(deferred.reject);
      return deferred.promise;
    };
  };

  Promise.prototype.nfbind = Promise.prototype.denodeify = function
    /*...args*/
  () {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
  };

  Q.nbind = function (callback, thisp
  /*...args*/
  ) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
      var nodeArgs = baseArgs.concat(array_slice(arguments));
      var deferred = defer();
      nodeArgs.push(deferred.makeNodeResolver());

      function bound() {
        return callback.apply(thisp, arguments);
      }

      Q(bound).fapply(nodeArgs).fail(deferred.reject);
      return deferred.promise;
    };
  };

  Promise.prototype.nbind = function
    /*thisp, ...args*/
  () {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
  };
  /**
   * Calls a method of a Node-style object that accepts a Node-style
   * callback with a given array of arguments, plus a provided callback.
   * @param object an object that has the named method
   * @param {String} name name of the method of object
   * @param {Array} args arguments to pass to the method; the callback
   * will be provided by Q and appended to these arguments.
   * @returns a promise for the value or error
   */


  Q.nmapply = // XXX As proposed by "Redsandro"
  Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
  };

  Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
  Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
  };
  /**
   * Calls a method of a Node-style object that accepts a Node-style
   * callback, forwarding the given variadic arguments, plus a provided
   * callback argument.
   * @param object an object that has the named method
   * @param {String} name name of the method of object
   * @param ...args arguments to pass to the method; the callback will
   * be provided by Q and appended to these arguments.
   * @returns a promise for the value or error
   */


  Q.nsend = // XXX Based on Mark Miller's proposed "send"
  Q.nmcall = // XXX Based on "Redsandro's" proposal
  Q.ninvoke = function (object, name
  /*...args*/
  ) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
  };

  Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
  Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
  Promise.prototype.ninvoke = function (name
  /*...args*/
  ) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
  };
  /**
   * If a function would like to support both Node continuation-passing-style and
   * promise-returning-style, it can end its internal promise chain with
   * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
   * elects to use a nodeback, the result will be sent there.  If they do not
   * pass a nodeback, they will receive the result promise.
   * @param object a result (or a promise for a result)
   * @param {Function} nodeback a Node.js-style callback
   * @returns either the promise or nothing
   */


  Q.nodeify = nodeify;

  function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
  }

  Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
      this.then(function (value) {
        Q.nextTick(function () {
          nodeback(null, value);
        });
      }, function (error) {
        Q.nextTick(function () {
          nodeback(error);
        });
      });
    } else {
      return this;
    }
  };

  Q.noConflict = function () {
    throw new Error("Q.noConflict only works when Q is used as a global");
  }; // All code before this point will be filtered from stack traces.


  var qEndingLine = captureLine();
  return Q;
});
},{"process":"5c67a338692e43521550fae6ba10bde5"}],"5c67a338692e43521550fae6ba10bde5":[function(require,module,exports) {
// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"140df4f8e97a45c53c66fead1f5a9e92":[function(require,module,exports) {
var $ = require('../internals/export');

var global = require('../internals/global');

var task = require('../internals/task');

var FORCED = !global.setImmediate || !global.clearImmediate; // http://w3c.github.io/setImmediate/

$({
  global: true,
  bind: true,
  enumerable: true,
  forced: FORCED
}, {
  // `setImmediate` method
  // http://w3c.github.io/setImmediate/#si-setImmediate
  setImmediate: task.set,
  // `clearImmediate` method
  // http://w3c.github.io/setImmediate/#si-clearImmediate
  clearImmediate: task.clear
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/task":"dd47ece3e1296f193ccefcf3056d1754"}],"10044f24ecae4059b4af184e71d3fba2":[function(require,module,exports) {
var global = require('../internals/global');

var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var redefine = require('../internals/redefine');

var setGlobal = require('../internals/set-global');

var copyConstructorProperties = require('../internals/copy-constructor-properties');

var isForced = require('../internals/is-forced');
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/set-global":"7e47fd3b4d01808069dad42c38d45146","../internals/copy-constructor-properties":"df952df9fa85293fe01bbdf9f7116b1b","../internals/is-forced":"700278f8e2cb4c21784f4e50866ce0e4"}],"7e78823454e7f795898745d93279f917":[function(require,module,exports) {
var global = arguments[3];

var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();
},{}],"5e181b7e7dcb1bb2de0a726b7af1e93d":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var call = require('../internals/function-call');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPropertyKey = require('../internals/to-property-key');
var hasOwn = require('../internals/has-own-property');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/object-property-is-enumerable":"6d666488e852af6845747bbd2705cc05","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/to-property-key":"df2b61336906907f777029fe90c882a8","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/ie8-dom-define":"e03ae13f7b17b2e21331d728bd059d1a"}],"7e006cebe93fc4773e87d3146a8fa81b":[function(require,module,exports) {
var fails = require('../internals/fails');

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"e16fc2ec92bf0d6254ffef14ea12ad77":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],"74736a18012731e2548e8322d30daf97":[function(require,module,exports) {
var NATIVE_BIND = require('../internals/function-bind-native');

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

},{"../internals/function-bind-native":"9fe384580e1b44a3b0b6ef5ec33478c3"}],"9fe384580e1b44a3b0b6ef5ec33478c3":[function(require,module,exports) {
var fails = require('../internals/fails');

module.exports = !fails(function () {
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"6d666488e852af6845747bbd2705cc05":[function(require,module,exports) {
'use strict';
var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

},{}],"8c5551ce5a79ddcd7162c3e3c8f33c9a":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"debf68affb1e9f1283fa252d49c32ceb":[function(require,module,exports) {
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":"35ae890303b620d792cd5faa73776178","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37"}],"35ae890303b620d792cd5faa73776178":[function(require,module,exports) {
var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var fails = require('../internals/fails');

var classof = require('../internals/classof-raw');

var Object = global.Object;
var split = uncurryThis(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/classof-raw":"901e5a25291bac244011feea921975b2"}],"b9577e436bf35f351d6949937f43e4a6":[function(require,module,exports) {
var NATIVE_BIND = require('../internals/function-bind-native');

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);

module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};

},{"../internals/function-bind-native":"9fe384580e1b44a3b0b6ef5ec33478c3"}],"901e5a25291bac244011feea921975b2":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"5617d8f084e26c58afcbde9a0982cf37":[function(require,module,exports) {
var global = require('../internals/global');

var TypeError = global.TypeError; // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"df2b61336906907f777029fe90c882a8":[function(require,module,exports) {
var toPrimitive = require('../internals/to-primitive');
var isSymbol = require('../internals/is-symbol');

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

},{"../internals/to-primitive":"2a7f05f0f9119d3b88a770acfa30cc7b","../internals/is-symbol":"7500e07108c47e5d25bda62049b8b4ba"}],"2a7f05f0f9119d3b88a770acfa30cc7b":[function(require,module,exports) {
var global = require('../internals/global');

var call = require('../internals/function-call');

var isObject = require('../internals/is-object');

var isSymbol = require('../internals/is-symbol');

var getMethod = require('../internals/get-method');

var ordinaryToPrimitive = require('../internals/ordinary-to-primitive');

var wellKnownSymbol = require('../internals/well-known-symbol');

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/is-object":"03244e745134af366d66b74456891052","../internals/is-symbol":"7500e07108c47e5d25bda62049b8b4ba","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/ordinary-to-primitive":"beb7e03593f40bc8230218c946b07a98","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"03244e745134af366d66b74456891052":[function(require,module,exports) {
var isCallable = require('../internals/is-callable');

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

},{"../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f"}],"305f89aa9a013f46af3c2284b8a3ce4f":[function(require,module,exports) {
// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};

},{}],"7500e07108c47e5d25bda62049b8b4ba":[function(require,module,exports) {
var global = require('../internals/global');

var getBuiltIn = require('../internals/get-built-in');

var isCallable = require('../internals/is-callable');

var isPrototypeOf = require('../internals/object-is-prototype-of');

var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var Object = global.Object;
module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d","../internals/use-symbol-as-uid":"ea1988735f852716e8c2b0bf1a7f981c"}],"a8e7e15d3af5a0a555019aebcf7ed164":[function(require,module,exports) {
var global = require('../internals/global');

var isCallable = require('../internals/is-callable');

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f"}],"544f373cb6f2cefc1ac40f5370c50e9d":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');

module.exports = uncurryThis({}.isPrototypeOf);

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"ea1988735f852716e8c2b0bf1a7f981c":[function(require,module,exports) {
/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = require('../internals/native-symbol');

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

},{"../internals/native-symbol":"f4c6561c5780f812466dd472171f0916"}],"f4c6561c5780f812466dd472171f0916":[function(require,module,exports) {
/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = require('../internals/engine-v8-version');
var fails = require('../internals/fails');

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

},{"../internals/engine-v8-version":"e23493e3b068d06b425cfae337547b80","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"e23493e3b068d06b425cfae337547b80":[function(require,module,exports) {
var global = require('../internals/global');

var userAgent = require('../internals/engine-user-agent');

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us

  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
} // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0


if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828"}],"143c26fec04440461ecc4dae3ad13828":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('navigator', 'userAgent') || '';

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164"}],"5375a7fbf3e5e64eea2416cbbad034a2":[function(require,module,exports) {
var aCallable = require('../internals/a-callable');

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};

},{"../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660"}],"d4f749998260ddb7816916a3fe6d4660":[function(require,module,exports) {
var global = require('../internals/global');

var isCallable = require('../internals/is-callable');

var tryToString = require('../internals/try-to-string');

var TypeError = global.TypeError; // `Assert: IsCallable(argument) is true`

module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/try-to-string":"3fb606768f23a6e9175aba0e8f4c8e20"}],"3fb606768f23a6e9175aba0e8f4c8e20":[function(require,module,exports) {
var global = require('../internals/global');

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"beb7e03593f40bc8230218c946b07a98":[function(require,module,exports) {
var global = require('../internals/global');

var call = require('../internals/function-call');

var isCallable = require('../internals/is-callable');

var isObject = require('../internals/is-object');

var TypeError = global.TypeError; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/is-object":"03244e745134af366d66b74456891052"}],"df9ad61e8404f948b528f2ef2becebe4":[function(require,module,exports) {
var global = require('../internals/global');

var shared = require('../internals/shared');

var hasOwn = require('../internals/has-own-property');

var uid = require('../internals/uid');

var NATIVE_SYMBOL = require('../internals/native-symbol');

var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;

    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }

  return WellKnownSymbolsStore[name];
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/shared":"1950ed6cf8f0dece2a998d60590e9098","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/uid":"d5b7e7679d9dac163ab327cbf9508501","../internals/native-symbol":"f4c6561c5780f812466dd472171f0916","../internals/use-symbol-as-uid":"ea1988735f852716e8c2b0bf1a7f981c"}],"1950ed6cf8f0dece2a998d60590e9098":[function(require,module,exports) {
var IS_PURE = require('../internals/is-pure');
var store = require('../internals/shared-store');

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.21.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/shared-store":"050f18cf9a95404c13e77ce244078f47"}],"f767c4b71b5cfe3ee6c1a7e54bdcafa0":[function(require,module,exports) {
module.exports = false;

},{}],"050f18cf9a95404c13e77ce244078f47":[function(require,module,exports) {
var global = require('../internals/global');

var setGlobal = require('../internals/set-global');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/set-global":"7e47fd3b4d01808069dad42c38d45146"}],"7e47fd3b4d01808069dad42c38d45146":[function(require,module,exports) {
var global = require('../internals/global'); // eslint-disable-next-line es/no-object-defineproperty -- safe


var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global[key] = value;
  }

  return value;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"d97bfcc83949e538357d288583678586":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var toObject = require('../internals/to-object');

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba"}],"2633fa4da95065e00ff87cc7cbdd56ba":[function(require,module,exports) {
var global = require('../internals/global');

var requireObjectCoercible = require('../internals/require-object-coercible');

var Object = global.Object; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37"}],"d5b7e7679d9dac163ab327cbf9508501":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"e03ae13f7b17b2e21331d728bd059d1a":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/document-create-element":"cbe47a0c6cb67b97db834ad53049114a"}],"cbe47a0c6cb67b97db834ad53049114a":[function(require,module,exports) {
var global = require('../internals/global');

var isObject = require('../internals/is-object');

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-object":"03244e745134af366d66b74456891052"}],"b52adb17d2cebacfac251681882f0a33":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a"}],"645ef963c1e312a12b44589911036a7f":[function(require,module,exports) {
var global = require('../internals/global');

var DESCRIPTORS = require('../internals/descriptors');

var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug');

var anObject = require('../internals/an-object');

var toPropertyKey = require('../internals/to-property-key');

var TypeError = global.TypeError; // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable'; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);

  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);

    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }

  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/ie8-dom-define":"e03ae13f7b17b2e21331d728bd059d1a","../internals/v8-prototype-define-bug":"a678e0bae4e73cf403d7e7fa4baa92b0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-property-key":"df2b61336906907f777029fe90c882a8"}],"a678e0bae4e73cf403d7e7fa4baa92b0":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"4f20fc1a2160760f9e7961d272520cbd":[function(require,module,exports) {
var global = require('../internals/global');

var isObject = require('../internals/is-object');

var String = global.String;
var TypeError = global.TypeError; // `Assert: Type(argument) is Object`

module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-object":"03244e745134af366d66b74456891052"}],"b8f156ba0e16ecf7371c0d9dbd0a7d60":[function(require,module,exports) {
var global = require('../internals/global');

var isCallable = require('../internals/is-callable');

var hasOwn = require('../internals/has-own-property');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var setGlobal = require('../internals/set-global');

var inspectSource = require('../internals/inspect-source');

var InternalStateModule = require('../internals/internal-state');

var CONFIGURABLE_FUNCTION_NAME = require('../internals/function-name').CONFIGURABLE;

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;

  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }

    if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
      createNonEnumerableProperty(value, 'name', name);
    }

    state = enforceInternalState(value);

    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }

  if (O === global) {
    if (simple) O[key] = value;else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/set-global":"7e47fd3b4d01808069dad42c38d45146","../internals/inspect-source":"2632e39e653b5d5a3bae68e9954b90e4","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/function-name":"8c9a0dc6f151e22aaeb5f0e18e363d7d"}],"2632e39e653b5d5a3bae68e9954b90e4":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var isCallable = require('../internals/is-callable');
var store = require('../internals/shared-store');

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/shared-store":"050f18cf9a95404c13e77ce244078f47"}],"8b9f5ed7c6f8b05b4cd6ee1eefa801c1":[function(require,module,exports) {
var NATIVE_WEAK_MAP = require('../internals/native-weak-map');

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var isObject = require('../internals/is-object');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var hasOwn = require('../internals/has-own-property');

var shared = require('../internals/shared-store');

var sharedKey = require('../internals/shared-key');

var hiddenKeys = require('../internals/hidden-keys');

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);

  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget(store, it) || {};
  };

  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };

  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};
},{"../internals/native-weak-map":"3633a06fd667b2a3966200ce5e2edda9","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/is-object":"03244e745134af366d66b74456891052","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/shared-store":"050f18cf9a95404c13e77ce244078f47","../internals/shared-key":"18fb64363b0383efc58d7addc88469cd","../internals/hidden-keys":"7cf9eee6c00d9cc7018f7817cf84e3d6"}],"3633a06fd667b2a3966200ce5e2edda9":[function(require,module,exports) {
var global = require('../internals/global');

var isCallable = require('../internals/is-callable');

var inspectSource = require('../internals/inspect-source');

var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/inspect-source":"2632e39e653b5d5a3bae68e9954b90e4"}],"18fb64363b0383efc58d7addc88469cd":[function(require,module,exports) {
var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":"1950ed6cf8f0dece2a998d60590e9098","../internals/uid":"d5b7e7679d9dac163ab327cbf9508501"}],"7cf9eee6c00d9cc7018f7817cf84e3d6":[function(require,module,exports) {
module.exports = {};

},{}],"8c9a0dc6f151e22aaeb5f0e18e363d7d":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var hasOwn = require('../internals/has-own-property');

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/has-own-property":"d97bfcc83949e538357d288583678586"}],"df952df9fa85293fe01bbdf9f7116b1b":[function(require,module,exports) {
var hasOwn = require('../internals/has-own-property');
var ownKeys = require('../internals/own-keys');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

},{"../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/own-keys":"a99313addb30af59e8e5785ab390671c","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f"}],"a99313addb30af59e8e5785ab390671c":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var anObject = require('../internals/an-object');

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/object-get-own-property-names":"b422be4dea2e1243d9a0803066cc2d3d","../internals/object-get-own-property-symbols":"f759fc76793903b9cadc1e3a84780ff9","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"b422be4dea2e1243d9a0803066cc2d3d":[function(require,module,exports) {
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/object-keys-internal":"87cfa515865c83e03f632cbb3fb5fffb","../internals/enum-bug-keys":"f973a6d08ba70476eedabcaf4b58c5fb"}],"87cfa515865c83e03f632cbb3fb5fffb":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var hasOwn = require('../internals/has-own-property');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/array-includes":"8d0989f06759b3b2c526a5860656b2fc","../internals/hidden-keys":"7cf9eee6c00d9cc7018f7817cf84e3d6"}],"8d0989f06759b3b2c526a5860656b2fc":[function(require,module,exports) {
var toIndexedObject = require('../internals/to-indexed-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var lengthOfArrayLike = require('../internals/length-of-array-like');

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

},{"../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/to-absolute-index":"ff996ac5a229620b351a78c404035460","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666"}],"ff996ac5a229620b351a78c404035460":[function(require,module,exports) {
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f"}],"25e1ba8089f537c8bc0aca5bea74579f":[function(require,module,exports) {
var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};

},{}],"e316973a6f76533d644cd1ab97e51666":[function(require,module,exports) {
var toLength = require('../internals/to-length');

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};

},{"../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f"}],"68c0420762f5f4704115d4fb34e0ae7f":[function(require,module,exports) {
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f"}],"f973a6d08ba70476eedabcaf4b58c5fb":[function(require,module,exports) {
// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

},{}],"f759fc76793903b9cadc1e3a84780ff9":[function(require,module,exports) {
// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

},{}],"700278f8e2cb4c21784f4e50866ce0e4":[function(require,module,exports) {
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f"}],"dd47ece3e1296f193ccefcf3056d1754":[function(require,module,exports) {
var global = require('../internals/global');

var apply = require('../internals/function-apply');

var bind = require('../internals/function-bind-context');

var isCallable = require('../internals/is-callable');

var hasOwn = require('../internals/has-own-property');

var fails = require('../internals/fails');

var html = require('../internals/html');

var arraySlice = require('../internals/array-slice');

var createElement = require('../internals/document-create-element');

var validateArgumentsLength = require('../internals/validate-arguments-length');

var IS_IOS = require('../internals/engine-is-ios');

var IS_NODE = require('../internals/engine-is-node');

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global.location;
} catch (error) {
  /* empty */
}

var run = function (id) {
  if (hasOwn(queue, id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), location.protocol + '//' + location.host);
}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength(arguments.length, 1);
    var fn = isCallable(handler) ? handler : Function(handler);
    var args = arraySlice(arguments, 1);

    queue[++counter] = function () {
      apply(fn, undefined, args);
    };

    defer(counter);
    return counter;
  };

  clear = function clearImmediate(id) {
    delete queue[id];
  }; // Node.js 0.8-


  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    }; // Sphere (JS game engine) Dispatch API

  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    }; // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624

  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && isCallable(global.postMessage) && !global.importScripts && location && location.protocol !== 'file:' && !fails(post)) {
    defer = post;
    global.addEventListener('message', listener, false); // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    }; // Rest old browsers

  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/html":"1918dab06b404ee3e52f081d798c1688","../internals/array-slice":"d58518bc0d77fd7d4bbb2d854257bf40","../internals/document-create-element":"cbe47a0c6cb67b97db834ad53049114a","../internals/validate-arguments-length":"ade492a073f7546303a9902550807c71","../internals/engine-is-ios":"3156eb661c8c8e66a6d95c3b2d979fb4","../internals/engine-is-node":"42c67226e3ca045b9c35647f16133bfa"}],"a59096d8f45a668c44fc59d4e30bb557":[function(require,module,exports) {
var NATIVE_BIND = require('../internals/function-bind-native');

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});

},{"../internals/function-bind-native":"9fe384580e1b44a3b0b6ef5ec33478c3"}],"f9e6dc73b4a152f549e8299150ac260e":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');
var NATIVE_BIND = require('../internals/function-bind-native');

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/function-bind-native":"9fe384580e1b44a3b0b6ef5ec33478c3"}],"1918dab06b404ee3e52f081d798c1688":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164"}],"d58518bc0d77fd7d4bbb2d854257bf40":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');

module.exports = uncurryThis([].slice);

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"ade492a073f7546303a9902550807c71":[function(require,module,exports) {
var global = require('../internals/global');

var TypeError = global.TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
  return passed;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"3156eb661c8c8e66a6d95c3b2d979fb4":[function(require,module,exports) {
var userAgent = require('../internals/engine-user-agent');

module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);

},{"../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828"}],"42c67226e3ca045b9c35647f16133bfa":[function(require,module,exports) {
var classof = require('../internals/classof-raw');

var global = require('../internals/global');

module.exports = classof(global.process) == 'process';
},{"../internals/classof-raw":"901e5a25291bac244011feea921975b2","../internals/global":"7e78823454e7f795898745d93279f917"}],"aabf248f40f7693ef84a0cb99f385d1f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadRecipe = exports.updateServings = exports.state = exports.loadSearchResults = exports.loadRecipe = exports.getSearchResultsPage = exports.deleteBookmark = exports.addBookmark = void 0;

var _regeneratorRuntime = require("regenerator-runtime");

var _config = require("./config.js");

var _helpers = require("./helpers.js");

const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: _config.RES_PER_PAGE
  },
  bookmarks: []
};
exports.state = state;

const createRecipeObject = function (data) {
  const {
    recipe
  } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && {
      key: recipe.key
    })
  };
};

const loadRecipe = async function (id) {
  try {
    const data = await (0, _helpers.AJAX)(`${_config.API_URL}${id}?key=${_config.KEY}`);
    state.recipe = createRecipeObject(data);
    if (state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true;else state.recipe.bookmarked = false;
    console.log(state.recipe);
  } catch (err) {
    // Temp error handling
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

exports.loadRecipe = loadRecipe;

const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await (0, _helpers.AJAX)(`${_config.API_URL}?search=${query}&key=${_config.KEY}`);
    console.log(data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && {
          key: rec.key
        })
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

exports.loadSearchResults = loadSearchResults;

const getSearchResultsPage = function () {
  let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : state.search.page;
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0

  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

exports.getSearchResultsPage = getSearchResultsPage;

const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newServings / state.recipe.servings; // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
  });
  state.recipe.servings = newServings;
};

exports.updateServings = updateServings;

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe); // Mark current recipe as bookmarked

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

exports.addBookmark = addBookmark;

const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1); // Mark current recipe as NOT bookmarked

  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

exports.deleteBookmark = deleteBookmark;

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearBookmarks = function () {
  localStorage.clear("bookmarks");
}; // clearBookmarks();


const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith("ingredient") && entry[1] !== "").map(ing => {
      const ingArr = ing[1].split(",").map(el => el.trim()); // const ingArr = ing[1].replaceAll(' ', '').split(',');

      if (ingArr.length !== 3) throw new Error("Wrong ingredient fromat! Please use the correct format :)");
      const [quantity, unit, description] = ingArr;
      return {
        quantity: quantity ? +quantity : null,
        unit,
        description
      };
    });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients
    };
    const data = await (0, _helpers.AJAX)(`${_config.API_URL}?key=${_config.KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

exports.uploadRecipe = uploadRecipe;
},{"regenerator-runtime":"e155e0d3930b156f86c48e8d05522b16","./config.js":"09212d541c5c40ff2bd93475a904f8de","./helpers.js":"0e8dcd8a4e1c61cf18f78e1c2563655d"}],"e155e0d3930b156f86c48e8d05522b16":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

},{}],"09212d541c5c40ff2bd93475a904f8de":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TIMEOUT_SEC = exports.RES_PER_PAGE = exports.MODAL_CLOSE_SEC = exports.KEY = exports.API_URL = void 0;
const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes/";
exports.API_URL = API_URL;
const TIMEOUT_SEC = 10;
exports.TIMEOUT_SEC = TIMEOUT_SEC;
const RES_PER_PAGE = 10;
exports.RES_PER_PAGE = RES_PER_PAGE;
const KEY = "1589af87-66d5-4ead-9df3-c723ca268f68";
exports.KEY = KEY;
const MODAL_CLOSE_SEC = 2.5;
exports.MODAL_CLOSE_SEC = MODAL_CLOSE_SEC;
},{}],"0e8dcd8a4e1c61cf18f78e1c2563655d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AJAX = void 0;

var _regeneratorRuntime = require("regenerator-runtime");

var _config = require("./config.js");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const AJAX = async function (url) {
  let uploadData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  try {
    const fetchPro = uploadData ? fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(uploadData)
    }) : fetch(url);
    const res = await Promise.race([fetchPro, timeout(_config.TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

exports.AJAX = AJAX;
},{"regenerator-runtime":"e155e0d3930b156f86c48e8d05522b16","./config.js":"09212d541c5c40ff2bd93475a904f8de"}],"bcae1aced0301b01ccacb3e6f7dfede8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

var _fractional = require("fractional");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import icons from "../img/icons.svg"; // Parcel 1
// Parcel 2; // Parcel 2
class RecipeView extends _view.default {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "We could not find that recipe. Please try another one!";
  _message = "";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;
      const {
        updateTo
      } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${_icons.default}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${_icons.default}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">servings</span>
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings - 1}">
              <svg>
                <use href="${_icons.default}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings + 1}">
              <svg>
                <use href="${_icons.default}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
        <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
          <svg>
            <use href="${_icons.default}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${_icons.default}#icon-bookmark${this._data.bookmarked ? "-fill" : ""}"></use>
          </svg>
        </button>
      </div>
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}
      </div>
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${_icons.default}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${_icons.default}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${ing.quantity ? new _fractional.Fraction(ing.quantity).toString() : ""}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>
  `;
  }

}

var _default = new RecipeView();

exports.default = _default;
},{"url:../../img/icons.svg":"ab90124d503f50480e98f328d3a20934","fractional":"ddbc156a7c16e105c8df04e9fdec967d","./view.js":"6a3957d8744bf1d70b2b44f3726dda59"}],"ab90124d503f50480e98f328d3a20934":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("13d21bde57a73580", "18fbd9fd0aa0d331");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"2146da1905b95151ed14d455c784e7b7":[function(require,module,exports) {
"use strict";

/* globals document:readonly */
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.


function getOrigin(url) {
  let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);

  if (!matches) {
    throw new Error('Origin not found');
  }

  return matches[0];
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;
},{}],"1b9943ef25c7bbdf0dd1b9fa91880a6c":[function(require,module,exports) {
"use strict";

var resolve = require('./bundle-manifest').resolve;

module.exports = function (fromId, toId) {
  return relative(dirname(resolve(fromId)), resolve(toId));
};

function dirname(_filePath) {
  if (_filePath === '') {
    return '.';
  }

  var filePath = _filePath[_filePath.length - 1] === '/' ? _filePath.slice(0, _filePath.length - 1) : _filePath;
  var slashIndex = filePath.lastIndexOf('/');
  return slashIndex === -1 ? '.' : filePath.slice(0, slashIndex);
}

function relative(from, to) {
  if (from === to) {
    return '';
  }

  var fromParts = from.split('/');

  if (fromParts[0] === '.') {
    fromParts.shift();
  }

  var toParts = to.split('/');

  if (toParts[0] === '.') {
    toParts.shift();
  } // Find where path segments diverge.


  var i;
  var divergeIndex;

  for (i = 0; (i < toParts.length || i < fromParts.length) && divergeIndex == null; i++) {
    if (fromParts[i] !== toParts[i]) {
      divergeIndex = i;
    }
  } // If there are segments from "from" beyond the point of divergence,
  // return back up the path to that point using "..".


  var parts = [];

  for (i = 0; i < fromParts.length - divergeIndex; i++) {
    parts.push('..');
  } // If there are segments from "to" beyond the point of divergence,
  // continue using the remaining segments.


  if (toParts.length > divergeIndex) {
    parts.push.apply(parts, toParts.slice(divergeIndex));
  }

  return parts.join('/');
}

module.exports._dirname = dirname;
module.exports._relative = relative;
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"ddbc156a7c16e105c8df04e9fdec967d":[function(require,module,exports) {
/*
fraction.js
A Javascript fraction library.

Copyright (c) 2009  Erik Garrison <erik@hypervolu.me>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/


/* Fractions */
/* 
 *
 * Fraction objects are comprised of a numerator and a denomenator.  These
 * values can be accessed at fraction.numerator and fraction.denomenator.
 *
 * Fractions are always returned and stored in lowest-form normalized format.
 * This is accomplished via Fraction.normalize.
 *
 * The following mathematical operations on fractions are supported:
 *
 * Fraction.equals
 * Fraction.add
 * Fraction.subtract
 * Fraction.multiply
 * Fraction.divide
 *
 * These operations accept both numbers and fraction objects.  (Best results
 * are guaranteed when the input is a fraction object.)  They all return a new
 * Fraction object.
 *
 * Usage:
 *
 * TODO
 *
 */

/*
 * The Fraction constructor takes one of:
 *   an explicit numerator (integer) and denominator (integer),
 *   a string representation of the fraction (string),
 *   or a floating-point number (float)
 *
 * These initialization methods are provided for convenience.  Because of
 * rounding issues the best results will be given when the fraction is
 * constructed from an explicit integer numerator and denomenator, and not a
 * decimal number.
 *
 *
 * e.g. new Fraction(1, 2) --> 1/2
 *      new Fraction('1/2') --> 1/2
 *      new Fraction('2 3/4') --> 11/4  (prints as 2 3/4)
 *
 */
Fraction = function(numerator, denominator)
{
    /* double argument invocation */
    if (typeof numerator !== 'undefined' && denominator) {
        if (typeof(numerator) === 'number' && typeof(denominator) === 'number') {
            this.numerator = numerator;
            this.denominator = denominator;
        } else if (typeof(numerator) === 'string' && typeof(denominator) === 'string') {
            // what are they?
            // hmm....
            // assume they are ints?
            this.numerator = parseInt(numerator);
            this.denominator = parseInt(denominator);
        }
    /* single-argument invocation */
    } else if (typeof denominator === 'undefined') {
        num = numerator; // swap variable names for legibility
        if (typeof(num) === 'number') {  // just a straight number init
            this.numerator = num;
            this.denominator = 1;
        } else if (typeof(num) === 'string') {
            var a, b;  // hold the first and second part of the fraction, e.g. a = '1' and b = '2/3' in 1 2/3
                       // or a = '2/3' and b = undefined if we are just passed a single-part number
            var arr = num.split(' ')
            if (arr[0]) a = arr[0]
            if (arr[1]) b = arr[1]
            /* compound fraction e.g. 'A B/C' */
            //  if a is an integer ...
            if (a % 1 === 0 && b && b.match('/')) {
                return (new Fraction(a)).add(new Fraction(b));
            } else if (a && !b) {
                /* simple fraction e.g. 'A/B' */
                if (typeof(a) === 'string' && a.match('/')) {
                    // it's not a whole number... it's actually a fraction without a whole part written
                    var f = a.split('/');
                    this.numerator = f[0]; this.denominator = f[1];
                /* string floating point */
                } else if (typeof(a) === 'string' && a.match('\.')) {
                    return new Fraction(parseFloat(a));
                /* whole number e.g. 'A' */
                } else { // just passed a whole number as a string
                    this.numerator = parseInt(a);
                    this.denominator = 1;
                }
            } else {
                return undefined; // could not parse
            }
        }
    }
    this.normalize();
}


Fraction.prototype.clone = function()
{
    return new Fraction(this.numerator, this.denominator);
}


/* pretty-printer, converts fractions into whole numbers and fractions */
Fraction.prototype.toString = function()
{
    if (this.denominator==='NaN') return 'NaN'
    var wholepart = (this.numerator/this.denominator>0) ?
      Math.floor(this.numerator / this.denominator) :
      Math.ceil(this.numerator / this.denominator)
    var numerator = this.numerator % this.denominator 
    var denominator = this.denominator;
    var result = []; 
    if (wholepart != 0)  
        result.push(wholepart);
    if (numerator != 0)  
        result.push(((wholepart===0) ? numerator : Math.abs(numerator)) + '/' + denominator);
    return result.length > 0 ? result.join(' ') : 0;
}


/* destructively rescale the fraction by some integral factor */
Fraction.prototype.rescale = function(factor)
{
    this.numerator *= factor;
    this.denominator *= factor;
    return this;
}


Fraction.prototype.add = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction) {
        b = b.clone();
    } else {
        b = new Fraction(b);
    }
    td = a.denominator;
    a.rescale(b.denominator);
    b.rescale(td);

    a.numerator += b.numerator;

    return a.normalize();
}


Fraction.prototype.subtract = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction) {
        b = b.clone();  // we scale our argument destructively, so clone
    } else {
        b = new Fraction(b);
    }
    td = a.denominator;
    a.rescale(b.denominator);
    b.rescale(td);

    a.numerator -= b.numerator;

    return a.normalize();
}


Fraction.prototype.multiply = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction)
    {
        a.numerator *= b.numerator;
        a.denominator *= b.denominator;
    } else if (typeof b === 'number') {
        a.numerator *= b;
    } else {
        return a.multiply(new Fraction(b));
    }
    return a.normalize();
}

Fraction.prototype.divide = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction)
    {
        a.numerator *= b.denominator;
        a.denominator *= b.numerator;
    } else if (typeof b === 'number') {
        a.denominator *= b;
    } else {
        return a.divide(new Fraction(b));
    }
    return a.normalize();
}

Fraction.prototype.equals = function(b)
{
    if (!(b instanceof Fraction)) {
        b = new Fraction(b);
    }
    // fractions that are equal should have equal normalized forms
    var a = this.clone().normalize();
    var b = b.clone().normalize();
    return (a.numerator === b.numerator && a.denominator === b.denominator);
}


/* Utility functions */

/* Destructively normalize the fraction to its smallest representation. 
 * e.g. 4/16 -> 1/4, 14/28 -> 1/2, etc.
 * This is called after all math ops.
 */
Fraction.prototype.normalize = (function()
{

    var isFloat = function(n)
    {
        return (typeof(n) === 'number' && 
                ((n > 0 && n % 1 > 0 && n % 1 < 1) || 
                 (n < 0 && n % -1 < 0 && n % -1 > -1))
               );
    }

    var roundToPlaces = function(n, places) 
    {
        if (!places) {
            return Math.round(n);
        } else {
            var scalar = Math.pow(10, places);
            return Math.round(n*scalar)/scalar;
        }
    }
        
    return (function() {

        // XXX hackish.  Is there a better way to address this issue?
        //
        /* first check if we have decimals, and if we do eliminate them
         * multiply by the 10 ^ number of decimal places in the number
         * round the number to nine decimal places
         * to avoid js floating point funnies
         */
        if (isFloat(this.denominator)) {
            var rounded = roundToPlaces(this.denominator, 9);
            var scaleup = Math.pow(10, rounded.toString().split('.')[1].length);
            this.denominator = Math.round(this.denominator * scaleup); // this !!! should be a whole number
            //this.numerator *= scaleup;
            this.numerator *= scaleup;
        } 
        if (isFloat(this.numerator)) {
            var rounded = roundToPlaces(this.numerator, 9);
            var scaleup = Math.pow(10, rounded.toString().split('.')[1].length);
            this.numerator = Math.round(this.numerator * scaleup); // this !!! should be a whole number
            //this.numerator *= scaleup;
            this.denominator *= scaleup;
        }
        var gcf = Fraction.gcf(this.numerator, this.denominator);
        this.numerator /= gcf;
        this.denominator /= gcf;
        if ((this.numerator < 0 && this.denominator < 0) || (this.numerator > 0 && this.denominator < 0)) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
        return this;
    });

})();


/* Takes two numbers and returns their greatest common factor.
 */
Fraction.gcf = function(a, b)
{

    var common_factors = [];
    var fa = Fraction.primeFactors(a);
    var fb = Fraction.primeFactors(b);
    // for each factor in fa
    // if it's also in fb
    // put it into the common factors
    fa.forEach(function (factor) 
    { 
        var i = fb.indexOf(factor);
        if (i >= 0) {
            common_factors.push(factor);
            fb.splice(i,1); // remove from fb
        }
    });

    if (common_factors.length === 0)
        return 1;

    var gcf = (function() {
        var r = common_factors[0];
        var i;
        for (i=1;i<common_factors.length;i++)
        {
            r = r * common_factors[i];
        }
        return r;
    })();

    return gcf;

};


// Adapted from: 
// http://www.btinternet.com/~se16/js/factor.htm
Fraction.primeFactors = function(n) 
{

    var num = Math.abs(n);
    var factors = [];
    var _factor = 2;  // first potential prime factor

    while (_factor * _factor <= num)  // should we keep looking for factors?
    {      
      if (num % _factor === 0)  // this is a factor
        { 
            factors.push(_factor);  // so keep it
            num = num/_factor;  // and divide our search point by it
        }
        else
        {
            _factor++;  // and increment
        }
    }

    if (num != 1)                    // If there is anything left at the end...
    {                                // ...this must be the last prime factor
        factors.push(num);           //    so it too should be recorded
    }

    return factors;                  // Return the prime factors
}

module.exports.Fraction = Fraction

},{}],"6a3957d8744bf1d70b2b44f3726dda59":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class View {
  _data;

  render(data) {
    let render = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (!data || Array.isArray(data) && data.length === 0) return this.renderError();
    this._data = data;

    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i]; // console.log(curEl, newEl.isEqualNode(curEl));
      // Updates changed TEXT

      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "") {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      } // Updates changed ATTRIBUES


      if (!newEl.isEqualNode(curEl)) Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${_icons.default}#icon-loader"></use>
        </svg>
      </div>
    `;

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError() {
    let message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._errorMessage;
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${_icons.default}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage() {
    let message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._message;
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${_icons.default}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

}

exports.default = View;
},{"url:../../img/icons.svg":"ab90124d503f50480e98f328d3a20934"}],"c5d792f7cac03ef65de30cc0fbb2cae7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class SearchView {
  _parentEl = document.querySelector(".search");

  getQuery() {
    const query = this._parentEl.querySelector(".search__field").value;

    this._clearInput();

    return query;
  }

  _clearInput() {
    this._parentEl.querySelector(".search__field").value = "";
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

}

var _default = new SearchView();

exports.default = _default;
},{}],"eacdbc0d50ee3d2819f3ee59366c2773":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _previewView = _interopRequireDefault(require("./previewView.js"));

var _view = _interopRequireDefault(require("./view.js"));

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResultsView extends _view.default {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your query! Please try again ;)";
  _message = "";

  _generateMarkup() {
    return this._data.map(result => _previewView.default.render(result, false)).join("");
  }

}

var _default = new ResultsView();

exports.default = _default;
},{"./view.js":"6a3957d8744bf1d70b2b44f3726dda59","url:../../img/icons.svg":"ab90124d503f50480e98f328d3a20934","./previewView.js":"e4d6583325a8b6c9380670c4f233bf07"}],"e4d6583325a8b6c9380670c4f233bf07":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

var _view = _interopRequireDefault(require("./view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PreviewView extends _view.default {
  _parentElement = "";

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
      <li class="preview">
        <a class="preview__link ${this._data.id === id ? "preview__link--active" : ""}" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated ${this._data.key ? "" : "hidden"}">
              <svg>
              <use href="${_icons.default}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
  }

}

var _default = new PreviewView();

exports.default = _default;
},{"url:../../img/icons.svg":"ab90124d503f50480e98f328d3a20934","./view.js":"6a3957d8744bf1d70b2b44f3726dda59"}],"d2063f3e7de2e4cdacfcb5eb6479db05":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

var _view = _interopRequireDefault(require("./view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PaginationView extends _view.default {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage); // Page 1, and there are other pages

    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${_icons.default}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    } // Last page


    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${_icons.default}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
    } // Other page


    if (curPage < numPages) {
      return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${_icons.default}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${_icons.default}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    } // Page 1, and there are NO other pages


    return "";
  }

}

var _default = new PaginationView();

exports.default = _default;
},{"url:../../img/icons.svg":"ab90124d503f50480e98f328d3a20934","./view.js":"6a3957d8744bf1d70b2b44f3726dda59"}],"7ed9311e216aa789713f70ebeec3ed40":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

var _previewView = _interopRequireDefault(require("./previewView.js"));

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BookmarksView extends _view.default {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ;)";
  _message = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data.map(bookmark => _previewView.default.render(bookmark, false)).join("");
  }

}

var _default = new BookmarksView();

exports.default = _default;
},{"url:../../img/icons.svg":"ab90124d503f50480e98f328d3a20934","./view.js":"6a3957d8744bf1d70b2b44f3726dda59","./previewView.js":"e4d6583325a8b6c9380670c4f233bf07"}],"4dd83c2a08c1751220d223c54dc70016":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

var _view = _interopRequireDefault(require("./view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AddRecipeView extends _view.default {
  _parentElement = document.querySelector(".upload");
  _message = "Recipe was successfully uploaded :)";
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();

    this._addHandlerShowWindow();

    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");

    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));

    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}

}

var _default = new AddRecipeView();

exports.default = _default;
},{"url:../../img/icons.svg":"ab90124d503f50480e98f328d3a20934","./view.js":"6a3957d8744bf1d70b2b44f3726dda59"}]},{},["802c60e168e525e821838345552f6b22","f086586adad1a66736ff5e8287c8016f","175e469a7ea7db1c8c0744d04372621f"], null)

//# sourceMappingURL=controller.4d61647a.js.map
