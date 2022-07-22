import { $selector, $selectorAll } from "../common/variables.js";

/**
 * @param {object} button  dropdown menu title array
 * @param {object} item  dropdown menu content array
 * @param {string} eventType  click or hover
 * @param {string} itemType  normal or accordion or nested
 */
function dropdownEvent(button, item, eventType) {
  const _button = button;
  const _item = item;
  const _event = eventType;
  const _itemType = _item.dataset.dropdownItem;

  //   button event
  function show() {
    _button.classList.add("on");
    _item.classList.add("on");
  }
  function hide() {
    _button.classList.remove("on");
    _item.classList.remove("on");
  }
  function btnMinWidth() {
    const _minWidth = _button.clientWidth;
    _button.nextElementSibling.style.cssText = "min-width : " + (_minWidth + 3) + "px";
  }
  if (_event === "click" || _event === undefined) {
    _button.onclick = function () {
      if (!_button.classList.contains("on")) {
        show();
      } else {
        hide();
      }
    };
  } else if (_event === "mouseover") {
    _button.onmouseover = function () {
      if (!_button.classList.contains("on")) {
        show();
      } else {
        hide();
      }
    };
  }
  btnMinWidth();
  if (_itemType === "normal" || _itemType === undefined) {
    for (let i = 0; i < _item.children.length; i++) {
      _item.children[i].onclick = function () {
        for (let j = 0; j < _item.children.length; j++) {
          if (_item.children[j].classList.contains("active")) {
            _item.children[j].setAttribute("class", "");
          }
        }
        _this.classList.add("active");
        hide();
      };
    }
  } else if (_itemType === "accordion") {
    const _accordionBody = _item.children;
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
  } else if (_itemType === "nested") {
    const _itemOpen = _item.querySelectorAll(".depth-open");
    for (let i = 0; i < _itemOpen.length; i++) {
      _itemOpen[i].onclick = function () {
        const _this = this;
        const _child = _this.firstElementChild;
        if (_child.classList.contains("depth")) {
          _child.classList.add("on");
          const width = _this.clientWidth;
          _this.firstElementChild.style.cssText = "left:" + width + "px";
        }
      };
      _itemOpen[i].onmouseleave = function () {
        const _this = this;
        if (_this.firstElementChild.classList.contains("on")) {
          _this.firstElementChild.classList.remove("on");
        }
      };
    }
  }
  item.onmouseleave = function () {
    hide();
  };
}

/**
 * @param {string} target  dropdown menu  wrapper element
 * @param {string} option  dropdown type(itemType , eventType)
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
  dropdownEvent(_button, _item, option.eventType);
}
