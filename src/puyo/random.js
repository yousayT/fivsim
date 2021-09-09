class Random {
  constructor(seed = 10000000) {
    this.x = 12345678;
    this.y = 98765432;
    this.z = 55556666;
    this.w = seed;
  }

  gen() {
    let t;

    t = this.x ^ (this.x << 11);
    this.x = this.y; this.y = this.z; this.z = this.w;
    return this.w = (this.w ^ (this.w >> 19)) ^ (t ^ (t >> 8));
  }

  genInt(min, max) {
    const r = Math.abs(this.gen());
    return min + (r % (max + 1 - min));
  }
}

export default Random
