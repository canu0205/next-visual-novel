import { Client } from "@heroiclabs/nakama-js";
import { v4 as uuidv4 } from "uuid";

class Nakama {
    constructor() {
        this.client
        this.session
        this.socket // ep4
        this.matchID // ep4
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
                await this.socket.joinMatch(matchId);
                console.log(`Joined existing match with ID: ${matchId}`);
            } else {
                // If no matches exist, create a new one
                const newMatch = await this.socket.createMatch();
                console.log(`Created new match with ID: ${newMatch.match.match_id}`);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
}
    


export default new Nakama()