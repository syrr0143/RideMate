import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MdNavigation } from "react-icons/md";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

const Map = ({ onLocationUpdate, destinationCoords }) => {
  console.log("destination is ", destinationCoords);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const centerMarker = useRef(null);
  const destinationMarker = useRef(null);
  const watchId = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  const createCustomMarker = (color = "#2196F3") => {
    const el = document.createElement("div");
    el.className = "custom-marker";
    el.style.width = "20px";
    el.style.height = "20px";
    el.style.borderRadius = "50%";
    el.style.backgroundColor = color;
    el.style.border = "3px solid white";
    el.style.boxShadow = "0 0 10px rgba(33, 150, 243, 0.5)";
    return el;
  };

  const getRoute = async (start, end) => {
    try {
      console.log("start and end is ", start, end);
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?alternatives=true&steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
      const json = await query.json();
      const data = json.routes[0];
      return data;
    } catch (err) {
      console.error("Error fetching route:", err);
      setError("Could not fetch route");
      return null;
    }
  };

  const addRoute = async (start, end) => {
    const route = await getRoute(start, end);
    if (!route) return;

    // Remove existing route layer and source if they exist
    if (map.current.getSource("route")) {
      map.current.removeLayer("route");
      map.current.removeSource("route");
    }

    // Add route source and layer
    map.current.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: route.geometry,
      },
    });

    map.current.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3887be",
        "line-width": 5,
        "line-opacity": 0.75,
      },
    });

    // Fit the map to show the full route
    const coordinates = route.geometry.coordinates;
    const bounds = new mapboxgl.LngLatBounds();
    coordinates.forEach((coord) => bounds.extend(coord));

    map.current.fitBounds(bounds, {
      padding: 50,
    });
  };

  const initializeMap = (longitude, latitude) => {
    try {
      if (!mapContainer.current) return;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [longitude, latitude],
        zoom: 15,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Add current location marker
      const markerElement = createCustomMarker("#2196F3");
      centerMarker.current = new mapboxgl.Marker({
        element: markerElement,
        anchor: "center",
      })
        .setLngLat([longitude, latitude])
        .addTo(map.current);

      // Add destination marker if coordinates are provided
      if (destinationCoords) {
        const destMarkerElement = createCustomMarker("#FF0000");
        destinationMarker.current = new mapboxgl.Marker({
          element: destMarkerElement,
          anchor: "center",
        })
          .setLngLat([destinationCoords[1], destinationCoords[0]])
          .addTo(map.current);

        // Draw route once map is loaded
        map.current.on("load", () => {
          setMapLoaded(true);
          addRoute(
            [longitude, latitude],
            [destinationCoords[1], destinationCoords[0]]
          );
        });
      }
    } catch (err) {
      console.error("Error initializing map:", err);
      setError(err.message);
    }
  };

  const updateMapPosition = (longitude, latitude) => {
    if (!map.current || !mapLoaded) return;

    try {
      // Update current location marker
      centerMarker.current.setLngLat([longitude, latitude]);
      map.current.setCenter([longitude, latitude]);

      // Optionally, adjust zoom if necessary, e.g., set zoom level to 15
      map.current.zoomTo(15); // Adjust zoom level if necessary
      // Update route if destination exists
      if (destinationCoords) {
        addRoute(
          [longitude, latitude],
          [destinationCoords[1], destinationCoords[0]]
        );
      }
    } catch (err) {
      console.error("Error updating map position:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      watchId.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ latitude, longitude });

          if (!map.current) {
            initializeMap(longitude, latitude);
          } else {
            updateMapPosition(longitude, latitude);
          }

          if (onLocationUpdate) {
            onLocationUpdate({ latitude, longitude });
          }
        },
        (error) => {
          console.error("Error fetching location: ", error);
          setError(error.message);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000000 }
      );
    }

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
      if (map.current) {
        try {
          map.current.remove(); // Safely remove map
          map.current = null; // Ensure no reference to the removed map
        } catch (err) {
          console.error("Error during map removal:", err);
        }
      }
    };
  }, [onLocationUpdate, destinationCoords]);

  const handleNavigationClick = () => {
    if (!map.current || !currentPosition || !destinationCoords) return;

    addRoute(
      [currentPosition.longitude, currentPosition.latitude],
      [destinationCoords[1], destinationCoords[0]]
    );
  };

  return (
    <div className="flex-1 relative">
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 z-50">
          {error}
        </div>
      )}
      <div
        ref={mapContainer}
        className="w-full h-full"
        style={{ height: "62vh" }}
      />
      <div className="absolute right-4 top-1/3 flex flex-col gap-4">
        <button
          className="bg-white p-2 rounded-full shadow-lg"
          onClick={handleNavigationClick}
        >
          <MdNavigation className="w-6 h-6 text-gray-700" />
        </button>
        <button className="bg-white p-2 rounded-full shadow-lg">
          <RiMapPin2Fill className="w-6 h-6 text-gray-700" />
        </button>
        <button className="bg-white p-2 rounded-full shadow-lg">
          <FaHome className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default Map;
