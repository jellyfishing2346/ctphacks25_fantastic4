import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [radius, setRadius] = useState(10);
  // Add your map, results, and UV index logic here

  const handleSearch = (e) => {
    e.preventDefault();
    // Call backend with search value and radius
  };

  return (
    <div className="container-fluid min-vh-100" style={{ background: '#b3d1f7' }}>
      {/* Top Row: Search Bar & Radius */}
      <div className="row pt-4 pb-2 align-items-center">
        <div className="col-md-8 mb-2">
          <form className="input-group shadow rounded" onSubmit={handleSearch}>
            <span className="input-group-text bg-white border-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-0"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ borderRadius: '0 1rem 1rem 0' }}
            />
          </form>
        </div>
        <div className="col-md-4 mb-2 d-flex justify-content-end">
          <div className="input-group w-auto">
            <label className="input-group-text bg-white border-0" htmlFor="radiusSelect">
              Radius (miles)
            </label>
            <select
              id="radiusSelect"
              className="form-select border-0"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            >
              {[5, 10, 20, 50].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Map Row */}
      <div className="row mb-4">
        <div className="col-12">
          {/* Replace this div with your actual Map component */}
          <div style={{ height: '300px', width: '100%', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            {/* Map goes here */}
            <iframe
              title="Map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.05,40.68,-73.85,40.85&layer=mapnik"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bottom Row: Results & UV Index */}
      <div className="row">
        <div className="col-md-9 mb-3">
          <div className="card shadow h-100">
            <div className="card-body">
              <h5 className="card-title">Results</h5>
              {/* Results content goes here */}
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
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
    </div>
  );
}