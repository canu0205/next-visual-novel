import classes from "./chat.module.css";

export default function Chat() {
  return (
    <>
      <div className={classes.container}>
        <div>
          <img src="pic4.png" />
        </div>
        <div className={classes.chatBox}>
          <div className={classes.chatContent}>
            <div></div>
          </div>
          <form className={classes.inputBox}>
            <input className={classes.chatInput} />
          </form>
        </div>
      </div>
    </>
  );
}
