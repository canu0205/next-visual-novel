import classes from "./select.module.css";
import Link from "next/link";

const NUM_OF_SELECT_BOXES = 5;

export default function Select() {
  return (
    <>
      <div className={classes.selectContainer}>
        {Array(NUM_OF_SELECT_BOXES)
          .fill()
          .map((_, i) => (
            <div key={i} className={classes.selectBox}>
              <Link href="/chat">
                <div className={classes.boxContent}>Class {i + 1}</div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
