import React from "react";
import JoinButton from "../components/JoinButton";

const Landing: React.FC = () => {

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full md:w-1/2 h-full justify-center items-center hidden md:flex">
        <img
          src="chess_board.png"
          alt="chess board"
          className="h-96 rounded-md"
        />
      </div>
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center gap-10">
        <h1 className="text-3xl font-bold text-center">
          Play Chess online on the #1 Place
        </h1>
        <div className="flex gap-10">
          <div className="flex gap-2">
            <span className="font-bold">18,058,275</span>
            <span className="text-white/70">Games Today</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">202,421</span>
            <span className="text-white/70">Playing Now</span>
          </div>
        </div>
        <div className="mt-2 flex flex-col w-full items-center">
          <JoinButton />
        </div>
      </div>
    </div>
  );
};

export default Landing;
