import React from "react";
import AddIcon from "@mui/icons-material/Add";

function CreateStory() {
  return (
    <div className="bg-white p-2 rounded-lg shadow-sm mt-2">
      <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 hover:rounded-lg cursor-pointer">
        <AddIcon
          fontSize="large"
          className="bg-blue-200 rounded-full p-2 text-blue-400"
        />
        <div>
          <p className="font-bold">Create story</p>
          <p className="text-gray-500">Share a photo or write something</p>
        </div>
      </div>
    </div>
  );
}

export default CreateStory;
