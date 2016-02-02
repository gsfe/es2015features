## Class

ES2015에서는 prototype 기반의 상속을 보다 명료하게 표현하는 class가 추가가 되었다. 또한 class는 함수와 다르지 않으며, class 선언 과 class 표현식을 제공한다.


### class 선언

```javascript
class Person{
    constructor(){} // 객체를 초기화하는 기본 메소드
}

var man = new Person();
```

클래스 선언은 함수 선언과는 다르게 호이스팅이 일어나지 않는다. 따라서 선언이 전에 참조하게 된다면 ReferenceError가 나타난다.


### class 표현식

```javascript

var person = class{
    constructor(){}
}

var person = class Person{
    constructor(){}
}
```


### extends를 통한 클래스 상속 & super

extends는 하나의 클래스에서 다른 클래스를 상속할때 쓰이는 키워드 이다.

```javascript

class Person{
    constructor(name){}
    head(){}
    body(){}
}

class Man extends Person{
    constructor(name){}
    super.head() // super를 통해 상속된 상위 클래스의 메서드를 호출할 수 있다.
}
```




