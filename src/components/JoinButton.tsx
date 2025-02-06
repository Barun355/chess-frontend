import React from "react";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";

const JoinButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate("/game")} className="w-[24rem] flex gap-4">
      <img src="piece.png" className="h-16" alt="chess pawn piece" />
      <div className="flex flex-col gap-1 justify-center items-start">
        <span className="text-3xl font-bold">Join now.</span>
        <span className="font-light">Play with someone with your level</span>
      </div>
    </Button>
  );
};

export default JoinButton;
