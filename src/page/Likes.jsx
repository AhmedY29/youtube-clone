import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function Likes() {
  const [result, setResult] = useState([]);
  const [user, setUser] = useState([]);
  const [likes, setLikes] = useState("");

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("UserName-Account")));
  }, []);

  useEffect(() => {
    setLikes(user?.likes?.map((e) => e.vidId).join(","));
  }, [user]);

  const getLikedVid = () => {
    if (!likes) {
      return;
    }
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${likes}&key=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((res) => {
        setResult(res.data.items);
      });
  };
  useEffect(() => {
    getLikedVid();
  }, [user, likes]);

  console.log(result);

  return (
    <div className="flex justify-center w-full">
      <div className="w-[80%] flex flex-col gap-3">
        <h1 className="text-white text-3xl font-bold">
          Liked Video {result.length}
        </h1>
        {result?.map((res) => (
          <Link key={res.id} to={`/watch/${res.id}`}>
            <div className="flex items-center gap-3 w-full text-white ">
              <img
                src={res.snippet.thumbnails.medium.url}
                className="rounded-md"
                alt=""
              />

              <div className="flex flex-col gap-1">
                <h1 className="text-sm ">{res.snippet.title}</h1>

                <h1 className="text-white/40 hover:text-white/60">
                  {res.snippet.channelTitle}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Likes;
