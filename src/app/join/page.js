"use client";

import classes from "./join.module.css";
import { useEffect, useState } from "react";
import { setAccount } from "@/stores/accountSlice";
import { useSelector, useDispatch } from "react-redux";
import Loading from "@/components/loading/page";

export default function Join() {
  const dispatch = useDispatch();
  const accountName = useSelector((state) => state.account.name);

  const [loading, setLoading] = useState(false);

  const handleEnterName = (e) => {
    dispatch(setAccount(e.target.value));
  };

  return (
    <>
      <div className={classes.joinContainer}>
        <div className={classes.imgContainer}>
          <div>
            <img src="character4_preview_rev_1.png" />
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className={classes.joinBox}>
            <div className={classes.title}>Insert Name</div>
            <div className={classes.inputContainer}>
              <input
                className={classes.input}
                placeholder="Insert your user name"
                value={accountName}
                onChange={handleEnterName}
              ></input>
              <button className={classes.btn} onClick={() => setLoading(true)}>
                Enter
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
