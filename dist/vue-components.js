import 'core-js/modules/es.array.join';
import 'core-js/modules/es.array.map';
import 'core-js/modules/es.regexp.exec';
import 'core-js/modules/es.string.replace';
import 'core-js/modules/es.number.constructor';
import 'core-js/modules/es.string.match';
import 'core-js/modules/es.array.slice';
import 'core-js/modules/es.function.name';
import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.symbol';
import 'core-js/modules/es.symbol.description';
import 'core-js/modules/es.array.filter';
import 'core-js/modules/es.array.includes';
import 'core-js/modules/es.string.includes';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import 'core-js/modules/es.array.index-of';
import Vue from 'vue';
import 'core-js/modules/es.regexp.to-string';
import 'core-js/modules/es.string.split';
import Chrome from 'vue-color/src/components/Chrome.vue';
import flatPickr from 'vue-flatpickr-component';
import weekSelect from 'flatpickr/dist/plugins/weekSelect/weekSelect.js';
import monthSelect from 'flatpickr/dist/plugins/monthSelect/index.js';
import 'flatpickr/dist/plugins/monthSelect/style.css';
import 'core-js/modules/es.array.concat';
import 'core-js/modules/es.array.from';
import 'core-js/modules/es.set';
import 'core-js/modules/es.string.iterator';
import 'core-js/modules/web.dom-collections.iterator';
import 'core-js/modules/es.array.fill';
import 'core-js/modules/es.number.is-nan';
import 'core-js/modules/es.array.splice';
import 'core-js/modules/web.url';
import { Cropper } from 'vue-advanced-cropper';
import 'core-js/modules/es.string.search';
import 'core-js/modules/es.string.bold';
import 'core-js/modules/es.string.link';
import 'core-js/modules/es.string.strike';
import EmojiPicker from 'vue-emoji-picker';
import { Plugin, Extension, EditorMenuBar, EditorContent, Editor } from 'tiptap';
import { Blockquote, BulletList, OrderedList, Bold, Italic, Strike, Link, ListItem, HardBreak } from 'tiptap-extensions';

function fromArray(array) {
  var rows = [];
  var fields = [];

  for (var key in array[0]) {
    if (key[0] != '$') fields.push(escape(key));
  }

  rows.push(fields.map(function (f) {
    return '"' + f + '"';
  }).join(','));

  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    var row = [];

    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      row.push('"' + escape(item[field]) + '"');
    }

    rows.push(row.join(','));
  }

  return rows.join('\n');
}
function download(array, filename) {
  var data = fromArray(array);
  var a = document.createElement('a');
  a.href = 'data:attachment/csv;charset=utf-8,' + encodeURIComponent(data);
  a.target = '_blank';
  a.download = filename + '.csv';
  document.body.appendChild(a);
  a.click();
}
function escape(value) {
  return value ? ('' + value).replace('"', '\"') : '<null>';
}

var sortArrayByProperty = function sortArrayByProperty(property) {
  var sortOrder = 1;

  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};
var checkValidHex = function checkValidHex(str) {
  var RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
  if (RegExp.test(str)) return str;else return '#1FD0A3';
};

var Avatar = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "avatar",
      class: _vm.variant
    }, [_c('div', {
      staticClass: "wrapper",
      style: _vm.style
    }, [_c('p', {
      style: _vm.textStyle
    }, [_vm._v(_vm._s(_vm.initials))])])]);
  },
  staticRenderFns: [],
  name: 'Avatar',
  props: {
    text: {
      type: String,
      default: 'John Doe'
    },
    size: {
      type: [Number, String],
      default: 160
    },
    variant: {
      type: String
    },
    gravatarEmail: {
      type: String
    },
    imageUrl: {
      type: String
    }
  },
  methods: {
    stringToHslColor: function stringToHslColor(str, s, l) {
      var hash = 0;

      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }

      var h = hash % 360;
      return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    },
    stringToInitials: function stringToInitials(str) {
      var initials = str.match(/\b\w/g) || [];
      initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
      return initials;
    }
  },
  computed: {
    style: function style() {
      var obj = {};
      obj['background-color'] = this.stringToHslColor(this.text, 40, 40);
      obj['width'] = this.size + 'px';
      obj['height'] = this.size + 'px';

      if (this.gravatarEmail != null && this.gravatarEmail.length > 3) {
        var M = function M(d) {
          for (var _, m = '0123456789ABCDEF', f = '', r = 0; r < d.length; r++) {
            _ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _);
          }

          return f;
        };

        var X = function X(d) {
          for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) {
            _[m] = 0;
          }

          for (m = 0; m < 8 * d.length; m += 8) {
            _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
          }

          return _;
        };

        var V = function V(d) {
          for (var _ = '', m = 0; m < 32 * d.length; m += 8) {
            _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255);
          }

          return _;
        };

        var Y = function Y(d, _) {
          d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;

          for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
            var h = m,
                t = f,
                g = r,
                e = i;
            f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e);
          }

          return Array(m, f, r, i);
        };

        var md5_cmn = function md5_cmn(d, _, m, f, r, i) {
          return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m);
        };

        var md5_ff = function md5_ff(d, _, m, f, r, i, n) {
          return md5_cmn(_ & m | ~_ & f, d, _, r, i, n);
        };

        var md5_gg = function md5_gg(d, _, m, f, r, i, n) {
          return md5_cmn(_ & f | m & ~f, d, _, r, i, n);
        };

        var md5_hh = function md5_hh(d, _, m, f, r, i, n) {
          return md5_cmn(_ ^ m ^ f, d, _, r, i, n);
        };

        var md5_ii = function md5_ii(d, _, m, f, r, i, n) {
          return md5_cmn(m ^ (_ | ~f), d, _, r, i, n);
        };

        var safe_add = function safe_add(d, _) {
          var m = (65535 & d) + (65535 & _);
          return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m;
        };

        var bit_rol = function bit_rol(d, _) {
          return d << _ | d >>> 32 - _;
        };
        /* eslint-enable */


        /* eslint-disable */
        // prettier-ignore
        var MD5 = function MD5(d) {
          var result = M(V(Y(X(d), 8 * d.length)));
          return result.toLowerCase();
        };

        var md5Email = MD5(unescape(encodeURIComponent(this.gravatarEmail)));
        obj['background-image'] = 'url("https://www.gravatar.com/avatar/' + md5Email + '?s=' + this.size + '")';
        obj['background-size'] = 'cover';
        obj['background-position'] = 'center center';
      }

      if (this.imageUrl != null && this.imageUrl.length > 6) {
        obj['background-image'] = 'url("' + this.imageUrl + '")';
        obj['background-size'] = 'cover';
        obj['background-position'] = 'center center';
      }

      return obj;
    },
    textStyle: function textStyle() {
      var obj = {};
      obj['font-size'] = this.size / 2.5 + 'px';

      if (this.imageUrl != null && this.imageUrl.length > 7 || this.gravatarEmail != null && this.gravatarEmail.length > 3) {
        obj['display'] = 'none';
      }

      return obj;
    },
    initials: function initials() {
      return this.stringToInitials(this.text);
    }
  }
};

var AvatarGroup = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "avatar-group",
      style: {
        marginLeft: _vm.avatarSize / 6 + 'px'
      }
    }, [_vm._l(_vm.avatarsToDisplay, function (item, index) {
      return _c('Avatar', {
        key: index,
        style: {
          'z-index': _vm.avatars.length - index,
          marginLeft: -(_vm.avatarSize / 6) + 'px'
        },
        attrs: {
          "text": item.text,
          "size": _vm.avatarSize,
          "image-url": item.imageUrl,
          "gravatar-email": item.gravatarEmail
        }
      });
    }), _vm._v(" "), _vm.avatars.length > _vm.max ? _c('div', {
      staticClass: "avatar avatar-count",
      style: {
        marginLeft: -(_vm.avatarSize / 6) + 'px'
      }
    }, [_c('div', {
      staticClass: "wrapper",
      style: {
        width: _vm.avatarSize + 'px',
        height: _vm.avatarSize + 'px'
      }
    }, [_c('p', {
      style: {
        fontSize: _vm.avatarSize / 2.5 + 'px'
      }
    }, [_vm._v("+" + _vm._s(_vm.avatars.length - _vm.max))])])]) : _vm._e()], 2);
  },
  staticRenderFns: [],
  name: 'AvatarGroup',
  props: {
    avatars: {
      type: Array
    },
    avatarSize: {
      type: Number,
      required: true,
      default: 48
    },
    max: {
      type: Number,
      default: 3
    }
  },
  components: {
    Avatar: Avatar
  },
  computed: {
    avatarsToDisplay: function avatarsToDisplay() {
      if (this.max) {
        return this.avatars.slice(0, this.max);
      } else {
        return this.avatars;
      }
    }
  }
};

Promise.resolve().then(function () { return vClickOutside$1; });
var AvatarInfo = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "avatar-info"
    }, [_c('div', {
      staticClass: "avatar-wrapper"
    }, [_vm._t("avatar")], 2), _vm._v(" "), _vm.title || _vm.subtitle ? _c('div', {
      staticClass: "info-wrapper"
    }, [_c('h4', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('p', [_vm.subtitleOptions.href || _vm.subtitleOptions.clickAction ? _c('a', {
      attrs: {
        "href": _vm.subtitleOptions.href
      },
      on: {
        "click": function click($event) {
          return _vm.handleAction(_vm.subtitleOptions.clickAction);
        }
      }
    }, [_vm._v("\n                " + _vm._s(_vm.subtitle) + "\n            ")]) : _c('span', [_vm._v("\n                " + _vm._s(_vm.subtitle) + "\n            ")])])]) : _vm._e(), _vm._v(" "), _vm.avatarActions || _vm.$slots.avatarActions ? _c('div', {
      directives: [{
        name: "click-outside",
        rawName: "v-click-outside",
        value: _vm.hideAvatarActions,
        expression: "hideAvatarActions"
      }],
      staticClass: "avatar-actions-wrapper"
    }, [_c('a', {
      staticClass: "avatar-actions-toggle",
      on: {
        "click": function click($event) {
          _vm.toggleAvatarActions = !_vm.toggleAvatarActions;
        }
      }
    }, [_c('span', {
      staticClass: "material-icons"
    }, [_vm._v("\n                arrow_drop_down\n            ")])]), _vm._v(" "), _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.toggleAvatarActions,
        expression: "toggleAvatarActions"
      }],
      staticClass: "avatar-actions-container"
    }, [_vm._t("avatarActions", [_c('div', {
      staticClass: "avatar-actions"
    }, _vm._l(_vm.avatarActions, function (action, key) {
      return _c('a', {
        key: key,
        attrs: {
          "href": action.href
        },
        on: {
          "click": function click($event) {
            return _vm.handleAction(action.clickAction);
          }
        }
      }, [_vm._v("\n                        " + _vm._s(action.name) + "\n                    ")]);
    }), 0)])], 2)]) : _vm._e()]);
  },
  staticRenderFns: [],
  name: 'AvatarInfo',
  props: {
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    subtitleOptions: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    avatarActions: {
      type: Array
    }
  },
  data: function data() {
    return {
      toggleAvatarActions: false
    };
  },
  methods: {
    handleAction: function handleAction(fn) {
      if (fn) {
        fn();
      } else {
        return false;
      }
    },
    hideAvatarActions: function hideAvatarActions() {
      this.toggleAvatarActions = false;
    }
  }
};

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var getPredictionsFromPostcodeAPI = function getPredictionsFromPostcodeAPI(postcode) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var result, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return axios.get('https://api.cab9.co/api/LocationSearch/postcodeSearch?postcode=' + postcode);

            case 3:
              result = _context.sent;
              data = [];

              if (result.data.Addresses) {
                data = result.data.Addresses.map(function (address) {
                  var summary = '';
                  address.map(function (item, index) {
                    if (item) {
                      if (index !== 0) summary += ', ';
                      summary += item;
                    }

                    return item;
                  });
                  return {
                    Line1: address[0],
                    Line2: address[1],
                    Line3: address[2],
                    TownCity: address[3],
                    County: address[4],
                    PostCode: formatPostcode(postcode),
                    Country: '',
                    Latitude: result.data.Latitude,
                    Longitude: result.data.Longitude,
                    Summary: summary
                  };
                });
              }

              resolve(data);
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", reject(_context.t0));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

function formatPostcode(p) {
  var postcodeRegEx = /(^[A-Z]{1,2}[0-9]{1,2})([0-9][A-Z]{2}$)/i;
  var postcode = p.replace(postcodeRegEx, '$1 $2').toUpperCase();
  return postcode;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var getPredictionsFromGoogle = function getPredictionsFromGoogle(searchTxt, options) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              new options.google.maps.places.AutocompleteService().getPlacePredictions(_objectSpread2({
                input: searchTxt
              }, options), function (result) {
                resolve(result);
              });
              _context.next = 7;
              break;

            case 4:
              _context.prev = 4;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", reject(_context.t0));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 4]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var getAddressFromGoogle = function getAddressFromGoogle(pred, mapDiv, options) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var addressObj;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              addressObj = {};
              new options.google.maps.places.PlacesService(mapDiv).getDetails({
                placeId: pred.place_id,
                fields: ['address_component', 'geometry', 'formatted_address']
              }, function (place) {
                var street_number = place.address_components.filter(function (ac) {
                  return ac.types.indexOf('street_number') !== -1 || ac.types.indexOf('premise') !== -1;
                });
                var street_route = place.address_components.filter(function (ac) {
                  return ac.types.indexOf('route') !== -1;
                });
                addressObj.Line1 = (street_number.length ? street_number[0].long_name : '') + ' ' + (street_route.length ? street_route[0].long_name : '');
                var area = place.address_components.filter(function (ac) {
                  return ac.types.indexOf('locality') !== -1 || ac.types.indexOf('neighborhood') !== -1;
                });
                addressObj.Line2 = area.length ? area[0].long_name : null;
                addressObj.Line3 = '';
                var townCity = place.address_components.filter(function (ac) {
                  return ac.types.indexOf('postal_town') !== -1;
                });
                addressObj.TownCity = townCity.length ? townCity[0].long_name : null;
                var county = place.address_components.filter(function (ac) {
                  return ac.types.indexOf('administrative_area_level_2') !== -1;
                });
                addressObj.County = county.length ? county[0].long_name : null;
                var postcode = place.address_components.filter(function (ac) {
                  return ac.types.indexOf('postal_code') !== -1;
                });
                addressObj.PostCode = postcode.length ? postcode[0].long_name : null;
                var country = place.address_components.filter(function (ac) {
                  return ac.types.indexOf('country') !== -1;
                });
                addressObj.Country = country.length ? country[0].long_name : null;
                addressObj.Latitude = place.geometry && place.geometry.location ? place.geometry.location.lat() : null;
                addressObj.Longitude = place.geometry && place.geometry.location ? place.geometry.location.lng() : null;
                addressObj.Summary = place.formatted_address ? place.formatted_address : '';
                resolve(addressObj);
              });
              _context2.next = 8;
              break;

            case 5:
              _context2.prev = 5;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", reject(_context2.t0));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 5]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};

var getPredictionsFromMaps9 = function getPredictionsFromMaps9(searchTxt, options) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var result, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return axios.get('https://geocode.cab9.app/api/autocomplete', {
                params: _objectSpread2({
                  text: encodeURI(searchTxt)
                }, options)
              });

            case 3:
              result = _context.sent;
              data = result.data.map(function (address) {
                return {
                  Line1: '',
                  Line2: '',
                  Line3: '',
                  TownCity: '',
                  County: '',
                  PostCode: '',
                  Country: address.country,
                  Latitude: address.lat,
                  Longitude: address.lon,
                  Summary: address.label
                };
              });
              resolve(data);
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", reject(_context.t0));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

Promise.resolve().then(function () { return vDebounce$1; });
Promise.resolve().then(function () { return vClickOutside$1; });
var postcodeRegex = /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/;
var Component$5 = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "form-group"
    }, [_c('label', {
      staticClass: "control-label"
    }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('div', {
      directives: [{
        name: "click-outside",
        rawName: "v-click-outside",
        value: _vm.closeAddressList,
        expression: "closeAddressList"
      }],
      staticClass: "address-finder",
      class: _vm.type == 'Google' ? 'google-address-finder' : ''
    }, [_c('input', {
      directives: [{
        name: "debounce",
        rawName: "v-debounce",
        value: 300,
        expression: "300"
      }, {
        name: "model",
        rawName: "v-model",
        value: _vm.searchTxt,
        expression: "searchTxt"
      }],
      staticClass: "address-text",
      attrs: {
        "type": "text",
        "autocomplete": "no",
        "placeholder": "Start typing to search..."
      },
      domProps: {
        "value": _vm.searchTxt
      },
      on: {
        "focus": _vm.inputFocussed,
        "change": _vm.searchChanged,
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.searchTxt = $event.target.value;
        }
      }
    }), _vm._v(" "), _c('div', {
      ref: "mapDiv"
    }), _vm._v(" "), !_vm.addressSelected && (_vm.filteredAddresses.length > 0 || _vm.predictions.length > 0) ? _c('div', [_c('div', {
      staticClass: "places-result"
    }, [_vm.filteredAddresses.length > 0 ? _c('div', [_vm._m(0), _vm._v(" "), _c('div', {
      staticClass: "places-wrapper"
    }, _vm._l(_vm.filteredAddresses, function (_pred, key) {
      return _c('div', {
        key: 'local-' + key,
        staticClass: "place",
        on: {
          "click": function click($event) {
            return _vm.setAddress(_pred, true);
          }
        }
      }, [_c('a', {
        domProps: {
          "textContent": _vm._s(_pred.Name || _pred.Summary)
        }
      }), _vm._v(" "), _c('p', {
        staticClass: "place-desc"
      }, [_c('small', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _pred.Name,
          expression: "_pred.Name"
        }],
        domProps: {
          "textContent": _vm._s(_pred.Summary)
        }
      })])]);
    }), 0)]) : _vm._e(), _vm._v(" "), _vm.predictions.length > 0 ? _c('div', {
      class: _vm.filteredAddresses.length > 0 ? 'saved-results' : ''
    }, [_c('div', {
      staticClass: "places-title"
    }, [_c('span', {
      staticClass: "material-icons"
    }, [_vm._v("place")]), _c('span', [_vm._v(_vm._s(_vm.source) + " Search")])]), _vm._v(" "), _c('div', {
      staticClass: "places-wrapper"
    }, _vm._l(_vm.predictions, function (_pred, key) {
      return _c('div', {
        key: key,
        staticClass: "place"
      }, [_c('a', {
        domProps: {
          "textContent": _vm._s(_pred.description || _pred.Summary)
        },
        on: {
          "click": function click($event) {
            return _vm.setAddress(_pred);
          }
        }
      })]);
    }), 0)]) : _vm._e()])]) : _vm._e()])]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "places-title"
    }, [_c('span', {
      staticClass: "material-icons"
    }, [_vm._v("bookmark_border")]), _c('span', [_vm._v("Saved Places")])]);
  }],
  name: 'AddressFinder',
  props: {
    address: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    label: {
      type: String
    },
    type: {
      type: String,
      default: 'Maps9'
    },
    options: {
      type: Object
    },
    localAddresses: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      searchTxt: this.address && this.address.Summary || '',
      addressSelected: true,
      addressObj: this.address,
      autocomplete: null,
      predictions: [],
      source: null
    };
  },
  methods: {
    inputFocussed: function inputFocussed() {
      this.addressSelected = false;
    },
    closeAddressList: function closeAddressList() {
      this.addressSelected = true;
    },
    searchChanged: function searchChanged() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!(_this.searchTxt.length >= 3)) {
                  _context.next = 25;
                  break;
                }

                _this.postCodeSearch = false;

                if (!postcodeRegex.test(_this.searchTxt)) {
                  _context.next = 10;
                  break;
                }

                _this.source = 'Postcode';
                _context.next = 7;
                return getPredictionsFromPostcodeAPI(_this.searchTxt);

              case 7:
                result = _context.sent;
                _context.next = 21;
                break;

              case 10:
                if (!(_this.type == 'Google')) {
                  _context.next = 17;
                  break;
                }

                _this.source = 'Google';
                _context.next = 14;
                return getPredictionsFromGoogle(_this.searchTxt, _this.options);

              case 14:
                result = _context.sent;
                _context.next = 21;
                break;

              case 17:
                _this.source = 'Maps9';
                _context.next = 20;
                return getPredictionsFromMaps9(_this.searchTxt, _this.options);

              case 20:
                result = _context.sent;

              case 21:
                _this.predictions = [];

                if (result) {
                  _this.predictions = result;
                  _this.addressSelected = false;
                }

                _context.next = 26;
                break;

              case 25:
                _this.predictions = [];

              case 26:
                _context.next = 31;
                break;

              case 28:
                _context.prev = 28;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);

              case 31:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 28]]);
      }))();
    },
    setAddress: function setAddress(pred, local) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this2.source == 'Google' && !local)) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 3;
                return getAddressFromGoogle(pred, _this2.$refs.mapDiv, _this2.options);

              case 3:
                _this2.addressObj = _context2.sent;
                _this2.searchTxt = _this2.addressObj.Summary;
                _context2.next = 9;
                break;

              case 7:
                _this2.addressObj = pred;
                _this2.searchTxt = pred.Summary;

              case 9:
                _this2.addressSelected = true;

                _this2.$emit('update:address', _this2.addressObj);

                _this2.$emit('changed', _this2.addressObj);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  },
  computed: {
    filteredAddresses: function filteredAddresses() {
      var _this3 = this;

      return this.searchTxt && this.searchTxt.length >= 3 ? this.localAddresses.filter(function (item) {
        return (item.Name + item.Line1 + item.Line2 + item.Line3 + item.TownCity + item.County + item.PostCode + item.Country + item.Summary).toLowerCase().includes(_this3.searchTxt.toLowerCase());
      }) : this.localAddresses;
    }
  },
  created: function created() {
    var _this4 = this;

    this.component = function () {
      return import('./' + _this4.type + 'AddressFinder.vue');
    };
  }
};

