import { Bound } from './bound';

describe('Bound', () => {
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
