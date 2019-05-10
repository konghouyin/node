import '../style/public_reset.css';
import '../style/index.css';

require('./menu.js');

window.onload=()=>{
	document.getElementsByTagName('html')[0].style.height = window.innerHeight+"px";
	
	if(localStorage.name==undefined){
		require('./name.js').out();
	}
}






