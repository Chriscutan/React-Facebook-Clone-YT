import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password).catch((err) =>
      alert(err.message)
    );
  };

  const signInUser = () => {
    createUserWithEmailAndPassword(auth, email, password).catch((err) =>
      alert(err.message)
    );
  };
  return (
    <div className="flex flex-col items-center space-y-6 mt-52">
      <h1 className="text-6xl font-bold text-blue-400">Facebook</h1>

      <form className="flex flex-col items-center space-y-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          className="bg-gray-200 px-5 py-2 rounded-lg outline-none"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="bg-gray-200 px-5 py-2 rounded-lg outline-none"
        />
        <button
          onClick={loginUser}
          className="bg-blue-400 w-full py-3 rounded-lg text-sm font-bold text-white hover:scale-110 transition-all duration-200 ease-in-out"
        >
          Sign In
        </button>
      </form>

      <button
        onClick={signInUser}
        className="border border-blue-400 w-[220px] p-3 text-sm font-bold hover:bg-blue-400 hover:text-white rounded-lg hover:scale-110 transition-all duration-200 ease-in-out"
      >
        Sign Up
      </button>
    </div>
  );
}

export default LoginPage;
