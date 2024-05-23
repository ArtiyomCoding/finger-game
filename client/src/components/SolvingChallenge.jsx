import { useEffect, useState } from "react";

const SolvingChallenge = ({
  initialPos,
  challengeSolved,
  initialTime,
  numDots,
}) => {
  const beginning = new Date();
  const cl = [];
  for (let i = 0; i < numDots; i++) {
    cl.push(false);
  }
  const [clicked, setClicked] = useState(cl);
  const [screenTouched, setScreenTouched] = useState(false);
  const [backscreenColor, setBackscreenColor] = useState("");
  const [time, setTime] = useState(
    new Date(Math.abs(new Date() - beginning + initialTime))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date(Math.abs(new Date() - beginning + initialTime)));
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let touched_all = true;
    for (let i = 0; i < numDots; i++) {
      if (!clicked[i]) touched_all = false;
    }
    if (touched_all && !screenTouched) {
      console.log(Math.abs(time));
      challengeSolved(Math.abs(time));
      setClicked([false]);
    }
  }, [clicked]);

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      <div className="center-container-1">
        <div className="center-container-2">
          <div
            className="centered-content"
            style={{ fontSize: 50, color: "#ffc445" }}
          >
            {String(time.getMinutes()).padStart(2, "0")}:
            {String(time.getSeconds()).padStart(2, "0")}:
            {String(Math.floor(time.getMilliseconds() / 10)).padStart(2, "0")}
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundColor: backscreenColor,
        }}
        onTouchStart={() => {
          setBackscreenColor("red");
          setScreenTouched(true);
        }}
        onTouchEnd={() => {
          setBackscreenColor("");
          setScreenTouched(false);
        }}
      ></div>
      {initialPos.map((p, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `calc(${p[0]}% - 30px)`,
            top: `calc(${p[1]}% - 30px)`,
            height: 60,
            width: 60,
            backgroundColor: "#ff4545",
            borderRadius: "50%",
          }}
          onTouchStart={() => {
            setClicked((clicked) => {
              const clickedCopy = [...clicked];
              clickedCopy[index] = true;
              return clickedCopy;
            });
          }}
          onTouchEnd={() =>
            setClicked((clicked) => {
              const clickedCopy = [...clicked];
              clickedCopy[index] = false;
              return clickedCopy;
            })
          }
        ></div>
      ))}
    </div>
  );
};

export default SolvingChallenge;
