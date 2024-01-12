import { useState, useEffect, useRef, createElement } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

let inner;
let crt;

function App() {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const cursorLocation = useRef({
    x: null,
    y: null,
    deltaX: null,
  });
  const card = useRef();

  const vwToPixel = (vw) => {
    const px = (parseInt(vw) * document.documentElement.clientWidth) / 100;
    return px;
  };

  const pixelToVw = (pixel) => {
    return (parseInt(pixel) / document.documentElement.clientWidth) * 100;
  };

  const finishMove = (e) => {
    card.current.style.transition = ".35s ease-out";
    window.removeEventListener("mousemove", moveMatchCard);
    const likeToast = document.querySelector(".like-toast");
    const dislikeToast = document.querySelector(".dislike-toast");
    if (likeToast) likeToast.remove();
    if (dislikeToast) dislikeToast.remove();
    if (parseInt(card.current.style.left.slice(0, -2)) > 70) {
      console.log("LIKED");
      setLikes((likes) => (likes += 1));
    }
    if (parseInt(card.current.style.left.slice(0, -2)) < 30) {
      console.log("DISLIKED");
      setDislikes((likes) => (likes += 1));
    }
    card.current.style.left = "50vw";
    card.current.style.transform = "translate(-50%, -50%)";
    setTimeout(() => {
      card.current.style.transition = "none";
    }, 500);
  };

  useEffect(() => {
    console.clear();
    console.log("likes: ", likes);
    console.log("dislikes: ", dislikes);
  }, [likes, dislikes]);

  const moveMatchCard = (e) => {
    window.addEventListener("mouseup", finishMove);
    card.current.style.transition = "none";
    cursorLocation.current.deltaX = e.clientX - cursorLocation.current.x;
    card.current.style.left = "50vw";
    card.current.style.left = `${pixelToVw(
      vwToPixel(card.current.style.left.slice(0, -2)) +
        cursorLocation.current.deltaX,
    )}vw`;
    card.current.style.transform = `rotate(${
      cursorLocation.current.deltaX / 75
    }deg) translate(-50%, -50%)`;
    if (
      parseInt(card.current.style.left.slice(0, -2)) > 70 &&
      !document.querySelector(".like-toast")
    ) {
      const like = document.createElement("div");
      like.classList.add("like-toast");
      card.current.appendChild(like);
      like.innerText = "Light It!";
    } else if (
      parseInt(card.current.style.left.slice(0, -2)) <= 70 &&
      document.querySelector(".like-toast") !== null
    ) {
      document.querySelector(".like-toast").remove();
    }
    if (
      parseInt(card.current.style.left.slice(0, -2)) < 30 &&
      !document.querySelector(".dislike-toast")
    ) {
      const dislike = document.createElement("div");
      dislike.classList.add("dislike-toast");
      card.current.appendChild(dislike);
      dislike.innerText = "Burn it down!";
    } else if (
      parseInt(card.current.style.left.slice(0, -2)) >= 30 &&
      document.querySelector(".dislike-toast")
    ) {
      document.querySelector(".dislike-toast").remove();
    }
  };

  const dragCard = (e) => {
    cursorLocation.current = { x: e.clientX, y: e.clientY };
    window.addEventListener("mousemove", moveMatchCard);
  };

  useEffect(() => {
    card.current.addEventListener("mousedown", dragCard);
  }, []);

  return (
    <div className="container">
      <div className="droppable"></div>
      <div ref={card} className="inner">
        <p>
          DRAG ME &nbsp; Dislikes: {dislikes} &nbsp; Likes: {likes}
        </p>
      </div>
      <div className="droppable"></div>
    </div>
  );
}

export default App;
