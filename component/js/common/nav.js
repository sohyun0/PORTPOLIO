// nav style event
const navBtns = document.querySelectorAll(".sidebar button");
const iconBtns = document.querySelectorAll(".sidebar button .ic");
const tabContent = document.querySelectorAll(".tab-content");
//create event
navBtns.forEach((btn, ind) => {
  btn.onclick = function () {
    // text style change
    navBtns.forEach((btn) => {
      btn.classList.remove("active");
      if (!this.classList.contains("active")) {
        this.classList.add("active");
      }
    });
    //icon style change
    iconBtns.forEach((icon) => {
      icon.classList.remove("on");
      if (!this.firstElementChild.classList.contains("on")) {
        this.firstElementChild.classList.add("on");
      }
    });
    //content view (tab event)
    tabContent.forEach((tab) => {
      tab.classList.remove("on");
    });
    console.log(tabContent[ind]);
    if (!tabContent[ind].classList.contains("on")) {
      tabContent[ind].classList.add("on");
      window.scrollTo(0, 0);
    }
  };
});

//nav narrow <-> wide

const narrowBtn = document.querySelector("nav .narrow");
narrowBtn.onclick = function () {
  const nav = document.querySelector("nav");
  const container = document.querySelector(".container");
  if (nav.classList.contains("wide")) {
    this.classList.remove("on");
    nav.classList.remove("wide");
    container.classList.remove("wide");
  } else {
    this.classList.add("on");
    nav.classList.add("wide");
    container.classList.add("wide");
  }
};

function goSection(_target) {
  for (let i = 0; i < navBtns.length; i++) {
    if (navBtns[i].innerText === _target) {
      navBtns[i].classList.add("active");
      navBtns[i].firstElementChild.classList.add("on");
      tabContent[i].classList.add("on");
      window.scrollTo(0, 0);
    } else {
      if (navBtns[i].classList.contains("active")) {
        navBtns[i].classList.remove("active");
        navBtns[i].firstElementChild.classList.remove("on");
        tabContent[i].classList.remove("on");
      }
    }
  }
}
