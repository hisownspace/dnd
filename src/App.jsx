import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const cursorLocation = useRef({
    x: null,
    y: null,
    deltaX: null,
  });
  const likeDiv = useRef(null);
  const dislikeDiv = useRef(null);
  const profileCard = useRef(null);
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
    likeDiv.current.classList.remove("visible-toast")
    likeDiv.current.classList.add("hidden-toast")
    dislikeDiv.current.classList.remove("visible-toast")
    dislikeDiv.current.classList.add("hidden-toast")
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
      likeDiv.current.classList.contains("hidden-toast")
    ) {
      likeDiv.current.classList.add("visible-toast")
      likeDiv.current.classList.remove("hidden-toast")
    } else if (
      parseInt(card.current.style.left.slice(0, -2)) <= 70 &&
      likeDiv.current.classList.contains("visible-toast")
    ) {
      likeDiv.current.classList.remove("visible-toast")
      likeDiv.current.classList.add("hidden-toast")
    }
    if (
      parseInt(card.current.style.left.slice(0, -2)) < 30 &&
      dislikeDiv.current.classList.contains("hidden-toast")
    ) {
      dislikeDiv.current.classList.add("visible-toast")
      dislikeDiv.current.classList.remove("hidden-toast")
    } else if (
      parseInt(card.current.style.left.slice(0, -2)) >= 30 &&
      dislikeDiv.current.classList.contains("visible-toast")
    ) {
      dislikeDiv.current.classList.remove("visible-toast")
      dislikeDiv.current.classList.add("hidden-toast")
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
      <div ref={likeDiv} className="like-toast hidden-toast">Light it!</div>
      <div ref={dislikeDiv} className="dislike-toast hidden-toast">Burn it Down!</div>
        <img
          draggable="false"
          ref={profileCard}
          src="https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg"
        />
      </div>
      <div className="droppable"></div>
    </div>
  );
}

export default App;
