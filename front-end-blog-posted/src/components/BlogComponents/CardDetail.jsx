import { useEffect, useState } from "react";
import { format } from "date-fns";
import useBlogStore from "../../store/useBlogStore";
import useAuthStore from "../../store/useAuthStore";
import useCommentStore from "../../store/useCommentStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faThumbsDown as faThumbsDownSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faComment,
  faShareSquare,
} from "@fortawesome/free-regular-svg-icons";
import { Helmet } from "react-helmet-async";

const API = import.meta.env.VITE_BASE_API_URI;

export default function CardDetail({ id }) {
  const { currentBlog, fetchBlogById, isLoading } = useBlogStore();
  const { user } = useAuthStore();
  const {
    comments,
    fetchComments,
    addComment,
    isLoading: isCommentLoading,
  } = useCommentStore();

  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (id) {
      fetchBlogById(id);
      fetchComments(id);
    }
  }, [id]);

  const handlePostComment = async () => {
    if (!commentText.trim()) return;
    const res = await addComment(id, commentText);
    if (res.success) {
      setCommentText("");
    }
  };

  if (isLoading || !currentBlog) {
    return (
      <div className="max-w-[680px] mx-auto px-6 py-12 mt-10 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-8"></div>
        <div className="flex gap-4 mb-10">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-200 w-32 rounded"></div>
            <div className="h-3 bg-gray-200 w-24 rounded"></div>
          </div>
        </div>
        <div className="h-64 bg-gray-200 rounded w-full mb-8"></div>
        <div className="h-4 bg-gray-200 w-full mb-4 rounded"></div>
        <div className="h-4 bg-gray-200 w-full mb-4 rounded"></div>
        <div className="h-4 bg-gray-200 w-2/3 rounded"></div>
      </div>
    );
  }

  const isLiked = user && currentBlog.likes?.includes(user._id);

  return (
    <>
      <Helmet>
        <title>Inkly - {currentBlog.title}</title>
        <meta name="description" content={currentBlog.description} />
        <meta
          name="keywords"
          content={currentBlog.tag.map((tag) => tag.tagname)}
        />
      </Helmet>
      <article className="max-w-[720px] mx-auto px-6 py-12 font-serif text-gray-800">
        {/* Author Meta Block */}
        <div className="flex items-center gap-4 mb-8">
          <img
            className="w-12 h-12 rounded-full object-cover border border-gray-100"
            src={
              currentBlog.author?.image
                ? `${API}/${currentBlog.author.image}`
                : "https://api.dicebear.com/7.x/initials/svg?seed=" +
                  (currentBlog.author?.name || "U")
            }
            alt={currentBlog.author?.name}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-medium font-sans text-gray-900">
                {currentBlog.author?.name}
              </span>
              <button className="text-green-600 font-sans text-[13px] font-medium hover:text-green-700">
                Follow
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-sans">
              <span>4 min read</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span>
                {currentBlog.createdAt
                  ? format(new Date(currentBlog.createdAt), "MMM d, yyyy")
                  : ""}
              </span>
            </div>
          </div>
        </div>
        {/* Title */}
        <h1 className="text-4xl md:text-[42px] font-bold leading-tight mb-8 text-gray-900 tracking-tight">
          {currentBlog.title}
        </h1>

        {/* Subtitle / Description (Optional) */}
        {currentBlog.description && (
          <p className="text-xl text-gray-500 mb-8 leading-relaxed font-sans font-light">
            {currentBlog.description}
          </p>
        )}

        {/* Action Bar (Top) */}
        <div className="flex items-center justify-between border-y border-gray-100 py-3 mb-10 text-gray-500">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 hover:text-black transition-colors">
              <FontAwesomeIcon
                icon={isLiked ? faHeartSolid : faHeart}
                className={isLiked ? "text-red-500" : ""}
              />
              <span className="text-sm font-sans">
                {currentBlog.likes?.length || 0}
              </span>
            </button>
            <button className="flex items-center gap-2 hover:text-black transition-colors">
              <FontAwesomeIcon icon={faComment} />
              <span className="text-sm font-sans">
                {comments?.length || currentBlog.comments?.length || 0}
              </span>
            </button>
          </div>
          <div className="flex items-center gap-6">
            <button className="hover:text-black transition-colors">
              <FontAwesomeIcon icon={faShareSquare} />
            </button>
          </div>
        </div>

        {/* Main Content Areas (Mapping over paragraphs and images) */}
        <div className="prose prose-lg prose-gray max-w-none font-serif text-[20px] leading-relaxed tracking-normal text-gray-800">
          {currentBlog.content?.map((item, index) => {
            if (item.type === "text" && index > 0) {
              return (
                <p key={index} className="mb-8 font-serif">
                  {item.content}
                </p>
              );
            }
            return null;
          })}

          {/* Render Images if any exist inline (Simplified mapping) */}
          {currentBlog.blog_image?.map((img, index) => (
            <figure key={index} className="my-12">
              <img
                src={`${API}/${img.image_path}`}
                alt="Blog Illustration"
                className="w-full h-auto rounded-sm"
              />
              {/* Optional caption could go here */}
              <figcaption className="text-center text-sm text-gray-500 mt-3 font-sans">
                Image source or caption
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Tags */}
        {currentBlog.tag?.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-12 mb-8 font-sans">
            {currentBlog.tag.map((t, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
              >
                {t.tagname}
              </span>
            ))}
          </div>
        )}

        {/* Action Bar (Bottom) */}
        <div className="flex items-center justify-between border-y border-gray-100 py-3 mt-8 text-gray-500 pb-12">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 hover:text-black transition-colors">
              <FontAwesomeIcon
                icon={isLiked ? faHeartSolid : faHeart}
                className={isLiked ? "text-red-500" : ""}
              />
              <span className="text-sm font-sans">
                {currentBlog.likes?.length || 0}
              </span>
            </button>
            <button className="flex items-center gap-2 hover:text-black transition-colors">
              <FontAwesomeIcon icon={faComment} />
              <span className="text-sm font-sans">
                {comments?.length || currentBlog.comments?.length || 0}
              </span>
            </button>
          </div>
        </div>

        {/* Comment Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold font-sans mb-6">
            Responses ({comments?.length || 0})
          </h3>

          {/* Comment Input */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={
                      user.image
                        ? `${API}/${user.image}`
                        : `https://api.dicebear.com/7.x/initials/svg?seed=${user.first_name || "User"}`
                    }
                    className="w-8 h-8 rounded-full"
                    alt="User avatar"
                  />
                  <span className="font-sans font-medium text-sm">
                    {user.first_name} {user.last_name}
                  </span>
                </div>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="What are your thoughts?"
                  className="w-full resize-none outline-none font-sans text-gray-800 min-h-[80px]"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handlePostComment}
                    disabled={isCommentLoading || !commentText.trim()}
                    className="px-4 py-1.5 bg-green-600 text-white rounded-full font-sans text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
                  >
                    {isCommentLoading ? "Posting..." : "Respond"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="font-sans text-gray-600 mb-2">
                  What are your thoughts?
                </p>
                <p className="font-sans text-sm text-gray-500">
                  Sign in to leave a comment.
                </p>
              </div>
            )}
          </div>

          {/* Comment List */}
          <div className="flex flex-col gap-6">
            {comments && comments.length > 0 ? (
              comments.map((comment, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.userid}`}
                      className="w-10 h-10 rounded-full"
                      alt="User avatar"
                    />
                    <div className="flex flex-col">
                      <span className="font-sans font-medium text-sm">
                        User {comment.userid.substring(0, 6)}{" "}
                        {/* Ideally replace with actual username if populated */}
                      </span>
                      <span className="font-sans text-xs text-gray-500">
                        {comment.createdAt
                          ? format(new Date(comment.createdAt), "MMM d, yyyy")
                          : ""}
                      </span>
                    </div>
                  </div>
                  <p className="font-sans text-gray-800 whitespace-pre-wrap">
                    {comment.comment}
                  </p>
                </div>
              ))
            ) : (
              <p className="font-sans text-gray-500 text-center py-8">
                No responses yet. Be the first to share your thoughts!
              </p>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