var Badge = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "badge-wrapper"
    }, [_c('div', {
      staticClass: "badge-slot"
    }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
      staticClass: "badge",
      class: _vm.position,
      style: _vm.style
    }, [_vm._v("\n        " + _vm._s(_vm.text) + "\n    ")])]);
  },
  staticRenderFns: [],
  name: 'Badge',
  props: {
    size: {
      type: Number,
      default: 20
    },
    text: {
      type: String
    },
    color: {
      type: String,
      default: '#1FD0A3'
    },
    position: {
      type: String
    },
    overlap: {
      type: String,
      default: 'rectangle'
    }
  },
  computed: {
    style: function style() {
      var obj = {};
      obj['background-color'] = checkValidHex(this.color);
      obj['height'] = this.size + 'px';
      obj['min-width'] = this.size + 'px';
      obj['font-size'] = this.size / 1.67 + 'px';
      obj['border-radius'] = this.size / 2 + 'px';
      obj['padding'] = this.size / 4 + 'px';
      if (this.overlap == 'circle') obj['transform'] = 'none';
      return obj;
    }
  }
};

var Breadcrumbs = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "breadcrumbs"
    }, [_vm._t("pre"), _vm._v(" "), _c('ul', [_vm._l(_vm.$route.matched.slice(0, _vm.$route.matched.length - 1), function (route, key) {
      return _c('li', {
        key: key
      }, [_c('router-link', {
        attrs: {
          "to": {
            name: route.name
          },
          "tag": "a"
        }
      }, [_vm._v("\n                " + _vm._s(route.name) + "\n            ")]), _vm._v(" "), _c('span', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: !_vm.$slots.default,
          expression: "!$slots.default"
        }],
        staticClass: "delimeter"
      }, [_vm._v("\n                /\n            ")]), _vm._v(" "), _vm._t("default")], 2);
    }), _vm._v(" "), _c('li', [_vm._v("\n            " + _vm._s(_vm.$route.name) + "\n        ")])], 2)], 2);
  },
  staticRenderFns: [],
  name: 'Breadcrumbs'
};

var Button = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('button', {
      ref: "button",
      staticClass: "btn",
      class: ['btn-' + _vm.size, 'btn-' + _vm.type, _vm.customClass],
      style: _vm.backgroundColor,
      attrs: {
        "type": "button",
        "disabled": _vm.isLoading || _vm.disabled
      },
      on: {
        "click": _vm.callAction
      }
    }, [_vm.$slots.default && !_vm.isLoading ? _c('span', {
      staticClass: "icon"
    }, [_vm._t("default")], 2) : _vm._e(), _vm._v(" "), _c('img', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.isLoading,
        expression: "isLoading"
      }],
      staticClass: "loader",
      attrs: {
        "src": _vm.loaderImageUrl
      }
    }), _vm._v(" "), _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.loaderText && _vm.isLoading,
        expression: "loaderText && isLoading"
      }]
    }, [_vm._v(_vm._s(_vm.loaderText))]), _vm._v(" "), _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.isLoading,
        expression: "!isLoading"
      }]
    }, [_vm._v("\n        " + _vm._s(_vm.text) + "\n    ")])]);
  },
  staticRenderFns: [],
  name: 'Button',
  props: {
    action: {
      type: Function,
      default: function _default() {}
    },
    async: {
      type: Boolean,
      default: false
    },
    color: {
      type: String
    },
    customClass: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loaderText: {
      type: String
    },
    loaderImage: {
      type: String
    },
    size: {
      type: String,
      validator: function validator(value) {
        return ['xs', 'sm', 'md', 'lg'].indexOf(value) > -1 || !value;
      },
      default: 'md'
    },
    text: {
      type: String
    },
    type: {
      type: String,
      default: 'primary'
    }
  },
  data: function data() {
    return {
      isLoading: false,
      actions: {}
    };
  },
  methods: {
    callAction: function callAction() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var oldWidth;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this.isLoading) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                if (!_this.async) {
                  _context.next = 18;
                  break;
                }

                oldWidth = _this.$refs.button.style.width;
                _this.$refs.button.style.width = _this.$refs.button.offsetWidth + 'px';
                _this.isLoading = true;
                _context.prev = 6;
                _context.next = 9;
                return _this.actions.click();

              case 9:
                _this.isLoading = false;
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](6);
                _this.isLoading = false;

              case 15:
                if (_this.$refs.button) _this.$refs.button.style.width = oldWidth;
                _context.next = 19;
                break;

              case 18:
                _this.action();

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[6, 12]]);
      }))();
    }
  },
  computed: {
    backgroundColor: function backgroundColor() {
      if (this.color) {
        return {
          'background-color': this.color
        };
      }

      return {};
    },
    loaderImageUrl: function loaderImageUrl() {
      if (this.loaderImage) {
        return this.loaderImage;
      }

      return 'https://storage.googleapis.com/page9-dev-bucket/vue-components/loader.svg';
    }
  },
  created: function created() {
    var _this2 = this;

    this.$set(this.actions, 'click', function () {
      return new Promise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _this2.action();

                case 3:
                  resolve();
                  _context2.next = 9;
                  break;

                case 6:
                  _context2.prev = 6;
                  _context2.t0 = _context2["catch"](0);
                  return _context2.abrupt("return", reject(_context2.t0));

                case 9:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[0, 6]]);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    });
  }
};

var Card = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "card"
    }, [_c('div', {
      staticClass: "card-container"
    }, [_vm.options.actions && _vm.options.cardActionsLocation == 'top' ? _c('div', {
      staticClass: "card-actions-wrapper"
    }, [_c('a', {
      staticClass: "card-actions-toggle",
      attrs: {
        "href": ""
      }
    }, [_c('span', {
      staticClass: "material-icons",
      on: {
        "click": function click($event) {
          $event.preventDefault();
          _vm.toggleCardActions = !_vm.toggleCardActions;
        }
      }
    }, [_vm._v("\n                more_vert\n            ")])]), _vm._v(" "), _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.toggleCardActions,
        expression: "toggleCardActions"
      }],
      staticClass: "card-actions"
    }, _vm._l(_vm.options.actions, function (action, key) {
      return _c('a', {
        key: key,
        staticClass: "link",
        attrs: {
          "href": action.href
        },
        on: {
          "click": function click($event) {
            return _vm.handleAction(action.clickAction);
          }
        }
      }, [_vm._v("\n                    " + _vm._s(action.name) + "\n                ")]);
    }), 0)]) : _vm._e(), _vm._v(" "), !_vm.options.cardInfoLocation || _vm.options.cardInfoLocation == 'top' ? _c('div', {
      staticClass: "card-info"
    }, [_vm.options.avatarOptions ? _c('Avatar', {
      attrs: {
        "text": _vm.options.avatarOptions.text,
        "image-url": _vm.options.avatarOptions.imageUrl,
        "size": 48
      }
    }) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "details"
    }, [_c('h6', {
      domProps: {
        "textContent": _vm._s(_vm.title)
      }
    }), _vm._v(" "), _c('p', {
      staticClass: "subtitle-s",
      domProps: {
        "textContent": _vm._s(_vm.subTitle)
      }
    })])], 1) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "card-media"
    }, [_vm.cardMediaImage ? _c('div', {
      staticClass: "card-media-image",
      style: {
        'background-image': 'url(' + _vm.cardMediaImage + ')',
        height: _vm.cardMediaImageHeight + 'px'
      }
    }) : _c('div', {
      staticClass: "card-media-content"
    }, [_vm._t("cardMediaContent")], 2)]), _vm._v(" "), _vm.options.cardInfoLocation == 'middle' ? _c('div', {
      staticClass: "card-info"
    }, [_vm.options.avatarOptions ? _c('Avatar', {
      attrs: {
        "text": _vm.options.avatarOptions.text,
        "image-url": _vm.options.avatarOptions.imageUrl,
        "size": 48
      }
    }) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "details"
    }, [_c('h6', {
      domProps: {
        "textContent": _vm._s(_vm.title)
      }
    }), _vm._v(" "), _c('p', {
      staticClass: "subtitle-s",
      domProps: {
        "textContent": _vm._s(_vm.subTitle)
      }
    })])], 1) : _vm._e(), _vm._v(" "), _vm.cardSupportingText ? _c('div', {
      staticClass: "card-supporting"
    }, [_c('p', {
      staticClass: "body-s",
      domProps: {
        "textContent": _vm._s(_vm.cardSupportingText)
      }
    })]) : _vm._e(), _vm._v(" "), _vm.$slots.cardCustomContent ? _c('div', {
      staticClass: "card-custom"
    }, [_c('hr'), _vm._v(" "), _c('div', {
      staticClass: "card-custom-content"
    }, [_c('div', {
      staticClass: "card-custom-content-details"
    }, [_vm._t("cardCustomContent")], 2)])]) : _vm._e(), _vm._v(" "), _vm.$slots.cardExpandedContent ? _c('div', {
      staticClass: "card-expanded"
    }, [_c('hr'), _vm._v(" "), _c('div', {
      staticClass: "card-expanded-content"
    }, [_c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.toggle,
        expression: "toggle"
      }],
      staticClass: "card-expanded-content-details"
    }, [_vm._t("cardExpandedContent")], 2), _vm._v(" "), !_vm.options.expandedContentTitle ? _c('a', {
      staticClass: "link expand",
      on: {
        "click": function click($event) {
          _vm.toggle = !_vm.toggle;
        }
      }
    }, [_vm._v(_vm._s(_vm.toggle ? 'Collapse' : 'Expand'))]) : _vm._e(), _vm._v(" "), _vm.options.expandedContentTitle ? _c('a', {
      staticClass: "link expand",
      on: {
        "click": function click($event) {
          _vm.toggle = !_vm.toggle;
        }
      }
    }, [_vm._v(_vm._s(_vm.toggle ? 'Collapse' : _vm.options.expandedContentTitle))]) : _vm._e()])]) : _vm._e(), _vm._v(" "), _vm.options.actions && (!_vm.options.cardActionsLocation || _vm.options.cardActionsLocation == 'bottom') ? _c('div', {
      staticClass: "card-actions"
    }, _vm._l(_vm.options.actions, function (action, key) {
      return _c('a', {
        key: key,
        staticClass: "link",
        attrs: {
          "href": action.href
        },
        on: {
          "click": function click($event) {
            return _vm.handleAction(action.clickAction);
          }
        }
      }, [_vm._v("\n                " + _vm._s(action.name) + "\n            ")]);
    }), 0) : _vm._e()])]);
  },
  staticRenderFns: [],
  name: 'Card',
  props: {
    title: {
      type: String,
      default: 'Card Title'
    },
    subTitle: {
      type: String,
      default: 'This is the card description.'
    },
    cardMediaImage: {
      type: String,
      validator: function validator(value) {
        return value.substring(0, 4) == 'http';
      }
    },
    cardMediaImageHeight: {
      type: Number,
      default: 160
    },
    cardSupportingText: {
      type: String
    },
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  components: {
    Avatar: Avatar
  },
  data: function data() {
    return {
      toggle: false,
      toggleCardActions: false
    };
  },
  methods: {
    handleAction: function handleAction(fn) {
      if (fn) {
        fn();
      } else {
        return false;
      }
    }
  }
};

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

