// 1. 미랫값을 캡슐화해 호출부와의 관심사의 분리로 개발자가 추론가능한 코드를 작성할 수 있다.
// 2. 미랫값(성공, 싪패) 에 따라 흐름 제어
{
  function foo() {
    return new Promise((resolve, reject) => {
      // 성공 조건 -> resolve()
      // 실패 조건 -> reject()
    });
  }

  foo().then(
    () => {
      // 성공 처리기
    },
    () => {
      // 싪 ㅐ처리기
    }
  );

  // 프라미스는 성공 또는 실패로 귀결되면, 불변상태를 유지한다. (해당 프라미스 다른 처리기가 귀결값에 영향을 줄 수 없다.)
}

// 3. 프라미스는 데너블이다. 데너블은 then() 메서드를 가진 객체를 통칭한다. 따라서 덕 타이핑 될 수 있다.
{
  if (p !== null && (typeof p === "object" || typeof p === "function") && typeof p.then === "function") {
    // 데너블이다.
  } else {
    // 데너블이아니다.
  }
}

// 4. 프라미스 특징
{
  // (1) then() 에 넘긴 처리기(콜백) 은 항상 비동기적으로 부른다. 따라서 등록된 처리기는 순서대로 실행된다.
  p.then(() => {
    // 1

    p.then(() => {
      // 3
    });
  });

  p.then(function () {
    // 2
  });

  // (2) 프라미스는 성공 아니면 실패로 항상 귀결된다.
  // (3) 프라미스는 최초에 딱 한번 귀결된다. (암시적 귀결값은 undefined 다.)
  // Promise.resolve() 는 프라미스가 아닌 데너블 또는 즉시값을 받으면 구체적인 값의 프라미스를 반환한다. (정규화)

  Promise.resolve(42).then(
    (value) => {
      throw Error();

      // 이부분은 실행되지 않는다.
    },
    (error) => {
      // 이미 프라미스가 42 로 불변 귀결되었다.
    }
  );
}

// 5. 프라미스 연쇄와 에러처리 (WIP)
{
  // then() 을 호출할 때마다 새로운 프라미스를 연쇄할 수 있다.
  // then() 의 성공 처리기의 반환값은 다음 성공 처리기의 인자로 세팅된다.

  Promise.resolve(21)
    .then((value) => {
      return value * 2;
    })
    .then((value) => {
      value; // 42
    });

  // then() 연쇄마다 단계를 비동기적으로 작동하게 만드는 핵심은 Promise 의 resolve() 의 작동 로직이다.
  // Promise.resolve() 는 인자가 프라미스면 즉시 반환하고, 아니면 구체적인 값이 나올 때까지 풀어본다.

  Promise.resolve(21)
    .then((value) => {
      return new Promise((resolve) => {
        resolve(value * 2);
      });
    })
    .then((value) => {
      value; // 42
    });

  // 프라미스로 한번 더 감쌌지만, then() 에서 다시 풀어보므로 값은 여전히 42 다.

  // then() 의 단게는 해당 프라미스의 귀결만 잡는다.
  // then() 에 등록된 처리기가 반환한 새 프라미스는 풀린 상태라고 하며, 다음 then() 의 처리기에서 귀결을 새로 잡을 수 있다.
  // 콜백을 대체하는 프라미스는 대단한 개선이지만, then() 을 통한 연쇄도 적잖은 가독성 문제를 야기한다. 이후 제너레이터에서는 동기적 흐름제어로 이를 보다 개선한다.

  // 프라미스는 귀결 콜백과 버림 콜백을 받아 귀결값을 전달한다.
  // 이 때, Promise.resolve() 로 풀려진 귀결값이 버림 상태 가질 수 있기 때문에(버림 프라미스를 가지는 가짜 프라미스 데너블), 이룸 콜백이 아닌 귀결 콜백이 정확한 용어다.
  // then() 의 이룸 처리기와 버림 처리기는 성공 실패로 명확하게 나뉜다.

  // try-catch 는 동기적으로만 에러를 포착한다 따라서 비동기 작업의 에러를 포착할 수 없다.
  // 특정 then() 에서 발생한 에러는 다음 then() 에서 처리될 수 있으므로, 마지막 then()
  // 특정 then() 에서 발생한 에러는 다음 then() 에서 처리될 수 있으므로, 마지막 then() 에 대한 에러를 포착하려면 끝없이 연쇄해야한다.
  // catch() 는 모든 단계의 에러가 들어온다. 하지만, catch 에서 발생한 에러 또한 처리하기 힘들다.
  // 기본적으로 프라미스는 버려지거나 에러 처리기가 등록되어 있지 않으면 콘솔에 알리도록 되어있다.
  // defer() 는 자동 에러 알림을 꺼 버림 상태를 유지한다.

  foo(42).then(
    function () {
      return Promise.reject("Error").defer();
    },
    function () {
      // 에러를 처리할 수 있다.
      // defer() 는 전역으로 알림이 퍼지지않아 연쇄할 목적으로 프라미스를 단순 반환한다.
      // 따라서, 처리기를 등록하거나, 의도적으로 에러를 미루겠다는 의사(defer()) 를 해야한다.
    }
  );
}

// 6. 프라미스 패턴
{
}
