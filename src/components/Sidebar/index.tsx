import React from "react";
import styles from "./Sidebar.module.scss";
import "reactjs-popup/dist/index.css";
import { getDate } from "../Popup/Winning";

type SidebarProps = {
  setSidebarOpen: (data: boolean) => void;
  sidebarOpen: boolean;
  leaderboard: any[];
};

const Sidebar: React.FC<SidebarProps> = ({
  setSidebarOpen,
  sidebarOpen,
  leaderboard,
}) => {
  const sidebarRef = React.useRef(null);
  function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
    React.useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setSidebarOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(sidebarRef);
  return (
    <div
      className={styles.sidebarWrapper}
      ref={sidebarRef}
      style={
        sidebarOpen
          ? { transform: "translateX(0)" }
          : { transform: "translateX(100%)" }
      }
    >
      <h2>Leaderboard</h2>
      <div className={styles.leaderboard}>
        <div className={styles.leaderboardHeader}>
          <div>№</div>
          <div>Name</div>
          <div>Time</div>
        </div>
        {leaderboard.length !== 0 &&
          leaderboard.map((user: any, index: number) => (
            <div
              key={index}
              className={
                styles.playerBadge +
                " " +
                (index === 0
                  ? styles.first + " " + styles.prize
                  : index === 1
                  ? styles.second + " " + styles.prize
                  : index === 2
                  ? styles.third + " " + styles.prize
                  : "")
              }
            >
              <div>{index + 1}</div>
              <div>{user.data.name}</div>
              <div>{getDate(user.data.playTime)}</div>
            </div>
          ))}
      </div>

      <div className={styles.footerMenu}>
        <span className={styles.footerBtn}>
          <a href="https://github.com/ClockworkSilvio">github</a>
        </span>
        <span>© 2022</span>
      </div>
    </div>
  );
};

export default Sidebar;
