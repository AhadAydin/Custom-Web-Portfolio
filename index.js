class multimgObj {
  constructor(multimg, images) {
    this.multimg = multimg;
    this.images = images;
  }
}

const App = {
  $: {
    bottom_headers: document.querySelectorAll(".bottom-txt div"),
    abs_headers: document.querySelectorAll(".abs-container h1"),

    nav_container: document.getElementById("navbar-container"),
    nav_bar: document.getElementById("navbar"),
    nav_home: document.querySelector(".nav-home"),
    nav_about: document.querySelector(".nav-about"),
    nav_projects: document.querySelector(".nav-projects"),
    nav_games: document.querySelector(".nav-games"),
    nav_icon: document.querySelector("#navbar i"),

    multimage_containers: document.querySelectorAll(".multimage-container"),
    multimg_objects: [],

    image_displayer: document.querySelector(".image-display-container"),
    image_displayer_img: document.querySelector(
      ".image-display-container-image"
    ),
    id_exit: null,
    id_left: null,
    id_right: null,

    navbar_hide_dist: 600,
  },
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
  states: {
    navbar_hide: false,
    showing_img_index: 0,
    current_multimg_obj_index: 0,
  },
};

for (let i = 0; i < App.$.bottom_headers.length; i++) {
  App.$.bottom_headers[i].addEventListener("mouseover", (event) => {
    App.$.abs_headers[0].classList.add("invincible");

    App.$.abs_headers[1].innerHTML =
      App.$.bottom_headers[i].querySelector("h2").innerHTML;
    App.$.abs_headers[1].classList.remove("invincible");
  });
  App.$.bottom_headers[i].addEventListener("mouseout", (event) => {
    App.$.abs_headers[1].classList.add("invincible");
    App.$.abs_headers[0].classList.remove("invincible");
  });
}

/* NAVBAR BUTTONS */
App.$.nav_home.addEventListener("click", (event) => {
  document.documentElement.scrollTop = 0;
});
App.$.nav_about.addEventListener("click", (event) => {
  document.documentElement.scrollTop = window.innerHeight * 1.12;
});
App.$.nav_projects.addEventListener("click", (event) => {
  document.documentElement.scrollTop = window.innerHeight * 2.16;
});
App.$.nav_games.addEventListener("click", (event) => {
  document.documentElement.scrollTop = window.innerHeight * 6.1;
});

/* NAVBAR MOVEMENTS */
App.$.nav_container.addEventListener("mouseover", (event) => {
  App.$.nav_bar.style.top = 15 + "px";
  App.states.navbar_hide = false;
});
App.$.nav_container.addEventListener("mouseout", (event) => {
  if (document.documentElement.scrollTop > App.$.navbar_hide_dist) {
    App.$.nav_bar.style.top = -32 + "px";
  }
  App.states.navbar_hide = true;
});
document.addEventListener("scroll", (event) => {
  if (document.documentElement.scrollTop <= App.$.navbar_hide_dist) {
    App.$.nav_bar.style.top = 15 + "px";
  } else {
    if (App.states.navbar_hide) App.$.nav_bar.style.top = -32 + "px";
    else App.$.nav_bar.style.top = 15 + "px";
  }
});

/* IMAGE CONTAINERS & VIEWER */
App.$.id_exit = App.$.image_displayer.querySelector(".exit");
App.$.id_right = App.$.image_displayer.querySelector(".right");
App.$.id_left = App.$.image_displayer.querySelector(".left");

for (let i = 0; i < App.$.multimage_containers.length; i++) {
  App.$.multimg_objects.push(
    new multimgObj(
      App.$.multimage_containers[i],
      App.$.multimage_containers[i].querySelectorAll("img")
    )
  );

  App.$.multimage_containers[i].addEventListener("click", (event) => {
    App.states.current_multimg_obj_index = i;
    App.states.showing_img_index = 0;

    App.$.image_displayer_img.src = App.$.multimg_objects[i].images[0].src;

    App.$.image_displayer.classList.remove("hidden");

    if (App.$.multimg_objects[i].images.length > 1)
      App.$.id_right.classList.remove("hidden");
    else App.$.id_right.classList.add("hidden");
    App.$.id_left.classList.add("hidden");
  });
}

document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (!App.$.image_displayer.classList.contains("hidden")) {
    if (event.key == "Escape") {
      imageExit();
    } else if (event.key == "ArrowRight") {
      imageRight();
    } else if (event.key == "ArrowLeft") {
      imageLeft();
    }
  }
});

App.$.id_exit.addEventListener("click", (event) => {
  App.$.image_displayer.classList.add("hidden");
});

App.$.id_right.addEventListener("click", (event) => {
  imageRight();
});
App.$.id_left.addEventListener("click", (event) => {
  imageLeft();
});

function imageExit() {
  App.$.image_displayer.classList.add("hidden");
}
function imageRight() {
  if (
    App.states.showing_img_index + 1 >=
    App.$.multimg_objects[App.states.current_multimg_obj_index].images.length -
      1
  ) {
    App.$.id_right.classList.add("hidden");
  }
  App.states.showing_img_index += 1;

  App.$.image_displayer_img.src =
    App.$.multimg_objects[App.states.current_multimg_obj_index].images[
      App.states.showing_img_index
    ].src;

  if (App.$.id_left.classList.contains("hidden"))
    App.$.id_left.classList.remove("hidden");
}
function imageLeft() {
  if (App.states.showing_img_index - 1 <= 0) {
    App.$.id_left.classList.add("hidden");
  }
  App.states.showing_img_index -= 1;

  App.$.image_displayer_img.src =
    App.$.multimg_objects[App.states.current_multimg_obj_index].images[
      App.states.showing_img_index
    ].src;

  if (App.$.id_right.classList.contains("hidden"))
    App.$.id_right.classList.remove("hidden");
}
