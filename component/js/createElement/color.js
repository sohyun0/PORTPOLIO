import { $createElement, $selector, $selectorAll } from "../common/_variables.js";
import { copy } from "../common/view.js";

// {colorNun : colorCode}
const grays = {
  25: "#fcfcfc",
  50: "#f9f9fa",
  100: "#f1f2f4",
  200: "#e4e5e8",
  300: "#cccfd3",
  400: "#abafb6",
  500: "#83878f",
  600: "#575c64",
  700: "#414650",
  800: "#242930",
  900: "#0d0d0f",
};
const reds = {
  25: "#fff2f2",
  50: "#ffdfdf",
  100: "#ffb7b7",
  200: "#f38a8a",
  300: "#eb5c5c",
  400: "#ed4848",
  500: "#df2a2a",
  600: "#bb0606",
  700: "#9a0000",
  800: "#750000",
  900: "#530000",
};
const oranges = {
  25: "#fdf4f3",
  50: "#fbe9e7",
  100: "#ffccbc",
  200: "#ffab91",
  300: "#ff8a65",
  400: "#ff7043",
  500: "#ff5722",
  600: "#f4511e",
  700: "#e64a19",
  800: "#d84315",
  900: "#bf360c",
};
const yellows = {
  25: "#fffaf1",
  50: "#fff4de",
  100: "#ffe4ae",
  200: "#ffcd6b",
  300: "#ffbd3d",
  400: "#ffac0b",
  500: "#f99500",
  600: "#e57c00",
  700: "#ae5e00",
  800: "#8f5108",
  900: "#673b06",
};
const browns = {
  25: "#f7f5f4",
  50: "#efebe9",
  100: "#d7ccc8",
  200: "#bcaaa4",
  300: "#a1887f",
  400: "#8d6e63",
  500: "#795548",
  600: "#6d4c41",
  700: "#5d4037",
  800: "#4e342e",
  900: "#3e2723",
};
const limes = {
  25: "#fcfdf3",
  50: "#f9fbe7",
  100: "#f0f4c3",
  200: "#e6ee9c",
  300: "#dce775",
  400: "#d4e157",
  500: "#cddc39",
  600: "#c0ca33",
  700: "#afb42b",
  800: "#9e9d24",
  900: "#827717",
};
const lightGreens = {
  25: "#f0fff5",
  50: "#ddfae6",
  100: "#b2f4c9",
  200: "#8bf4b0",
  300: "#6fef9a",
  400: "#4deb82",
  500: "#30e46c",
  600: "#14df57",
  700: "#00c942",
  800: "#00ab38",
  900: "#00882d",
};
const greens = {
  25: "#EDFCEC",
  50: "#d6f1d4",
  100: "#acdaa8",
  200: "#80c87a",
  300: "#5cbe54",
  400: "#3db033",
  500: "#2ba421",
  600: "#119207",
  700: "#087300",
  800: "#075e00",
  900: "#065100",
};
const teals = {
  25: "#eff8f8",
  50: "#e0f2f1",
  100: "#c5ece8",
  200: "#96dbd4",
  300: "#68d2c8",
  400: "#32c0b3",
  500: "#00b4a3",
  600: "#00a192",
  700: "#00897c",
  800: "#007065",
  900: "#00524a",
};
const cyans = {
  25: "#f7fdfd",
  50: "#e0f7fa",
  100: "#bdeef4",
  200: "#80deea",
  300: "#4dd0e1",
  400: "#02c3db",
  500: "#00b6cd",
  600: "#00a5b9",
  700: "#00909f",
  800: "#00747e",
  900: "#00595c",
};
const lightBlues = {
  25: "#f0faff",
  50: "#e1f5fe",
  100: "#c9eeff",
  200: "#a6e3ff",
  300: "#78d4ff",
  400: "#32befe",
  500: "#03a9f4",
  600: "#0095d9",
  700: "#007fb8",
  800: "#006999",
  900: "#00547a",
};
const blues = {
  25: "#f5faff",
  50: "#eff8ff",
  100: "#d1e9ff",
  200: "#b2ddff",
  300: "#84a6ff",
  400: "#5379fd",
  500: "#2e5bfa",
  600: "#214ad9",
  700: "#203fb0",
  800: "#0f2c92",
  900: "#0c2270",
};
const pinks = {
  25: "#fff2f8",
  50: "#ffdeee",
  100: "#ffc3e0",
  200: "#ff96c8",
  300: "#fa6bb0",
  400: "#ed4093",
  500: "#ea2181",
  600: "#d80068",
  700: "#bb004a",
  800: "#90003f",
  900: "#6a0039",
};
const purples = {
  25: "#f9f2fa",
  50: "#f8e8fb",
  100: "#eed2f3",
  200: "#dcade4",
  300: "#ca7dd7",
  400: "#b656c7",
  500: "#a334b6",
  600: "#8a1b9d",
  700: "#79008d",
  800: "#620073",
  900: "#4f005c",
};
const purpleBlues = {
  25: "#f8f5ff",
  50: "#e9e4f8",
  100: "#d4cbef",
  200: "#b9abe3",
  300: "#a08cda",
  400: "#8b71d7",
  500: "#7356c7",
  600: "#603fbf",
  700: "#4b27b5",
  800: "#3a1c8e",
  900: "#270781",
};