Vue.filter('truncateChars', function (val, num) {
  var result = '';
  val = val + '';

  if (val) {
    result = val.substring(0, num);

    if (val.length > num) {
      result += '...';
    }
  }

  return result;
});
var index = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "e9-chart"
    }, [!_vm.showTable ? _c(_vm.component, {
      tag: "component",
      attrs: {
        "options": _vm.mutableOptions,
        "width": _vm.width,
        "height": _vm.height,
        "data": _vm.data
      }
    }) : _vm._e(), _vm._v(" "), _vm.showTable ? _c('div', {
      staticClass: "chart-table-graph"
    }, [_c('div', {
      staticClass: "graph-wrapper",
      class: _vm.type.toLowerCase()
    }, [_c(_vm.component, {
      tag: "component",
      attrs: {
        "options": _vm.mutableOptions,
        "width": _vm.width,
        "height": _vm.height,
        "data": _vm.data
      }
    })], 1), _vm._v(" "), _vm.tableData && _vm.tableData.data && _vm.tableData.data.length > 0 ? _c('div', {
      staticClass: "chart-table-wrapper",
      class: _vm.type.toLowerCase(),
      style: {
        'max-height': _vm.height
      }
    }, [_c('div', {
      staticClass: "chart-table-header"
    }, _vm._l(_vm.tableData.header, function (item, key) {
      return _c('div', {
        key: key,
        staticClass: "header",
        style: _vm.getStyle(_vm.tableData.header.length, key)
      }, [_vm._v("\n                    " + _vm._s(item) + "\n                ")]);
    }), 0), _vm._v(" "), _c('div', {
      staticClass: "chart-table-body"
    }, _vm._l(_vm.tableData.data, function (item, key1) {
      return _c('div', {
        key: key1,
        staticClass: "chart-table-row",
        style: _vm.getRowStyle(),
        on: {
          "click": function click($event) {
            _vm.allowClick && _vm.itemSelected(item, key1);
          }
        }
      }, [_vm._l(item, function (col, key2) {
        return _c('div', {
          key: key2,
          staticClass: "chart-table-column",
          style: _vm.getStyle(_vm.tableData.header.length, key2)
        }, [_vm._v(_vm._s(col))]);
      }), _vm._v(" "), _c('br', {
        staticStyle: {
          "clear": "both"
        }
      })], 2);
    }), 0)]) : _vm._e()]) : _vm._e()], 1);
  },
  staticRenderFns: [],
  name: 'Chart',
  props: {
    title: {
      type: String
    },
    type: {
      type: String,
      required: true
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String],
      default: '300px'
    },
    showTable: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    },
    colors: {
      type: Array,
      default: function _default() {
        return ['#1D3461', '#0069AA', '#376996', '#6290C8', '#829CBC'];
      }
    },
    allowClick: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object
    }
  },
  data: function data() {
    return {
      component: null,
      mutableOptions: {}
    };
  },
  methods: {
    itemSelected: function itemSelected(row, key) {
      var filter = this.tableData.data[key];
      this.$emit('chartItemClicked', {
        item: filter,
        index: key
      });
    },
    getRowStyle: function getRowStyle() {
      return this.allowClick ? [{
        cursor: 'pointer'
      }] : [{
        cursor: 'auto'
      }];
    },
    getStyle: function getStyle(size, key) {
      if (size <= 2) {
        if (key == 0 || key == 'Title') return [{
          width: '70%',
          'text-align': 'left'
        }];else return [{
          width: '30%',
          'text-align': 'right'
        }];
      } else {
        if (key == 0 || key == 'Title') return [{
          width: '40%',
          'text-align': 'left'
        }];else return [{
          width: 60 / (size - 1) + '%',
          'text-align': 'right'
        }];
      }
    },
    populateChartOptions: function populateChartOptions(defaultOptions) {
      var chartOptions = defaultOptions;
      chartOptions.chart.id = this.title ? this.title : this.type;

      if (!chartOptions.chart.fontFamily) {
        chartOptions.chart.fontFamily = 'Arial';
      }

      if (this.mutableOptions) {
        for (var p in this.mutableOptions) {
          if (!chartOptions[p]) chartOptions[p] = {};

          if (_typeof(this.mutableOptions[p]) == 'object') {
            for (var innerP in this.mutableOptions[p]) {
              if (!chartOptions[p][innerP]) chartOptions[p][innerP] = {};
              chartOptions[p][innerP] = this.mutableOptions[p][innerP];
            }
          } else {
            chartOptions[p] = this.mutableOptions[p];
          }
        }
      }

      chartOptions.colors = this.colors;
      chartOptions.title.text = this.title ? this.title : '';

      if (!chartOptions.chart.toolbar) {
        chartOptions.chart.toolbar = {
          show: true,
          tools: {
            download: '<img src="https://storage.googleapis.com/page9-dev-bucket/vue-components/menu.svg" width="30">'
          }
        };
      }

      return chartOptions;
    }
  },
  computed: {
    tableData: function tableData() {
      var tableData = {
        header: ['Title'],
        data: []
      };

      for (var i = 0, len = this.data.categories.length; i < len; i++) {
        var _data = {
          Title: this.data.categories[i]
        };

        if (this.type != 'Pie' && this.type != 'Donut') {
          for (var j = 0, leng = this.data.series.length; j < leng; j++) {
            if (i == 0) {
              tableData.header.push(this.data.series[j].name || 'Value ' + (j + 1));
            }

            var _name = this.data.series[j].name || 'Value ' + (j + 1);

            _data[_name] = this.data.series[j].data[i];
          }
        } else {
          for (var _j = 0, _leng = this.data.series.length; _j < _leng; _j++) {
            if (i == 0 && _j == 0) {
              tableData.header.push('Value');
            }

            _data['Value'] = this.data.series[i];
          }
        }

        tableData.data.push(_data);
      }

      return tableData;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.mutableOptions = Vue.util.extend({}, this.options);

    if (!this.mutableOptions.chart) {
      this.mutableOptions.chart = {};
    }

    if (!this.mutableOptions.chart.events) {
      this.mutableOptions.chart.events = {};
    }

    if (this.allowClick) {
      this.mutableOptions.chart.events = {
        dataPointSelection: function dataPointSelection(event, chartContext, config) {
          var filter = _this.tableData.data[config.dataPointIndex];

          _this.$emit('chartItemClicked', {
            item: filter,
            index: config.dataPointIndex
          });
        }
      };
    } else {
      this.mutableOptions.chart.events = {
        dataPointSelection: null
      };
    }
  },
  created: function created() {
    var _this2 = this;

    this.component = function () {
      return import('./' + _this2.type + '.vue');
    };
  }
};

var Chip = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      ref: "chip",
      staticClass: "chip"
    }, [_vm._t("pre"), _vm._v("\n    " + _vm._s(_vm.text) + " "), !_vm.hideRemove ? _c('i', {
      staticClass: "material-icons",
      on: {
        "click": function click($event) {
          return _vm.$emit('removed', _vm.value);
        }
      }
    }, [_vm._v("cancel")]) : _vm._e(), _vm._v(" "), _vm._t("post")], 2);
  },
  staticRenderFns: [],
  name: 'Chip',
  props: {
    text: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    hideRemove: {
      type: Boolean,
      default: false
    }
  },
  mounted: function mounted() {
    var height = this.$refs.chip.clientHeight;
    this.$refs.chip.style.borderRadius = height / 2 + 'px';
  }
};

var ColorPicker = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      ref: "colorpicker"
    }, [_c('div', {
      staticClass: "input-group color-picker"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.colorValue,
        expression: "colorValue"
      }],
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": _vm.colorValue
      },
      on: {
        "focus": _vm.showPicker,
        "input": [function ($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.colorValue = $event.target.value;
        }, _vm.updateFromInput]
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "color-container"
    }, [_c('span', {
      staticClass: "current-color",
      style: 'background-color: ' + _vm.colorValue,
      on: {
        "click": _vm.togglePicker
      }
    })])]), _vm._v(" "), _vm.displayPicker ? _c('div', {
      staticClass: "color-picker-container"
    }, [_c('chrome-picker', {
      attrs: {
        "value": _vm.colors
      },
      on: {
        "input": _vm.updateFromPicker
      }
    })], 1) : _vm._e()]);
  },
  staticRenderFns: [],
  name: 'ColorPicker',
  props: {
    color: {
      type: String,
      validator: function validator(value) {
        if (!value) {
          return true;
        } else if (value[0] === '#') {
          return true;
        }

        return false;
      }
    }
  },
  components: {
    'chrome-picker': Chrome
  },
  data: function data() {
    return {
      colors: {
        hex: '#000000'
      },
      colorValue: '',
      displayPicker: false
    };
  },
  methods: {
    setColor: function setColor(color) {
      this.updateColors(color);
      this.colorValue = color;
    },
    updateColors: function updateColors(color) {
      if (color.slice(0, 1) === '#') {
        this.colors = {
          hex: color
        };
      } else if (color.slice(0, 4) === 'rgba') {
        var rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(','),
            hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
        this.colors = {
          hex: hex,
          a: rgba[3]
        };
      }
    },
    showPicker: function showPicker() {
      document.addEventListener('click', this.documentClick);
      this.displayPicker = true;
    },
    hidePicker: function hidePicker() {
      document.removeEventListener('click', this.documentClick);
      this.displayPicker = false;
    },
    togglePicker: function togglePicker() {
      this.displayPicker ? this.hidePicker() : this.showPicker();
    },
    updateFromInput: function updateFromInput() {
      this.updateColors(this.colorValue);
    },
    updateFromPicker: function updateFromPicker(color) {
      this.colors = color;

      if (color.rgba.a === 1) {
        this.colorValue = color.hex;
      } else {
        this.colorValue = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
      }
    },
    documentClick: function documentClick(e) {
      var el = this.$refs.colorpicker,
          target = e.target;

      if (el !== target && !el.contains(target)) {
        this.hidePicker();
      }
    }
  },
  watch: {
    colorValue: function colorValue(val) {
      if (val) {
        this.updateColors(val);
        this.$emit('updated', val);
        this.$emit('update:color', val);
      }
    }
  },
  mounted: function mounted() {
    this.setColor(this.color || '#000000');
  }
};

var flatPickrInstance;
var Datepicker = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('div', {
      staticClass: "form-group"
    }, [_c('flat-pickr', _vm._g({
      ref: "datepicker",
      staticClass: "form-control datepicker",
      attrs: {
        "config": _vm.configObj
      },
      on: {
        "on-change": _vm.emitOnChange
      },
      model: {
        value: _vm.clonedValue,
        callback: function callback($$v) {
          _vm.clonedValue = $$v;
        },
        expression: "clonedValue"
      }
    }, _vm.$listeners)), _vm._v(" "), _c('div', {
      staticClass: "custom-datepicker-markup",
      attrs: {
        "data-toggle": ""
      }
    }, [_vm._t("default")], 2)], 1)]);
  },
  staticRenderFns: [],
  name: 'Datepicker',
  props: {
    value: {
      type: [String, Date, Array]
    },
    calendarConfig: {
      type: Object
    },
    selectMode: {
      type: String,
      default: 'day'
    }
  },
  components: {
    flatPickr: flatPickr
  },
  data: function data() {
    return {
      clonedValue: this.value,
      config: {
        defaultDate: 'today',
        locale: {
          firstDayOfWeek: 1
        }
      },
      customMarkupConfig: {
        wrap: true,
        altInputClass: 'hide-default-datepicker-input'
      },
      weekSelectConfig: {
        mode: 'single',
        'plugins': [new weekSelect()]
      },
      monthSelectConfig: {
        weekNumbers: false,
        mode: 'single',
        plugins: [new monthSelect({
          dateFormat: this.calendarConfig.dateFormat ? this.calendarConfig.dateFormat : 'd-m-Y'
        })]
      }
    };
  },
  methods: {
    emitOnChange: function emitOnChange(selectedDates, dateStr, instance) {
      if (instance.config.mode == 'range') dateStr = dateStr.split(' to ');else if (instance.config.mode == 'multiple') dateStr = dateStr.split(',');

      if (this.selectMode == 'week') {
        // flatPickrInstance.selectedDates=[instance.weekStartDay,instance.weekEndDay];
        dateStr = [instance.formatDate(instance.weekStartDay, instance.config.dateFormat), instance.formatDate(instance.weekEndDay, instance.config.dateFormat)];
      } else if (this.selectMode == 'month') dateStr = [dateStr, instance.formatDate(new Date(instance.currentYear, instance.currentMonth + 1, 0), instance.config.dateFormat)];

      this.$emit('update:value', dateStr);
    },
    clear: function clear() {
      flatPickrInstance.clear();
    },
    close: function close() {
      flatPickrInstance.close();
    },
    destroy: function destroy() {
      flatPickrInstance.destroy();
    },
    formatDate: function formatDate(dateObj, formatStr) {
      flatPickrInstance.formatDate(dateObj, formatStr);
    },
    jumpToDate: function jumpToDate(dateObj, triggerChange) {
      flatPickrInstance.formatDate(dateObj, triggerChange);
    },
    open: function open() {
      flatPickrInstance.open();
    },
    parseDate: function parseDate(dateStr, dateFormat) {
      flatPickrInstance.parseDate(dateStr, dateFormat);
    },
    redraw: function redraw() {
      flatPickrInstance.redraw();
    },
    set: function set(option, value) {
      flatPickrInstance.set(option, value);
    },
    setDate: function setDate(date, triggerChange, dateStrFormat) {
      flatPickrInstance.setDate(date, triggerChange, dateStrFormat);
    },
    toggle: function toggle() {
      flatPickrInstance.toggle();
    }
  },
  computed: {
    configObj: function configObj() {
      var conf = _objectSpread2({}, this.config, {}, this.calendarConfig);

      if (this.selectMode == 'week') {
        conf = _objectSpread2({}, conf, {}, this.weekSelectConfig);
      } else if (this.selectMode == 'month') {
        conf = _objectSpread2({}, conf, {}, this.monthSelectConfig);
      }

      if (this.$slots.default) {
        conf = _objectSpread2({}, conf, {}, this.customMarkupConfig);
      }

      return conf;
    }
  },
  mounted: function mounted() {
    flatPickrInstance = this.$refs.datepicker.fp;
  }
};

var Overlay = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('transition', {
      attrs: {
        "name": "fade"
      }
    }, [_vm.show ? _c('div', {
      class: {
        relative: _vm.relative
      }
    }, [_c('div', {
      staticClass: "overlay",
      style: _vm.getOpacity
    }, [_c('img', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showClose && _vm.relative,
        expression: "showClose && relative"
      }],
      staticClass: "close",
      attrs: {
        "src": "https://storage.googleapis.com/page9-dev-bucket/vue-components/close.svg"
      },
      on: {
        "click": _vm.close
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "overlay-content",
      class: _vm.customContentClass
    }, [_c('img', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showClose && !_vm.relative,
        expression: "showClose && !relative"
      }],
      staticClass: "close",
      attrs: {
        "src": "https://storage.googleapis.com/page9-dev-bucket/vue-components/close-dark.svg"
      },
      on: {
        "click": _vm.close
      }
    }), _vm._v(" "), _vm._t("default")], 2)])]) : _vm._e()]);
  },
  staticRenderFns: [],
  name: 'Overlay',
  props: {
    customContentClass: {
      type: String
    },
    show: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    relative: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: Number,
      default: 0.6,
      validator: function validator(value) {
        return !value || value <= 1 && value > 0;
      }
    }
  },
  methods: {
    close: function close() {
      this.$emit('update:show', false);
    }
  },
  computed: {
    getOpacity: function getOpacity() {
      return {
        'background-color': 'rgba(33, 33, 33,' + this.opacity + ')'
      };
    }
  }
};

var Tooltip = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "tooltip-wrapper",
      on: {
        "mouseover": function mouseover($event) {
          return _vm.showInfo(true);
        },
        "mouseout": function mouseout($event) {
          return _vm.showInfo(false);
        }
      }
    }, [_vm._t("default"), _vm._v(" "), _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showTooltip,
        expression: "showTooltip"
      }],
      staticClass: "tooltip-info",
      style: _vm.getPosition
    }, [_vm._v("\n        " + _vm._s(_vm.message) + "\n    ")])], 2);
  },
  staticRenderFns: [],
  name: 'Tooltip',
  props: {
    message: {
      type: String,
      required: true
    },
    position: {
      type: String,
      default: 'right'
    }
  },
  data: function data() {
    return {
      showTooltip: false
    };
  },
  methods: {
    showInfo: function showInfo(isDisplay) {
      this.showTooltip = isDisplay;
    }
  },
  computed: {
    getPosition: function getPosition() {
      switch (this.position) {
        case 'right':
          return {
            right: '-10px',
            top: '50%',
            transform: 'translate(100%, -50%)'
          };

        case 'left':
          return {
            left: '-10px',
            transform: 'translate(-100%)',
            top: 0
          };

        case 'top':
          return {
            top: '-10px',
            left: '50%',
            transform: 'translate(-50%, -100%)'
          };

        case 'bottom':
          return {
            bottom: '-10px',
            left: '50%',
            transform: 'translate(-50%, 100%)'
          };

        case 'top-right':
          return {
            right: '-10px',
            top: 0,
            transform: 'translateX(100%)'
          };

        case 'bottom-right':
          return {
            right: '-10px',
            bottom: 0,
            transform: 'translateX(100%)'
          };

        case 'top-left':
          return {
            left: '-10px',
            top: 0,
            transform: 'translateX(-100%)'
          };

        case 'bottom-left':
          return {
            left: '-10px',
            bottom: 0,
            transform: 'translateX(-100%)'
          };

        default:
          return {
            right: '-10px',
            top: '50%',
            transform: 'translate(100%, -50%)'
          };
      }
    }
  }
};

var Panel = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "panel",
      class: _vm.collapsed ? 'panel-collapsed' : ''
    }, [_c('div', {
      staticClass: "panel-header"
    }, [_vm.title || _vm.subTitle ? _c('div', {
      staticClass: "panel-info"
    }, [_c('h6', {
      staticClass: "title-s",
      domProps: {
        "textContent": _vm._s(_vm.title)
      }
    }), _vm._v(" "), _c('p', {
      staticClass: "subtitle-s",
      domProps: {
        "textContent": _vm._s(_vm.subTitle)
      }
    })]) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "panel-options"
    }, [_vm.options.download ? _c('a', {
      attrs: {
        "href": ""
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();
          return _vm.handleAction(_vm.options.download);
        }
      }
    }, [_c('span', {
      staticClass: "material-icons"
    }, [_vm._v("get_app")])]) : _vm._e(), _vm._v(" "), _vm.options.refresh ? _c('a', {
      attrs: {
        "href": ""
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();
          return _vm.handleAction(_vm.options.refresh);
        }
      }
    }, [_c('span', {
      staticClass: "material-icons"
    }, [_vm._v("refresh")])]) : _vm._e(), _vm._v(" "), _vm.options.info ? _c('a', {
      attrs: {
        "href": ""
      }
    }, [_c('Tooltip', {
      attrs: {
        "message": _vm.options.info.message,
        "position": _vm.options.info.position
      }
    }, [_c('span', {
      staticClass: "material-icons"
    }, [_vm._v("info")])])], 1) : _vm._e(), _vm._v(" "), _vm.collapsible ? _c('a', {
      staticClass: "collapse",
      attrs: {
        "href": ""
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();
          return _vm.toggleCollapse();
        }
      }
    }, [_c('span', {
      staticClass: "material-icons"
    }, [_vm._v("keyboard_arrow_up")])]) : _vm._e()])]), _vm._v(" "), _c('div', {
      ref: "collapsible",
      staticClass: "collapsible"
    }, [_c('div', {
      staticClass: "panel-body"
    }, [_vm._t("panelBody")], 2), _vm._v(" "), _c('div', {
      staticClass: "panel-footer"
    }, [_vm._t("panelFooter")], 2)])]);
  },
  staticRenderFns: [],
  name: 'Panel',
  props: {
    title: {
      type: String
    },
    subTitle: {
      type: String
    },
    collapsible: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  components: {
    Tooltip: Tooltip
  },
  data: function data() {
    return {
      collapsed: false
    };
  },
  methods: {
    handleAction: function handleAction(fn) {
      if (fn) {
        fn();
      } else {
        return false;
      }
    },
    toggleCollapse: function toggleCollapse() {
      this.collapsed = !this.collapsed;
      if (this.collapsed) this.$refs.collapsible.style.maxHeight = 0;else this.$refs.collapsible.style.maxHeight = this.$refs.collapsible.scrollHeight + 'px';
    }
  },
  mounted: function mounted() {
    if (this.collapsible) this.$refs.collapsible.style.maxHeight = this.$refs.collapsible.scrollHeight + 'px';
  }
};

