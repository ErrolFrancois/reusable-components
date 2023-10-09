import toRoman from "./toRomanNumeral";

// Call functions to render the number and tick elements
export function clockNumberRender(totalNumbers, numberStyle, minutePosition) {
  const numberbersArray = arrayFromNumber(totalNumbers, 1);
  const renderNumbers =
    numberbersArray &&
    numberbersArray.map((number) =>
      numberElement(number, totalNumbers, numberStyle, minutePosition)
    );
  return renderNumbers;
}

// Number array constructor
export function arrayFromNumber(totalNumbers, increment) {
  const resultArray = Array.from(
    { length: totalNumbers },
    (_, index) => index + increment
  );
  return resultArray;
}

// Minutes and hours return for render
export function numberElement(
  number,
  totalNumbers,
  minuteHourNumberStyle,
  minutesPosition
) {
  const numberStyle = minuteHourNumberStyle.toLowerCase();
  const classname = totalNumbers > 12 ? "minuteNumber" : "hourNumber";
  const addToKey = classname === "minuteNumber" ? 20 : 0;
  const rotation = (360 / totalNumbers) * number;
  const addClassName1 = rotation % 30 === 0 ? "each-30deg" : "";
  const addClassName2 = rotation % 90 === 0 ? "each-90deg" : "";
  const visibleMinutes = addClassName1 === "each-30deg" ? "hidden" : "visible";

  const innerStyle = {
    transform: `rotate(${rotation}deg)`,
    top: "10%",
    left: "10%",
    width: "80%",
    height: "80%",
  };

  const midStyle = {
    transform: `rotate(${rotation}deg)`,
    top: "5%",
    left: "5%",
    width: "90%",
    height: "90%",
    visibility: visibleMinutes,
  };

  const defaultStyle = {
    transform: `rotate(${rotation}deg)`,
    width: "100%",
    height: "100%",
  };

  function numberAndStyle() {
    let style;
    switch (numberStyle) {
      case "roman":
        style = classname !== "minuteNumber" && toRoman(number);
        break;
      case "number":
        style = number;
        break;
      case "num":
        style = number;
        break;
      case "" || null || undefined:
        style = classname === "minuteNumber" ? "" : number;
        break;
      default:
        style =
          classname === "minuteNumber" && numberStyle.length > 1
            ? ""
            : classname === "minuteNumber" && numberStyle.length === 1
            ? numberStyle
            : classname === "hourNumber" && number;
        break;
    }
    return style;
  }

  const displayNumber = numberAndStyle();

  const displayStyle =
    (minutesPosition === "inner" || minutesPosition === "in") &&
    classname === "minuteNumber"
      ? innerStyle
      : (minutesPosition === "middle" || minutesPosition === "mid") &&
        classname === "minuteNumber"
      ? midStyle
      : defaultStyle;

  return (
    <div
      key={number + addToKey}
      className={`${classname} ${
        classname + number
      } ${addClassName1} ${addClassName2}`}
      style={displayStyle}
    >
      {displayNumber}
    </div>
  );
}
