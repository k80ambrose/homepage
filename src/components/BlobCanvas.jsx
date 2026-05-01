import { useEffect, useRef } from 'react'
import p5 from 'p5'

export default function BlobCanvas() {
  const containerRef = useRef(null)

  useEffect(() => {
    let handleScroll

    const sketch = (p) => {
      let orbs = []
      let outlineOpacity = 0

      handleScroll = () => {
        const scrollTop = window.scrollY || 0
        outlineOpacity = Math.min(scrollTop / 500, 1)
      }
      window.addEventListener('scroll', handleScroll)

      class Orb {
        constructor() {
          this.pos = p.createVector(p.random(p.width), p.random(p.height))
          this.speed = p.random(0.7, 1.7)
          const startAngle = p.random(p.TWO_PI)
          this.vel = p.createVector(
            p.cos(startAngle) * this.speed,
            p.sin(startAngle) * this.speed
          )
          this.baseRadius = p.random(150, 320)
          // Higher noiseScale = more irregular/warped shape
          this.noiseScale = p.random(0.5, 1.1)
          this.noiseOffset = p.random(1000)
          this.numPoints = 10
          const family = p.floor(p.random(4))
          if (family === 0) {        // blue
            this.r = p.random(0, 60)
            this.g = p.random(80, 180)
            this.b = p.random(180, 255)
          } else if (family === 1) { // green
            this.r = p.random(0, 80)
            this.g = p.random(180, 255)
            this.b = p.random(60, 160)
          } else if (family === 2) { // yellow
            this.r = p.random(200, 255)
            this.g = p.random(200, 255)
            this.b = p.random(0, 60)
          } else {                   // orange
            this.r = p.random(210, 255)
            this.g = p.random(100, 170)
            this.b = p.random(0, 40)
          }
        }

        move() {
          const margin = this.baseRadius + 60

          // Soft boundary: push velocity back when approaching any edge
          if (this.pos.x < margin)              this.vel.x += 0.2
          if (this.pos.x > p.width  - margin)   this.vel.x -= 0.2
          if (this.pos.y < margin)              this.vel.y += 0.2
          if (this.pos.y > p.height - margin)   this.vel.y -= 0.2

          // Small random wander so motion stays organic
          this.vel.x += p.random(-0.08, 0.08)
          this.vel.y += p.random(-0.08, 0.08)

          this.vel.limit(this.speed)
          this.pos.add(this.vel)
          this.noiseOffset += 0.005
        }

        // Sample 2D Perlin noise along a circle in noise-space.
        // Because we walk a closed loop, the shape is always seamlessly closed.
        getVertices() {
          const pts = []
          for (let i = 0; i < this.numPoints; i++) {
            const a = p.map(i, 0, this.numPoints, 0, p.TWO_PI)
            const noiseVal = p.noise(
              this.noiseScale * p.cos(a) + this.noiseOffset,
              this.noiseScale * p.sin(a) + this.noiseOffset
            )
            const r = p.map(noiseVal, 0, 1, this.baseRadius * 0.45, this.baseRadius * 1.45)
            pts.push(p.createVector(
              this.pos.x + r * p.cos(a),
              this.pos.y + r * p.sin(a)
            ))
          }
          return pts
        }

        // Catmull-Rom splines need the last point prepended and
        // first two appended so the curve closes smoothly.
        drawShape(pts) {
          p.beginShape()
          p.curveVertex(pts[pts.length - 1].x, pts[pts.length - 1].y)
          for (const pt of pts) {
            p.curveVertex(pt.x, pt.y)
          }
          p.curveVertex(pts[0].x, pts[0].y)
          p.curveVertex(pts[1].x, pts[1].y)
          p.endShape()
        }

        display() {
          const eased = Math.pow(outlineOpacity, 1.5)
          const blobAlpha = p.lerp(140, 0, eased)
          const outlineAlpha = p.lerp(0, 255, eased)

          // Generate once, use for both fill and stroke
          const pts = this.getVertices()

          p.noStroke()
          p.fill(this.r, this.g, this.b, blobAlpha)
          this.drawShape(pts)

          p.noFill()
          p.strokeWeight(2)
          p.stroke(this.r, this.g, this.b, outlineAlpha)
          this.drawShape(pts)
        }
      }

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight)
        p.frameRate(30)
        for (let i = 0; i < 5; i++) {
          orbs.push(new Orb())
        }
      }

      p.draw = () => {
        p.background(20, 20, 40, 150)
        for (const orb of orbs) {
          orb.move()
          orb.display()
        }
      }

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight)
      }
    }

    const instance = new p5(sketch, containerRef.current)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      instance.remove()
    }
  }, [])

  return <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />
}
