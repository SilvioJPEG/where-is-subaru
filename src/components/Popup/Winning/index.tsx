import { Formik, Form, Field, ErrorMessage, FormikErrors } from "formik";
import styles from "../Popup.module.scss";
import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from "@ant-design/icons";

type WinningProps = {
  playTime: number;
  setDucksAmount: (data: number) => void;
  setTime: (data: number) => void;
  leaderboard: any[];
};
export const getDate = (unixTime: number) => {
  const d = new Date(unixTime);
  return d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds();
};
const WinningPopup: React.FC<WinningProps> = ({
  setDucksAmount,
  playTime,
  setTime,
  leaderboard,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [buttonVisible, setButtonVisible] = React.useState(true);
  return (
    <div className={styles.winningWrapper}>
      <h2>You won!</h2>
      <p>
        If you want to save your score in the leaderboard enter your
        credentials.
      </p>
      <Formik
        initialValues={{ name: "" }}
        validate={(values: { name: string }) => {
          let errors: FormikErrors<{ name: string }> = {};

          if (!values.name) {
            errors.name = "Required";
          } else if (values.name.length > 30) {
            errors.name = "Must be 30 characters or less";
          } else if (
            leaderboard.find((user) => {
              return user.data.name === values.name;
            })
          ) {
            errors.name = "User with this name already exists";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          setLoading(true);
          setButtonVisible(false);
          await addDoc(collection(db, "leaderboard"), {
            playTime: playTime,
            name: values.name,
          })
            .catch((err) => {
              toast.error(err);
            })
            .finally(() => {
              setLoading(false);
              toast.success("Saved!");
            });
        }}
      >
        <Form className={styles.winningForm}>
          <div style={{ display: "flex", columnGap: "20px" }}>
            <span>Your time: {getDate(playTime)}</span>
            <label htmlFor="name">Enter your name:</label>
            <div className={styles.nameFieldWrapper}>
              <Field className={styles.nameField} type="text" name="name" />
              <ErrorMessage
                className={styles.error}
                name="name"
                component="div"
              />
            </div>
          </div>
          <div className={styles.btnsRow}>
            {loading && (
              <LoadingOutlined style={{ fontSize: "50px", color: "black" }} />
            )}
            {buttonVisible && (
              <button className={styles.modalBtn} type="submit">
                Save
              </button>
            )}
            <button
              className={styles.modalBtn}
              id={styles.restartBtn}
              onClick={() => {
                setTime(Date.now());
                setDucksAmount(1);
              }}
            >
              Restart?
            </button>
          </div>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
};
export default WinningPopup;
