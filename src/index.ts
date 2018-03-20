const greaterOrEqualThan: CompareFunction = (a, b) => a >= b;

const greaterThan: CompareFunction = (a, b) => a > b;

const lessOrEqualThan: CompareFunction = (a, b) => a <= b;

const lessThan: CompareFunction = (a, b) => a < b;

type CompareFunction = (a: number, b: number) => boolean;

export class MathInterval {
  public static open(lower: number, upper: number): MathInterval {
    return MathInterval.interval(lower, false, upper, false);
  }

  public static closed(lower: number, upper: number): MathInterval {
    return MathInterval.interval(lower, true, upper, true);
  }

  public static closedOpen(lower: number, upper: number): MathInterval {
    return MathInterval.interval(lower, true, upper, false);
  }

  public static openClosed(lower: number, upper: number): MathInterval {
    return MathInterval.interval(lower, false, upper, true);
  }

  public static greaterThan(lower: number): MathInterval {
    return MathInterval.interval(lower, false, Infinity, false);
  }

  public static atLeast(lower: number): MathInterval {
    return MathInterval.interval(lower, true, Infinity, false);
  }

  public static lessThan(upper: number): MathInterval {
    return MathInterval.interval(-Infinity, false, upper, false);
  }

  public static atMost(upper: number): MathInterval {
    return MathInterval.interval(-Infinity, false, upper, true);
  }

  public static all(): MathInterval {
    return MathInterval.interval(-Infinity, false, Infinity, false);
  }

  public static interval(lower: number, lowerClosed: boolean, upper: number, upperClosed: boolean): MathInterval {
    return new MathInterval(lower, lowerClosed, upper, upperClosed);
  }

  private readonly lower: number;
  private readonly lowerClosed: boolean;
  private readonly compareLower: CompareFunction;
  private readonly upper: number;
  private readonly upperClosed: boolean;
  private readonly compareUpper: CompareFunction;
  private readonly intervalString: string;

  private constructor(lower: number, lowerClosed: boolean, upper: number, upperClosed: boolean) {
    this.validate(lower, lowerClosed, upper, upperClosed);

    this.lower = lower;
    this.lowerClosed = lowerClosed;
    this.compareLower = lowerClosed ? greaterOrEqualThan : greaterThan;
    this.upper = upper;
    this.upperClosed = upperClosed;
    this.compareUpper = upperClosed ? lessOrEqualThan : lessThan;
    this.intervalString = this.getIntervalString();
  }

  private validate(lower: number, lowerOpen: boolean, upper: number, upperOpen: boolean): void {
    if (lower === upper && !(lowerOpen && upperOpen)) {
      throw new Error('upper endpoint can be equal to lower endpoint only if both bounds are open');
    }
  }

  private getIntervalString(): string {
    const lowerSymbol = this.lowerClosed ? '[' : '(';
    const upperSymbol = this.upperClosed ? ']' : ')';
    const lowerNumber = this.lower === -Infinity ? '-∞' : this.lower;
    const upperNumber = this.upper === Infinity ? '+∞' : this.upper;
    return `${lowerSymbol}${lowerNumber}, ${upperNumber}${upperSymbol}`;
  }

  public lowerEndpoint(): number {
    return this.lower;
  }

  public upperEndpoint(): number {
    return this.upper;
  }

  public isLowerBoundOpen(): boolean {
    return this.lowerClosed;
  }

  public isUpperBoundOpen(): boolean {
    return this.upperClosed;
  }

  public contains(n: number): boolean {
    // TODO: use curried so that this.lower and this.upper is not passed every time
    return this.compareLower(n, this.lower) && this.compareUpper(n, this.upper);
  }

  public containsAll(numbers: number[]): boolean {
    return !numbers.some((n) => !this.contains(n));
  }

  public toString(): string {
    return this.intervalString;
  }
}
