import orderByProps from '../src/orderByProps.js';

describe('orderByProps', () => {
  test('основной сценарий: priority keys + остальные по алфавиту', () => {
    const obj = { name: 'мечник', health: 10, level: 2, attack: 80, defence: 40 };
    const result = orderByProps(obj, ['name', 'level']);

    expect(result).toEqual([
      { key: 'name', value: 'мечник' },
      { key: 'level', value: 2 },
      { key: 'attack', value: 80 },   // alpha: attack
      { key: 'defence', value: 40 },  // alpha: defence
      { key: 'health', value: 10 },   // alpha: health
    ]);
  });

  test('если order содержит ключи, которых нет в объекте — они игнорируются', () => {
    const obj = { b: 2, a: 1 };
    const result = orderByProps(obj, ['z', 'b']); // z не существует, b существует
    expect(result).toEqual([
      { key: 'b', value: 2 },
      { key: 'a', value: 1 },
    ]);
  });

  test('если order пустой — все ключи по алфавиту', () => {
    const obj = { zebra: 1, apple: 2, mango: 3 };
    const result = orderByProps(obj, []);
    expect(result.map(i => i.key)).toEqual(['apple', 'mango', 'zebra']);
  });

  test('если объект пустой — возвращается пустой массив', () => {
    expect(orderByProps({}, ['any'])).toEqual([]);
  });

  test('если order не передан — работает как пустой массив', () => {
    const obj = { b: 2, a: 1 };
    expect(orderByProps(obj)).toEqual([
      { key: 'a', value: 1 },
      { key: 'b', value: 2 },
    ]);
  });

  test('валидирует типы аргументов', () => {
    expect(() => orderByProps(null, [])).toThrow(TypeError);
    expect(() => orderByProps({ a: 1 }, 'not-array')).toThrow(TypeError);
  });
});
