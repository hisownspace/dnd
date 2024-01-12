import { useState, useEffect, useRef, createElement } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

let inner;
let crt;

function App() {
  const cursorLocation = useRef({ x: null, y: null });
  const card = useRef();

  const vwToPixel = (vw) => {
    const px = (parseInt(vw) * document.documentElement.clientWidth) / 100;
    return px;
  };

  const pixelToVw = (pixel) => {
    return (parseInt(pixel) / document.documentElement.clientWidth) * 100;
  };

  const finishMove = (e) => {
    window.removeEventListener("mousemove", moveMatchCard);
    card.current.style.left = "50vw";
    card.current.style.transform = "translate(-50%, -50%)";
    const likeToast = document.querySelector(".like-toast");
    if (likeToast) likeToast.remove();
    if (e.clientX > 0.7 * document.documentElement.clientWidth) {
      console.log("LIKED");
    }
  };

  const moveMatchCard = (e) => {
    window.addEventListener("mouseup", finishMove);
    let deltaX = e.clientX - cursorLocation.current.x;
    let deltaY = e.clientY - cursorLocation.current.y;
    card.current.style.left = "50vw";
    card.current.style.left = `${pixelToVw(
      vwToPixel(card.current.style.left.slice(0, -2)) + deltaX,
    )}vw`;
    card.current.style.transform = `rotate(${
      deltaX / 75
    }deg) translate(-50%, -50%)`;
    if (
      e.clientX > 0.7 * document.documentElement.clientWidth &&
      !document.querySelector(".like-toast")
    ) {
      const like = document.createElement("div");
      console.log(like);
      like.classList.add("like-toast");
      card.current.appendChild(like);
      like.innerText = "Light It!";
    } else if (
      e.clientX <= 0.7 * document.documentElement.clientWidth &&
      document.querySelector(".like-toast") !== null
    ) {
      console.log("WHY NOT REMOVE!!!!");
      document.querySelector(".like-toast").remove();
    }
  };

  const dragCard = (e) => {
    cursorLocation.current = { x: e.clientX, y: e.clientY };
    window.addEventListener("mousemove", moveMatchCard);
  };

  useEffect(() => {
    let inner = document.getElementById("drag-card");
    card.current.addEventListener("mousedown", dragCard);
  }, []);

  return (
    <div className="container">
      <div className="droppable"></div>
      <div ref={card} className="inner">
        DRAG ME
      </div>
      <div className="droppable"></div>
    </div>
  );
}

export default App;
