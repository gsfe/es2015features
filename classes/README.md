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


### class 표현식

```javascript

var person = class{     // 이름이 없는 클래스 표현
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
    constructor(name, gender){
        this.name = name;
        this.gender = gender;
    }
    getName(){
        console.log('name : ' + this.name);
    }
    getGender(){
        console.log('name : ' + this.gender);
    }
}

class Man extends Person{
    constructor(name, gender){
        super(name, gender);
    }
    getName(){
        super.getName();
    }
}

var john = new Man(name, gender);
```
상속된 상위 객체의 메소드(함수)를 호출하려면 super 키워드를 사용하면 된다.


### static class
