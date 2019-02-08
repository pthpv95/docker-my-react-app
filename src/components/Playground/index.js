import React, { useState, useEffect } from "react";
// import logo from "../../logo.svg";
import { AccountProfile } from "./AccountProfile";
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
      // src={logo}
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
      <ListItems />
      {/* <MouseTracker /> */}
    </div>
  );
};

const ListItems = () => {
  const defaultItems = new Array(50).fill(0).map((item, index) => index);

  const [filterList, filter] = useState(defaultItems);
  const [text, search] = useState("");
  function handleClick(e) {}

  function handleChange(e) {
    search(e.target.value);
    const value = parseInt(e.target.value);
    if (isMatchItem(value)) {
      const filterList = defaultItems.filter(x => x === value);
      filter(filterList);
    } else if (value === "") {
      filter(defaultItems);
    } else {
      filter([]);
    }
  }

  function isMatchItem(value) {
    return defaultItems.filter(x => x === value) > 0;
  }

  useEffect(() => {
    console.log("update");
  }, isMatchItem(text));
  return (
    <div>
      <input onChange={handleChange} value={text} type="text" />
      <ul onClick={e => handleClick(e)}>
        {filterList.map((item, index) => {
          return (
            <li key={index} value={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export class CurrentProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (AccountProfile.isAuthenticated()) {
      AccountProfile.logIn();
    }
  }

  render() {
    return <div>profile</div>;
  }
}
