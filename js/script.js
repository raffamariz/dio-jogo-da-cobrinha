let points = 0;
let time = 150;
let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = []; //lista de coordenadas que definirá o corpo da cobra
snake[0] = {
	x: 8 * box,
	y: 8 * box
}
let direction = 'right';
let food = {
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box
}

//cria tela do jogo
function createBG(){
	context.fillStyle = 'lightblue';
	context.fillRect(0, 0, 16 * box, 16 * box);
}


function createSnake(){
	for(let i in snake){
		context.fillStyle = 'green';
		context.fillRect(snake[i].x, snake[i].y, box, box);
	}
}

function drawFood(){
	context.fillStyle = 'orange';
	context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', command);

function command(e){
	if((e.keyCode == 37 || e.keyCode == 65) && direction != 'right') direction = 'left';
	if((e.keyCode == 38 || e.keyCode == 87) && direction != 'down') direction = 'up';
	if((e.keyCode == 39 || e.keyCode == 68) && direction != 'left') direction = 'right';
	if((e.keyCode == 40 || e.keyCode == 83) && direction != 'up') direction = 'down';
}

function reset(){
	snake[0] = {
		x: 8 * box,
		y: 8 * box
	}
	points = 0;
}

function start(){

	if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
	if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
	if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
	if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;

	for(let i = 1; i < snake.length; i++){
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
			alert('GAME OVER :(\nPontuação: ' + points);
			window.location.reload();
		}
	}

	createBG();
	createSnake();
	drawFood();

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if(direction === 'right') snakeX += box;
	if(direction === 'left') snakeX -= box;
	if(direction === 'up') snakeY -= box;
	if(direction === 'down') snakeY += box;

	if(snakeX != food.x || snakeY != food.y){
		snake.pop();
	} else if(snakeX == food.x && snakeY == food.y){
		food.x = Math.floor(Math.random() * 15 + 1) * box;
		food.y = Math.floor(Math.random() * 15 + 1) * box;
		points++;
		document.querySelector('#score span').innerHTML = points;
	}

	let newHead = {
		x: snakeX,
		y: snakeY
	}

	snake.unshift(newHead);
}

//aumenta a velocidade de movimento da cobra de acordo com a pontuação
function update(){
		if(points <= 5){
			time = 150;
		} else if(points < 15){
			time = 100;
		} else if(points < 30){
			time = 75;
		} else {
			time = 50;
		}
		let jogo = setTimeout(start, time);
		setTimeout(update, time);
}

update();


