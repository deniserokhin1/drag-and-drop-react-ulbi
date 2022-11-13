import React, { DragEvent, FC, useState } from "react";
import "./App.css";
import { ICard } from "./types";

const App: FC = () => {
  const [carddList, setCardList] = useState([
    { id: 1, order: 3, text: "КАРТОЧКА 3" },
    { id: 2, order: 1, text: "КАРТОЧКА 1" },
    { id: 3, order: 2, text: "КАРТОЧКА 2" },
    { id: 4, order: 4, text: "КАРТОЧКА 4" },
  ] as ICard[]);
  console.log(carddList);
  const [currentCard, setCurrentCard] = useState({} as ICard);

  const dragStartHandler = (e: DragEvent<HTMLDivElement>, card: ICard) => {
    setCurrentCard(card);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const targetCard = e.target as HTMLDivElement;
    targetCard.classList.remove("cardOver");
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    const targetCard = e.target as HTMLDivElement;
    targetCard.classList.remove("cardOver");
  };

  const dragOvertHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const targetCard = e.target as HTMLDivElement;
    targetCard.classList.add("cardOver");
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>, card: ICard) => {
    e.preventDefault();
    const targetCard = e.target as HTMLDivElement;
    targetCard.classList.remove("cardOver");
    setCardList(
      carddList.map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentCard.order };
        }
        if (c.id === currentCard.id) {
          return { ...c, order: card.order };
        }
        return c;
      })
    );
  };

  const sortCards = (a: ICard, b: ICard) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <div className="wrapper">
      {carddList.sort(sortCards).map((card) => (
        <div
          className="card"
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragOvertHandler(e)}
          onDrop={(e) => dropHandler(e, card)}
          draggable="true"
          key={card.id}
          id={card.id.toString()}
        >
          {card.text}
        </div>
      ))}
    </div>
  );
};

export default App;
