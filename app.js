/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fonts_grenze_woff2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _fonts_grenze_woff__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _images_background_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
// Imports






var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_grenze_woff2__WEBPACK_IMPORTED_MODULE_3__);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_grenze_woff__WEBPACK_IMPORTED_MODULE_4__);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_background_jpg__WEBPACK_IMPORTED_MODULE_5__);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n}\n\n@font-face {\n  font-family: 'Grenze';\n  src:\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('woff2'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('woff');\n  font-weight: 100;\n  font-style: normal;\n}\n\nbody {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n  background-size: cover;\n}\n\nh1 {\n  padding: 20px;\n  color: #363738;\n  font-size: 3rem;\n  font-weight: 600;\n  text-align: center;\n  font-family: 'Grenze', Arial, Helvetica, sans-serif;\n}\n\nh2 {\n  padding: 20px;\n  color: #363738;\n  font-size: 1.3rem;\n  text-align: center;\n  font-family: 'Grenze', Arial, Helvetica, sans-serif;\n  text-decoration: underline;\n}\n\np {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n}\n\nul li::marker {\n  content: none;\n}\n\nul {\n  display: -ms-grid;\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: auto;\n  gap: 20px;\n}\n\nli {\n  border: 1px solid #fff;\n  border-radius: 5px;\n}\n\nmenu {\n  background-color: rgba(156, 157, 161, 0.9);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 10vh;\n  border-bottom: 1px solid #808080;\n  width: 70%;\n  margin: 0 auto;\n}\n\nmenuitem {\n  margin: 0 10px;\n  color: white;\n  font-family: 'Grenze', Arial, Helvetica, sans-serif;\n  font-size: 1.5rem;\n  cursor: pointer;\n}\n\nmenuitem:hover {\n  opacity: 0.5;\n  color: black;\n}\n\n#content {\n  background-color: rgba(156, 157, 161, 0.9);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 70%;\n  min-height: 90vh;\n  margin: 0 auto;\n}\n\n.phrase,\n.time,\n.about {\n  width: 60%;\n  padding: 20px;\n  color: #363738;\n  font-size: 1.3rem;\n  font-weight: 600;\n  text-align: center;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n}\n\n.phrase {\n  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;\n  color: #5d6d7e;\n  letter-spacing: 10px;\n}\n\n.about {\n  border-top: 5px solid #5d6d7e;\n  border-bottom: 5px solid #5d6d7e;\n}\n\n.contact-section {\n  background: inherit;\n  border: 1px solid #fff;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  padding: 20px;\n  width: 80%;\n}\n\n.contact-div,\n.form-div {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n}\n\n.contact-div p {\n  color: #fff;\n  font-size: 1.3rem;\n  font-weight: 600;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n}\n\ninput,\ntextarea {\n  margin: 10px 0;\n  padding: 5px;\n  border-radius: 5px;\n  border: none;\n  outline: none;\n  font-size: 1rem;\n}\n\n.food-menu {\n  padding: 30px;\n}\n\n.img-div {\n  height: 25vh;\n  border-radius: 5px 5px 0 0;\n}\n\n.food-detail-div {\n  padding: 5px;\n}\n\n.food-name {\n  font-family: 'Grenze', Arial, Helvetica, sans-serif;\n}\n\n.food-price {\n  color: #fff;\n  font-size: 1rem;\n  font-weight: 600;\n  font-family: 'Grenze', Arial, Helvetica, sans-serif;\n  letter-spacing: 3px;\n}\n\nli:hover {\n  box-shadow: 0 0 11px #ffff;\n}\n\nli:nth-of-type(1) .img-div {\n  background-image: url(https://res.cloudinary.com/dssc4mht3/image/upload/v1621626432/restaurant-page/Chapati-1_mztfyj.jpg);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\nli:nth-of-type(2) .img-div {\n  background-image: url(https://res.cloudinary.com/dssc4mht3/image/upload/v1621626432/restaurant-page/Kachumbari-Salad_ryatxn.jpg);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\nli:nth-of-type(3) .img-div {\n  background-image: url(https://res.cloudinary.com/dssc4mht3/image/upload/v1621626432/restaurant-page/Matoke_a5iknv.jpg);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\nli:nth-of-type(4) .img-div {\n  background-image: url(https://res.cloudinary.com/dssc4mht3/image/upload/v1621626432/restaurant-page/Ngwacii_h2lmf8.jpg);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\nli:nth-of-type(5) .img-div {\n  background-image: url(https://res.cloudinary.com/dssc4mht3/image/upload/v1621626432/restaurant-page/Peanut-Soup_z19btc.jpg);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\nli:nth-of-type(6) .img-div {\n  background-image: url(https://res.cloudinary.com/dssc4mht3/image/upload/v1621626432/restaurant-page/Sweet-Potato-Salad-1_tamfty.jpg);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\nli:nth-of-type(7) .img-div {\n  background-image: url(https://res.cloudinary.com/dssc4mht3/image/upload/v1621626433/restaurant-page/Tsimbapachiro_buogov.jpg);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\nli:nth-of-type(8) .img-div {\n  background-image: url(https://res.cloudinary.com/dssc4mht3/image/upload/v1621626433/restaurant-page/Usuu_cfj241.jpg);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n", "",{"version":3,"sources":["webpack://./src/assets/css/style.css"],"names":[],"mappings":"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","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n}\n\n@font-face {\n  font-family: 'Grenze';\n  src:\n    url('../fonts/grenze.woff2') format('woff2'),\n    url('../fonts/grenze.woff') format('woff');\n  font-weight: 100;\n  font-style: normal;\n}\n\nbody {\n  background-image: url(../images/background.jpg);\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n  background-size: cover;\n}\n\nh1 {\n  padding: 20px;\n  color: #363738;\n  font-size: 3rem;\n  font-weight: 600;\n  text-align: center;\n  font-family: 'Grenze', Arial, Helvetica, sans-serif;\n}\n\nh2 {\n  padding: 20px;\n  color: #363738;\n  font-size: 1.3rem;\n  text-align: center;\n  font-family: 'Grenze', Arial, Helvetica, sans-serif;\n  text-decoration: underline;\n}\n\np {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n}\n\nul li::marker {\n  content: none;\n}\n\nul {\n  display: -ms-grid;\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: auto;\n  gap: 20px;\n}\n\nli {\n  border: 1px solid #fff;\n  border-radius: 5px;\n}\n\nmenu {\n  background-color: rgba(156, 157, 161, 0.9);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 10vh;\n  border-bottom: 1px solid #808080;\n  width: 70%;\n  margin: 0 auto;\n}\n\nmenuitem {\n  margin: 0 10px;\n  color: white;\n  font-family: 'Grenze', Arial, Helvetica, sans-serif;\n  font-size: 1.5rem;\n  cursor: pointer;\n}\n\nmenuitem:hover {\n  opacity: 0.5;\n  color: black;\n}\n\n#content {\n  background-color: rgba(156, 157, 161, 0.9);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 70%;\n  min-height: 90vh;\n  margin: 0 auto;\n}\n\n.phrase,\n.time,\n.about {\n  width: 60%;\n  padding: 20px;\n  color: #363738;\n  font-size: 1.3rem;\n  font-weight: 600;\n  text-align: center;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n}\n\n.phrase {\n  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;\n  color: #5d6d7e;\n  letter-spacing: 10px;\n}\n\n.about {\n  border-top: 5px solid #5d6d7e;\n  border-bottom: 5px solid #5d6d7e;\n}\n\n.contact-section {\n  background: inherit;\n  border: 1px solid #fff;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  padding: 20px;\n  width: 80%;\n}\n\n.contact-div,\n.form-div {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n}\n\n.contact-div p {\n  color: #fff;\n  font-size: 1.3rem;\n  font-weight: 600;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n}\n\ninput,\ntextarea {\n  margin: 10px 0;\n  padding: 5px;\n  border-radius: 5px;\n  border: none;\n  outline: none;\n  font-size: 1rem;\n}\n\n.food-menu {\n  padding: 30px;\n}\n\n.img-div {\n  height: 25vh;\n  border-radius: 5px 5px 0 0;\n}\n\n.food-detail-div {\n  padding: 5px;\n}\n\n.food-name {\n  font-family: 'Grenze', Arial, Helvetica, sans-serif;\n}\n\n.food-price {\n  color: #fff;\n  font-size: 1rem;\n  font-weight: 600;\n  font-family: 'Grenze', Arial, Helvetica, sans-serif;\n  letter-spacing: 3px;\n}\n\nli:hover {\n  box-shadow: 0 0 11px #ffff;\n}\n\nli:nth-of-type(1) .img-div {\n  background-image: url(https://res.cloudinary.com/dssc4mht3/image/upload/v1621626432/restaurant-page/Chapati-1_mztfyj.jpg);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\nli:nth-of-type(2) .img-div {\n  background-image: url(https://res.cloudinary.com/dssc4mht3/image/upload/v1621626432/restaurant-page/Kachumbari-Salad_ryatxn.jpg);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\nli:nth-of-type(3) .img-div {\n  background-image: url(https://res.cloudinary.com/dssc4mht3/image/upload/v1621626432/restaurant-page/Matoke_a5iknv.jpg);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\nli:nth-of-type(4) .img-div {\n  background-image: url(https://res.cloudinary.com/dssc4mht3/image/upload/v1621626432/restaurant-page/Ngwacii_h2lmf8.jpg);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\nli:nth-of-type(5) .img-div {\n  background-image: url(https://res.cloudinary.com/dssc4mht3/image/upload/v1621626432/restaurant-page/Peanut-Soup_z19btc.jpg);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\nli:nth-of-type(6) .img-div {\n  background-image: url(https://res.cloudinary.com/dssc4mht3/image/upload/v1621626432/restaurant-page/Sweet-Potato-Salad-1_tamfty.jpg);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\nli:nth-of-type(7) .img-div {\n  background-image: url(https://res.cloudinary.com/dssc4mht3/image/upload/v1621626433/restaurant-page/Tsimbapachiro_buogov.jpg);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\nli:nth-of-type(8) .img-div {\n  background-image: url(https://res.cloudinary.com/dssc4mht3/image/upload/v1621626433/restaurant-page/Usuu_cfj241.jpg);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "53660156ff0a3898ee7b.woff2";

/***/ }),
/* 8 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0cc19ccd923d514442e1.woff";

/***/ }),
/* 9 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "78cf1ba306c20eaba62c.jpg";

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createElem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  const content = document.getElementById('content');

  const menu = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('MENU', { class: 'menu' });
  const homePage = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('MENUITEM', { class: 'home-page' }, 'HOME');
  const foodMenu = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('MENUITEM', { class: 'food-menu' }, 'MENU');
  const contactPage = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('MENUITEM', { class: 'contact-page' }, 'CONTACT');
  menu.append(homePage, foodMenu, contactPage);

  document.body.insertBefore(menu, content);
});


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((tag, attributes = {}, textContent = '') => {
  const element = document.createElement(tag);
  const keys = Object.keys(attributes);
  keys.forEach((key) => {
    element.setAttribute(key, attributes[key]);
  });
  element.textContent = textContent;
  return element;
});


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createElem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  const content = document.getElementById('content');
  const header = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('h1', {}, 'Pendo Dishes');
  const phrase = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('p', { class: 'phrase' }, 'Hasty and tasty!');
  const time = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('p', { class: 'time' }, 'Opening Hours - 24/7');
  const about = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('p', { class: 'about' }, 'We are all about good food. But, besides that, we also offer top notch customer service. If you feel like this is not the best day for you to visit us but still need that good food, please go to our contact page and leave us a message or call us. You are always welcome.');
  content.append(header, phrase, time, about);
});


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createElem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  const content = document.getElementById('content');
  const foodMenu = [
    {
      name: 'Chapati',
      description: 'Pan-Fried Swahili Bread Made Out Of Whole Wheat Flour; Similar To Naan',
      price: 'KES 300.00',
    },
    {
      name: 'Kachumbari Salad',
      description: 'Finely Cut Juliennes Of Onions, De-Seeded Tomatoes, Gree Capsicum Washed In Fresh Lemon Juice And Served On A Bed Of Fresh Garden Lettuce',
      price: 'KES 500.00',
    },
    {
      name: 'Matoke',
      description: 'Green Bananas Steamed The African Way By Cobvering In Banana Leaves; Stewed With Leeks And Spring Onions',
      price: 'KES 300.00',
    },
    {
      name: 'Ngwacii(Sweet Potatoes)',
      description: 'Traditionally Boiled In The African Pot; Served Off The Skin',
      price: 'KES 500.00',
    },
    {
      name: 'Peanut Soup',
      description: 'Locally Harvested Red Peanuts Blended With Soy Sauce, Garlic, Lime, Coconut Cream Deriving A Very Rich African Soup;Served With Garlic Bread',
      price: 'KES 850.00',
    },
    {
      name: 'Sweet Potatoe Salad',
      description: 'Macedoine Of Sweet Potato Mixed With Finely Chopped Red Onions And Garnished With Paysanne Of Colored Peppers',
      price: 'KES 750.00',
    },
    {
      name: 'Tsimbapachiro(Chicken Wings-8pcs)',
      description: 'Well Marinated In Ginger, Garlic, Soy Sauce; Pan Fried With A Sprinkle Of Spring Onions : Served Either With Or Without Chil­lies',
      price: 'KES 750.00',
    },
    {
      name: 'Usuu(Porridge)',
      description: 'Fermented Finger Millet Porridge Made In Our African Pot; Served In Grandma’s Traditional Calabash',
      price: 'KES 400.00',
    },
  ];
  const menu = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('section', { class: 'food-menu' });
  const ul = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('ul');
  foodMenu.forEach((item) => {
    const listItem = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('li');
    const imgDiv = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('div', { class: 'img-div' });
    const foodDetailDiv = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('div', { class: 'food-detail-div' });
    const foodName = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('h3', { class: 'food-name' }, item.name);
    const foodPrice = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('p', { class: 'food-price' }, item.price);
    const description = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('p', { class: 'description' }, item.description);
    foodDetailDiv.append(foodName, foodPrice, description);
    listItem.append(imgDiv, foodDetailDiv);
    ul.appendChild(listItem);
  });
  menu.appendChild(ul);
  content.appendChild(menu);
});


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createElem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  const content = document.getElementById('content');

  const contactSection = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('section', { class: 'contact-section' });
  const detailsDiv = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('div', { class: 'contact-div' });
  const detailsDivHeader = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('h2', {}, 'Call Us');
  const phoneNo = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('p', {}, '+254-7-11-234-567');
  detailsDiv.append(detailsDivHeader, phoneNo);

  const formDiv = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('div', { class: 'form-div' });
  const formDivHeader = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('h2', {}, 'Leave Us a Message');
  const form = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('form', {});
  const emailField = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('input', { type: 'email', placeholder: 'Your email here' });
  const messageField = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('textarea', {
    name: 'message', rows: '10', cols: '30', placeholder: 'Your message here',
  });
  const submitButton = (0,_createElem__WEBPACK_IMPORTED_MODULE_0__.default)('input', { type: 'button', value: 'Send Message' });
  form.append(emailField, messageField, submitButton);
  formDiv.append(formDivHeader, form);

  contactSection.append(detailsDiv, formDiv);
  content.appendChild(contactSection);
});


/***/ })
/******/ 	]);
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
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
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
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _assets_js_nav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _assets_js_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _assets_js_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _assets_js_contact__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);







(0,_assets_js_nav__WEBPACK_IMPORTED_MODULE_1__.default)();
(0,_assets_js_home__WEBPACK_IMPORTED_MODULE_2__.default)();

const homePage = document.querySelector('.home-page');
const foodMenu = document.querySelector('.food-menu');
const contactPage = document.querySelector('.contact-page');
const content = document.getElementById('content');

homePage.addEventListener('click', () => {
  content.innerHTML = '';
  (0,_assets_js_home__WEBPACK_IMPORTED_MODULE_2__.default)();
});
foodMenu.addEventListener('click', () => {
  content.innerHTML = '';
  (0,_assets_js_menu__WEBPACK_IMPORTED_MODULE_3__.default)();
});

contactPage.addEventListener('click', () => {
  content.innerHTML = '';
  (0,_assets_js_contact__WEBPACK_IMPORTED_MODULE_4__.default)();
});

})();

/******/ })()
;
//# sourceMappingURL=app.js.map