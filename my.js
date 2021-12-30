/**
 * @this {MyPromise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        // @ts-ignore
        return constructor.reject(reason);
      });
    }
  );
}

function allSettled(arr) {
  var P = this;
  return new P(function(resolve, reject) {
    if (!(arr && typeof arr.length !== 'undefined')) {
      return reject(
        new TypeError(
          typeof arr +
            ' ' +
            arr +
            ' is not iterable(cannot read property Symbol(Symbol.iterator))'
        )
      );
    }
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        var then = val.then;
        if (typeof then === 'function') {
          then.call(
            val,
            function(val) {
              res(i, val);
            },
            function(e) {
              args[i] = { status: 'rejected', reason: e };
              if (--remaining === 0) {
                resolve(args);
              }
            }
          );
          return;
        }
      }
      args[i] = { status: 'fulfilled', value: val };
      if (--remaining === 0) {
        resolve(args);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
}

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function isArray(x) {
  return Boolean(x && typeof x.length !== 'undefined');
}

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function MyPromise(fn) {
  if (!(this instanceof MyPromise))
    throw new TypeError('MyPromises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {MyPromise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  MyPromise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // MyPromise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof MyPromise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    MyPromise._immediateFn(function() {
      if (!self._handled) {
        MyPromise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

MyPromise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

MyPromise.prototype['finally'] = finallyConstructor;

MyPromise.all = function(arr) {
  return new MyPromise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('MyPromise.all accepts an array'));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

MyPromise.allSettled = allSettled;

MyPromise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === MyPromise) {
    return value;
  }

  return new MyPromise(function(resolve) {
    resolve(value);
  });
};

MyPromise.reject = function(value) {
  return new MyPromise(function(resolve, reject) {
    reject(value);
  });
};

MyPromise.race = function(arr) {
  return new MyPromise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('MyPromise.race accepts an array'));
    }

    for (var i = 0, len = arr.length; i < len; i++) {
      MyPromise.resolve(arr[i]).then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
MyPromise._immediateFn =
  // @ts-ignore
  (typeof setImmediate === 'function' &&
    function(fn) {
      // @ts-ignore
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

MyPromise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled MyPromise Rejection:', err); // eslint-disable-line no-console
  }
};



function step1(n) {
  console.log(`step1 with ${n}`);
  return new MyPromise(resolve => {
    setTimeout(() => resolve(n + 200), n);
  });
}
function step2(n) {
  console.log(`step2 with ${n}`);
  return new MyPromise(resolve => {
    setTimeout(() => resolve(n + 200), n);
  });
}
function step3(n) {
  console.log(`step3 with ${n}`);
  return new MyPromise(resolve => {
    setTimeout(() => resolve(n + 200), n);
  });
}


// function doIt() {
//   console.time("doIt");
//   const time1 = 300;
//   step1(time1)
//       .then(time2 => step2(time2))
//       .then(time3 => step3(time3))
//       .then(result => {
//           console.log(`result is ${result}`);
//           console.timeEnd("doIt");
//       });
// }

// doIt();

async function doIt() {
  console.time("doIt");
  const time1 = 300;
  const time2 = await step1(time1);
  const time3 = await step2(time2);
  const result = await step3(time3);
  console.log(`result is ${result}`);
  console.timeEnd("doIt");
}

doIt();

console.log(typeof use)

var a = {
  "url":"/user",
  "query":"pageNum=1&pageSize=10",
  "body":{
    "pageNum":"1",
    "pageSize":"10"
  },
  "params":{},
  "headers":{
    "host":"127.0.0.1:8035",
    "connection":"keep-alive",
    "sec-ch-ua":"\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
    "accept":"application/json",
    "sec-ch-ua-mobile":"?0",
    "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    "sec-ch-ua-platform":"\"Windows\"",
    "origin":"http://localhost:8033",
    "sec-fetch-site":"cross-site",
    "sec-fetch-mode":"cors",
    "sec-fetch-dest":"empty",
    "referer":"http://localhost:8033/",
    "accept-encoding":"gzip, deflate, br",
    "accept-language":"zh-CN,zh;q=0.9"
  },
  "method":"GET",
  "protocol":"http",
  "cookies":{},
  "hostname":"127.0.0.1",
  "ip":"127.0.0.1",
  "subdomains":{}
}


var a = {
  'Adonis/Core/Application': {
    callback: [Function (anonymous)],
    singleton: true,
    cachedValue: {
      appRoot: 'E:\\myCode\\lixi-shopping\\lixi-shopping-node',
      environment: 'web',
      helpers: [Object],
      providersWithReadyHook: [Array],
      providersWithShutdownHook: [Array],
      state: 'booted',
      cliCwd: 'E:\\myCode\\lixi-shopping\\lixi-shopping-node',
      isShuttingDown: false,
      nodeEnvironment: 'development',
      preloads: [Array],
      directoriesMap: [Map],
      aliasesMap: [Map],
      namespacesMap: [Map],
      container: [Ioc],
      rcFile: [Object],
      typescript: true,
      appName: 'lixi-shopping-node',
      version: [Object],
      adonisVersion: [Object],
      exceptionHandlerNamespace: 'App/Exceptions/Handler',
      env: [Env],
      config: [Config],
      logger: [Logger],
      profiler: [Profiler],
      registrar: [Registrar]
    }
  },
  'Adonis/Core/Helpers': { callback: [Function (anonymous)], singleton: false },
  'Adonis/Core/Env': {
    callback: [Function (anonymous)],
    singleton: true,
    cachedValue: {
      valuesToProcess: [],
      hasProcessedValues: true,
      envCache: [Object],
      validationSchema: [Object],
      schema: [Object]
    }
  },
  'Adonis/Core/Config' : {
    callback: [Function (anonymous)],
    singleton: true,
    cachedValue: { config: [Object] }
  },
  'Adonis/Core/Logger': {
    callback: [Function (anonymous)],
    singleton: true,
    cachedValue: { config: [Object], pino: [EventEmitter] }
  },
  'Adonis/Core/Profiler' : {
    callback: [Function (anonymous)],
    singleton: true,
    cachedValue: {
      appRoot: 'E:\\myCode\\lixi-shopping\\lixi-shopping-node',
      logger: [Logger],
      config: [Object]
    }
  },
  'Adonis/Core/HttpExceptionHandler' : { callback: [Function (anonymous)], singleton: false },
  'Adonis/Core/HealthCheck' : {
    callback: [Function (anonymous)],
    singleton: true,
    cachedValue: {
      application: [Application],
      healthCheckers: [Object],
      resolver: [IocResolver]
    }
  },
  'Adonis/Core/AssetsManager' : {
    callback: [Function (anonymous)],
    singleton: true,
    cachedValue:{
      config: {},
      application: [Application],
      drivers: [Object],
      booted: false
    }
  },
  'Adonis/Core/Encryption' : {
    callback: [Function (anonymous)],
    singleton: true,
    cachedValue: {
      options: [Object],
      separator: '.',
      base64:  {},
      algorithm: 'aes-256-cbc',
      cryptoKey: '',
      verifier: [MessageVerifier]
    }
  },
  'Adonis/Core/Event' : {
    callback: [Function (anonymous)],
    singleton: true,
    cachedValue: {
      transport: [Emittery],
      trappingEvents: false,
      traps: {},
      iocResolver: [IocResolver]
    }
  },
  'Adonis/Core/Drive' : {
    callback: [Function (anonymous)],
    singleton: true,
    cachedValue: {
      application: [Application],
      mappingsCache: [Map],
      driverCreatorNames: [Map],
      extendedDrivers: {},
      router: [Router],
      logger: [Logger],
      config: [Object],
      isReady: true,
      fakeCallback: [Function (anonymous)],
      singleton: true,
      fakes: {}
    }
  },
  'Adonis/Core/Hash' : { callback: [Function (anonymous)], singleton: true },
  'Adonis/Core/Request' : {
    callback: [Function (anonymous)],
    singleton: true,
    cachedValue: { macros: [Object], getters: {} }
  },
  'Adonis/Core/Response' : { callback: [Function (anonymous)], singleton: true },
  'Adonis/Core/MiddlewareStore' : { callback: [Function (anonymous)], singleton: false },
  'Adonis/Core/Server' : {
    callback: [Function (anonymous)],
    singleton: true,
    cachedValue: {
      application: [Application],
      encryption: [Encryption],
      httpConfig: [Object],
      middleware: [MiddlewareStore],
      router: [Router],
      hooks: [Hooks],
      precompiler: [PreCompiler],
      exception: [ExceptionManager],
      requestHandler: [RequestHandler]
    }
  },
  'Adonis/Core/HttpContext' : { callback: [Function (anonymous)], singleton: false },
  'Adonis/Core/Route' : {
    callback: [Function (anonymous)],
    singleton: true,
    cachedValue: {
      encryption: [Encryption],
      routeProcessor: [Function (anonymous)],
      routes: [Array],
      BriskRoute: [Function],
      RouteGroup: [Function],
      RouteResource: [Function],
      Route: [Function],
      RouteMatchers: [Function],
      matchers: {},
      paramMatchers: {},
      lookupStore: [LookupStore],
      store: [Store],
      openedGroups: []
    }
  },
  'Adonis/Core/CookieClient' : { callback: [Function (anonymous)], singleton: true },
  'Adonis/Core/BodyParser' : { callback: [Function (anonymous)], singleton: false },
  'Adonis/Core/Validator' : {
    callback: [Function (anonymous)],
    singleton: true,
    cachedValue: {
      ValidationException: [class ValidationException extends Exception],
      validator: [Object],
      schema: [Object],
      rules: [Object]
    }
  },
  'Adonis/Lucid/Database' : {
    callback: [Function (anonymous)],
    singleton: true,
    cachedValue: {
      config: [Object],
      logger: [Logger],
      profiler: [Profiler],
      emitter: [Emitter],
      Database: [Function],
      manager: [ConnectionManager],
      primaryConnectionName: 'mysql',
      DatabaseQueryBuilder: [Function],
      InsertQueryBuilder: [Function],
      ModelQueryBuilder: [Function],
      SimplePaginator: [Function],
      connectionGlobalTransactions: {},
      hasHealthChecksEnabled: false,
      prettyPrint: [Function]
    }
  },
  'Adonis/Lucid/Orm' : { callback: [Function (anonymous)], singleton: true },
  'Adonis/Lucid/Schema' : { callback: [Function (anonymous)], singleton: true },
  'Adonis/Lucid/Factory' : { callback: [Function (anonymous)], singleton: true },
  'Adonis/Lucid/Seeder' : { callback: [Function (anonymous)], singleton: true },
  'Adonis/Lucid/Migrator' : { callback: [Function (anonymous)], singleton: false },
  'Adonis/Core/View' : {
    callback: [Function (anonymous)],
    singleton: true,
    cachedValue: {
      options: [Object],
      executedPlugins: false,
      compilerOptions: [Object],
      asyncCompilerOptions: [Object],
      plugins: [Array],
      processor: [Processor],
      GLOBALS: [Object],
      tags: [Object],
      loader: [Loader],
      compiler: [Compiler],
      asyncCompiler: [Compiler]
    }
  },
  'Adonis/Logistic' : { callback: [Function (anonymous)], singleton: false }
}