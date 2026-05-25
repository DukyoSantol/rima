import * as data from './config.json';

const title = document.createElement('title');
title.textContent = `${data.name} | Matrix Rain`;
document.head.appendChild(title);

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

const chars = data.text.split('');
const fontSize = 14;
const streamLen = 15;
let streams = [];

const init = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const columns = Math.floor(canvas.width / fontSize);
  streams = [];

  for (let i = 0; i < columns; i++) {
    const col = [];
    for (let j = 0; j < streamLen; j++) {
      col.push({
        char: chars[Math.floor(Math.random() * chars.length)],
      });
    }
    streams.push({
      chars: col,
      y: Math.random() * canvas.height,
      speed: 1 + Math.random() * 3,
      gap: Math.floor(Math.random() * 100),
    });
  }
};

init();

const draw = () => {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `bold ${fontSize}px "Courier New", monospace`;

  for (let i = 0; i < streams.length; i++) {
    const s = streams[i];

    if (s.gap > 0) {
      s.gap--;
      continue;
    }

    const x = i * fontSize;
    s.y += s.speed;

    if (s.y > canvas.height + fontSize * streamLen) {
      s.y = 0;
      s.speed = 1 + Math.random() * 3;
      s.gap = Math.floor(Math.random() * 80);
    }

    s.chars.pop();
    s.chars.unshift({ char: chars[Math.floor(Math.random() * chars.length)] });

    for (let j = 0; j < s.chars.length; j++) {
      const cy = s.y + j * fontSize;
      if (cy < 0 || cy > canvas.height) continue;

      if (j === 0) {
        ctx.fillStyle = '#FFFFFF';
      } else if (j < 4) {
        ctx.fillStyle = '#00FF00';
      } else {
        const shade = Math.max(0, 255 - Math.floor((j / s.chars.length) * 180));
        ctx.fillStyle = `rgb(0, ${shade}, 0)`;
      }

      const char = s.chars[j].char;
      ctx.fillText(char, x, cy);

      if (j > 0 && Math.random() < 0.05) {
        s.chars[j].char = chars[Math.floor(Math.random() * chars.length)];
      }
    }
  }
};

setInterval(draw, 50);
window.addEventListener('resize', init);

document.getElementById('btnYes').addEventListener('click', () => {
  document.getElementById('message').textContent = 'BAL SUPPOT HAHHAHA';
  document.getElementById('buttons').style.display = 'none';
});

document.addEventListener('mouseover', (e) => {
  if (e.target.id === 'btnNo') {
    const btn = e.target;
    document.body.appendChild(btn);
    const maxX = Math.max(10, window.innerWidth - btn.offsetWidth);
    const maxY = Math.max(10, window.innerHeight - btn.offsetHeight);
    btn.style.position = 'fixed';
    btn.style.left = (Math.random() * maxX) + 'px';
    btn.style.top = (Math.random() * maxY) + 'px';
    btn.style.zIndex = '99';
  }
});

document.addEventListener('touchstart', (e) => {
  if (e.target.id === 'btnNo') {
    e.preventDefault();
    const btn = e.target;
    document.body.appendChild(btn);
    const maxX = Math.max(10, window.innerWidth - btn.offsetWidth);
    const maxY = Math.max(10, window.innerHeight - btn.offsetHeight);
    btn.style.position = 'fixed';
    btn.style.left = (Math.random() * maxX) + 'px';
    btn.style.top = (Math.random() * maxY) + 'px';
    btn.style.zIndex = '99';
  }
});
