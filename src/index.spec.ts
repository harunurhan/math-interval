import { MathInterval } from './index';

describe('MathInterval', () => {
  describe('interval & endpoints & bound types', () => {
    const interval = MathInterval.interval(0, true, 100, false);

    it('should set lower endpoint', () => {
      expect(interval.lowerEndpoint()).toBe(0);
    });

    it('should set upper endpoint', () => {
      expect(interval.upperEndpoint()).toBe(100);
    });

    it('should set lower bound type', () => {
      expect(interval.isLowerBoundOpen()).toBe(true);
    });

    it('should set upper bound type', () => {
      expect(interval.isUpperBoundOpen()).toBe(false);
    });

    describe('containsAll', () => () => {
      it('should contain all if all numbers are within interval', () => {
        expect(interval.containsAll([0, 20, 30, 40]));
      });

      it('should not contain all unless all numbers are within interval', () => {
        expect(interval.containsAll([0, 20, 30, 100]));
      });
    });
  });

  describe('validation', () => {
    it('should throw error if lower equals to upper endpoint and both bounds are not open', () => {
      expect(() => MathInterval.interval(100, true, 100, false)).toThrowError();
    });

    it('should not throw error if lower equals to upper endpoint but both bounds are open', () => {
      expect(() => MathInterval.interval(100, true, 100, true)).not.toThrowError();
    });
  });

  describe('open', () => {
    const interval = MathInterval.open(0, 100);

    it('should set lower endpoint', () => {
      expect(interval.lowerEndpoint()).toBe(0);
    });

    it('should set upper endpoint', () => {
      expect(interval.upperEndpoint()).toBe(100);
    });

    it('should not contain less than lower endpoint', () => {
      expect(interval.contains(-1)).toBe(false);
    });

    it('should not contain greater than upper endpoint', () => {
      expect(interval.contains(101)).toBe(false);
    });

    it('toString', () => {
      expect(interval.toString()).toBe('[0, 100]');
    });
  });

  describe('closed', () => {
    const interval = MathInterval.closed(0, 100);

    it('should not contain lower endpoint', () => {
      expect(interval.contains(0)).toBe(false);
    });

    it('should not contain upper endpoint', () => {
      expect(interval.contains(100)).toBe(false);
    });

    it('should contain middle', () => {
      expect(interval.contains(50)).toBe(true);
    });

    it('should not contain less than lower endpoint', () => {
      expect(interval.contains(-1)).toBe(false);
    });

    it('should not contain greater than upper endpoint', () => {
      expect(interval.contains(101)).toBe(false);
    });

    it('toString', () => {
      expect(interval.toString()).toBe('(0, 100)');
    });
  });

  describe('closedOpen', () => {
    const interval = MathInterval.closedOpen(0, 100);

    it('should not contain lower endpoint', () => {
      expect(interval.contains(0)).toBe(false);
    });

    it('should contain upper endpoint', () => {
      expect(interval.contains(100)).toBe(true);
    });

    it('should contain middle', () => {
      expect(interval.contains(50)).toBe(true);
    });

    it('should not contain less than lower endpoint', () => {
      expect(interval.contains(-1)).toBe(false);
    });

    it('should not contain greater than upper endpoint', () => {
      expect(interval.contains(101)).toBe(false);
    });

    it('toString', () => {
      expect(interval.toString()).toBe('(0, 100]');
    });
  });

  describe('openClosed', () => {
    const interval = MathInterval.openClosed(0, 100);

    it('should contain lower endpoint', () => {
      expect(interval.contains(0)).toBe(true);
    });

    it('should not contain upper endpoint', () => {
      expect(interval.contains(100)).toBe(false);
    });

    it('should contain middle', () => {
      expect(interval.contains(50)).toBe(true);
    });

    it('should not contain less than lower endpoint', () => {
      expect(interval.contains(-1)).toBe(false);
    });

    it('should not contain greater than upper endpoint', () => {
      expect(interval.contains(101)).toBe(false);
    });

    it('toString', () => {
      expect(interval.toString()).toBe('[0, 100)');
    });
  });

  describe('greaterThan', () => {
    const interval = MathInterval.greaterThan(100);

    it('should not contain less than limit', () => {
      expect(interval.contains(99)).toBe(false);
    });

    it('should not contain limit', () => {
      expect(interval.contains(100)).toBe(false);
    });

    it('should contain greater than limit', () => {
      expect(interval.contains(101)).toBe(true);
    });

    it('toString', () => {
      expect(interval.toString()).toBe('(100, +∞)');
    });
  });

  describe('atLeast', () => {
    const interval = MathInterval.atLeast(100);

    it('should not contain less than limit', () => {
      expect(interval.contains(99)).toBe(false);
    });

    it('should contain limit', () => {
      expect(interval.contains(100)).toBe(true);
    });

    it('should contain greater than limit', () => {
      expect(interval.contains(101)).toBe(true);
    });

    it('toString', () => {
      expect(interval.toString()).toBe('[100, +∞)');
    });
  });

  describe('lessThan', () => {
    const interval = MathInterval.lessThan(100);

    it('should contain less than limit', () => {
      expect(interval.contains(99)).toBe(true);
    });

    it('should not contain limit', () => {
      expect(interval.contains(100)).toBe(false);
    });

    it('should not contain greater than limit', () => {
      expect(interval.contains(101)).toBe(false);
    });

    it('toString', () => {
      expect(interval.toString()).toBe('(-∞, 100)');
    });
  });

  describe('atMost', () => {
    const interval = MathInterval.atMost(100);

    it('should contain less than limit', () => {
      expect(interval.contains(99)).toBe(true);
    });

    it('should contain limit', () => {
      expect(interval.contains(100)).toBe(true);
    });

    it('should not contain greater than limit', () => {
      expect(interval.contains(101)).toBe(false);
    });

    it('toString', () => {
      expect(interval.toString()).toBe('(-∞, 100]');
    });
  });

  describe('all', () => {
    const interval = MathInterval.all();

    it('should not contain Infinity', () => {
      expect(interval.contains(Infinity)).toBe(false);
    });

    it('should not contain -Inifinity', () => {
      expect(interval.contains(-Infinity)).toBe(false);
    });

    it('should contain 0', () => {
      expect(interval.contains(0)).toBe(true);
    });

    it('toString', () => {
      expect(interval.toString()).toBe('(-∞, +∞)');
    });
  });
});
