
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')
const playerScore = document.querySelector('#score')
const gameOver = document.querySelector('#game-over')
const gameOverScore = document.querySelector('#game-over-score')
let gamePaused = true
let over = true

    
canvas.width = 1000;
canvas.height = 800;

     // ######## background #########
    const bg = new Image()
    bg.src = 'oceanCanvas.png'

    const BG = {
      x: 0,
      y1: 0,
      y2: canvas.height,
      width: canvas.width,
      height: canvas.height
    }
    function background(){
        BG.y1 -= .3
        if (BG.y1 < -BG.height) BG.y1 = BG.height 
        BG.y2 -= .3
        if (BG.y2 < -BG.height) BG.y2 = BG.height
        c.drawImage(bg, BG.x, BG.y1, canvas.width, canvas.height)
        c.drawImage(bg, BG.x, BG.y2, canvas.width, canvas.height)
      }

// ###################### Player #####################

const ship = new Image()
ship.src = 'boatSprite.png'

let x = canvas.width /2
let y = canvas.height - 30


// ################ Projectile ####################
const cannonball = new Image()
cannonball.src = 'Cannonball.png'
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

    c.drawImage(cannonball, this.x - 18, this.y - 15, this.radius * 3, this.radius * 3)
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

    c.drawImage(enemyShip, this.x -61, this.y-50, this.radius * 4, this.radius * 3)
  }
  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}

const enemyShip = new Image()
enemyShip.src = 'enemyShip.png'

function spawnObjects(){
  setInterval(()=> {
    const x = Math.random() * canvas.width
    const y = 0
    const radius = 40
    const color = 'blue'
    const velocity = {x: 0, y: 1}
    fallingObjects.push(new FallingObjects(x, y, radius, color, velocity))
  }, 2000)
}

let projectiles = []
let fallingObjects = []
let animation;
let score = 0;


// ############# spacebar/paused /left/ right button pressed #################
document.addEventListener('keydown', function(e){
  
  switch (e.keyCode){
    case 32:
      projectiles.push(new Projectile(x, y, 12, 'red', {x: 0, y: -8}))
      projectile.update()
      break;
    case 37:
        shipPosW += -25
        x += -25
        break;
    case 39:
        shipPosW += 25
          x += 25
          break;
    case 82:
      window.location.reload()
      break;
    case 80:
      if (gamePaused){
        gamePaused = false
        cancelAnimationFrame(animation)
        paused.style.display = 'flex'
      } else {
          paused.style.display = 'none'
          gamePaused = true
          window.requestAnimationFrame(animate)
            }
          }
          if (shipPosW > 925){
            x = 955
            shipPosW = 925
          } 
          if (shipPosW < 0){
            x = 40
            shipPosW = 0
          }
        })


        // window.addEventListener('keydown', function(e){
        //   if (e.keyCode === 32){
        //       projectiles.push(new Projectile(x, y, 12, 'red', {x: 0, y: -8}))
        //       projectile.update()
        //   }
        //   if (e.keyCode === 37){
        //     player.x += -25
        //     x += -25
        //     // player.draw()
        //   }
        //   if (e.keyCode === 39){
        //     player.x += 25
        //     x += 25
        //     // player.draw()
        //   }
        //   if (e.keyCode === 82 ){
        //     window.location.reload()
        //     // break;
        //   }
        //   if (!gamePaused){
        //     gamePaused = false
        //     cancelAnimationFrame(animation)
        //     paused.style.display = 'flex'
        //   } else {
        //         paused.style.display = 'none'
        //         gamePaused = true
        //         window.requestAnimationFrame(animate)
        //           }
        //   if (player.x > 970){
        //     x = 970
        //     player.x = 970
        //     } 
        //   if (player.x < 30){
        //     x = 30
        //     player.x = 30
        //   }
        // })



        
        const modal = document.querySelector('#modal')
        const paused = document.querySelector('#pause')
        
        // ######### restart ###########
        gameOver.addEventListener('click', function(){
          window.location.reload()
        })

        // ########### start game ###########
        modal.addEventListener('click', function(){
          animate()
          spawnObjects()
          modal.style.display = 'none'
        })
        
        let shipPosW = canvas.width/2.15
        let shipPosH = canvas.height-120
        function animate(){
          c.save()
          c.clearRect(0, 0, canvas.width, canvas.height)
          background()
          projectiles.forEach((projectile => {
            projectile.update()
          }))
          c.drawImage(ship, 208, 384, 208, 192, shipPosW, shipPosH, 100, 100)
          animation = requestAnimationFrame(animate)
          
          fallingObjects.forEach((objects)=>{
            objects.update()
          })
          
          fallingObjects.forEach((obj, objIdx) => {
            obj.update()
            
            // ################### game over ###############
            if (obj.y === 740){
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
          c.restore()
        }