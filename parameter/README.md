## Parameter

ES5 에서는 파라메터의 기본값이 없는 경우 기본값을 지정해주기 위한 다양한 구현 방법들이 존재했다. ES2015에서는 기본적으로 이러한 기본값을 지정해줄 수 있는 문법이 존재하고 파라메터를 더 편리하게 다루기 위한 문법들이 추가되었다.

### Default 값 지정하기
아래와 같이 선언해주면, 파라메터에 넘어오는 값이 `undefined` 인 경우 기본값으로 초기화된다.

```javascript
function test (x=10, y=12) {
	console.log(x + y);
}

test(); //22
```


### Rest Operator
`Rest`(나머지) 연산자를 사용하면 세개의 점(...)을 사용해서 여러개의 파라메터를 하나의 배열로 받을 수 있다.
아래의 예를 보면, x 는 정상적으로 받고, x 이후 두번째 파라메터부터는 y 라는 변수에 배열 헝태로 몰아서 받게 된다.

```javascript
function test (x, ...y) {
	// y 는 배열이다
	return x * y.length;
}
test(3, "hello", true, false) === 9 //true
```

이전에는 위와 같이 하려면 아래와 같이 `arguments` 객체를 활용해야 했다.

```javascript
function test () {
	var x = arguments[0];
	var y = [];

	for (var i=1; i < arguments.length; i++) {
		y.push(arguments[i]);
	}

	return x * y.length;
}
```

### Spread Operator
`Rest`와 유사하지만 Rest가 여러개의 파라메터를 하나의 배열에 담는다면, Spread 는 배열에 담긴 값들을 파라메터로 분산해준다.

```javascript
function f (x, y, z) {
	return x + y + z;
}

// 배열에 담긴 값들을 각각 파라메터로 전달한다.
f(...[1,2,3]) === 6 //true
```

전개 연산자를 활용하면 이전에 apply 메서드를 사용했던 부분을 보다 간결하게 표현해줄 수 있다.


```javascript
//ES5에서는 배열 내 숫자들의 최대 값을 찾기 위해서 Math.max에 apply 메소드를 사용했다
Math.max.apply(null, [-1, 100, 9001, -32]); // 9001

//ES2015에서는 전개 연산자를 통해 함수에 파라미터로 배열을 넘길 수 있다
Math.max(...[-1, 100, 9001, -32]); // 9001
```

또 전개 연산자를 활용하면 직관적인 문법을 통해 쉽게 배열 리터럴을 합칠 수도 있다.

```javascript
let cities = ['서울', '부산'];
let places = ['여수', ...cities, '제주']; // ['여수', '서울', '부산', '제주']
```
