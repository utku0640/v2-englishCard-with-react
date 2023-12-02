import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ToggleNavbar = ({ children }) => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/learnLanguage/English_Turkish") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [location]);

  return <div>{show && children}</div>;
};

export default ToggleNavbar;