var ProgressBar = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "progress-bar",
      style: {
        height: _vm.height + 'px'
      }
    }, [_c('div', {
      ref: "progress-bar-value",
      staticClass: "value",
      style: _vm.style
    })]);
  },
  staticRenderFns: [],
  name: 'ProgressBar',
  props: {
    value: {
      type: Number
    },
    color: {
      type: String,
      default: '#7ED321'
    },
    height: {
      type: Number,
      default: 10
    }
  },
  data: function data() {
    return {
      id: null
    };
  },
  computed: {
    style: function style() {
      var obj = {};
      obj['background-color'] = checkValidHex(this.color);
      obj['height'] = this.height + 'px';
      return obj;
    }
  },
  mounted: function mounted() {
    var _this = this;

    setTimeout(function () {
      _this.$refs['progress-bar-value'].style.width = _this.value + '%';
    }, 0);
  }
};

var prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];
var Range = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "range-wrapper"
    }, [_vm._t("pre"), _vm._v(" "), _c('div', {
      staticClass: "range-slider",
      attrs: {
        "id": 'range-slider-' + _vm.id
      }
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.range[0],
        expression: "range[0]"
      }],
      attrs: {
        "min": _vm.min,
        "max": _vm.max,
        "type": "range",
        "step": _vm.step
      },
      domProps: {
        "value": _vm.range[0]
      },
      on: {
        "input": _vm.lowerSliderInput,
        "__r": function __r($event) {
          return _vm.$set(_vm.range, 0, $event.target.value);
        }
      }
    }), _vm._v(" "), _vm.range.length > 1 ? _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.range[1],
        expression: "range[1]"
      }],
      attrs: {
        "min": _vm.min,
        "max": _vm.max,
        "type": "range",
        "step": _vm.step
      },
      domProps: {
        "value": _vm.range[1]
      },
      on: {
        "input": _vm.upperSliderInput,
        "__r": function __r($event) {
          return _vm.$set(_vm.range, 1, $event.target.value);
        }
      }
    }) : _vm._e()]), _vm._v(" "), _vm._t("post")], 2);
  },
  staticRenderFns: [],
  name: 'Range',
  props: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    step: {
      type: Number,
      default: 1
    },
    range: {
      type: Array,
      required: true
    },
    trackBg: {
      type: Array,
      default: function _default() {
        return ['#B5B5BE', '#0B58D4'];
      }
    }
  },
  data: function data() {
    return {
      id: this._uid,
      sheet: null
    };
  },
  methods: {
    upperSliderInput: function upperSliderInput() {
      this.range[0] = parseInt(this.range[0]);
      this.range[1] = parseInt(this.range[1]);

      if (this.range[1] <= this.range[0]) {
        this.range[0] = this.range[1];
      }

      this.sheet.textContent = this.getTrackStyle();
    },
    lowerSliderInput: function lowerSliderInput() {
      if (this.range.length > 1) {
        this.range[0] = parseInt(this.range[0]);
        this.range[1] = parseInt(this.range[1]);

        if (this.range[0] >= this.range[1]) {
          this.range[1] = this.range[0];
        }
      }

      this.sheet.textContent = this.getTrackStyle();
    },
    getTrackStyle: function getTrackStyle() {
      var style = '';

      if (this.range.length > 1) {
        for (var i = 0; i < prefs.length; i++) {
          style += '#range-slider-' + this.id + ' input::-' + prefs[i] + '{background: linear-gradient(to right, ' + this.trackBg[0] + ' 0%, ' + this.trackBg[0] + ' ' + this.range[0] / this.max * 100 + '%,' + this.trackBg[1] + ' ' + this.range[0] / this.max * 100 + '%, ' + this.trackBg[1] + ' ' + this.range[1] / this.max * 100 + '%,' + this.trackBg[0] + ' ' + this.range[1] / this.max * 100 + '%, ' + this.trackBg[0] + ' 100%)}';
        }
      } else {
        for (var _i = 0; _i < prefs.length; _i++) {
          style += '#range-slider-' + this.id + ' input::-' + prefs[_i] + '{background: linear-gradient(to right, ' + this.trackBg[1] + ' 0%, ' + this.trackBg[1] + ' ' + this.range[0] / this.max * 100 + '%,' + this.trackBg[0] + ' ' + this.range[0] / this.max * 100 + '%, ' + this.trackBg[0] + ' 100%)}';
        }
      }

      return style;
    }
  },
  mounted: function mounted() {
    this.sheet = document.createElement('style');
    this.sheet.setAttribute('id', this.id);
    document.body.appendChild(this.sheet);
    this.sheet.textContent = this.getTrackStyle();
  }
};

var Component$4 = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.classObject
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'Shimmer',
  props: {
    rounded: {
      type: Boolean,
      default: false
    },
    centered: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classObject: function classObject() {
      return {
        'shimmer': true,
        'shimmer-is-rounded': this.rounded,
        'shimmer-is-centered': this.centered,
        'shimmer-is-animated': this.animated
      };
    }
  }
};

var ShimmerHeading = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.className
    }, [_vm.img ? _c('div', {
      class: _vm.className + "-img"
    }) : _vm._e(), _vm._v(" "), _c('div', {
      class: _vm.className + "-content"
    }, [_c('div', {
      class: _vm.className + "-title"
    }), _vm._v(" "), _c('div', {
      class: _vm.className + "-subtitle"
    })])]);
  },
  staticRenderFns: [],
  name: 'ShimmerHeading',
  props: {
    img: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      className: 'shimmer-heading'
    };
  }
};

var ShimmerImg = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.className
    });
  },
  staticRenderFns: [],
  name: 'ShimmerImg',
  data: function data() {
    return {
      className: 'shimmer-img'
    };
  }
};

var ShimmerText = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.className
    }, _vm._l(_vm.lines, function (n) {
      return _c('div', {
        key: n,
        class: _vm.className + "-line"
      });
    }), 0);
  },
  staticRenderFns: [],
  name: 'ShimmerText',
  props: {
    lines: {
      type: Number,
      default: 4
    }
  },
  data: function data() {
    return {
      className: 'shimmer-text'
    };
  }
};

var SideBar = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "sidebar",
      class: [_vm.compact ? 'sidebar-compact' : '', _vm.primary ? 'sidebar-primary' : '']
    }, [_c('div', {
      staticClass: "sidebar-top"
    }, [_vm._t("sidebarTop")], 2), _vm._v(" "), _c('div', {
      staticClass: "sidebar-navigation"
    }, _vm._l(_vm.menu, function (item, index) {
      return _c('div', {
        key: index,
        staticClass: "menu-section"
      }, [item.menuTitle ? _c('h6', {
        staticClass: "menu-title"
      }, [_vm._v(_vm._s(item.menuTitle))]) : _vm._e(), _vm._v(" "), _c('ul', {
        staticClass: "menu"
      }, _vm._l(item.menuItems, function (route, key) {
        return _c('li', {
          key: key,
          class: {
            'has-dropdown': route.subItems && route.subItems.length > 0
          }
        }, [!route.subItems ? _c('router-link', {
          attrs: {
            "to": route.path,
            "active-class": "active"
          },
          nativeOn: {
            "click": function click($event) {
              return _vm.toggleSidebar($event);
            }
          }
        }, [route.icon ? _c('i', {
          staticClass: "material-icons"
        }, [_vm._v(_vm._s(route.icon))]) : _vm._e(), _vm._v(" "), _c('span', {
          domProps: {
            "textContent": _vm._s(route.name)
          }
        })]) : _c('a', {
          on: {
            "click": function click($event) {
              return _vm.expandNav(route);
            }
          }
        }, [route.icon ? _c('i', {
          staticClass: "material-icons"
        }, [_vm._v(_vm._s(route.icon))]) : _vm._e(), _vm._v(" "), _c('span', {
          domProps: {
            "textContent": _vm._s(route.name)
          }
        }), _vm._v(" "), route.subItems && route.subItems.length > 0 ? _c('i', {
          staticClass: "material-icons toggle-sub-nav"
        }, [_vm._v("keyboard_arrow_down")]) : _vm._e()]), _vm._v(" "), route.subItems && route.expanded ? _c('ul', {
          staticClass: "sub-nav",
          class: {
            open: route.expanded
          }
        }, [_c('li', _vm._l(route.subItems, function (subRoute, subKey) {
          return _c('router-link', {
            key: subKey,
            attrs: {
              "to": subRoute.path,
              "active-class": "active"
            },
            nativeOn: {
              "click": function click($event) {
                return _vm.toggleSidebar($event);
              }
            }
          }, [_c('span', {
            domProps: {
              "textContent": _vm._s(subRoute.name)
            }
          })]);
        }), 1)]) : _vm._e()], 1);
      }), 0)]);
    }), 0), _vm._v(" "), _c('div', {
      staticClass: "sidebar-bottom"
    }, [_vm._t("sidebarBottom")], 2)]);
  },
  staticRenderFns: [],
  name: 'SideBar',
  props: {
    compact: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    },
    menu: {
      type: Array,
      required: true
    }
  },
  methods: {
    expandNav: function expandNav(route) {
      route.expanded = !route.expanded;
    },
    toggleSidebar: function toggleSidebar() {
      this.$parent.$emit('toggle-sidebar');
    }
  },
  created: function created() {
    var err = '';

    if (!this.$store || !this.$store.state.sideBarModule) {
      err = 'No sideBarModule found as part of the Vuex store. Kindly register a store with a sideBarModule';
    }

    if (err) {
      throw new Error(err);
    }
  }
};

var Stepper = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "stepper"
    }, _vm._l(_vm.steps, function (step, key) {
      return _c('div', {
        key: key,
        staticClass: "stepper-item",
        class: {
          'completed': step.index < _vm.currentStep,
          'current': step.index == _vm.currentStep
        }
      }, [_c('div', {
        staticClass: "stepper-item-bar"
      }, [_c('div', {
        staticClass: "stepper-item-bar-number"
      }, [_vm._v(_vm._s(step.index))])]), _vm._v(" "), _c('span', {
        staticClass: "stepper-item-name"
      }, [_vm._v(_vm._s(step.name))])]);
    }), 0);
  },
  staticRenderFns: [],
  name: 'Stepper',
  props: {
    steps: {
      type: Array,
      required: true
    },
    current: {
      type: Number
    }
  },
  computed: {
    currentStep: function currentStep() {
      if (this.current) return this.current;else return this.steps[0].index;
    }
  }
};

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

