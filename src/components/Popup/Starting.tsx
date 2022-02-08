import styles from "./Popup.module.scss";
type StartingPopupProps = {
  setDucksAmount: (data: number) => void;
  setTime: (data: number) => void;
};

const StartingPopup: React.FC<StartingPopupProps> = ({
  setDucksAmount,
  setTime,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",
        alignItems: "center",
      }}
    >
      <div>Game rules: </div>
      <div>the game is easy, just find a duck.</div>
      <button
        className={styles.modalBtn}
        onClick={() => {
          setTime(Date.now());
          setDucksAmount(1);
        }}
      >
        Start
      </button>
    </div>
  );
};
export default StartingPopup;
