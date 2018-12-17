
// medium
export const createMemoize = () => {
  const cache = {};
  return (key, func) => {
    let res;
    if (cache.hasOwnProperty(key)) {
      res = cache[key];
    } else {
      res = cache[key] = func(key);
    }
    return res;
  }
};

export function fib2(n, memoize) {
  let res = 0;
  if (n > 0) {
    if (n > 2) {
      res = memoize(n, () => fib2(n - 1, memoize) + fib2(n - 2, memoize));
    } else {
      res = memoize(1, () => 1);
    }
  }
  return res;
}

export function isBalanced2(str) {
  const openTypes = ['{', '[', '<', '('];
  const closeTypes = ['}', ']', '>', ')'];
  const sequence = [];

  for (let i = 0; i < str.length; i++) {
    let index = openTypes.indexOf(str[i]);
    if (index >= 0) {
      sequence.push(index);
    } else {
      index = closeTypes.indexOf(str[i]);
      if (index >= 0) {
        if (sequence.length && index === sequence[sequence.length - 1]) {
          sequence.pop();
        } else {
          break;
        }
      }
    }
  }
  return sequence.length === 0;
}

export function intersection(a, b) {
  let res = [];
  b.forEach(v1 => {
    for (let i = 0; i < a.length; i++) {
      if (v1 === a[i]) {
        res.push(v1);
        break;
      }
    }
  });
  return res;
}

export function mergeSort(a) {
  let groups = a.map(v => [v]);
  const EMPTY = Symbol('empty');
  while (groups.length > 1) {
    let newGroups = [];
    while (groups.length > 1) {
      const merged = [];
      const group1 = groups.pop();
      const group2 = groups.pop();
      while (group1.length + group2.length) {
        let v1 = group1.length ? group1[0] : EMPTY;
        let v2 = group2.length ? group2[0] : EMPTY;
        if (v2 !== EMPTY && (v1 === EMPTY || v2 < v1)) {
          merged.push(group2.shift());
        } else {
          merged.push(group1.shift());
        }
      }
      newGroups.push(merged);
    }
    // if one left
    groups = newGroups.concat(groups);
  }

  return groups.length ? groups[0] : groups;
}

export function includes(a, n) {
  // return a.indexOf(n) >= 0; // hack :)
  let start = 0;
  let end = a.length - 1;
  let res = false;
  while (start !== end) {
    let center = start + Math.round((end - start) / 2);
    if (a[center] === n) {
      res = true;
      break;
    } else if (a[center] < n) {
      if (start === center) break;
      start = center;
    } else {
      if (end === center) break;
      end = center;
    }
  }
  return res;
}

export function assignDeep(a, b) {
  for (let key in b) {
    if (b.hasOwnProperty(key)) {
      let value = b[key];
      if (typeof b[key] === 'object' && typeof a[key] === 'object') {
        assignDeep(a[key], b[key]);
      } else {
        a[key] = value;
      }
    }
  }
  return a;
}

export function reduceAsync(a, f, s) {
  return new Promise(resolve => {
    Promise.all(a.map(v => v()))
      .then(a => {
        a.forEach(v => s = f(s, v));
        resolve(s);
      });
  })
}

export function seq(a) {
  return new Promise(resolve => {
    // Promise.all(a.map(v => v()))
    //   .then(a => resolve(a));
    // without Promise.all
    let result = [];
    let chain = Promise.resolve();
    a.map(v => v()).forEach(promise => {
      chain = chain
        .then(() => promise)
        .then(value => result.push(value));
    });
    chain.then(() => resolve(result));
  })
}
