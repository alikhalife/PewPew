
// creating canvas
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");


canvas.width = innerWidth;
canvas.height = innerHeight;


class Player {
    constructor() {


        this.velocity = {
            x: 0,
            // y: 0 - for this game I want my player to move from left to right
            // so I don't really need it to move up and down. y is not necessary
        }

        const image = new Image();
        image.src = "./assets/img/spaceship.png"

image.onload = () => {
        const scale = 0.15;
        this.image = image;
        this.width = image.width * scale;
        this.height = image.height * scale;
        this.positiion = {
            x: canvas.width / 2 - this.width / 2,
            y: canvas.height - this.height - 50
        }
    }

    }

    draw() {
        // we created a red rectangle to check if our code is functioning
        // once it is verified, I no longer need it, so I commented it out
        // context.fillStyle = "red";
        // context.fillRect(this.positiion.x, this.positiion.y, this.width, this.height)
       if(this.image)
        context.drawImage(
            this.image,
            this.positiion.x,
            this.positiion.y,
            this.width,
            this.height
        )
    }
}

const player = new Player();
player.draw();


function animate() {
    requestAnimationFrame(animate); // looping on image so that it appears on browser

    //changing bg colour to black
    context.fillStyle = "black"
    context.fillRect(0, 0, canvas.width, canvas.height)

    player.draw(); // calling the image
}

animate();