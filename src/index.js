import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import View from './header'
import PlayGround from './game'
import './index.css'

ReactDOM.render(<View />, document.querySelector('#header'));

ReactDOM.render( <PlayGround/>, document.getElementById('game'))
/*
ReactDOM.render(
  <footer class="footer"><div className="title">This Project was developped for school graduation</div>
  </footer>, document.getElementById('footer'))*/

