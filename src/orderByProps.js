/**
 * orderByProps
 * -------------
 * Возвращает массив объектов { key, value } — представление свойств объекта `obj`
 * с сортировкой:
 *   1) сначала идут ключи в том порядке, как они перечислены в массиве `order`
 *      (только те ключи, которые действительно присутствуют в объекте),
 *   2) затем все остальные ключи объекта (которые не указаны в `order`)
 *      — в алфавитном порядке.
 *
 * Реализация использует `for...in` для перебора свойств объекта (как требует задание).
 *
 * Параметры:
 * @param {Object} obj - исходный объект (не `null`, не `undefined`).
 * @param {Array<string>} [order=[]] - массив ключей, определяющий приоритетный порядок.
 *
 * Возвращает:
 * @returns {Array<{key: string, value: any}>} - массив пар ключ/значение в нужном порядке.
 *
 * Примеры:
 *  orderByProps({ a:1, b:2, c:3 }, ['b']) => [{key:'b',value:2},{key:'a',value:1},{key:'c',value:3}]
 *
 * Замечания по безопасности:
 * - Не мутирует входной объект.
 * - Игнорирует недоступные в объекте ключи из `order`.
 * - Использует `Object.prototype.hasOwnProperty.call` для корректной проверки собственных свойств.
 *
 * Автор: ваш_ник (или имя)
 */
export default function orderByProps(obj = {}, order = []) {
  // Валидация входных параметров
  if (obj === null || typeof obj !== 'object') {
    throw new TypeError('Первый аргумент должен быть объектом');
  }
  if (!Array.isArray(order)) {
    throw new TypeError('Второй аргумент должен быть массивом (order)');
  }

  const result = [];
  const seen = new Set();

  // 1) Сначала — ключи из order (если они есть в obj), в том же порядке
  for (const key of order) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push({ key, value: obj[key] });
      seen.add(key);
    }
  }

  // 2) Собираем оставшиеся ключи (те, которые не были в order)
  const remainingKeys = [];
  for (const key in obj) {
    // for...in итерирует по перечисляемым собственным и унаследованным свойствам,
    // поэтому дополнительно проверяем hasOwnProperty
    if (Object.prototype.hasOwnProperty.call(obj, key) && !seen.has(key)) {
      remainingKeys.push(key);
    }
  }

  // 3) Сортируем по алфавиту и добавляем в результат
  remainingKeys.sort((a, b) => a.localeCompare(b));

  for (const key of remainingKeys) {
    result.push({ key, value: obj[key] });
  }

  return result;
}
