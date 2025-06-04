import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";

function Video(props) {
  const [channelInfo, setChannelInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  // const date = new Date(props.publishedAt);
  // const today = new Date();
  // console.log(today - date / (1000 * 3600 * 24), "today");
  // console.log(today, "today1");
  // console.log(date.toString(), "date");
  let duration = props.duration;
  duration = duration
    .split("M")
    .join(",")
    .replace(/[^0-9 ,]/g, "")
    .split(",");

  const handleGetChannelInfo = () => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${
          props.channelId
        }&key=${import.meta.env.VITE_API_KEY}`
      )
      .then((res) => {
        setLoading(false), setChannelInfo(res.data.items);
      });
  };

  useEffect(() => {
    handleGetChannelInfo();
  }, [props]);

  if (loading) {
    return <h1>Loading ..</h1>;
  }
  return (
    <div className="video flex flex-col gap-1.5 rounded-sm cursor-pointer">
      <div className="img relative">
        <img className="relative" src={props.thumbnail} alt="" />
        <span className="absolute bottom-0 right-0 p-2.5">
          <h1 className="bg-black/40 p-0.5 rounded-sm">
            {duration[0]}:{duration[1] ? duration[1] : "00"}
          </h1>
        </span>
      </div>
      <div className="title flex gap-2 items-center justify-between">
        <div className="">
          <img
            src={channelInfo[0]?.snippet?.thumbnails.high.url}
            width={45}
            height={45}
            className="rounded-full"
            alt=""
          />
        </div>
        <div className="">
          <h1 className="line-clamp-2">{props.vidTitle}</h1>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <h1 className="cursor-pointer opacity-65 hover:opacity-100">
                {props.channelTitle}
              </h1>
            </div>

            <h1 className="cursor-pointer opacity-65 hover:opacity-100">
              {Intl.NumberFormat().format(props.views)} views
            </h1>
          </div>
        </div>
        <h1>
          <CiMenuKebab />
        </h1>
      </div>
    </div>
  );
}

export default Video;
