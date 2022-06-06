import React, { useEffect, useState } from "react";
import nonAvatar from "../../utils/user-non-avatar.png";
import "./Comment.css";
import "boxicons";
import { Link, useLocation } from "react-router-dom";
import {
  fecthCommentFromApi,
  postComment,
} from "../../actions/fireStoreActions";
import { calculateCreatedTime } from "../../utils/constans";
import { useStore } from "../../stored/store";

const Comment = ({ movieId }) => {
  const user = useStore((state) => state.user);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);

  const location = useLocation();

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (comment.trim() === "") return;
    setLoading(true);
    const result = await postComment({
      movieId: movieId,
      userId: user.uid,
      userName: user.displayName,
      avatar: user.photoURL,
      content: comment,
      created_at: Date.now(),
    });

    setCommentList([...commentList, result]);
    setComment("");
    setLoading(false);
  };

  useEffect(() => {
    async function getComment() {
      const dataComment = await fecthCommentFromApi(movieId);
      setCommentList(dataComment);
    }

    getComment();
  }, [movieId]);

  return (
    <div className="comment">
      <h1 className="comment-title">Comments</h1>
      <form onSubmit={handlePostComment}>
        <div className="comment-control">
          <img
            className="avatar"
            alt="avatar"
            src={user ? user?.photoURL : nonAvatar}
          />

          {user ? (
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type={"text"}
              placeholder={"Write public comments..."}
            />
          ) : (
            <div className="not-comment">
              <h3>
                You need{" "}
                <Link
                  to={`/login?redirect=${encodeURIComponent(
                    location.pathname
                  )}`}
                >
                  login
                </Link>{" "}
                to comment
              </h3>
            </div>
          )}
          {user ? (
            <button
              style={{
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
              disabled={loading}
              className="send-icon"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          ) : null}
        </div>

        {commentList.length > 0 ? (
          <div className="show-comment">
            {commentList.map((item) => (
              <div className="show-comment-items" key={item.id}>
                <div className="show-comment-avatar">
                  <img alt="avatar" src={item.avatar} />
                </div>
                <div className="show-comment-info">
                  <div className="show-comment-name-time">
                    <h3>{item.userName}</h3>
                    <p>{calculateCreatedTime(item.created_at)}</p>
                  </div>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Comment;
