## Promise

JavaScript의 세계에서는 거의 대부분의 작업들이 비동기로 이루어진다. 어떤 작업을 요청하면서 콜백 함수를 등록하면, 작업이 수행되고 나서 결과를 나중에 콜백 함수를 통해 알려주는 식이다. 실제 비동기 작업이 아니더라도 JavaScript의 세계에서는 결과를 콜백으로 알려주는 패턴이 매우 흔하게 사용된다.

Promise 패턴을 사용하면 비동기 작업들을 순차적으로 진행하거나, 병렬로 진행하는 등의 컨트럴이 보다 수월해지고 코드의 가독성이 좋아진다. 또 내부적으로 예외처리에 대한 구조가 탄탄하기 때문에 오류가 발생했을 때 오류 처리 등에 대해 보다 가시적으로 관리해줄 수 있는 장점이 있다.


### Promise 의 기본 구조

`Promise` 의 기본 구조는 아래와 같다. 생성자 함수를 사용해서 새로운 `Promise` 를 만들고 파라메터로 `resolve` 와 `reject` 를 갖는 익명 함수를 주입하는 형태이다.

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

[기본 예제](http://jsbin.com/nidado/9/edit?js,console)

위의 예제에서는 비동기 작업을 묘사하기 위해 `setTimeout` 을 사용했다. 이 부분은 Ajax 나 다른 비동기 작업이 위치할 수도 있고 또 동기 작업이 될 수도 있다.
Promise 생성자 함수로 생성된 `Promise` 인스턴스에는 정상적으로 비동기작업이 완료되었을 때 호출하는 `then` 이라는 메서드가 존재한다.

이 `then` 메서드는 두 개의 콜백을 파라메터로 받을 수 있는데, 첫번째 파라메터에는 성공했을 때의 콜백, 두번째 파라메터에는 실패했을 때의 콜백을 등록할 수 있다.
위의 예제에서는 두번째 실패했을 때의 콜백이 생략되었다.

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
var settledPromise = new Promise((resolve, reject) => {

	// 50프로 확률로 resolve
	if (Math.round(Math.random())) {
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

[Promise 의 상태 예제](http://jsbin.com/yonuqo/6/edit?js,console)

50% 의 확률로 `Promise` 는 성공하거나 실패하는데, 한번 성공한 `Promise` 는 다시 실행해도 여전히 같은 값을 가지고 있는 것을 볼 수 있다.
Promise 의 이러한 특성을 활용해서 같은 비동기 작업이 여러번 실행되는 것을 방지할 수 있다. 또 이러한 특성으로 인해 호출 시마다 비동기 작업이 실행되어야 한다면 아래의 예제와 같이 새로운 Promise 를 리턴하는 형태로 사용하게 된다.

[새로운 Promise 를 리턴하는 예제](http://jsbin.com/fajiqi/1/edit?js,console)

```javascript
var newPromise = function () {
	return new Promise((resolve, reject) => {

		// 50프로 확률로 resolve
		if (Math.round(Math.random())) {
			resolve("프로미스 성공!");  
		}
		else {
			reject(Error("프로미스 실패.."));
		}
	});
};

//첫 실행
newPromise()
	.then(result => console.log(result))
	.catch(error => console.error(error.message));

//두번째 실행
newPromise()
	.then(result => console.log(result))
	.catch(error => console.error(error.message));

//세번째 실행
newPromise()
	.then(result => console.log(result))
	.catch(error => console.error(error.message));
```

### catch 메서드

`Promise` 인스턴스에는 `then` 메서드 외에도 `catch` 메서드가 존재하는데, `.then(null, function () { ... })` 와 동일한 기능을 한다고 보면 된다.

```javascript
function getUsername (id) {
	return new Promise((resolve, reject) => {
		//비동기 작업
		setTimeout(() => {
			if (id === 'admin') {
				resolve('홍길동');
			}
			else {
				reject(new Error('존재하지 않는 아이디입니다.'));
			}
		}, 3000);
	});
}

getUsername('test')
	.then(username => console.log(`${username} 님 안녕하세요!'`), error => console.error(error.message));
```

위의 코드는 아래와 완전히 동일하게 동작한다.

```javascript
function getUsername (id) {
	return new Promise((resolve, reject) => {
		//비동기 작업
		setTimeout(() => {
			if (id === 'admin') {
				resolve('홍길동');
			}
			else {
				reject(new Error('존재하지 않는 아이디입니다.'));
			}
		}, 3000);
	});
}

getUsername('test')
	.then(username => console.log(`${username} 님 안녕하세요!'`))
	.catch(error => console.error(error.message));
```

[catch 메서드 예제](http://jsbin.com/hozeqo/4/edit?js,console)


### Promise 체이닝

`Promise` 는 기본적으로 `then` 메서드를 통해서 연결될 수 있다. `then` 메서드에 주입하는 함수의 리턴 값이 다음에 오는 `then` 의 함수에 전달되는 구조이다.

**주의할 점은 여러 개의 파라메터를 전달할 수 없고 오직 하나의 파라메터만 전달 가능하다는 것이다.**

```javascript
function getUsername (id) {
	return new Promise((resolve, reject) => {
		//비동기 작업
		setTimeout(() => {
			if (id === 'admin') {
				resolve('홍길동');
			}
			else {
				reject(new Error('존재하지 않는 아이디입니다.'));
			}
		}, 3000);
	});
}

getUsername('test')
	.then(username => username + '님 안녕하세요!')
	.then(message => console.log(message))
	.catch(error => console.error(error.message));
```

[Promise 체이닝 예제](http://jsbin.com/rudage/edit?js,console)

위의 예제를 살펴보면 첫 번째 `then` 에서는 이름과 메시지를 더해서 `return` 하는 것을 볼 수 있다. `Promise` 는 이렇게 값을 `return` 하면 내부적으로 `Promise` 로 감싸주기 떄문에 바로 `then` 메서드로 체이닝을 할 수 있다.

**체이닝된 상태에서 중간에 에러가 발생할 경우 가까운 `catch` 메서드로 바로 이동하게 된다. 따라서 체이닝된 상태에서 마지막에만 `catch` 가 위치하는 경우 에러 처리의 가시성이 높아지게 된다.**

**또 `Promise` 는 내부적으로 `try/catch` 형태로 구현되어 있기 때문에 예상치 못한 에러에 대응하는 것도 보다 편리하다.**


### Promise.all 메서드

3 개의 비동기 작업이 모두 완료되었을 때에만 다음 작업을 진행하는 상황에서 아래와 같이 코드를 작성한다면 비동기의 장점을 찾을 수 있을까?

```javascript
async1(param1, function (result1) {
	async2(param2, function (result2) {
		async3(param3, function (result3) {
			console.log('작업의 결과는 %s, %s, %s', result1, result2, result3);
		});
	});
});
```

코드의 양은 좀더 많아지겠지만, `Promise` 를 활용하면 비동기의 장점도 살리면서 코드의 가독성도 높일 수 있다.

```javascript
Promise.all([async1(param1), async2(param2), async3(param3)])
	.then(result => console.log('작업의 결과는 %s, %s, %s', result[0], result[1], result[2]));
```

실제 동작하는 예를 살펴보자.

```javascript
function square (num) {
	return new Promise((resolve, reject) => {
		//비동기 작업
		setTimeout(() => resolve(num*num), 3000);
	});
}

function sum (arr) {
	return new Promise((resolve, reject) => {
		resolve(arr.reduce((sum, num) => sum + num, 0));
	});
}


Promise.all([square(5), square(7), square(9)])
	.then(sum)
	.then(result => console.log(result));
```

[Promise.all 예제](http://jsbin.com/kohici/3/edit?js,console)

3 개의 비동기 작업의 결과를 받아서 이들의 합을 구하고 이어서 결과를 출력하는 형태이다. Promise 부분만 보면 전체적으로 어떻게 동작할 지 모두 예측이 가능한 가시성 있는 코드가 쉽게 작성되었다.


### 참고 자료

Promise 와 관련해서 한빛 미디어에서 [무료 ebook](http://www.hanbit.co.kr/store/books/look.php?p_code=E5027975256)을 배포중인데, 이 책의 내용이 상당히 괜찮은 편이어서 이 책을 참고하는 것을 권장한다.
