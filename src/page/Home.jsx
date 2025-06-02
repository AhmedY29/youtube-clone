import React from "react";
import Sidebar from "../components/Sidebar";
import Videos from "../components/Videos";

function Home() {
  return (
    <section className="home-section">
      <div className="home-content text-white flex gap-3 p-4">
        <div className="sidebar sticky top-0 w-[20%] hidden lg:block">
          <Sidebar />
        </div>
        <div className="videos">
          <Videos />
        </div>
      </div>
    </section>
  );
}

export default Home;
