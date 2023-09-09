"use client";
import Link from "next/link";

import classes from "./guide.module.css";
import { useEffect, useState } from "react";
import { setAccount } from "@/stores/accountSlice";
import { useSelector, useDispatch } from "react-redux";
import Loading from "@/components/loading/page";

export default function Join() {


  return (
    <>
      <div className={classes.guideContainer}>
      <div className={classes.guideBox}>
        <div className={classes.title}>Guide</div>
        <br></br>
        <div className={classes.inputContainer}>In Suzuran high school, the player has to increase the likability of one female NPC to 100 before dismissal. 
        <br></br><br></br>
        The conversation will take place during 6 breaks until 7th class, and each break is 3 minutes long. Keep in mind that you can't enter other classes during class time, and you can only have one person in a class!</div>
        <div className={classes.btnContainer}>
        <Link href="/">
            <div  className={classes.btn}>Go Back</div>
        </Link>
    </div>
    </div>
      </div>
    </>
  );
}
