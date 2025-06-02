import React from "react";

function SidebarIcon(props) {
  return (
    <div
      className={`home-icon flex items-center gap-2 p-2 px-3 rounded-xl cursor-pointer ${
        props.active
          ? "bg-white text-black"
          : "hover:bg-white/20 duration-200 transition-all"
      }`}
    >
      {/* <AiFillHome fontSize={25} /> */}
      {props.icon}
      <h1>{props.title}</h1>
    </div>
  );
}

export default SidebarIcon;
