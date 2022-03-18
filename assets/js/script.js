
// CREATING CANVAS
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");


canvas.width = innerWidth;
canvas.height = innerHeight;



//SPACESHIP
class Player {
    constructor() {


        this.velocity = {
            x: 0,
            y: 0,

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

        context.drawImage(
            this.image,
            this.positiion.x,
            this.positiion.y,
            this.width,
            this.height
        )
    }

    update() {
        if (this.image) {
            this.draw()
            this.positiion.x += this.velocity.x;
        }


    }
}


//VARIABLES
const player = new Player();
const keys = {
    ArrowLeft: {
        pressed: false
    },

    ArrowRight: {
        pressed: false
    },

    space: {
        pressed: false
    }
}



// ANIMATION
function animate() {
    requestAnimationFrame(animate); // looping on image so that it appears on browser

    //changing bg colour to black
    context.fillStyle = "black"
    context.fillRect(0, 0, canvas.width, canvas.height)

    player.update(); // calling the image

    if (keys.ArrowLeft.pressed && player.positiion.x >= 0) {
        player.velocity.x = -5;
    }
    else if (keys.ArrowRight.pressed && player.positiion.x + player.width <= canvas.width) {
        player.velocity.x = 5;
    }
    else {
        player.velocity.x = 0;
    }


}

animate();



//moving player
addEventListener("keydown", ({ key }) => {
    switch (key) {
        case "ArrowLeft":
            console.log("left")
            // player.velocity.x += -5
            keys.ArrowLeft.pressed = true;
            break

        case "ArrowRight":
            console.log("right")
            // player.velocity.x += 5
            keys.ArrowRight.pressed = true;
            break

        case " ":
            console.log("space")
            break
    }

})



addEventListener("keyup", ({ key }) => {
    switch (key) {
        case "ArrowLeft":
            console.log("left")
            keys.ArrowRight.pressed = false;
            break

        case "ArrowRight":
            console.log("right")
            keys.ArrowLeft.pressed = false;
            break

        case " ":
            console.log("space")
            break
    }

})