var Table = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "table-wrapper"
    }, [_vm.options ? _c('div', {
      staticClass: "table-options"
    }, [_c('a', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.options.export,
        expression: "options.export"
      }],
      on: {
        "click": _vm.exportData
      }
    }, [_vm._v("\n            Export\n        ")]), _vm._v(" "), _c('a', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.options.arrange,
        expression: "options.arrange"
      }],
      on: {
        "click": _vm.arrangeColumns
      }
    }, [_vm._v("\n            Arrange\n        ")]), _vm._v(" "), _c('a', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.options.reset,
        expression: "options.reset"
      }],
      on: {
        "click": _vm.resetTable
      }
    }, [_vm._v("\n            Reset\n        ")])]) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "table-responsive"
    }, [_vm.clonedHeadings ? _c('table', {
      class: [_vm.tableClass],
      style: {
        'border-spacing': '0px ' + (_vm.$attrs.hasOwnProperty('spacing') ? _vm.$attrs.spacing + 'px' : '0px'),
        'border-collapse': 'separate',
        'min-width': _vm.minWidth + 'px'
      }
    }, [_c('thead', {
      class: [_vm.theadClass]
    }, [_c('tr', [_vm._l(_vm.clonedHeadings, function (header, hKey) {
      return _c('th', {
        key: hKey,
        class: [_vm.theadThClass, typeof header.class == 'string' ? header.class : '']
      }, [_vm.$scopedSlots[header.key + '(head)'] ? _c('span', [_vm._t(header.key + '(head)')], 2) : _c('div', [_vm._v("\n                            " + _vm._s(header.label || header.key || '') + "\n                            "), _vm.sortBy[header.key] ? _c('span', {
        staticClass: "sort"
      }, [_c('i', {
        staticClass: "material-icons",
        class: {
          active: _vm.currentSort && _vm.currentSort.name === header.key && _vm.currentSort.value === 'asc'
        },
        on: {
          "click": function click($event) {
            return _vm.changeSort(header.key, 'asc');
          }
        }
      }, [_vm._v("arrow_drop_up")]), _vm._v(" "), _c('i', {
        staticClass: "material-icons",
        class: {
          active: _vm.currentSort && _vm.currentSort.name === header.key && _vm.currentSort.value === 'desc'
        },
        on: {
          "click": function click($event) {
            return _vm.changeSort(header.key, 'desc');
          }
        }
      }, [_vm._v("arrow_drop_down")])]) : _vm._e()])]);
    }), _vm._v(" "), _vm.isExpandable ? _c('th') : _vm._e()], 2), _vm._v(" "), _c('tr', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.isLoading,
        expression: "isLoading"
      }],
      staticClass: "linear-activity"
    }, [_c('td', {
      staticClass: "indeterminate",
      attrs: {
        "colspan": _vm.isExpandable ? _vm.clonedHeadings.length + 1 : _vm.clonedHeadings.length
      }
    })])]), _vm._v(" "), _vm.clonedItems.length ? _c('tbody', [_vm._l(_vm.clonedItems, function (row, key) {
      return [_c('tr', {
        key: key,
        class: _vm.tbodyTrClass,
        on: {
          "click": function click($event) {
            return _vm.actionWrapper(row);
          }
        }
      }, [_vm._l(_vm.clonedHeadings, function (header, hKey) {
        return _c('td', {
          key: hKey,
          class: _vm.setTdClasses(header, row)
        }, [_vm.$scopedSlots[header.key] ? _c('span', [_vm._t(header.key, null, {
          "value": row
        })], 2) : _c('span', [_vm._v("\n                                " + _vm._s(header.formatter ? header.formatter(row[header.key]) : row[header.key]) + "\n                            ")])]);
      }), _vm._v(" "), _vm.isExpandable ? _c('td', {
        staticClass: "text-right",
        class: _vm.setTdClasses('', row)
      }, [_c('div', {
        staticClass: "row-expand-btn"
      }, [_c('span', {
        staticClass: "material-icons",
        class: [row.$expanded ? 'expanded' : ''],
        on: {
          "click": function click($event) {
            return _vm.expand(row, key);
          }
        }
      }, [_vm._v("expand_more")])])]) : _vm._e()], 2), _vm._v(" "), row.$expanded ? _c('tr', {
        key: key + '-expanded'
      }, [_c('td', {
        attrs: {
          "colspan": _vm.clonedHeadings.length + 1
        }
      }, [_vm._t("expanded-area", null, {
        "data": {
          row: row,
          key: key
        }
      })], 2)]) : _vm._e()];
    }), _vm._v(" "), _vm.isLoading ? _c('tr', {
      staticClass: "overlay"
    }) : _vm._e()], 2) : _vm.$slots.empty ? _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.isLoading,
        expression: "!isLoading"
      }]
    }, [_vm._t("empty")], 2) : _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.isLoading,
        expression: "!isLoading"
      }],
      staticClass: "empty"
    }, [_c('p', [_vm._v("There are currently no items to show.")])])]) : _vm._e()]), _vm._v(" "), _vm.pagination ? _c('div', {
      staticClass: "pagination"
    }, [_c('p', [_vm._v("\n            Showing " + _vm._s((_vm.pagination.currentPage - 1) * _vm.pagination.perPage + 1) + " - " + _vm._s(Math.min.apply(Math, [_vm.pagination.currentPage * _vm.pagination.perPage, _vm.pagination.totalItems])) + " of\n            " + _vm._s(_vm.pagination.totalItems) + " results.\n        ")]), _vm._v(" "), _c('ul', [_vm.pagination.currentPage !== 1 && _vm.pagination.showJumpToFirst ? _c('li', {
      on: {
        "click": function click($event) {
          return _vm.changePage(1);
        }
      }
    }, [_c('span', [_vm._v(_vm._s('<<'))])]) : _vm._e(), _vm._v(" "), _vm.pagination.currentPage !== 1 ? _c('li', {
      on: {
        "click": function click($event) {
          return _vm.changePage(--_vm.pagination.currentPage);
        }
      }
    }, [_c('span', [_vm._v(_vm._s('<'))])]) : _vm._e(), _vm._v(" "), _vm._l(_vm.totalPages, function (val, key) {
      return _c('li', {
        key: key,
        class: {
          active: _vm.pagination.currentPage === val
        },
        on: {
          "click": function click($event) {
            return _vm.changePage(val);
          }
        }
      }, [_c('span', [_vm._v(_vm._s(val))])]);
    }), _vm._v(" "), _vm.clonedItems.length === _vm.pagination.perPage ? _c('li', {
      on: {
        "click": function click($event) {
          return _vm.changePage(++_vm.pagination.currentPage);
        }
      }
    }, [_c('span', [_vm._v(_vm._s('>'))])]) : _vm._e(), _vm._v(" "), _vm.clonedItems.length === _vm.pagination.perPage ? _c('li', {
      on: {
        "click": function click($event) {
          _vm.changePage(Math.ceil(_vm.pagination.totalItems / _vm.pagination.perPage));
        }
      }
    }, [_c('span', [_vm._v(_vm._s('>>'))])]) : _vm._e()], 2)]) : _vm._e(), _vm._v(" "), _vm.isArrange ? _c('div', {
      staticClass: "arrange"
    }, [_c('div', {
      staticClass: "arrange__overlay"
    }), _vm._v(" "), _c('div', {
      staticClass: "arrange__box"
    }, [_c('h6', {
      staticClass: "arrange__box__title"
    }, [_vm._v("Arrange Columns")]), _vm._v(" "), _c('div', {
      staticClass: "arrange__box__body"
    }, [_vm._l(_vm.tempHeadings, function (prop, key) {
      return _c('div', {
        key: key,
        staticClass: "arrange__box__body__option"
      }, [_c('div', {
        staticClass: "arrange__box__body__option__name"
      }, [_vm._v(_vm._s(prop.label || prop.key))]), _vm._v(" "), _c('div', {
        staticClass: "arrange__box__body__option__value"
      }, [_c('label', {
        staticClass: "checkbox",
        attrs: {
          "for": prop.key
        }
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: prop.selected,
          expression: "prop.selected"
        }],
        attrs: {
          "id": prop.key,
          "type": "checkbox"
        },
        domProps: {
          "checked": Array.isArray(prop.selected) ? _vm._i(prop.selected, null) > -1 : prop.selected
        },
        on: {
          "change": function change($event) {
            var $$a = prop.selected,
                $$el = $event.target,
                $$c = $$el.checked ? true : false;

            if (Array.isArray($$a)) {
              var $$v = null,
                  $$i = _vm._i($$a, $$v);

              if ($$el.checked) {
                $$i < 0 && _vm.$set(prop, "selected", $$a.concat([$$v]));
              } else {
                $$i > -1 && _vm.$set(prop, "selected", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
              }
            } else {
              _vm.$set(prop, "selected", $$c);
            }
          }
        }
      }), _vm._v(" "), _c('span', {
        staticClass: "checkmark"
      })])])]);
    }), _vm._v(" "), _c('div', {
      staticClass: "text-center"
    }, [_c('Button', {
      attrs: {
        "type": "success",
        "size": "sm",
        "action": _vm.saveColumns,
        "text": "Save"
      }
    })], 1)], 2)])]) : _vm._e()]);
  },
  staticRenderFns: [],
  name: 'Table',
  props: {
    filters: {},
    headings: {
      type: Array
    },
    items: {
      type: [Array, Function],
      required: true
    },
    onRowClick: {
      type: Function
    },
    pagination: {
      type: Object
    },
    sort: {
      type: Object
    },
    tableClass: {
      type: String
    },
    theadClass: {
      type: String
    },
    theadThClass: {
      type: String
    },
    tbodyTrClass: {
      type: String
    },
    tbodyTdClass: {
      type: [String, Function]
    },
    minWidth: {
      type: Number,
      default: 900
    },
    isExpandable: {
      type: Boolean
    },
    options: {
      type: Object
    }
  },
  components: {
    Button: Button
  },
  data: function data() {
    return {
      clonedItems: [],
      sortedItems: [],
      clonedHeadings: this.headings || [],
      tempHeadings: this.headings.map(function (heading) {
        return _objectSpread2({}, heading, {
          selected: true
        });
      }) || [],
      sortBy: {},
      currentSort: this.sort,
      isAPI: true,
      isArrange: false,
      isLoading: false
    };
  },
  methods: {
    actionWrapper: function actionWrapper(row) {
      if (this.onRowClick) this.onRowClick(row);else return false;
    },
    arrangeColumns: function arrangeColumns() {
      this.isArrange = true;
    },
    callAPI: function callAPI() {
      var _this = this;

      this.isLoading = true;
      this.$nextTick( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var obj;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                obj = {
                  pagination: _this.pagination,
                  sort: _this.currentSort,
                  filters: _this.filters
                };
                _context.prev = 1;
                _context.next = 4;
                return _this.items(obj);

              case 4:
                _this.clonedItems = _context.sent;
                _this.isLoading = false;
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                _this.isLoading = false;

              case 11:
                _this.isLoading = false;

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      })));
    },
    changePage: function changePage(index) {
      var pagination = this.pagination;

      if (this.isAPI) {
        this.callAPI();
      } else {
        this.clonedItems = this.sortedItems.slice((index - 1) * this.pagination.perPage, index * this.pagination.perPage);
        pagination.totalItems = this.sortedItems.length;
      }

      pagination.currentPage = index;
      this.$emit('update:pagination', pagination);
    },
    changeSort: function changeSort(key, type) {
      this.currentSort = {
        name: key,
        value: type
      };

      if (this.isAPI) {
        this.callAPI();
      } else {
        var items = _toConsumableArray(this.items.map(function (item) {
          return _objectSpread2({}, item);
        }));

        this.sortedItems = items.sort(function (a, b) {
          if (type === 'asc') {
            return a[key] > b[key] ? 1 : -1;
          } else if (type === 'desc') return b[key] > a[key] ? 1 : -1;

          return 0;
        });
        if (this.pagination) this.changePage(this.pagination.currentPage);else this.clonedItems = this.sortedItems;
      }
    },
    exportData: function exportData() {
      var _this2 = this;

      var csvContent = 'data:text/csv;charset=utf-8,';
      var includedColumns = [];
      csvContent += this.clonedHeadings.map(function (head) {
        includedColumns.push(head.key);
        return head.label || head.key;
      });
      csvContent += '\r\n';
      this.sortedItems.map(function (item) {
        includedColumns.map(function (key) {
          if (_typeof(item[key]) === 'object') {
            csvContent += _this2.processObject(item[key]) + ',';
          } else if (item[key] instanceof Date) {
            csvContent += item[key].toLocaleString();
          } else if (key !== '_id') {
            csvContent += item[key] + ',';
          }
        });
        csvContent += '\r\n';
      });
      var encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
    },
    processObject: function processObject(obj) {
      var str = '';

      for (var key in obj) {
        if (_typeof(obj[key]) === 'object') {
          str += this.processObject(obj[key]);
        } else if (obj[key] instanceof Date) {
          str += obj[key].toLocaleString() + ';';
        } else if (key !== '_id') {
          str += key + ': ' + obj[key] + ';';
        }
      }

      return str;
    },
    resetTable: function resetTable() {
      this.clonedHeadings = this.headings;
    },
    saveColumns: function saveColumns() {
      this.clonedHeadings = this.tempHeadings.filter(function (heading) {
        return heading.selected;
      });
      this.isArrange = false;
    },
    setTdClasses: function setTdClasses(header, row) {
      var classes = [];

      if (header.class && typeof header.class === 'function') {
        classes.push(header.class(row));
      } else {
        classes.push(header.class);
      }

      if (typeof this.tbodyTdClass === 'function') {
        classes.push(this.tbodyTdClass(header, row));
      } else {
        classes.push(this.tbodyTdClass);
      }

      if (this.onRowClick) {
        classes.push('pointer');
      }

      return classes;
    },
    validateAllProps: function validateAllProps() {
      var err;

      if (!Array.isArray(this.items) && !this.pagination) {
        err = 'items must be a function when using it with the pagination or pagination object must be present when items is a function';
      }

      return err;
    },
    expand: function expand(row, key) {
      this.$set(row, '$expanded', !row.$expanded);
      this.$emit('expanded', {
        row: row,
        key: key
      });
    }
  },
  computed: {
    totalPages: function totalPages() {
      var threshold = this.pagination.threshold ? Math.ceil(this.pagination.threshold) : 2;
      var total = Math.ceil(this.pagination.totalItems / this.pagination.perPage);
      var pages = new Set();
      var counter = this.pagination.currentPage;

      while (counter >= 1 && this.pagination.currentPage - counter <= threshold / 2) {
        pages.add(counter);
        counter--;
      }

      counter = this.pagination.currentPage;

      while (counter <= total && counter - this.pagination.currentPage <= threshold / 2) {
        pages.add(counter);
        counter++;
      }

      return Array.from(pages).sort();
    }
  },
  watch: {
    filters: {
      handler: function handler() {
        this.pagination.currentPage = 1;
        this.callAPI();
      },
      deep: true
    },
    items: {
      handler: function handler(newValue) {
        if (!this.isAPI) {
          this.sortedItems = newValue;
          if (this.pagination) this.changePage(1);
        }
      },
      deep: true
    }
  },
  created: function created() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var err, key;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // Initialise the sorts
              err = _this3.validateAllProps();

              if (err) {
                console.error(err);
              }

              for (key in _this3.clonedHeadings) {
                if (_this3.clonedHeadings[key].sortable) {
                  _this3.sortBy[_this3.clonedHeadings[key].key] = true;
                }
              }

              if (Array.isArray(_this3.items)) {
                _this3.isAPI = false;
                if (_this3.pagination) _this3.pagination.totalItems = _this3.items.length;
              }

              if (_this3.sort && _this3.sort.name) {
                _this3.changeSort(_this3.sort.name, _this3.sort.value);
              } else {
                if (!_this3.isAPI) {
                  _this3.sortedItems = _toConsumableArray(_this3.items.map(function (item) {
                    return _objectSpread2({}, item);
                  }));

                  if (_this3.pagination) {
                    _this3.clonedItems = _this3.sortedItems.slice((_this3.pagination.currentPage - 1) * _this3.pagination.perPage, _this3.pagination.perPage);
                  } else {
                    _this3.clonedItems = _this3.sortedItems;
                  }
                } else {
                  _this3.callAPI();
                }
              }

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};

var Tabs = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "tabs-wrapper"
    }, [_c('ul', {
      staticClass: "tabs",
      class: [_vm.type, _vm.fill ? 'tabs-fill' : '', _vm.align ? 'tabs-' + _vm.align : '', _vm.stacked ? 'tabs-stacked' : '', _vm.wrap ? 'tabs-wrap' : ''],
      attrs: {
        "id": 'tabs-' + _vm.id
      }
    }, [_vm._l(_vm.displayedTabs, function (tab, key) {
      return _c('li', {
        key: key
      }, [tab.path ? _c('router-link', {
        attrs: {
          "tag": "a",
          "to": tab.path,
          "active-class": "active"
        }
      }, [_c('span', [_vm._v(_vm._s(tab.name))])]) : _c('a', {
        class: {
          active: _vm.active === key,
          disabled: tab.disabled
        },
        on: {
          "click": function click($event) {
            return _vm.selectTab(tab, key);
          }
        }
      }, [_c('span', [_vm._v(_vm._s(tab.name))])])], 1);
    }), _vm._v(" "), _vm.limit && _vm.data.length - _vm.displayedTabs.length > 0 ? _c('li', {
      staticClass: "has-dropdown",
      attrs: {
        "id": "more-nav-selector"
      }
    }, [_vm._m(0), _vm._v(" "), _c('ul', {
      staticClass: "sub-nav",
      attrs: {
        "id": "more-nav"
      }
    }, _vm._l(_vm.data.slice(_vm.limit), function (tab, subKey) {
      return _c('li', {
        key: subKey + _vm.displayedTabs.length
      }, [tab.path ? _c('router-link', {
        attrs: {
          "tag": "a",
          "to": tab.path
        }
      }, [_vm._v(_vm._s(tab.name))]) : _c('a', {
        class: {
          disabled: tab.disabled
        },
        on: {
          "click": function click($event) {
            return _vm.selectTab(tab, subKey + _vm.displayedTabs.length);
          }
        }
      }, [_vm._v(_vm._s(tab.name))])], 1);
    }), 0)]) : _vm._e()], 2)]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('a', [_vm._v("\n                More\n                "), _c('div', {
      staticClass: "arrow-down"
    })]);
  }],
  name: 'Tabs',
  props: {
    active: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'simple'
    },
    limit: {
      type: Number,
      default: 0
    },
    fill: {
      type: Boolean,
      default: false
    },
    align: {
      type: String
    },
    stacked: {
      type: Boolean,
      default: false
    },
    wrap: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      id: null
    };
  },
  methods: {
    selectTab: function selectTab(tab, index) {
      if (tab.disabled) return false;
      this.$emit('update:active', index);
      this.$emit('changed', index);
    }
  },
  computed: {
    displayedTabs: function displayedTabs() {
      if (this.limit && !this.stacked) {
        return this.data.slice(0, this.limit);
      }

      return this.data;
    }
  },
  mounted: function mounted() {
    var tabsId = '#tabs-' + this.id;
    var moreSelector = $(tabsId + ' #more-nav-selector');

    if (moreSelector.length != 0) {
      var position = $(moreSelector).position();
      if ($(tabsId).width() < position.left) window.$(tabsId + ' #more-nav').css({
        'left': 'unset',
        'right': 0
      });else window.$(tabsId + ' #more-nav').css({
        'left': position.left,
        'right': 'unset'
      });
    }
  },
  created: function created() {
    this.id = this._uid;
  }
};

