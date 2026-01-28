import React from "react";

function Hero() {
  return (
    <div className="container border-bottom mb-5">
      <div className="text-center mt-5 p-3">
        <h1>Technology</h1>
        <h3 className="text-muted mt-3 fs-4">
          Precise, modern and intuitive fintech platforms
        </h3>
        <p className="mt-3 mb-5">
          Check us{" "}
          <a href="" style={{ textDecoration: "none" }}>
            out{" "}
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Hero;