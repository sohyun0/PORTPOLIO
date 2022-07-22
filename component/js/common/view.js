/**
 * @param {string} value 팝업으로 노출하고 싶은 대상의 텍스트
 */
function floatingAlert(value) {
  const floatingContent = document.querySelector(".floating-content");
  floatingContent.classList.add("on");
  floatingContent.innerHTML = value + " Copy &#128077";
  setTimeout(() => {
    floatingContent.classList.remove("on");
  }, 1500);
}

/**
 * @param {string} value 복사하고 싶은 대상의 텍스트
 */
export function copy(value) {
  const textarea = document.createElement("textarea"); // execCommand 는 input , textarea 에서만 작동되기때문에 생성후 삭제
  textarea.value = value;
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 9999); // ios 대응 (ios는 범위가 있어야지만 정상동작)
  document.execCommand("copy");
  document.body.removeChild(textarea);
  floatingAlert(value);
}

export function simpleAccordion(element) {
  if (element.classList.contains("on")) {
    element.classList.remove("on");
  } else {
    element.classList.add("on");
  }
}

// example code

// accordion
import { accordion } from "../component/accordion.js";
const accordionM = new accordion(".accordion .accordion.multi", {});
const accordionS = new accordion(".accordion .accordion.single", {
  type: "single",
  iconSize: "ic-sm",
  iconDirection: "right",
  toggleIconClass: "short-arrow-down",
  toggleIconClassOn: "short-arrow-up",
});

// dropdown
import { dropdown } from "../component/dropdown.js";
const dropdown1 = new dropdown(".dropdown.type1", {
  eventType: "click",
  itemType: "normal",
});
const dropdown1_1 = new dropdown(".dropdown.type1-1", {
  eventType: "click",
});
const dropdown1_2 = new dropdown(".dropdown.type1-2", {
  eventType: "mouseover",
});
const dropdown1_3 = new dropdown(".dropdown.type1-3", {});

const dropdown2_1 = new dropdown(".dropdown.type2-1", {
  itemType: "accordion",
});
const dropdown2_1accordionM = new accordion(".dropdown .accordion.multi", {
  multiClose: true,
});
const dropdown2_2 = new dropdown(".dropdown.type2-2", {
  itemType: "nested",
});

//menu

import { menu } from "../component/menu.js";
const menu1_1 = new menu(".menu.type1-1", {});
const menu1_2 = new menu(".menu.type1-2", {
  eventType: "click",
});

// select
import { select } from "../component/select.js";
const selectbox1 = new select(".select.type1", {
  eventType: "click",
  icon: true,
  iconSize: "ic-sm",
  iconClass: "check-round blue-on",
  iconDirection: "right",
});
const selectbox1_1 = new select(".select.type1-1", {
  icon: true,
});
const selectbox1_2 = new select(".select.type1-2", {});

const selectbox2 = new select(".select.type2", {
  icon: true,
});
const selectbox2_1 = new select(".select.type2-1", {
  icon: true,
});
