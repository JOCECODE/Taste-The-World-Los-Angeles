var localStorage = JSON.parse(localStorage.getItem("response"));
$(document).ready(function (event) {
  $("#cuisineSearch").on("click", function (event) {
    event.preventDefault();
    var cuisineName = $("#userInput").val().trim().toLowerCase();
    var cuisineType = [
      "afghan",
      "african",
      "american",
      "argentine",
      "armenian",
      "asian",
      "australian",
      "austrian",
      "bbq",
      "bagels",
      "bakery",
      "bar food",
      "belgian",
      "beverages",
      "brazilian",
      "breakfast",
      "british",
      "bubble tea",
      "burger",
      "cafe",
      "cajun",
      "california",
      "cambodian",
      "canadian",
      "caribbean",
      "chinese",
      "coffee and tea",
      "colombian",
      "creole",
      "crepes",
      "cuban",
      "deli",
      "desserts",
      "dim sum",
      "diner",
      "donuts",
      "drinks only",
      "eastern european",
      "ethiopian",
      "european",
      "fast food",
      "filipino",
      "fish and chips",
      "french",
      "frozen yogurt",
      "fusion",
      "german",
      "greek",
      "grill",
      "hawaiian",
      "healthy food",
      "ice cream",
      "indian",
      "indonesian",
      "international",
      "iranian",
      "irish",
      "israeli",
      "italian",
      "jamaican",
      "japanese",
      "jewish",
      "juices",
      "korean",
      "latin american",
      "lebanese",
      "malaysian",
      "mediterranean",
      "mexican",
      "middle eastern",
      "moroccan",
      "new american",
      "new mexican",
      "pacific northwest",
      "pakistani",
      "peruvian",
      "pizza",
      "po'boys",
      "portuguese",
      "pub food",
      "puerto rican",
      "ramen",
      "roast chicken",
      "russian",
      "salad",
      "salvadorean",
      "sandwich",
      "scandinavian",
      "seafood",
      "soul food",
      "south american",
      "southern",
      "southwestern",
      "spanish",
      "sri lankan",
      "steak",
      "sushi",
      "taco",
      "taiwanese",
      "tapas",
      "tea",
      "teriyaki",
      "tex-mex",
      "thai",
      "turkish",
      "vegetarian",
      "venezuelan",
      "vietnamese",
    ];
    if (cuisineType.indexOf(cuisineName) === -1) {
      alert("Try another cuisine!");
      preventDefault();
    } else {
    }
    var qURL =
      "https://developers.zomato.com/api/v2.1/search?count=10&city_id=281&q=" +
      cuisineName;
    var apiKey = "2250e0cbe30b423e649121eee80563d0";
    $("#userInput").val("");
    var settings = {
      url: qURL,
      method: "GET",
      headers: {
        Accept: "application/json",
        "user-key": apiKey,
      },
    };
    $.ajax(settings)
      // After data comes back from the request
      .then(function (response) {
        localStorage.setItem("response", JSON.stringify(response));
        window.location.href = "index2.html";
      });
    // ONCLICK TO PAGE 3
  });
  $("h4").on("click", function () {
    var t = $(this).data();
    var restObj = {
      name: t.rest.restName,
      hours: t.rest.times,
      address: t.rest.address,
      longitude: t.rest.long,
      latitude: t.rest.lat,
      number: t.rest.phoneNumber,
    };
    localStorage.setItem("thisRestObj", JSON.stringify(restObj));
    console.log(restObj);

    window.location.href = "index3.html";
  });
});

function displayMarker() {
  var local = JSON.parse(localStorage.getItem("response"));
  console.log(local);
  for (var i = 0; i < local.restaurants.length; i++) {
    var lat = local.restaurants[i].restaurant.location.latitude;
    var lng = local.restaurants[i].restaurant.location.longitude;
    var latLng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });
  }
}
function initMap() {
  map = new google.maps.Map(document.getElementById("googleMaps"), {
    center: { lat: 34.052, lng: -118.243 },
    zoom: 10,
  });
  displayMarker();
}

function initMap2() {
  map = new google.maps.Map(document.getElementById("googleMaps2"), {
    center: { lat: 34.052, lng: -118.243 },
    zoom: 10,
  });
  displayOneMarker();
}

function displayOneMarker() {
  var newlocal = JSON.parse(localStorage.getItem("thisRestObj"));
  var lat = newlocal.latitude;
  var lng = newlocal.longitude;
  var latLng = new google.maps.LatLng(lat, lng);
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
  });
}

function renderThisRestObj() {
  var thisRestObj = JSON.parse(localStorage.getItem("thisRestObj"));
  $(".restResults").text(thisRestObj.name);
  $(".hours").text(thisRestObj.hours);
  $(".address").text(thisRestObj.address);
  $(".number").text(thisRestObj.number);
}

function renderItems() {
  var local = JSON.parse(localStorage.getItem("response"));

  for (var i = 0; i < local.restaurants.length; i++) {
    var restName = local.restaurants[i].restaurant.name;
    var cuisineType = local.restaurants[i].restaurant.cuisines;
    var address = local.restaurants[i].restaurant.location.address;
    var phoneNumber = local.restaurants[i].restaurant.phone_numbers;
    var times = local.restaurants[i].restaurant.timings;
    var long = local.restaurants[i].restaurant.location.longitude;
    var lat = local.restaurants[i].restaurant.location.latitude;
    var all = new Object();
    all.restName = restName;
    all.cuisineType = cuisineType;
    all.address = address;
    all.phoneNumber = phoneNumber;
    all.times = times;
    all.long = long;
    all.lat = lat;
    console.log(all);
    var divEl = $("<h4>");
    divEl.attr("data-rest", JSON.stringify(all));
    divEl.text(restName).appendTo($("#results"));
    $("<h3>", { id: "cuisineType" }).text(cuisineType).appendTo($("#results"));
    $("<p>", { id: "address" }).text(address).appendTo($("#results"));
    $("<p>", { id: "phoneNumber" })
      .text("Phone Number: " + phoneNumber)
      .appendTo($("#results"));
    $("<br>").appendTo($("#results"));
    localStorage.setItem("restName" + [i], JSON.stringify(all));
  }
}
renderItems();
renderThisRestObj();

// FILTER BUTTON
function toggleDropdown() {
  document.querySelector("#filterChoices").classList.toggle("show");
}

// DROPDOWN MENU CLOSES ON OUTSIDE CLICK
$(window).click(function outsideClick(event) {
  event.stopPropagation();
  if (!event.target.matches(".filterBtn")) {
    document.querySelector("#filterChoices").classList.remove("show");
  }
});
