console.log(GLOBAL.aga);
console.log(GLOBAL.ogo);
console.log(APP_HASH);

import Router from 'preact-router';
import { h, render } from 'preact';
import { createPortal } from 'preact/compat';

const Home = () => {
  const container = document.getElementById('modals');
  return (
    <div>
      Home <a href="/about">about</a>
      {createPortal(<h1>ogo</h1>, container)}
    </div>
  );
}

const About = () => (
  <div>
    About <a href="/search/bbb">search</a>
  </div>
);
const Search = () => (
  <div>
    Search <a href="/">home</a>
  </div>
);

const Main = () => (
  <Router>
    <Home path="/" />
    <About path="/about" />
    <Search path="/search/:query/:advanced?" />
  </Router>
);

render(<Main />, document.getElementById('root'));
