import classes from "./home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={classes.homeContainer}>
        <div className={classes.homeBox}>
          <div className={classes.title}>Onchain Visual Novel</div>
          <div className={classes.btnContainer}>
            <Link href="/join">
              <div className={classes.btn}>Start</div>
            </Link>
          </div>
          <div className={classes.btnContainer}>
            <Link href="/guide">
            <div className={classes.btn}>Description</div>
            </Link>
          </div>
        </div>
        <div className={classes.imgContainer}>
          <div>
            <img src="character2_preview_rev_1.png" />
          </div>
        </div>
      </div>
    </>
  );
}
