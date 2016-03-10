## Destructuring

`Destructuring` 은 배열 혹은 객체(깊게 중첩된 것도 포함하여)에서 값을 추출하고 저장하는데에 활용된다.

### Array Destructuring

ES5 에서는 배열에 담긴 값을 각각 다른 변수에 담기 위해서는 아래와 같이 배열 요소를 선택해서 담아주어야 했다.

```javascript
var arr = [1, 2, 3, 4];
var a = arr[0];
var b = arr[1];
var c = arr[2];
var d = arr[3];

console.log(a); // 1
console.log(b); // 2
```

하지만 ES2015 의 `Destructuring` 을 사용하면 아래와 같이 직관적으로 각 요소를 변수에 담을 수 있다.

```javascript
let arr = [1, 2, 3, 4];
let [a, b, c, d] = arr;

console.log(a); // 1
console.log(b); // 2
```

아래와 같이 할당할 값이 없는 경우에도 문제없이 코드가 실행된다. 단 undefined 혹은 null 인 경우 오류가 발생한다.

```javascript
// Fail-soft destructuring
var [a] = [];
a === undefined;//true
```

할당할 값이 없는 경우에 대비해 기본값을 할당해줄 수도 있다.

```javascript
// Fail-soft destructuring with defaults
var [a = 1] = [];
a === 1;//true
```




### Object Destructuring
Object 의 멤버들을 변수에 담는 것 역시, ES5에서는 아래와 같이 하나하나 변수에 할당해주어야 했다.

```javascript
var luke = { occupation: 'jedi', father: 'anakin' };
var occupation = luke.occupation; // 'jedi'
var father = luke.father; // 'anakin'

console.log(occupation); // 'jedi'
console.log(father); // 'anakin'
```

하지만 Object 도 마찬가지로 `Destructuring` 을 사용해서 쉽게 멤버들을 변수에 담을 수 있다.

```javascript
let luke = { occupation: 'jedi', father: 'anakin' };
let { occupation, father } = luke;

console.log(occupation); // 'jedi'
console.log(father); // 'anakin'
```


`Destructuring` 을 가장 많이 사용하게 되는 곳 중 하나는 아래와 같이 모듈에서 일부만 가져올 때이다.

```javascript
//node.js 의 require
const { Loader, main } = require('toolkit/loader');

//ES2015의 import
import { sqrt, round, pi } from './math';
```


### Destructuring 과 Object match

전달 받은 값과 다른 변수명으로 할당하는 것도 가능하고, 전달되는 Object 의 구조에 맞추어서 `Destructuring` 을 활용할 수 있다.
즉, 전달되는 객체 구조에 맞추어서 아래와 같이 변수에 할당해줄 수도 있다.

```javascript
var data = {
	aaa: '홍길동',
	bbb: {
		first: '코딩',
		second: '수영'
	},
	ccc: '소나타'
};

var { aaa: name, bbb: {first: hobby1, second: hobby2}, ccc: car} = data;

console.log(name); //홍길동
console.log(hobby1); //코딩
console.log(hobby2); //수영
console.log(car); //소나타
```


### 복잡한 객체의 이터레이션

복잡한 객체의 이터레이션도 아래와 같이 해줄 수 있다.

```javascript
var people = [
	{
		name: "Mike Smith",
		family: {
			mother: "Jane Smith",
			father: "Harry Smith",
			sister: "Samantha Smith"
		},
		age: 35
	},
	{
		name: "Tom Jones",
		family: {
			mother: "Norah Jones",
			father: "Richard Jones",
			brother: "Howard Jones"
		},
		age: 25
	}
];

for (let {name: n, family: { father: f } } of people) {
	console.log("Name: " + n + ", Father: " + f);
}

//Name: Mike Smith, Father: Harry Smith
//Name: Tom Jones, Father: Richard Jones
```


### Computed object property names 과 Destructuring

아래와 같이 `Computed object property names` 와 `Destructuring` 을 함께 사용할 수도 있다.

```javascript
let key = "z";
let { [key]: foo } = { z: "bar" };

console.log(foo); // "bar"
```


### Named Parameter 와 Destructuring

ES5의 네임드 파라미터를 처리하는 방법 중 하나는 jQuery에서 차용된 options object 패턴을 사용하는 것이다.

```javascript
function setSize(options) {
	var height = options.height || 600;
	var width	= options.width	|| 400;

	console.log(height);
	console.log(width);
}

setSize({height: 10});
//10
//400
```

파라미터에 `Destructuring`을 사용하면 같은 기능을 구현할 수 있다.

```javascript
function setSize({ height=600, width=400}) {
	console.log(height);
	console.log(width);
}

setSize({height: 10});
//10
//400
```

이렇게 사용하는 경우, `setSize({height:10})` 혹은 `setSize('')` 로 호출하면 오류가 나지 않지만, 파라메터로 `undefined` 혹은 `null` 을 전달하게 되면 오류가 발생한다. 즉 `setSize()` 와 같이 파라메터없이 호출하면 오류가 발생하는 것이다.

이런 상황을 막기 위해선 아래와 같이 빈 객체로 Destructuring 을 해주면 파라메터가 없는 경우에도 정상적으로 기본값으로 할당된다.
아무런 파라메터가 없을 때는 기본값으로 {} 를 전달하고 {} 에는 height 와 width 가 없기 때문에 각각 height 와 width 에도 기본값이 할당된다.

```javascript
function setSize({ height=600, width=400} = {}) {
	console.log(height);
	console.log(width);
}

setSize();
//600
//400
```
