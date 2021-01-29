import React from "react";

const Loading = () => {
  return (
    <div className="form-screen">
      <a href="index.html" className="easion-logo">
        <img
          src="/logo192.png"
          alt="logo"
          style={{ width: "80px", height: "80px", marginRight: "16px" }}
        />
        <h1> Daur uang</h1>
      </a>
      <div class="spinner-border text-success"></div>
    </div>
  );
};

export default Loading;
