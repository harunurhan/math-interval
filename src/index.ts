import { Bound } from './bound';

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
    const lowerBound = lowerClosed ? Bound.lowerClosedBound(lower) : Bound.lowerOpenBound(lower);
    const upperBound = upperClosed ? Bound.upperClosedBound(upper) : Bound.upperOpenBound(upper);
    return new MathInterval(lowerBound, upperBound);
  }

  private readonly lowerBound: Bound;
  private readonly upperBound: Bound;
  private readonly intervalString: string;

  private constructor(lowerBound: Bound, upperBound: Bound) {
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;
    this.validate();

    this.intervalString = this.getIntervalString();
  }

  private validate(): void {
    if (this.lowerEndpoint() > this.upperEndpoint()) {
      throw new Error('lower endpoint can not be greater than upper endpoint');
    }

    if (this.lowerEndpoint() === this.upperEndpoint() && !(this.isLowerBoundClosed() && this.isUpperBoundClosed())) {
      throw new Error('upper endpoint can be equal to lower endpoint only if both bounds are closed');
    }
  }

  private getIntervalString(): string {
    const lowerSymbol = this.isLowerBoundClosed() ? '[' : '(';
    const upperSymbol = this.isUpperBoundClosed() ? ']' : ')';
    const lowerEndpoint = this.lowerEndpoint() === -Infinity ? '-∞' : this.lowerEndpoint();
    const upperEndPoint = this.upperEndpoint() === Infinity ? '+∞' : this.upperEndpoint();
    return `${lowerSymbol}${lowerEndpoint}, ${upperEndPoint}${upperSymbol}`;
  }

  public isLowerBoundClosed(): boolean {
    return this.lowerBound.closed;
  }

  public isUpperBoundClosed(): boolean {
    return this.upperBound.closed;
  }

  public lowerEndpoint(): number {
    return this.lowerBound.endpoint;
  }

  public upperEndpoint(): number {
    return this.upperBound.endpoint;
  }

  public containsAll(numbers: number[]): boolean {
    return !numbers.some((n) => !this.contains(n));
  }

  public contains(n: number): boolean {
    return this.lowerBound.test(n) && this.upperBound.test(n);
  }

  public isConnected(other: MathInterval): boolean {
    return this.lowerBound.test(other.upperEndpoint())
      && this.upperBound.test(other.lowerEndpoint());
  }

  public encloses(other: MathInterval): boolean {
    if (this.equals(other)) {
      return true;
    }

    return this.lowerBound.test(other.lowerEndpoint())
      && this.upperBound.test(other.upperEndpoint());
  }

  public equals(other: MathInterval): boolean {
    // TODO: try to move some logic to Bound.equals
    return this.lowerBound.closed === other.lowerBound.closed
      && this.lowerBound.endpoint === other.lowerBound.endpoint
      && this.upperBound.closed === other.upperBound.closed
      && this.upperBound.endpoint === other.upperBound.endpoint;
  }

  public toString(): string {
    return this.intervalString;
  }
}
