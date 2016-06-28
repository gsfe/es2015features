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
class Position {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    static distance (a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;

        return Math.sqrt(dx*dx + dy*dy);
    }
}

var p1 = new Position(5, 5);
var p2 = new Position(10, 10);

console.log(Position.distance(p1, p2));  // 7.0710678118654755
console.log(typeof p1.distance) // undefined
```

### 프로토타입 기반 상속과 비교

ES2015 이전에는 `class` 와 같은 키워드는 없었기 때문에 덜 직관적이긴 하지만, 함수를 생성자로 사용해서 프로토타입 기반 상속을 쉽게 구현할 수 있었다.

```javascript
//Person 생성자
function Person (name) {
    //Private 변수 선언
    var date = +new Date();

    //Private 메서드 선언
    var getDate = function () {
        return new Date(date) + ' 에 인스턴스 생성';
    };

    //인스턴스 멤버 선언
    this.name = name;
    this.date = function () {
        console.log(getDate());
    };
}

//프로토타입 멤버 선언
Person.prototype.getName = function () {
    console.log(this.name);
};
```
##### Private 변수와 Private 메서드 선언
함수의 지역변수 스코프 내에 선언되는 변수나 함수는 외부에서 직접 참조할 수 없는 특성을 활용해서 Private 변수나 메서드로 활용했다.
##### 인스턴스 멤버 선언
함수를 `new` 키워드와 함께 생성자로 사용할 경우 `this`에 인스턴스가 할당되므로 이를 활용해서 인스턴스 멤버를 `this.xxx` 의 형태로 선언해 줄 수 있다.
##### 프로토타입 멤버 선언
인스턴스의 프로토타입 체인이 생성자 함수의 prototype 객체와 연결되므로, 생성자 함수의 prototype 객체에 직접 멤버를 선언하는 방식으로 프로토타입 멤버를 선언해준다.


기존에는 위와 같은 방식으로 선언한 생성자 함수를 `class` 키워드를 사용해서 아래와 같이 동일한 기능을 하는 클래스로 선언해줄 수 있다.

```javascript
class Person {
    constructor (name) {
        //Private 변수 선언
        var date = +new Date();

        //Private 메서드 선언
        var getDate = function () {
            return new Date(date) + ' 에 인스턴스 생성';
        };

        //인스턴스 멤버 선언
        this.name = name;
        this.date = function () {
            console.log(getDate());
        };
    }

    //프로토타입 멤버 선언
    getName () {
        console.log(this.name);
    }
}
```

이제 Person 생성자를 상속받는 Korean 이란 생성자 함수를 선언하는 예를 살펴보자.

```javascript
//Korea 생성자
function Korean (name, city) {
    //인스턴스 멤버 상속
    Person.call(this, name);

    //Private 변수 선언
    var area = 'asia';

    //Private 메서드 선언
    var getArea = function () {
        return area + '에 위치';
    };

    //인스턴스 멤버 선언
    this.city = city;
    this.area = function () {
        console.log(getArea());
    };

    //부모의 private 변수는 직접 참조 불가
    this.test = function () {
        console.log('Korean 의 private 변수', area); //asia
        console.log('Person 의 private 변수', date); //Uncaught ReferenceError: date is not defined
    }
}

//Person의 프로토타입 멤버 상속
Korean.prototype = new Person();
Korean.prototype.constructor = Korean;

