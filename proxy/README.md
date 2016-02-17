## Proxy

객체(Object)의 14가지 기본적인 기능(속성조회`getter`/할당`setter`, 나열... )을 handler를 이용하여 재정의 하는 기능이다.


#### 14가지 기본기능

| Tables   |      Are      |
| col 1 is |  left-aligned |
| col 2 is |    centered   |
| col 3 is | right-aligned |

getPrototypeOf : Object.getPrototypeOf(target)
setPrototypeOf : Object.setPrototypeOf(target, prototype)
defineProperty : Object.defineProperty(obj, prop, descriptor)
deleteProperty : obj.deleteProperty(target, propertyKey)
getOwnPropertyDescriptors : Object.getOwnPropertyDescriptors(obj)
preventExtensions : Reflect.preventExtensions(target)
isExtensible : Reflect.isExtensible(target)
get : obj.get(target, propertyKey[, receiver])
set : Reflect.set(target, propertyKey, value[, receiver])
has : Reflect.has(target, propertyKey)
ownKeys : Reflect.ownKeys(target)
construct : Reflect.construct(target, argumentsList[, newTarget])
apply : Reflect.apply(target, thisArgument, argumentsList)
enumerate : Reflect.enumerate(target) 폐기됨


#### Syntax

```javascript
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
```


#### Examples

```javascript
let handler = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // The default behavior to store the value
    obj[prop] = value;
  }
};

let person = new Proxy({}, handler);

person.age = 100;
console.log(person.age); // 100
person.age = 'young'; // Throws an exception
person.age = 300; // Throws an exception
```



## Reflect

`Reflect`는 내장객체(built-in Objects)로 기본 자바스크립트 메소드( 14가지 메소드 )을 차단( 재정의 )하는 기능을 제공한다. 그 메소드는 `Proxy`의 `handlers` 와 같다. `Reflect`는 함수가 아니여서 `constructor` 가 없다.


#### Syntax

```javascript
let handler = {
  get:function(obj, key){
    var val = 'hello ' + Reflect.get(obj, key);
    return val;    
  },
  set:function(obj, prop, value) {
    var val = 'world' + value;
    Reflect.set(obj, prop, val);
  }
};

let person = new Proxy({}, handler);

person.age = 100;  // world 100
person.age;        // hello 100;
```
