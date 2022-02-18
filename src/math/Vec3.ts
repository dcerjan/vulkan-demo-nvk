export class Vec3 {
  public static Null(): Readonly<Vec3> {
    return Null
  }

  public static X(): Readonly<Vec3> {
    return X
  }

  public static Y(): Readonly<Vec3> {
    return Y
  }

  public static Z(): Readonly<Vec3> {
    return Z
  }

  public static Left(): Readonly<Vec3> {
    return Left
  }

  public static Right(): Readonly<Vec3> {
    return Right
  }

  public static Up(): Readonly<Vec3> {
    return Up
  }

  public static Down(): Readonly<Vec3> {
    return Down
  }

  public static Forward(): Readonly<Vec3> {
    return Forward
  }

  public static Back(): Readonly<Vec3> {
    return Back
  }

  public static Bisect(a: Vec3, b: Vec3) {
    return a.add(b).normalize()
  }

  public static From(other: { x: number; y: number; z: number }) {
    return new Vec3(other.x, other.y, other.z)
  }

  constructor(public x: number = 0, public y: number = 0, public z: number = 0) {}

  public equals(other: Vec3): boolean {
    return this === other || (this.x === other.x && this.y === other.y && this.z === other.z)
  }

  public add(other: Vec3): Readonly<Vec3> {
    return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z)
  }

  public sub(other: Vec3): Readonly<Vec3> {
    return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z)
  }

  public addScaled(other: Vec3, scale: number): Readonly<Vec3> {
    return new Vec3(this.x + other.x * scale, this.y + other.y * scale, this.z + other.z * scale)
  }

  public scale(f: number): Readonly<Vec3> {
    return new Vec3(this.x * f, this.y * f, this.z * f)
  }

  public reverse(): Readonly<Vec3> {
    return new Vec3(-this.x, -this.y, -this.z)
  }

  public dot(other: Vec3): number {
    return this.x * other.x + this.y * other.y + this.z * other.z
  }

  public cross(other: Vec3): Readonly<Vec3> {
    return new Vec3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    )
  }

  public lenSq(): number {
    return this.x ** 2 + this.y ** 2 + this.z ** 2
  }

  public len(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2)
  }

  public normalize(): Readonly<Vec3> {
    const l = 1.0 / this.len()
    return new Vec3(this.x * l, this.y * l, this.z * l)
  }

  public distSq(other: Vec3): number {
    return (other.x - this.x) ** 2 + (other.y - this.y) ** 2 + (other.z - this.z) ** 2
  }

  public dist(other: Vec3): number {
    return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2 + (other.z - this.z) ** 2)
  }

  public angleX(): number {
    return this.angleTo(X)
  }

  public angleY(): number {
    return this.angleTo(Y)
  }

  public angleZ(): number {
    return this.angleTo(Z)
  }

  public angleTo(other: Vec3): number {
    return Math.acos(this.dot(other) / (this.len() * other.len()))
  }

  public lerp(other: Vec3, t: number): Readonly<Vec3> {
    if (t <= 0) {
      return this
    } else if (t >= 1.0) {
      return other
    } else {
      return new Vec3(this.x + (other.x - this.x) * t, this.y + (other.y - this.y) * t, this.z + (other.z - this.z) * t)
    }
  }

  public nlerp(other: Vec3, t: number): Readonly<Vec3> {
    return this.lerp(other, t).normalize()
  }

  public slerp(other: Vec3, t: number): Readonly<Vec3> {
    if (t <= 0) {
      return new Vec3(this.x, this.y, this.z)
    } else if (t >= 1.0) {
      return new Vec3(other.x, other.y, other.z)
    } else {
      const omega = this.angleTo(other)
      const sinOmega = Math.sin(omega)
      const tOmega = t * omega
      const fSrc = Math.sin(omega - tOmega) / sinOmega
      const fDst = Math.sin(tOmega) / sinOmega
      const pSrc = this.scale(fSrc)
      const pDst = other.scale(fDst)
      return pSrc.add(pDst)
    }
  }

  public project(other: Vec3): Readonly<Vec3> {
    return other.scale(this.dot(other) / other.lenSq())
  }

  public mutAdd(other: Vec3): Readonly<Vec3> {
    this.x += other.x
    this.y += other.y
    this.z += other.z
    return this
  }

  public mutSub(other: Vec3): Readonly<Vec3> {
    this.x -= other.x
    this.y -= other.y
    this.z -= other.z
    return this
  }

  public mutAddScaled(other: Vec3, scale: number): Readonly<Vec3> {
    this.x += other.x * scale
    this.y += other.y * scale
    this.z += other.z * scale
    return this
  }

  public mutScale(f: number): Readonly<Vec3> {
    this.x *= f
    this.y *= f
    this.z *= f
    return this
  }

  public mutReverse(): Readonly<Vec3> {
    this.x = -this.x
    this.y = -this.y
    this.z = -this.z
    return this
  }

  public mutCross(other: Vec3): Readonly<Vec3> {
    const x = this.y * other.z - this.z * other.y
    const y = this.z * other.x - this.x * other.z
    const z = this.x * other.y - this.y * other.x

    this.x = x
    this.y = y
    this.z = z

    return this
  }

  public mutNormalize(): Readonly<Vec3> {
    const l = 1.0 / this.len()
    this.x *= l
    this.y *= l
    this.z *= l
    return this
  }

  public mutLerp(other: Vec3, t: number): Readonly<Vec3> {
    if (t <= 0) {
      return this
    } else if (t >= 1.0) {
      this.x = other.x
      this.y = other.y
      this.z = other.z
      return this
    } else {
      this.x += (other.x - this.x) * t
      this.y += (other.y - this.y) * t
      this.z += (other.z - this.z) * t
      return this
    }
  }

  public mutNlerp(other: Vec3, t: number): Readonly<Vec3> {
    return this.mutLerp(other, t).mutNormalize()
  }

  public mutSlerp(other: Vec3, t: number): Readonly<Vec3> {
    if (t <= 0) {
      return this
    } else if (t >= 1.0) {
      this.x = other.x
      this.y = other.y
      this.z = other.z
      return this
    } else {
      const omega = this.angleTo(other)
      const sinOmega = Math.sin(omega)
      const tOmega = t * omega
      const fSrc = Math.sin(omega - tOmega) / sinOmega
      const fDst = Math.sin(tOmega) / sinOmega
      return this.mutScale(fSrc).mutAddScaled(other, fDst)
    }
  }

  public mutProject(other: Vec3): Readonly<Vec3> {
    const f = this.dot(other) / other.lenSq()
    this.x = other.x * f
    this.y = other.y * f
    this.z = other.z * f
    return this
  }
}

const Null = Object.freeze(new Vec3())
const X = Object.freeze(new Vec3(1, 0, 0))
const Y = Object.freeze(new Vec3(0, 1, 0))
const Z = Object.freeze(new Vec3(0, 0, 1))
const Right = X
const Left = Object.freeze(new Vec3(-1, 0, 0))
const Up = Y
const Down = Object.freeze(new Vec3(0, -1, 0))
const Back = Z
const Forward = Object.freeze(new Vec3(0, 0, -1))
