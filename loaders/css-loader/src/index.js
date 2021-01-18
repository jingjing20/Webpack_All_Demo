import avatar from './jinghao.jpg';
// import './index.css';
import './index.less';

var img = new Image();
img.src = avatar;
img.classList.add('jing');
var root = document.getElementById('root');
root.append(img);
