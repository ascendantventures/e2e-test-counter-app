export interface CounterState {
  value: number;
  step: number;
  min: number | null;
  max: number | null;
}

export class Counter {
  private state: CounterState;

  constructor(options: Partial<CounterState> = {}) {
    this.state = {
      value: options.value ?? 0,
      step: options.step ?? 1,
      min: options.min ?? null,
      max: options.max ?? null,
    };
  }

  get value(): number {
    return this.state.value;
  }

  increment(): this {
    const next = this.state.value + this.state.step;
    if (this.state.max !== null && next > this.state.max) return this;
    this.state.value = next;
    return this;
  }

  decrement(): this {
    const next = this.state.value - this.state.step;
    if (this.state.min !== null && next < this.state.min) return this;
    this.state.value = next;
    return this;
  }

  reset(): this {
    this.state.value = 0;
    return this;
  }

  setStep(step: number): this {
    if (step <= 0) throw new RangeError("step must be positive");
    this.state.step = step;
    return this;
  }

  toJSON(): CounterState {
    return { ...this.state };
  }
}
