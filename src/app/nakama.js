"use client";

import { Client } from "@heroiclabs/nakama-js";
import { v4 as uuidv4 } from "uuid";

class Nakama {
  constructor() {
    this.client;
    this.session;
    this.socket; // ep4
    this.matchID; // ep4
  }

  async authenticate() {
    try {
      this.client = new Client("defaultkey", "localhost", "7350");
      this.client.ssl = false;

      let deviceId = localStorage.getItem("deviceId");
      if (!deviceId) {
        deviceId = uuidv4();
        localStorage.setItem("deviceId", deviceId);
      }

      this.session = await this.client.authenticateDevice(deviceId, true);
      localStorage.setItem("user_id", this.session.user_id);

      console.log("Authentication successful", this.session);

      // ep4
      const trace = false;
      this.socket = this.client.createSocket(this.useSSL, trace);
      await this.socket.connect(this.session);
      console.log("Socket connected");
    } catch (error) {
      console.error("An error occurred during authentication:", error);
    }
  }

  async findMatch() {
    try {
      // List existing matches
      const matches = await this.client.listMatches(this.session);

      // If there are existing matches, join the first one
      if (matches.matches.length > 0) {
        const matchId = matches.matches[0].match_id;
        const match = await this.socket.joinMatch(matchId); // Join the match and get the match object
        console.log(`Joined existing match with ID: ${matchId}`);
        // Print the number of players in the match
        let cnt = match.presences.length;
        console.log(`Number of players in the match: ${cnt}`);

        if (cnt >= 1) {
          window.location.href = "/select?round=1";
        }
      } else {
        // If no matches exist, create a new one
        const newMatch = await this.socket.createMatch();
        console.log(`Created new match with ID: ${newMatch.match.match_id}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }


      // Nakama.js
      async claimPersonaTag(personaTag) {
        try {
          const payload = { "persona_tag": personaTag };
          const response = await this.client.rpc(this.session, "nakama/claim-persona", payload);
          console.log("Persona tag claimed successfully", response);
        } catch (error) {
          console.error("Error claiming persona tag:", error.message);
        }
      }

      async createPlayer(nickname) {
        try {
          //console.log("createPlayer function called with nickname:", nickname);  // Debug log
      
          const payload = { "nickname": nickname };
          //console.log("Payload for createPlayer:", payload);  // Debug log
      
          const response = await this.client.rpc(this.session, "tx-create-player", payload);
          //console.log("RPC call made to tx-create-player");  // Debug log
      
          console.log("Player created successfully", response);  // Debug log
        } catch (error) {
          console.error("Error creating player:", error.message);  // Debug log
        }
      }
      

    

}

export default new Nakama();
