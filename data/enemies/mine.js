import { Enemy, EnemyProjectile, enemyProjectiles } from "./enemies.js";
import fireEvents from "../scripts/fireEvents.js";
// import fireEvents from "../scripts/fireEvents.js";
// import mineScript from "../scripts/mineScript.json";

class Mine extends Enemy {
   constructor() {
      super();
      this.x = 455;
      this.y = 100;
      this.width = 51;
      this.height = 51;
      this.health = 10;
      this.state = 0;
      this.behaviour();
      this.sprite = "mine";
   }
   behaviour = () => {
      // execute function from scrips/fireEvents.js
      //   fireEvents(this, mineScript);
      window.api.receive("receiveScript", data => {
         console.log({ resp: data }, { resp: JSON.parse(data) });
         fireEvents(this, data);
      });
      window.api.send("requestScript", "mine");
      if (!this.behaving) {
         this.behaving = true;
         const shoot = trajectory => {
            // trajectories
            // 0 ---------> X
            // | |1 2 3|
            // | |8 # 4|
            // | |7 6 5|
            // |
            // V Y
            // 0.707 diagonal

            let trajectories = [];
            if (typeof trajectory === "number") {
               trajectories.push(trajectory);
            } else {
               trajectories = [...trajectory];
            }
            let x = undefined;
            let y = undefined;
            let tX = undefined;
            let tY = undefined;
            for (const t of trajectories) {
               switch (t) {
                  case 1:
                     x = this.x - 5 - 10;
                     y = this.y - 5 - 10;
                     tX = -0.707;
                     tY = -0.707;
                     break;
                  case 2:
                     x = this.x + this.width / 2 - 7;
                     y = this.y - 10 - 15;
                     tX = 0;
                     tY = -1;
                     break;
                  case 3:
                     x = this.x + this.width;
                     y = this.y - 5 - 10;
                     tX = 0.707;
                     tY = -0.707;
                     break;
                  case 4:
                     x = this.x + this.width + 10;
                     y = this.y + this.height / 2 - 7;
                     tX = 1;
                     tY = 0;
                     break;
                  case 5:
                     x = this.x + this.width;
                     y = this.y + this.height;
                     tX = 0.707;
                     tY = 0.707;
                     break;
                  case 6:
                     x = this.x + this.width / 2 - 7;
                     y = this.y + this.height + 10;
                     tX = 0;
                     tY = 1;
                     break;
                  case 7:
                     x = this.x - 5 - 10;
                     y = this.y + this.height;
                     tX = -0.707;
                     tY = 0.707;
                     break;
                  case 8:
                     x = this.x - 10 - 15;
                     y = this.y + this.height / 2 - 7;
                     tX = -1;
                     tY = 0;
               }

               enemyProjectiles.push(
                  new EnemyProjectile({
                     x: x,
                     y: y,
                     height: 15,
                     width: 15,
                     speed: 5,
                     trajectory: {
                        x: tX,
                        y: tY
                     }
                  })
               );
            }
         };
         const shooting = setInterval(() => {
            if (!this.dead) {
               this.state = this.state === 0 ? 1 : 0;

               if (this.state === 0) shoot([1, 3, 5, 7]);
               if (this.state === 1) shoot([2, 4, 6, 8]);
            } else {
               clearInterval(shooting);
            }
         }, 2500);
      }
   };
}

export { Mine };
