import React from "react";
import { CiMenuKebab } from "react-icons/ci";

function Video(props) {
  let duration = props.duration;
  duration = duration
    .split("M")
    .join(",")
    .replace(/[^0-9 ,]/g, "")
    .split(",");

  return (
    <div className="video flex flex-col gap-1.5 rounded-sm cursor-pointer">
      <div className="img relative">
        <img className="relative" src={props.thumbnail} alt="" />
        <span className="absolute bottom-0 right-0 p-2.5">
          <h1 className="bg-black/30 p-1 rounded-sm">
            {duration[0]}:{duration[1]}
          </h1>
        </span>
      </div>
      <div className="title flex justify-between">
        <h1 className="line-clamp-2">{props.vidTitle}</h1>
        <h1>
          <CiMenuKebab />
        </h1>
      </div>
      <div className="flex justify-between">
        <h1 className="cursor-pointer opacity-65 hover:opacity-100">
          <img src={props?.channelPhoto} alt="" />
          {props.channelTitle}
        </h1>
        <h1 className="cursor-pointer opacity-65 hover:opacity-100">
          {props.views} views
        </h1>
      </div>
    </div>
  );
}

export default Video;
