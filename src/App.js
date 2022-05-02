import React, { useState, useRef } from "react";
import { useTransition, animated } from "react-spring";
import "./styles.css";

const slides = [
  {
    id: 0,
    url:
      "photo-1544511916-0148ccdeb877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1901&q=80i"
  },
  {
    id: 1,
    url:
      "photo-1544572571-ab94fd872ce4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1534&q=80"
  },
  {
    id: 2,
    url: "reserve/bnW1TuTV2YGcoh1HyWNQ_IMG_0207.JPG?ixlib=rb-1.2.1&w=1534&q=80"
  },
  { id: 3, url: "photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80" }
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(-1);

  const transitions = useTransition(slides[activeIndex], item => item.id, {
    from: {
      opacity: 0,
      transform:
        activeIndex > prevIndexRef.current
          ? `translateX(100%)`
          : `translateX(-100%)`
    },
    enter: () => async next => {
      await next({ opacity: 1, transform: `translateX(0%)` });
    },
    leave: {
      opacity: 0,
      transform:
        activeIndex > prevIndexRef.current
          ? `translateX(-100%)`
          : `translateX(100%)`
    },
    config: {
      duration: 750
    },
    onRest: () => {
      prevIndexRef.current = activeIndex;
    }
  });

  return (
    <div className="App">
      <div className="slides">
        {transitions.map(({ item, props, key }) => (
          <animated.img
            className="slide"
            key={key}
            style={props}
            src={`https://images.unsplash.com/${item.url}&auto=format&fit=crop`}
          />
        ))}
      </div>
      <div>
        <button
          onClick={() => setActiveIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
        >
          Prev
        </button>
        <button
          onClick={() => setActiveIndex(activeIndex + 1)}
          disabled={activeIndex === slides.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
