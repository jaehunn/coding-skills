const log = console.log;

// Base Url = https://www.acmicpc.net/problem/[number]

// 2920 음계
{
  function solve(items) {
    let asc = (desc = true);

    for (let i = 1; i < items.length; i += 1) {
      if (items[i] > items[i - 1]) desc = false;
      else if (items[i] < items[i - 1]) asc = false;
    }

    return desc ? "desc" : asc ? "asc" : "mixed";
  }
}

// 2798 블랙잭
{
  function solve(items, target) {
    let result = 0;
    for (let i = 0; i < items.length; i += 1) {
      for (let j = i + 1; j < items.length; j += 1) {
        for (let k = j + 1; k < items.length; k += 1) {
          let sum = items[i] + items[j] + items[k];

          if (sum <= target) result = Math.max(result, sum);
        }
      }
    }

    return result;
  }
}

// 1874 스택 수열
{
  function solve(items) {
    let stack = [];
    let result = "";
    for (let i = 0, c = 1; i < items.length; i += 1) {
      const target = items[i];

      while (c <= target) {
        stack.push(c);

        c += 1;

        result += "+";
      }

      if (stack[stack.length - 1] === target) {
        stack.pop();

        result += "-";
      } else return -1;
    }

    return result;
  }
}

// 1966 프린터 큐
{
  function solve(items, pos) {
    let queue = [];
    items.forEach((v, i) => queue.push([v, i + 1]));

    let cnt = 0;
    while (queue.length) {
      const [max] = queue.sort((a, b) => b[0] - a[0])[0];

      if (queue[0][0] === max) {
        cnt += 1;

        if (queue[0][1] === pos) return cnt;
        else queue.shift();
      } else queue.push(queue.shift());
    }

    return -1;
  }
}

// 5397 키로거
{
  function solve(str) {
    const items = Array.from(str);

    const leftItems = [];
    const rightItems = [];
    items.forEach((v) => {
      if (v === "-" && leftItems.length) leftItems.pop();
      else if (v === "<") {
        if (leftItems.length) rightItems.unshift(leftItems.pop());
      } else if (v === ">") {
        if (rightItems.length) leftItems.push(rightItems.shift());
      } else leftItems.push(v);
    });

    return leftItems.concat(rightItems);
  }
}

// 1920 수 찾기
{
  // assume, sorted items
  function solve(items, target) {
    let s = 0;
    let e = items.length - 1;

    while (s <= e) {
      const m = ((e + s) / 2) << 0;

      if (items[m] === target) return m;
      if (items[m] < target) s = m + 1;
      else e = m - 1;
    }

    return -1;
  }

  console.log(solve([1, 2, 3, 4, 5], 4));
}

// 4195 친구 네트워크 - 유니온 파인드
{
  let set = {};
  let cnt = {};
  function solve(str1, str2) {
    // init
    if (!set[str1]) {
      set[str1] = str1;
      cnt[str1] = 1;
    }

    if (!set[str2]) {
      set[str2] = str2;
      cnt[str2] = 1;
    }

    union(str1, str2);
  }

  // set: str1 <- str2
  function union(str1, str2) {
    str1 = find(str1);
    str2 = find(str2);

    // 2. 집합, 카운트 업데이트 이슈
    if (str1 !== str2) {
      set[str2] = set[str1];

      cnt[str1] += cnt[str2]; // set root
    }

    function find(str) {
      if (str === set[str]) return str;

      let root = find(set[str]);
      set[str] = root;

      return root;
    }
  }
}
