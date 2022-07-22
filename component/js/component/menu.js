import { $selector, $selectorAll } from "../common/variables.js";

/**
 * @param {string} eventType  click or hover
 * @param {string} itemType  normal or accordion or nested
 */
function menuEvent(target, eventType, itemType) {
  const _target = target;
  const _event = eventType;
  const _itemType = itemType;
  const _li = _target.getElementsByTagName("li");
  function closeMenu() {
    for (let j = 0; j < _li.length; j++) {
      if (_li[j].firstElementChild.classList.contains("depth")) {
        _li[j].firstElementChild.style.cssText = "display : none;";
      }
    }
  }
  //   open Menu
  for (let i = 0; i < _li.length; i++) {
    if (!_li[i].classList.contains("link")) {
      const _depth = _li[i].firstElementChild;
      if (_event === "click") {
        _li[i].onclick = function () {
          closeMenu();
          if (_depth.classList.contains("depth")) {
            if (_depth.classList.contains("on")) {
              _depth.classList.remove("on");
              _depth.style.cssText = "display : none;";
            } else {
              _depth.classList.add("on");
              _depth.style.cssText = "display : block;";
            }
          }
        };
      } else if (_event === "mouseover" || _event === undefined) {
        _li[i].onmouseover = function () {
          closeMenu();
          if (_depth.classList.contains("depth")) {
            _depth.style.cssText = "display : block;";
          }
        };
        _depth.onmouseleave = function () {
          _depth.style.cssText = "display : none;";
        };
      }
    } else {
      if (_event === "click") {
        _li[i].onclick = function () {
          closeMenu();
        };
      } else if (_event === "mouseover" || _event === undefined) {
        _li[i].onmouseover = function () {
          closeMenu();
        };
      }
    }
  }
}
/**
 * @param {string} target  menu menu  wrapper element
 * @param {string} option  menu type (itemType , eventType)
 */
export function menu(target, option) {
  const _this = this;
  _this.option = option;
  const _target = $selector(target);
  const _tag = _target.getElementsByTagName("*");
  let menuContainer;
  for (let i = 0; i < _tag.length; i++) {
    if (_tag[i].dataset.menuList !== undefined) {
      menuContainer = _tag[i];
    }
  }
  menuEvent(menuContainer, option.eventType, option.itemType);
}
