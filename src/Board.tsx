import React, { useState } from "react";
import { todos } from "./assets";
import { IBoard, IItem } from "./types";
import "./Board.css";

const Board = () => {
  const [boards, setBoards] = useState(todos);
  const [currentBoard, setCurrentBoard] = useState({} as IBoard);
  const [currentItem, setCurrentItem] = useState({} as IItem);

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: IBoard,
    item: IItem
  ) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.className.includes("itemOver")) {
      target.classList.remove("itemOver");
    }
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.className.includes("itemOver")) {
      target.classList.remove("itemOver");
    }
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    if (target.className === "item") {
      target.classList.add("itemOver");
    }
  };

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: IBoard,
    item: IItem
  ) => {
    const target = e.target as HTMLDivElement;
    e.stopPropagation();
    if (target.className.includes("itemOver")) {
      target.classList.remove("itemOver");
    }
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        // if (b.id === currentBoard.id) {
        //   return currentBoard;
        // }
        return b;
      })
    );
  };

  const dropCardHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: IBoard
  ) => {
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    board.items.push(currentItem);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  };

  return (
    <div className="wrapper">
      {boards.map((board) => (
        <div
          onDragOver={dragOverHandler}
          onDrop={(e) => dropCardHandler(e, board)}
          className="board"
          key={board.id}
        >
          <div className="board__title">{board.title}</div>
          {board.items.map((item) => (
            <div
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={dragLeaveHandler}
              onDrop={(e) => dropHandler(e, board, item)}
              className="item"
              key={item.id}
              draggable={true}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
