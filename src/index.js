/**
 * index.js
 */

import * as data from './config.json';

const title = document.createElement('title');
title.textContent = `${data.name} | Matrix Rain`;

document.head.appendChild(title);

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

const chars = data.text.split('');
const fontSize = 14;

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

resize();

const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

const draw = () => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    if (y < fontSize * 6) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    } else {
      ctx.fillStyle = 'rgba(0, 255, 0, 0.6)';
    }

    ctx.fillText(char, x, y);
    drops[i]++;
  }
};

setInterval(draw, 50);

window.addEventListener('resize', resize);
