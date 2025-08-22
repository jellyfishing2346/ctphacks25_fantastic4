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

  const handleSearch = async (e) => {
    e.preventDefault();
    const mock = [
      { name: 'Spot 1', lat: 40.7128, lng: -74.0060, score: 85 },
      { name: 'Spot 2', lat: 40.7306, lng: -73.9352, score: 60 },
      { name: 'Spot 3', lat: 40.7580, lng: -73.9855, score: 40 }
    ];
    setLocations(mock);
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
              center={center}
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
        <div className="col-md-3 mb-2 me-5">
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