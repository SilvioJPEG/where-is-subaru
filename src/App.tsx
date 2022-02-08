import React from "react";
import Image from "./components/Image";
import friends from "./assets/friends.png";
import Sidebar from "./components/Sidebar";
import BurgerBtn from "./assets/burgerBtn.svg";
import Popup from "./components/Popup";
import { Confetti } from "./components/Popup/Winning/Confetti";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
let occupiedSpace: DOMRect[] = [];

function App() {
  const [clicksAmount, setClicksAmount] = React.useState<number>(0);
  const [ducksAmount, setDucksAmount] = React.useState<number>(-1);
  const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);
  const [width, setWidth] = React.useState<number>(1800);
  const [height, setHeight] = React.useState<number>(900);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const infoRef = React.useRef<HTMLDivElement | null>(null);
  const [time, setTime] = React.useState<number>(0);
  const [leaderboard, setLeaderboard] = React.useState<any[]>([]);
  React.useEffect(() => {
    try {
      const q = query(collection(db, "leaderboard"), orderBy("playTime"));
      onSnapshot(q, (querySnapshot) => {
        setLeaderboard(
          querySnapshot.docs.map((user) => ({
            id: user.id,
            data: user.data(),
          }))
        );
      });
    } catch (err) {}
  }, []);
  React.useEffect(() => {
    if (wrapperRef.current) {
      setWidth(wrapperRef.current.offsetWidth - 70);
      setHeight(wrapperRef.current.offsetHeight - 90);
    }
    if (infoRef.current) {
      occupiedSpace.push(infoRef.current.getBoundingClientRect());
      console.log(infoRef.current.getBoundingClientRect());
    }
  }, [wrapperRef, infoRef]);

  const setRandomPosition = (len: number) => {
    let pos: number = Math.floor(Math.random() * len);
    let percent = Math.floor((pos * 94) / len);
    return percent + "%";
  };
  return (
    <div className="wrapper" ref={wrapperRef}>
      {ducksAmount <= 0 && (
        <Popup
          setDucksAmount={setDucksAmount}
          ducksAmount={ducksAmount}
          setTime={setTime}
          time={time}
          leaderboard={leaderboard}
        />
      )}
      {ducksAmount === 0 && <Confetti />}
      {ducksAmount > 0 && (
        <div className="gameWrapper">
          <img
            id="centered"
            src={friends}
            alt="centerFriends"
            draggable="false"
          />
          {Array.from(Array(88).keys()).map((obj: number) => (
            <Image
              key={obj}
              width={width}
              height={height}
              specialOne={false}
              setDucksAmount={setDucksAmount}
              ducksAmount={ducksAmount}
              setRandomPosition={setRandomPosition}
              clicksAmount={clicksAmount}
              setClicksAmount={setClicksAmount}
              setTime={setTime}
              time={time}
            />
          ))}
          <Image
            width={width}
            height={height}
            specialOne={true}
            setDucksAmount={setDucksAmount}
            ducksAmount={ducksAmount}
            setRandomPosition={setRandomPosition}
            setTime={setTime}
            time={time}
          />
          <div className="info" ref={infoRef}>
            <span>
              You still need to find {ducksAmount + " "}
              {ducksAmount === 1 ? "duck" : "ducks"}.
            </span>
          </div>
        </div>
      )}
      <img
        draggable="false"
        className="burgerBtn"
        src={BurgerBtn}
        alt="burgerBtn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      />
      <Sidebar
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        leaderboard={leaderboard}
      />
    </div>
  );
}

export default App;
