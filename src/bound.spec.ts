import { Bound } from './bound';

describe('Bound', () => {
  describe('UpperBound', () => {
    describe('compareTo', () => {
      it('should return < 0 endpoint is smaller than other if bound type is same', () => {
        const a = Bound.upperClosedBound(1);
        const b = Bound.upperClosedBound(2);
        expect(a.compareTo(b)).toBeLessThan(0);
      });

      it('should return < 0 endpoint is closed smaller than other open', () => {
        const a = Bound.upperClosedBound(1);
        const b = Bound.upperOpenBound(2);
        expect(a.compareTo(b)).toBeLessThan(0);
      });

      it('should return < 0 endpoint is open smaller than other closed', () => {
        const a = Bound.upperOpenBound(1);
        const b = Bound.upperClosedBound(2);
        expect(a.compareTo(b)).toBeLessThan(0);
      });

      it('should return > 0 endpoint is greater than other if bound type is same', () => {
        const a = Bound.upperClosedBound(2);
        const b = Bound.upperClosedBound(1);
        expect(a.compareTo(b)).toBeGreaterThan(0);
      });

      it('should return > 0 endpoint is closed greater than other open', () => {
        const a = Bound.upperClosedBound(2);
        const b = Bound.upperOpenBound(1);
        expect(a.compareTo(b)).toBeGreaterThan(0);
      });

      it('should return > 0 endpoint is open greater than other closed', () => {
        const a = Bound.upperOpenBound(2);
        const b = Bound.upperClosedBound(1);
        expect(a.compareTo(b)).toBeGreaterThan(0);
      });

      it('should return > 0 if close and other open with equal endpoints', () => {
        const a = Bound.upperClosedBound(1);
        const b = Bound.upperOpenBound(1);
        expect(a.compareTo(b)).toBeGreaterThan(0);
      });
    });
  });

  describe('LowerBound', () => {
    describe('compareTo', () => {
      it('should return > 0 endpoint is smaller than other if bound type is same', () => {
        const a = Bound.lowerClosedBound(1);
        const b = Bound.lowerClosedBound(2);
        expect(a.compareTo(b)).toBeGreaterThan(0);
      });

      it('should return > 0 endpoint is closed smaller than other open', () => {
        const a = Bound.lowerClosedBound(1);
        const b = Bound.lowerOpenBound(2);
        expect(a.compareTo(b)).toBeGreaterThan(0);
      });

      it('should return > 0 endpoint is open smaller than other closed', () => {
        const a = Bound.lowerOpenBound(1);
        const b = Bound.lowerClosedBound(2);
        expect(a.compareTo(b)).toBeGreaterThan(0);
      });

      it('should return < 0 endpoint is greater than other if bound type is same', () => {
        const a = Bound.lowerClosedBound(2);
        const b = Bound.lowerClosedBound(1);
        expect(a.compareTo(b)).toBeLessThan(0);
      });

      it('should return < 0 endpoint is closed greater than other open', () => {
        const a = Bound.lowerClosedBound(2);
        const b = Bound.lowerOpenBound(1);
        expect(a.compareTo(b)).toBeLessThan(0);
      });

      it('should return < 0 endpoint is open greater than other closed', () => {
        const a = Bound.lowerOpenBound(2);
        const b = Bound.lowerClosedBound(1);
        expect(a.compareTo(b)).toBeLessThan(0);
      });

      it('should return > 0 if close and other open with equal endpoints', () => {
        const a = Bound.lowerClosedBound(1);
        const b = Bound.lowerOpenBound(1);
        expect(a.compareTo(b)).toBeGreaterThan(0);
      });
    });
  });

  describe('equals', () => {
    it('should be equal if bound typess and endpoints are same', () => {
      const a = Bound.lowerClosedBound(50);
      const b = Bound.lowerClosedBound(50);
      expect(a.equals(b)).toBe(true);
    });

    it('should not be equal if bound endpoints are same but types are not', () => {
      const a = Bound.lowerClosedBound(50);
      const b = Bound.lowerOpenBound(50);
      expect(a.equals(b)).toBe(false);
    });

    it('should not be equal if bound types are same but endpoints are not', () => {
      const a = Bound.lowerOpenBound(0);
      const b = Bound.lowerOpenBound(50);
      expect(a.equals(b)).toBe(false);
    });

    it('should not be equal if bound types and endpoints are not same', () => {
      const a = Bound.lowerOpenBound(0);
      const b = Bound.lowerClosedBound(50);
      expect(a.equals(b)).toBe(false);
    });

    it('should be equal if bound types and endpoints are same but one is lower, the other is upper', () => {
      const a = Bound.upperClosedBound(50);
      const b = Bound.lowerClosedBound(50);
      expect(a.equals(b)).toBe(true);
    });
  });

  describe('LowerClosedBound', () => {
    const bound = Bound.lowerClosedBound(50);

    it('should be close', () => {
      expect(bound.closed).toBe(true);
    });

    describe('test', () => {
      it('should return true if equal', () => {
        expect(bound.test(50)).toBe(true);
      });

      it('should return true if greater than', () => {
        expect(bound.test(51)).toBe(true);
      });

      it('should return false if less than', () => {
        expect(bound.test(49)).toBe(false);
      });
    });
  });

  describe('LowerOpenBound', () => {
    const bound = Bound.lowerOpenBound(50);

    it('should be open', () => {
      expect(bound.closed).toBe(false);
    });

    describe('test', () => {
      it('should return false if equal', () => {
        expect(bound.test(50)).toBe(false);
      });

      it('should return true if greater than', () => {
        expect(bound.test(51)).toBe(true);
      });

      it('should return false if less than', () => {
        expect(bound.test(49)).toBe(false);
      });
    });
  });

  describe('UpperClosedBound', () => {
    const bound = Bound.upperClosedBound(50);

    it('should be close', () => {
      expect(bound.closed).toBe(true);
    });

    describe('test', () => {
      it('should return true if equal', () => {
        expect(bound.test(50)).toBe(true);
      });

      it('should return false if greater than', () => {
        expect(bound.test(51)).toBe(false);
      });

      it('should return true if less than', () => {
        expect(bound.test(49)).toBe(true);
      });
    });
  });

  describe('UpperOpenBound', () => {
    const bound = Bound.upperOpenBound(50);

    it('should be open', () => {
      expect(bound.closed).toBe(false);
    });

    describe('test', () => {
      it('should return false if equal', () => {
        expect(bound.test(50)).toBe(false);
      });

      it('should return false if greater than', () => {
        expect(bound.test(51)).toBe(false);
      });

      it('should return true if less than', () => {
        expect(bound.test(49)).toBe(true);
      });
    });
  });
});
