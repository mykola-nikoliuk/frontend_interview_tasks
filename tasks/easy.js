
// easy
export function isPrime(n) {
  for (let i = 2, s = Math.sqrt(n); i <= s; i++)
    if (n % i === 0) return false;
  return n !== 1 && n !== 0;
}

export function factorial(n) {
  if (n > 1) {
    return factorial(n - 1) * n;
  } else {
    return n < 0 ? null : 1;
  }
}

export function fib(n) {
  let prev = 0;
  let curr = 0;
  if (n > 0) {
    curr = 1;
    while (--n) {
      curr = prev + curr;
      prev = curr - prev;
    }
  }
  return curr;
}

export function isSorted(array) {
  let sorted = true;
  for (let i = 1; i < array.length; i++) {
    if (array[i - 1] > array[i]) {
      sorted = false;
      break;
    }
  }
  return sorted;
}

export function filter(a, f) {
  const result = [];
  a.forEach(v => {
    if (f(v)) result.push(v);
  });
  return result;
}

export function reduce(a, f, s = 0) {
  for (let i = 0; i < a.length; i++) {
    s = f(s, a[i]);
  }
  return s;
}

export function reverse(str) {
  let a = str.split('');
  let l = str.length;
  while (l--) {
    a.push(a.splice(l - 1, 1));
  }
  return a.join('');
}

export function indexOf(a, v) {
  let res = -1;
  for (let i = 0; i < a.length; i++) {
    if (a[i] === v) {
      res = i;
      break;
    }
  }
  return res;
}

export function isPalindrome(str) {
  let a = str.toLowerCase().split(/\s*/);
  let res = true;

  for (let i = 0; i < (a.length / 2 | 0); i++) {
    if (a[i] !== a[a.length - 1 - i]) {
      res = false;
      break;
    }
  }

  return res;
}

export function missing(a) {
  a.sort();
  let res;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== i + 1) {
      res = i + 1;
      break;
    }
  }
  return res;
}

export function uniq(a) {
  let u = [];
  let nu = [];
  a.forEach(v => {
    if (nu.indexOf(v) < 0) {
      const index = u.indexOf(v);
      if (index < 0) {
        u.push(v);
      } else {
        nu.push(u.splice(index, 1));
      }
    }
  });
  return u;
}

export function isBalanced(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    switch (str[i]) {
      case '{':
        count++;
        break;
      case '}':
        count--;
        break;
    }
    if (count < 0) {
      break;
    }
  }
  return count === 0;
}
