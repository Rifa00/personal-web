// script form contact

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwaoJ0e7YjGdBYMkSCJ90ZufdHVUemr9okPsQrkAAYKqczcFuMifKExrCiodHCSxwDBXw/exec ";
const form = document.forms["form_contact"];
const loading = document.getElementById("loading");
function success() {
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: "Your operation was completed.",
  });
}
function error() {
  Swal.fire({
    icon: "error",
    title: "Error!",
    text: "Something went wrong. Please try again later.",
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // proses Loading
  loading.classList.add("show");
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      // loading
      loading.classList.remove("show");
      success();
      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => {
      loading.classList.remove("show");
      error();
      console.error("Error!", error.message);
      form.reset();
    });
});

// logo refresh
const refresh = document.querySelector("#header .logo");

refresh.addEventListener("click", function () {
  location.reload();
});

const togle = document.querySelector(".togle span");

let tema = localStorage.getItem("tema");
if (!tema) {
  localStorage.setItem("tema", "dark");
}

togle.addEventListener("click", function () {
  tema = localStorage.getItem("tema");
  if (tema === "dark") {
    lightMode();
  } else {
    darkMode();
  }
});

if (tema === "light") {
  lightMode();
}

function lightMode() {
  document.body.classList.add("light");
  togle.innerHTML = "Dark Mode!";
  localStorage.setItem("tema", "light");
}
function darkMode() {
  document.body.classList.remove("light");
  togle.innerHTML = "Light Mode!";
  localStorage.setItem("tema", "dark");
}

const sections = document.querySelectorAll(".page-active");
const navLinks = document.querySelectorAll("nav ul li a");

const h1 = document.querySelector("#jumbotron .hero-name h1 ");

const home = document.getElementById("home");
const section = document.querySelectorAll(" .home-container section");

const progres = document.querySelector(".progres");
let hasRun = false;

const portofolio = document.getElementById("portofolio");
const photo = document.querySelectorAll(".photo");

window.addEventListener("scroll", function () {
  // (nav) halaman aktif

  const threshold = window.innerHeight / 2;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= threshold && rect.bottom >= threshold) {
      section.classList.add("hover");
      navLinks.forEach((link) => {
        if (link.getAttribute("href").substring(1) === section.id) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    } else {
      section.classList.remove("active");
    }
  });

  let vheight = this.innerHeight;
  let theight = 60;
  let point1 = (theight / 100) * vheight;
  let point2 = (theight / 60) * vheight;

  let dScroll = this.window.scrollY;
  if (dScroll > home.offsetTop - point1) {
    // home
    section.forEach(function (section, i) {
      setTimeout(function () {
        section.classList.add("apr");
      }, i * 300);
    });
  }
  // portofolio
  if (dScroll > portofolio.offsetTop - point1) {
    photo.forEach(function (photo, i) {
      setTimeout(function () {
        photo.classList.add("appe");
      }, i * 300);
    });
  }
  // progress bar

  if (!hasRun && dScroll > progres.offsetTop - point2) {
    function moveMeter(id, target, speed) {
      let meter = document.getElementById(id);
      let value = 0;
      let interval = setInterval(frame, speed);

      function frame() {
        if (value >= target) {
          clearInterval(interval);
        } else {
          value++;
          meter.value = value;
        }
      }
    }

    function updateProgress() {
      const meters = document.querySelectorAll("meter");
      meters.forEach(function (meter, index) {
        if (!meter.classList.contains("animated")) {
          meter.classList.add("animated");
        }

        const target = [80, 82, 55, 50];
        moveMeter(meter.id, target[index], 20);
      });
    }
    updateProgress();
    hasRun = true; // Set variabel agar fungsi tidak dijalankan lagi setelah pertama kali
  }
});

// write
const txt = "Please click for more informaition...";
const write = document.getElementById("text");
let i = 0;

function typeWrite() {
  if (i < txt.length) {
    write.innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWrite, 100);
  }
}
setTimeout(typeWrite, 2000);

// select portofolio
function select(category) {
  var elements = document.getElementsByClassName("photo");

  for (var i = 0; i < elements.length; i++) {
    if (category === "all") {
      elements[i].classList.remove("show");
    } else {
      if (elements[i].className.indexOf(category) > -1) {
        elements[i].classList.add("show");
      } else {
        elements[i].classList.remove("show");
      }
    }
  }
}
select("all");

