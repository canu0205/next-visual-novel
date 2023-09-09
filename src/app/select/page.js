"use client";

import classes from "./select.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCur } from "@/stores/accountSlice";
import { Modal, Box } from "@mui/material";

const NUM_OF_SELECT_BOXES = 5;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Select() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const round = searchParams.get("round");

  const [openResult, setOpenResult] = useState(false);

  useEffect(() => {
    if (round === "7") {
      setOpenResult(true);
    }
    dispatch(setCur({ curRound: round, curClass: "0" }));
    // waitroom timer
    // startTimer(12);
  }, []);

  const handleModalClose = () => {
    setOpenResult(false);
    router.push("/join");
  };

  function startTimer(durationInSeconds) {
    let timer = durationInSeconds;
    const timerDisplay = document.getElementById("timer-display");

    const countdown = setInterval(function () {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;

      timerDisplay.textContent = `${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;

      if (--timer < 0) {
        clearInterval(countdown);
        timerDisplay.textContent = `Time's up!`;
        router.push(`/chat/1`);
      }
    }, 1000);
  }

  return (
    <>
      <div className={classes.selectContainer}>
        <Modal open={openResult} onClose={handleModalClose}>
          <Box sx={style}>
            <div className="text-xl font-500">Result</div>
            <div>You win (or lose) !</div>
          </Box>
        </Modal>
        <div className={classes.selectInfo}>
          <div className={classes.infoText}>{`${round} period break`}</div>
          <div className={classes.infoText} id="timer-display"></div>
        </div>
        {Array(NUM_OF_SELECT_BOXES)
          .fill()
          .map((_, i) => (
            <div key={i} className={classes.selectBox}>
              <Link href={`/chat/${i + 1}`}>
                <div className={classes.boxContent}>Class {i + 1}</div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
