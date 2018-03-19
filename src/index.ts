const greaterOrEqualThan: CompareFunction = (a, b) => a >= b;

const greaterThan: CompareFunction = (a, b) => a > b;

const lessOrEqualThan: CompareFunction = (a, b) => a <= b;

const lessThan: CompareFunction = (a, b) => a < b;

type CompareFunction = (a: number, b: number) => boolean;

export class MathInterval {
  public static open(lower: number, upper: number): MathInterval {
    return MathInterval.interval(lower, true, upper, true);
  }

  public static closed(lower: number, upper: number): MathInterval {
    return MathInterval.interval(lower, false, upper, false);
  }

  public static closedOpen(lower: number, upper: number): MathInterval {
    return MathInterval.interval(lower, false, upper, true);
  }

  public static openClosed(lower: number, upper: number): MathInterval {
    return MathInterval.interval(lower, true, upper, false);
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

  public static interval(lower: number, lowerOpen: boolean, upper: number, upperOpen: boolean): MathInterval {
    return new MathInterval(lower, lowerOpen, upper, upperOpen);
  }

  private readonly lower: number;
  private readonly lowerOpen: boolean;
  private readonly compareLower: CompareFunction;
  private readonly upper: number;
  private readonly upperOpen: boolean;
  private readonly compareUpper: CompareFunction;
  private readonly intervalString: string;

  private constructor(lower: number, lowerOpen: boolean, upper: number, upperOpen: boolean) {
    // TODO: validate if it is valid math interval
    this.lower = lower;
    this.lowerOpen = lowerOpen;
    this.compareLower = lowerOpen ? greaterOrEqualThan : greaterThan;
    this.upper = upper;
    this.upperOpen = upperOpen;
    this.compareUpper = upperOpen ? lessOrEqualThan : lessThan;
    this.intervalString = this.getIntervalString();
  }

  private getIntervalString(): string {
    const lowerSymbol = this.lowerOpen ? '[' : '(';
    const upperSymbol = this.upperOpen ? ']' : ')';
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
    return this.lowerOpen;
  }

  public isUpperBoundOpen(): boolean {
    return this.upperOpen;
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
