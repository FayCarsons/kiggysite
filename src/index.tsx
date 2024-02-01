import { Router, Route } from '@solidjs/router';
import { render } from 'solid-js/web';
import { lazy } from 'solid-js';
import './App.css';
import { Header } from './Components/Header';
import Footer  from './Components/Footer'

const Home = lazy(() => import('./Components/Home'));
const Works = lazy(() => import('./Components/Works'));
const About = lazy(() => import('./Components/About'));

render(
  () => (
    <>
      <Header />
      <Router>
        <Route path="/" component={Home} />
        <Route path="works" component={Works} />
        <Route path="about" component={About} />
      </Router>
      <Footer/>
    </>
  ),
  document.getElementById('root')!,
);
