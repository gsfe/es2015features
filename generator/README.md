## Generator

`Generator` 는 빠져나갔다가 나중에 다시 돌아올 수 있는 함수다. 이때 컨텍스트(지역 변수 영역)는 나가고 다시 들어오는 중에도 그대로 저장되어 있게 된다.

`Generator` 함수는 호출해도 즉시 실행되지 않고 `iterator object` 가 반환된다. `iterator` 의 `next()` 메서드가 호출되면, `generator function` 이 실행되는데, `iterator` 로부터 리턴할 값을 가리키는 첫번째 `yield expression` 까지 실행되거나 또는 다른 `generator function` 에 위임하는 `yield*` 까지 실행되게 된다. `next()` 메서드는 `value` 속성과 `generator`가 마지막 값을 갖는지를 표시할 `done` 속성을 가진 객체를 반환한다.



### Generator 의 기본 구조

`Generator` 의 기본 구조는 아래와 같다.

```javascript
function* test () {
	for (var i=0; i<3; i++) {
		yield i;
	}
}

var genFunc = test();

console.log(genFunc.next());
console.log(genFunc.next());
console.log(genFunc.next());
console.log(genFunc.next());
console.log(genFunc.next());
```

[기본구조](http://jsbin.com/rivaxu/2/edit?js,console)


### yield
앞서 설명한 것처럼 `Generator` 함수를 실행해서 반환된 `iterator`의 `next()` 메서드를 호출하면 선언된 `Generator` 함수의 다음 `yield` 까지 실행된다.
이때 `next()` 메서드에 특정값을 인자로 전달하면 `yield` 구문에서 받은 인자값을 반환해준다. 단, `yield` 에서 멈춘 뒤 다시 실행될 때 `yield` 가 `next()` 메서드에서 받은 값을 반환하기 때문에 첫 `next()` 메서드 호출에서 전달한 값은 어디에서도 참조될 수 없다는 것에 주의해야 한다.  

```javascript
function* test () {
	for (var i=0; i<3; i++) {
		let val = yield i;
		console.log(val); //456, 789 출력
	}
}

var genFunc = test();

console.log(genFunc.next('123')); //처음 전달한 123 값은 참조하지 못한다.
console.log(genFunc.next('456'));
console.log(genFunc.next('789'));
```


### yield*
`yield*` 표현은 다른 generator 또는 반복자 객체에 위임하는데 사용된다.
피연산자를 반복하고 반환되는 값을 또 yield 하게 되며 `yield*` 가 리턴하는 값은 반복자가 종료될 때 반환(`return`)되는 값(value)이다.
**앞서 살펴본 `yield` 와는 달리 `next()` 에서 전달한 값을 반환하지 않고 반복자가 종료될 때 `return` 되는 값만 반환한다.**
`yield*` 표현은 배열, 문자열 또는 arguments 와 같이 다른 반복 가능한 객체도 `yield` 할 수 있다.

```javascript
function* anotherGenerator (i) {
	yield i + 1;
	yield i + 2;
	yield i + 3;
}

function* generator (i) {
  yield i;
  yield* ['홍길동', '이순신'];
  yield* anotherGenerator(i);
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 홍길동
console.log(gen.next().value); // 이순신
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
```

[yield* 예제](http://jsbin.com/yuyote/2/edit?js,console)


`yield*` 는 구문이 아닌 표현이기 때문에 값으로 평가되며 `yield*` 표현 자체의 값은 반복자가 종료될 때(done -> true) 반환되는 값이다.


```javascript
function* g4() {
  yield* [1, 2, 3];
  return "foo";
}

var result;

function* g5() {
  result = yield* g4();
}

var iterator = g5();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
//g4() 는 여기서 { value: "foo", done: true }를 반환한다!!

console.log(result); // foo
```
[yield*의 결과값 예제](http://jsbin.com/logerak/2/edit?js,console)

위 예제와 달리 특별히 return 을 지정하지 않을 경우 undefined 가 done 상태에서 값으로 리턴되므로 result 에 undefined 들어가게 된다.



### 생성자로 사용될 수 없는 Generator

`Generator` 는 생성자로서 사용될 수 없다.

```javascript
function* f() {}
var obj = new f; // throws "TypeError: f is not a constructor"
```



### 익명 함수로 선언할 수 있는 Generator
`Generator` 를 익명 함수 형태로 선언하는 것은 일반적인 함수와 동일한 방식으로 선언한다.

```javascript
var square = function* (y) {
	yield y * y;
};
```

### Generator 의 응용

`Generator` 와 `Promise` 를 조합하면 비동기 요청의 흐름 제어를 보다 효과적으로 할 수 있다.

```javascript
//임의의 비동기 작업을 시뮬레이션하기 위한 함수
function makeAsync (text, after) {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(text), after);
	});
}

//제네레이터와 프로미스를 활용한 비동기 흐름제어
function async (proc, ...params) {
	//파라메터로 전달받은 Generator 함수의 iterator 생성
	const iterator = proc(...params);

	return new Promise((resolve, reject) => {
		(function asyncFlow (value) {
			//asyncFlow 의 파라메터가 next 메서드로 전달되어 yield의 결과값으로 반환되며,
			//이어서 다음 yield expression 까지 실행되어 yield 된 값을 result로 받는다.
			let result = iterator.next(value);

			//아직 Generator 함수의 실행이 완료되지 않았고, result.value 가 Promise 객체인 경우,
			if (result.value instanceof Promise) {
				//Promise를 실행한 결과를 파라메터로 asyncFlow 함수를 다시 실행
				result.value.then(asyncFlow).catch(reject);
			}
			//Generator 함수의 실행이 완전히 완료되었다면,
			else if (result.done) {
				//최종 결과값을 체인에 전달 (Generator 함수 proc에 return 이 없다면 undefined 가 전달된다)
				resolve(result.value);
			}
			//아직 Generator 함수의 실행이 완료되지 않았고, result(yield 된 값)가 Promise 객체가 아닌경우
			else {
				//결과를 파라메터로 asyncFlow 함수를 다시 실행
				asyncFlow(result.value);
			}
		}) ();
	});
}


async(function* (greeting) {
	let foo = yield makeAsync("foo 홍길동", 300);
	let bar = yield makeAsync("bar 이순신", 200);
	let baz = yield makeAsync("baz 장보고", 100);

	return `${greeting} ${foo} ${bar} ${baz}`;
}, "Hello")
.then(console.log)
.catch(console.error);
```
[Generator 와 Promise 를 활용한 비동기 흐름 제어](http://jsbin.com/qumiva/2/edit?js,console)

위와 같은 방식의 구현체로 가장 유명한 라이브러리는 TJ Holowaychuk이 만든 [co](https://github.com/tj/co) 이다.

모든 비동기 함수를 Promise 로 작성하게 되면 아래와 같이 비동기 요청을 동기적으로 작성할 수 있게 되어 가독성이 높아진다.

```javascript
co(function* () {
	var username = yield coPrompt('username: ');
	var password = yield coPrompt.password('password: ');

	console.log('사용자: ' + username);
	console.log('패스워드: ' + password);
});
```
이러한 비동기 요청에 대한 방식은 ES7의 async/await 으로 이어지게 되고 실제로도 유사한 구조를 갖는다.
(아직 ES7은 확정적이지 않기 때문에 아래의 문법은 달라질 수 있다)

```javascript
async function login () {
	var username = await prompt('username: ');
	var password = await prompt.password('password: ');

	console.log('사용자: ' + username);
	console.log('패스워드: ' + password);
}
```
