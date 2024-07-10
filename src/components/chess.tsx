"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFull,
  faCircle,
  faChessPawn,
  faChessBishop,
  faChessKing,
  faChessKnight,
  faChessQueen,
  faChessRook
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquareFull as faSquareOutline,
} from "@fortawesome/free-regular-svg-icons"
import { useEffect, useState } from "react";

import Module, { Board, FairyStockfish } from 'ffish-es6';

type Theme = {
  title: string;
  bg: string;
  border: string;
  square: {
    white: string;
    whiteHighlight: string;
    black: string;
    blackHighlight: string;
  };
  piece: {
    white: string;
    black: string;
  };
  indicator: string;
};

const themes = [
  {
    "title": "Default",
    "bg": "bg-white",
    "border": "border-black",
    "square": {
      "white": "text-emerald-300",
      "whiteHighlight": "text-emerald-400",
      "black": "text-emerald-700",
      "blackHighlight": "text-emerald-600"
    },
    "piece": {
      "white": "text-white",
      "black": "text-black"
    },
    "indicator": "text-emerald-500"
  },
  {
    "title": "Wood",
    "bg": "bg-yellow-200",
    "border": "border-yellow-600",
    "square": {
      "white": "text-yellow-500",
      "whiteHighlight": "text-yellow-600",
      "black": "text-yellow-700",
      "blackHighlight": "text-yellow-600"
    },
    "piece": {
      "white": "text-yellow-400",
      "black": "text-yellow-900"
    },
    "indicator": "text-yellow-500"
  },
  {
    "title": "Ocean",
    "bg": "bg-blue-200",
    "border": "border-blue-400",
    "square": {
      "white": "text-blue-500",
      "whiteHighlight": "text-blue-600",
      "black": "text-blue-700",
      "blackHighlight": "text-blue-600"
    },
    "piece": {
      "white": "text-blue-300",
      "black": "text-blue-800"
    },
    "indicator": "text-blue-600"
  },
  {
    "title": "Space",
    "bg": "bg-gray-900",
    "border": "border-gray-700",
    "square": {
      "white": "text-gray-700",
      "whiteHighlight": "text-gray-800",
      "black": "text-gray-800",
      "blackHighlight": "text-gray-900"
    },
    "piece": {
      "white": "text-gray-100",
      "black": "text-gray-500"
    },
    "indicator": "text-gray-700"
  },
  {
    "title": "Beach",
    "bg": "bg-yellow-100",
    "border": "border-yellow-200",
    "square": {
      "white": "text-blue-500",
      "whiteHighlight": "text-blue-600",
      "black": "text-blue-600",
      "blackHighlight": "text-blue-700"
    },
    "piece": {
      "white": "text-blue-300",
      "black": "text-blue-800"
    },
    "indicator": "text-blue-500"
  },
  {
    "title": "Fire",
    "bg": "bg-red-100",
    "border": "border-red-400",
    "square": {
      "white": "text-red-500",
      "whiteHighlight": "text-red-600",
      "black": "text-red-600",
      "blackHighlight": "text-red-700"
    },
    "piece": {
      "white": "text-red-300",
      "black": "text-red-800"
    },
    "indicator": "text-red-500"
  },
  {
    "title": "Ice",
    "bg": "bg-blue-200",
    "border": "border-blue-500",
    "square": {
      "white": "text-blue-600",
      "whiteHighlight": "text-blue-700",
      "black": "text-blue-700",
      "blackHighlight": "text-blue-800"
    },
    "piece": {
      "white": "text-blue-400",
      "black": "text-blue-900"
    },
    "indicator": "text-blue-600"
  },
] as Theme[];

function coordToUci(j: number, i: number) {
  return String.fromCharCode(97 + (j)) + (8 - i);
}

