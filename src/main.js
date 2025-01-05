import { Bodies, Engine, Render, Runner, World, Body } from 'matter-js';
import { FRUITS_BASE } from '../fruits';

const engine = Engine.create();
const render = Render.create({
  engine,
  element: document.body,
  options: {
    background: '#F7F4C8',
    width: 620,
    height: 850,
    wireframes: false,
  },
});

const runner = Runner.create();
let currentBody = null;
let currentFruit = null;

const world = engine.world;
const leftWall = Bodies.rectangle(15, 395, 30, 790, {
  isStatic: true,
  render: { fillStyle: '#E6B143' },
});

const rightWall = Bodies.rectangle(605, 395, 30, 790, {
  isStatic: true,
  render: { fillStyle: '#E6B143' },
});

const ground = Bodies.rectangle(310, 820, 620, 60, {
  isStatic: true,
  render: { fillStyle: '#E6B143' },
});

const topLine = Bodies.rectangle(310, 150, 620, 2, {
  isStatic: true,
  isSensor: true,
  render: { fillStyle: '#E6B143' },
});

World.add(world, [leftWall, rightWall, ground, topLine]);

Render.run(render);
Runner.run(runner, engine);

const addFruit = () => {
  const index = Math.floor(Math.random() * 5);
  const fruit = FRUITS_BASE[index];

  const body = Bodies.circle(300, 50, fruit.radius, {
    index: index,
    isSleeping: true,
    render: {
      sprite: { texture: `${fruit.name}.png` },
    },
    restitution: 0.2,
  });

  currentBody = body;
  currentFruit = fruit;

  World.add(world, body);
};

window.onkeydown = (event) => {
  switch (event.code) {
    case 'ArrowLeft':
      Body.setPosition(currentBody, {
        x: currentBody.position.x - 10,
        y: currentBody.position.y,
      });
      break;
    case 'ArrowDown':
      currentBody.isSleeping = false;
      setTimeout((c) => {
        addFruit();
        console.log('c ', c);
      }, 1000);

      break;
    case 'ArrowRight':
      Body.setPosition(currentBody, {
        x: currentBody.position.x + 10,
        y: currentBody.position.y,
      });
      break;
  }
};

addFruit();
