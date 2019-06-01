var declutter_list1, declutter_flag = 0, declutter_hides = [], declutter_undo;

function inform() {
	// initialize the webpage
	init();
	console.log("extension loading complete!");
}

function init () {
	declutter_list1 = document.getElementsByTagName('body')[0].getElementsByTagName('*');
	document.addEventListener("keyup", function(event) {
		var code = event.which || event.keyCode;
		if (code == 18) declutter_flag = 0;
	});
	document.addEventListener("keydown", function(event) {
		var code = event.which || event.keyCode;
		if (code == 18) declutter_flag = 1;
	});
	for (var i = 0; i < declutter_list1.length; i++) {
		declutter_list1[i].addEventListener("click", function (event) {
			if (declutter_flag && this == event.target) {
				this.style.display = "none";
				declutter_hides.unshift(this);
				declutter_undo.style.display = "inline";
			}
			
			// if (declutter_flag) this.style.display = "none";
			// event.stopPropagation();
		});
	}
	
	// show control layout on the page
	create_layout();
}

function create_layout () {
	var div = document.createElement("div"),
		rightalign = document.createElement("img"),
		undo = document.createElement("img"),
		start = document.createElement("img"),
		pause = document.createElement("img"),
		close = document.createElement("img"),
		leftalign = document.createElement("img");
	
	rightalign.style.height = "20px";
	rightalign.style.width = "20px";
	leftalign.style.height = "20px";
	leftalign.style.width = "20px";
	start.style.height = "20px";
	start.style.width = "20px";
	pause.style.height = "20px";
	pause.style.width = "20px";
	close.style.height = "20px";
	close.style.width = "20px";
	undo.style.height = "20px";
	undo.style.width = "20px";
	rightalign.src = chrome.extension.getURL("favicon/61151.png");
	leftalign.src = chrome.extension.getURL("favicon/61152.png");
	pause.src = chrome.extension.getURL("favicon/61153.png");
	start.src = chrome.extension.getURL("favicon/61154.png");
	close.src = chrome.extension.getURL("favicon/61155.png");
	undo.src = chrome.extension.getURL("favicon/61150.png");
	
	div.appendChild(leftalign);
	div.appendChild(undo);
	div.appendChild(start);
	div.appendChild(pause);
	div.appendChild(close);
	div.appendChild(rightalign);
	
	// set properties of container division
	div.style.height = "20px";
	div.style.position = "fixed";
	div.style.top = "50px";
	div.style.right = "8px";
	div.style.zIndex = "9999999999999999";
	div.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
	
	// shifting the control layout to left or right
	rightalign.addEventListener("click", () => {
		div.style.left = "auto";
		div.style.right = "8px";
		rightalign.style.display = "none";
		leftalign.style.display = "inline";
	});
	leftalign.addEventListener("click", () => {
		div.style.right = "auto";
		div.style.left = "8px";
		leftalign.style.display = "none";
		rightalign.style.display = "inline";
	});
	rightalign.style.display = "none";
	
	// play pause ui switch
	start.addEventListener("click", () => {
		declutter_flag = 1;
		close.style.display = "none";
		start.style.display = "none";
		pause.style.display = "inline";
	});
	pause.addEventListener("click", () => {
		declutter_flag = 0;
		close.style.display = "inline";
		pause.style.display = "none";
		start.style.display = "inline";
	});
	pause.style.display = "none";
	
	close.addEventListener("click", () => {
		div.style.display = "none";
	});
	
	// undo the hidden elements
	undo.addEventListener("click", () => {
		if (declutter_hides.length > 0) {
			declutter_hides[0].style.display = "block";
			declutter_hides.shift();
			
			if (declutter_hides.length == 0) undo.style.display = "none";
		}
	});
	undo.style.display = "none";
	
	declutter_undo = undo;
	
	document.body.prepend(div);
}

window.onload = inform();
