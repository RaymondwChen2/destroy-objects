
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')
const playerScore = document.querySelector('#score')
    
canvas.width = 500;
canvas.height = 500;

// ###################### Player #####################
class Player {
  constructor(x, y, radius, color){
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw(){
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0 , Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }
}
let x = canvas.width /2
let y = canvas.height - 10

const player = new Player(x, y, 10, 'green')
player.draw()



// ################ Projectile ####################
class Projectile {
  constructor(x, y, radius, color, velocity){
    
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }
  
  draw(){
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0 , Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }
  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}
const projectile = new Projectile (x, y , 3, 'red', {x: 0, y: -2});

// ################# FallingObjects  ####################
class FallingObjects {
  constructor(x, y, radius, color, velocity){

    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }
  
  draw(){
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0 , Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }
  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}

function spawnObjects(){
  setInterval(()=> {
    const x = Math.random() * canvas.width
    const y = 0
    const radius = 20
    const color = 'blue'
    const velocity = {x: 0, y: .5}
    fallingObjects.push(new FallingObjects(x, y, radius, color, velocity))
  }, 2000)
}

const projectiles = []
const fallingObjects = []

let animation;
let score = 0;
function animate(){
  animation = requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  player.draw()
  projectiles.forEach((projectile => {
    projectile.update()
  }))

  fallingObjects.forEach((objects)=>{
    objects.update()
  })

  fallingObjects.forEach((obj, objIdx) => {
    obj.update()

    if (obj.y === 470){
      cancelAnimationFrame(animation)
    }

    projectiles.forEach((project, projIdx) => {
      let  distance = Math.hypot(project.x - obj.x, project.y - obj.y)

// ######### removing falling object and projectile also gain points ########
      if (distance - obj.radius - project.radius < 1){
        fallingObjects.splice(objIdx, 1)
        projectiles.splice(projIdx, 1)
        score += 100
        console.log(score)
        playerScore.innerHTML = Number(score)
      }
    })
  })
}
// ############### space bar pressed #######################

addEventListener('keydown', function(e) {
  if (e.keyCode === 32)
  projectiles.push(new Projectile(x, y, 3, 'red', {x: 0, y: -2}))
})
// ############# left or right button pressed #################
document.addEventListener('keydown', function(e){
  switch (e.keyCode){
    case 37:
    player.x += -10
    x += -10
    break;
    case 39:
    player.x += 10
    x += 10
    break;
  }
  if (player.x > 490){
    x = 490
    player.x = 490
  } 
  if (player.x < 10){
    x = 10
    player.x = 10
  }
})

animate()
spawnObjects()

