import React from "react";

function NewPostButton({ Icon, name, color }) {
  return (
    <div className="flex items-center space-x-2 hover:bg-gray-200 hover:w-[180px] p-2 rounded-lg cursor-pointer">
      <Icon className={color} />
      <p className="text-gray-500 font-bold">{name}</p>
    </div>
  );
}

export default NewPostButton;
