export abstract class Bound {
  public static lowerClosedBound(endpoint: number): Bound {
    return new LowerClosedBound(endpoint);
  }

  public static lowerOpenBound(endpoint: number): Bound {
    return new LowerOpenBound(endpoint);
  }

  public static upperClosedBound(endpoint: number): Bound {
    return new UpperClosedBound(endpoint);
  }

  public static upperOpenBound(endpoint: number): Bound {
    return new UpperOpenBound(endpoint);
  }

  public readonly endpoint: number;

  constructor(value: number) {
    this.endpoint = value;
  }

  public equals(other: Bound): boolean {
    return this.endpoint === other.endpoint
      && this.closed === other.closed;
  }

  public abstract test(n: number): boolean;
  public abstract get closed(): boolean;
  public abstract compareTo(other: Bound): number;
}

abstract class LowerBound extends Bound {
  public compareTo(other: LowerBound): number {
    // TODO: throw if not isinsteaceof?
    if (this.endpoint === other.endpoint) {
      return this.closed ? 1 : -1;
    } else {
      return this.endpoint < other.endpoint ? 1 : -1;
    }
  }
}

abstract class UpperBound extends Bound {
  public compareTo(other: UpperBound): number {
    // TODO: throw if not isinsteaceof?
    if (this.endpoint === other.endpoint) {
      return this.closed ? 1 : -1;
    } else {
      return this.endpoint > other.endpoint ? 1 : -1;
    }
  }
}

class LowerClosedBound extends LowerBound {
  public test(n: number): boolean {
    return n >= this.endpoint;
  }

  public get closed(): boolean {
    return true;
  }
}

class LowerOpenBound extends LowerBound {
  public test(n: number): boolean {
    return n > this.endpoint;
  }

  public get closed(): boolean {
    return false;
  }
}

class UpperClosedBound extends UpperBound {
  public test(n: number): boolean {
    return n <= this.endpoint;
  }

  public get closed(): boolean {
    return true;
  }
}

class UpperOpenBound extends UpperBound {
  public test(n: number): boolean {
    return n < this.endpoint;
  }

  public get closed(): boolean {
    return false;
  }
}
