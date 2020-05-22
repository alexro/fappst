console.log(GLOBAL.aga);
console.log(GLOBAL.ogo);
console.log(APP_HASH);

import Router from 'preact-router';
import { h, render } from 'preact';
import { createPortal } from 'preact/compat';

const Input = () => {
  function input(e) {
    console.log(e.target.value);
  }

  return <input onInput={input} />;
};

const Home = () => {
  const container = document.getElementById('box1').parentElement;
  container.innerHTML = '';

  return (
    <div>
      Home <a href="/about">about</a>
      {createPortal(<Input/>, container)}
    </div>
  );
};

const About = () => <div>About</div>;
const Search = () => <div>Search</div>;

const Main = () => (
  <Router>
    <Home path="/" />
    <About path="/about" />
    <Search path="/search/:query/:advanced?" />
  </Router>
);

render(<Main />, document.getElementById('root'));
