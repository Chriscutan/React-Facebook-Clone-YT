import { Avatar } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { format } from "timeago.js";

function Post({ post_desc, post_image, profile_pic, time, username }) {
  return (
    <div className="flex flex-col bg-white rounded-lg mt-3 p-2">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-2">
          <Avatar src={profile_pic} />

          <div className="flex flex-col">
            <p className="font-semibold text-gray-500 cursor-pointer hover:underline decoration-gray-500">
              {username}
            </p>
            <p className="text-xs text-gray-500">{format(time)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-gray-500">
          <MoreHorizIcon />
          <CloseIcon />
        </div>
      </div>

      <p>{post_desc}</p>

      <img
        src={post_image}
        alt="post_image"
        className="mt-2 object-cover rounded-lg"
      />

      <div className="flex items-center justify-end p-2 space-x-2 text-gray-500 mb-2 border-b border-gray-200">
        <p className="hover:underline dec-gray-500 cursor-pointer">
          <span>5.4k</span> comments
        </p>
        <p className="hover:underline dec-gray-500 cursor-pointer">
          <span>12k</span> shares
        </p>
      </div>

      <div className="flex items-center justify-around">
        <div className="flex items-center justify-center space-x-2 text-gray-500 hover:w-[200px] hover:bg-gray-200 cursor-pointer hover:h-[50px] rounded-lg">
          <ThumbUpOutlinedIcon />
          <p>Like</p>
        </div>

        <div className="flex items-center justify-center  space-x-2 text-gray-500 hover:w-[200px] hover:bg-gray-200 cursor-pointer p-2 rounded-lg text-center">
          <ChatBubbleOutlineOutlinedIcon />
          <p>Comment</p>
        </div>

        <div className="flex items-center justify-center  space-x-2 text-gray-500 hover:w-[200px] hover:bg-gray-200 cursor-pointer p-2 rounded-lg text-center">
          <ReplyOutlinedIcon />
          <p>Share</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