var Timepicker = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "timepicker-wrapper"
    }, [_c('div', {
      staticClass: "form-group"
    }, [_c('table', [_c('tbody', [_c('tr', [_vm._m(0), _vm._v(" "), _c('td'), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showSeconds,
        expression: "showSeconds"
      }]
    }), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showSeconds,
        expression: "showSeconds"
      }]
    }, [_c('label', {
      staticClass: "control-label"
    }, [_vm._v("Secs")])]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showMeridian,
        expression: "showMeridian"
      }]
    })]), _vm._v(" "), _c('tr', [_c('td', {
      staticClass: "form-element"
    }, [_c('input', {
      ref: "hours",
      staticClass: "form-control",
      attrs: {
        "type": "number",
        "min": _vm.showMeridian ? 1 : 0,
        "max": _vm.showMeridian ? 12 : 23
      },
      domProps: {
        "value": _vm.strHours
      },
      on: {
        "input": function input($event) {
          return _vm.handleHours($event.target.value);
        },
        "keyup": [function ($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])) {
            return null;
          }

          return _vm.incrementHours($event);
        }, function ($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) {
            return null;
          }

          return _vm.decrementHours($event);
        }]
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "timepicker-arrows"
    }, [_c('a', {
      on: {
        "click": _vm.incrementHours
      }
    }, [_c('i', {
      staticClass: "material-icons"
    }, [_vm._v("keyboard_arrow_up")])]), _c('a', {
      on: {
        "click": _vm.decrementHours
      }
    }, [_c('i', {
      staticClass: "material-icons"
    }, [_vm._v("keyboard_arrow_down")])])])]), _vm._v(" "), _vm._m(2), _vm._v(" "), _c('td', {
      staticClass: "form-element"
    }, [_c('input', {
      ref: "minutes",
      staticClass: "form-control",
      attrs: {
        "type": "number",
        "min": "0",
        "max": "59"
      },
      domProps: {
        "value": _vm.strMinutes
      },
      on: {
        "input": function input($event) {
          return _vm.handleMinutes($event.target.value);
        },
        "keyup": [function ($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])) {
            return null;
          }

          return _vm.incrementMinutes($event);
        }, function ($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) {
            return null;
          }

          return _vm.decrementMinutes($event);
        }]
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "timepicker-arrows"
    }, [_c('a', {
      on: {
        "click": _vm.incrementMinutes
      }
    }, [_c('i', {
      staticClass: "material-icons"
    }, [_vm._v("keyboard_arrow_up")])]), _c('a', {
      on: {
        "click": _vm.decrementMinutes
      }
    }, [_c('i', {
      staticClass: "material-icons"
    }, [_vm._v("keyboard_arrow_down")])])])]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showSeconds,
        expression: "showSeconds"
      }]
    }, [_c('span', {
      staticClass: "timepicker-delimiter"
    }, [_vm._v(":")])]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showSeconds,
        expression: "showSeconds"
      }],
      staticClass: "form-element"
    }, [_c('input', {
      ref: "seconds",
      staticClass: "form-control",
      attrs: {
        "type": "number",
        "min": "0",
        "max": "59"
      },
      domProps: {
        "value": _vm.strSeconds
      },
      on: {
        "input": function input($event) {
          return _vm.handleSeconds($event.target.value);
        },
        "keyup": [function ($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])) {
            return null;
          }

          return _vm.incrementSeconds($event);
        }, function ($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) {
            return null;
          }

          return _vm.decrementSeconds($event);
        }]
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "timepicker-arrows"
    }, [_c('a', {
      on: {
        "click": _vm.incrementSeconds
      }
    }, [_c('i', {
      staticClass: "material-icons"
    }, [_vm._v("keyboard_arrow_up")])]), _c('a', {
      on: {
        "click": _vm.decrementSeconds
      }
    }, [_c('i', {
      staticClass: "material-icons"
    }, [_vm._v("keyboard_arrow_down")])])])]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showMeridian,
        expression: "showMeridian"
      }]
    }, [_c('div', {
      staticClass: "timepicker-meridian"
    }, [_c('a', {
      class: {
        active: _vm.meridian == 'AM'
      },
      on: {
        "click": _vm.toggleMeridian
      }
    }, [_vm._v("AM")]), _c('a', {
      class: {
        active: _vm.meridian == 'PM'
      },
      on: {
        "click": _vm.toggleMeridian
      }
    }, [_vm._v("PM")])])])])])])])]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('td', [_c('label', {
      staticClass: "control-label"
    }, [_vm._v("Hrs")])]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('td', [_c('label', {
      staticClass: "control-label"
    }, [_vm._v("Mins")])]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('td', [_c('span', {
      staticClass: "timepicker-delimiter"
    }, [_vm._v(":")])]);
  }],
  name: 'Timepicker',
  props: {
    value: {},
    hourStep: {
      type: Number,
      default: 1
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    secondStep: {
      type: Number,
      default: 1
    },
    showMeridian: {
      type: Boolean,
      default: true
    },
    showSeconds: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      hours: this.value.getHours(),
      minutes: this.value.getMinutes(),
      seconds: this.value.getSeconds(),
      strHours: '',
      strMinutes: '',
      strSeconds: '',
      meridian: 'AM'
    };
  },
  methods: {
    emitValue: function emitValue(type) {
      var clonedValue = this.value;

      if (type === 'hr') {
        var hours = this.hours;

        if (this.showMeridian) {
          if (this.meridian === 'PM' && this.hours < 12) hours += 12;else if (this.meridian === 'AM' && this.hours == 12) hours = 0;
        }

        clonedValue.setHours(hours);
      } else if (type === 'min') clonedValue.setMinutes(this.minutes);else clonedValue.setSeconds(this.seconds);

      this.$emit('update:value', clonedValue);
      this.$emit('changed', clonedValue);
    },
    handleHours: function handleHours(val, type) {
      var min = this.showMeridian ? 1 : 0,
          max = this.showMeridian ? 12 : 23;
      var h = parseInt(val);
      if (Number.isNaN(h)) return;
      if (type === 'inc') h = h + this.hourStep;else if (type === 'dec') h = h - this.hourStep;

      if (h > max) {
        this.hours = max;
        this.$refs.hours.value = max;
      } else if (h < min) {
        this.hours = min;
        this.$refs.hours.value = '0' + min;
      } else {
        this.hours = h;
      }

      this.strHours = this.hours > 9 ? this.hours : '0' + this.hours;
      this.emitValue('hr');
    },
    handleMinutes: function handleMinutes(val, type) {
      var min = 0,
          max = 59;
      var m = parseInt(val);
      if (Number.isNaN(m)) return;
      if (type === 'inc') m = m + this.minuteStep;else if (type === 'dec') m = m - this.minuteStep;

      if (m > max) {
        this.minutes = max;
        this.$refs.minutes.value = max;
      } else if (m < min) {
        this.minutes = min;
        this.$refs.minutes.value = '0' + min;
      } else {
        this.minutes = m;
      }

      this.strMinutes = this.minutes > 9 ? this.minutes : '0' + this.minutes;
      this.emitValue('min');
    },
    handleSeconds: function handleSeconds(val, type) {
      var min = 0,
          max = 59;
      var s = parseInt(val);
      if (Number.isNaN(s)) return;
      if (type === 'inc') s = s + this.secondStep;else if (type === 'dec') s = s - this.secondStep;

      if (s > max) {
        this.seconds = max;
        this.$refs.seconds.value = max;
      } else if (s < min) {
        this.seconds = min;
        this.$refs.seconds.value = '0' + min;
      } else {
        this.seconds = s;
      }

      this.strSeconds = this.seconds > 9 ? this.seconds : '0' + this.seconds;
      this.emitValue('sec');
    },
    incrementHours: function incrementHours() {
      this.handleHours(this.hours, 'inc');
    },
    incrementMinutes: function incrementMinutes() {
      this.handleMinutes(this.minutes, 'inc');
    },
    incrementSeconds: function incrementSeconds() {
      this.handleSeconds(this.seconds, 'inc');
    },
    decrementHours: function decrementHours() {
      this.handleHours(this.hours, 'dec');
    },
    decrementMinutes: function decrementMinutes() {
      this.handleMinutes(this.minutes, 'dec');
    },
    decrementSeconds: function decrementSeconds() {
      this.handleSeconds(this.seconds, 'dec');
    },
    toggleMeridian: function toggleMeridian() {
      if (this.showMeridian && this.meridian === 'AM') {
        this.meridian = 'PM';
        this.handleHours(this.hours);
      } else {
        this.meridian = 'AM';
        this.handleHours(this.hours);
      }
    }
  },
  created: function created() {
    if (this.showMeridian) {
      if (this.hours >= 12) {
        this.meridian = 'PM';
        if (this.hours > 12) this.hours -= 12;
      } else if (this.hours == 0) {
        this.hours = 12;
      }
    }

    this.handleHours(this.hours);
    this.handleMinutes(this.minutes);
    if (this.showSeconds) this.handleSeconds(this.seconds);
  }
};

var TopBar = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "topbar"
    }, [_vm.logo ? _c('div', {
      staticClass: "topbar-logo",
      class: _vm.logo.mobile ? 'mobile-visible' : ''
    }, [_c('img', {
      attrs: {
        "src": _vm.logo.url,
        "alt": ""
      }
    })]) : _vm._e(), _vm._v(" "), _vm.pageTitle ? _c('h3', {
      staticClass: "topbar-page-title",
      class: [_vm.pageTitle.mobile ? 'mobile-visible' : '', _vm.pageTitle.align ? 'align-' + _vm.pageTitle.align : '']
    }, [_vm._v(_vm._s(_vm.pageTitle.text))]) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "topbar-options"
    }, [_vm.searchOptions ? _c('a', {
      staticClass: "search-box",
      class: _vm.searchOptions.mobile ? 'mobile-visible' : ''
    }, [_c('input', {
      attrs: {
        "type": "text",
        "placeholder": _vm.searchOptions.placeholder,
        "readonly": _vm.searchOptions.clickAction
      },
      domProps: {
        "value": _vm.searchText
      },
      on: {
        "input": function input($event) {
          return _vm.$emit('update:search-text', $event.target.value);
        },
        "click": function click($event) {
          return _vm.handleAction(_vm.searchOptions.clickAction);
        }
      }
    })]) : _vm._e(), _vm._v(" "), _vm.topbarOptions ? _c('div', {
      staticClass: "topbar-options-wrapper"
    }, _vm._l(_vm.topbarOptions, function (option, key) {
      return _c('div', {
        key: key,
        staticClass: "topbar-option",
        class: option.mobile ? 'mobile-visible' : ''
      }, [option.type == 'icon' ? _c('Tooltip', {
        attrs: {
          "message": option.text,
          "position": "bottom"
        }
      }, [_c('a', {
        staticClass: "topbar-option-icon",
        attrs: {
          "href": option.href
        },
        on: {
          "click": function click($event) {
            return _vm.handleAction(option.clickAction);
          }
        }
      }, [option.pending ? _c('Badge', {
        attrs: {
          "size": 12,
          "overlap": "circle",
          "color": "#FC5A5A",
          "position": "top-right"
        }
      }, [_c('i', {
        staticClass: "material-icons"
      }, [_vm._v(_vm._s(option.icon))])]) : _c('i', {
        staticClass: "material-icons"
      }, [_vm._v(_vm._s(option.icon))])], 1)]) : _c('Button', {
        attrs: {
          "size": "sm",
          "type": option.btnClass,
          "text": option.text,
          "action": option.clickAction
        }
      }, [option.icon ? _c('i', {
        staticClass: "material-icons"
      }, [_vm._v(_vm._s(option.icon))]) : _vm._e()])], 1);
    }), 0) : _vm._e(), _vm._v(" "), _vm._t("default")], 2), _vm._v(" "), _vm.allAvatarOptions ? _c('AvatarInfo', _vm._b({
      scopedSlots: _vm._u([{
        key: "avatar",
        fn: function fn() {
          return [_c('Avatar', {
            attrs: {
              "text": _vm.avatarOptions.title,
              "size": _vm.avatarOptions.size,
              "variant": _vm.avatarOptions.variant,
              "gravatar-email": _vm.avatarOptions.gravatarEmail,
              "image-url": _vm.avatarOptions.imageUrl
            }
          })];
        },
        proxy: true
      }, {
        key: "avatarActions",
        fn: function fn() {
          return [_vm._t("topbarAvatarActions")];
        },
        proxy: true
      }], null, true)
    }, 'AvatarInfo', _vm.allAvatarOptions, false)) : _vm._e()], 1);
  },
  staticRenderFns: [],
  name: 'TopBar',
  props: {
    logo: {
      type: Object
    },
    pageTitle: {
      type: Object
    },
    avatarOptions: {
      type: Object
    },
    topbarOptions: {
      type: Array
    },
    searchOptions: {
      type: Object
    },
    searchText: {
      type: String
    }
  },
  components: {
    AvatarInfo: AvatarInfo,
    Avatar: Avatar,
    Tooltip: Tooltip,
    Button: Button,
    Badge: Badge
  },
  data: function data() {
    return {
      allAvatarOptions: null
    };
  },
  methods: {
    handleAction: function handleAction(fn) {
      if (fn) {
        return fn();
      } else {
        return false;
      }
    },
    onResize: function onResize() {
      this.allAvatarOptions = $.extend(true, {}, this.avatarOptions);

      if (this.avatarOptions.subtitleOptions && window.innerWidth < 991.98) {
        if (typeof this.allAvatarOptions.avatarActions !== 'undefined' && this.allAvatarOptions.avatarActions.length > 0) {
          this.allAvatarOptions.avatarActions.push({
            name: this.avatarOptions.subtitle,
            href: this.avatarOptions.subtitleOptions.href,
            clickAction: this.avatarOptions.subtitleOptions.clickAction
          });
        } else {
          this.allAvatarOptions.avatarActions = [{
            name: this.avatarOptions.subtitle,
            href: this.avatarOptions.subtitleOptions.href,
            clickAction: this.avatarOptions.subtitleOptions.clickAction
          }];
        }
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      window.addEventListener('resize', _this.onResize);
    });
  },
  created: function created() {
    this.onResize();
  }
};

var TabBar = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('div', {
      staticClass: "tabbar"
    }, [_c('div', {
      attrs: {
        "id": "navigation"
      }
    }, [_c('ul', {
      staticClass: "menu"
    }, [_vm._l(_vm.menu, function (route, key) {
      return _c('li', {
        key: key,
        on: {
          "click": function click($event) {
            return _vm.toggleOffscreenMenu(false);
          }
        }
      }, [!route.subItems ? _c('router-link', {
        attrs: {
          "to": route.path,
          "active-class": "active"
        }
      }, [_c('div', {
        staticClass: "menu-item"
      }, [route.badgeOptions ? _c('Badge', _vm._b({}, 'Badge', route.badgeOptions, false), [_c('i', {
        staticClass: "material-icons"
      }, [_vm._v(_vm._s(route.icon))])]) : _c('i', {
        staticClass: "material-icons"
      }, [_vm._v(_vm._s(route.icon))]), _vm._v(" "), _c('span', {
        domProps: {
          "textContent": _vm._s(route.name)
        }
      })], 1)]) : _vm._e()], 1);
    }), _vm._v(" "), _vm.offscreenMenu.length > 0 ? _c('li', [_c('a', {
      on: {
        "click": function click($event) {
          return _vm.toggleOffscreenMenu(true);
        }
      }
    }, [_vm._m(0)])]) : _vm._e()], 2)])]), _vm._v(" "), _vm.showOffscreenMenu ? _c('div', {
      staticClass: "offscreen-navigation"
    }, [_c('ul', {
      staticClass: "offscreen-menu"
    }, _vm._l(_vm.offscreenMenu, function (route, key) {
      return _c('li', {
        key: key,
        on: {
          "click": function click($event) {
            return _vm.toggleOffscreenMenu(false);
          }
        }
      }, [!route.subItems ? _c('router-link', {
        attrs: {
          "to": route.path,
          "active-class": "active"
        }
      }, [_c('div', {
        staticClass: "menu-item"
      }, [_c('i', {
        staticClass: "material-icons icon-left"
      }, [_vm._v(_vm._s(route.icon))]), _vm._v(" "), _c('p', [route.badgeOptions ? _c('Badge', _vm._b({}, 'Badge', route.badgeOptions, false), [_c('span', {
        domProps: {
          "textContent": _vm._s(route.name)
        }
      })]) : _c('span', {
        domProps: {
          "textContent": _vm._s(route.name)
        }
      }), _vm._v(" "), _c('i', {
        staticClass: "material-icons icon-right"
      }, [_vm._v("arrow_forward_ios")])], 1)])]) : _vm._e()], 1);
    }), 0)]) : _vm._e()]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "menu-item"
    }, [_c('i', {
      staticClass: "material-icons"
    }, [_vm._v("more_horiz")]), _vm._v(" "), _c('span', [_vm._v("More")])]);
  }],
  name: 'TabBar',
  props: {
    menu: {
      type: Array,
      required: true
    },
    limit: {
      type: Number,
      default: 3
    }
  },
  components: {
    Badge: Badge
  },
  data: function data() {
    return {
      offscreenMenu: [],
      showOffscreenMenu: false
    };
  },
  methods: {
    toggleOffscreenMenu: function toggleOffscreenMenu(toggle) {
      this.showOffscreenMenu = toggle;
    }
  },
  mounted: function mounted() {
    if (this.menu.length > this.limit) {
      this.offscreenMenu = this.menu.splice(this.limit, this.menu.length - this.limit);
    }
  }
};

