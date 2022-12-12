const monkeys = [
  {
    operation: (input: number) => input * 11,
    next: (input: number) => (input % 7 === 0 ? 6 : 2),
    mod: 7,
    items: [63, 57],
    inspected: 0,
  },
  {
    operation: (input: number) => input + 1,
    next: (input: number) => (input % 11 === 0 ? 5 : 0),
    mod: 11,
    items: [82, 66, 87, 78, 77, 92, 83],
    inspected: 0,
  },
  {
    operation: (input: number) => input * 7,
    next: (input: number) => (input % 13 === 0 ? 4 : 3),
    mod: 13,
    items: [97, 53, 53, 85, 58, 54],
    inspected: 0,
  },
  {
    operation: (input: number) => input + 3,
    next: (input: number) => (input % 3 === 0 ? 1 : 7),
    mod: 3,
    items: [50],
    inspected: 0,
  },
  {
    operation: (input: number) => input + 6,
    next: (input: number) => (input % 17 === 0 ? 3 : 7),
    mod: 17,
    items: [64, 69, 52, 65, 73],
    inspected: 0,
  },
  {
    operation: (input: number) => input + 5,
    next: (input: number) => (input % 2 === 0 ? 0 : 6),
    mod: 2,
    items: [57, 91, 65],
    inspected: 0,
  },
  {
    operation: (input: number) => input * input,
    mod: 5,
    next: (input: number) => (input % 5 === 0 ? 2 : 4),
    items: [67, 91, 84, 78, 60, 69, 99, 83],
    inspected: 0,
  },
  {
    operation: (input: number) => input + 7,
    mod: 19,
    next: (input: number) => (input % 19 === 0 ? 5 : 1),
    items: [58, 78, 69, 65],
    inspected: 0,
  },
];

let rounds = 10000;
const multiple = monkeys.reduce((acc, monkey) => acc * monkey.mod, 1);

while (rounds--) {
  monkeys.forEach((monkey) => {
    [...monkey.items].forEach(() => {
      const value = monkey.items.shift() as number;
      const worryLevel = monkey.operation(value);
      const boredLevel = Math.floor(worryLevel % multiple);
      const nextMonkey = monkey.next(boredLevel);

      monkey.inspected++;
      monkeys[nextMonkey].items.push(boredLevel);
    });
  });
}

const result = monkeys.map(({ inspected }) => inspected).sort((a, b) => b - a);

console.log(result[0] * result[1]);
