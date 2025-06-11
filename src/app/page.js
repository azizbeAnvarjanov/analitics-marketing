import React from "react";
import Analytics from "./componnents/Analytics";
import AnalyticsToshkent from "./componnents/AnalyticsToshkent";

const page = () => {
  return (
    <div className="p-3">
      <h1 className="text-2xl text-center font-bold">Namangan</h1>
      <Analytics />
      <h1 className="text-2xl text-center font-bold">Toshkent</h1>
      <AnalyticsToshkent />
    </div>
  );
};

export default page;