var Modal = {
  name: 'Modal',
  props: {
    size: {
      type: String
    },
    show: {
      type: Boolean
    },
    hideFooter: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'show',
    event: 'cancel'
  },
  render: function render(h) {
    if (this.show) {
      return h('transition', {
        attrs: {
          name: 'modal',
          appear: true
        }
      }, [h('div', {
        staticClass: 'modal-mask'
      }, [h('div', {
        staticClass: 'modal-wrapper',
        class: 'modal-' + this.size
      }, [this.setupModal(h)])])]);
    }
  },
  methods: {
    cancel: function cancel() {
      this.$emit('cancel', false);
    },
    save: function save() {
      this.$emit('save');
    },
    setupModal: function setupModal(h) {
      return h('div', {
        class: 'modal-container'
      }, [this.setupHeader(h), this.setupBody(h), this.setupFooter(h)]);
    },
    setupHeader: function setupHeader(h) {
      if (this.$slots.header) {
        return h('div', {
          class: 'modal-header'
        }, this.$slots.header);
      } else if (this.$slots.title) {
        return h('div', {
          class: 'modal-header'
        }, [this.setupHeaderTitle(h, this.$slots.title), this.setupHeaderCloseButton(h)]);
      } else {
        return h('div', {
          class: 'modal-header'
        }, [this.setupHeaderTitle(h), this.setupHeaderCloseButton(h)]);
      }
    },
    setupHeaderTitle: function setupHeaderTitle(h, slot) {
      return h('h4', {}, slot);
    },
    setupHeaderCloseButton: function setupHeaderCloseButton(h) {
      return h('a', {
        class: 'modal-close',
        on: {
          click: this.cancel
        }
      });
    },
    setupBody: function setupBody(h) {
      return h('div', {
        class: 'modal-body'
      }, this.$slots.body);
    },

    /*
     * Footer should be visible with default buttons if slot not provided
     */
    setupFooter: function setupFooter(h) {
      if (this.$slots.footer) {
        return h('div', {
          class: 'modal-footer'
        }, this.$slots.footer);
      } else if (!this.hideFooter) {
        return h('div', {
          class: 'modal-footer'
        }, [this.setupFooterButtons(h)]);
      }
    },
    setupFooterButtons: function setupFooterButtons(h) {
      return [h(Button, {
        props: {
          type: 'border-primary',
          action: this.cancel,
          text: 'Cancel'
        }
      }), h(Button, {
        props: {
          type: 'primary',
          action: this.save,
          text: 'OK'
        }
      })];
    }
  },
  mounted: function mounted() {
    this.$root.$el.append(this.$el);
  },
  destroyed: function destroyed() {
    this.$el.parentNode.removeChild(this.$el);
  }
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$3 = "input[type='file'] {\n  display: none; }\n\n.custom-file-upload {\n  display: inline-block; }\n  .custom-file-upload .btn {\n    margin-right: 0.5rem; }\n\n.upload-actions .btn:first-of-type {\n  margin-right: 1rem;\n  margin-bottom: 1rem; }\n";
styleInject(css_248z$3);

var ImageSelector = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('Modal', {
      attrs: {
        "size": _vm.size,
        "hide-footer": "",
        "primary": _vm.$attrs.primary
      },
      on: {
        "cancel": _vm.cancel
      },
      scopedSlots: _vm._u([{
        key: "title",
        fn: function fn() {
          return [_vm._v("\n        Select & Crop Image\n    ")];
        },
        proxy: true
      }, {
        key: "body",
        fn: function fn() {
          return [_c('p', [_vm._v("Please choose an image and crop the section you would like to upload.")]), _vm._v(" "), _c('div', {
            staticClass: "mt16"
          }, [_c('h5', [_vm._v("1. Choose File")]), _vm._v(" "), _c('input', {
            ref: "fileUpload",
            attrs: {
              "type": "file",
              "accept": "image/*",
              "id": "file-upload"
            },
            on: {
              "change": _vm.fileUploaded
            }
          }), _vm._v(" "), _c('label', {
            staticClass: "custom-file-upload",
            attrs: {
              "for": "file-upload"
            }
          }, [_c('span', {
            staticClass: "btn btn-sm btn-primary"
          }, [_vm._v("Choose file")]), _c('span', [_vm._v(_vm._s(_vm.upload.chosen ? _vm.upload.chosen.name : 'No file chosen'))])])]), _vm._v(" "), _vm.upload.src ? _c('div', {
            staticClass: "mt16"
          }, [_c('h5', [_vm._v("2. Crop Image")]), _vm._v(" "), _c('cropper', {
            ref: "cropper",
            attrs: {
              "classname": "cropper",
              "src": _vm.upload.src,
              "stencil-props": _vm.stencilProps
            },
            on: {
              "change": _vm.onChange
            }
          })], 1) : _vm._e(), _vm._v(" "), _vm.upload.src ? _c('div', {
            staticClass: "upload-actions mt16"
          }, [_c('h5', [_vm._v("3. Confirm")]), _vm._v(" "), _c('Button', {
            attrs: {
              "text": "Upload Uncropped",
              "type": "primary",
              "disabled": !_vm.isValid,
              "action": _vm.selectFullImage
            }
          }, [_c('i', {
            staticClass: "material-icons"
          }, [_vm._v("crop_free")])]), _vm._v(" "), _c('Button', {
            attrs: {
              "text": "Upload Cropped",
              "type": "dark-grey",
              "disabled": !_vm.isValid,
              "action": _vm.selectCroppedImage
            }
          }, [_c('i', {
            staticClass: "material-icons"
          }, [_vm._v("crop")])])], 1) : _vm._e()];
        },
        proxy: true
      }]),
      model: {
        value: _vm.showModal,
        callback: function callback($$v) {
          _vm.showModal = $$v;
        },
        expression: "showModal"
      }
    });
  },
  staticRenderFns: [],
  name: 'ImageSelector',
  props: {
    show: {
      type: Boolean
    },
    size: {
      type: String,
      default: 'lg'
    },
    config: {
      type: Object,
      default: function _default() {
        return {
          maxSize: 5,
          aspectRatio: 0,
          minWidth: null
        };
      }
    }
  },
  components: {
    Cropper: Cropper,
    Modal: Modal,
    Button: Button
  },
  model: {
    prop: 'show',
    event: 'cancel'
  },
  data: function data() {
    return {
      showModal: false,
      upload: {
        chosen: null,
        src: null
      },
      position: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      },
      stencilProps: {
        aspectRatio: this.config.aspectRatio
      },
      options: {
        minWidth: this.config.minWidth
      },
      isValid: false,
      showCropper: true
    };
  },
  methods: {
    close: function close(image, cropInfo, src) {
      this.$emit('close', {
        image: image,
        cropInfo: cropInfo,
        src: src
      });
      this.$emit('cancel', false);
    },
    cancel: function cancel() {
      this.$emit('cancel', false);
    },
    extractImage: function extractImage() {
      var _this = this;

      var img = new Image();
      var reader = new FileReader();

      img.onload = function () {
        // Image Validation
        if (_this.config.minWidth) {
          if (img.width < _this.config.minWidth) {
            alert("Image width should be at least ".concat(_this.config.minWidth, "px wide."));
            return;
          } else if (_this.config.aspectRatio && img.width / _this.config.aspectRatio > img.height) {
            alert('Image does not match the required specification.');
            return;
          }
        }

        if (_this.config.maxSize && _this.upload.chosen.size > 1024 * 1024 * _this.config.maxSize) {
          alert("Image exceeds the minimum size of ".concat(_this.config.maxSize, "MB."));
          return;
        } // Image is validated


        _this.isValid = true;

        reader.onload = function (e) {
          _this.upload.src = e.target.result;
        };

        reader.readAsDataURL(_this.upload.chosen);
      };

      img.src = window.URL.createObjectURL(this.upload.chosen);
    },
    fileUploaded: function fileUploaded() {
      // This is executed when user selects an image.
      this.upload.chosen = this.$refs.fileUpload.files[0];
      this.isValid = false;
      this.extractImage();
    },
    onChange: function onChange(_ref) {
      var coordinates = _ref.coordinates;
      this.position = coordinates;
    },
    selectFullImage: function selectFullImage() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var formData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                try {
                  formData = new window.FormData();
                  formData.append('file', _this2.upload.chosen);

                  _this2.close(formData, null, _this2.upload.src);
                } catch (err) {
                  console.error(err);
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    selectCroppedImage: function selectCroppedImage() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var formData, bodyObj, _this3$$refs$cropper$, canvas;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                try {
                  formData = new window.FormData();
                  formData.append('file', _this3.upload.chosen);
                  bodyObj = {
                    cropx: _this3.position.left,
                    cropy: _this3.position.top,
                    cropw: _this3.position.width,
                    croph: _this3.position.height
                  };
                  _this3$$refs$cropper$ = _this3.$refs.cropper.getResult(), canvas = _this3$$refs$cropper$.canvas;

                  _this3.close(formData, bodyObj, canvas.toDataURL());
                } catch (err) {
                  console.error(err);
                }

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  },
  watch: {
    show: function show(newVal) {
      this.showModal = newVal;
    }
  },
  mounted: function mounted() {
    this.showModal = this.show;
  }
};

var css_248z$2 = "";
styleInject(css_248z$2);

var css_248z$1 = "";
styleInject(css_248z$1);

var Icon = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('i', {
      staticClass: "material-icons"
    }, [_vm._v(_vm._s(_vm.props.name))]);
  },
  staticRenderFns: [],
  name: 'Icon'
};

var IconButton = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('button', {
      staticClass: "icon-button",
      on: {
        "click": _vm.action
      }
    }, [_c('Icon', {
      attrs: {
        "name": _vm.icon
      }
    })], 1);
  },
  staticRenderFns: [],
  name: 'IconButton',
  props: {
    icon: {
      type: String,
      required: true
    },
    action: {
      type: Function,
      default: function _default() {}
    }
  },
  components: {
    Icon: Icon
  }
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

var EnterHandler = /*#__PURE__*/function (_Extension) {
  _inherits(EnterHandler, _Extension);

  var _super = _createSuper(EnterHandler);

  function EnterHandler(method) {
    var _this;

    _classCallCheck(this, EnterHandler);

    _this = _super.call(this);
    _this.method = method;
    return _this;
  }

  _createClass(EnterHandler, [{
    key: "name",
    get: function get() {
      return 'enter_handler';
    }
  }, {
    key: "plugins",
    get: function get() {
      var _this2 = this;

      return [new Plugin({
        props: {
          handleKeyDown: function handleKeyDown(view, event) {
            var _view$state = view.state,
                schema = _view$state.schema,
                tr = _view$state.tr;

            if (event.key === 'Enter' && !event.shiftKey && !event.altKey) {
              if (view.docView.node.content && view.docView.node.content.content && view.docView.node.content.content.length > 0 && (view.docView.node.content.content[0].type.name === 'bullet_list' || view.docView.node.content.content[0].type.name === 'ordered_list')) {
                console.log('Skip sending message for list');
              } else {
                _this2.method();
              }

              return false;
            } else if (event.key === 'Enter' && event.altKey) {
              var hardBreak = schema.nodes.hard_break;
              var transaction = tr.replaceSelectionWith(hardBreak.create()).scrollIntoView();
              view.dispatch(transaction);
              return true;
            } else {
              return false;
            }
          }
        }
      })];
    }
  }]);

  return EnterHandler;
}(Extension);

var RichText = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "rich-text-editor"
    }, [_c('editor-content', {
      ref: "editor",
      attrs: {
        "editor": _vm.editor
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "extensions-images"
    }, _vm._l(_vm.attachments, function (item, key) {
      return _c('div', {
        key: key,
        staticClass: "image-wrapper"
      }, [_c('img', {
        attrs: {
          "alt": key,
          "src": _vm.options.attachmentKey ? item[_vm.options.attachmentKey] : item
        },
        on: {
          "click": function click($event) {
            return _vm.previewAttachment(key, item);
          }
        }
      }), _vm._v(" "), _c('button', {
        staticClass: "icon-button icon-button-top",
        on: {
          "click": function click($event) {
            return _vm.removeAttachment(key, item);
          }
        }
      }, [_c('Icon', {
        attrs: {
          "name": "close"
        }
      })], 1)]);
    }), 0), _vm._v(" "), _c('div', {
      staticClass: "rich-text-editor-extensions"
    }, [_c('editor-menu-bar', {
      attrs: {
        "editor": _vm.editor
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function fn(ref) {
          var commands = ref.commands;
          var isActive = ref.isActive;
          var getMarkAttrs = ref.getMarkAttrs;
          return [_c('div', [_c('Overlay', {
            attrs: {
              "show": _vm.linkMenuIsActive,
              "opacity": 0.4,
              "show-close": false
            }
          }, [_c('form', {
            staticClass: "link-modal"
          }, [_c('h4', [_vm._v("Add link")]), _vm._v(" "), _c('div', {
            staticClass: "form-group"
          }, [_c('label', {
            staticClass: "control-label",
            attrs: {
              "for": "link"
            }
          }), _vm._v(" "), _c('input', {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: _vm.linkUrl,
              expression: "linkUrl"
            }],
            ref: "linkInput",
            staticClass: "form-control",
            attrs: {
              "id": "link",
              "type": "text",
              "placeholder": "https://",
              "autocomplete": "off"
            },
            domProps: {
              "value": _vm.linkUrl
            },
            on: {
              "keydown": function keydown($event) {
                if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) {
                  return null;
                }

                return _vm.hideLinkMenu($event);
              },
              "input": function input($event) {
                if ($event.target.composing) {
                  return;
                }

                _vm.linkUrl = $event.target.value;
              }
            }
          })]), _vm._v(" "), _c('Button', {
            staticClass: "mr-2",
            attrs: {
              "type": "danger",
              "text": "Cancel",
              "action": function action() {
                return _vm.setLinkUrl(commands.link, null);
              }
            }
          }), _vm._v(" "), _c('Button', {
            attrs: {
              "type": "success",
              "text": "Save",
              "action": function action() {
                return _vm.setLinkUrl(commands.link, _vm.linkUrl);
              }
            }
          })], 1)]), _vm._v(" "), _c('div', {
            staticClass: "rich-text-editor-extensions-wrapper",
            class: {
              'formatter-active': _vm.isFormatterActive
            }
          }, [_c('div', {
            staticClass: "extensions-format"
          }, [_c('IconButton', {
            staticClass: "icon-button toggle",
            class: {
              active: _vm.isFormatterActive
            },
            attrs: {
              "icon": "text_format",
              "action": _vm.activateFormatter
            }
          }), _vm._v(" "), _c('IconButton', {
            class: {
              visible: _vm.isFormatterActive,
              active: isActive.bold()
            },
            attrs: {
              "icon": "format_bold",
              "action": commands.bold
            }
          }), _vm._v(" "), _c('IconButton', {
            class: {
              visible: _vm.isFormatterActive,
              active: isActive.italic()
            },
            attrs: {
              "icon": "format_italic",
              "action": commands.italic
            }
          }), _vm._v(" "), _c('IconButton', {
            class: {
              visible: _vm.isFormatterActive,
              active: isActive.strike()
            },
            attrs: {
              "icon": "strikethrough_s",
              "action": commands.strike
            }
          }), _vm._v(" "), _c('IconButton', {
            class: {
              visible: _vm.isFormatterActive,
              active: isActive.bullet_list()
            },
            attrs: {
              "icon": "format_list_bulleted",
              "action": commands.bullet_list
            }
          }), _vm._v(" "), _c('IconButton', {
            class: {
              visible: _vm.isFormatterActive,
              active: isActive.ordered_list()
            },
            attrs: {
              "icon": "format_list_numbered",
              "action": commands.ordered_list
            }
          }), _vm._v(" "), _c('IconButton', {
            class: {
              visible: _vm.isFormatterActive,
              active: isActive.blockquote()
            },
            attrs: {
              "icon": "format_quote",
              "action": commands.blockquote
            }
          }), _vm._v(" "), !_vm.linkMenuIsActive ? _c('IconButton', {
            class: {
              visible: _vm.isFormatterActive,
              active: isActive.link()
            },
            attrs: {
              "icon": "link",
              "action": function action() {
                return _vm.showLinkMenu(getMarkAttrs('link'));
              }
            }
          }) : _vm._e()], 1), _vm._v(" "), _c('div', {
            staticClass: "extensions-extra"
          }, [_c('emoji-picker', {
            attrs: {
              "search": _vm.search
            },
            on: {
              "emoji": _vm.append
            },
            scopedSlots: _vm._u([{
              key: "emoji-invoker",
              fn: function fn(ref) {
                var clickEvent = ref.events.click;
                return _c('button', {
                  staticClass: "icon-button",
                  on: {
                    "click": function click($event) {
                      $event.stopPropagation();
                      return clickEvent($event);
                    }
                  }
                }, [_c('Icon', {
                  attrs: {
                    "name": "sentiment_satisfied_alt"
                  }
                })], 1);
              }
            }, {
              key: "emoji-picker",
              fn: function fn(ref) {
                var emojis = ref.emojis;
                var insert = ref.insert;
                return _c('div', {}, [_c('div', {
                  staticStyle: {
                    "position": "relative"
                  }
                }, [_c('div', {
                  staticClass: "emoji-picker"
                }, [_c('div', {
                  staticClass: "form-group"
                }, [_c('input', {
                  directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: _vm.search,
                    expression: "search"
                  }],
                  staticClass: "form-control border",
                  attrs: {
                    "aria-label": "emoji-picker",
                    "type": "text"
                  },
                  domProps: {
                    "value": _vm.search
                  },
                  on: {
                    "input": function input($event) {
                      if ($event.target.composing) {
                        return;
                      }

                      _vm.search = $event.target.value;
                    }
                  }
                })]), _vm._v(" "), _c('div', _vm._l(emojis, function (emojiGroup, category) {
                  return _c('div', {
                    key: category
                  }, [_c('h5', [_vm._v(_vm._s(category))]), _vm._v(" "), _c('div', {
                    staticClass: "emojis"
                  }, _vm._l(emojiGroup, function (emoji, emojiName) {
                    return _c('span', {
                      key: emojiName,
                      attrs: {
                        "title": emojiName
                      },
                      on: {
                        "click": function click($event) {
                          return insert(emoji);
                        }
                      }
                    }, [_vm._v(_vm._s(emoji))]);
                  }), 0)]);
                }), 0)])])]);
              }
            }], null, true)
          }), _vm._v(" "), _c('IconButton', {
            attrs: {
              "icon": "attachment",
              "action": _vm.addAttachment
            }
          }), _vm._v(" "), _vm.options.content !== '<p></p>' ? _c('IconButton', {
            staticClass: "send",
            attrs: {
              "icon": "send",
              "action": _vm.send
            }
          }) : _vm._e()], 1)])], 1)];
        }
      }])
    })], 1)], 1);
  },
  staticRenderFns: [],
  name: 'RichText',
  props: {
    options: {
      type: Object,
      required: true
    },
    attachments: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    send: {
      type: Function,
      required: true
    },
    addAttachment: {
      type: Function,
      default: function _default() {}
    },
    previewAttachment: {
      type: Function,
      default: function _default() {}
    },
    removeAttachment: {
      type: Function,
      default: function _default() {}
    }
  },
  components: {
    Button: Button,
    Icon: Icon,
    IconButton: IconButton,
    EditorMenuBar: EditorMenuBar,
    EditorContent: EditorContent,
    EmojiPicker: EmojiPicker,
    Overlay: Overlay
  },
  data: function data() {
    var _this = this;

    return {
      editor: new Editor({
        content: this.options.content ? this.options.content : this.options.placeholder ? '<p>' + this.options.placeholder + '</p>' : '<p>Start typing...</p>',
        onUpdate: function onUpdate(_ref) {
          var getHTML = _ref.getHTML;
          _this.options.content = getHTML();
        },
        onFocus: function onFocus() {
          if (!_this.isFirstFocus) {
            _this.isFirstFocus = true;

            _this.clearContent();
          }

          _this.$emit('focus');
        },
        onBlur: function onBlur() {
          _this.$emit('blur');
        },
        extensions: [new Blockquote(), new BulletList(), new OrderedList(), new Bold(), new Italic(), new Strike(), new Link(), new ListItem(), new HardBreak(), new EnterHandler(this.send)]
      }),
      isFirstFocus: false,
      linkUrl: null,
      linkMenuIsActive: false,
      search: '',
      isFormatterActive: false
    };
  },
  methods: {
    activateFormatter: function activateFormatter() {
      this.isFormatterActive = !this.isFormatterActive;
    },
    clearContent: function clearContent() {
      this.editor.clearContent();
    },
    showLinkMenu: function showLinkMenu(attrs) {
      var _this2 = this;

      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(function () {
        _this2.$refs.linkInput.focus();
      });
    },
    hideLinkMenu: function hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    setLinkUrl: function setLinkUrl(command, url) {
      var _this3 = this;

      command({
        href: url,
        target: '_blank'
      });
      setTimeout(function () {
        _this3.hideLinkMenu();
      }, 0);
    },
    append: function append(emoji) {
      if (!this.isFirstFocus) {
        this.isFirstFocus = true;
        this.clearContent();
      }

      var transaction = this.editor.state.tr.insertText(emoji);
      this.editor.view.dispatch(transaction);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.editor.destroy();
  }
};

