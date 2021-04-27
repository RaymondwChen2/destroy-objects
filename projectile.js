class Projectile {
  constructor(y, radius, color, velocity){

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
}

