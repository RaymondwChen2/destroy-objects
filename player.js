
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')
const playerScore = document.querySelector('#score')
const gameOver = document.querySelector('#game-over')
const gameOverScore = document.querySelector('#game-over-score')
let gamePaused = true
let over = true

    
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

let player = new Player(x, y, 10, 'green')
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
let projectile = new Projectile (x, y , 3, 'red', {x: 0, y: -2});

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
    const velocity = {x: 0, y: 1}
    fallingObjects.push(new FallingObjects(x, y, radius, color, velocity))
  }, 1000)
}

let projectiles = []
let fallingObjects = []
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
    
    // ################### game over ###############
    if (obj.y === 470){
      cancelAnimationFrame(animation)
      gameOverScore.innerHTML = Number(score)
      gameOver.style.display = 'flex'
    }
    projectiles.forEach((project, projIdx) => {
      let  distance = Math.hypot(project.x - obj.x, project.y - obj.y)
      
      // ######### removing falling object and projectile also gain points ########
      if (distance - obj.radius - project.radius < 1){
        setTimeout(()=>{
          fallingObjects.splice(objIdx, 1)
          projectiles.splice(projIdx, 1)
          score += 100
          playerScore.innerHTML = Number(score)
        })
      }
    })
  })
}

// ############# spacebar/paused /left/ right button pressed #################
document.addEventListener('keydown', function(e){
  
  switch (e.keyCode){
    case 32:
      console.log('spacebar')
      projectiles.push(new Projectile(x, y, 3, 'red', {x: 0, y: -2}))
      break;
    case 37:
        player.x += -10
        x += -10
        console.log('left right')
        break;
    case 39:
          player.x += 10
          x += 10
          console.log('left right')
          break;
    case 82:
      window.location.reload()
      break;
    case 80:
      if (gamePaused){
        gamePaused = false
        console.log('paused')
        cancelAnimationFrame(animation)
        paused.style.display = 'flex'
      } else {
          console.log('not paused')
          paused.style.display = 'none'
          gamePaused = true
          window.requestAnimationFrame(animate)
            }
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
        
        const modal = document.querySelector('#modal')
        const paused = document.querySelector('#pause')
        
        // ########### start game ###########
        modal.addEventListener('click', function(){
          animate()
          spawnObjects()
          modal.style.display = 'none'
        })
        
        // ######### restart ###########
        function restart(){
          window.cancelAnimationFrame(animation)
          c.clearRect(0, 0, canvas.width, canvas.height)
          player = new Player(canvas.width /2, canvas.height -10, 10, 'green')
          projectile = new Projectile (x, y , 3, 'red', {x: 0, y: -2})
          projectiles = [];
          fallingObjects = [];
          score = 0
          gameOverScore.innerHTML = 0
          playerScore.innerHTML = 0
          spawnObjects()
          window.requestAnimationFrame(animate)
        }
        gameOver.addEventListener('click', function(){
          window.location.reload()
        })
        