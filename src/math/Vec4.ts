export class Vec4 {
  public static Null(): Readonly<Vec4> {
    return Null
  }

  public static X(): Readonly<Vec4> {
    return X
  }

  public static Y(): Readonly<Vec4> {
    return Y
  }

  public static Z(): Readonly<Vec4> {
    return Z
  }

  public static W(): Readonly<Vec4> {
    return W
  }

  constructor(public x: number = 0, public y: number = 0, public z: number = 0, public w: number = 0) {}

  public equals(other: Vec4): boolean {
    return this === other || (this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w)
  }

  public add(other: Vec4): Vec4 {
    return new Vec4(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w)
  }

  public sub(other: Vec4): Vec4 {
    return new Vec4(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w)
  }

  public scale(f: number): Vec4 {
    return new Vec4(this.x * f, this.y * f, this.z * f, this.w * f)
  }

  public addScaled(other: Vec4, scale: number): Vec4 {
    return new Vec4(
      this.x + other.x * scale,
      this.y + other.y * scale,
      this.z + other.z * scale,
      this.w + other.w * scale
    )
  }

  public reverse(): Vec4 {
    return new Vec4(-this.x, -this.y, -this.z, -this.w)
  }

  public dot(other: Vec4): number {
    return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w
  }

  public lenSq(): number {
    return this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2
  }

  public len(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2)
  }

  public normalize(): Vec4 {
    const l = 1.0 / this.len()
    return new Vec4(this.x * l, this.y * l, this.z * l, this.w * l)
  }

  public distSq(other: Vec4): number {
    return (other.x - this.x) ** 2 + (other.y - this.y) ** 2 + (other.z - this.z) ** 2 + (other.w - this.w) ** 2
  }

  public dist(other: Vec4): number {
    return Math.sqrt(
      (other.x - this.x) ** 2 + (other.y - this.y) ** 2 + (other.z - this.z) ** 2 + (other.w - this.w) ** 2
    )
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

  public angleW(): number {
    return this.angleTo(W)
  }

  public angleTo(other: Vec4): number {
    return Math.acos(this.dot(other) / (this.len() * other.len()))
  }

  public lerp(other: Vec4, t: number): Vec4 {
    if (t <= 0) {
      return this
    } else if (t >= 1.0) {
      return other
    } else {
      return new Vec4(
        this.x + (other.x - this.x) * t,
        this.y + (other.y - this.y) * t,
        this.z + (other.z - this.z) * t,
        this.w + (other.w - this.w) * t
      )
    }
  }

  public nlerp(other: Vec4, t: number): Vec4 {
    return this.lerp(other, t).normalize()
  }

  public slerp(other: Vec4, t: number): Vec4 {
    if (t <= 0) {
      return new Vec4(this.x, this.y, this.z, this.w)
    } else if (t >= 1.0) {
      return new Vec4(other.x, other.y, other.z, other.w)
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

  public project(other: Vec4): Vec4 {
    return other.scale(this.dot(other) / other.lenSq())
  }

  public mutAdd(other: Vec4): Vec4 {
    this.x += other.x
    this.y += other.y
    this.z += other.z
    this.w += other.w
    return this
  }

  public mutSub(other: Vec4): Vec4 {
    this.x -= other.x
    this.y -= other.y
    this.z -= other.z
    this.w -= other.w
    return this
  }

  public mutScale(f: number): Vec4 {
    this.x *= f
    this.y *= f
    this.z *= f
    this.w *= f
    return this
  }

  public mutAddScaled(other: Vec4, scale: number): Vec4 {
    this.x += other.x * scale
    this.y += other.y * scale
    this.z += other.z * scale
    this.w += other.w * scale
    return this
  }

  public mutReverse(): Vec4 {
    this.x = -this.x
    this.y = -this.y
    this.z = -this.z
    this.w = -this.w
    return this
  }

  public mutNormalize(): Vec4 {
    const l = 1.0 / this.len()
    this.x *= l
    this.y *= l
    this.z *= l
    this.w *= l
    return this
  }

  public mutLerp(other: Vec4, t: number): Vec4 {
    if (t <= 0) {
      return this
    } else if (t >= 1.0) {
      this.x = other.x
      this.y = other.y
      this.z = other.z
      this.w = other.w
      return this
    } else {
      this.x += (other.x - this.x) * t
      this.y += (other.y - this.y) * t
      this.z += (other.z - this.z) * t
      this.w += (other.w - this.w) * t
      return this
    }
  }

  public mutNlerp(other: Vec4, t: number): Vec4 {
    return this.mutLerp(other, t).mutNormalize()
  }

  public mutSlerp(other: Vec4, t: number): Vec4 {
    if (t <= 0) {
      return this
    } else if (t >= 1.0) {
      this.x = other.x
      this.y = other.y
      this.z = other.z
      this.w = other.w
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

  public mutProject(other: Vec4): Readonly<Vec4> {
    const f = this.dot(other) / other.lenSq()
    this.x = other.x * f
    this.y = other.y * f
    this.z = other.z * f
    this.w = other.w * f
    return this
  }
}

const Null = Object.freeze(new Vec4())
const X = Object.freeze(new Vec4(1, 0, 0, 0))
const Y = Object.freeze(new Vec4(0, 1, 0, 0))
const Z = Object.freeze(new Vec4(0, 0, 1, 0))
const W = Object.freeze(new Vec4(0, 0, 0, 1))
