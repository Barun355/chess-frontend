import React, { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { GAME_STARTED, INIT_GAME, MOVE, WAIT } from "../utils/constant";
import GameBoard from "../components/GameBoard";
import Button from "../components/ui/Button";
import { Chess } from "chess.js";
import { toast } from "react-toastify";

const Game: React.FC = () => {
  const socket = useSocket();
  const [started, setStarted] = useState(false);
  const [chess, setChess] = useState<Chess>(new Chess());
  const [oppentReady, setOppentReady] = useState(false);
  const [board, setBoard] = useState(chess.board());
  console.log(socket);
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case WAIT:
          setOppentReady(false);
          toast.warning(message.payload?.message);
          break;
        case GAME_STARTED:
          setOppentReady(true);
          toast.warning(message.payload?.message);
          break;
        case MOVE:
          chess.move(message.payload);
          setBoard(chess.board());
          break;
        default:
          break;
      }
    };
  }, [socket]);

  if (!socket) {
    return <h1>Starting Game</h1>;
  }
  return (
    <div className="flex flex-col gap-10 py-10 px-4 md:gap-0 md:flex-row h-full w-full md:py-16 md:px-6">
      <div className="justify-center items-center h-full flex-1">
        <GameBoard
          chess={chess}
          board={board}
          setBoard={setBoard}
          socket={socket}
        />
      </div>
      <div className="flex flex-col justify-start items-start md:items-center h-full w-[24rem] gap-10">
        {!started && (
          <Button
            onClick={() => {
              socket.send(
                JSON.stringify({
                  type: INIT_GAME,
                })
              );
              setStarted(true);
            }}
            className="text-lg font-bold"
          >
            Start Game
          </Button>
        )}
        {started && !oppentReady ? (
          <h1 className="text-3xl">Waiting for someone to join</h1>
        ) : (
          <div className="flex">
            <h1>History</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
