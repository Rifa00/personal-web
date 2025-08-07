// Function Global

function $(slc) {
  return document.querySelector(slc);
}
function All(slc) {
  return document.querySelectorAll(slc);
}

function Add(slc, cls) {
  $(slc).classList.add(cls);
}
function Rmv(slc, cls) {
  $(slc).classList.remove(cls);
}

// Script Form Contact

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwaoJ0e7YjGdBYMkSCJ90ZufdHVUemr9okPsQrkAAYKqczcFuMifKExrCiodHCSxwDBXw/exec ";
const form = document.forms["form_contact"];
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

  $("#loading").classList.add("show");
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      $("#loading").classList.remove("show");
      success();
      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => {
      $("#loading").classList.remove("show");
      error();
      console.error("Error!", error.message);
      form.reset();
    });
});

// Logo Reload

$(".logo").addEventListener("click", function () {
  location.reload();
});

// Light Mode

let tema = localStorage.getItem("tema");
if (!tema) {
  localStorage.setItem("tema", "dark");
}

$(".togle span").addEventListener("click", function () {
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
  Add("body", "light");
  $(".togle span").innerHTML = "Dark Mode!";
  localStorage.setItem("tema", "light");
}
function darkMode() {
  Rmv("body", "light");
  $(".togle span").innerHTML = "Light Mode!";
  localStorage.setItem("tema", "dark");
}

// Anim Scroll

let hasRun = false;
window.addEventListener("scroll", function () {
  const threshold = window.innerHeight / 2;
  All(".page-active").forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= threshold && rect.bottom >= threshold) {
      section.classList.add("hover");
      All("nav ul li a").forEach((link) => {
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
    All(".home-container section").forEach(function (section, i) {
      setTimeout(function () {
        section.classList.add("apr");
      }, i * 300);
    });
  }

  // progress bar
  if (!hasRun && dScroll > $(".progres").offsetTop - point2) {
    function moveMeter(id, target, speed) {
      let value = 0;
      let interval = setInterval(frame, speed);

      function frame() {
        if (value >= target) {
          clearInterval(interval);
        } else {
          value++;
          $(`#${id}`).value = value;
        }
      }
    }

    function updateProgress() {
      All("meter").forEach(function (meter, i) {
        if (!meter.classList.contains("animated")) {
          meter.classList.add("animated");
        }

        const target = [80, 82, 55, 50];
        moveMeter(meter.id, target[i], 20);
      });
    }
    updateProgress();
    hasRun = true;
  }
  // portofolio
  if (dScroll > $("#portofolio").offsetTop - point1) {
    All(".photo").forEach(function (photo, i) {
      setTimeout(function () {
        photo.classList.add("appe");
      }, i * 300);
    });
  }
});

// Experience Sertificate

let iPhoto = 0;
const photos = [
  "assets/img/certificate1.jpg",
  "assets/img/certificate2.jpg",
  "assets/img/certificate3.jpg",
  "assets/img/certificate4.jpg",
  "assets/img/certificate5.jpg",
];
function updatePhotos() {
  Add("#photo1", "hidden");
  Add("#photo2", "hidden");
  setTimeout(() => {
    $("#photo1").src = photos[iPhoto];
    $("#href").href = photos[iPhoto];
    $("#photo2").src = photos[iPhoto];
    Rmv("#photo1", "hidden");
    Rmv("#photo2", "hidden");
  }, 1000);
}

$("#photo1").src = photos[iPhoto];
$("#photo2").src = photos[(iPhoto + 1) % photos.length];
setInterval(nextPhoto, 18000);

function nextPhoto() {
  iPhoto = (iPhoto + 1) % photos.length;
  updatePhotos();
}

function prevPhoto() {
  iPhoto = (iPhoto - 1 + photos.length) % photos.length;
  updatePhotos();
}

// Anim Width This

if (innerWidth <= 991) {
  Add("#header", "sticky");
  Rmv("#header", "unsticky");
  Add("#header nav", "scrolled");
  Add(".main-page", "appear");
  Add(".logo img", "scrolled");
  $(".togle").style = "display:block; margin:auto;";

  $(".read-more-btn").addEventListener("click", function () {
    if ($(".long-text").style.display === "none") {
      $(".long-text").style.display = "block";
      ".read-more-btn".textContent = "Less ?";
    } else {
      $(".long-text").style.display = "none";
      $(".read-more-btn").textContent = "In full ?";
    }
  });
} else {
  window.addEventListener("scroll", function () {
    let off = this.scrollY;
    if (off >= 500) {
      Add("#header", "sticky");
      Rmv("#header", "unsticky");
      Add("#header nav", "scrolled");
      Add(".main-page", "appear");
      Add(".logo img", "scrolled");
      $(".togle").style = "display:none";
    } else {
      Rmv("#header", "sticky");
      Add("#header", "unsticky");
      Rmv("#header nav", "scrolled");
      Rmv(".main-page", "appear");
      Rmv(".logo img", "scrolled");
      $(".togle").style = "display:block";
    }
  });
  $(".long-text").style.display = "block";
  $(".read-more-btn").style.display = "none";
}
// Write Effetc
const txt = "Please click for more informaition...";
let i = 0;

function typeWrite() {
  if (i < txt.length) {
    $("#text").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWrite, 100);
  }
}
setTimeout(typeWrite, 2000);

// Select Portofolio
function select(category) {
  var elements = All(".photo");

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

All("#btn-clip").forEach((i) => {
  i.addEventListener("click", function () {
    const linkInput = $("#linkToCopy");
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Link berhasil disalin: " + linkInput.value);
  });
});

// Menu Toggle

$(".menu-togle").addEventListener("click", () => {
  $("nav ul").classList.toggle("hidden");
});
$("nav ul").addEventListener("click", function () {
  $("#checkbox").checked = !$("#checkbox").checked;
  $("nav ul").classList.toggle("hidden");
});

// AOS

function updateAos() {
  if (window.innerWidth <= 768) {
    All(".my-element").forEach((el) => {
      el.setAttribute("data-aos", "fade-up");
    });
  } else {
    All(".my-element").forEach((el) => {
      el.setAttribute("data-aos", "fade-right");
    });
  }
  AOS.refresh();
}

updateAos();

window.addEventListener("resize", updateAos);

AOS.init({
  duration: 500,
  offset: 200,
  once: true,
});

// strart process crud
// const API_URL =
//   "https://script.google.com/macros/s/AKfycbxg8WkMHDJ0NnGPpXFOTr9_J9KRc6MQoGsYT8WjMsTjl_lzPRoUcJglNRx8v5k8ktnXlw/exec ";

// const secAdd = document.getElementById("add");

// document.getElementById("btn-add").addEventListener("click", () => {
//   secAdd.classList.remove("hidden");
// });
// document.querySelector(".close").addEventListener("click", () => {
//   secAdd.classList.add("hidden");
//   localStorage.removeItem("key");
//   location.reload();
// });

// const secKey = document.getElementById("sec-key");
// const secData = document.getElementById("sec-data");
// document.getElementById("form-key").addEventListener("submit", (e) => {
//   e.preventDefault();
//   const key = document.getElementById("key").value;
//   if (key !== "XFF$$") {
//     return alert(`Key ${key} tidak valid!!`);
//   } else {
//     secKey.classList.add("hidden");
//     secData.classList.remove("hidden");
//     localStorage.setItem("key", key);
//   }
// });

// if (localStorage.getItem("key")) {
//   secKey.classList.add("hidden");
//   secData.classList.remove("hidden");
// } else {
//   secKey.classList.remove("hidden");
//   secData.classList.add("hidden");
// }

// let base64URL;
// document.getElementById("file").addEventListener("change", function () {
//   document.getElementById("load").classList.remove("hidden");
//   const btn = document.getElementById("btn-lg");
//   const file = this.files[0];
//   if (file) {
//     // Cek apakah file adalah gambar berdasarkan ekstensi atau MIME type
//     const validImageTypes = [
//       "image/jpeg",
//       "image/png",
//       "image/gif",
//       "image/webp",
//     ];

//     if (validImageTypes.includes(file.type)) {
//       btn.setAttribute("type", "button");
//       btn.style.opacity = "30%";
//       const reader = new FileReader();
//       reader.onload = function (e) {
//         base64URL = e.target.result; // URL Base64
//       };
//       reader.readAsDataURL(file);
//     } else {
//       document.getElementById("load").classList.add("hidden");
//       btn.setAttribute("type", "submit");
//       btn.style.opacity = "100%";
//       document.getElementById("file").value = "";
//       return alert("Pilih file foto yang lain!!");
//     }
//   }
//   document.getElementById("load").classList.add("hidden");
//   btn.setAttribute("type", "submit");
//   btn.style.opacity = "100%";
// });

// document.getElementById("form-data").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   loading.classList.add("show");
//   if (!base64URL) {
//     return alert("File belum dimasukan!");
//   }
//   const id = document.getElementById("id").value;
//   const kry = document.getElementById("kry").value;
//   const link = document.getElementById("link-url").value;
//   const judul = document.getElementById("judul").value;
//   const deskripsi = document.getElementById("deskripsi").value;
//   const now = new Date();
//   const day = String(now.getDate()).padStart(2, "0");
//   const month = String(now.getMonth() + 1).padStart(2, "0");
//   const year = now.getFullYear();
//   const formatedDate = `${day}-${month}-${year}`;
//   const linkUrl = link ? link : "Link tidak tersedia!!";
//   const action = id ? "update" : "create";

//   const response = await fetch(API_URL, {
//     method: "POST",
//     body: JSON.stringify({
//       action,
//       base64URL,
//       kry,
//       linkUrl,
//       judul,
//       deskripsi,
//       formatedDate,
//     }),
//   });
//   console.log(await response.text());
//   c();
//   fetch();
//   reloadData();
//   loading.classList.remove("show");
//   console.log(items);
// });

// async function fetchData() {
//   const response = await fetch(API_URL);
//   const items = await response.json();

//   const data = document.querySelector("tbody");
//   data.innerHTML = "";
//   let i = 1;

//   items.forEach((row) => {
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//      <td onclick="e(${row[0]},'${row[1]}','${row[2]}','${row[3]}','${
//       row[4]
//     }','${row[5]}')">${i++}. ${row[4].toLowerCase()}</td>
//      <td id="h" onclick="h(${row[0]})">x</td>
//     `;
//     data.appendChild(tr);
//   });
// }
// fetchData();

// async function reloadData() {
//   const dataPorto = document.querySelector(".porto-container");
//   dataPorto.innerHTML = "";
//   const response = await fetch(API_URL);
//   const items = await response.json();
//   items.forEach((row) => {
//     let stringTgl = row[6];
//     let [year, month, day] = stringTgl.split("-");
//     let mon = new Date(year, month - 1).toLocaleString("en", {
//       month: "short",
//     });
//     const div = document.createElement("div");
//     div.innerHTML = `
//     <div class="photo appe ${row[2]}">
//               <label
//                 ><p id="bln">${mon}</p>
//                 <p id="tgl">${dayjs(day).format("DD")}</p></label
//               >
//               <img src="${row[1]}" />
//               <div class="info-porto">
//               <div><a id="link" href="${
//                 row[3]
//               }"><input type="text" id="linkToCopy" value="${
//       row[3]
//     }" readonly/></a><i id="btn-clip" class="fa-solid fa-link"></i></div>
//                 <span id="o-judul">${row[4]}</span>
//                 <blockquote id="o-deskripsi">${row[5]}
//                   <span> @ dibuat pada tahun ${year}</span>
//                 </blockquote>
//               </div>
//             </div>
//   `;
//     dataPorto.appendChild(div);
//   });
// }
// reloadData();

// document.querySelectorAll("#btn-clip").forEach((i) => {
//   i.addEventListener("click", function () {
//     const linkInput = document.getElementById("linkToCopy");
//     linkInput.select();
//     linkInput.setSelectionRange(0, 99999);
//     document.execCommand("copy");
//     alert("Link berhasil disalin: " + linkInput.value);
//   });
// });

// function e(id, base, kry, link, judul, deskripsi) {
//   base64URL = base;
//   document.getElementById("id").value = id;
//   document.getElementById("kry").value = kry;
//   document.getElementById("link-url").value = link;
//   document.getElementById("judul").value = judul;
//   document.getElementById("deskripsi").value = deskripsi;
// }
// function c() {
//   document.getElementById("id").value = "";
//   document.getElementById("file").value = "";
//   document.getElementById("link-url").value = "";
//   document.getElementById("judul").value = "";
//   document.getElementById("deskripsi").value = "";
// }
// async function h(id) {
//   loading.classList.add("show");
//   const response = await fetch(API_URL, {
//     method: "POST",
//     body: JSON.stringify({ action: "delete", id }),
//   });
//   console.log(await response.text());
//   fetch();
//   reloadData();
//   loading.classList.remove("show");
// }

// end process crud