// {colorName : colorObj}
const colorTitles = {
  gray: grays,
  red: reds,
  orange: oranges,
  yellow: yellows,
  brown: browns,
  lime: limes,
  lightGreen: lightGreens,
  green: greens,
  teal: teals,
  cyan: cyans,
  lightBlue: lightBlues,
  blue: blues,
  pink: pinks,
  purple: purples,
  purpleBlue: purpleBlues,
};

const colorComponenList = $selector("#colorComponentList");

/**
 * @param {string} title 색상데이터의 타이틀이자 리스트가 삽입될 곳의 id
 */
function createColorWrapper(title, colorObj) {
  const _h3 = $createElement("h3");
  const _ul = $createElement("ul");
  _h3.innerText = title[0].toUpperCase() + title.slice(1);
  _ul.setAttribute("id", title);
  _ul.setAttribute("class", "flex");
  colorComponenList.appendChild(_h3);
  colorComponenList.appendChild(_ul);
  return [title, colorObj];
}

/**
 * @param {string} appendTarget 삽입될 곳의 id
 * @param {Number} colorNum 색상데이터의 프로퍼티 키
 * @param {string} colorCode 색상데이터의 프로퍼티 값
 */

function createColorList(appendTarget, colorNum, colorCode) {
  const _colorName = appendTarget;
  const _ul = $selector("#" + appendTarget);
  const _li = $createElement("li");
  const _div = $createElement("div");
  const _colorNum = $createElement("p");
  const _colorCode = $createElement("p");
  const _bgCopyBtn = $createElement("button");
  const _fcCopyBtn = $createElement("button");
  _li.style.background = colorCode;
  _colorNum.innerText = colorNum;
  _colorCode.innerText = colorCode;
  _bgCopyBtn.setAttribute("type", "button");
  _fcCopyBtn.setAttribute("type", "button");
  _bgCopyBtn.classList.add("bg-" + _colorName + colorNum);
  _fcCopyBtn.classList.add("fc-" + _colorName + colorNum);
  _bgCopyBtn.innerText = "Copy";
  _fcCopyBtn.innerText = "Copy";
  _ul.appendChild(_li);
  _li.appendChild(_div);
  _div.appendChild(_colorNum);
  _div.appendChild(_colorCode);
  _div.appendChild(_bgCopyBtn);
  _div.appendChild(_fcCopyBtn);
  _colorCode.onclick = function () {
    copy(colorCode);
  };
  _bgCopyBtn.onclick = function () {
    copy("bg-" + _colorName + colorNum);
  };
  _fcCopyBtn.onclick = function () {
    copy("fg-" + _colorName + colorNum);
  };
}
let forinit = 0;
for (const colorTitlekey in colorTitles) {
  const _currentColor = createColorWrapper(Object.getOwnPropertyNames(colorTitles)[forinit], colorTitles[colorTitlekey]);
  for (const colorkey in _currentColor[1]) {
    createColorList(_currentColor[0], colorkey, _currentColor[1][colorkey]);
  }
  forinit++;
}
