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

  public abstract test(n: number): boolean;
  public abstract get closed(): boolean;
}

class LowerClosedBound extends Bound {
  public test(n: number): boolean {
    return n >= this.endpoint;
  }

  public get closed(): boolean {
    return true;
  }
}

class LowerOpenBound extends Bound {
  public test(n: number): boolean {
    return n > this.endpoint;
  }

  public get closed(): boolean {
    return false;
  }
}

class UpperClosedBound extends Bound {
  public test(n: number): boolean {
    return n <= this.endpoint;
  }

  public get closed(): boolean {
    return true;
  }
}

class UpperOpenBound extends Bound {
  public test(n: number): boolean {
    return n < this.endpoint;
  }

  public get closed(): boolean {
    return false;
  }
}
