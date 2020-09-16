const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const memebox = document.querySelector('.memes');
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;
let memes;
const getmeme = async () => {
  memes = await fetch('https://api.imgflip.com/get_memes');
  memes = await memes.json();
  memes = memes.data.memes;
  for (i in memes) {
    const img = document.createElement('img');
    img.src = memes[i].url;
    img.style.width = '24vw';
    img.setAttribute('crossorigin', `anonymous`);
    img.setAttribute('onclick', `select(${i},this)`);
    img.className = 'meme';
    memebox.appendChild(img);
  }
};
const font = () => {
  document.querySelector('.fontsize').style.fontSize =
    document.getElementById('font').value + 'px';
};

getmeme();
const select = (id, img) => {
  ctx.drawImage(
    img,
    0,
    0,
    (memes[id].width / memes[id].height) * canvas.height,
    canvas.height
  );
};
const newtext = () => {
  canvas.addEventListener('click', matext);

  canvas.style.cursor = "url('./text.png'),auto";
  ctx.save();
};
const matext = (e) => {
  var textie = prompt('Please enter the text', 'Mene Content');
  ctx.font = document.getElementById('font').value + 'px Times New Roman';
  ctx.strokeStyle = document.getElementById('stroke-color').value;
  ctx.lineWidth = 2;
  ctx.textAlign = 'left';
  let x = e.pageX - canvas.offsetLeft;
  let y = e.pageY - canvas.offsetTop;

  ctx.lineJoin = 'miter'; // Experiment with "bevel" & "round" for the effect you want!
  ctx.miterLimit = 2;
  ctx.strokeText(textie, x, y + 40);
  ctx.fillStyle = document.getElementById('fill-color').value;
  ctx.fillText(textie, x, y + 40);
  ctx.restore();
};
const save = () => {
  const link = document.querySelector('#dl');
  link.href = canvas.toDataURL();
  link.download = 'meme.png';
};
