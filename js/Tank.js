// import { Container, AnimatedSprite, Texture, Sprite } from "./libs/pixi.mjs";

import { AnimatedSprite, Container, Sprite, Texture } from './libs/pixi.mjs';

const createAnimatedSprite = (textureNames, position = {x: 0, y: 0}, anchor = {x: 0.5, y: 0.5}) => {
  const textures = textureNames.map(name => Texture.from(name))
  
  const animationSprite = new AnimatedSprite(textures)
  animationSprite.position.copyFrom(position)
  // animationSprite.position.set(position.x, position.y)
  animationSprite.anchor.copyFrom(anchor)

  return animationSprite
}

const createSprite = (textureName, position = {x: 0, y: 0}, anchor = {x: 0.5, y: 0.5}) => {
    const sprite = new Sprite(Texture.from(textureName));
    sprite.position.copyFrom(position);
    sprite.anchor.copyFrom(anchor);
    return sprite;
  };

export class Tank {
  constructor() {
    this._view = new Container()
  
    this._bodyContainer = new Container()
    this._towerContainer = new Container()
    this._tracksLeft = null
    this._tracksRight = null
    this.init()
  }
  
  // что бы добавить танк в пикси, он должен быть контейнером
  // view будет создавать приватное значение, которое и будет контейнером
  get view() {
    return this._view
  }
  
  init() {
    this.#createTrackers()
    this.#createHull()
    this.#createTower()

    // this._bodyContainer.addChild(this._towerContainer)

    this._view.addChild(this._bodyContainer)
  }
  
  startTracks() {
    this._tracksLeft.play();
    this._tracksRight.play();
  }
  
  stopTracks() {
    this._tracksLeft.stop();
    this._tracksRight.stop();
  }
  
  rotateBodyBy = (angle) => {
    this._bodyContainer.rotation += angle
  }
  
  rotateTowerBy = (angle) => {
    this._towerContainer.rotation += angle
  }
  
  #createTrackers = () => {
    this._tracksLeft  = createAnimatedSprite(['TrackСFrame1', 'TrackСFrame2'], {x: 0, y: -80})
    this._tracksRight = createAnimatedSprite(['TrackСFrame1', 'TrackСFrame2'], {x: 0, y: 80})
    this._tracksLeft.animationSpeed  = 0.25;
    this._tracksRight.animationSpeed = 0.25;
  
    // this.view.addChild(this._tracksLeft, this._tracksRight)
    this._bodyContainer.addChild(this._tracksLeft, this._tracksRight)
  }
  
  #createHull = () => {
    const hull = createSprite('HeavyHullB')
    this._bodyContainer.addChild(hull)
  }
  
  #createTower = () => {
    const tower = createSprite('HeavyTowerB', {x: 0, y: 0})
    const GunConnector = createSprite('GunConnectorD', {x: 80, y: 0})
    const gunLeft = createSprite('HeavyGunB', {x: 140, y: -27})
    const gunRight = createSprite('HeavyGunB', {x: 160, y: 29})
  
    this._towerContainer.addChild(tower, GunConnector, gunLeft, gunRight)
    this._bodyContainer.addChild(this._towerContainer)
  }
  
  set towerDirection(value) {
    this._towerContainer.rotation = value;
  }
  
  get towerDirection() {
    return this._towerContainer.rotation;
  }
  
  set bodyDirection(value) {
    this._bodyContainer.rotation = value;
  }
  
  get bodyDirection() {
    return this._bodyContainer.rotation;
  }
  
  get x() {
    return this._view.position.x;
  }
  
  set x(value) {
    return this._view.position.x = value;
  }
  
  get y() {
    return this._view.position.y;
  }
  
  set y(value) {
    return this._view.position.y = value;
  }
}
