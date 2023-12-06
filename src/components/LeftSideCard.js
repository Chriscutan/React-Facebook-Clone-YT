import React from "react";

function LeftSideCard({ Icon, name, profile }) {
  return (
    <div className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-lg mt-2 cursor-pointer">
      {profile ? (
        <img
          src={Icon}
          alt="profile"
          className="h-14 w-14 rounded-full object-contain"
        />
      ) : (
        <Icon />
      )}
      <p className="font-semibold">{name}</p>
    </div>
  );
}

export default LeftSideCard;
