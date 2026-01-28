import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The FinTrust Universe</h1>
        <p>
          Extend your finance experience even further with us
        </p>

        <div className="col-4 p-3 mt-4">
          <img style={{ width: "40%" }}src="media/images/mongodb.jpeg" />
          <p className="text-small text-muted">MongoDB</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img style={{ width: "40%" }} src="media/images/react.jpeg" />
          <p className="text-small text-muted">React</p>
        </div>
        <div className="col-4 p-3 mt-4">
          <img className="mt-2" style={{ width: "40%" }}src="media/images/nodejs.jpeg" />
          <p className="text-small text-muted mt-2">NodeJs</p>
        </div>
        <div className="col-4 p-3 mt-4">
          <img style={{ width: "50%" }} src="media/images/mistralai.jpeg" />
          <p className="text-small text-muted">Mistral AI</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img style={{ width: "50%" }} src="media/images/express.jpeg" />
          <p className="text-small text-muted">ExpressJS</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img style={{ width: "30%" }} src="media/images/thunderclient.jpeg" />
          <p className="text-small text-muted">Thunder Client</p>
        </div>
        <div></div>
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;