export default function Chess() {
  const [ffish, setFFish] = useState<FairyStockfish | null>(null);
  useEffect(() => {
    (async () => {
      setFFish(await Module());
    })();
  }, []);

  useEffect(() => {
    if (ffish) {
      setFFishBoard(new ffish.Board("chess"));
    }
  }, [ffish]);

  const [ffishBoard, setFFishBoard] = useState<Board | null>(null);

  const [theme, setTheme] = useState<Theme>(themes[0]);

  const [selected, setSelected] = useState<string | null>(null);
  function handleClick(clicked: string) {
    console.log(selected, clicked);
    if (selected) {
      if (selected === clicked) {
        setSelected(null);
      } else if (ffishBoard && ffishBoard.push(selected + clicked)) {
        setSelected(null);
      }
    } else {
      setSelected(clicked);
    }
  }

  const legalMoves = ffishBoard?.legalMoves()?.split(" ");
  let indicatedSquares = [] as string[];

  if (selected) {
    indicatedSquares = legalMoves?.filter(move => move.startsWith(selected)).map(move => move.slice(2)) ?? [];
  }

  return (
    <main className={[theme.bg, "min-h-screen flex justify-center items-center flex-col gap-2"].join(" ")}>
      {
        ffish && ffishBoard ?
          <div className={["relative w-96 aspect-square border-solid border-8", theme.border].join(" ")}>
            <div className="grid grid-cols-8 grid-rows-8 w-full h-full aspect-squ6aare">
              {
                ffishBoard?.toString().split("\n").map(
                  (row, i) => row.split(" ").map(
                    (cell, j) => {
                      const uci = coordToUci(j, i);

                      let icon = null;
                      let color = null;
                      switch (cell) {
                        case "p":
                          color = "black";
                          icon = faChessPawn;
                          break;
                        case "r":
                          color = "black";
                          icon = faChessRook;
                          break;
                        case "n":
                          color = "black";
                          icon = faChessKnight;
                          break;
                        case "b":
                          color = "black";
                          icon = faChessBishop;
                          break;
                        case "q":
                          color = "black";
                          icon = faChessQueen;
                          break;
                        case "k":
                          color = "black";
                          icon = faChessKing;
                          break;
                        case "P":
                          color = "white";
                          icon = faChessPawn;
                          break;
                        case "R":
                          color = "white";
                          icon = faChessRook;
                          break;
                        case "N":
                          color = "white";
                          icon = faChessKnight;
                          break;
                        case "B":
                          color = "white";
                          icon = faChessBishop;
                          break;
                        case "Q":
                          color = "white";
                          icon = faChessQueen;
                          break;
                        case "K":
                          color = "white";
                          icon = faChessKing;
                          break;
                      }
                      return <div
                        style={{ lineHeight: 0 }}
                        className="relative w-full aspect-square"
                        onClick={() => {
                          if ((cell !== "." && color === (ffishBoard.turn() ? "white" : "black")) || selected !== null) {
                            handleClick(uci)
                          }
                        }}
                        key={`${i}-${j}`}
                      >
                        <FontAwesomeIcon
                          icon={faSquareFull}
                          className={[
                            "w-full h-full",
                            (i + j) % 2 === 0 ? theme.square.white : theme.square.black
                          ].join(" ")}
                          key={`${i}-${j}`}
                        />
                        {
                          selected === uci ? <div className="w-full absolute inset-0 flex justify-center items-center aspect-square">
                            <FontAwesomeIcon
                              icon={faSquareOutline}
                              className={[
                                "w-full h-full",
                                (i + j) % 2 === 0 ? theme.square.whiteHighlight : theme.square.blackHighlight
                              ].join(" ")}
                              key={`${i}-${j}`}
                            />
                          </div> : null
                        }
                        {
                          icon ? <div className="w-full absolute inset-0 flex justify-center items-center aspect-square">
                            <FontAwesomeIcon
                              icon={icon}
                              className={[color === "white" ? theme.piece.white : theme.piece.black].join(" ")}
                              key={`${i}-${j}`}
                              size="2xl"
                            />
                          </div> : null
                        }
                        {
                          indicatedSquares.includes(uci) ? <div className="w-full absolute inset-0 flex justify-center items-center aspect-square">
                            <FontAwesomeIcon
                              icon={faCircle}
                              className={["opacity-50", theme.indicator].join(" ")}
                              key={`${i}-${j}`}
                              size="xl"
                            />
                          </div> : null
                        }
                      </div>
                    }
                  )
                )
              }
            </div>
          </div>
          :
          <div className="flex flex-col gap-4">
            <FontAwesomeIcon icon={faChessKing} spin size="5x" className="text-gray-500" />
            <p>Loading...</p>
          </div>
      }
      <select onChange={(e) => setTheme(themes[parseInt(e.target.value)])}>
        {
          themes.map((theme, i) => <option key={theme.title} value={i}>{theme.title}</option>)
        }
      </select>
    </main>
  );
}
