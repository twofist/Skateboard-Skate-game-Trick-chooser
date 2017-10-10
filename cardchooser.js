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
		let image = document.getElementById("image1").childNodes[1];
		let src = image.src.split("card")[1];
		if(src === "back.png") return;
		
		currentplayer++;
		
		for(let ii = 0; ii < 4; ii++){
			let image = document.getElementById("image"+(ii+1)).childNodes[1];
			let src = image.src.split("card")[1];
			if(src === "front.jpg")
				changeimage(image);
		}
	}
	
	function failed(){
		if(players.length < 1) return;
		
		let image = document.getElementById("image1").childNodes[1];
		let src = image.src.split("card")[1];
		if(src === "back.png") return;
		
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
			let image = document.getElementById("image"+(ii+1)).childNodes[1];
			let src = image.src.split("card")[1];
			if(src === "front.jpg")
				changeimage(image);
		}
	}
	
    function changeimage(image){
		document.getElementById(image.id).src = imagetouse(image);
	}
	
	function imagetouse(image){
		let src = image.src.split("card")[1];
		if(src === "back.png"){
			document.getElementById("triesnum").innerHTML = parseInt(document.getElementById("triesnum").innerHTML) +1;
			image.parentNode.childNodes[5].style.visibility = "visible";
			setcorrectdata(image);
			image.parentNode.childNodes[7].style.visibility = "visible";
			return "images/cardfront.jpg";
		}else if(src === "front.jpg"){
			document.getElementById("triesnum").innerHTML = parseInt(document.getElementById("triesnum").innerHTML) -1;
			image.parentNode.childNodes[5].style.visibility = "hidden";
			image.parentNode.childNodes[7].style.visibility = "hidden";
			return "images/cardback.png";
		}
		else document.getElementById("tries").innerHTML = "error";
	}
	
	function setcorrectdata(image){
		let text = image.parentNode.childNodes[3].innerHTML;
		if(text === "Trick")
			image.parentNode.childNodes[5].innerHTML = skatetricks.Trick[Math.floor((Math.random() * skatetricks.Trick.length))];
		else if(text === "Stance")
			image.parentNode.childNodes[5].innerHTML = skatetricks.Stance[Math.floor((Math.random() * skatetricks.Stance.length))];
		else if(text === "Obstacle")
			image.parentNode.childNodes[5].innerHTML = skatetricks.Obstacle[Math.floor((Math.random() * skatetricks.Obstacle.length))];
		else if(text === "Random")
			image.parentNode.childNodes[5].innerHTML = skatetricks.Random[Math.floor((Math.random() * skatetricks.Random.length))];
		else console.log("error");
	}
	
	function reset(){
		location.reload();
	}
