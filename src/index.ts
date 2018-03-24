import { Bound } from './bound';

export class MathInterval {

  /**
   * Returns an interval equivalent to:
   * (a, b) = {x | a < x < b}
   */
  public static open(lower: number, upper: number): MathInterval {
    return MathInterval.interval(lower, false, upper, false);
  }

  /**
   * Returns an interval equivalent to:
   * [a, b] = {x | a <= x <= b}
   */
  public static closed(lower: number, upper: number): MathInterval {
    return MathInterval.interval(lower, true, upper, true);
  }

  /**
   * Returns an interval equivalent to:
   * [a, b) = {x | a <= x < b}
   */
  public static closedOpen(lower: number, upper: number): MathInterval {
    return MathInterval.interval(lower, true, upper, false);
  }

  /**
   * Returns an interval equivalent to:
   * (a, b] = {x | a < x <= b}
   */
  public static openClosed(lower: number, upper: number): MathInterval {
    return MathInterval.interval(lower, false, upper, true);
  }

  /**
   * Returns an interval equivalent to:
   * (a, ∞) = {x | a < x < ∞}
   */
  public static greaterThan(lower: number): MathInterval {
    return MathInterval.interval(lower, false, Infinity, false);
  }

  /**
   * Returns an interval equivalent to:
   * [a, ∞) = {x | a < x < ∞}
   */
  public static atLeast(lower: number): MathInterval {
    return MathInterval.interval(lower, true, Infinity, false);
  }

  /**
   * Returns an interval equivalent to:
   * (-∞, a) = {x | -∞ < x < a}
   */
  public static lessThan(upper: number): MathInterval {
    return MathInterval.interval(-Infinity, false, upper, false);
  }

  /**
   * Returns an interval equivalent to:
   * (-∞, a] = {x | -∞ < x <= a}
   */
  public static atMost(upper: number): MathInterval {
    return MathInterval.interval(-Infinity, false, upper, true);
  }

  /**
   * Returns an interval equivalent to:
   * (-∞, ∞) = {x | -∞ < x < ∞}
   */
  public static all(): MathInterval {
    return MathInterval.interval(-Infinity, false, Infinity, false);
  }

  /**
   * Returns an interval equivalent to:
   * for interval(a, true, b, false) -> [a, b) = {x | a <= x < b}
   */
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
    // TODO: move logic to Bound.toString
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

  /**
   *  Behaves exactly as you might expect
   */
  public contains(n: number): boolean {
    return this.lowerBound.test(n) && this.upperBound.test(n);
  }

  /**
   * Returns true,
   * if there is some interval enclosed by both of these intervals
   */
  public isConnected(other: MathInterval): boolean {
    return this.lowerBound.test(other.upperEndpoint())
      && this.upperBound.test(other.lowerEndpoint());
  }

  /**
   * Returns true,
   * if the bounds of the inner interval do not extend outside the bounds of the outer interval
   */
  public encloses(other: MathInterval): boolean {
    if (this.equals(other)) {
      return true;
    }

    return this.lowerBound.test(other.lowerEndpoint())
      && this.upperBound.test(other.upperEndpoint());
  }

  /**
   * Returns the minimal interval that encloses both this interval and other.
   * If the intervals are both connected, this is their union.
   */
  public span(other: MathInterval): MathInterval {
    const lowerBound = this.lowerBound.compareTo(other.lowerBound) > 0 ?
      this.lowerBound : other.lowerBound;
    const upperBound = this.upperBound.compareTo(other.upperBound) > 0 ?
      this.upperBound : other.upperBound;
    return new MathInterval(lowerBound, upperBound);
  }

  /**
   * Returns the maximal interval enclosed by both this interval and other
   * if they are connect, otherwise throws error
   */
  public intersection(connected: MathInterval): MathInterval {
    // TODO: throw categorized error if intervals are not connected
    const lowerBound = this.lowerBound.compareTo(connected.lowerBound) < 0 ?
      this.lowerBound : connected.lowerBound;
    const upperBound = this.upperBound.compareTo(connected.upperBound) < 0 ?
      this.upperBound : connected.upperBound;
    return new MathInterval(lowerBound, upperBound);
  }

  public equals(other: MathInterval): boolean {
    // TODO: try to move some logic to Bound.equals
    return this.lowerBound.equals(other.lowerBound)
      && this.upperBound.equals(other.upperBound);
  }

  /**
   * Returns string representation of the interval
   * in form of `[a, b)`
   */
  public toString(): string {
    return this.intervalString;
  }
}