//프로토타입 멤버 선언
Korean.prototype.getCity = function () {
    console.log(this.city);
};
```

##### 인스턴스 멤버 상속
Person 생성자의 인스턴스 멤버를 상속하기 위해서 `call` 을 사용한다. `call`은 메서드 상의 `this` context를 치환해줄 수 있기 때문에 `this`가 Korean의 인스턴스를 가리키도록 `Person.call(this, .....)` 의 형태로 호출해서 Person 생성자의 인스턴스 멤버를 상속받는다.
Korean 생성자를 사용해서 `new` 키워드로 새로운 인스턴스를 생성하면 `this` 에는 Korean 생성자의 인스턴스가 주입되게 되고, 이 `this`를 context 로 Person 생성자 함수를 실행하기 때문에 Person 생성자 함수 내의 `this.xxx` 형태의 인스턴스 멤버 선언을 그대로 실행하게 되므로 상속받는 것과 동일한 효과를 얻는다.
또 이 과정에서 Person 생성자 함수가 실행되며 별도의 지역변수 영역이 생성되고 이 영역에 Person 생성자 함수의 Private 변수/메서드들이 만들어지게 된다.

##### 프로토타입 멤버 상속
Korean 생성자의 인스턴스의 프로토타입 체인에는 기본적으로 Korean 생성자의 프로토타입 객체가 연결된다. Korean 생성자 프로토타입 객체의 프로토타입 체인에 Person 생성자의 프로토타입 객체를 연결하기만 하면 프로토타입 멤버 상속을 구현할 수 있다. 방법은 여러가지가 있는데 여기에서는 Korean 생성자 프로토타입 객체를 아예 Person 생성자의 인스턴스로 치환하는 방법을 사용했다. Person 생성자의 인스턴스의 프로토타입 체인은 바로 Person 생성자의 프로토타입과 연결되어 있기 때문에 이를 응용한 것이다. 하지만 이 경우 constructor 가 변경되기 때문에 다시 constructor 를 Korean 생성자로 수정해주는 과정이 동반된다.

setPrototypeOf 를 활용해서 아래와 같이 직접 프로토타입 체인을 연결해줄 수도 있다.
```javascript
Object.setPrototypeOf(Korean.prototype, Person.prototype);
```

아예 숨겨진 프로토타입 체인에 직접 할당하는 방법도 있다.
```javascript
Korean.prototype.__proto__ = Person.prototype
```


ES2015 이전에는 상속을 구현하는 것이 다소 복잡하지만, `extends` 키워드를 사용하면 쉽게 동일한 기능을 하는 상속을 구현해 줄 수 있다.

```javascript
class Korean extends Person {
    constructor (name, city) {
        super(name);

        //Private 변수 선언
        var area = 'asia';

        //Private 메서드 선언
        var getArea = function () {
            return area + '에 위치';
        };

        //인스턴스 멤버 선언
        this.city = city;
        this.area = function () {
            console.log(getArea());
        };

        //부모의 private 변수는 직접 참조 불가
        this.test = function () {
            console.log('Korean 의 private 변수', area); //asia
            console.log('Person 의 private 변수', date); //Uncaught ReferenceError: date is not defined
        }
    }

    //프로토타입 멤버 선언
    getCity () {
        console.log(this.city);
    }
}
```

`class` 라는 키워드를 사용하지만 여전히 내부적으로는 프로토타입 기반 상속을 구현하고 있다는 것을 잊으면 안된다.
클래스 내에 constructor 상에서 선언되는 멤버와 클래스 멤버로 선언되는 것이 실제 프로토타입 기반에서 어떤 차이가 있는지 아는 상태에서 사용하는 것이 중요하다.


### static 메서드

마지막으로 static 메서드를 ES2015 이전에는 어떻게 구현할 수 있는지 확인해보자.

```javascript
class Position {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    static distance (a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;

        return Math.sqrt(dx*dx + dy*dy);
    }
}

var p1 = new Position(5, 5);
var p2 = new Position(10, 10);

console.log(Position.distance(p1, p2));  // 7.0710678118654755
console.log(typeof p1.distance) // undefined
```

앞서 살펴본 이 클래스는 아래와 같이 표현될 수 있다.

```javascript
function Position (x, y) {
    this.x = x;
    this.y = y;
}

Position.distance = function (a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;

    return Math.sqrt(dx*dx + dy*dy);
};

var p1 = new Position(5, 5);
var p2 = new Position(10, 10);

console.log(Position.distance(p1, p2));  // 7.0710678118654755
console.log(typeof p1.distance) // undefined
```
