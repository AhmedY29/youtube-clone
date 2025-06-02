import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

// React icons
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { MdSort } from "react-icons/md";
import toast from "react-hot-toast";

function Watch() {
  const [video, setVideo] = useState([]);
  const [openDesc, setOpenDesc] = useState(false);
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  let user = JSON.parse(localStorage.getItem("UserName-Account"));
  const handleGetVideos = () => {
    axios
      .get(
        "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=sa&&key=AIzaSyBSFV1kvB4Yj18Fc7wSrWZmHlwJ5caH0eU"
      )
      .then((res) => setVideos(res.data.items));
  };

  console.log(id);
  const ApiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=AIzaSyBSFV1kvB4Yj18Fc7wSrWZmHlwJ5caH0eU`;

  const handleGetVideo = () => {
    axios.get(ApiUrl).then((res) => setVideo(res.data.items));
  };

  useEffect(() => {
    handleGetVideo();
  }, [id]);
  useEffect(() => {
    handleGetVideos();
  }, []);
  console.log(video);

  const handleAddComment = () => {
    if (!commentInput.trim()) {
      toast.error("Please filled comment content");
      return;
    }
    axios
      .post("https://68371fab664e72d28e43a55c.mockapi.io/comments", {
        vidId: id,
        username: user.username,
        commentMsg: commentInput,
      })
      .then(() => {
        setLoading(false);
      });
    setCommentInput("");
  };

  const handleGetComments = () => {
    axios
      .get("https://68371fab664e72d28e43a55c.mockapi.io/comments")
      .then((res) => {
        setLoading(false), setComments(res.data);
      });
  };

  useEffect(() => {
    handleGetComments();
  }, [loading]);

  console.log(comments, "comments");

  console.log(loading);

  if (loading) {
    return <h1 className="text-5xl text-white">Loading..</h1>;
  }
  return (
    <section className="watch-section flex justify-center w-full text-white">
      <div className="watch-content w-[90%] flex gap-5 flex-col lg:flex-row">
        <div className="iframe flex flex-col gap-2 lg:w-[70%]">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${id}?si=88kKMb3sMaZmuGAk`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <div className="title">
            <h1>{video[0].snippet?.title}</h1>
          </div>
          <div className="info flex justify-between items-center">
            <div className="channel flex items-center gap-3">
              <h1>{video[0].snippet?.channelTitle}</h1>
              <button className="bg-white text-black p-2 rounded-xl cursor-pointer">
                Subscribe
              </button>
            </div>
            <div className="actions flex gap-4">
              <div className="like bg-white/10 hover:bg-white/15 flex items-center gap-2 rounded-xl px-3 transition-all duration-200">
                <button
                  onClick={() => setLike(!like)}
                  className=" flex gap-3 items-center cursor-pointer text-xl"
                >
                  {like ? <AiFillLike /> : <AiOutlineLike />}
                  {like
                    ? +video[0].statistics?.likeCount + 1
                    : video[0].statistics?.likeCount}
                </button>
                |
                <button
                  onClick={() => setDisLike(!disLike)}
                  className="cursor-pointer"
                >
                  {disLike ? <BiSolidDislike /> : <BiDislike />}
                </button>
              </div>
              <div className="share">
                <button className="flex items-center gap-2  bg-white/10 hover:bg-white/15 rounded-xl transition-all duration-200 p-2">
                  <RiShareForwardLine /> Share
                </button>
              </div>
              <div className="save">
                <button className="flex items-center gap-2  bg-white/10 hover:bg-white/15 rounded-xl transition-all duration-200 p-2">
                  <FaRegBookmark /> Save
                </button>
              </div>
              <div className="menu">
                <button className="flex items-center gap-2  bg-white/10 hover:bg-white/15 rounded-xl transition-all duration-200 p-2">
                  <CiMenuKebab className="rotate-90" />
                </button>
              </div>
            </div>
          </div>
          <div className="desc">
            <h1>{video[0].statistics?.viewCount} views</h1>
            <p
              onClick={() => setOpenDesc(!openDesc)}
              className={`line-clamp-3 ${openDesc ? "line-clamp-none" : ""} `}
            >
              {video[0].snippet?.description}
            </p>
          </div>
          <div className="comments flex flex-col gap-3">
            <div className="flex gap-3">
              <h1 className="text-xl font-bold">200 Comments</h1>
              <button className="flex items-center gap-2  bg-white/10 hover:bg-white/15 rounded-xl transition-all duration-200 p-2">
                <MdSort /> Sort By
              </button>
            </div>
            <div className="add-comment flex gap-3">
              <img
                className="rounded-full"
                width={50}
                src="https://yt3.ggpht.com/a/default-user=s88-c-k-c0x00ffffff-no-rj"
                alt=""
              />
              <input
                className="w-full p-1 px-2 rounded-md"
                type="text"
                name=""
                value={commentInput}
                id=""
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add Comments"
              />
              <button
                onClick={handleAddComment}
                className=" bg-white/10 hover:bg-white/15 rounded-xl transition-all duration-200 p-2"
              >
                Add
              </button>
            </div>
            <hr className="text-white/30" />

            {comments.map((comment) =>
              comment.vidId == id ? (
                <div className="comment my-2">
                  <div className="comment-content flex items-center gap-3 ">
                    <div className="img">
                      <img
                        className="rounded-full"
                        width={50}
                        src="https://yt3.ggpht.com/a/default-user=s88-c-k-c0x00ffffff-no-rj"
                        alt=""
                      />
                    </div>
                    <div className="comment-msg overflow-hidden text-wrap w-fit">
                      <h1 className="font-bold">{comment.username}</h1>
                      <h1 className="text-wrap w-[80%]">
                        {comment.commentMsg}
                      </h1>
                    </div>
                  </div>
                  <div className="likes flex gap-3">
                    <button className="bg-white/10 hover:bg-white/15 rounded-xl transition-all duration-200 p-2">
                      <AiOutlineLike />
                    </button>
                    <button className="bg-white/10 hover:bg-white/15 rounded-xl transition-all duration-200 p-2">
                      <BiDislike />
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
        <div className="suggest-video lg:w-[20%]">
          <div className="videos flex flex-col gap-3">
            {videos.map((vid) => (
              <Link
                className="cursor-pointer"
                key={vid.id}
                to={`/watch/${vid.id}`}
              >
                <div className="flex items-center gap-3 w-full">
                  <img src={vid.snippet.thumbnails.default.url} alt="" />
                  <h1 className="text-sm w-[60%]">{vid.snippet.title}</h1>
                  {/* <h1>{vid.snippet.channelTitle}</h1> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Watch;
