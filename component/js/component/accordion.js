import { $selector, $selectorAll } from "../common/_variables.js";

/**
 * @param {object} header  accordion menu title array
 * @param {object} body  accordion menu content array
 * @param {string} type  single or multi
 * @param {boolean} multiClose  body click close
 * @param {string} toggleIconClass  toggle Icon Class
 * @param {string} toggleIconClassOn  toggle Icon Class On
 */
function accordionEvent(header, body, type, multiClose, iconSize, iconDirection, toggleIconClass, toggleIconClassOn) {
  const _header = header;
  const _body = body;
  let _multiClose = multiClose;
  if (iconSize === undefined) {
    iconSize = "ic-sm";
  }
  if (iconDirection === undefined) {
    iconDirection = "right end";
  }
  if (toggleIconClass === undefined) {
    toggleIconClass = "short-arrow-down";
  }
  if (toggleIconClassOn === undefined) {
    toggleIconClassOn = "short-arrow-up";
  }
  if (_multiClose === undefined) {
    _multiClose = false;
  }
  for (let i = 0; i < _header.length; i++) {
    _header[i].classList.add("ic", iconSize);
    _header[i].classList += " " + iconDirection;
    _header[i].classList += " " + toggleIconClass;
    _header[i].onclick = function () {
      if (type !== "single") {
        for (let j = 0; j < _header.length; j++) {
          if (i !== j) {
            _header[j].dataset.accordionToggle = "false";
            _body[j].classList.remove("on");
            if (_header[j].classList.contains("ic")) {
              _header[j].classList.remove(toggleIconClassOn);
              _header[j].classList.add(toggleIconClass);
            } else if (_header[j].getElementsByClassName("ic").length !== 0) {
              const _ic = _header[i].getElementsByClassName("ic")[0].classList;
              _ic.remove(toggleIconClassOn);
              _ic.add(toggleIconClass);
            }
          }
        }
      }
      const _this = this;
      _this.dataset.accordionToggle === "true" ? (_this.dataset.accordionToggle = "false") : (_this.dataset.accordionToggle = "true");
      _body[i].classList.contains("on") ? _body[i].classList.remove("on") : _body[i].classList.add("on");
      // 아이콘이 본인 클래스에 있을 때
      if (_header[i].classList.contains("ic")) {
        if (_this.dataset.accordionToggle === "true") {
          _header[i].classList.remove(toggleIconClass);
          _header[i].classList.add(toggleIconClassOn);
        } else {
          _header[i].classList.remove(toggleIconClassOn);
          _header[i].classList.add(toggleIconClass);
        }
      } else if (_header[i].getElementsByClassName("ic").length !== 0) {
        // 아이콘이 자식으로 갔을때
        const _ic = _header[i].getElementsByClassName("ic")[0].classList;
        if (_this.dataset.accordionToggle === "true") {
          _ic.remove(toggleIconClass);
          _ic.add(toggleIconClassOn);
        } else {
          _ic.remove(toggleIconClassOn);
          _ic.add(toggleIconClass);
        }
      }
    };
    if (_multiClose) {
      _body[i].onclick = function () {
        _header[i].dataset.accordionToggle = "false";
        _header[i].classList.remove(toggleIconClassOn);
        _header[i].classList.add(toggleIconClass);
        _body[i].classList.remove("on");
      };
    }
  }
}

/**
 * @param {string} target  accordion menu  wrapper element
 * @param {string} option  accordion type, toggle Icon Class on&off
 */
export function accordion(target, option) {
  const _this = this;
  _this.option = option;
  const _target = $selector(target);
  const _tag = _target.getElementsByTagName("*");
  let _header = [];
  let _body = [];
  for (let i = 0; i < _tag.length; i++) {
    if (_tag[i].dataset.accordionHeader) {
      _header.push(_tag[i]);
    } else if (_tag[i].dataset.accordionBody) {
      _body.push(_tag[i]);
    }
  }
  accordionEvent(_header, _body, option.type, option.multiClose, option.iconSize, option.iconDirection, option.toggleIconClass, option.toggleIconClassOn);
}
