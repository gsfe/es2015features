## Enhanced Object Literals

ES2015에 들어서 Object 선언 방식에 개선이 있었다. 기존의 선언방식을 그대로 사용 가능하며 기존 선언 방식에서 추가된 부분들을 살펴보려고 한다.

### Shorthand property names
기존과 달리 속성을 선언할 때 아래와 같이 짧게 선언해줄 수 있다.

```javascript
let name = '홍길동';
let hobby = '무술';

let hero = {
	name,
	hobby
};
```

위와 같이 선언하는 것은 기존 ES5에서 아래와 같이 선언하는 것과 완전히 동일하다.

```javascript
let name = '홍길동';
let hobby = '무술';

let hero = {
	name: name,
	hobby: hobby
};
```
속성명이 이미 선언되어 있는 변수명과 동일하다면 위와 같이 속성을 선언할 때 짧게 줄여줄 수 있다.


### Method properties
메서드를 선언할 때도 `속성명: 메서드 선언`의 형태로 작성할 필요 없이 아래와 같이 바로 메서드 선언이 가능하다.

```javascript
let obj = {
	foo (a, b) {
	},
	bar (x, y) {
	},
	//Generator 함수도 선언 가능
	*quux (x, y) {
	}
};
```

### Computed Property Names
속성을 선언할 때 계산된 값이 포함될 수 있도록 변경되었다. 아래와 같이 속성명을 `[]` 안에서 선언하면 계산된 값(혹은 메서드 호출)의 결과를 속성명으로 지정해줄 수 있다. (물론 그렇다고 해서 속성명이 동적인 것은 아니다)

```javascript
let obj = {
	foo: "bar",
	["baz" + (35+7) ]: 42
};
```

## 중복된 속성명 허용
ECMAScript 5 strict mode code 에서는 중복된 속성명을 선언시 오류가 발생했지만 ES2015 에서는 더이상 오류가 발생하지 않고 나중의 값으로 덮어씌워진다.

```javascript
let obj = {
	x: 1,
	x: 2
};

obj; // Object {x: 2}
```


## getter와 setter
ESMAScript 5 에서의 getter와 setter 역시 그대로 동작한다.

```javascript
let obj = {
	num: 10,
	get double () {
		return this.num * 2;
	},
	set double (val) {
		this.num = val * 2;
	}
};

obj.num; //10
obj.double; //20
obj.double = 30; //30
obj.double; //120
obj.num; //60
```

물론 getter 와 setter 를 선언할 때에도 Computed Property Names 를 사용할 수 있다.

```javascript
var dou = 'dou';
var ble = 'ble';

var obj = {
	num: 10,
	get [dou + ble] () {
		return this.num * 2;
	},
	set [dou + ble] (val) {
		this.num = val * 2;
	}
};

obj.num; //10
obj.double; //20
obj.double = 30; //30
obj.double; //120
obj.num; //60
```


## Prototype mutation
객체의 속성으로 __proto__ 나 "__proto__" 를 선언한다고 해서 이 이름의 속성값이 만들어지지는 않는다. 하지만 이 속성에 객체 또는 null 을 할당하게 되면 선언된 객체의 [[Prototype]] 체인을 할당한 값으로 사용하게 된다.

```javascript
//기본적으로 객체의 프로토타입 체인은 Object.prototype 객체로 연결되어 있다.
let obj1 = {};
Object.getPrototypeOf(obj1) === Object.prototype; //true

//__proto__ 속성에 Object 혹은 null 이외의 값을 넣어도 영향을 주지 않는다.
let obj2 = {
	__proto__: 123
}
Object.getPrototypeOf(obj2) === Object.prototype; //true

//null 을 넣게 되면 프로토타입 체인이 끊어진다.
let obj3 = {
	__proto__: null
}
Object.getPrototypeOf(obj3) === Object.prototype; //false
obj3.__proto__; //undefined
Object.getPrototypeOf(obj3); //null
obj3.toString(); //Uncaught TypeError: obj3.toString is not a function(…)

//아래와 같이 값의 형태로 할당해도 할당되지 않는다.
let obj4 = {};
obj4.__proto__ = 123;
Object.getPrototypeOf(obj4) === Object.prototype; //true

//그런데 Computed Property Names 를 사용하면 할당이 가능하다. 그렇지만 프로토타입 체인이 바뀌는 것은 아니다.
let obj5 = {
	["__proto__"]: 555
};
obj5.__proto__; //555
Object.getPrototypeOf(obj5) === Object.prototype; //true

let protoObj = {
	hello () {
		console.log('안녕하세요');
	}
};

//__proto__ 에 객체를 할당하면 프로토타입 체인이 변경된다.
let obj6 = {
	__proto__: protoObj
};
Object.getPrototypeOf(obj6) === protoObj;
obj6.hello(); //안녕하세요

//그렇지만 Computed Property Names 를 사용하면 프로토타입 체인이 변경되지 않는다.
let obj7 = {
	["__proto__"]: protoObj
};
Object.getPrototypeOf(obj7) === protoObj; //false
obj7.hello(); //Uncaught TypeError: obj7.hello is not a function(…)
Object.getPrototypeOf(obj7) === Object.prototype; //true

```
