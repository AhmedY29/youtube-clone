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
  const [channelInfo, setChannelInfo] = useState([]);
  const [channelId, setChannelId] = useState("");
  const [openDesc, setOpenDesc] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
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
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=sa&&key=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((res) => setVideos(res.data.items));
  };

  console.log(id);
  const ApiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${
    import.meta.env.VITE_API_KEY
  }`;

  const handleGetVideo = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setLike(false);
    axios.get(ApiUrl).then((res) => setVideo(res.data.items));
  };
  useEffect(() => {
    handleGetVideos();
  }, []);

  useEffect(() => {
    handleGetVideo();
  }, [id]);
  useEffect(() => {
    setChannelId(video[0]?.snippet.channelId);
  }, [video]);
  useEffect(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((res) => {
        setLoading(false), setChannelInfo(res.data.items);
      });
    console.log(channelInfo, "ssss");
  }, [channelId]);
  console.log(
    channelInfo ? channelInfo[0]?.statistics?.subscriberCount : "",
    "sss2s"
  );

  console.log(video);
  console.log(channelId, "ddd");

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
        setLoadingComments(!loadingComments);
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
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    handleGetComments();
  }, [loading, loadingComments]);

  const handleLikes = () => {
    console.log(user?.id);

    axios
      .put(`https://68371fab664e72d28e43a55c.mockapi.io/users/${user?.id}`, {
        likes: [
          ...user.likes,
          {
            vidId: id,
          },
        ],
      })
      .then((res) => {
        console.log(res),
          localStorage.setItem(
            "UserName-Account",
            JSON.stringify({
              id: res.data.id,
              username: res.data.username,
              likes: res.data.likes,
            })
          ),
          toast.success("add Like");
      });
  };

  console.log(comments, "comments");
  console.log(
    user?.likes?.map((vid) => vid.vidId === id),
    "???"
  );

  console.log(loading);

  if (loading) {
    return <h1 className="text-5xl text-white">Loading..</h1>;
  }
  return (
    <section className="watch-section flex justify-center w-full text-white">
      <div className="watch-content w-[95%] flex gap-5 flex-col lg:flex-row">
        <div className="iframe flex flex-col gap-2 lg:w-[65%]">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${id}?si=88kKMb3sMaZmuGAk&autoplay=1`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <div className="title">
            <h1>{video[0]?.snippet?.title}</h1>
          </div>
          <div className="info flex flex-col md:flex-row md:justify-between md:items-center gap-5">
            <div className="channel flex items-center gap-3">
              <img
                src={
                  channelInfo
                    ? channelInfo[0]?.snippet?.thumbnails?.high?.url
                    : ""
                }
                width={40}
                className="rounded-full"
                alt=""
              />
              <div className="">
                <h1>{video[0]?.snippet?.channelTitle}</h1>
                <h1 className="text-white/40">
                  {Intl.NumberFormat().format(
                    channelInfo
                      ? channelInfo[0]?.statistics?.subscriberCount
                      : 0
                  )}{" "}
                  subscribers
                </h1>
              </div>

              <button className="bg-white text-black p-2 rounded-xl cursor-pointer">
                Subscribe
              </button>
            </div>
            <div className="actions flex gap-4">
              <div className="like bg-white/10 hover:bg-white/15 flex items-center gap-2 rounded-xl px-3 transition-all duration-200">
                <button
                  onClick={() => {
                    setLike(!like), like ? "" : handleLikes();
                  }}
                  className=" flex gap-3 items-center cursor-pointer text-xl"
                >
                  {like ? <AiFillLike /> : <AiOutlineLike />}
                  {like
                    ? Intl.NumberFormat().format(
                        +video[0]?.statistics?.likeCount + 1
                      )
                    : Intl.NumberFormat().format(
                        video[0]?.statistics?.likeCount
                      )}
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
          <div className="desc bg-white/10 p-1 rounded-md">
            <h1>
              {Intl.NumberFormat().format(video[0]?.statistics?.viewCount)}{" "}
              views
            </h1>
            <p
              onClick={() => setOpenDesc(!openDesc)}
              className={`line-clamp-3 ${
                openDesc ? "line-clamp-none" : ""
              } cursor-pointer `}
            >
              {video[0]?.snippet?.description}
            </p>
          </div>
          <div className="comments flex flex-col gap-3">
            <div className="flex gap-3">
              <h1 className="text-xl font-bold">
                {comments.filter((comment) => comment.vidId == id).length}{" "}
                Comments
              </h1>
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
                  <div className="likes ml-10 flex gap-3">
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
        <div className="suggest-video lg:w-[30%]">
          <div className="videos flex flex-col gap-3">
            <a href="https://ahmed-alsaleh.netlify.app/" target="_blank">
              <div className="flex items-center gap-3 w-fit border border-amber-300 rounded-md p-2">
                <img
                  width={140}
                  src="https://ahmed-alsaleh.netlify.app/assets/project3-QbzhLVfn.jpeg"
                  alt=""
                />
                <h1 className="text-sm w-[60%]">Ahmed Portfolio</h1>
              </div>
            </a>
            {videos.map((vid) => (
              <Link
                className="cursor-pointer"
                key={vid.id}
                to={`/watch/${vid.id}`}
              >
                <div className="flex items-center gap-3 w-full">
                  <img
                    src={vid?.snippet?.thumbnails?.medium?.url}
                    width={150}
                    alt=""
                  />
                  <div className="text">
                    <h1
                      title={vid.snippet.title}
                      className="text-sm line-clamp-3 w-[60%]"
                    >
                      {vid.snippet.title}
                    </h1>
                    <h1 className="opacity-65 hover:opacity-100">
                      {vid.snippet.channelTitle}
                    </h1>
                  </div>
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
