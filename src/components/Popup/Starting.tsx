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
    <div style={{display: "flex", flexDirection:"column"}}>
      <p>Game rules: </p>
      <span>the game is easy, just find a duck.</span>
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
