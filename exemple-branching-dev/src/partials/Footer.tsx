import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-light border-top mt-5">
    <div className="container py-3 text-center">
      <small>© {new Date().getFullYear()} Anslagstavlan</small>
    </div>
  </footer>
);

export default Footer;
