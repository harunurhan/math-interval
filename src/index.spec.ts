import { MathInterval } from './index';

describe('MathInterval', () => {
  describe('open', () => {
    const interval = MathInterval.open(0, 100);

    it('should contain left endpoint', () => {
      expect(interval.contains(0)).toBe(true);
    });

    it('should contain right endpoint', () => {
      expect(interval.contains(100)).toBe(true);
    });

    it('should contain middle', () => {
      expect(interval.contains(50)).toBe(true);
    });

    it('should not contain less than left endpoint', () => {
      expect(interval.contains(-1)).toBe(false);
    });

    it('should not contain greater than right endpoint', () => {
      expect(interval.contains(101)).toBe(false);
    });
  });

  describe('closed', () => {
    const interval = MathInterval.closed(0, 100);

    it('should not contain left endpoint', () => {
      expect(interval.contains(0)).toBe(false);
    });

    it('should not contain right endpoint', () => {
      expect(interval.contains(100)).toBe(false);
    });

    it('should contain middle', () => {
      expect(interval.contains(50)).toBe(true);
    });

    it('should not contain less than left endpoint', () => {
      expect(interval.contains(-1)).toBe(false);
    });

    it('should not contain greater than right endpoint', () => {
      expect(interval.contains(101)).toBe(false);
    });
  });

  describe('closedOpen', () => {
    const interval = MathInterval.closedOpen(0, 100);

    it('should not contain left endpoint', () => {
      expect(interval.contains(0)).toBe(false);
    });

    it('should contain right endpoint', () => {
      expect(interval.contains(100)).toBe(true);
    });

    it('should contain middle', () => {
      expect(interval.contains(50)).toBe(true);
    });

    it('should not contain less than left endpoint', () => {
      expect(interval.contains(-1)).toBe(false);
    });

    it('should not contain greater than right endpoint', () => {
      expect(interval.contains(101)).toBe(false);
    });
  });

  describe('openClosed', () => {
    const interval = MathInterval.openClosed(0, 100);

    it('should contain left endpoint', () => {
      expect(interval.contains(0)).toBe(true);
    });

    it('should not contain right endpoint', () => {
      expect(interval.contains(100)).toBe(false);
    });

    it('should contain middle', () => {
      expect(interval.contains(50)).toBe(true);
    });

    it('should not contain less than left endpoint', () => {
      expect(interval.contains(-1)).toBe(false);
    });

    it('should not contain greater than right endpoint', () => {
      expect(interval.contains(101)).toBe(false);
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
  });

  describe('all', () => {
    const interval = MathInterval.all();

    it('should contain Infinity', () => {
      expect(interval.contains(Infinity)).toBe(true);
    });

    it('should contain -Inifinity', () => {
      expect(interval.contains(-Infinity)).toBe(true);
    });

    it('should contain 0', () => {
      expect(interval.contains(0)).toBe(true);
    });
  });
});
