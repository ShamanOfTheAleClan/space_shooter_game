const move = (input, caller) => {
   const { trajectory, cubicBezier } = input;
   const from = {
      x: Number(input.from.x),
      y: Number(input.from.y)
   };
   const to = {
      x: Number(input.to.x),
      y: Number(input.to.y)
   };
   const duration = Number(input.duration);
   let p1 = undefined;
   let p2 = undefined;

   switch (cubicBezier) {
      case "linear":
         p1 = { x: 0, y: 0 };
         p2 = { x: 1, y: 1 };
         break;
      case "ease":
         p1 = { x: 0.25, y: 0.1 };
         p2 = { x: 0.25, y: 1 };
         break;
      case "ease-in":
         p1 = { x: 0.42, y: 0 };
         p2 = { x: 1, y: 1 };
         break;
      case "ease-out":
         p1 = { x: 0, y: 0 };
         p2 = { x: 0.58, y: 1 };
         break;
      case "ease-in-out":
         p1 = { x: 0.42, y: 0 };
         p2 = { x: 0.58, y: 1 };
         break;
      default:
         p1 = input.cubicBezier.p1;
         p2 = input.cubicBezier.p2;
   }

   const calcCubicBezier = (t, p1, p2) => {
      const p0 = { x: 0, y: 0 };
      const p3 = { x: 1, y: 1 };
      const x =
         Math.pow(1 - t, 3) * p0.x +
         3 * Math.pow(1 - t, 2) * t * p1.x +
         3 * Math.pow((1 - t) * t, 2) * p2.x +
         Math.pow(t, 3) * p3.x;
      const y =
         Math.pow(1 - t, 3) * p0.y +
         3 * Math.pow(1 - t, 2) * t * p1.y +
         3 * Math.pow((1 - t) * t, 2) * p2.y +
         Math.pow(t, 3) * p3.y;
      return { x: x, y: y };
   };

   let t = 0;

   const execute = setInterval(() => {
      if (t <= duration) {
         const currentMoment = t / duration;

         if (trajectory === "linear") {
            const x = currentMoment;
            const y = currentMoment;
            const distance = {
               x: to.x - from.x,
               y: to.y - from.y
            };
            caller.x = from.x + distance.x * x;
            caller.y = from.y + distance.y * y;
         } else {
            const { x, y } = calcCubicBezier(currentMoment, p1, p2);
         }
         t += 0.01;
      } else {
         clearInterval(execute);
      }
   }, 10);
};

const spawn = () => {};

export { move, spawn };
