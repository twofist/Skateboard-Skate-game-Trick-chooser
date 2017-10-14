let players = [];
	let amount = 0;
	let currentplayer = 0;
	
	
	function addplayers(button){
		amount++;
		players.push(new Player(amount));
		let player = players[amount-1];
		button.parentNode.innerHTML += '<div id=' + player.number + '>' + player.player + ": " + player.skate + "</div>";
	}
	
	function Player(amount){
		this.player = "Player "+amount;
		this.status = true;
		this.skate = "";
		this.count = 0;
		this.number = amount;
	}
	
	function landed(){
		let src = document.getElementById("card1").childNodes[3];
		if(getComputedStyle(src).visibility === "hidden") return;
		
		currentplayer++;
		
		for(let ii = 0; ii < 4; ii++){
			let image = document.getElementById("card"+(ii+1));
			if(getComputedStyle(image.childNodes[3]).visibility === "visible")
				changeimage(image);
		}
	}
	
	function failed(){
		if(players.length < 1) return;
		
		let src = document.getElementById("card1").childNodes[3];
		if(getComputedStyle(src).visibility === "hidden") return;
		
		if(currentplayer > players.length-1)
			currentplayer = 0;
		let player = players[currentplayer];
		
		let check = 0;
		while(!player.status && check < players.length*2){
			currentplayer++;
			check++;
			if(currentplayer > players.length-1)
				currentplayer = 0;
			player = players[currentplayer];
		}
			
		
		player.count++;
		switch(player.count){
			case 1: player.skate += "S";
				break;
			case 2: player.skate += "k";
				break;
			case 3: player.skate += "a";
				break;
			case 4: player.skate += "t";
				break;
			case 5: player.skate += "e";
					player.status = false;
				break;
			default: if(player.status) console.log("error");
		}
		currentplayer++;
		document.getElementById(player.number).innerHTML = player.player + ": " + player.skate;
		
		for(let ii = 0; ii < 4; ii++){
			let image = document.getElementById("card"+(ii+1));
			if(getComputedStyle(image.childNodes[3]).visibility === "visible")
				changeimage(image);
		}
	}
	
    function changeimage(image){
		changevisibility(image);
	}
	
	function changevisibility(image){
		
		let src = document.getElementById(image.id).childNodes[3];
		if(getComputedStyle(src).visibility === "hidden"){
			document.getElementById("triesnum").innerHTML = parseInt(document.getElementById("triesnum").innerHTML) +1;
			setcorrectdata(image);
			document.getElementById(image.id).childNodes[3].style.visibility = "visible";
			document.getElementById(image.id).childNodes[5].style.visibility = "visible";
		}else if(getComputedStyle(src).visibility === "visible"){
			document.getElementById("triesnum").innerHTML = parseInt(document.getElementById("triesnum").innerHTML) -1;
			document.getElementById(image.id).childNodes[3].style.visibility = "hidden";
			document.getElementById(image.id).childNodes[5].style.visibility = "hidden";
		}
		else document.getElementById("tries").innerHTML = "error";
	}
	
	function setcorrectdata(image){
		let text = image.childNodes[1].innerHTML;
		if(text === "Trick")
			image.childNodes[3].innerHTML = skatetricks.Trick[Math.floor((Math.random() * skatetricks.Trick.length))];
		else if(text === "Stance")
			image.childNodes[3].innerHTML = skatetricks.Stance[Math.floor((Math.random() * skatetricks.Stance.length))];
		else if(text === "Obstacle")
			image.childNodes[3].innerHTML = skatetricks.Obstacle[Math.floor((Math.random() * skatetricks.Obstacle.length))];
		else if(text === "Random")
			image.childNodes[3].innerHTML = skatetricks.Random[Math.floor((Math.random() * skatetricks.Random.length))];
		else console.log("error");
	}
	
	function reset(){
		location.reload();
	}
