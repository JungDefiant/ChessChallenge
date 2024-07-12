import EventBus from './third-party/simple-event-bus.js';
import jsxElem, { render } from './third-party/jaredsartin-jsx-no-react.js';
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(jsxElem.createElement);

(() => {
  render(html`
  <div>
    <chess-piece-control id='piece-control' />
    <div id='viewport'>
      <chess-board />
      <chess-controls />
    </div>
  </div>`, document.body);
  window.chessEvents = new EventBus('Chess Events');
})();
