import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";


const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Home in Pune</h1>
          <p className="hero-subtitle">
            Discover the best rental properties in Pune's top neighborhoods. 
          </p>
          <Link to="/login" className="hero-btn">Explore Rentals</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose RentEase Pune?</h2>
        <div className="feature-cards">
          <div className="feature-card">
           
            <h3>Prime Locations</h3>
            <p>Find homes in Koregaon Park, Hinjewadi, Baner, and more.</p>
          </div>
          <div className="feature-card">
           
            <h3>Verified Properties</h3>
            <p>Every listing is verified to ensure transparency and trust.</p>
          </div>
          <div className="feature-card">
           
            <h3>Affordable Options</h3>
            <p>Find rental homes that fit your budget.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to Move into Your Pune Home?</h2>
        <Link to="/register" className="cta-btn">Start Now</Link>
      </section>
    </div>
  );
};

export default Home;
