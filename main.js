import Viewer from './view.js';
const svgFile = document.querySelector('#svgFile');
const svgInline = document.querySelector('#svgInline');

svgInline.oninput = (evt) => {
    Viewer.view(evt.target.value);
    
    setTimeout(()=>{
        evt.target.value = null;
        alert("Svg loaded, switch to viewe tab");
    },100)
}

svgFile.onchange = (evt) => {
    var reader = new FileReader();
    reader.onload = function (e) {
        Viewer.view(e.target.result);
        evt.target.value = "";
        alert("Svg loaded, switch to viewe tab");
    };
    reader.readAsText(evt.target.files[0]);
}
