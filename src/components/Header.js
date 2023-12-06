import React, { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AppsIcon from "@mui/icons-material/Apps";
import MapsUgcRoundedIcon from "@mui/icons-material/MapsUgcRounded";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

function Header({
  setShowProfileModal,
  showProfileModal,
  showPostModal,
  setShowPostModal,
}) {
  const [user, setUser] = useState({});

  const currentUserEmail = auth?.currentUser?.email;

  useEffect(() => {
    onSnapshot(doc(db, `users/${currentUserEmail}`), (snapshot) => {
      setUser({
        id: snapshot.id,
        username: snapshot.data().username,
        profile_pic: snapshot.data().profile_pic,
      });
    });
  }, [currentUserEmail]);
  return (
    <header className="p-3 flex items-center justify-between shadow-lg sticky top-0 bg-white z-10">
      <div className="flex items-center space-x-1">
        <img
          src="https://imgs.search.brave.com/jJCoPasn2serH2FU-dHJQycakDfaNS7AZ2vE_CuAUNg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzMyLzIwLzAz/LzM2MF9GXzUzMjIw/MDM1NV9vZEtOOU91/M1dCNmlIV0pURklF/bEZ0SmJUdXpKc3BZ/Ni5qcGc"
          alt="fb-logo"
          className="h-10 w-10"
        />

        <div className="bg-gray-200 p-3 rounded-full flex items-center space-x-1">
          <SearchOutlinedIcon className="text-gray-500" />
          <input
            type="text"
            placeholder="Search Facebook"
            className="bg-transparent flex-1 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center space-x-10">
        <div
          className="hover:bg-gray-200 rounded-lg cursor-pointer px-8 py-2"
          title="Home"
        >
          <HomeIcon fontSize="medium" className="" />
        </div>

        <div
          className="hover:bg-gray-200 rounded-lg cursor-pointer px-8 py-2"
          title="Friends"
        >
          <GroupIcon fontSize="medium" />
        </div>

        <div
          className="hover:bg-gray-200 rounded-lg cursor-pointer px-8 py-2"
          title="Videos"
        >
          <OndemandVideoIcon fontSize="medium" />
        </div>

        <div
          className="hover:bg-gray-200 rounded-lg cursor-pointer px-8 py-2"
          title="Marketplace"
        >
          <StorefrontIcon fontSize="medium" />
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <IconButton>
          <AppsIcon />
        </IconButton>

        <IconButton onClick={() => setShowPostModal(!showPostModal)}>
          <MapsUgcRoundedIcon />
        </IconButton>

        <IconButton>
          <NotificationsActiveIcon />
        </IconButton>

        <IconButton onClick={() => setShowProfileModal(!showProfileModal)}>
          <Avatar src={user?.profile_pic} />
        </IconButton>
      </div>
    </header>
  );
}

export default Header;
