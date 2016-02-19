## Proxy

객체(Object)의 13가지 기본적인 기능(속성조회`getter`/할당`setter`, 나열... )을 handler를 이용하여 재정의 하는 기능이다.


#### 13가지 기본기능

|  name  |         syntax        |
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


#### Syntax

```javascript
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
```


#### Examples

```javascript
var target = function(){}
var handler = {
  get:function(obj, prop){
    return 'get : ' + obj[prop];
  },
  set:function(obj, prop, value, receiver){
    obj[prop] = value;
    console.log(obj, prop, value, receiver);
    return true;
  },
  apply:function(target, thisArgument, argumentsList){
    console.log('apply : ' + argumentsList);
  },
  has:function(target, propertyKey){
    console.log('has', target, propertyKey);
  },
  deleteProperty:function(target, propertyKey){
    console.log('deleteProperty', target, propertyKey);
    return delete target['propertyKey'];
  },
  construct:function(target, argumentsList){
    console.log('construct', target, argumentsList);
    return target;
  }
};

var proxy = new Proxy(target, handler);
```