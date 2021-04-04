(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_admin_profile_index_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/admin/profile/index.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/admin/profile/index.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_api_users__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/api/users */ "./resources/js/services/api/users/index.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
        password_confirmation: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit: function onSubmit() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.$swal({
                  title: "Enter your password to verify",
                  input: "password",
                  inputAttributes: {
                    autocapitalize: "off"
                  },
                  showCancelButton: true,
                  confirmButtonText: "Look up",
                  showLoaderOnConfirm: true,
                  preConfirm: function () {
                    var _preConfirm = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(password) {
                      var res;
                      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.prev = 0;
                              _this.form.password_confirmation = password;
                              _context.next = 4;
                              return _services_api_users__WEBPACK_IMPORTED_MODULE_1__.default.updateCurrentUser(_this.form);

                            case 4:
                              res = _context.sent;
                              return _context.abrupt("return", res.data);

                            case 8:
                              _context.prev = 8;
                              _context.t0 = _context["catch"](0);
                              console.log(_context.t0);

                            case 11:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee, null, [[0, 8]]);
                    }));

                    function preConfirm(_x) {
                      return _preConfirm.apply(this, arguments);
                    }

                    return preConfirm;
                  }(),
                  allowOutsideClick: function allowOutsideClick() {
                    return !Swal.isLoading();
                  }
                });

              case 2:
                result = _context2.sent;

                if (result.isConfirmed) {
                  console.log(result);

                  if (result.value.error === 0) {
                    _this.$swal({
                      icon: "success",
                      title: "Success",
                      text: result.value.message
                    });
                  } else {
                    _this.$swal({
                      icon: "error",
                      title: "Error",
                      text: result.value.message
                    });
                  }
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    onReset: function onReset() {
      var _this2 = this;

      this.show = false;
      this.$nextTick(function () {
        _this2.show = true;
      });
    },
    getCurrentUser: function getCurrentUser() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _services_api_users__WEBPACK_IMPORTED_MODULE_1__.default.getCurrentUser();

              case 3:
                res = _context3.sent;

                if (!(res.data.error === 0)) {
                  _context3.next = 8;
                  break;
                }

                _this3.form = res.data.data;
                _context3.next = 9;
                break;

              case 8:
                throw new Error(res.data.message);

              case 9:
                _context3.next = 14;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11]]);
      }))();
    }
  },
  mounted: function mounted() {
    this.getCurrentUser();
  }
});

/***/ }),

/***/ "./resources/js/services/api/users/index.js":
/*!**************************************************!*\
  !*** ./resources/js/services/api/users/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _axios_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../axios/admin */ "./resources/js/axios/admin/index.js");


var updateCurrentUser = function updateCurrentUser(data) {
  return _axios_admin__WEBPACK_IMPORTED_MODULE_0__.default.post('currentUser/update', data);
};

var getCurrentUser = function getCurrentUser() {
  return _axios_admin__WEBPACK_IMPORTED_MODULE_0__.default.get('currentUser');
};

var get = function get() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  if (id === 0) return _axios_admin__WEBPACK_IMPORTED_MODULE_0__.default.get('users');
  return _axios_admin__WEBPACK_IMPORTED_MODULE_0__.default.get("users/".concat(id));
};

var save = function save() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var data = arguments.length > 1 ? arguments[1] : undefined;
  if (id === 0) return _axios_admin__WEBPACK_IMPORTED_MODULE_0__.default.post('users', data);
  return _axios_admin__WEBPACK_IMPORTED_MODULE_0__.default.post("users/".concat(id), data);
};

var remove = function remove(id) {
  return _axios_admin__WEBPACK_IMPORTED_MODULE_0__.default.delete("users/".concat(id));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getCurrentUser: getCurrentUser,
  updateCurrentUser: updateCurrentUser,
  get: get,
  save: save,
  remove: remove
});

/***/ }),

/***/ "./resources/js/pages/admin/profile/index.vue":
/*!****************************************************!*\
  !*** ./resources/js/pages/admin/profile/index.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_vue_vue_type_template_id_57e04253___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=57e04253& */ "./resources/js/pages/admin/profile/index.vue?vue&type=template&id=57e04253&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/pages/admin/profile/index.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _index_vue_vue_type_template_id_57e04253___WEBPACK_IMPORTED_MODULE_0__.render,
  _index_vue_vue_type_template_id_57e04253___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/admin/profile/index.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/admin/profile/index.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/pages/admin/profile/index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/admin/profile/index.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/pages/admin/profile/index.vue?vue&type=template&id=57e04253&":
/*!***********************************************************************************!*\
  !*** ./resources/js/pages/admin/profile/index.vue?vue&type=template&id=57e04253& ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_57e04253___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_57e04253___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_57e04253___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=template&id=57e04253& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/admin/profile/index.vue?vue&type=template&id=57e04253&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/admin/profile/index.vue?vue&type=template&id=57e04253&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/admin/profile/index.vue?vue&type=template&id=57e04253& ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container" },
    [
      _vm.show
        ? _c(
            "b-form",
            {
              on: {
                submit: function($event) {
                  $event.preventDefault()
                  return _vm.onSubmit($event)
                },
                reset: function($event) {
                  $event.preventDefault()
                  return _vm.onReset($event)
                }
              }
            },
            [
              _c("div", { staticClass: "row" }, [
                _c(
                  "div",
                  { staticClass: "col-md-6" },
                  [
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          id: "input-group-1",
                          label: "Email address:",
                          "label-for": "input-1",
                          description:
                            "We'll never share your email with anyone else."
                        }
                      },
                      [
                        _c("b-form-input", {
                          attrs: {
                            id: "input-1",
                            type: "email",
                            placeholder: "Enter email",
                            required: ""
                          },
                          model: {
                            value: _vm.form.email,
                            callback: function($$v) {
                              _vm.$set(_vm.form, "email", $$v)
                            },
                            expression: "form.email"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "col-md-6" },
                  [
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          id: "input-group-2",
                          label: "Your Name:",
                          "label-for": "input-2"
                        }
                      },
                      [
                        _c("b-form-input", {
                          attrs: {
                            id: "input-2",
                            placeholder: "Enter name",
                            required: ""
                          },
                          model: {
                            value: _vm.form.name,
                            callback: function($$v) {
                              _vm.$set(_vm.form, "name", $$v)
                            },
                            expression: "form.name"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "col-md-6" },
                  [
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          id: "input-group-3",
                          label: "Your password:",
                          "label-for": "input-3"
                        }
                      },
                      [
                        _c("b-form-input", {
                          attrs: {
                            id: "input-3",
                            type: "password",
                            placeholder: "Enter password",
                            required: ""
                          },
                          model: {
                            value: _vm.form.password,
                            callback: function($$v) {
                              _vm.$set(_vm.form, "password", $$v)
                            },
                            expression: "form.password"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c(
                "b-button",
                { attrs: { type: "submit", variant: "primary" } },
                [_vm._v("Submit")]
              ),
              _vm._v(" "),
              _c("b-button", { attrs: { type: "reset", variant: "danger" } }, [
                _vm._v("Reset")
              ])
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);