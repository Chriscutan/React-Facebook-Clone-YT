import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import LeftSideCard from "../components/LeftSideCard";
import GroupIcon from "@mui/icons-material/Group";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import StorefrontIcon from "@mui/icons-material/Storefront";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import HistoryIcon from "@mui/icons-material/History";
import CreateStory from "../components/CreateStory";
import NewPost from "../components/NewPost";
import Post from "../components/Post";
import AddIcon from "@mui/icons-material/Add";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
function HomePage() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const [user, setUser] = useState({});
  const postFilePickerRef = useRef(null);
  const [postSelectedFile, setPostSelectedFile] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postDesc, setPostDesc] = useState("");
  const [posts, setPosts] = useState([]);

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

  const addImageToProfile = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const imageRef = ref(storage, `users/${email}/profile`);

    await uploadString(imageRef, selectedFile, "data_url").then(async () => {
      const downloadUrl = await getDownloadURL(imageRef);

      setDoc(doc(db, `users/${email}`), {
        username: username,
        email: email,
        mobile: mobile,
        profile_pic: downloadUrl,
        time: serverTimestamp(),
      });
    });

    setSelectedFile(null);
    setUsername("");
    setEmail("");
    setMobile("");
    setShowProfileModal(false);
  };

  const addImageToPost = (e) => {
    e.preventDefault();

    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setPostSelectedFile(readerEvent.target.result);
    };
  };

  const uploadPost = async (e) => {
    e.preventDefault();

    const imageRef = ref(storage, `posts/${currentUserEmail}${Math.random()}`);

    await uploadString(imageRef, postSelectedFile, "data_url").then(
      async () => {
        const downloadUrl = await getDownloadURL(imageRef);

        addDoc(collection(db, `posts`), {
          profile_pic: user?.profile_pic,
          username: user?.username,
          post_desc: postDesc,
          post_image: downloadUrl,
          time: serverTimestamp(),
        });
      }
    );

    setPostSelectedFile(null);
    setPostDesc("");
    setShowPostModal(false);
  };

  useEffect(() => {
    onSnapshot(collection(db, `posts`), (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          username: doc.data().username,
          post_desc: doc.data().post_desc,
          post_image: doc.data().post_image,
          profile_pic: doc.data().profile_pic,
          time: doc.data().time,
        }))
      );
    });
  }, []);

  console.log(posts);
  return (
    <div>
      <Header
        setShowProfileModal={setShowProfileModal}
        showProfileModal={showProfileModal}
        showPostModal={showPostModal}
        setShowPostModal={setShowPostModal}
      />

      <div className="bg-gray-100 flex items-start justify-between p-3 space-x-6 max-w-6xl mx-auto">
        {/* Left Side Cards */}
        <div>
          <LeftSideCard Icon={user?.profile_pic} name="Chriscutan" profile />
          <LeftSideCard Icon={GroupIcon} name="Find friends" />
          <LeftSideCard Icon={Diversity3RoundedIcon} name="Groups" />
          <LeftSideCard Icon={FeedRoundedIcon} name="Feeds" />
          <LeftSideCard Icon={StorefrontIcon} name="Market place" />
          <LeftSideCard Icon={OndemandVideoIcon} name="Videos" />
          <LeftSideCard Icon={HistoryIcon} name="Memories" />
        </div>

        {/* Feeds Section */}
        <div className="">
          <CreateStory />

          <NewPost />

          <div className="max-w-xl">
            {posts?.map((post) => (
              <Post
                key={post.id}
                post_desc={post.post_desc}
                post_image={post.post_image}
                profile_pic={post.profile_pic}
                username={post.username}
                time={post?.time?.toDate().getTime()}
              />
            ))}
          </div>
        </div>
        {/* Right Side Card */}
        <div>
          <h1 className="text-gray-500 font-bold">Group conversations</h1>
          <LeftSideCard Icon={AddIcon} name="Create new group" />
        </div>
      </div>

      {showProfileModal && (
        <div className="max-w-sm bg-white rounded-lg p-3 fixed top-28 shadow-xl z-100">
          <div>
            <img
              src={
                selectedFile
                  ? selectedFile
                  : "https://imgs.search.brave.com/t6cJk1K3-wWG8_yNRQLZ_Z20kkaa_jGFUJN2bQHS2Gc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzYyLzYzLzY1/LzM2MF9GXzQ2MjYz/NjUwMl85Y0RBWXV5/VnZCWTRxWUpsSGpX/N3ZxYXI1SFlTOGg4/eC5qcGc"
              }
              alt="profile_pic"
              className="h-20 w-20 rounded-full mx-auto cursor-pointer mb-4"
              onClick={() => filePickerRef.current.click()}
            />

            <input
              type="file"
              ref={filePickerRef}
              hidden
              onChange={addImageToProfile}
            />
          </div>

          <form className="flex flex-col items-center space-y-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="bg-gray-200 p-3 rounded-lg outline-none"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="bg-gray-200 p-3 rounded-lg outline-none"
            />
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              type="mobile"
              placeholder="Mobile"
              className="bg-gray-200 p-3 rounded-lg outline-none"
            />
            <button
              onClick={updateProfile}
              className="bg-blue-400 w-full py-2 rounded-lg text-sm font-bold text-white hover:scale-110 transition-all duration-200 ease-in-out"
            >
              Update Profile
            </button>
          </form>
        </div>
      )}

      {showPostModal && (
        <div className="flex flex-col items-center space-y-4 max-w-sm bg-white rounded-lg shadow-2xl p-3 fixed top-28">
          <div className="flex flex-col items-center">
            <img
              src={
                postSelectedFile
                  ? postSelectedFile
                  : "https://imgs.search.brave.com/t6cJk1K3-wWG8_yNRQLZ_Z20kkaa_jGFUJN2bQHS2Gc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzYyLzYzLzY1/LzM2MF9GXzQ2MjYz/NjUwMl85Y0RBWXV5/VnZCWTRxWUpsSGpX/N3ZxYXI1SFlTOGg4/eC5qcGc"
              }
              alt="post_image"
              className="h-40 w-40 object-contain cursor-pointer"
              onClick={() => postFilePickerRef.current.click()}
            />

            <input
              type="file"
              hidden
              ref={postFilePickerRef}
              onChange={addImageToPost}
            />
          </div>

          <form className="flex flex-col items-center space-y-3 max-w-sm">
            <input
              value={postDesc}
              onChange={(e) => setPostDesc(e.target.value)}
              type="text"
              placeholder="Post description"
              className="bg-gray-200 p-3 rounded-lg outline-none w-[100%]"
            />
            <button
              onClick={uploadPost}
              className="bg-blue-400 w-full py-2 rounded-lg text-sm font-bold text-white hover:scale-110 transition-all duration-200 ease-in-out"
            >
              Upload Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default HomePage;
