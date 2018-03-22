import { Bound } from './bound';

describe('Bound', () => {

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
