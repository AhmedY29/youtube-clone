import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function Search() {
  const [result, setResult] = useState();
  const { query } = useParams();
  const ApiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${
    import.meta.env.VITE_API_KEY
  }`;
  useEffect(() => {
    axios.get(ApiUrl).then((res) => setResult(res.data.items));
  }, [query]);

  console.log(result);
  return (
    <div className="flex justify-center w-full">
      <div className="w-[80%] flex flex-col gap-3">
        {result?.map((res) => (
          <Link to={`/watch/${res.id.videoId}`}>
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

export default Search;
