import { $selector, $selectorAll } from "../common/_variables.js";

/**
 * @param {object} button  select menu title array
 * @param {object} item  select menu content array
 * @param {boolean} error  validation == false  addClass error
 * @param {boolean} itemType  cssType normal or overlap
 * @param {string} eventType  click or hover
 * @param {boolean} icon active icon
 * @param {string} iconSize   icon size
 * @param {string} iconClass  toggle Icon Class
 * @param {string} iconDirection  icon direction
 */
function selectEvent(button, item, error, itemType, eventType, icon, iconSize, iconClass, iconDirection) {
  const _button = button;
  const _item = item;
  const _error = error;
  const _event = eventType;
  const _itemType = itemType;
  const _icon = icon;

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
  if (_itemType) {
    btnMinWidth();
  }
  // item event
  if (icon) {
    if (iconSize === undefined) {
      iconSize = "ic-sm";
    }
    if (iconClass === undefined) {
      iconClass = "check-round blue-on";
    }
    if (iconDirection === undefined) {
      iconDirection = "right";
    }
  }
  for (let i = 0; i < item.children.length; i++) {
    item.children[i].onclick = function () {
      const _this = this;
      for (let j = 0; j < item.children.length; j++) {
        if (item.children[j].classList.contains("active")) {
          item.children[j].setAttribute("class", "");
        }
      }
      _this.classList.add("active");
      button.innerText = _this.innerText;
      if (_itemType) {
        btnMinWidth();
      }
      if (icon) {
        _this.classList.add("ic", iconSize);
        _this.classList += " " + iconClass;
        _this.classList += " " + iconDirection;
      }
      hide();
      if (_error) {
        button.classList.remove("error");
      }
    };
    item.onmouseleave = function () {
      hide();
    };
  }
}

/**
 * @param {string} target  select menu  wrapper element
 * @param {string} option  select type, toggle Icon Class on&off
 */
export function select(target, option) {
  const _this = this;
  _this.option = option;
  const _target = $selector(target);
  const _tag = _target.getElementsByTagName("*");
  let _button;
  let _item;
  let error = false;
  let itemType = false;
  for (let i = 0; i < _tag.length; i++) {
    if (_tag[i].dataset.selectButton) {
      _button = _tag[i];
      if (_tag[i].hasAttribute("class") && _tag[i].classList.contains("error")) {
        error = true;
      }
    } else if (_tag[i].dataset.selectItem) {
      _item = _tag[i];
      if (_tag[i].dataset.selectItem === "overlap" || _tag[i].dataset.selectItem === "full") {
        itemType = true;
      }
    }
  }
  selectEvent(_button, _item, error, itemType, option.eventType, option.icon, option.iconSize, option.iconClass, option.iconDirection);
}
