import "./App.css";
import Header from "./components/Header";
import SignUpForm from "./components/SignUpForm";
import AnalogClock from "./components/analogClock/AnalogClock";

function App() {
  return (
    <>
      <Header />
      <AnalogClock
        showDate={true}
        hourStyle="roman"
        minuteStyle="num"
        minutePosition="inner"
      />
      <SignUpForm />
    </>
  );
}

export default App;
