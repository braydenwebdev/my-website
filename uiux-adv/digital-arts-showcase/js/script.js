/**
 * Digital Arts Showcase — Main JavaScript
 * Handles navigation, Fancybox, footer year, and Google Maps.
 */

/* ----------------------------------------------------
   MOBILE NAVIGATION TOGGLE
---------------------------------------------------- */
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");
const icon = document.querySelector(".nav-toggle-icon");

// Remove hidden so CSS can animate it
if (navList) {
  navList.hidden = false;
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute("aria-expanded", !expanded);
    navList.classList.toggle("show");
    icon.classList.toggle("active");
  });
}

/* ----------------------------------------------------
   FANCYBOX LIGHTBOX
---------------------------------------------------- */
if (typeof Fancybox === "function") {
  Fancybox.bind("[data-fancybox]", {});
}

/* ----------------------------------------------------
   AUTO YEAR IN FOOTER
---------------------------------------------------- */
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* ----------------------------------------------------
   GOOGLE MAPS INTEGRATION
   Only loads if #map exists on the page
---------------------------------------------------- */
const googleMapKey = "AIzaSyDrq6itjJPber61m46hdD6xu_fwZ5zvnrQ";

// NWTC Green Bay coordinates
const lat = 39.743069;
const lon = -105.020219;


const mapBaseColor = "#f37a24";
const mapZoom = 14;

const heading = "Enpower Field Mile High";
const subheading = "1701 Bryant St, Denver, CO";
const date = "Open Daily";
const time = "9:00am – 5:00pm";


if (document.getElementById("map")) {
  loadScriptGoogleMap();
}

function loadScriptGoogleMap() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&loading=async&callback=initGoogleMap`;
  document.head.appendChild(script);
}

function initGoogleMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: lon },
    zoom: mapZoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      { stylers: [{ hue: mapBaseColor }, { saturation: +50 }] },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ lightness: 100 }, { visibility: "simplified" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ hue: mapBaseColor }, { saturation: +80 }],
      },
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ hue: mapBaseColor }, { saturation: +60 }],
      },
    ],
  });

  const marker = new google.maps.Marker({
    position: { lat: lat, lng: lon },
    map: map,
    animation: google.maps.Animation.DROP,
    icon: "/uiux-adv/digital-arts-showcase/js/images/map-marker.png",
  });

 const infowindow = new google.maps.InfoWindow({
  content: `
    <div style="
      background:#1e293b;
      padding:12px 14px;
      border-radius:8px;
      color:white;
      font-family:system-ui;
      line-height:1.4;
    ">
      <h4 style="margin:0; font-size:1.1rem;">${heading}</h4>
      <span style="display:block; margin-top:4px;">${subheading}</span>
      <ul style="margin:6px 0 0; padding-left:16px;">
        <li>${date}</li>
        <li>${time}</li>
      </ul>
    </div>
  `,
});


  infowindow.open(map, marker);
}