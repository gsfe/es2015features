## Proxy

객체(Object)의 14가지 기본적인 기능(속성조회`getter`/할당`setter`, 나열... )을 handler를 이용하여 재정의 하는 기능이다.


#### 14가지 기본기능

|  name  | syntax                |
|--------|-----------------------|
| getPrototypeOf | Object.getPrototypeOf(target)  |
| setPrototypeOf | Object.setPrototypeOf(target, prototype) |
| defineProperty | Object.defineProperty(target, prop, descriptor) |
| deleteProperty | Object.deleteProperty(target, propertyKey) |
| getOwnPropertyDescriptors | Object.getOwnPropertyDescriptors(target) |
| preventExtensions | Object.preventExtensions(target) |
| isExtensible | Object.isExtensible(target) |
| get | Object.get(target, propertyKey[, receiver]) |
| set | Object.set(target, propertyKey, value[, receiver]) |
| has | Object.has(target, propertyKey) |
| ownKeys | Object.ownKeys(target) |
| construct | Object.construct(target, argumentsList[, newTarget]) |
| apply | Object.apply(target, thisArgument, argumentsList) |
| enumerate | Object.enumerate(target) 폐기 |


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

    obj[prop] = value;
  }
};

let person = new Proxy({}, handler);

person.age = 100;
console.log(person.age); // 100
person.age = 'young'; // Throws an exception
person.age = 300; // Throws an exception
```