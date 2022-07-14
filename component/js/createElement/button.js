import { $createElement, $selector, $selectorAll } from "../common/_variables.js";
import { copy } from "../common/view.js";

/**
 * @param {string} title  리스트가 삽입될 곳의 id와 제목
 */
function createBtnWrapper(title) {
  const _li = $createElement("li");
  const _h3 = $createElement("h3");
  const _div = $createElement("div");
  const _titleId = title.replace(/ /g, "");
  _h3.innerText = title[0].toUpperCase() + title.slice(1);
  _div.setAttribute("id", _titleId);
  _div.setAttribute("class", "flex round-box");
  btnComponentList.appendChild(_li);
  _li.appendChild(_h3);
  _li.appendChild(_div);
  return _titleId;
}

/**
 * @param {string} appendTarget 삽입될 곳의 id
 * @param {object} theadTxt 버튼 제목 리스트
 */
function createBtnList(appendTarget, theadTxt) {
  const _target = $selector("#" + appendTarget);
  const _div = $createElement("div");
  const _table = $createElement("table");
  const _thead = $createElement("thead");
  const _tbody = $createElement("tbody");
  const _theadtr = $createElement("tr");
  const _th = $createElement("th");
  const _td = $createElement("td");
  const _button = $createElement("button");
  let _titleHtml = "";
  let _contentHtml = "";
  for (const _key in theadTxt) {
    _titleHtml += "<th>" + theadTxt[_key] + "</th>";
  }
  _theadtr.innerHTML = _titleHtml;
  for (const _sizeKey in btnSize) {
    _contentHtml += "<tr>";
    for (var i = 0; i < 2; i++) {
      _contentHtml += "<th>" + btnSize[_sizeKey] + "</th>";
      for (const _classKey in btnClass) {
        _contentHtml += "<td><button class='btn ";
        switch (btnSize[_sizeKey]) {
          case "Small":
            _contentHtml += "btn-sm ";
            break;
          case "Medium":
            _contentHtml += "btn-md ";
            break;
          case "Large":
            _contentHtml += "btn-lg ";
            break;
        }
        if (appendTarget === "onlyIcon") {
          _contentHtml += btnClass[_classKey] + " radius-sm'></button></td>";
        } else {
          _contentHtml += btnClass[_classKey] + " radius-sm'>Copy</button></td>";
        }
      }
    }
    _contentHtml += "</tr>";
  }
  _tbody.innerHTML = _contentHtml;
  _target.appendChild(_table);
  _table.appendChild(_thead);
  _thead.appendChild(_theadtr);
  _table.appendChild(_tbody);
}

function addIcon() {
  // icon
  let _iconIdArr = btnTitles
    .slice()
    .filter((icon) => icon != "default" && icon != "only Icon")
    .map((icon) => icon.replace(/ /g, ""))
    .sort();
  let _leftIconArr = [],
    _rightIconArr = [];
  _iconIdArr.forEach((element) => {
    _leftIconArr.push($selectorAll("#" + element + " tr td:nth-of-type(n+1):nth-of-type(-n+3) button"));
    _rightIconArr.push($selectorAll("#" + element + " tr td:nth-of-type(n+4):nth-of-type(-n+6) button"));
  });
  function iconStyling(direction) {
    // debugger;
    let _directionIconArr;
    if (direction === "left") {
      _directionIconArr = _leftIconArr;
    } else if (direction === "right") {
      _directionIconArr = _rightIconArr;
    } else {
      _directionIconArr = [];
      _directionIconArr.push($selectorAll("#onlyIcon tr td button"));
    }
    _directionIconArr.forEach((directionNode, nodeIndex) => {
      let _copy_btnIconClass = btnIconClass[nodeIndex].slice(); // 배열 복사
      directionNode.forEach((directionEle, eleIndex) => {
        directionEle.classList.add("ic", "ic-md", direction);
        if (typeof _copy_btnIconClass === "object") {
          //배열 찾기
          if (_copy_btnIconClass.length !== directionNode.length) {
            // 버튼 개수만큼 배열 증가
            _copy_btnIconClass.push(_copy_btnIconClass[eleIndex]);
          }
          if (_copy_btnIconClass[eleIndex].substr(_copy_btnIconClass[eleIndex].length - 1, 1) === "-") {
            //옵션 부여
            _copy_btnIconClass.splice(eleIndex, 1, _copy_btnIconClass[eleIndex] + direction);
          }
          directionEle.classList.add(_copy_btnIconClass[eleIndex]);
        } else {
          directionEle.classList.add(btnIconClass[nodeIndex]);
        }
        if (directionEle.classList.contains("bg-primary")) {
          directionEle.classList.add("white");
        } else {
          directionEle.classList.add("blue");
        }
      });
    });
  }
  iconStyling("left");
  iconStyling("right");
  iconStyling("only-icon");
}

// create element
const btnComponentList = $selector("#buttonComponentList");
const btnThead = ["Inital", "Primary", "Secondary", "Text", "Disabled", "Primary", "Secondary", "Text"];
const iconThead = ["Left Icon", "Primary", "Secondary", "Text", "Right Icon", "Primary", "Secondary", "Text"];
const btnSize = ["Small", "Medium", "Large"];
const btnClass = ["bg-primary", "bd-primary", "txt-primary"];
const btnIconClass = ["add", ["arrow-", "arrow-up", "arrow-down"], ["short-arrow-", "short-arrow-up", "short-arrow-down"], "search"].sort();
const mainTitle = ["default", "only Icon"];
let btnTitles = ["add Icon", "arrow Icon", "short Arrow Icon", "search Icon"];
btnTitles = btnTitles.sort().flat(btnTitles.unshift(mainTitle));
for (const btnTitlekey in btnTitles) {
  const _title = createBtnWrapper(btnTitles[btnTitlekey]);
  if (_title.search("Icon") !== -1) {
    //icon btn
    createBtnList(_title, iconThead);
  } else {
    //default btn
    createBtnList(_title, btnThead);
    // disabled 설정
    const _disabledBtnList = $selectorAll("#" + _title + " tr td:nth-of-type(n+4):nth-of-type(-n+6) button");
    _disabledBtnList.forEach((element) => {
      element.setAttribute("disabled", "disabled");
    });
  }
}
addIcon();

//copy button
const copyBtnList = $selectorAll("#buttonComponentList button");
copyBtnList.forEach((ele) => {
  ele.onclick = function () {
    copy(ele.classList.value);
  };
});
