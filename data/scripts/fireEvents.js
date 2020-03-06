import { move } from "./eventActions.js";

export default function fireEvents(caller, script) {
   const scriptArray = JSON.parse(script);
   let i = 1;

   const loadEvent = () => {
      if (i < scriptArray.length) {
         const prevTimestamp = new Date(scriptArray[i - 1].timestamp).getTime();
         const currentTimestamp = new Date(scriptArray[i].timestamp).getTime();
         const timeStep = currentTimestamp - prevTimestamp;

         setTimeout(() => {
            switch (scriptArray[i].action) {
               case "move":
                  move(scriptArray[i].parameters, caller);
                  break;
               case "spawn":
                  spawn(scriptArray[i].parameters);
                  break;
            }
            i++;
            loadEvent();
         }, timeStep);
      }
   };
   loadEvent();
}
