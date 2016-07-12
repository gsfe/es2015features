`Proxy` 는 객체가 가지는 기능을 차단하고 재정의된 기능을을 실행시킬 수 있다. Reflect 는 객체가 본래 갖고있는 기능을 반환한다.


## Proxy
`Proxy` 객체는 기본적인 작업(예를 들어 속성의 검색, 할당, 열거, 함수의 시작 등)에 대한 동작을 재정의하는 데 사용한다.


|  용어  |         설명          |
|--------|-----------------------|
|target  | Proxy가 동작을 변경할 객체 |
|traps   | 객체가 가진 속성에 액세스하는 방법 |
|handler | traps 에 대응해 재정의한 동작을 담은 객체 |


```javascript
//Proxy 핸들러 선언
var handler = {
    get : function (target , name) {
        return target[name] || '없는 값이에요ㅠㅠ';
    }
};

//빈 객체에 프록시 적용
var p = new Proxy({} , handler);
p.aaa = 1;
console.log(p.aaa, p.bbb); // 1 "없는 값이에요ㅠㅠ"
```

이 `Proxy` 객체는 `get` 트랩이 구현된 `handler` 와 빈 객체를 `target` 으로 정의되어 있다. 여기에서 프록시가 된 객체에 없는 멤버를 호출하려고 하면 `undefined` 를 반환하는 대신에 "없는 값이에요ㅠㅠ"를 반환한다. 이런 식으로 재정의할 수 있는 Proxy traps 목록은 아래와 같다. 메소드의 내용이 비어있는 경우 본래의 기능을 반환한다.

| 기능   | 핸들러 메소드         |
|--------|-----------------------|
| 함수 호출에 대한 트랩 | handler.apply () |
| new에서 생성자 호출 조작에 대한 트랩 | handler.construct () |
| Object.defineProperty ()에 대한 트랩 | handler.defineProperty () |
| delete 조작에 대한 트랩 | handler.deleteProperty () |
| ~~for ... in 문에 대한 트랩~~ | ~~handler.enumerate ()~~ |
| 속성 값을 얻을 수에 대한 트랩 | handler.get () |
| Object.getOwnPropertyDescriptor ()에 대한 트랩 | handler.getOwnPropertyDescriptor () |
| GetPrototypeOf 내부 메소드에 대한 트랩 | handler.getPrototypeOf () |
| in 조작에 대한 트랩 | handler.has () |
| Object.isExtensible ()에 대한 트랩 | handler.isExtensible () |
| Object.getOwnPropertyNames ()에 대한 트랩 | handler.ownKeys () |
| Object.preventExtensions ()에 대한 트랩 | handler.preventExtensions () |
| 속성 값을 설정하는 것에 대한 트랩 | handler.set () |
| Object.setPrototypeOf ()에 대한 트랩 | handler.setPrototypeOf () |

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler


#### Examples

