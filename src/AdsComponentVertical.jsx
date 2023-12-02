import React, { useEffect } from "react";

const AdsComponentVertical = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);
  return (
    <>
      <ins
        class="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="--------"
        data-ad-slot="--------"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

export default AdsComponentVertical;
