import React, { useEffect, useState, useRef } from "react";
import { GoogleApiWrapper, InfoWindow, Marker, Map } from "google-maps-react";

const currentLocationDummy = { lat: 37.565662, lng: 126.976965 };

// dummy values
const coords = [
  { lat: 37.545936, lng: 126.977823, range: 100 },

  { lat: 37.556397, lng: 126.994634, range: 80 },

  { lat: 37.561474, lng: 126.979881, range: 50 },

  { lat: 37.583965, lng: 126.944493, range: 120 },
];

const mapStyles = { width: "100%", height: "100%" };

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "500px",
};

const displayMarkers = (stores, google) => {
  return stores.map((store, index) => {
    let position = {
      lat: store.lat,
      lng: store.lng,
    };
    if (index === 0) {
      return (
        <Marker
          key={index}
          id={index}
          position={position}
          animation={google.maps.Animation.DROP}
          name={store && store.title ? store : "location"}
          icon={{
            //url: "https://dxnqsgisijbjj.cloudfront.net/img/marker-icon.png",
            url: "https://dxnqsgisijbjj.cloudfront.net/img/location-pointer.gif",
            anchor: new google.maps.Point(15, 15),
            scaledSize: new google.maps.Size(55, 55),
          }}
        ></Marker>
      );
    } else {
      return <Marker key={index} id={index} position={store}></Marker>;
    }
  });
};

const displayInfoWindows = (stores) => {
  return stores.map((store, index) => {
    if (index === 0) return <></>;
    return (
      <InfoWindow key={index} id={index} visible={true} position={store}>
        <a
          href="#/all-freelancer"
          style={{ display: "flex", height: 65, minWidth: 250 }}
        >
          <img
            src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/client_img.jpg"
            alt="client-img"
            className="h-100"
          />
          <div style={{ flex: 1, padding: 10 }}>
            <div className="h6 text-dark">Frontent Developer</div>
            <div className="p text-dark">Reactjs, C#</div>
          </div>
        </a>
      </InfoWindow>
    );
  });
};
const RegionMap = ({ google, radius }) => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 1, lng: 1 });
  // const [range, setRange] = useState(30)
  const myMap = useRef(null);
  useEffect(() => {
    if (navigator.geolocation) {
      //The working next statement.
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Get the co-ordinateds from the navigator

          // const currentLocation = {
          //   lat: position.coords.latitude,
          //   lng: position.coords.longitude,
          // }

          // Set State to users position
          // scope.setState({ currentLocation: currentLocationDummy })
          setCurrentLocation(currentLocationDummy);
        },
        function (e) {
          //Your error handling here
          console.log(e);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
        }
      );
    }
  }, [setCurrentLocation]);
  const [render, setRender] = useState(null);

  useEffect(() => {
    setRender(Math.random());
  }, [radius]);

  const bounds = new google.maps.LatLngBounds(currentLocation);
  const inRange = coords.filter((co) => co.range <= radius);

  const stores = [currentLocation];
  inRange.map((co) => {
    const store = { lat: co.lat, lng: co.lng };
    bounds.extend(store);
    stores.push(store);
  });
  const markerHtml = displayMarkers(stores, google);
  const infoHtml = displayInfoWindows(stores);
  return (
    <>
      <Map
        ref={myMap}
        containerStyle={containerStyle}
        google={google}
        style={mapStyles}
        places={stores}
        center={currentLocation}
        bounds={stores.length > 1 ? bounds : null}
        zoom={16}
      >
        {stores.length > 0 ? markerHtml : null}
        {stores.length > 0 ? infoHtml : null}
      </Map>
    </>
  );
};

export const Region = GoogleApiWrapper({
  apiKey: "AIzaSyA8hPK8F-8BbO-8H6tQZuiopY5nYES1UR0",
  sensor: true,
})(RegionMap);
