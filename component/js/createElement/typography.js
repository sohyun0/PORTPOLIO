import { $createElement, $selector, $selectorAll } from "../common/_variables.js";
import { copy } from "../common/view.js";

const title = {
  "xxxx-lg": ["2.25rem", "36px"],
  "xxx-lg": ["1.875rem", "30px"],
  "xx-lg": ["1.5rem", "24px"],
  "x-lg": ["1.375rem", "22px"],
  lg: ["1.125rem", "18px"],
  md: ["1rem", "16px"],
  sm: ["0.9375rem", "15px"],
  "x-sm": ["0.875rem", "14px"],
};
const text = {
  "xx-lg": ["1.375rem", "22px"],
  "x-lg": ["1.125rem", "18px"],
  lg: ["1rem", "16px"],
  md: ["0.875rem", "14px"],
  sm: ["0.8125rem", "13px"],
  "x-sm": ["0.75rem", "12px"],
  "xx-sm": ["0.6875rem", "11px"],
};
const weight = [900, 700, 500, 400, 300, 100];
const style = ["lt", "ob"];
const decoration = ["under", "over", "center"];
const align = ["lt", "ct", "rt"];
const mainTitle = ["Headings", "Text Elements", "Font Weight", "Font Style", "Text Decoration", "Text Alignment"];

const typographyComponentList = $selector("#typographyComponentList");

/**
 * @param {string} title  각항목의 리스트가 삽입될 곳의 id와 제목
 */
function createIconWrapper(title) {
  const _h3 = $createElement("h3");
  const _div = $createElement("div");
  const _table = $createElement("table");
  _h3.innerText = title;
  _h3.classList.add("mt30");
  _div.classList.add("round-box");
  title = title[0].toLowerCase() + title.slice(1).replace(/ /g, "");
  _table.setAttribute("id", title);
  typographyComponentList.appendChild(_h3);
  typographyComponentList.appendChild(_div);
  _div.appendChild(_table);
  return title;
}

/**
 * @param {string} cssClass  태그에 삽입할 css class ex)xx-lg, lg
 * @param {object} value  css class에 있는 실제 값  ex) 1rem 16px
 * @param {string} target  리스트가 삽입될 곳의 id와 제목
 */
function loopTag(cssClass, value, target) {
  const _target = $selector("#" + target);
  const _tr = $createElement("tr");
  const _td = $createElement("td");
  if (target === "headings") {
    _td.innerText = "Headings";
    cssClass = "title-fs-" + cssClass;
  } else {
    _td.innerText = "Lorem Ipsum";
    cssClass = "fs-" + cssClass;
  }
  _td.classList.add(cssClass);
  _target.appendChild(_tr);
  _tr.appendChild(_td);
  for (let i = 0; i < value.length; i++) {
    const _td = $createElement("td");
    _td.innerText = value[i];
    _tr.appendChild(_td);
  }
  const _td2 = $createElement("td");
  const _button = $createElement("button");
  _button.setAttribute("type", "button");
  _button.classList.add("btn", "btn-sm", "bd-primary", "radius-sm");
  _button.innerText = "." + cssClass;
  _button.onclick = function () {
    copy(_button.innerText);
  };
  _tr.appendChild(_td2);
  _td2.appendChild(_button);
}
function createFontSize(target, size) {
  const _target = $selector("#" + target);
  if (target === "headings") {
    for (const titleSize of Object.keys(title)) {
      loopTag(titleSize, title[titleSize], target);
    }
  } else {
    for (const textSize of Object.keys(text)) {
      loopTag(textSize, text[textSize], target);
    }
  }
}
/**
 * @param {string} target   리스트가 삽입될 곳의 id
 * @param {object} typo  리스트의 타입ex) title , text, weight
 */
function createTypography(target, typo) {
  const _target = $selector("#" + target);
  for (let i = 0; i < typo.length; i++) {
    const _tr = $createElement("tr");
    const _td = $createElement("td");
    const _td2 = $createElement("td");
    const _button = $createElement("button");
    let _cssClass = "";
    _td.innerText = "Lorem Ipsum";
    switch (target) {
      case "fontWeight":
        _cssClass = "fw-";
        break;
      case "fontStyle":
        _cssClass = "fsy-";
        break;
      case "textDecoration":
        _cssClass = "deco-";
        break;
      case "textAlignment":
        _cssClass = "txt-";
        break;
    }
    _td.classList.add(_cssClass + typo[i]);
    _button.setAttribute("type", "button");
    _button.classList.add("btn", "btn-sm", "bd-primary", "radius-sm");
    _button.innerText = "." + _cssClass + typo[i];
    _button.onclick = function () {
      copy(_button.innerText);
    };
    _target.appendChild(_tr);
    _tr.appendChild(_td);
    _tr.appendChild(_td2);
    _td2.appendChild(_button);
  }
}
for (const mainTitlesKey of mainTitle) {
  const _currentTitle = createIconWrapper(mainTitlesKey);
  switch (_currentTitle) {
    case "headings":
      createFontSize(_currentTitle, title);
      break;
    case "textElements":
      createFontSize(_currentTitle, text);
      break;
    case "fontWeight":
      createTypography(_currentTitle, weight);
      break;
    case "fontStyle":
      createTypography(_currentTitle, style);
      break;
    case "textDecoration":
      createTypography(_currentTitle, decoration);
      break;
    case "textAlignment":
      createTypography(_currentTitle, align);
      break;
  }
}
