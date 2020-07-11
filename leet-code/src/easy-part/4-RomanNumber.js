// @see https://leetcode.com/problems/roman-to-integer/
/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
  if (!s || !s.length) return 0;

  // 해시 생성
  const m = new Map([
    ["I", 1],
    ["V", 5],
    ["X", 10],
    ["L", 50],
    ["C", 100],
    ["D", 500],
    ["M", 1000],
  ]);

  let i = s.length - 1; // 뒤부터 검사하면 올바르게 비교할 수 있다.
  let r = m.get(s[i]); // 초기값

  // 버블 비교, 앞에 있는 값이 크다면 더하고, 작다면 뺀다.
  while (i) {
    const c = m.get(s[i]);
    const p = m.get(s[i - 1]);

    if (p >= c) {
      r += p;
    } else {
      r -= p;
    }

    i -= 1;
  }

  return r;
}

function romanToInt(s) {
  let m = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
    IV: 4,
    IX: 9,
    XL: 40,
    XC: 90,
    CD: 400,
    CM: 900,
  };

  // MCMXCIV
  // MC -> x, += M: 1000 / i: 1
  // CM -> o, += CM: 900 / i: 3
  // XC -> o, += XC: 90 / i: 5
  // IV -> o, += IV: 4 / i: 7
  let r = 0;
  for (let i = 0; i < s.length; i += 1) {
    let c = s[i] + s[i + 1];
    if (m[c]) {
      r += m[c];
      i += 1;

      continue;
    }

    r += m[s[i]];
  }

  return r;
}
