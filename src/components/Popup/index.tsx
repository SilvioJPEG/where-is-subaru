import styles from "./Popup.module.scss";
import StartingPopup from "./Starting";
import WinningPopup from "./Winning";
type PopupProps = {
  setDucksAmount: (data: number) => void;
  ducksAmount: number;
  setTime: (data: number) => void;
  time: number;
};
const Popup: React.FC<PopupProps> = (props) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {props.ducksAmount === -1 && (
          <StartingPopup
            setTime={props.setTime}
            setDucksAmount={props.setDucksAmount}
          />
        )}
        {props.ducksAmount === 0 && (
          <WinningPopup
            setTime={props.setTime}
            setDucksAmount={props.setDucksAmount}
            playTime={props.time}
          />
        )}
      </div>
    </div>
  );
};

export default Popup;
