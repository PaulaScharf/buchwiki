import 'bootstrap';

$(document).ready(function () {
	console.log('Webpack loaded!');
});

let geologie = require("./markdown/geologie.md");
let container = document.getElementById("container");

container.innerHTML = geologie;