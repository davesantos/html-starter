console.log('main.js parsed');

import css from './_sass/all.sass';
import html from './index.pug';
import js from './js/all.js';
import customImg from './assets/vessel.png'

var theImg = document.getElementById('home');
theImg.src = customImg;
