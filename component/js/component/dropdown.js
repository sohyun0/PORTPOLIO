import { $selector, $selectorAll } from "../common/_variables.js";

/**
 * @param {object} button  dropdown menu title array
 * @param {object} item  dropdown menu content array
 * @param {string} eventType  click or hover
 * @param {string} itemType  normal or accordion or nested
 */
function dropdownEvent(button, item, eventType, itemType) {
  const _button = button;
  const _item = item;
  const _event = eventType;
  const _itemType = itemType;

  //   button event
  function show() {
    button.classList.add("on");
    item.classList.add("on");
  }
  function hide() {
    button.classList.remove("on");
    item.classList.remove("on");
  }
  function btnMinWidth() {
    const _minWidth = button.clientWidth;
    button.nextElementSibling.style.cssText = "min-width : " + (_minWidth + 3) + "px";
  }
  if (_event === "click" || _event === undefined) {
    button.onclick = function () {
      if (!button.classList.contains("on")) {
        show();
      } else {
        hide();
      }
    };
  } else if (_event === "mouseover") {
    button.onmouseover = function () {
      if (!button.classList.contains("on")) {
        show();
      } else {
        hide();
      }
    };
  }
  btnMinWidth();
  if (_itemType === "normal" || _itemType === undefined) {
    for (let i = 0; i < item.children.length; i++) {
      item.children[i].onclick = function () {
        const _this = this;
        for (let j = 0; j < item.children.length; j++) {
          if (item.children[j].classList.contains("active")) {
            item.children[j].setAttribute("class", "");
          }
        }
        _this.classList.add("active");
        hide();
      };
    }
  } else if (_itemType === "accordion") {
    const _accordionBody = item.children;
    let _body = [];
    for (let i = 0; i < _accordionBody.length; i++) {
      if (_accordionBody[i].dataset.accordionBody) {
        for (let j = 0; j < _accordionBody[i].children.length; j++) {
          _body.push(_accordionBody[i].children[j]);
        }
      }
    }
    for (let i = 0; i < _body.length; i++) {
      _body[i].onclick = function () {
        const _this = this;
        for (let j = 0; j < _body.length; j++) {
          if (_body[j].classList.contains("active")) {
            _body[j].setAttribute("class", "");
          }
        }
        _this.classList.add("active");
        hide();
      };
    }
  }
  item.onmouseleave = function () {
    hide();
  };
}

/**
 * @param {string} target  dropdown menu  wrapper element
 * @param {string} option  dropdown type, toggle Icon Class on&off
 */
export function dropdown(target, option) {
  const _this = this;
  _this.option = option;
  const _target = $selector(target);
  const _tag = _target.getElementsByTagName("*");
  let _button;
  let _item;
  for (let i = 0; i < _tag.length; i++) {
    if (_tag[i].dataset.dropdownButton) {
      _button = _tag[i];
    } else if (_tag[i].dataset.dropdownItem) {
      _item = _tag[i];
    }
  }
  dropdownEvent(_button, _item, option.eventType, option.itemType);
}