var vClickOutside = Vue.directive('click-outside', {
  bind: function bind(el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };

    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind: function unbind(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
});

var vClickOutside$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': vClickOutside
});

var _arguments = arguments,
    _this = undefined;
var vDebounce = Vue.directive('debounce', {
  bind: function bind(el, _bind) {
    if (_bind.value !== _bind.oldValue) {
      // change debounce only if interval has changed
      el.oninput = debounce(function () {
        el.dispatchEvent(createNewEvent('change'));
      }, parseInt(_bind.value) || 300);
    }
  },
  unbind: function unbind(el) {
    document.body.removeEventListener('Event', el.oninput);
  }
});

var debounce = function debounce(fn, delay) {
  var timeoutID = null;
  return function () {
    clearTimeout(timeoutID); // eslint-disable-next-line

    var args = _arguments;
    var that = _this;
    timeoutID = setTimeout(function () {
      fn.apply(that, args);
    }, delay);
  };
};

var createNewEvent = function createNewEvent(eventName) {
  var e;

  if (typeof Event === 'function') {
    e = new Event(eventName);
  } else {
    e = document.createEvent('Event');
    e.initEvent(eventName, true, true);
  }

  return e;
};

var vDebounce$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': vDebounce
});

var ModalMixin = {
  props: {
    show: Boolean,
    default: false
  },
  methods: {
    cancel: function cancel() {
      this.$emit('close', false);
    }
  }
};

var css_248z = ".tabs-wrapper {\n  font-family: Arial, Helvetica, sans-serif;\n  width: 100%; }\n  .tabs-wrapper .pre-tabs {\n    margin-bottom: 16px; }\n  .tabs-wrapper .tab-content {\n    margin-top: -2px; }\n";
styleInject(css_248z);

var ModuleItemLayout = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "tabs-wrapper"
    }, [_c('div', {
      class: {
        'pre-tabs': _vm.$slots.pre
      }
    }, [_vm._t("pre")], 2), _vm._v(" "), _c('Tabs', {
      attrs: {
        "data": _vm.tabs,
        "type": _vm.type,
        "limit": 3
      }
    }), _vm._v(" "), _vm.rData && !_vm.$route.meta.isKeepAlive ? _c('div', {
      staticClass: "tab-content"
    }, [_c('router-view')], 1) : _vm.rData && _vm.$route.meta.isKeepAlive ? _c('div', {
      staticClass: "tab-content"
    }, [_c('keep-alive', [_c('router-view')], 1)], 1) : _vm._e()], 1);
  },
  staticRenderFns: [],
  name: 'ModuleItemLayout',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'simple'
    },
    limit: {
      type: Number,
      default: 0
    },
    rData: {
      type: [Object, Boolean],
      default: function _default() {
        return null;
      }
    }
  },
  components: {
    Tabs: Tabs
  },
  data: function data() {
    return {
      morePosition: {}
    };
  }
};

var Component$3 = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "login-container"
    }, [_c('div', {
      staticClass: "left"
    }, [_c('div', {
      staticClass: "login-wrapper"
    }, [_c('div', {
      staticClass: "logo"
    }, [_c('img', {
      style: {
        height: _vm.brandLogoHeight + 'px'
      },
      attrs: {
        "src": _vm.brandLogoUrl,
        "alt": ""
      }
    })]), _vm._v(" "), _c('h1', {
      staticClass: "title",
      style: {
        color: _vm.textDarkColor
      }
    }, [_vm._v(_vm._s(_vm.titleText))]), _vm._v(" "), _c('h3', {
      staticClass: "subtitle",
      style: {
        color: _vm.textLightColor
      }
    }, [_vm._v(_vm._s(_vm.subTitleText))]), _vm._v(" "), _c('form', {
      staticClass: "login-form",
      on: {
        "keyup": function keyup($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
            return null;
          }

          return function () {
            return _vm.onClickFn(_vm.username, _vm.password, _vm.errorMessage);
          }();
        }
      }
    }, [_c('div', {
      staticClass: "form-group"
    }, [_c('label', {
      staticClass: "control-label",
      style: {
        color: _vm.brandPrimary
      },
      attrs: {
        "for": "username"
      }
    }, [_vm._v("Username or Email")]), _vm._v(" "), _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.username,
        expression: "username"
      }],
      staticClass: "form-control",
      attrs: {
        "type": "text",
        "id": "username",
        "placeholder": "john@doe.com"
      },
      domProps: {
        "value": _vm.username
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.username = $event.target.value;
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "form-group"
    }, [_c('label', {
      staticClass: "control-label",
      style: {
        color: _vm.brandPrimary
      },
      attrs: {
        "for": "password"
      }
    }, [_vm._v("Password")]), _vm._v(" "), _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.password,
        expression: "password"
      }],
      staticClass: "form-control",
      attrs: {
        "type": "password",
        "id": "password",
        "placeholder": "••••••••"
      },
      domProps: {
        "value": _vm.password
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.password = $event.target.value;
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "forgot-password"
    }, [_c('a', {
      staticClass: "brand-primary bold",
      style: {
        color: _vm.brandPrimary
      },
      attrs: {
        "href": _vm.forgotPasswordLink
      }
    }, [_vm._v("Forgot Password?")])]), _vm._v(" "), _c('p', {
      staticClass: "login-info",
      attrs: {
        "v-if": _vm.errorMessage
      }
    }, [_vm._v(_vm._s(_vm.errorMessage))]), _vm._v(" "), _c('Button', {
      attrs: {
        "size": "lg",
        "color": _vm.brandPrimary,
        "text": "Login",
        "action": function action() {
          return _vm.onClickFn(_vm.username, _vm.password, _vm.errorMessage);
        },
        "async": true,
        "disabled": _vm.isNotProceedable()
      }
    }, [_c('i', {
      staticClass: "material-icons"
    }, [_vm._v("https")])])], 1)])]), _vm._v(" "), _c('div', {
      staticClass: "right",
      style: {
        'background-image': 'url(' + _vm.backgroundImage + ')'
      }
    })]);
  },
  staticRenderFns: [],
  name: 'LoginVariation1',
  props: {
    brandPrimary: {
      type: String,
      default: '#000000'
    },
    brandLogoUrl: {
      type: String,
      default: 'https://htmlsigs.s3.amazonaws.com/logos/files/001/087/329/landscape/e9ineLogo.png'
    },
    brandLogoHeight: {
      type: String,
      default: '64'
    },
    titleText: {
      type: String,
      default: 'This is your title. Please try to fit it within two lines.'
    },
    subTitleText: {
      type: String,
      default: 'This is your sub-title. Please try to fit it within three lines.'
    },
    textDarkColor: {
      type: String,
      default: '#584649'
    },
    textLightColor: {
      type: String,
      default: '#777'
    },
    backgroundImage: {
      type: String,
      default: 'https://via.placeholder.com/2000x1200?text=Replace+This+Image+Now'
    },
    errorMessage: {
      type: String,
      default: null
    },
    isNotProceedable: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    onClickFn: {
      type: Function
    },
    forgotPasswordLink: {
      type: String,
      default: 'https://www.google.com'
    }
  },
  components: {
    Button: Button
  },
  data: function data() {
    return {
      username: null,
      password: null
    };
  }
};

var Component$2 = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "layout-variation-1",
      class: _vm.sidebarOn == true ? 'show-sidebar' : ''
    }, [_c('div', {
      attrs: {
        "id": "mobile-menu-toggle"
      },
      on: {
        "click": function click($event) {
          _vm.sidebarOn = !_vm.sidebarOn;
        }
      }
    }, [_c('i', {
      staticClass: "material-icons"
    }, [_vm._v("menu")])]), _vm._v(" "), _vm._t("sidebar"), _vm._v(" "), _vm._t("topbar"), _vm._v(" "), _c('div', {
      staticClass: "content-view"
    }, [_vm._t("breadcrumbs"), _vm._v(" "), _c('div', {
      staticClass: "content-wrapper"
    }, [_c('router-view', {
      key: _vm.routerViewKey
    })], 1)], 2)], 2);
  },
  staticRenderFns: [],
  name: 'LayoutVariation1',
  props: {
    routerViewKey: {
      type: String
    }
  },
  data: function data() {
    return {
      sidebarOn: false
    };
  },
  mounted: function mounted() {
    this.$on('toggle-sidebar', function () {
      this.sidebarOn = false;
    });
  }
};

var Component$1 = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "page layout-variation-2",
      class: [_vm.sidebarOn == true ? 'show-sidebar' : '', _vm.sidebar == true ? 'has-sidebar' : '', _vm.showBackBtn && _vm.$route.fullPath.split('/').length > 2 ? 'show-back-btn' : '']
    }, [_vm.sidebar ? _c('a', {
      attrs: {
        "id": "mobile-menu-toggle"
      },
      on: {
        "click": function click($event) {
          _vm.sidebarOn = !_vm.sidebarOn;
        }
      }
    }, [!_vm.sidebarOn ? _c('i', {
      staticClass: "material-icons animated fadeInRight faster",
      style: {
        color: _vm.menuIconColor
      }
    }, [_vm._v("menu")]) : _vm._e(), _vm._v(" "), _vm.sidebarOn ? _c('i', {
      staticClass: "material-icons animated rotateIn faster",
      style: {
        color: _vm.menuIconColor
      }
    }, [_vm._v("cancel")]) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('transition', {
      attrs: {
        "name": "backTransition"
      }
    }, [_vm.showBackBtn && _vm.$route.fullPath.split('/').length > 2 ? _c('a', {
      attrs: {
        "id": "back-nav"
      },
      on: {
        "click": function click($event) {
          return _vm.$router.go(-1);
        }
      }
    }, [_c('i', {
      staticClass: "material-icons",
      style: {
        color: _vm.menuIconColor
      }
    }, [_vm._v("keyboard_backspace")])]) : _vm._e()]), _vm._v(" "), _c('div', {
      staticClass: "topbar"
    }, [_vm._t("topbar")], 2), _vm._v(" "), _vm.sidebar ? _c('div', [_vm._t("sidebar")], 2) : _vm._e(), _vm._v(" "), _vm._t("globalSearch"), _vm._v(" "), _c('div', {
      staticClass: "content-view"
    }, [_vm._t("breadcrumbs"), _vm._v(" "), _c('div', {
      staticClass: "content-wrapper"
    }, [_c('transition', {
      attrs: {
        "name": "pageTransition",
        "mode": "out-in"
      }
    }, [_c('router-view')], 1)], 1)], 2), _vm._v(" "), _vm._t("tabbar")], 2);
  },
  staticRenderFns: [],
  name: 'LayoutVariation2',
  props: {
    sidebar: {
      type: Boolean,
      default: true
    },
    menuIconColor: {
      type: String,
      default: '#696974'
    },
    showBackBtn: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      sidebarOn: false
    };
  },
  methods: {
    back: function back() {
      this.$router.go(-1);
    }
  },
  mounted: function mounted() {
    this.$on('toggle-sidebar', function () {
      this.sidebarOn = false;
    });
  }
};

var Component = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "page layout-variation-3",
      class: [_vm.showBackBtn && _vm.$route.fullPath.split('/').length > 2 ? 'show-back-btn' : '']
    }, [_vm.$slots.topbar ? _vm._t("topbar") : _c('div', {
      staticClass: "mobile-topbar"
    }, [_c('transition', {
      attrs: {
        "name": "fade"
      }
    }, [_c('h4', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showNavTitle,
        expression: "showNavTitle"
      }],
      staticClass: "mobile-topbar-page-title"
    }, [_vm._v(_vm._s(_vm.$route.name))])]), _vm._v(" "), _vm.showBackBtn && _vm.$route.fullPath.split('/').length > 2 ? _c('a', {
      attrs: {
        "id": "back-nav"
      },
      on: {
        "click": function click($event) {
          return _vm.$router.go(-1);
        }
      }
    }, [_c('i', {
      staticClass: "material-icons"
    }, [_vm._v("arrow_back_ios")])]) : _c('div', {
      staticClass: "mobile-topbar-options mobile-topbar-left-options"
    }, _vm._l(_vm.topbarLeftOptions, function (option, key) {
      return _c('div', {
        key: key,
        staticClass: "mobile-topbar-option"
      }, [option.type == 'icon' ? _c('Tooltip', {
        attrs: {
          "message": option.text,
          "position": "right"
        }
      }, [_c('a', {
        staticClass: "topbar-option-icon",
        attrs: {
          "href": option.href
        },
        on: {
          "click": function click($event) {
            return _vm.handleAction(option.clickAction);
          }
        }
      }, [_c('i', {
        staticClass: "material-icons"
      }, [_vm._v(_vm._s(option.icon))])])]) : _c('a', {
        attrs: {
          "href": option.href
        },
        on: {
          "click": function click($event) {
            return _vm.handleAction(option.clickAction);
          }
        }
      }, [_vm._v("\n                    " + _vm._s(option.text) + "\n                ")])], 1);
    }), 0), _vm._v(" "), _c('div', {
      staticClass: "mobile-topbar-options"
    }, _vm._l(_vm.topbarRightOptions, function (option, key) {
      return _c('div', {
        key: key,
        staticClass: "mobile-topbar-option"
      }, [option.type == 'icon' ? _c('Tooltip', {
        attrs: {
          "message": option.text,
          "position": "left"
        }
      }, [_c('a', {
        staticClass: "topbar-option-icon",
        attrs: {
          "href": option.href
        },
        on: {
          "click": function click($event) {
            return _vm.handleAction(option.clickAction);
          }
        }
      }, [_c('i', {
        staticClass: "material-icons"
      }, [_vm._v(_vm._s(option.icon))])])]) : _c('a', {
        attrs: {
          "href": option.href
        },
        on: {
          "click": function click($event) {
            return _vm.handleAction(option.clickAction);
          }
        }
      }, [_vm._v("\n                    " + _vm._s(option.text) + "\n                ")])], 1);
    }), 0)], 1), _vm._v(" "), _c('div', {
      staticClass: "content-view"
    }, [_vm._t("breadcrumbs"), _vm._v(" "), _c('div', {
      staticClass: "content-wrapper"
    }, [_c('div', {
      staticClass: "content-header"
    }, [_c('h1', {
      staticClass: "content-page-title"
    }, [_vm._v(_vm._s(_vm.$route.name))]), _vm._v(" "), _c('div', {
      staticClass: "search-box"
    }, [_c('input', {
      attrs: {
        "type": "text",
        "placeholder": _vm.searchOptions.placeholder,
        "readonly": _vm.searchOptions.clickAction
      },
      domProps: {
        "value": _vm.searchText
      },
      on: {
        "input": function input($event) {
          return _vm.$emit('update:search-text', $event.target.value);
        },
        "click": function click($event) {
          return _vm.handleAction(_vm.searchOptions.clickAction);
        }
      }
    })])]), _vm._v(" "), _c('transition', {
      attrs: {
        "name": "pageTransition",
        "mode": "out-in"
      }
    }, [_c('router-view')], 1)], 1)], 2), _vm._v(" "), _vm._t("tabbar")], 2);
  },
  staticRenderFns: [],
  name: 'LayoutVariation3',
  props: {
    showBackBtn: {
      type: Boolean,
      default: false
    },
    topbarLeftOptions: {
      type: Array
    },
    topbarRightOptions: {
      type: Array
    },
    searchOptions: {
      type: Object
    },
    searchText: {
      type: String
    }
  },
  components: {
    Tooltip: Tooltip
  },
  data: function data() {
    return {
      showNavTitle: false
    };
  },
  methods: {
    back: function back() {
      this.$router.go(-1);
    },
    handleAction: function handleAction(fn) {
      if (fn) {
        return fn();
      } else {
        return false;
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    var obj = window.$('.content-page-title');
    var topbar = window.$('.mobile-topbar');
    obj.width(obj.width());
    window.$('.content-view').scroll(function () {
      var currentScroll = window.$('.content-view').scrollTop();

      if (currentScroll > 72) {
        _this.showNavTitle = true;
        topbar.css({
          'border-bottom-style': 'solid'
        });
      } else {
        _this.showNavTitle = false;
        topbar.css({
          'border-bottom-style': 'none'
        });
      }

      if (currentScroll > 54) {
        obj.css({
          position: 'absolute',
          top: 54
        });
      } else {
        obj.css({
          position: 'fixed',
          top: 44
        });
      }
    });
  }
};

export { Component$5 as AddressFinder, Avatar, AvatarGroup, AvatarInfo, Badge, Breadcrumbs, Button, Card, index as Chart, Chip, ColorPicker, Datepicker, ImageSelector, Component$2 as LayoutVariation1, Component$1 as LayoutVariation2, Component as LayoutVariation3, Component$3 as LoginVariation1, Modal, ModalMixin, ModuleItemLayout, Overlay, Panel, ProgressBar, Range, RichText, Component$4 as Shimmer, ShimmerHeading, ShimmerImg, ShimmerText, SideBar, Stepper, TabBar, Table, Tabs, Timepicker, Tooltip, TopBar, vClickOutside as VClickOutside, vDebounce as VDebounce, checkValidHex, download, escape, fromArray, sortArrayByProperty };
