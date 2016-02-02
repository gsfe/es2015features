## Promise

JavaScript의 세계에서는 거의 대부분의 작업들이 비동기로 이루어진다. 어떤 작업을 요청하면서 콜백 함수를 등록하면, 작업이 수행되고 나서 결과를 나중에 콜백 함수를 통해 알려주는 식이다. 실제 비동기 작업이 아니더라도 JavaScript의 세계에서는 결과를 콜백으로 알려주는 패턴이 매우 흔하게 사용된다.

Promise 패턴을 사용하면 비동기 작업들을 순차적으로 진행하거나, 병렬로 진행하는 등의 컨트럴이 보다 수월해지고 코드의 가독성이 좋아진다. 또 내부적으로 예외처리에 대한 구조가 탄탄하기 때문에 오류가 발생했을 때 오류 처리 등에 대해 보다 가시적으로 관리해줄 수 있는 장점이 있다.


### Promise 의 기본 구조

`Promise` 의 기본 구조는 아래와 같다. 생성자 함수를 사용해서 새로운 `Promise` 를 만들고 파라메터로 `resolve` 와 `reject` 를 갖는 익명 함수를 주입하는 형태이다.

```javascript
function square (num) {
  return new Promise(function (resolve, reject) {
    //비동기 작업
    setTimeout(function () {
      resolve(num*num);
    }, 3000);
  });
}
```

위 기본 예에서는 비동기 작업을 묘사하기 위해 `setTimeout` 을 사용했다. 이 부분은 Ajax 나 다른 비동기 작업이 위치할 수도 있고 또 동기 작업이 될 수도 있다.

```javascript
function square (num) {
  return new Promise((resolve, reject) => {
    //비동기 작업
    setTimeout(() => resolve(num*num), 3000);
  });
}


console.log('비동기 작업 호출');

square(5)
  .then(result => console.log('결과는', result));
```

[기본 예제](http://jsbin.com/nidado/edit?js,console)

Promise 생성자 함수로 생성된 `Promise` 인스턴스에는 정상적으로 비동기작업이 완료되었을 때 호출하는 `then` 이라는 메서드가 존재한다.

이 `then` 메서드는 두 개의 콜백을 파라메터로 받을 수 있는데, 첫번째 파라메터에는 성공했을 때의 콜백, 두번째 파라메터에는 실패했을 때의 콜백을 등록할 수 있다.


### Promise 의 상태

`Promise` 는 아래의 네 가지 상태 중 하나의 상태를 갖게 된다.

- **pending** 아직 약속을 수행 중인 상태(fulfilled 혹은 reject가 되기 전)이다.
- **fulfilled** 약속(promise)이 지켜진 상태이다.
- **rejected** 약속(promise)가 어떤 이유에서 못 지켜진 상태이다.
- **settled** fulfilled 혹은 reject가 된 상태이다.

일단 `new Promise` 로 `Promise` 가 생성되는 직후부터 `resolve` 나 `reject` 가 호출되기 전까지의 순간을 `pending` 상태라고 볼 수 있다.

이후 비동기 작업이 마친뒤 결과물을 약속대로 잘 줄 수 있다면 첫번째 파라메터로 주입되는 `resolve` 함수를 호출하고, 실패했다면 두번째 파라메터로 주입되는 `reject` 함수를 호출하여 `Promise` 의 상태를 결정하게 된다.

**주의 할 점은, `resolve` 든 `reject` 든 한번 실행되어 `Promise` 의 상태가 결정되고 나면 다시 실행해도 `Promise` 는 동일한 결과를 반환한다.**

```javascript
var settledPromise = new Promise(function (resolve, reject) {

	// 50프로 확률로 resolve
	if (Boolean(Date.now() % 2)) {
		resolve("프로미스 성공!");  
	}
	else {
		reject(Error("프로미스 실패.."));
	}
});

//첫 실행
settledPromise
  .then(result => console.log(result))
  .catch(error => console.error(error.message));

//두번째 실행
settledPromise
  .then(result => console.log(result))
  .catch(error => console.error(error.message));

//세번째 실행
settledPromise
  .then(result => console.log(result))
  .catch(error => console.error(error.message));

```

[Promise 의 상태 예제](http://jsbin.com/yonuqo/edit?js,console)

50% 의 확률로 `Promise` 는 성공하거나 실패하는데, 한번 성공한 `Promise` 는 다시 실행해도 여전히 같은 값을 가지고 있는 것을 볼 수 있다.
