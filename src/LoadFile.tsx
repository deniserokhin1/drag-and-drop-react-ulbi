import React, { useState } from "react";
import "./LoadFile.css";
import axios from "axios";

const LoadFile = () => {
  const [drag, setDrag] = useState(false);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    console.log(files);
    const formData = new FormData();
    formData.append("file", files[0]);
    axios.post("url", formData);
    setDrag(false);
  };
  return (
    <div className="wrapper">
      {drag ? (
        <div
          className="container"
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => onDrop(e)}
        >
          Отпустите файл, чтобы загрузить его.
        </div>
      ) : (
        <div
          className="container"
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
        >
          Перетащите сюда файл.
        </div>
      )}
    </div>
  );
};

export default LoadFile;
