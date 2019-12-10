const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fps = Math.round(1000/30);

export { canvas, ctx, fps }