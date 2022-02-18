import { EulerAngles } from './EulerAngles'
import { Mat4 } from './Mat4'
import { Vec3 } from './Vec3'

export class Quaternion {
  public static Identity(): Readonly<Quaternion> {
    return IDENTITY
  }

  public static Rotation(axis: Vec3, angle: number): Quaternion {
    const a = (angle / 360) * Math.PI
    const sinhalf = Math.sin(a)
    const coshalf = Math.cos(a)
    const naxis = axis.normalize()
    return new Quaternion(sinhalf * naxis.x, sinhalf * naxis.y, sinhalf * naxis.z, coshalf)
  }

  public static LookAt(from: Vec3, to: Vec3, up: Vec3 = Vec3.Up()): Quaternion {
    const f = new Vec3(0, 0, 0)
    const t = to.sub(from)
    if (t.len() === 0.0) {
      return new Quaternion(0.0, 0.0, 0.0, 1.0)
    }
    return new Mat4().mutToLookAt(f, t, up).toQuaternion()
  }

  public static Direction(direction: Vec3) {
    return Quaternion.LookAt(direction, Vec3.Null()).normalize()
  }

  constructor(public x: number = 0, public y: number = 0, public z: number = 0, public w: number = 1) {}

  public equals(other: Quaternion): boolean {
    if (this === other) {
      return true
    } else {
      return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w
    }
  }

  public conjugate(): Quaternion {
    return new Quaternion(-this.x, -this.y, -this.z, this.w)
  }

  public mul(other: Quaternion): Quaternion {
    return new Quaternion(
      this.w * other.x + this.x * other.w + this.y * other.z - this.z * other.y,
      this.w * other.y + this.y * other.w + this.z * other.x - this.x * other.z,
      this.w * other.z + this.z * other.w + this.x * other.y - this.y * other.x,
      this.w * other.w - this.x * other.x - this.y * other.y - this.z * other.z
    )
  }

  public transform(vec: Vec3): Vec3 {
    const qc = this.conjugate()
    const qv = new Quaternion(vec.x, vec.y, vec.z, 0)
    const qp = this.mul(qv).mul(qc)
    return new Vec3(qp.x, qp.y, qp.z)
  }

  public transformBatch(vectors: Vec3[]): Vec3[] {
    const qc = this.conjugate()
    return vectors.map((vec) => {
      const qv = new Quaternion(vec.x, vec.y, vec.z, 0)
      const qp = this.mul(qv).mul(qc)
      return new Vec3(qp.x, qp.y, qp.z)
    })
  }

  public normalize(): Quaternion {
    const l = 1 / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    return new Quaternion(this.x * l, this.y * l, this.z * l, this.w * l)
  }

  public lerp(other: Quaternion, t: number): Quaternion {
    if (t <= 0) {
      return this
    } else if (t >= 1.0) {
      return other
    } else {
      return new Quaternion(
        this.x + (other.x - this.x) * t,
        this.y + (other.y - this.y) * t,
        this.z + (other.z - this.z) * t,
        this.w + (other.w - this.w) * t
      )
    }
  }

  public toMat4(): Mat4 {
    const qxx = this.x * this.x
    const qyy = this.y * this.y
    const qzz = this.z * this.z
    const qww = this.w * this.w
    const qxz = this.x * this.z
    const qxy = this.x * this.y
    const qyz = this.y * this.z
    const qxw = this.x * this.w
    const qyw = this.y * this.w
    const qzw = this.z * this.w

    const inv = 1.0 / (qxx + qyy + qzz + qww)
    const m00 = (+qxx - qyy - qzz + qww) * inv
    const m11 = (-qxx + qyy - qzz + qww) * inv
    const m22 = (-qxx - qyy + qzz + qww) * inv

    const m10 = (2.0 * (qxy + qzw)) / inv
    const m01 = (2.0 * (qxy - qzw)) / inv

    const m20 = (2.0 * (qxz - qyw)) / inv
    const m02 = (2.0 * (qxz + qyw)) / inv

    const m21 = (2.0 * (qyz + qxw)) / inv
    const m12 = (2.0 * (qyz - qxw)) / inv

    return new Mat4(m00, m01, m02, 0, m10, m11, m12, 0, m20, m21, m22, 0, 0, 0, 0, 1)
  }

  public mutConjugate(): Quaternion {
    this.x = -this.x
    this.y = -this.y
    this.z = -this.z
    this.w = this.w
    return this
  }

  public mutMul(other: Quaternion): Quaternion {
    const x = this.w * other.x + this.x * other.w + this.y * other.z - this.z * other.y
    const y = this.w * other.y + this.y * other.w + this.z * other.x - this.x * other.z
    const z = this.w * other.z + this.z * other.w + this.x * other.y - this.y * other.x
    const w = this.w * other.w - this.x * other.x - this.y * other.y - this.z * other.z

    this.x = x
    this.y = y
    this.z = z
    this.w = w

    return this
  }

  public mutTransform(vec: Vec3): Vec3 {
    const qc = this.conjugate()
    const qv = new Quaternion(vec.x, vec.y, vec.z, 0)
    const qp = this.mul(qv).mul(qc)

    vec.x = qp.x
    vec.y = qp.y
    vec.z = qp.z

    return vec
  }

  public mutTransformBatch(vectors: Vec3[]): Vec3[] {
    const qc = this.conjugate()
    for (let i = 0; i < vectors.length; ++i) {
      const vec = vectors[i]
      const qv = new Quaternion(vec.x, vec.y, vec.z, 0)
      const qp = this.mul(qv).mul(qc)

      vec.x = qp.x
      vec.y = qp.y
      vec.z = qp.z
    }
    return vectors
  }

  public mutNormalize(): Quaternion {
    const l = 1 / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    this.x *= l
    this.y *= l
    this.z *= l
    this.w *= l
    return this
  }

  public mutLerp(other: Quaternion, t: number): Quaternion {
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

  public toEulerAngles() {
    const euler = new EulerAngles()
    const test = this.x * this.y + this.z * this.w

    // singularity at north pole
    if (test > 0.499) {
      euler.pitch = 0
      euler.yaw = 2 * Math.atan2(this.x, this.w)
      euler.roll = Math.PI * 0.5
      return euler
    }

    // singularity at south pole
    if (test < -0.499) {
      euler.pitch = 0
      euler.yaw = -2 * Math.atan2(this.x, this.w)
      euler.roll = -Math.PI * 0.5
      return euler
    }

    const sqx = this.x * this.x
    const sqy = this.y * this.y
    const sqz = this.z * this.z

    const toDeg = (1.0 / Math.PI) * 180
    euler.pitch = Math.atan2(2 * this.x * this.w - 2 * this.y * this.z, 1 - 2 * sqx - 2 * sqz) * toDeg
    euler.yaw = Math.atan2(2 * this.y * this.w - 2 * this.x * this.z, 1 - 2 * sqy - 2 * sqz) * toDeg
    euler.roll = Math.asin(2 * test) * toDeg

    return euler
  }
}

const IDENTITY = new Quaternion(0, 0, 0, 1)
