
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

        this.rotation = 0;

        const image = new Image();
        image.src = "./assets/img/spaceship.png"

        image.onload = () => {
            const scale = 0.15;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
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
        context.save()

        context.translate(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2
        )

        context.rotate(this.rotation)

        context.translate(
            -player.position.x - player.width / 2,
            -player.position.y - player.height / 2
        )

        context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

        context.restore()
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x;
        }
    }
}

//PROJECTILES
class Projectile {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 5;
    }

    draw() {
        context.beginPath()
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)

        context.fillStyle = "yellow"
        context.fill()
        context.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

//WHEN INVADERS EXPLODE
class Particle {
    constructor({ position, velocity, radius, color }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
        this.opacity = 1;
    }

    draw() {
        context.save()
        context.globalalpha = this.opacity
        context.beginPath()
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)

        context.fillStyle = this.color
        context.fill()
        context.closePath()

        context.restore()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.opacity -= 0.01
    }
}

//INVADERS PROJECTILES
class InvaderProjectile {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 3;
        this.height = 10;

    }

    draw() {
        context.fillStyle = "red"
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}


//INVADERS
class Invader {
    constructor({position}) {
        this.velocity = {
            x: 0,
            y: 0,
        }
        const image = new Image();
        image.src = "./assets/img/invader.png"

        image.onload = () => {
            const scale = 1;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: position.x,
                y: position.y
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
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update({velocity}) {
        if (this.image) {
            this.draw()
            this.position.x += velocity.x;
            this.position.y += velocity.y;
        }
    }

    shoot(invaderProjectiles) {
        invaderProjectiles.push(new InvaderProjectile({
            position:{
                x:this.position.x + this.width / 2,
                y:this.position.y + this.height
            },
            velocity:{
                x: 0,
                y: 5,
            }
        }))
    }
}

//CREATING A GRID FOR INVADERS
class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0,
        }
        this.velocity = {
            x: 3,
            y: 0,
        }
        this.invaders = [];
        const columns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 2)

        this.width = columns * 30

        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(
                    new Invader({
                        position:{
                            x: x * 30,
                            y: y * 30,
                        }
                    }
                ))
            }
        }
        console.log(this.invaders)
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y = 0

        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
            this.velocity.y = 30
        }
     }
}

//VARIABLES
const player = new Player();
const projectiles = [];
const grids = [];
const invaderProjectiles = [];
const particles = [];

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

let frames = 0;
let randomInterval = Math.floor(Math.random() * 500) + 500;

function createParticles({object, color}) {
    for(let i= 0; i < 15; i++) {
        particles.push(new Particle({
            position:{
                x:object.position.x + object.width / 2,
                y:object.position.y + object.height / 2
            },
            velocity:  {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            radius: Math.random() * 3,
            color: color || '#BAA0DE'
        }))
    }
}

// ANIMATION
function animate() {
    requestAnimationFrame(animate); // looping on image so that it appears on browser

    //changing bg colour to black
    context.fillStyle = "black"
    context.fillRect(0, 0, canvas.width, canvas.height)
    player.update(); // calling the image
    particles.forEach((particle, i) => {
        if(particle.opacity <= 0){
            setTimeout(()=> {
                particles.splice(i, 1)
            }, 0)
        }
        else {
            particle.update() //this will render particles
        }
        
    })

console.log(particles)
    //removing invader projectiles so that they are not stored and they don't slow the game
    invaderProjectiles.forEach((invaderProjectile, index) =>{
        if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
            setTimeout(() => {
                invaderProjectiles.splice(index, 1)
            }, 0)
        } else {invaderProjectile.update()}

        //when an invader projectile hits player this will mark that player lost
        if(invaderProjectile.position.y + invaderProjectile.height >= player.position.y &&
            invaderProjectile.position.x + invaderProjectile.width >= player.position.x &&
            invaderProjectile.position.x <= player.position.x + player.width
            ) {
            setTimeout(() => {
                invaderProjectiles.splice(index, 1)
            }, 0)
            console.log("you lose")

            createParticles({
                object: player,
                color: "white"
            })
        }
    })

    //projectiles hit invaders
    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            })
        }
        else {
            projectile.update()
        }
    })

    grids.forEach((grid, gridIndex) => {
        grid.update()
        //SPAWNING INVADER PROJECTILES
         if(frames % 100 === 0 && grid.invaders.length > 0) {
        grid.invaders[Math.floor(Math.random() * 
            grid.invaders.length)].shoot(invaderProjectiles)
        }
        grid.invaders.forEach((invader, i) => {
            invader.update({velocity: grid.velocity})

            projectiles.forEach((projectile, j) => {
                if (projectile.position.y - projectile.radius <=
                    invader.position.y + invader.height && 
                    projectile.position.x + projectile.radius >=
                    invader.position.x 
                    && projectile.position.x - projectile.radius <= 
                    invader.position.x + invader.width  && projectile.position.y + 
                    projectile.radius >= invader.position.y
                    ) {
                        setTimeout(()=> {
                            const invaderFound = grid.invaders.find(invader2 => {
                                return invader2 === invader
                            })
                            const projectileFound = projectiles.find(projectile2 => 
                                projectile2 === projectile)
                            
                            //REMOVE INVADER AND PROJECTILE
                            if(invaderFound && projectileFound) {
                            createParticles({
                                object: invader
                            })
                            grid.invaders.splice(i, 1)
                            projectiles.splice(j, 1)

                            if(grid.invaders.length > 0){
                                const firstInvader = grid.invaders[0]
                                const lastInvader = grid.invaders[grid.invaders.length - 1]

                                grid.width = 
                                lastInvader.position.x - firstInvader.position.x + lastInvader.width

                                grid.position.x = firstInvader.position.x
                            } else {
                                grids.splice(gridIndex, 1)
                            }
                            }
                        }, 0) 
                    }
            })
        })
    })

    if (keys.ArrowLeft.pressed && player.position.x >= 0) {
        player.velocity.x = -5;
        player.rotation = - 0.15;
    }
    else if (keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 5;
        player.rotation = 0.15;
    }
    else {
        player.velocity.x = 0;
        player.rotation = 0;
    }

    
    //SPAWNING ENNEMIES
    if(frames % randomInterval === 0 ) {
        grids.push(new Grid())
        randomInterval = Math.floor(Math.random() * 500) + 500;
        frames = 0
        console.log(randomInterval)
    }

    frames ++
}


animate();



//moving player
addEventListener("keydown", ({ key }) => {
    switch (key) {
        case "ArrowLeft":
            // console.log("left")
            // player.velocity.x += -5
            keys.ArrowLeft.pressed = true;
            break

        case "ArrowRight":
            // console.log("right")
            // player.velocity.x += 5
            keys.ArrowRight.pressed = true;
            break

        case " ":
            // console.log("space")
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y,
                },
                velocity: {
                    x: 0,
                    y: -8,
                }
            }))
            // console.log(projectiles)
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