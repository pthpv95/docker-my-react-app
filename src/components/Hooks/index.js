import React, { useState, useEffect } from "react";
import logo from "../../logo.svg";
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("update");

    document.title = `You click ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

function Mouse(props) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  return (
    <div
      style={{ height: "100%" }}
      onMouseMove={e =>
        setCoords({
          x: e.clientX,
          y: e.clientY
        })
      }
    >
      {props.render(coords)}
    </div>
  );
}

function Shadow({ mouse }) {
  return (
    <img
      src={logo}
      width="30px"
      style={{ position: "absolute", left: mouse.x, top: mouse.y }}
    />
  );
}

function MouseTracker() {
  return (
    <div>
      <h1>Move the mouse around!</h1>
      <Mouse render={mouse => <Shadow mouse={mouse} />} />
    </div>
  );
}

export const ReactHookExample = () => {
  return (
    <div>
      {/* <Example />; */}
      <MouseTracker />
    </div>
  );
};
