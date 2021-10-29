(function () {
  const myMap = document.querySelector('.my-map');
  if (!navigator.geolocation) {
    myMap.innerHTML = "<p>Geolocation not supported by your browser</p>";
    return;
  }

  function createLocationWidget(latitude, longitude) {
    let parentDiv = document.createElement("div");
    let newIFrame = document.createElement("iframe");
    newIFrame.width = "705";
    newIFrame.height = "505";
    newIFrame.frameborder = "0";
    newIFrame.src = "https://www.bing.com/maps/embed?h=500&w=700&v=2&cp=" + latitude + "~" + longitude + "&lvl=16&dir=0&scale=2&sty=c&sp=point." +
    latitude + "_" + longitude + "_You%20are%20here&src=SHELL&FORM=MBEDV8";
    parentDiv.appendChild(newIFrame);
    
    let newDiv = document.createElement("div");
    newDiv.style = "white-space: nowrap; text-align: center; width: 500px; padding: 6px 0;";
    let newA = document.createElement("a");
    newA.id = "largeMapLink";
    newA.target = "_blank";
    newA.href = "https://www.bing.com/maps?v=2&cp=" + latitude + "~" + longitude + "&lvl=16&dir=0&sty=c&sp=point." +
    latitude + "_" + longitude + "_You%20are%20here&FORM=MBEDLD";
    newA.innerHTML = "View Larger Map";
    newDiv.appendChild(newA);
    newA.insertAdjacentHTML('afterend', '&nbsp; | &nbsp;');

    newA = document.createElement("a");
    newA.id = "dirMapLink";
    newA.target = "_blank";
    newA.href = "https://www.bing.com/maps?v=2&cp=" + latitude + "~" + longitude + "&lvl=16&dir=0&sty=c&rtp=~pos." +
    latitude + "_" + longitude + "____&amp;FORM=MBEDLD";
    newA.innerHTML = "Get Directions";
    newDiv.appendChild(newA);
    parentDiv.appendChild(newDiv);
    return parentDiv;
  }

  function success(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude;

    const latitudeRadians = latitude * Math.PI/180;
    const longitudeRadians = longitude * Math.PI/180;
    const accuracy = 6371 * Math.acos(Math.sin(latitudeRadians) + Math.cos(latitudeRadians) * Math.cos(longitudeRadians));
    console.log(accuracy);

    console.log("Latitude in radians: " + latitudeRadians);
    console.log("Longtitude in radians: " + longitudeRadians);

    let newDiv = document.createElement("h3");
    newDiv.className = "h3 font-weight-light";
    let newContent = document.createTextNode("Latitude: " + latitude);
    newDiv.appendChild(newContent);
    document.querySelector(".my-map").appendChild(newDiv);

    newDiv = document.createElement("h3");
    newDiv.className = "h3 font-weight-light";
    newContent = document.createTextNode("Longtitude: " + longitude);
    newDiv.appendChild(newContent);

    document.querySelector(".my-map").appendChild(newDiv);
    document.querySelector(".my-map").appendChild(createLocationWidget(latitude, longitude));
  }

  function error() {
    myMap.innerHTML = 'Unable to retrieve your location';
  }

  navigator.geolocation.getCurrentPosition(success, error);
})();