// certificate expe

let currentPhotoIndex = 0;
const photos = [
  "assets/img/certificate1.jpg",
  "assets/img/certificate2.jpg",
  "assets/img/certificate3.jpg",
  "assets/img/certificate4.jpg",
  "assets/img/certificate5.jpg",
];
const photo1 = document.getElementById("photo1");
const photo2 = document.getElementById("photo2");
const hrf = document.getElementById("href");

function updatePhotos() {
  const nextPhotoIndex = (currentPhotoIndex + 1) % photos.length;

  // Add hidden class to photos for transition
  photo1.classList.add("hidden");
  photo2.classList.add("hidden");

  setTimeout(() => {
    // Update photo sources after transition
    photo1.src = photos[currentPhotoIndex];
    hrf.href = photos[currentPhotoIndex];
    photo2.src = photos[nextPhotoIndex];

    // Remove hidden class to show new photos
    photo1.classList.remove("hidden");
    photo2.classList.remove("hidden");
  }, 1000); // Match this duration with CSS transition duration
}

function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
  updatePhotos();
}

function prevPhoto() {
  currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
  updatePhotos();
}

// Initial load
photo1.src = photos[currentPhotoIndex];
photo2.src = photos[(currentPhotoIndex + 1) % photos.length];

// Automatically click nextPhoto every 10 seconds
setInterval(nextPhoto, 18000);

// inner  whidth <
// animasi scroll

const sticky = document.getElementById("header");
const navbar = document.querySelector("#header nav");
const landing = document.querySelector(".main-page");
const logo = document.querySelector(".logo img");
const mode = document.querySelector(".togle");
const longText = document.querySelector(".long-text");
const buttonText = document.querySelector(".read-more-btn");

if (innerWidth <= 991) {
  sticky.classList.add("sticky");
  sticky.classList.remove("unsticky");
  navbar.classList.add("scrolled");
  landing.classList.add("appear");
  logo.classList.add("scrolled");
  mode.style = "display:block; margin:auto;";
  buttonText.addEventListener("click", function () {
    if (longText.style.display == "none") {
      longText.style.display = "block";
      buttonText.textContent = "Less ?";
    } else {
      longText.style.display = "none";
      buttonText.textContent = "In full ?";
    }
  });
} else {
  // anim nav
  window.addEventListener("scroll", function () {
    let off = this.scrollY;
    if (off >= 500) {
      sticky.classList.add("sticky");
      sticky.classList.remove("unsticky");
      navbar.classList.add("scrolled");
      landing.classList.add("appear");
      logo.classList.add("scrolled");
      mode.style = "display:none";
    } else {
      sticky.classList.remove("sticky");
      sticky.classList.add("unsticky");
      navbar.classList.remove("scrolled");
      landing.classList.remove("appear");
      logo.classList.remove("scrolled");
      mode.style = "display:block";
    }
  });
  longText.style.display = "block";
  buttonText.style.display = "none";
}

// menu togle
const menuTogle = document.getElementsByClassName("menu-togle")[0];
const menu = document.querySelector("ul");
const checkbox = document.getElementById("checkbox");

menuTogle.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

menu.addEventListener("click", function () {
  checkbox.checked = !checkbox.checked;
  menu.classList.toggle("hidden");
});

// belum

function updateAos() {
  const elements = document.querySelectorAll(".my-element");
  if (window.innerWidth <= 768) {
    // ukuran layar untuk mobile
    elements.forEach((el) => {
      el.setAttribute("data-aos", "fade-up");
    });
  } else {
    elements.forEach((el) => {
      el.setAttribute("data-aos", "fade-right");
    });
  }
  AOS.refresh(); // Refresh AOS untuk menerapkan perubahan
}

// Panggil fungsi saat pertama kali halaman dimuat
updateAos();

// Panggil fungsi setiap kali ukuran layar berubah
window.addEventListener("resize", updateAos);

// Inisialisasi AOS

AOS.init({
  duration: 500, // durasi animasi dalam milidetik
  offset: 200, // jarak (px) sebelum animasi dimulai
  once: true, // animasi hanya dijalankan sekali
});
        
