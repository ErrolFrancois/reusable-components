import { useEffect, useRef } from "react";
import getDate from "./hooks/getDate";
import { clockNumberRender } from "./hooks/numberElement";
import "./clockStyle.css";
import PropTypes from "prop-types"; // Import PropTypes

const AnalogClock = (props) => {
  const { showDate, hourStyle, minuteStyle, minutePosition, ...otherProps } =
    props;
  const hourHandRef = useRef(null);
  const minuteHandRef = useRef(null);
  const secondHandRef = useRef(null);

  // To set each hand on the clock to position
  const setClock = () => {
    const currentDate = new Date();
    const secondsRatio = currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;

    setRotation(secondHandRef.current, secondsRatio);
    setRotation(minuteHandRef.current, minutesRatio);
    setRotation(hourHandRef.current, hoursRatio);
  };

  function setRotation(element, rotationRatio) {
    element.style.setProperty("--rotation", rotationRatio * 360);
  }

  // Set the clock rerender intervals
  useEffect(() => {
    const intervalId = setInterval(() => {
      setClock();
    }, 1000);
    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set the time on render
  useEffect(() => {
    setClock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //------------------------------------------------------

  return (
    <div className="clock" {...otherProps}>
      <div className="hand hour" ref={hourHandRef} />
      <div className="hand minute" ref={minuteHandRef} />
      <div className="hand second" ref={secondHandRef} />
      {showDate && <div className="date">{getDate()}</div>}
      {clockNumberRender(12, hourStyle)}
      {clockNumberRender(60, minuteStyle, minutePosition)}
    </div>
  );
};

export default AnalogClock;

// Define propTypes for your component
AnalogClock.propTypes = {
  showDate: PropTypes.bool,
  hourStyle: PropTypes.string,
  minuteStyle: PropTypes.string,
  minutePosition: PropTypes.string,
};
