(function(){
	var matches = 0;
	
	var flippedCards = [];
	
	var modalGameOver = document.querySelector("#modalGameOver");
	
	var matchSign = document.querySelector("#match");
	
	//Variável que controlará a fase na qual o jogador se encontra, declarada com o valor inicial 1
	var fase = 1;
			
	//Variável que indicará a pasta na qual o programa irá buscar as imagens para montar as cartas		
	var src = "img_fase1/";
	
	//Total de fases, no caso, duas fases apenas (altere esse valor de acordo com o número de fases)
	var totFases = 2;
	
	startGame();
	
	function startGame(){
		//A declaração do array de imagens agora fica dentro da função startGame, para que o array seja zerado a cada nova execução da função
		var images = [];
	
		//Aqui a variável src tem se valor (o endereço da origem das imagens) alterado de acordo com a fase atual. A fase muda na função gameOver
		if(fase === 2){
			src = "img_fase2/";
		}
	
		for(var i = 0; i < 24; i++){
			var img = {
				//Aqui usamos a variável que indica a pasta com as imagens
				src: src + i + ".jpg",
				id: i%12
			};
			images.push(img);
		}
		
		matches = 0;
		
		flippedCards = [];
		images = randomSort(images);
		
		var frontFaces = document.getElementsByClassName("front");
		var backFaces = document.getElementsByClassName("back");

		for(var i = 0; i < 24; i++){
			frontFaces[i].classList.remove("match","flipped");
			backFaces[i].classList.remove("match","flipped");
			
			var card = document.querySelector("#card" + i);
			card.style.left = (i % 8 === 0) ? 5 + "px" : (i % 8) * 165 + 5 + "px";
			card.style.top = i < 8 ? 5 + "px" : (i < 16 ? 250 + "px" : 495 + "px");
			
			card.addEventListener("click",flipCard,false);
			
			frontFaces[i].style.background = "url('"+images[i].src+"')";
			frontFaces[i].setAttribute("id",images[i].id);
		}
		 modalGameOver.style.zIndex = -2;
		 modalGameOver.removeEventListener("click",startGame,false);
	}
	function randomSort(oldArray){
		var newArray = [];
		
		while(newArray.length !== oldArray.length){
			var i = Math.floor(Math.random()* 24);
			
			if(newArray.indexOf(oldArray[i]) < 0){
				newArray.push(oldArray[i]);
			}
			
		}
		return newArray;
		
	}
	
	function flipCard(){
		if(flippedCards.length < 2){
		var faces = this.getElementsByClassName("face");
		
		if(faces[0].classList.length > 2){
				return;
			}
		
		faces[0].classList.toggle("flipped");
		faces[1].classList.toggle("flipped");
		
		flippedCards.push(this);
		
		if(flippedCards.length === 2){
			if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){
				flippedCards[0].childNodes[1].classList.toggle("match");
				flippedCards[0].childNodes[3].classList.toggle("match");
				flippedCards[1].childNodes[1].classList.toggle("match");
				flippedCards[1].childNodes[3].classList.toggle("match");
				
				matchCardsSign();
				
				matches++;
				
				flippedCards = [];
				
				if(matches >= 12){
					gameOver();
				}
			}
		}
	  } else {
		  flippedCards[0].childNodes[1].classList.toggle("flipped");
		  flippedCards[0].childNodes[3].classList.toggle("flipped");
		  flippedCards[1].childNodes[1].classList.toggle("flipped");
		  flippedCards[1].childNodes[3].classList.toggle("flipped");
		  
		  flippedCards = [];
	  }
	}
	 function gameOver(){
		modalGameOver.style.zIndex = 99;
		modalGameOver.addEventListener("click",startGame,false);
		
		//Aqui mudamos a fase, caso não seja a última
		if(fase < totFases){
			fase++;
		}
	}
	function matchCardsSign(){
		matchSign.style.zIndex = "1";
		matchSign.style.top = "150px";
		matchSign.style.opacity = "0";
		setTimeout(function(){
		   matchSign.style.zIndex = "-1";
		   matchSign.style.top = "250px";
		   matchSign.style.opacity = "1";
		},1500);
	}	
		
	
}());
