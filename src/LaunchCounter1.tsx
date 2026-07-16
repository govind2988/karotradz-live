import React, { useEffect, useState } from "react";


const LaunchCounter = () => {
  // Launch Time: Today 8:40 IST
   const launchDate = new Date(2026, 6, 16, 11, 45, 0, 0);

  const [timeLeft, setTimeLeft] = useState(
    launchDate.getTime() - Date.now()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = launchDate.getTime() - Date.now();

      if (remaining <= 0) {
        clearInterval(timer);

      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor(
    (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial"
      }}
    >
      <div className="text-5xl mb-4 ">🚀</div>
      <h1 className="text-3xl font-bold mt-4 mb-4 text-gray-600"> KaroTradz is Almost Here</h1>
      <p className="text-lg text-gray-600">
        The future of global trade starts soon.
      </p>

      <h2 style={{ fontSize: "4rem" }}>
        {String(hours).padStart(2, "0")}:
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </h2>

      <p className="text-center mt-5 text-lg mb-4">
        Launching in 11:45 AM IST
      </p>

<p className="text-center mt-5 text-lg text-gray-600">
  Helping manufacturers, exporters, and importers connect worldwide.
</p>

    </div>
  );
};

export default LaunchCounter;