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
        if(prop == 'name'){
          obj[prop] = value;
          return value;
        }else{
          throw new Error("이 객체에 값을 정의 할 수 없습니다.");
        }
    }
};

var proxy = new Proxy(target, handler);
proxy.name = 'jedy';
console.log(proxy.name);
proxy.gender = 'men';
```
[Jsbin 예제](http://jsbin.com/betiyodeqe/edit?js,console)


####Examples

```javascript
var tree = {};
tree.branch1.branch1 = "red";
```

```javascript
var tree = Tree();

function Tree(){
  return new Proxy({}, {
    get: function (target, key, receiver) {
      if (!(key in target)) {
        target[key] = Tree();
      }
      return Reflect.get(target, key, receiver);
    }
  });
}

console.log(tree);
tree.branch1.branch1 = "red";
tree.branch1.branch2.twig = "green";
tree.branch1.branch3.twig = "yellow";
console.log(tree);
```
[Jsbin 예제](http://jsbin.com/socopigepu/edit?js,console)