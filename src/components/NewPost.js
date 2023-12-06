import { Avatar } from "@mui/material";
import React from "react";
import NewPostButton from "./NewPostButton";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

function NewPost() {
  return (
    <div className="flex flex-col bg-white mt-5 p-2 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2 p-3 border-b border-gray-200">
        <Avatar />
        <input
          type="text"
          placeholder="Whats on your mind, Chriscutan?"
          className="flex-1 p-2 rounded-full bg-gray-200/50"
        />
      </div>

      <div className="flex items-center justify-around mt-2">
        <NewPostButton
          Icon={LiveTvIcon}
          name="Live video"
          color="text-red-500"
        />

        <NewPostButton
          Icon={InsertPhotoIcon}
          name="Photo/video"
          color="text-green-500"
        />

        <NewPostButton
          Icon={InsertEmoticonIcon}
          name="Feeling/activity"
          color="text-yellow-500"
        />
      </div>
    </div>
  );
}

export default NewPost;
