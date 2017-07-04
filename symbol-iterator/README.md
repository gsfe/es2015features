## 심볼(Symbol)
심볼은 ES2015에 추가된 새로운 Primitive Type 이다. 심볼은 일종의 고유 아이디로 사용되는 토큰이다. 심볼 팩토리 함수인 Symbol()을 사용해서 심볼을 만들어줄 수 있다.

```javascript
let symbolTest = Symbol();
```

심볼은 유일한 파라메터로 스트링을 받는데, 어떤 심볼인지 디버깅할 때 설명하는 용도로 사용된다.

```javascript
let symbolTest = Symbol('symbolTest!');
```

Symbol() 팩토리 함수를 사용해서 생성한 모든 심볼은 유니크하다.

```javascript
let test1 = Symbol('test');
let test2 = Symbol('test');

test1 === test2; // false
```

심볼은 객체의 속성키값으로 사용될 수 있다. 당연히 계산된 속성으로 사용될 수 있다.
이전에 객체의 속성키값은 스트링만 가능했지만 이제 심볼도 가능하다.
하지만 항상 [] 로 참조해야 하고 . 으로 참조할 수는 없다.

```javascript
const symbolTest = Symbol();
let obj = {
    [symbolTest]: 'hello world!'
};

console.log(obj[symboleTest]); // hello world!
```

심볼을 속성키값으로 할 경우, getOwnPropertyNames 로는 알 수 없고, getOwnPropertySymbols 로 알 수 있다.
Reflect.ownKeys() 로는 모든 종류의 키값을 알 수 있고, Object.keys(obj) 의 경우 enumerable 인 키만 참조한다.

```javascript
let obj = {
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
};
Object.defineProperty(obj,
    'nonEnum', { enumerable: false });

Object.getOwnPropertyNames(obj); // ['enum', 'nonEnum']
Object.getOwnPropertySymbols(obj); // [Symbol(my_key)]
Reflect.ownKeys(obj); // [Symbol(my_key), 'enum', 'nonEnum']
Object.keys(obj); // ['enum']
```


심볼은 기본적으로 전역 레벨로 생성되지 않는다. 전역 레벨로 생성하기 위해서는 for 메서드를 사용해서 생성하고 사용할 때는 keyFor 을 통해 사용해야 한다.

```javascript
let sym = Symbol.for('Hello everybody!');
Symbol.keyFor(sym); //'Hello everybody!'
```

심볼은 자바스크립트의 내부 언어 동작을 나타내는 몇가지 내장된 심볼들을 가지고 있다.


- Symbol.iterator
    객체의 기본 반복자(iterator)를 반환하는 메소드. for...of에서 사용됨.

- Symbol.match
    문자열과 매치(match)되는 메소드, 또한 객체가 정규식으로서 사용되는지 확인하는데도 사용. String.prototype.match()에서 사용됨.

- Symbol.replace
    문자열 중 매치되는 일부 문자열을 대체하는 메소드. String.prototype.replace()에서 사용됨.

- Symbol.search
    정규식과 매치되는 문자열의 인덱스(index)를 반환하는 메소드. String.prototype.search()에서 사용됨.

- Symbol.split
    문자열을 정규식과 매치되는 인덱스들에서 나누는 메소드. String.prototype.split()에서 사용됨.

- Symbol.hasInstance
    생성자 객체가 어떤 객체를 자신의 인스턴스(instance)로 인식하는지 확인하는데 사용하는 메소드. instanceof에서 사용됨.

- Symbol.isConcatSpreadable
    어떤 객체가 자신의 배열 원소들로 단순화(flatten)되어야 하는지 나타내는 불리언(Boolean) 값(불명확). Array.prototype.concat()에서 사용됨.

- Symbol.unscopables
    속성 값들을 나타내는 문자열 배열 값. These are excluded from the with environment bindings of the associated objects.

- Symbol.species
    파생(derived) 객체를 생성하는데 사용되는 생성자 함수.

- Symbol.toPrimitive
    객체를 기본형 값으로 변환하는 메소드.

- Symbol.toStringTag
    객체의 기본 설명(description)에 사용되는 문자열 값. Object.prototype.toString()에서 사용됨.


  

  



## 이터레이터와 이터러블

### 이터러블
    - 자바스크립트에서 이터러블하다는 말은 객체명[Symbol.iterator]() 를 실행시켜서 next() 로 탐색 가능하다는 말이다.
    - [Symbol.iterator] 키를 가지고 있는 객체는 이터러블한 것으로 간주된다.
    - [Symbol.iterator] 라는 키를 가진 메서드는 이터레이터 팩토리 메서드이다.
    - 객체명[Symbol.iterator]() 의 결과값(=이터레이터)이 next() 로 탐색 가능하지 않으면 문제가 된다.
      이터러블의 이터레이터 팩토리 메소드([Symbol.iterator])가 이터레이터 객체를 반환하지 않으면 
      제대로 형식을 갖추지 않은 이터러블(non-well-formed iterable)이다.
      그렇게 사용하면 런타임 예외 또는 버그가 발생할 수 있다.
        var nonWellFormedIterable = {};
        nonWellFormedIterable[Symbol.iterator] = () => 1; //next() 가 없다..
        [...nonWellFormedIterable] // TypeError: [] is not a function


### 이터레이터
    - 객체명[Symbol.iterator]() 실행의 결과값. next 메서드를 가지고 있고 이를 통해서 요소를 탐색할 수 있다.

이터러블과 이터레이터는 이터레이션을 위한 '프로토콜'(인터페이스 및 규칙)의 일부이다. 프로토콜의 핵심 성격 중 하나는, 바로 순차적이라는 것이다.
이터레이터는 값들을 한 번에 하나씩 반환한다.
즉, 선형구조로 이루어져있지 않은 데이터구조라 하더라도 일단 이터러블하기만 하면, 이터레이션을 거치면 선형구조로 전환됨을 의미한다.

```javascript
let counter = {
    [Symbol.iterator]() {
        let count = 1;
        return {
            next () {
                if (count < 3) {
                    return { done: false, value: count++ };
                }
                return { done: true, value: undefined };
            }
        }
    }
};
```

이렇게 이터러블한 객체는 for-of 를 사용해서 탐색할 수 있다.

```javascript
for (let i of counter) {
    console.log(i); //1, 2
}
```

또는 직접 이터레이터 팩토리 메서드를 호출해서 이터레이터를 반환받아서 실행할 수도 있다.

```javascript
let count = counter[Symbol.iterator]();
count.next(); // { done: false, value: 1 }
count.next(); // { done: false, value: 2 }
count.next(); // { done: true, value: undefined }
```

제네레이터의 경우 기본적으로 실행하면 이터레이터를 반환한다.
따라서 위의 코드는 쉽게 이렇게 변환해줄 수 있다.

```javascript
let gcounter = {
    * [Symbol.iterator] () {
        yield 1;
        yield 2;
    }
};
```

당연히 for-of 를 사용해서 탐색 가능하다.

```javascript
for (let i of gcounter) {
    console.log(i); //1, 2
}
```

물론 또 당연히 직접 이터레이터 팩토리 메서드를 호출해서 이터레이터를 반환받아서 실행할 수도 있다.

```javascript
let gcount = gcounter[Symbol.iterator]();
gcount.next(); // { done: false, value: 1 }
gcount.next(); // { done: false, value: 2 }
gcount.next(); // { done: true, value: undefined }
```
