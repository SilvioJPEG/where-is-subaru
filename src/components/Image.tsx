import React from "react";
import chick1 from "../assets/chickens/chick1.png";
import chick2 from "../assets/chickens/chick2.png";
import chick3 from "../assets/chickens/chick3.png";
import chick4 from "../assets/chickens/chick4.png";
import chick5 from "../assets/chickens/chick5.png";
import duck from "../assets/ducks/duck1.png";
const chickens = [chick1, chick2, chick3, chick4, chick5];
const ducks = [duck];
type ImageProps = {
  width: number;
  height: number;
  specialOne: boolean;
  setDucksAmount: (data: number) => void;
  ducksAmount: number;
  setRandomPosition: (data: number) => string;
  clicksAmount?: number;
  setClicksAmount?: (data: number) => void;
  setTime: (data: number) => void;
  time: number;
};
class Image extends React.Component<ImageProps, {}> {
  shouldComponentUpdate(nextProps: ImageProps, nextState: {}) {
    return false;
  }

  render() {
    const {
      setRandomPosition,
      width,
      height,
      setDucksAmount,
      ducksAmount,
      specialOne,
      setTime,
      time
    } = this.props;
    return (
      <img
        src={
          specialOne
            ? ducks[Math.floor(Math.random() * ducks.length)]
            : chickens[Math.floor(Math.random() * chickens.length)]
        }
        alt="chick"
        style={{
          position: "absolute",
          left: setRandomPosition(width),
          top: setRandomPosition(height),
        }}
        draggable="false"
        onClick={specialOne ? () => {setTime(Date.now() - time);setDucksAmount(ducksAmount - 1)} : undefined}
      />
    );
  }
}

export default Image;
