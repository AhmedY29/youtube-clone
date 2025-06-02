import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Video from "./Video";

const ApiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=sa&&key=${
  import.meta.env.VITE_API_KEY
}`;
console.log(ApiUrl, "url");

function Videos() {
  const [videos, setVideos] = useState([]);

  const handleGetVideos = () => {
    axios.get(ApiUrl).then((res) => setVideos(res.data.items));
  };

  useEffect(() => {
    handleGetVideos();
  }, []);

  console.log(videos);
  return (
    <section className="video-section">
      <div className="video-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {/* <div className="video flex flex-col gap-1.5 rounded-sm">
          <div className="img relative">
            <img
              className="relative"
              src="https://i.ytimg.com/vi/1vywtpBlXdA/hqdefault.jpg"
              alt=""
            />
            <span className="absolute bottom-0 right-0 p-2.5">
              <h1 className="bg-black/30 p-1 rounded-sm">16:29</h1>
            </span>
          </div>
          <div className="title flex justify-between">
            <h1 className="line-clamp-2">
              ملخص نهائي دوري أبطال أوروبا: باريس سان جيرمان 5 - 0 إنتر | النادي
              الباريسي يكتب التاريخ
            </h1>
            <h1>
              <CiMenuKebab />
            </h1>
          </div>
          <div className="flex justify-between">
            <h1 className="cursor-pointer opacity-65 hover:opacity-100">
              beIN SPORTS
            </h1>
            <h1 className="cursor-pointer opacity-65 hover:opacity-100">
              4471390 views
            </h1>
          </div>
        </div> */}
        {videos.map((vid) => (
          <Link
            onMouseMove={() => setVidId(vid.id)}
            key={vid.id}
            to={`/watch/${vid.id}`}
          >
            <Video
              thumbnail={vid.snippet.thumbnails.maxres.url}
              vidTitle={vid.snippet.title}
              channelTitle={vid.snippet.channelTitle}
              views={vid.statistics.viewCount}
              duration={vid.contentDetails.duration}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Videos;
