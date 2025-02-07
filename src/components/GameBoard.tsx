import { Chess, Color, PieceSymbol, Square } from "chess.js";
import React, { useState } from "react";
import { MOVE } from "../utils/constant";
import { toast } from "react-toastify";

interface GameBoardType {
  chess: Chess;
  started: boolean;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  setBoard: React.Dispatch<
    React.SetStateAction<
      ({
        square: Square;
        type: PieceSymbol;
        color: Color;
      } | null)[][]
    >
  >;
}

const GameBoard: React.FC<GameBoardType> = ({
  chess,
  started,
  board,
  setBoard,
  socket,
}) => {
  const [from, setFrom] = useState<Square | undefined>(undefined);
  // console.log(board)
  return (
    <div className="flex justify-center items-center h-fit w-fit p-4">
      <div className="h-fit rounded-md text-black w-fit">
        {board.map((row, i) => (
          <div className="relative" key={i}>
            <span className="text-white flex justify-center items-center w-12 absolute top-[25%] -left-10">
              {Math.abs(i - 8)}
            </span>
            <div
              className="bg-slate-100 h-12 md:h-14 lg:h-18 w-[26rem] md:w-[30rem] lg:w-[40rem] grid grid-cols-8"
            >
              {row.map((square, j) => {
                j++;
                const row = Math.abs(i - 8);
                const squareRepresentation = (String.fromCharCode(97 + j - 1) +
                  `${row}`) as Square;
                // console.log(i,j, squareRepresentation)
                return (
                  <div className="relative" key={j}>
                    <div
                      className={`h-full w-full flex justify-center items-center ${
                        (i % 2 === 0 && j % 2 === 0) ||
                        (i % 2 === 1 && j % 2 === 1)
                          ? "bg-[#EBECD0]"
                          : "bg-[#779556]"
                      }`}
                      onClick={() => {
                        if (!started) {
                          toast.warning("Start the game first");
                          return;
                        }
                        if (!from) {
                          console.log(
                            `${square?.color} move from: ${squareRepresentation}`
                          );
                          setFrom(squareRepresentation);
                        } else {
                          socket.send(
                            JSON.stringify({
                              type: MOVE,
                              payload: {
                                move: { from, to: squareRepresentation },
                              },
                            })
                          );
                          chess.move({ from, to: squareRepresentation });
                          setBoard(chess.board());
                          setFrom(undefined);
                        }
                      }}
                    >
                      {square?.type && (
                        <img
                          src={`chess_pieces/${square?.color}_${square?.type}.png`}
                          alt="chess pices"
                          className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10"
                        />
                      )}
                    </div>
                    {row === 1 && (
                      <span className="text-white flex justify-center items-center absolute left-[50%] -bottom-8">
                        {String.fromCharCode(97 + j - 1)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
