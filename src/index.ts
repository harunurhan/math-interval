const  greaterOrEqualThan: CompareFunction = (a, b) => a >= b;

const greaterThan: CompareFunction = (a, b) => a > b;

const lessOrEqualThan: CompareFunction = (a, b) => a <= b;

const lessThan: CompareFunction = (a, b) => a < b;

type CompareFunction = (a: number, b: number) => boolean;

export class MathInterval {
  public static open(left: number, right: number): MathInterval {
    return new MathInterval(left, right, true, true);
  }

  public static closed(left: number, right: number): MathInterval {
    return new MathInterval(left, right);
  }

  public static closedOpen(left: number, right: number): MathInterval {
    return new MathInterval(left, right, false, true);
  }

  public static openClosed(left: number, right: number): MathInterval {
    return new MathInterval(left, right, true);
  }

  public static greaterThan(left: number): MathInterval {
    return new MathInterval(left, Infinity);
  }

  public static atLeast(left: number): MathInterval {
    return new MathInterval(left, Infinity, true);
  }

  public static lessThan(right: number): MathInterval {
    return new MathInterval(-Infinity, right);
  }

  public static atMost(right: number): MathInterval {
    return new MathInterval(-Infinity, right, false, true);
  }

  public static all(): MathInterval {
    return new MathInterval(-Infinity, Infinity, true, true);
  }

  private left: number;
  private compareLeft: CompareFunction;
  private right: number;
  private compareRight: CompareFunction;

  private constructor(left: number, right: number, leftOpen = false, rightOpen = false) {
    // TODO: validate if it is valid math interval
    this.left = left;
    this.compareLeft = leftOpen ? greaterOrEqualThan : greaterThan;
    this.right = right;
    this.compareRight = rightOpen ? lessOrEqualThan : lessThan;
  }

  public contains(n: number): boolean {
    // TODO: use curried so that this.left and this.right is not passed every time
    return this.compareLeft(n, this.left) && this.compareRight(n, this.right);
  }

  // TODO: implement toString()
}
