## Array.of

Array.of 메서드는 인자의 수나 유형에 관계없이 가변 인자를 갖는 새 Array 인스턴스를 만든다.

```javascript
Array.of(1); // [1]
Array.of(1, 2, 3); // [1, 2, 3]
Array.of(undefined); // [undefined]
```

ES5 문법으로 Array.of 를 구현하면 아래와 같다.

```javascript
Array.of = function () {
	return Array.prototype.slice.call(arguments);
};
```

## Array.from

ES2015에서 Array 에 추가된 메소드의 하나다. 인수로 준 배열 같은 객체 나 반복 가능 객체를 배열로 변환하는 메서드다.

`배열 같은 객체 (array-like)` 라고 하는 것은,

- 유사 배열 객체 (length 속성과 인덱싱된 요소를 가진 객체)
- 반복 가능한 객체 (Map과 Set와 같이 객체의 요소를 얻을 수 있는 객체)


사실 배열과 같은 객체를 배열로 변환하는 로직은 아래와 같이 단순하게 작성할 수 있다.

```javascript
function arrayLikeToArray (obj) {
	const length = obj.length;
	const array = [];
	for (let i=0; i<length; i++) {
		array.push(obj[i]);
	}

	return array;
}

var normalString = 'Hello World!';
arrayLikeToArray(normalString);
//["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d", "!"]
```

### surrogate pair 와 Array.from

대부분의 경우에는 위의 로직을 활용해서 배열과 같은 객체를 배열로 변환할 수 있다.

하지만 String 의 length 속성과 obj[0] 와 같은 접근은 surrogate pair 를 고려하지 않기 때문에 아래와 같은 경우 정상적으로 문자열을 배열로 변경할 수 없다.

```javascript
var surrogatepair = '서로게이트페어🌠';

arrayLikeToArray(surrogatepair);
//["서", "로", "게", "이", "트", "페", "어", "�", "�"]

surrogatepair.split('');
//["서", "로", "게", "이", "트", "페", "어", "�", "�"]
```

이를 해결하기 위해 기존에는 정규식 등을 활용하는 복잡한 방법을 사용했지만, Array.from 을 사용하면 간단하게 해결할 수 있다.

```javascript
var surrogatepair = '서로게이트페어🌠';
Array.from(surrogatepair);
//["서", "로", "게", "이", "트", "페", "어", "🌠"]
```

Array.from 은 이런 케이스에서 문자열도 반복 가능 객체로 취급한다. Array.from 은 반복 가능 객체 여부를 시험하고 나서, 그렇지 않은 경우 배열과 같은 객체로 배열로 변환하는 것을 시도한다.

Array.from 에서 반복 가능한 객체라는 것은 for of 에서 반복할 수 있는 객체를 말한다.


## for .. of

ES2015에서 추가된 구문 중 하나로 기존 for .. in 과 비슷하지만 for .. in 이 속성 이름을 반복한다면, for .. of 는 속성값을 반복한다.

for .. of 를 활용해서 앞서 살펴본 배열로 변환하는 메서드를 만들어보면 아래와 같다.

```javascript
function iterableToArray (obj) {
	const array = [];
	for (let v of obj) {
		array.push(v);
	}

	return array;
}

var surrogatepair = '서로게이트페어🌠';

iterableToArray(surrogatepair);
//["서", "로", "게", "이", "트", "페", "어", "🌠"]
```

결과적으로 Array.from 은 문자열을 for .. of 에 전달해서 surrogate pair 를 고려해서 한글자씩 반복하는 구조로 생각할 수 있다.


### Array.from 사용 예제

```javascript
// 배열과 같은 객체(Array-like object)를 배열로 변환
function f() {
	return Array.from(arguments);
}

f(1, 2, 3);
// [1, 2, 3]


// 반복 가능한(iterable) 객체를 배열로 변환

// Set
Array.from(new Set(["foo", window]));
// ["foo", window]

// Map
Array.from(new Map([[1, 2], [2, 4], [4, 8]]));
// [[1, 2], [2, 4], [4, 8]]

// String
Array.from("foo");
// ["f", "o", "o"]

//두번째 인자를 활용하면 배열로 변환된 요소를 가공할 수 있다
Array.from([1, 2, 3], x => x + x);
// [2, 4, 6]


// 순차적인 번호를 가진 배열 생성
Array.from({length: 5}, (v, k) => k);
// [0, 1, 2, 3, 4]
```

`Array.from({length: 5}, (v, k) => k)` 의 경우 앞서 설명한 대로, Array.from 은 먼저 for .. of 로 반복가능한지 확인을 하는데, 단순하게 length 값만 가진 object 이므로 for .. of 를 사용할 수 없다. 따라서 length 값을 가지고 배열로 변환을 시도하게 된다.
이때 key, value 중 key를 값으로 리턴해주었기 때문에 순차적인 번호를 가진 배열이 생성된다.



### Spread 의 응용

Array.from 의 특징과 for .. of 를 설명하기 위해 복잡하게 설명했지만, surrogate pair 케이스를 다루는 가장 쉬운 방법은 Spread 를 활용하는 것이다.

```javascript
var surrogatepair = '서로게이트페어🌠';
[...surrogatepair];
//["서", "로", "게", "이", "트", "페", "어", "🌠"]
```
