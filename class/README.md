## Class

ES2015에서는 `prototype` 기반의 상속을 보다 명료하게 표현하는 `class` 키워드가 추가가 되었다. `class`는 함수와 다르지 않으며, 클래스 선언과 클래스 표현식을 제공한다.


### class 선언

```javascript
class Person {
    // 객체를 초기화하는 기본 메소드
    constructor () {
    }
}

var john = new Person();
```

클래스 선언은 함수 선언과는 다르게 호이스팅이 일어나지 않는다. 따라서 선언 전에 참조하게 되면 `ReferenceError` 가 나타난다.
constructor 메소드는 객체를 생성하고 초기화하는 기본 메소드이며 클래스 안에 한 개만 존재할 수 있어 여러 개의 constructor 를 선언하면, `SyntaxError` 가 발생한다.


### 익명 class 선언

```javascript
var Person = class {
    constructor () {
    }
}
```


### extends를 통한 클래스 상속

`extends`는 하나의 클래스에서 다른 클래스를 상속할 때 쓰이는 키워드 이다.

```javascript
class Person {
    constructor (name) {
        this.name = name;
    }
}

class Man extends Person {
    getName () {
        console.log('My name is ' + this.name);
    }
}

var john = new Man('John');
john.getName(); //My name is John
```


### super 키워드를 이용한 상위 객체 접근

부모 클래스의 메소드를 호출하려면 `super` 키워드를 사용한다.

```javascript
class Person {
    constructor (name) {
        this.name = name;
    }

    get nameAttr () {
        return this.name;
    }

    set nameAttr (name) {
        this.name = name;
    }

    getName () {
        console.log('Person\'s name is ' + this.name);
    }
}

class Man extends Person {
    //상속 받는 클래스에서 constructor 메서드를 생략하면 부모 클래스의 constructor 가 그대로 실행되며 이는 아래와 같은 코드가 실행되는 것과 같다.
    //constructor (name) {
    //    super(name);
    //}

    getName () {
        console.log('My name is ' + super.nameAttr);
        super.getName();
    }
}

var john = new Man('John');
john.getName();
//My name is John
//Person's name is John
```


### Static methods

static 키워드는 정적 메소드를 정의 한다. 정적 메소드는 인스턴스를 생성하지 않고도 호출 가능하며 인스턴스에서는 호출 하지 못한다.

```javascript
class Point {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    static distance (a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.sqrt(dx*dx + dy*dy);
    }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2));  // 7.0710678118654755
console.log(typeof p1.distance) // undefined
```
