import { Counter } from "./counter.js";

describe("Counter", () => {
  describe("initial state", () => {
    it("defaults to zero", () => {
      const c = new Counter();
      expect(c.value).toBe(0);
    });

    it("accepts an initial value", () => {
      const c = new Counter({ value: 5 });
      expect(c.value).toBe(5);
    });
  });

  describe("increment", () => {
    it("increments by step (default 1)", () => {
      const c = new Counter();
      c.increment();
      expect(c.value).toBe(1);
    });

    it("increments by custom step", () => {
      const c = new Counter({ step: 3 });
      c.increment();
      expect(c.value).toBe(3);
    });

    it("does not exceed max", () => {
      const c = new Counter({ value: 9, max: 10 });
      c.increment().increment();
      expect(c.value).toBe(10);
    });

    it("is chainable", () => {
      const c = new Counter();
      c.increment().increment().increment();
      expect(c.value).toBe(3);
    });
  });

  describe("decrement", () => {
    it("decrements by step (default 1)", () => {
      const c = new Counter({ value: 5 });
      c.decrement();
      expect(c.value).toBe(4);
    });

    it("does not go below min", () => {
      const c = new Counter({ value: 1, min: 0 });
      c.decrement().decrement();
      expect(c.value).toBe(0);
    });

    it("allows negative values without min", () => {
      const c = new Counter({ value: 0 });
      c.decrement();
      expect(c.value).toBe(-1);
    });
  });

  describe("reset", () => {
    it("resets to zero", () => {
      const c = new Counter({ value: 42 });
      c.reset();
      expect(c.value).toBe(0);
    });
  });

  describe("setStep", () => {
    it("changes step size", () => {
      const c = new Counter();
      c.setStep(5).increment();
      expect(c.value).toBe(5);
    });

    it("throws on non-positive step", () => {
      const c = new Counter();
      expect(() => c.setStep(0)).toThrow(RangeError);
      expect(() => c.setStep(-1)).toThrow(RangeError);
    });
  });

  describe("toJSON", () => {
    it("serialises state", () => {
      const c = new Counter({ value: 2, step: 2, min: 0, max: 100 });
      expect(c.toJSON()).toEqual({ value: 2, step: 2, min: 0, max: 100 });
    });
  });
});
