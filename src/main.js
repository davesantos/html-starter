console.log('main.js parsed');

import css from './_sass/all.sass';
import html from './index.pug';
import js from './js/all.js';
// import customImg from './assets/sinatra.jpg'
// var theImg = document.getElementById('home');
// theImg.src = customImg;

const allImages = require.context("./images", true, /^\.\/.*\.(jpe?g|png|gif)$/);
allImages.keys().map(allImages);
console.log(allImages);


// const allImg = [
// 	'vessel.png'
// ];
//
// const getCats = () => allImg.map(name => `<img src='./assets/${name}' alt='${name}' />`);
