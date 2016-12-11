function addMethods(method, criteria) {
  var selector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.selector;


  for (var i in criteria) {

    selector = selector[method](criteria[i]);
  }

  return selector;
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var Iterator = function () {
  function Iterator(o) {
    classCallCheck(this, Iterator);


    this.props = o;
    this.selector = o.get;
  }

  createClass(Iterator, [{
    key: "_addMethods",
    value: function _addMethods(method, criteria, selector) {

      for (var i in criteria) {

        selector = selector[method](criteria[i]);
      }

      return selector;
    }
  }, {
    key: "_buildSelector",
    value: function _buildSelector(selector) {

      selector = this._addMethods("withIds", this.props.ids, selector);
      selector = this._addMethods("withCondition", this.props.conditions, selector);

      return selector.forDateRange(this.props.dateRange).withLimit(this.props.limits).orderBy(this.props.orderBy);
    }
  }, {
    key: "run",
    value: function run(logic) {

      this._iterator = this._buildSelector(this.selector).get();

      while (this._iterator.hasNext()) {

        this.item = this._iterator.next();
        logic.apply(this);
      }
    }
  }]);
  return Iterator;
}();

var Objectify = function (_Iterator) {
  inherits(Objectify, _Iterator);

  function Objectify(o) {
    classCallCheck(this, Objectify);
    return possibleConstructorReturn(this, (Objectify.__proto__ || Object.getPrototypeOf(Objectify)).call(this, o));
  }

  createClass(Objectify, [{
    key: "build",
    value: function build(child) {
      var _this2 = this;

      var inherit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


      var output = [];

      this.run(function () {

        var arr = [],
            children = _this2.item[child]();

        if (inherit === true) {
          children = _this2._buildSelector(children);
        }

        children = children.get();

        var _loop = function _loop() {

          var dateRange = _this2.props.dateRange,
              child = children.next();

          arr.push({
            getItem: function getItem() {
              return child;
            },
            getStats: function getStats() {
              return child.getStatsFor(dateRange);
            }
          });
        };

        while (children.hasNext()) {
          _loop();
        }

        output.push(arr);
      });

      return output;
    }
  }]);
  return Objectify;
}(Iterator);

var parameters = [{
  get: AdWordsApp.adGroups(),
  conditions: ["Status = ENABLED", "Clicks > 10"],
  dateRange: "LAST_7_DAYS"
}, {
  get: AdWordsApp.adGroups(),
  conditions: ["Status = ENABLED", "Clicks > 50"],
  dateRange: "LAST_14_DAYS"
}];

// Define some function
var someTest = function someTest(row) {

  for (var k in row) {
    Logger.log(k + " of " + row.length);
    Logger.log("Performing a test on " + row[k].getItem().getAdGroup().getName() + " -\n" + row[k].getItem().getId() + " - " + row[0].getStats().getCtr() + " - " + row[k].getStats().getClicks());
  }
};

// Run main function
function main() {

  for (var i in parameters) {

    // Returns an object with every ad in the ad group
    // Second parameter is whether to use same conditions as parent
    var obj = new Objectify(parameters[i]).build("ads");

    for (var j in obj) {

      someTest(obj[j]);
    }
  }
}

// Main function must be called for rollup. AdWords ignores it.
main();
