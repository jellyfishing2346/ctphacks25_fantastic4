import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Title from './components/title';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Test from './components/Test';

const containerStyle = {
  width: '100%',
  maxWidth: '700px',
  height: '400px',
  borderRadius: '1rem',
  margin: '0 auto 2rem auto',
  display: 'block'
};

const center = {
  lat: 40.7128,
  lng: -74.0060
};

function getMarkerColor(score) {
  if (score >= 80) return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
  if (score >= 50) return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
  return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
}

function MainAppContent() {
  const [search, setSearch] = useState('');
  const [locations, setLocations] = useState([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });
  const [mapCenter, setMapCenter] = useState(center);

  const handleSearch = async (e) => {
  e.preventDefault();
  if (!search) return;

  // Geocode the search input
  const geoRes = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(search)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
  );
  const geoData = await geoRes.json();
  if (geoData.results && geoData.results.length > 0) {
    const { lat, lng } = geoData.results[0].geometry.location;
    setMapCenter({ lat, lng });

    // Example: create 3 nearby spots for demo
    const spots = [
      { name: 'Spot 1', lat, lng },
      { name: 'Spot 2', lat: lat + 0.01, lng: lng + 0.01 },
      { name: 'Spot 3', lat: lat - 0.01, lng: lng - 0.01 }
    ];

    // Fetch solar scores for each spot
    const scoredSpots = await Promise.all(
      spots.map(async (spot) => {
        try {
          const solarRes = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/coordinates?lat=${spot.lat}&lng=${spot.lng}`
          );
          const solarData = await solarRes.json();
          // Example: extract a score from the solarData (customize as needed)
          const score = solarData?.solarPotential?.maxArrayPanelsCount
            ? Math.min(100, Math.round(solarData.solarPotential.maxArrayPanelsCount / 5))
            : 0;
          return { ...spot, score };
        } catch {
          return { ...spot, score: 0 };
        }
      })
    );
    setLocations(scoredSpots);
  }
};

  return (
    <div className="container-fluid min-vh-100" style={{ background: '#b3d1f7' }}>
      <Title />
      {/* Centered Search Bar */}
      <div className="row justify-content-center pt-4 pb-2">
        <div className="col-md-8">
          <form className="input-group shadow rounded" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control"
              placeholder="Search for a location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">Search</button>
          </form>
        </div>
      </div>
      {/* Google Map with Colored Markers */}
      <div className="row mb-4">
        <div className="col-12">
          {isLoaded && (
            <GoogleMap
               mapContainerStyle={containerStyle}
               center={mapCenter}
               zoom={12}
             >
            {locations.map((loc, idx) => (
              <Marker
                key={idx}
                position={{ lat: loc.lat, lng: loc.lng }}
                title={loc.name}
                icon={getMarkerColor(loc.score)}
              />
            ))}
          </GoogleMap>
          )}
        </div>
      </div>
      {/* Results and UV Index Legend */}
      <div className="row">
        <div className="col-md-3 d-flex mb-2 me-5">
          <div className="card shadow h-100">
            <div className="card-body">
              <h5 className="card-title">Results</h5>
              {locations.map((loc, idx) => (
                <div key={idx}>
                  <b>{loc.name}</b> - Solar Score: {loc.score}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-5 mb-3 d-flex justify-content-end">
          <div className="card shadow h-100">
            <div className="card-body">
              <h5 className="card-title">UV Index</h5>
              <div className="d-flex align-items-center mb-2">
                <span className="rounded-circle me-2" style={{ background: '#6fd96f', width: 20, height: 20, display: 'inline-block' }}></span>
                High
              </div>
              <div className="d-flex align-items-center mb-2">
                <span className="rounded-circle me-2" style={{ background: '#ffe066', width: 20, height: 20, display: 'inline-block' }}></span>
                Medium
              </div>
              <div className="d-flex align-items-center">
                <span className="rounded-circle me-2" style={{ background: '#e57373', width: 20, height: 20, display: 'inline-block' }}></span>
                Low
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Test Component Description Section */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title mb-3 text-center">
                About the <code>Test</code> Component
              </h5>
              <p className="text-center">
                The <b>Test</b> component is included in this project as a sandbox for experimenting with new ideas, debugging, or showcasing reusable UI elements in isolation.<br />
                It allows you to validate features before integrating them into the main application, making development and testing more efficient.
              </p>
              <p className="text-center">
                <span>View the component:&nbsp;</span>
                <Link
                  to="/test"
                  style={{ textDecoration: 'underline', color: '#0d6efd', wordBreak: 'break-all' }}
                >
                  /test
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainAppContent />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;