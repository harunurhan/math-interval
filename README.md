## math-interval

### Install

`yarn add math-interval` or `npm install --save math-interval`

### Usage

```typescript
import { MathInterval } from 'math-interval'

const interval = MathInterval.closedOpen(1, 5);
interval.contains(1) // true
interval.contains(3) // true
interval.contains(5) // false

const another = MathInterval.openClosed(4, 10);

interval.isConnectedTo(another) // true;
interval.encloses(another) // false
iterval.span(another) // [1, 10]
iterval.intersection(another) // (4, 5]
```

For more, please check [tests](./src/index.spec.ts) and [docs](https://harunurhan.github.io/math-interval/classes/_index_.mathinterval.html)
