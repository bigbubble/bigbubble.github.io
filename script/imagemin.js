const imagemin = require('imagemin');
//png images dir
const PNGImages = 'img/read/*.png';
//jpg iamges dir
const JPEGImages = 'img/read/*.jpg';
//optimised images dir
const output = './img/read/optimised';

const imageminMozjpeg = require('imagemin-mozjpeg');

const imageminPngquant = require('imagemin-pngquant');

const imageminWebp = require('imagemin-webp');


const optimiseJPEGImages = () =>
  imagemin([JPEGImages], output, {
    plugins: [
      imageminMozjpeg({
        quality: 70,
      }),
    ]
  });

const optimisePNGImages = () =>
  imagemin([PNGImages], output, {
    plugins: [
      imageminPngquant({ quality: [0.65, 0.80] })
    ],
  });

const convertPNGToWebp = () =>
  imagemin([PNGImages], output, {
    use: [
      imageminWebp({
        quality: 85,
      }),
    ]
  });

const convertJPGToWebp = () =>
  imagemin([JPGImages], output, {
    use: [
      imageminWebp({
        quality: 75,
      }),
    ]
  });
  
optimisePNGImages().catch(error => console.log(error))
