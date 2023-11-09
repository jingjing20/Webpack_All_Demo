import counter from './counter';
import number from './number';

counter();
number();

if (module.hot) {
  module.hot.accept('./number', () => {
    document.body.removeChild(document.getElementById('number'));
    number();
  });
}
