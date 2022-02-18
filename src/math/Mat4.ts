import { Quaternion } from './Quaternion'
import { Vec3 } from './Vec3'
import { Vec4 } from './Vec4'

const det3x3 = (
  a00: number,
  a10: number,
  a20: number,
  a01: number,
  a11: number,
  a21: number,
  a02: number,
  a12: number,
  a22: number
): number => a00 * (a11 * a22 - a21 * a12) + a10 * (a21 * a02 - a01 * a22) + a20 * (a01 * a12 - a11 * a02)

let optMat4Temp1: Mat4
let optMat4Temp2: Mat4
let optVec3Temp1: Vec3
let optVec3Temp2: Vec3
let optVec3Temp3: Vec3

export class Mat4 {
  public static Null(): Readonly<Mat4> {
    return NULL
  }

  public static Identity(): Readonly<Mat4> {
    return IDENTITY
  }

  public static Translation(pos: Vec3): Readonly<Mat4> {
    return new Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, pos.x, pos.y, pos.z, 1)
  }

  public static Rotation(axis: Vec3, angle: number): Readonly<Mat4> {
    const normalizedAxis = axis.normalize()
    const a = (angle / 180) * Math.PI
    const c = Math.cos(a)
    const s = Math.sin(a)
    const oneC = 1 - c
    const u = normalizedAxis.x
    const v = normalizedAxis.y
    const w = normalizedAxis.z

    return new Mat4(
      u * u + (1 - u * u) * c,
      u * v * oneC - w * s,
      u * w * oneC + v * s,
      0,
      u * v * oneC + w * s,
      v * v + (1 - v * v) * c,
      v * w * oneC - u * s,
      0,
      u * w * oneC - v * s,
      v * w * oneC + u * s,
      w * w + (1 - w * w) * c,
      0,
      0,
      0,
      0,
      1
    )
  }

  public static Reflection(pos: Vec3, normal: Vec3): Readonly<Mat4> {
    const translateToOrigin = Mat4.Translation(pos)
    const translateBack = Mat4.Translation(Vec3.Null().sub(pos))
    const n = normal.normalize()
    const reflection = new Mat4(
      1 - 2 * n.x * n.x,
      -2 * n.x * n.y,
      -2 * n.x * n.z,
      0,
      -2 * n.x * n.y,
      1 - 2 * n.y * n.y,
      -2 * n.y * n.z,
      0,
      -2 * n.x * n.z,
      -2 * n.y * n.z,
      1 - 2 * n.z * n.z,
      0,
      0,
      0,
      0,
      1
    )

    return translateToOrigin.mul(reflection).mul(translateBack)
  }

  public static Scale(s: number, t: number, u: number): Readonly<Mat4> {
    return new Mat4(s, 0, 0, 0, 0, t, 0, 0, 0, 0, u, 0, 0, 0, 0, 1)
  }

  public static Ortho(
    left: number,
    right: number,
    top: number,
    bottom: number,
    near: number,
    far: number
  ): Readonly<Mat4> {
    return new Mat4(
      2 / (right - left),
      0,
      0,
      0,
      0,
      2 / (top - bottom),
      0,
      0,
      0,
      0,
      2 / (far - near),
      0,
      (right + left) / (right - left),
      (top + bottom) / (top - bottom),
      near / (far - near),
      1
    )
  }

  public static Frustum(
    left: number,
    right: number,
    top: number,
    bottom: number,
    near: number,
    far: number
  ): Readonly<Mat4> {
    return new Mat4(
      (2 * near) / (right - left),
      0,
      0,
      0,
      0,
      (2 * near) / (top - bottom),
      0,
      0,
      (right + left) / (right - left),
      (top + bottom) / (top - bottom),
      far / (far - near),
      -1,
      0,
      0,
      -(far * near) / (far - near),
      0
    )
  }

  public static Perspective(fovy: number, ratio: number, near: number, far: number): Readonly<Mat4> {
    const tanHalfFovy = Math.tan((fovy / 720.0) * Math.PI)

    return new Mat4(
      1 / (ratio * tanHalfFovy),
      0,
      0,
      0,
      0,
      1 / tanHalfFovy,
      0,
      0,
      0,
      0,
      far / (far - near),
      1,
      0,
      0,
      -(far * near) / (far - near),
      0
    )
  }

  public static LookAt(from: Vec3, to: Vec3, up: Vec3 = Vec3.Up()): Readonly<Mat4> {
    return new Mat4().mutToLookAt(from, to, up)
  }

  public static LookAtOld(from: Vec3, to: Vec3, up: Vec3): Readonly<Mat4> {
    const f = to.sub(from).normalize()
    const s = f.cross(up).normalize()
    const u = s.cross(f).normalize()

    return new Mat4(s.x, u.x, f.x, 0, s.y, u.y, f.y, 0, s.z, u.z, f.z, 0, -s.dot(from), -u.dot(from), -f.dot(from), 1)
  }

  public m: Float32Array

  constructor(
    a00: number = 1,
    a01: number = 0,
    a02: number = 0,
    a03: number = 0,
    a10: number = 0,
    a11: number = 1,
    a12: number = 0,
    a13: number = 0,
    a20: number = 0,
    a21: number = 0,
    a22: number = 1,
    a23: number = 0,
    a30: number = 0,
    a31: number = 0,
    a32: number = 0,
    a33: number = 1
  ) {
    this.m = new Float32Array([a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33])
  }

  public transpose(): Readonly<Mat4> {
    return new Mat4(
      this.m[0],
      this.m[4],
      this.m[8],
      this.m[12],
      this.m[1],
      this.m[5],
      this.m[9],
      this.m[13],
      this.m[2],
      this.m[6],
      this.m[10],
      this.m[14],
      this.m[3],
      this.m[7],
      this.m[11],
      this.m[15]
    )
  }

  public inverse(): Readonly<Mat4> {
    const d00 = det3x3(
      this.m[5],
      this.m[6],
      this.m[7],
      this.m[9],
      this.m[10],
      this.m[11],
      this.m[13],
      this.m[14],
      this.m[15]
    )
    const d01 = det3x3(
      this.m[4],
      this.m[6],
      this.m[7],
      this.m[8],
      this.m[10],
      this.m[11],
      this.m[12],
      this.m[14],
      this.m[15]
    )
    const d02 = det3x3(
      this.m[4],
      this.m[5],
      this.m[7],
      this.m[8],
      this.m[9],
      this.m[11],
      this.m[12],
      this.m[13],
      this.m[15]
    )
    const d03 = det3x3(
      this.m[4],
      this.m[5],
      this.m[6],
      this.m[8],
      this.m[9],
      this.m[10],
      this.m[12],
      this.m[13],
      this.m[14]
    )

    const d10 = det3x3(
      this.m[1],
      this.m[2],
      this.m[3],
      this.m[9],
      this.m[10],
      this.m[11],
      this.m[13],
      this.m[14],
      this.m[15]
    )
    const d11 = det3x3(
      this.m[0],
      this.m[2],
      this.m[3],
      this.m[8],
      this.m[10],
      this.m[11],
      this.m[12],
      this.m[14],
      this.m[15]
    )
    const d12 = det3x3(
      this.m[0],
      this.m[1],
      this.m[3],
      this.m[8],
      this.m[9],
      this.m[11],
      this.m[12],
      this.m[13],
      this.m[15]
    )
    const d13 = det3x3(
      this.m[0],
      this.m[1],
      this.m[2],
      this.m[8],
      this.m[9],
      this.m[10],
      this.m[12],
      this.m[13],
      this.m[14]
    )

    const d20 = det3x3(
      this.m[1],
      this.m[2],
      this.m[3],
      this.m[5],
      this.m[6],
      this.m[7],
      this.m[13],
      this.m[14],
      this.m[15]
    )
    const d21 = det3x3(
      this.m[0],
      this.m[2],
      this.m[3],
      this.m[4],
      this.m[6],
      this.m[7],
      this.m[12],
      this.m[14],
      this.m[15]
    )
    const d22 = det3x3(
      this.m[0],
      this.m[1],
      this.m[3],
      this.m[4],
      this.m[5],
      this.m[7],
      this.m[12],
      this.m[13],
      this.m[15]
    )
    const d23 = det3x3(
      this.m[0],
      this.m[1],
      this.m[2],
      this.m[4],
      this.m[5],
      this.m[6],
      this.m[12],
      this.m[13],
      this.m[14]
    )

    const d30 = det3x3(
      this.m[1],
      this.m[2],
      this.m[3],
      this.m[5],
      this.m[6],
      this.m[7],
      this.m[9],
      this.m[10],
      this.m[11]
    )
    const d31 = det3x3(
      this.m[0],
      this.m[2],
      this.m[3],
      this.m[4],
      this.m[6],
      this.m[7],
      this.m[8],
      this.m[10],
      this.m[11]
    )
    const d32 = det3x3(
      this.m[0],
      this.m[1],
      this.m[3],
      this.m[4],
      this.m[5],
      this.m[7],
      this.m[8],
      this.m[9],
      this.m[11]
    )
    const d33 = det3x3(
      this.m[0],
      this.m[1],
      this.m[2],
      this.m[4],
      this.m[5],
      this.m[6],
      this.m[8],
      this.m[9],
      this.m[10]
    )

    const d = 1 / (this.m[0] * d00 - this.m[1] * d01 + this.m[2] * d02 - this.m[3] * d03)

    return new Mat4(
      +d00 * d,
      -d10 * d,
      +d20 * d,
      -d30 * d,
      -d01 * d,
      +d11 * d,
      -d21 * d,
      +d31 * d,
      +d02 * d,
      -d12 * d,
      +d22 * d,
      -d32 * d,
      -d03 * d,
      +d13 * d,
      -d23 * d,
      +d33 * d
    )
  }

  public mul(other: Mat4): Readonly<Mat4> {
    return new Mat4(
      this.m[0] * other.m[0] + this.m[4] * other.m[1] + this.m[8] * other.m[2] + this.m[12] * other.m[3],
      this.m[1] * other.m[0] + this.m[5] * other.m[1] + this.m[9] * other.m[2] + this.m[13] * other.m[3],
      this.m[2] * other.m[0] + this.m[6] * other.m[1] + this.m[10] * other.m[2] + this.m[14] * other.m[3],
      this.m[3] * other.m[0] + this.m[7] * other.m[1] + this.m[11] * other.m[2] + this.m[15] * other.m[3],

      this.m[0] * other.m[4] + this.m[4] * other.m[5] + this.m[8] * other.m[6] + this.m[12] * other.m[7],
      this.m[1] * other.m[4] + this.m[5] * other.m[5] + this.m[9] * other.m[6] + this.m[13] * other.m[7],
      this.m[2] * other.m[4] + this.m[6] * other.m[5] + this.m[10] * other.m[6] + this.m[14] * other.m[7],
      this.m[3] * other.m[4] + this.m[7] * other.m[5] + this.m[11] * other.m[6] + this.m[15] * other.m[7],

      this.m[0] * other.m[8] + this.m[4] * other.m[9] + this.m[8] * other.m[10] + this.m[12] * other.m[11],
      this.m[1] * other.m[8] + this.m[5] * other.m[9] + this.m[9] * other.m[10] + this.m[13] * other.m[11],
      this.m[2] * other.m[8] + this.m[6] * other.m[9] + this.m[10] * other.m[10] + this.m[14] * other.m[11],
      this.m[3] * other.m[8] + this.m[7] * other.m[9] + this.m[11] * other.m[10] + this.m[15] * other.m[11],

      this.m[0] * other.m[12] + this.m[4] * other.m[13] + this.m[8] * other.m[14] + this.m[12] * other.m[15],
      this.m[1] * other.m[12] + this.m[5] * other.m[13] + this.m[9] * other.m[14] + this.m[13] * other.m[15],
      this.m[2] * other.m[12] + this.m[6] * other.m[13] + this.m[10] * other.m[14] + this.m[14] * other.m[15],
      this.m[3] * other.m[12] + this.m[7] * other.m[13] + this.m[11] * other.m[14] + this.m[15] * other.m[15]
    )
  }

  public transform3d(vec: Vec3): Readonly<Vec3> {
    return new Vec3(
      this.m[0] * vec.x + this.m[4] * vec.y + this.m[8] * vec.z + this.m[12],
      this.m[1] * vec.x + this.m[5] * vec.y + this.m[9] * vec.z + this.m[13],
      this.m[2] * vec.x + this.m[6] * vec.y + this.m[10] * vec.z + this.m[14]
    )
  }

  public transformBatch3d(vectors: Vec3[]): Readonly<Vec3[]> {
    return vectors.map(
      (vec) =>
        new Vec3(
          this.m[0] * vec.x + this.m[4] * vec.y + this.m[8] * vec.z + this.m[12],
          this.m[1] * vec.x + this.m[5] * vec.y + this.m[9] * vec.z + this.m[13],
          this.m[2] * vec.x + this.m[6] * vec.y + this.m[10] * vec.z + this.m[14]
        )
    )
  }

  public transform4d(vec: Vec4): Readonly<Vec4> {
    return new Vec4(
      this.m[0] * vec.x + this.m[4] * vec.y + this.m[8] * vec.z + this.m[12] * vec.w,
      this.m[1] * vec.x + this.m[5] * vec.y + this.m[9] * vec.z + this.m[13] * vec.w,
      this.m[2] * vec.x + this.m[6] * vec.y + this.m[10] * vec.z + this.m[14] * vec.w,
      this.m[3] * vec.x + this.m[7] * vec.y + this.m[11] * vec.z + this.m[15] * vec.w
    )
  }

  public transformBatch4d(vectors: Vec4[]): Readonly<Vec4[]> {
    return vectors.map(
      (vec) =>
        new Vec4(
          this.m[0] * vec.x + this.m[4] * vec.y + this.m[8] * vec.z + this.m[12] * vec.w,
          this.m[1] * vec.x + this.m[5] * vec.y + this.m[9] * vec.z + this.m[13] * vec.w,
          this.m[2] * vec.x + this.m[6] * vec.y + this.m[10] * vec.z + this.m[14] * vec.w,
          this.m[3] * vec.x + this.m[7] * vec.y + this.m[11] * vec.z + this.m[15] * vec.w
        )
    )
  }

  public mutFrom(other: Mat4) {
    const m = this.m
    const o = other.m

    for (let i = 0; i < 16; ++i) {
      m[i] = o[i]
    }

    return this
  }

  public mutTranspose(): Readonly<Mat4> {
    const a00 = this.m[0]
    const a01 = this.m[4]
    const a02 = this.m[8]
    const a03 = this.m[12]

    const a10 = this.m[1]
    const a11 = this.m[5]
    const a12 = this.m[9]
    const a13 = this.m[13]

    const a20 = this.m[2]
    const a21 = this.m[6]
    const a22 = this.m[10]
    const a23 = this.m[14]

    const a30 = this.m[3]
    const a31 = this.m[7]
    const a32 = this.m[11]
    const a33 = this.m[15]

    this.m[0] = a00
    this.m[1] = a01
    this.m[2] = a02
    this.m[3] = a03

    this.m[4] = a10
    this.m[5] = a11
    this.m[6] = a12
    this.m[7] = a13

    this.m[8] = a20
    this.m[9] = a21
    this.m[10] = a22
    this.m[11] = a23

    this.m[12] = a30
    this.m[13] = a31
    this.m[14] = a32
    this.m[15] = a33

    return this
  }

  public mutInverse(): Readonly<Mat4> {
    const d00 = det3x3(
      this.m[5],
      this.m[6],
      this.m[7],
      this.m[9],
      this.m[10],
      this.m[11],
      this.m[13],
      this.m[14],
      this.m[15]
    )
    const d01 = det3x3(
      this.m[4],
      this.m[6],
      this.m[7],
      this.m[8],
      this.m[10],
      this.m[11],
      this.m[12],
      this.m[14],
      this.m[15]
    )
    const d02 = det3x3(
      this.m[4],
      this.m[5],
      this.m[7],
      this.m[8],
      this.m[9],
      this.m[11],
      this.m[12],
      this.m[13],
      this.m[15]
    )
    const d03 = det3x3(
      this.m[4],
      this.m[5],
      this.m[6],
      this.m[8],
      this.m[9],
      this.m[10],
      this.m[12],
      this.m[13],
      this.m[14]
    )

    const d10 = det3x3(
      this.m[1],
      this.m[2],
      this.m[3],
      this.m[9],
      this.m[10],
      this.m[11],
      this.m[13],
      this.m[14],
      this.m[15]
    )
    const d11 = det3x3(
      this.m[0],
      this.m[2],
      this.m[3],
      this.m[8],
      this.m[10],
      this.m[11],
      this.m[12],
      this.m[14],
      this.m[15]
    )
    const d12 = det3x3(
      this.m[0],
      this.m[1],
      this.m[3],
      this.m[8],
      this.m[9],
      this.m[11],
      this.m[12],
      this.m[13],
      this.m[15]
    )
    const d13 = det3x3(
      this.m[0],
      this.m[1],
      this.m[2],
      this.m[8],
      this.m[9],
      this.m[10],
      this.m[12],
      this.m[13],
      this.m[14]
    )

    const d20 = det3x3(
      this.m[1],
      this.m[2],
      this.m[3],
      this.m[5],
      this.m[6],
      this.m[7],
      this.m[13],
      this.m[14],
      this.m[15]
    )
    const d21 = det3x3(
      this.m[0],
      this.m[2],
      this.m[3],
      this.m[4],
      this.m[6],
      this.m[7],
      this.m[12],
      this.m[14],
      this.m[15]
    )
    const d22 = det3x3(
      this.m[0],
      this.m[1],
      this.m[3],
      this.m[4],
      this.m[5],
      this.m[7],
      this.m[12],
      this.m[13],
      this.m[15]
    )
    const d23 = det3x3(
      this.m[0],
      this.m[1],
      this.m[2],
      this.m[4],
      this.m[5],
      this.m[6],
      this.m[12],
      this.m[13],
      this.m[14]
    )

    const d30 = det3x3(
      this.m[1],
      this.m[2],
      this.m[3],
      this.m[5],
      this.m[6],
      this.m[7],
      this.m[9],
      this.m[10],
      this.m[11]
    )
    const d31 = det3x3(
      this.m[0],
      this.m[2],
      this.m[3],
      this.m[4],
      this.m[6],
      this.m[7],
      this.m[8],
      this.m[10],
      this.m[11]
    )
    const d32 = det3x3(
      this.m[0],
      this.m[1],
      this.m[3],
      this.m[4],
      this.m[5],
      this.m[7],
      this.m[8],
      this.m[9],
      this.m[11]
    )
    const d33 = det3x3(
      this.m[0],
      this.m[1],
      this.m[2],
      this.m[4],
      this.m[5],
      this.m[6],
      this.m[8],
      this.m[9],
      this.m[10]
    )

    const d = 1 / (this.m[0] * d00 - this.m[1] * d01 + this.m[2] * d02 - this.m[3] * d03)

    this.m[0] = +d00 * d
    this.m[1] = -d10 * d
    this.m[2] = +d20 * d
    this.m[3] = -d30 * d

    this.m[4] = -d01 * d
    this.m[5] = +d11 * d
    this.m[6] = -d21 * d
    this.m[7] = +d31 * d

    this.m[8] = +d02 * d
    this.m[9] = -d12 * d
    this.m[10] = +d22 * d
    this.m[11] = -d32 * d

    this.m[12] = -d03 * d
    this.m[13] = +d13 * d
    this.m[14] = -d23 * d
    this.m[15] = +d33 * d

    return this
  }

  public mutMul(other: Mat4): Readonly<Mat4> {
    const a00 = this.m[0] * other.m[0] + this.m[4] * other.m[1] + this.m[8] * other.m[2] + this.m[12] * other.m[3]
    const a01 = this.m[1] * other.m[0] + this.m[5] * other.m[1] + this.m[9] * other.m[2] + this.m[13] * other.m[3]
    const a02 = this.m[2] * other.m[0] + this.m[6] * other.m[1] + this.m[10] * other.m[2] + this.m[14] * other.m[3]
    const a03 = this.m[3] * other.m[0] + this.m[7] * other.m[1] + this.m[11] * other.m[2] + this.m[15] * other.m[3]

    const a10 = this.m[0] * other.m[4] + this.m[4] * other.m[5] + this.m[8] * other.m[6] + this.m[12] * other.m[7]
    const a11 = this.m[1] * other.m[4] + this.m[5] * other.m[5] + this.m[9] * other.m[6] + this.m[13] * other.m[7]
    const a12 = this.m[2] * other.m[4] + this.m[6] * other.m[5] + this.m[10] * other.m[6] + this.m[14] * other.m[7]
    const a13 = this.m[3] * other.m[4] + this.m[7] * other.m[5] + this.m[11] * other.m[6] + this.m[15] * other.m[7]

    const a20 = this.m[0] * other.m[8] + this.m[4] * other.m[9] + this.m[8] * other.m[10] + this.m[12] * other.m[11]
    const a21 = this.m[1] * other.m[8] + this.m[5] * other.m[9] + this.m[9] * other.m[10] + this.m[13] * other.m[11]
    const a22 = this.m[2] * other.m[8] + this.m[6] * other.m[9] + this.m[10] * other.m[10] + this.m[14] * other.m[11]
    const a23 = this.m[3] * other.m[8] + this.m[7] * other.m[9] + this.m[11] * other.m[10] + this.m[15] * other.m[11]

    const a30 = this.m[0] * other.m[12] + this.m[4] * other.m[13] + this.m[8] * other.m[14] + this.m[12] * other.m[15]
    const a31 = this.m[1] * other.m[12] + this.m[5] * other.m[13] + this.m[9] * other.m[14] + this.m[13] * other.m[15]
    const a32 = this.m[2] * other.m[12] + this.m[6] * other.m[13] + this.m[10] * other.m[14] + this.m[14] * other.m[15]
    const a33 = this.m[3] * other.m[12] + this.m[7] * other.m[13] + this.m[11] * other.m[14] + this.m[15] * other.m[15]

    this.m[0] = a00
    this.m[1] = a01
    this.m[2] = a02
    this.m[3] = a03

    this.m[4] = a10
    this.m[5] = a11
    this.m[6] = a12
    this.m[7] = a13

    this.m[8] = a20
    this.m[9] = a21
    this.m[10] = a22
    this.m[11] = a23

    this.m[12] = a30
    this.m[13] = a31
    this.m[14] = a32
    this.m[15] = a33

    return this
  }

  public mutTransform3d(vec: Vec3): Readonly<Vec3> {
    const x = this.m[0] * vec.x + this.m[4] * vec.y + this.m[8] * vec.z + this.m[12]
    const y = this.m[1] * vec.x + this.m[5] * vec.y + this.m[9] * vec.z + this.m[13]
    const z = this.m[2] * vec.x + this.m[6] * vec.y + this.m[10] * vec.z + this.m[14]

    vec.x = x
    vec.y = y
    vec.z = z

    return vec
  }

  public mutTransformBatch3d(vectors: Vec3[]): Readonly<Vec3[]> {
    let vec: Vec3
    let x: number
    let y: number
    let z: number
    for (let i = 0; i < vectors.length; ++i) {
      vec = vectors[i]
      x = this.m[0] * vec.x + this.m[4] * vec.y + this.m[8] * vec.z + this.m[12]
      y = this.m[1] * vec.x + this.m[5] * vec.y + this.m[9] * vec.z + this.m[13]
      z = this.m[2] * vec.x + this.m[6] * vec.y + this.m[10] * vec.z + this.m[14]

      vec.x = x
      vec.y = y
      vec.z = z
    }
    return vectors
  }

  public mutTransform4d(vec: Vec4): Readonly<Vec4> {
    const x = this.m[0] * vec.x + this.m[4] * vec.y + this.m[8] * vec.z + this.m[12] * vec.w
    const y = this.m[1] * vec.x + this.m[5] * vec.y + this.m[9] * vec.z + this.m[13] * vec.w
    const z = this.m[2] * vec.x + this.m[6] * vec.y + this.m[10] * vec.z + this.m[14] * vec.w
    const w = this.m[3] * vec.x + this.m[7] * vec.y + this.m[11] * vec.z + this.m[15] * vec.w

    vec.x = x
    vec.y = y
    vec.z = z
    vec.w = w

    return vec
  }

  public mutTransformBatch4d(vectors: Vec4[]): Readonly<Vec4[]> {
    let vec: Vec4
    let x: number
    let y: number
    let z: number
    let w: number

    for (let i = 0; i < vectors.length; ++i) {
      vec = vectors[i]
      x = this.m[0] * vec.x + this.m[4] * vec.y + this.m[8] * vec.z + this.m[12] * vec.w
      y = this.m[1] * vec.x + this.m[5] * vec.y + this.m[9] * vec.z + this.m[13] * vec.w
      z = this.m[2] * vec.x + this.m[6] * vec.y + this.m[10] * vec.z + this.m[14] * vec.w
      w = this.m[3] * vec.x + this.m[7] * vec.y + this.m[11] * vec.z + this.m[15] * vec.w
      vec.x = x
      vec.y = y
      vec.z = z
      vec.w = w
    }
    return vectors
  }

  public toQuaternion(): Readonly<Quaternion> {
    const m00 = this.m[0]
    const m01 = this.m[1]
    const m02 = -this.m[2]
    const m10 = this.m[4]
    const m11 = this.m[5]
    const m12 = -this.m[6]
    const m20 = this.m[8]
    const m21 = this.m[9]
    const m22 = -this.m[10]

    let qx: number
    let qy: number
    let qz: number
    let qw: number

    /*
    console.log(`${m00} ${m01} ${m02}`)
    console.log(`${m10} ${m11} ${m12}`)
    console.log(`${m20} ${m21} ${m22}`)
    */

    if (m22 < 0) {
      if (m00 > m11) {
        const t = 1 + m00 - m11 - m22
        const s = 0.5 / Math.sqrt(t)
        qx = s * t
        qy = s * (m01 + m10)
        qz = s * (m20 + m02)
        qw = s * (m12 - m21)
      } else {
        const t = 1 - m00 + m11 - m22
        const s = 0.5 / Math.sqrt(t)
        qx = s * (m01 + m10)
        qy = s * t
        qz = s * (m12 + m21)
        qw = s * (m20 - m02)
      }
    } else {
      if (m00 < -m11) {
        const t = 1 - m00 - m11 + m22
        const s = 0.5 / Math.sqrt(t)
        qx = s * (m20 + m02)
        qy = s * (m12 + m21)
        qz = s * t
        qw = s * (m01 - m10)
      } else {
        const t = 1 + m00 + m11 + m22
        const s = 0.5 / Math.sqrt(t)
        qx = s * (m12 - m21)
        qy = s * (m20 - m02)
        qz = s * (m01 - m10)
        qw = s * t
      }
    }

    return new Quaternion(qx, qy, qz, qw).mutNormalize()
  }

  public toQuaternionOld(): Readonly<Quaternion> {
    const m00 = this.m[0]
    const m01 = this.m[1]
    const m02 = this.m[2]
    const m10 = this.m[4]
    const m11 = this.m[5]
    const m12 = this.m[6]
    const m20 = this.m[8]
    const m21 = this.m[9]
    const m22 = this.m[10]

    const trace = m00 + m11 + m22
    let qw
    let qx
    let qy
    let qz

    if (trace > 0) {
      const s = 0.5 / Math.sqrt(trace + 1.0)
      qw = 0.25 / s
      qx = (m21 - m12) * s
      qy = (m02 - m20) * s
      qz = (m10 - m01) * s
    } else {
      if (m00 > m11 && m00 > m22) {
        const s = 0.5 / Math.sqrt(1.0 + m00 - m11 - m22)
        qw = (m21 - m12) * s
        qx = 0.25 * s
        qy = (m01 + m10) * s
        qz = (m02 + m20) * s
      } else if (m11 > m22) {
        const s = 0.5 / Math.sqrt(1.0 + m11 - m00 - m22)
        qw = (m02 - m20) * s
        qx = (m01 + m10) * s
        qy = 0.25 * s
        qz = (m12 + m21) * s
      } else {
        const s = 0.5 / Math.sqrt(1.0 + m22 - m00 - m11)
        qw = (m10 - m01) * s
        qx = (m02 + m20) * s
        qy = (m12 + m21) * s
        qz = 0.25 * s
      }
    }

    return new Quaternion(qx, qy, qz, qw)
  }

  public getXAxis(): Vec3 {
    return new Vec3(this.m[0], this.m[4], this.m[8])
  }

  public getYAxis(): Vec3 {
    return new Vec3(this.m[1], this.m[5], this.m[9])
  }

  public getZAxis(): Vec3 {
    return new Vec3(this.m[2], this.m[6], this.m[10])
  }

  public mutToIdentity(): Mat4 {
    this.m[0] = 1.0
    this.m[1] = 0.0
    this.m[2] = 0.0
    this.m[3] = 0.0

    this.m[4] = 0.0
    this.m[5] = 1.0
    this.m[6] = 0.0
    this.m[7] = 0.0

    this.m[8] = 0.0
    this.m[9] = 0.0
    this.m[10] = 1.0
    this.m[11] = 0.0

    this.m[12] = 0.0
    this.m[13] = 0.0
    this.m[14] = 0.0
    this.m[15] = 1.0

    return this
  }

  public mutToTranslation(pos: Vec3): Mat4 {
    this.m[0] = 1.0
    this.m[1] = 0.0
    this.m[2] = 0.0
    this.m[3] = 0.0

    this.m[4] = 0.0
    this.m[5] = 1.0
    this.m[6] = 0.0
    this.m[7] = 0.0

    this.m[8] = 0.0
    this.m[9] = 0.0
    this.m[10] = 1.0
    this.m[11] = 0.0

    this.m[12] = pos.x
    this.m[13] = pos.y
    this.m[14] = pos.z
    this.m[15] = 1.0

    return this
  }

  public mutToRotation(axis: Vec3, angle: number): Mat4 {
    const normalizedAxis = axis.normalize()
    const a = (angle / 180) * Math.PI
    const c = Math.cos(a)
    const s = Math.sin(a)
    const onec = 1 - c
    const u = normalizedAxis.x
    const v = normalizedAxis.y
    const w = normalizedAxis.z

    this.m[0] = u * u + (1.0 - u * u) * c
    this.m[1] = u * v * onec - w * s
    this.m[2] = u * w * onec + v * s
    this.m[3] = 0.0

    this.m[4] = u * v * onec + w * s
    this.m[5] = v * v + (1.0 - v * v) * c
    this.m[6] = v * w * onec - u * s
    this.m[7] = 0.0

    this.m[8] = u * w * onec - v * s
    this.m[9] = v * w * onec + u * s
    this.m[10] = w * w + (1.0 - w * w) * c
    this.m[11] = 0.0

    this.m[12] = 0.0
    this.m[13] = 0.0
    this.m[14] = 0.0
    this.m[15] = 1.0

    return this
  }

  public mutToReflection(pos: Vec3, normal: Vec3): Mat4 {
    this.mutToTranslation(pos)

    const back = optVec3Temp1
    back.x = -pos.x
    back.y = -pos.y
    back.z = -pos.z
    const translateBack = optMat4Temp1.mutToTranslation(back)
    const n = optVec3Temp1
    n.x = normal.x
    n.y = normal.y
    n.z = normal.z
    n.mutNormalize()

    const reflection = optMat4Temp2
    reflection.m[0] = 1.0 - 2.0 * n.x * n.x
    reflection.m[1] = -2.0 * n.x * n.y
    reflection.m[2] = -2.0 * n.x * n.z
    reflection.m[3] = 0.0

    reflection.m[4] = -2.0 * n.x * n.y
    reflection.m[5] = 1.0 - 2.0 * n.y * n.y
    reflection.m[6] = -2.0 * n.y * n.z
    reflection.m[7] = 0.0

    reflection.m[8] = -2.0 * n.x * n.z
    reflection.m[9] = -2.0 * n.y * n.z
    reflection.m[10] = 1.0 - 2.0 * n.z * n.z
    reflection.m[11] = 0.0

    reflection.m[12] = 0.0
    reflection.m[13] = 0.0
    reflection.m[14] = 0.0
    reflection.m[15] = 1.0

    return this.mutMul(reflection).mutMul(translateBack)
  }

  public mutToScale(s: number, t: number, u: number): Readonly<Mat4> {
    this.m[0] = s
    this.m[1] = 0.0
    this.m[2] = 0.0
    this.m[3] = 0.0

    this.m[4] = 0.0
    this.m[5] = t
    this.m[6] = 0.0
    this.m[7] = 0.0

    this.m[8] = 0.0
    this.m[9] = 0.0
    this.m[10] = u
    this.m[11] = 0.0

    this.m[12] = 0.0
    this.m[13] = 0.0
    this.m[14] = 0.0
    this.m[15] = 1.0

    return this
  }

  public mutToOrtho(
    left: number,
    right: number,
    top: number,
    bottom: number,
    near: number,
    far: number
  ): Readonly<Mat4> {
    this.m[0] = 2.0 / (right - left)
    this.m[1] = 0.0
    this.m[2] = 0.0
    this.m[3] = 0.0

    this.m[4] = 0.0
    this.m[5] = 2.0 / (top - bottom)
    this.m[6] = 0.0
    this.m[7] = 0.0

    this.m[8] = 0.0
    this.m[9] = 0.0
    this.m[10] = 2.0 / (far - near)
    this.m[11] = 0.0

    this.m[12] = (right + left) / (right - left)
    this.m[13] = (top + bottom) / (top - bottom)
    this.m[14] = near / (far - near)
    this.m[15] = 1.0

    return this
  }

  public mutToFrustum(
    left: number,
    right: number,
    top: number,
    bottom: number,
    near: number,
    far: number
  ): Readonly<Mat4> {
    this.m[0] = (2.0 * near) / (right - left)
    this.m[1] = 0.0
    this.m[2] = 0.0
    this.m[3] = 0.0

    this.m[4] = 0.0
    this.m[5] = (2.0 * near) / (top - bottom)
    this.m[6] = 0.0
    this.m[7] = 0.0

    this.m[8] = (right + left) / (right - left)
    this.m[9] = (top + bottom) / (top - bottom)
    this.m[10] = far / (far - near)
    this.m[11] = -1.0

    this.m[12] = 0.0
    this.m[13] = 0.0
    this.m[14] = -(far * near) / (far - near)
    this.m[15] = 0.0

    return this
  }

  public toMutPerspective(fovy: number, ratio: number, near: number, far: number): Readonly<Mat4> {
    const tanHalfFovy = Math.tan((fovy / 720.0) * Math.PI)

    this.m[0] = 1.0 / (ratio * tanHalfFovy)
    this.m[1] = 0.0
    this.m[2] = 0.0
    this.m[3] = 0.0

    this.m[4] = 0.0
    this.m[5] = 1.0 / tanHalfFovy
    this.m[6] = 0.0
    this.m[7] = 0.0

    this.m[8] = 0.0
    this.m[9] = 0.0
    this.m[10] = far / (near - far)
    this.m[11] = -1.0

    this.m[12] = 0.0
    this.m[13] = 0.0
    this.m[14] = -(far * near) / (far - near)
    this.m[15] = 0.0

    return this
  }

  public mutToLookAt(from: Vec3, to: Vec3, up: Vec3): Mat4 {
    const f = optVec3Temp1
    f.x = to.x
    f.y = to.y
    f.z = to.z
    f.mutSub(from).mutNormalize()

    const s = optVec3Temp2
    s.x = f.x
    s.y = f.y
    s.z = f.z
    s.mutCross(up).mutNormalize()

    const u = optVec3Temp3
    u.x = s.x
    u.y = s.y
    u.z = s.z
    u.mutCross(f).mutNormalize()

    this.m[0] = s.x
    this.m[1] = u.x
    this.m[2] = f.x
    this.m[3] = 0.0

    this.m[4] = s.y
    this.m[5] = u.y
    this.m[6] = f.y
    this.m[7] = 0.0

    this.m[8] = s.z
    this.m[9] = u.z
    this.m[10] = f.z
    this.m[11] = 0.0

    this.m[12] = -s.dot(from)
    this.m[13] = -u.dot(from)
    this.m[14] = -f.dot(from)
    this.m[15] = 1.0

    return this
  }
}

const IDENTITY = Object.freeze(new Mat4())
const NULL = Object.freeze(new Mat4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0))

optMat4Temp1 = new Mat4()
optMat4Temp2 = new Mat4()
optVec3Temp1 = new Vec3()
optVec3Temp2 = new Vec3()
optVec3Temp3 = new Vec3()
