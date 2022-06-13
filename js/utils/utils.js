import { Graphics } from '../libs/pixi.mjs';

const createMarker = (app, x = 0, y = 0) => {
  const marker = new Graphics()
  marker.beginFill(0xfff000, 1)
  marker.drawCircle(x, y, 15)
  
  app.stage.addChild(marker)
}

// puts a point by tap
const onPointerDown = (app, {data}) => {
  const position = data.getLocalPosition(app.stage)
  
  createMarker(app, position.x, position.y)
}

export {
  createMarker,
  onPointerDown,
}

