import './index.css';

import { createAnimationFrame } from './engine';

function animation(id, amp, theta) {
  let sine = document.getElementById(id);
  let ctx = sine.getContext('2d');

  ctx.lineWidth = 2;
  ctx.strokeStyle = `rgba(255, 145, 85, 1)`;

  ctx.clearRect(0, 0, sine.width, sine.height);
  ctx.beginPath();

  const num_waves = 2;

  const sy = sine_window.height - sine_window.height / 2;
  let last_y = sy + amp * Math.sin(theta);
  ctx.moveTo(0, last_y);

  // Everything is relative to a "1 Hz" signal
  let plot_width = sine.width;
  let step_size = 1 / (num_waves * plot_width);
  for (let i = 0; i < num_waves; i += step_size) {
    let j = (i * plot_width) / num_waves;
    ctx.lineTo(j, sy + amp * Math.sin(i * 2 * Math.PI + theta));
  }

  ctx.stroke();
}

const main = () => {
  console.info('Initialized.');

  const createSine = (sine_id, amp, theta) => {
    return createAnimationFrame(() => {
      theta -= 0.1;
      animation(sine_id, amp, theta);
      return true;
    }, 120);
  };

  let theta = 0;
  createSine('sine1', 50, theta);
};

main();
