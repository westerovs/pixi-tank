import { Application, Graphics, Rectangle } from "./js/libs/pixi.mjs";
import { assetsMap } from "./js/assetsMap.js";
import { Tank } from "./js/Tank.js";
import { createMarker } from './js/utils/utils.js'
import { TweenManager, Tween } from "./js/utils/Tween.js"

// Create the application
const gameSize = {
  w: 1366,
  h: 1366
}

const app = new Application({
  view           : document.getElementById('canvas'), // экземпляр канвас эл-та
  width          : gameSize.w, // размеры канваса
  height         : gameSize.h, // размеры канваса
  backgroundColor: 0x111444,
});


class Game {
  constructor() {
    this.app = app
    this.tank = null
    this.init()
  }
  
  preload() {
    // подгружаем все спрайты
    assetsMap.sprites.forEach((value) => this.app.loader.add(value.name, value.url))
    this.app.loader.load(this.runGame) // когда всё загрузится, запускаем ф-цию которая стартанет игру
  }
  
  init() {
    this.preload()
  }
  
  runGame = () => {
    this.setPositionStage()
    this.createTank()
    createMarker(this.app)
    
    this.app.stage.on('pointerdown', this.moveTank)
    this.app.stage.interactive = true
    this.app.stage.interactiveChildren = false
    // позволяет кликать по всему игровому полю
    this.app.stage.hitArea = new Rectangle(-gameSize.w / 2, -gameSize.h / 2, gameSize.w, gameSize.h)
  }
  
  setPositionStage = () => {
    this.app.stage.position.set(gameSize.w / 2, gameSize.h / 2)
  }
  
  createTank = () => {
    this.tank = new Tank()
    this.app.stage.addChild(this.tank.view)

    // for test
    window.TANK = this.tank
  }
  
  moveTank = ({data}) => {
    const tweenManager = new TweenManager(this.app.ticker)
  
    // находит центральную точку отсчета координат канваса(в этом случае он смещен в центр)
    // [1] определяем дистанцию от мыши, до центра
    const distanceToCenter = data.getLocalPosition(app.stage)
    // [2] определяем дистанцию от танка до мыши, что бы потом найти корректный угол по отношению к танку
    const distanceToTank  = data.getLocalPosition(this.tank.view)
    
    // т.к мы знаем позицию мыши относительно танка, мы можем найти угол поворота до мыши
    // atan2 - принимает y, x и возвращает угол в радианах
    const angle = Math.atan2(distanceToTank.y, distanceToTank.x)
    
    let callAmount = 2
    const move = () => {
      callAmount -= 1
      // если callAmount вызван 2 раза, значит мы хотим передвинуть танк
      if (callAmount <= 0) {
        tweenManager.createTween(this.tank, 3000, {x: distanceToCenter.x, y: distanceToCenter.y}, {
          onStart: () => this.tank.startTracks(),
          onFinish: () => this.tank.stopTracks()
        })
      }
    }
    
    // towerDirection - вращение башни
    tweenManager.createTween(this.tank, 1000, { towerDirection: angle }, {
      onFinish: () => move()
    })
    // towerDirection - вращение тела танка
    tweenManager.createTween(this.tank, 2000, { bodyDirection: angle }, {
      onStart: () => this.tank.startTracks(),
      onFinish: () => {
        this.tank.stopTracks()
        move()
      }
    })
  }
}

new Game()


























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
