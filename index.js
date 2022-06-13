import { Application, Graphics, Rectangle } from "./js/libs/pixi.mjs";
// import { assetsMap } from "./js/assetsMap.js";
// import { Tank } from "./js/Tank.js";
// import { TweenManager, Tween } from "./js/utils/Tween.js"

// Create the application
const app = new Application({
  view           : document.getElementById('canvas'), // экземпляр канвас эл-та
  width          : 1366, // размеры канваса
  height         : 1366, // размеры канваса
  backgroundColor: 0x111444,
});

document.body.append(app)



































//
// const runGame = () => {
//   const marker = new Graphics();
//   marker.beginFill(0xff0000, 1);
//   marker.drawCircle(0, 0, 5);
//   marker.endFill();
//
//   const tank = new Tank();
//   app.stage.addChild(tank.view);
//   app.stage.addChild(marker);
//
//   app.stage.position.set(800 / 2, 800 / 2);
//
//   window["TANK"] = tank;
//
//   const tweenManager = new TweenManager(app.ticker);
//
//   const moveTank = ({data}) => {
//     const distanceToCenter = data.getLocalPosition(app.stage);
//     const distanceToTank   = data.getLocalPosition(tank.view);
//     const angle            = Math.atan2(distanceToTank.y, distanceToTank.x);
//
//     let callAmount = 2;
//     const move     = () => {
//       callAmount -= 1;
//       if (callAmount <= 0) {
//         tweenManager.createTween(tank, 3000, {x: distanceToCenter.x, y: distanceToCenter.y}, {
//           onStart : () => tank.startTracks(),
//           onFinish: () => tank.stopTracks()
//         });
//       }
//     }
//
//     tweenManager.createTween(tank, 1000, {towerDirection: angle}, {
//       onFinish: () => move()
//     });
//
//     tweenManager.createTween(tank, 2000, {bodyDirection: angle}, {
//       onStart : () => {
//         tank.startTracks();
//       },
//       onFinish: () => {
//         tank.stopTracks();
//         move();
//       }
//     });
//   };
//
//   app.stage.on("pointerdown", moveTank, undefined);
//   app.stage.interactive         = true;
//   app.stage.interactiveChildren = false;
//   app.stage.hitArea = new Rectangle(-400, -400, 800, 800);
// };
//
// assetsMap.sprites.forEach((value) => app.loader.add(value.name, value.url));
// app.loader.load(runGame);
