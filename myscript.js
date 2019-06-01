var declutter_list1, declutter_flag = 0;

function inform() {
	// initialize the webpage
	init();
	console.log("extension loading complete!");
}

function init () {
	declutter_list1 = document.getElementsByTagName('body')[0].getElementsByTagName('*');
	document.addEventListener("keyup", function(event) {
		var code = event.which || event.keyCode;
		if (code == 17) declutter_flag = 0;
	});
	document.addEventListener("keydown", function(event) {
		var code = event.which || event.keyCode;
		if (code == 17) declutter_flag = 1;
	});
	for (var i = 0; i < declutter_list1.length; i++) {
		declutter_list1[i].addEventListener("click", function (event) {
			if (declutter_flag && this == event.target) this.style.display = "none";
			
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
	rightalign.src = chrome.extension.getURL("favicon/61151.png");
	leftalign.src = chrome.extension.getURL("favicon/61152.png");
	pause.src = chrome.extension.getURL("favicon/61153.png");
	start.src = chrome.extension.getURL("favicon/61154.png");
	close.src = chrome.extension.getURL("favicon/61155.png");
	
	div.appendChild(leftalign);
	div.appendChild(start);
	div.appendChild(pause);
	div.appendChild(close);
	div.appendChild(rightalign);
	
	// set properties of container division
	div.style.height = "20px";
	div.style.width = "80px";
	div.style.position = "fixed";
	div.style.top = "50px";
	div.style.right = "0px";
	div.style.zIndex = "9999999999999999";
	div.style.backgroundColor = "#03ffffff";
	
	// shifting the control layout to left or right
	rightalign.addEventListener("click", () => {
		div.style.left = "auto";
		div.style.right = "0px";
		rightalign.style.display = "none";
		leftalign.style.display = "block";
	});
	leftalign.addEventListener("click", () => {
		div.style.right = "auto";
		div.style.left = "0px";
		leftalign.style.display = "none";
		rightalign.style.display = "block";
	});
	rightalign.style.display = "none";
	
	
	document.body.prepend(div);
}

window.onload = inform();
