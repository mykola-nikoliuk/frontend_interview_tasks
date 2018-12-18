import {
  factorial,
  fib,
  filter,
  indexOf,
  isBalanced,
  isPalindrome,
  isPrime,
  isSorted,
  missing,
  reduce,
  reverse, uniq
} from 'tasks/easy';
import {
  assignDeep,
  createMemoize, fib2,
  includes,
  intersection,
  isBalanced2,
  mergeSort,
  reduceAsync,
  seq
} from 'tasks/medium';
import {debounce, factorial2, LinkedList, longMultiply, permute} from 'tasks/hard';

const chai = require('chai');
const assert = chai.assert;

describe('Tests', function () {
  describe('easy', function () {
    it('isPrime', () => {
      assert.equal(isPrime(0), false);
      assert.equal(isPrime(1), false);
      assert.equal(isPrime(17), true);
      assert.equal(isPrime(10000000000000), false);
    });
    it('factorial', () => {
      assert.equal(factorial(0), 1);
      assert.equal(factorial(1), 1);
      assert.equal(factorial(6), 720);
    });
    it('fib', () => {
      assert.equal(fib(0), 0);
      assert.equal(fib(1), 1);
      assert.equal(fib(10), 55);
      assert.equal(fib(20), 6765);
    });
    it('isSorted', () => {
      assert.equal(isSorted([]), true);
      assert.equal(isSorted([-Infinity, -5, 0, 3, 9]), true);
      assert.equal(isSorted([3, 9, -3, 10]), false);
    });
    it('filter', () => {
      assert.deepEqual(filter([1, 2, 3, 4], n => n < 3), [1, 2]);
    });
    it('reduce', () => {
      assert.equal(reduce([1, 2, 3, 4], (a, b) => a + b, 0), 10);
    });
    it('reverse', () => {
      assert.equal(reverse(''), '');
      assert.equal(reverse('abcdef'), 'fedcba');
    });
    it('indexOf', () => {
      assert.equal(indexOf([1, 2, 3], 1), 0);
      assert.equal(indexOf([1, 2, 3], 4), -1);
    });
    it('isPalindrome', () => {
      assert.equal(isPalindrome(''), true);
      assert.equal(isPalindrome('abcdcba'), true);
      assert.equal(isPalindrome('abcd'), false);
      assert.equal(isPalindrome('A man a plan a canal Panama'), true);
    });
    it('missing', () => {
      assert.equal(missing([]), undefined);
      assert.equal(missing([1, 4, 3]), 2);
      assert.equal(missing([2, 3, 4]), 1);
      assert.equal(missing([5, 1, 4, 2]), 3);
      assert.equal(missing([1, 2, 3, 4]), undefined);
    });
    it('isBalanced', () => {
      assert.equal(isBalanced('}{'), false);
      assert.equal(isBalanced('{{}'), false);
      assert.equal(isBalanced('{}{}'), true);
      assert.equal(isBalanced('foo { bar { baz } boo }'), true);
      assert.equal(isBalanced('foo { bar { baz }'), false);
      assert.equal(isBalanced('foo { bar } }'), false);
      assert.equal(isBalanced('foo { bar } }'), false);
    });
  });

  describe('medium', function () {
    it('memoize', () => {
      const memoize = createMemoize();
      assert.equal(memoize(1, () => 1), 1);
      assert.equal(memoize(1, () => 2), 1);
    });
    it('fib2', () => {
      const memoize = createMemoize();
      assert.equal(fib2(0, memoize), 0);
      assert.equal(fib2(1, memoize), 1);
      assert.equal(fib2(2, memoize), 1);
      assert.equal(fib2(3, memoize), 2);
      assert.equal(fib2(4, memoize), 3);
      assert.equal(fib2(10, memoize), 55);
      assert.equal(fib2(25, memoize), 75025);
      assert.equal(fib2(50, memoize), 12586269025);
    });
    it('isBalanced2', () => {
      assert.equal(isBalanced2('(foo { bar (baz) [boo] })'), true);
      assert.equal(isBalanced2('foo { bar { baz }'), false);
      assert.equal(isBalanced2('foo { (bar [baz] } )'), false);
    });
    it('uniq', () => {
      assert.deepEqual(uniq([]), []);
      assert.deepEqual(uniq([1, 4, 2, 2, 3, 4, 8]), [1, 3, 8]);
    });
    it('intersection', () => {
      assert.deepEqual(intersection([1, 5, 4, 2], [8, 91, 4, 1, 3]), [4, 1]);
      assert.deepEqual(intersection([1, 5, 4, 2], [7, 12]), []);
      assert.deepEqual(intersection([12, 1, 5, 4, 2], [5, 7, 12]), [5, 12]);
    });
    it('mergeSort', () => {
      assert.deepEqual(mergeSort([]), []);
      assert.deepEqual(mergeSort([-4, 1, Infinity, 3, 3, 0]), [-4, 0, 1, 3, 3, Infinity]);
      assert.deepEqual(mergeSort([3, 2, 7, 3, 1]), [1, 2, 3, 3, 7]);
    });
    it('includes', () => {
      assert.equal(includes([1, 3, 8, 10], 8), true);
      assert.equal(includes([1, 3, 8, 8, 15], 15), true);
      // assert.equal(includes([1, 3, 8, 10, 15], 9), false);
    });
    it('assignDeep', () => {
      assert.deepEqual(assignDeep({a: 1}, {}), {a: 1});
      assert.deepEqual(assignDeep({a: 1}, {a: 2}), {a: 2});
      assert.deepEqual(assignDeep({a: 1}, {a: {b: 2}}), {a: {b: 2}});
      assert.deepEqual(assignDeep({a: {b: {c: 1}}}, {a: {b: {d: 2}}, e: 3}), {a: {b: {c: 1, d: 2}}, e: 3});
      assert.deepEqual(assignDeep({a: {b: {c: 1}}}, {a: {b: 2}, e: 3}), {a: {b: 2}, e: 3});
    });
    it('reduceAsync', () => new Promise(resolve => {
      let a = () => Promise.resolve('a');
      let b = () => Promise.resolve('b');
      let c = () => new Promise(resolve => setTimeout(() => resolve('c'), 100));

      reduceAsync([a, b, c], (acc, value) => [...acc, value], [])
        .then(res1 => assert.deepEqual(res1, ['a', 'b', 'c']))
        .then(() => reduceAsync([a, c, b], (acc, value) => [...acc, value], ['d']))
        .then(res2 => assert.deepEqual(res2, ['d', 'a', 'c', 'b']))
        .then(resolve);
    }));
    it('seq', () => new Promise(resolve => {
      let a = () => Promise.resolve('a');
      let b = () => Promise.resolve('b');
      let c = () => Promise.resolve('c');
      let d = () => new Promise(resolve => setTimeout(() => resolve('d'), 100));

      Promise.all([
        seq([a, b, c]).then(res => assert.deepEqual(res, ['a', 'b', 'c'])),
        seq([a, c, b]).then(res => assert.deepEqual(res, ['a', 'c', 'b'])),
        seq([a, d]).then(res => assert.deepEqual(res, ['a', 'd'])),
        seq([d, c, b, a]).then(res => assert.deepEqual(res, ['d', 'c', 'b', 'a']))
      ]).then(resolve);
    }));
  });

  describe('hard', function () {
    it('longMultiply', () => {
      assert.deepEqual(longMultiply([123], [4], 1000), [492]);
      assert.deepEqual(longMultiply([123], [9], 1000), [107, 1]);
      assert.deepEqual(longMultiply([123], [0, 1], 1000), [0, 123]);
      assert.deepEqual(longMultiply([456, 123], [0, 1], 1000), [0, 456, 123]);
      assert.deepEqual(longMultiply([123, 123], [0, 2], 1000), [0, 246, 246]);
      assert.deepEqual(longMultiply([222, 222], [2], 1000), [444, 444]);
      assert.deepEqual(longMultiply([456, 123], [890, 7], 1000), [840, 67, 974]);
    });
    it('factorial2', () => {
      assert.equal(factorial2(0), '1');
      assert.equal(factorial2(1), '1');
      assert.equal(factorial2(2), '2');
      assert.equal(factorial2(100, 10), '93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000');
      assert.equal(factorial2(100, 10000), '93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000');
      assert.equal(factorial2(100, 100000000), '93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000');
    });
    it('permute', () => {
      assert.deepEqual(permute(''), '');
      assert.deepEqual(permute('ab'), ['ab', 'ba']);
      assert.deepEqual(permute('abc'), ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']);
      assert.deepEqual(permute('1234'), ['1234', '1243', '1324', '1342', '1423', '1432', '2134', '2143', '2314', '2341', '2413', '2431', '3124', '3142', '3214', '3241', '3412', '3421', '4123', '4132', '4213', '4231', '4312', '4321']);
    });
    it('debounce', () => new Promise(resolve => {
      const delay = 10;
      let counter = 0;
      let a = (value = 0) => counter += value;
      let b = debounce(a, delay);
      b(1);
      b(2);
      b(4);
      setTimeout(() => {
        assert.equal(counter, 4);
        resolve();
      }, delay);
    }));
    it('LinkedList', () => {
      let list = new LinkedList(1, 2, 3);
      assert.equal(list.add(4), undefined);
      assert.equal(list.add(5), undefined);
      assert.equal(list.has(1), true);
      assert.equal(list.has(4), true);
      assert.equal(list.has(6), false);
    });
  });
});
