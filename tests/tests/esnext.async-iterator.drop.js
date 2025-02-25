import { createIterator } from '../helpers/helpers';

QUnit.test('AsyncIterator#drop', assert => {
  assert.expect(15);
  const async = assert.async();
  const { drop } = AsyncIterator.prototype;

  assert.isFunction(drop);
  assert.arity(drop, 1);
  assert.name(drop, 'drop');
  assert.looksNative(drop);
  assert.nonEnumerable(AsyncIterator.prototype, 'drop');

  drop.call(createIterator([1, 2, 3]), 1).toArray().then(it => {
    assert.arrayEqual(it, [2, 3], 'basic functionality');
    return drop.call(createIterator([1, 2, 3]), 1.5).toArray();
  }).then(it => {
    assert.arrayEqual(it, [2, 3], 'float');
    return drop.call(createIterator([1, 2, 3]), 4).toArray();
  }).then(it => {
    assert.arrayEqual(it, [], 'big');
    return drop.call(createIterator([1, 2, 3]), 0).toArray();
  }).then(it => {
    assert.arrayEqual(it, [1, 2, 3], 'zero');
  }).then(() => async());

  assert.throws(() => drop.call(undefined, 1), TypeError);
  assert.throws(() => drop.call(null, 1), TypeError);
  assert.throws(() => drop.call({}, 1), TypeError);
  assert.throws(() => drop.call([], 1), TypeError);
  assert.throws(() => drop.call(createIterator([1, 2, 3]), -1), RangeError, 'negative');
  assert.throws(() => drop.call(createIterator([1, 2, 3]), NaN), RangeError, 'NaN');
});
