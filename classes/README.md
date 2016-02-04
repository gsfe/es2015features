## Class

ES2015에서는 prototype 기반의 상속을 보다 명료하게 표현하는 class 기능이 추가가 되었다. 추가된 class는 함수와 다르지 않으며, 클래스 선언과 클래스 표현식을 제공한다.


### class 선언

```javascript
class Person{
    constructor(){} // 객체를 초기화하는 기본 메소드
}

var man = new Person();
```

클래스 선언은 함수 선언과는 다르게 호이스팅이 일어나지 않는다. 따라서 선언이 전에 참조하게 된다면 ReferenceError가 나타난다.

constructor 메소드는 객체를 생성하고 초기화하는 기본 메소드 이며 클래스 안에 한 개만 존재할 수 있어 한개 이상일떄 SyntaxError 가 발생한다.


### class 표현식

```javascript

var person = class{     // 이름이 없는 클래스 표현
    constructor(){}
}

var person = class Person{
    constructor(){}
}
```


### extends를 통한 클래스 상속

extends는 하나의 클래스에서 다른 클래스를 상속할때 쓰이는 키워드 이다.

```javascript
class Person{
    constructor(name){
        this.name = name;
    }
}

class Man extends Person{
    getNames(){
        console.log('name : ' + this.name);
    }
}

var john = new Man(name);
```


### super 키워드를 이용한 상위 객체 접근

상속된 상위 객체의 메소드(함수)를 호출하려면 super 키워드를 사용하면 된다.

```javascript
class Person{
    constructor(name){
        var name = name;
    }

    get rtnName(){
        return this.name;
    }

    getNames(){
        console.log('name : ' + this.name);
    }
}

class Man extends Person{
    getNames(){
        console.log('name : ' + super.rtnName);
        super.getNames();
    }
}

var john = new Man(name);
```


### Static methods

static 키워드는 정적 메소드를 정의 한다. 정적 메소드는 인스턴스화 없이 호출 가능하며 인스턴스화 되면 호출 하지 못한다.

```javascript
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.sqrt(dx*dx + dy*dy);
    }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2));  // 7.0710678118654755
console.log(p1.distance()) // undefined || error
```