```javascript
var target = {};
var handler = {
    get: function (obj, prop) {
        return 'get : ' + obj[prop];
    },
    set: function (obj, prop, value, receiver) {
        //멤버명이 aaa인 경우에만 허용
        if (prop === 'aaa') {
            obj[prop] = value;
            return value;
        }
        else {
            throw new Error('이 객체에 값을 정의 할 수 없습니다.');
        }
    }
};

var proxy = new Proxy(target, handler);
proxy.aaa = 'aaa';
console.log(proxy.aaa);
proxy.bbb = 'bbb';
console.log(proxy.bbb);
```
[예제](http://jsbin.com/doroqizicu/edit?js,console)




```javascript
function Tree () {
    return new Proxy({}, {
        get: function (target, prop, receiver) {
            if (!(prop in target)) {
                target[prop] = Tree();
            }
            //return Reflect.get(target, prop, receiver);
            return target[prop];
        }
    });
}
var tree = Tree();

tree.branch1.branch1 = 'red'; //Uncaught TypeError 에러가 발생하지 않는다!
tree.branch1.branch2.twig = 'green';
tree.branch1.branch3.twig = 'yellow';
console.log(tree.branch1.branch1);
console.log(tree.branch1.branch3);
```
[예제](http://jsbin.com/febujuduvi/edit?js,console)


#### Proxy.revocable

`Proxy` 에는 취소 가능한 `Proxy` 객체를 만드는 메서드인 `revocable`이 존재한다. `Proxy`를 사용할 때와 동일하게 `target` 과 `handler` 를 파라메터로 실행하면, 취소 가능한 `Proxy` 객체가 반환되는데, `proxy` 와 `revoke` 를 속성으로 가지는 객체이다. `proxy`는 프록시 객체이고, revoke 는 메서드인데, 실행하게 되면 프록시 객체에 적용된 프록시가 더이상 사용할 수 없게 되고 이후로 모든 핸들러에 `TypeError`를 발생시킨다.

```javascript
var revocable = Proxy.revocable({}, {
    get: function (target, name) {
        return "[[" + name + "]]";
    }
});
var proxy = revocable.proxy;
console.log(proxy.foo); // "[[foo]]"

revocable.revoke();

console.log(proxy.foo); // TypeError is thrown
proxy.foo = 1           // TypeError again
delete proxy.foo;       // still TypeError
typeof proxy            // "object", typeof doesn't trigger any trap
```



##Reflect

`Reflect`는 `Proxy`의 트랩(handler)과 동일한 13가지 메소드를 제공하나 직접 기본동작을 재정의하지 않고 기본동작을 실행할 수 있도록 위임해주므로 `Proxy`와 함께 사용되는 경우가 많다. 즉 `Proxy` 에서 원래 동작을 재현 할 때 Reflect API 를 많이 사용한다.

constructor가 없어 new 연산자로 인스턴스화할 수 없다.

|  name  |         syntax        |
|--------|-----------------------|
| apply | Reflect.apply(function, this, args) |
| construct | Reflect.construct(constructor, args, prototype) |
| defineProperty | Reflect.defineProperty(object, property, descriptor) |
| deleteProperty | Reflect.deleteProperty(object, property) |
| get | Reflect.get(object, property, this) |
| set | Reflect.set(object, property, value, this) |
| getOwnPropertyDescriptor | Reflect.getOwnPropertyDescriptor(object, property) |
| setPrototypeOf | Reflect.setPrototypeOf(object, prototype) |
| getPrototypeOf | Reflect.getPrototypeOf(object) |
| has | Reflect.has(object, property) |
| isExtensible | Reflect.isExtensible(object) |
| preventExtensions | Reflect.preventExtensions(object) |
| ownKeys | Reflect.ownKeys(object) |


```javascript
var obj = {
    version: 'es6',
    name: 'javascript',
    extension: 'js'
};

console.log(obj);
Reflect.deleteProperty(obj, 'version');
//delete obj.version;
console.log(obj);
Reflect.set(obj, 'discription', 'Babel JS');
console.log(Reflect.get(obj, 'discription'));
```
[예제](http://jsbin.com/mifasowofa/edit?js,console)



## Traps

#### has
속성값의 존재(프로토타입 포함) 판정을 포착한다.
트랩에는 target 과 존재할 것으로 예상된 key(문자열 또는 기호)가 전달된다.
트랩이 반환하는 불린 값은 해당 속성값의 존재 유무로 간주된다.

```javascript
let o = {};

let p = new Proxy(o, {
    has (target, key) {
        console.log(target, key);
        return Reflect.has(target, key);
    }
});

'aaa' in o  //o 에는 aaa 라는 멤버가 없으므로 false
'aaa' in p  //o 를 감싼 p 에도 aaa 라는 멤버가 없으므로 false
//Object {} "aaa" //console.log 로 target 과 key 출력
```


#### get
속성값의 취득을 포착한다.
트랩에는 target, key, receiver가 전달된다.
트랩이 반환 값은 취득 된 값으로 간주된다.

```javascript
let o = {};

let p = new Proxy(o, {
    get (target, key, receiver) {
        console.log(target, key, receiver);
        return 42;
    }
});

p.aaa; //42
```



#### set
속성값의 설정을 포착한다.
트랩에는 target, key, value, 그리고 receiver가 전달된다.

```javascript
let o = {};

let p = new Proxy(o, {
    set (target, key, value, receiver) {
        console.log(target, key, value, receiver);
        return Reflect.set(target, key, 42);
    }
});

p.a = 123;
o.a//42
```


#### deleteProperty
속성의 삭제를 포착한다.
트랩에는 target, key가 전달된다.

```javascript
let o = { a: 1 };

let p = new Proxy(o, {
    deleteProperty (target, key) {
        return true;
    }
});

delete a in p  //true -> 아무것도 처리하지 않았기 때문에 실제로는 남아있다
o.a  //1
```


#### getOwnPropertyDescriptor
Property Descriptor 의 취득을 포착한다.
트랩에는 target, key가 전달된다.
트랩 반환하는 개체가 Descriptor 로 간주된다.

```javascript
let o = {};

let p = new Proxy(o, {
    getOwnPropertyDescriptor(target, key) {
        return { value: 123, configurable: true };
    }
});

Object.getOwnPropertyDescriptor(p, 'a');
// { value: 123, writable: false, enumerable: false, configurable: true }
```


#### defineProperty
속성의 정의를 포착한다.
트랩에는 target, key와 속성을 지정하기위한 attributes 객체가 전달된다.

```javascript
let o = {};

let p = new Proxy(o, {
    defineProperty(target, key, attributes) {
        console.log(target, key, attributes);
        return Reflect.defineProperty(target, key, attributes)
    }
});

Object.defineProperty(p, 'a', { value: 1 });
o.a // 1
```

#### ownKeys
고유 속성 키 목록 검색을 포착한다.
트랩에는 target이 전달된다.
트랩이 반환하는 배열이 키 목록으로 간주된다.

```javascript
let o = { a: 1, b: 2, c: 3 }

let p = new Proxy(o, {
    ownKeys(target) {
        return ['a'];
    }
});

Object.assign({}, p)  // { a: 1 }
//프록시가 키를 "a" 만 알려주었기 때문에 "a"속성만 합성되었다
```


#### getPrototypeOf
속성의 정의를 포착한다.
트랩에는 target이 전달된다.
트랩이 반환하는 값이 객체 또는 null이면 프로토 타입으로 간주된다.

```javascript
let o = {};

let p = new Proxy(o, {
    getPrototypeOf(target) {
        return { hoge: 123 };
    }
});

p.__proto__;  // { hoge: 123 }
```



#### setPrototypeOf
속성의 정의를 포착한다.
트랩에는 target과 설정할 프로토타입 객체 또는 null이 proto 변수에 전달된다.
트랩이 반환하는 불린값에 따라 처리의 성패 간주된다.

```javascript
let o = {};

let p = new Proxy(o, {
    setPrototypeOf(target, proto) {
        console.log(target, proto);
        return false; // 항상 실패
    }
});

p.__proto__ = { hoge: 123 }; // TypeError
```


#### isExtensible
확장 가능 여부의 판정을 포착한다.
트랩에는 target이 전달된다.
트랩이 반환하는 불린값이 가능 여부로 간주된다.

```javascript
let o = {};

let p = new Proxy(o, {
    isExtensible(target) {
        console.log(target);
        return Reflect.isExtensible(target)
    }
});

Object.isExtensible(p); //true
```

#### preventExtensions
확장 금지 설정을 포착한다.
트랩에는 target이 전달된다.
트랩이 반환하는 불린값에 따라 처리의 성패 간주된다.

```javascript
let o = {};

let p = new Proxy(o, {
    preventExtensions(target) {
        console.log(target);
        return false; //항상 실패
    }
});

Object.freeze(p); //TypeError
```

#### apply
함수 호출을 포착한다.
트랩에는 target과 호출된 thisArg, 인수 배열 args가 전달된다.
트랩이 반환하는 값이 실행 결과값으로 간주된다.

```javascript
let f = () => {};

let p = new Proxy(f, {
    apply(target, thisArg, args) {
        console.log(target, thisArg, args);
        return 42;
    }
});

p.apply(0, [ 1, 2, 3 ]); // 42
//f, 0, [ 1, 2, 3 ]
```


#### construct
생성자 호출을 포착한다.
트랩에는 target, args와 대상인 newTarget 이 전달된다.
트랩이 반환하는 개체가 결과로 간주된다.

```javascript
let c = class {};

let p = new Proxy(c, {
    construct(target, args, newTarget) {
        console.log(target, args, newTarget);
        return {};
    }
});

new p(1, 2, 3);
//c, [ 1, 2, 3 ], p
```

## Proxy 활용 예제
https://github.com/mikaelbr/proxy-fun/blob/master/examples-summary.md
