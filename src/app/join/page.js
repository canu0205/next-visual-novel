"use client";

import classes from "./join.module.css";
import { useEffect, useState } from "react";
import { setAccount } from "@/stores/accountSlice";
import { useSelector, useDispatch } from "react-redux";
import Loading from "@/components/loading/page";
import Nakama from "@/app/nakama"; // Make sure to import your Nakama class

export default function Join() {
  const dispatch = useDispatch();
  const accountName = useSelector((state) => state.account.name);

  const [loading, setLoading] = useState(false);

  const handleEnterName = (e) => {
    dispatch(setAccount(e.target.value));
  };

  const startGame = async () => {
    try {
      setLoading(true);
      await Nakama.authenticate();
      console.log("Authenticated");
  
      // Claim persona tag here
      const personaTag = accountName; // Assuming accountName is what you want to use as the persona tag
      await Nakama.claimPersonaTag(personaTag);
      console.log("Persona tag claimed");
  
      // Create player here
      await Nakama.createPlayer(personaTag);
      console.log("Player created");
  
      await Nakama.findMatch();
      console.log("Match found");
  
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
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
              <button className={classes.btn} onClick={startGame}>
                Enter
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
