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
        if(prop == 'aaa'){
            obj[prop] = value;
            return value;
        }else{
            throw new Error("이 객체에 값을 정의 할 수 없습니다.");
        }
    }
};

var proxy = new Proxy(target, handler);
proxy.aaa = 'aaa';
console.log(proxy.aaa);
proxy.bbb = 'bbb';
```
[예제](http://jsbin.com/doroqizicu/edit?js,console)


####Examples

```javascript
var tree = {};
tree.branch1.branch1 = "red";
```

```javascript
var tree = Tree();

function Tree(){
    return new Proxy({}, {
        get: function (target, prop, receiver) {
            if (!(prop in target)) {
                target[prop] = Tree();
            }
            return Reflect.get(target, prop, receiver);
        }
    });
}

console.log(tree);
tree.branch1.branch1 = "red";
tree.branch1.branch2.twig = "green";
tree.branch1.branch3.twig = "yellow";
console.log(tree);
```
[예제](http://jsbin.com/jagibukila/edit?js,console)



##Reflect

`Reflect`에는 14가지 메소드가 정의되어 있어 객체의 속성과 메서드를 조사하고 조작하는 API 이다. 그리고 함수가 아니여서 constructor가 없다.

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
    version: "es6"
};

console.log( obj );
Reflect.deleteProperty( obj, "version" );
//delete obj.version;
console.log( obj );
```
[예제](http://jsbin.com/jebifetaye/edit?js,console)


```javascript
var obj = {
    version: "es6",
    name: "javascript",
    extension: "js"
};

// Reflect의 enumerate 메서드는 주어진 객체의 iterator를 반환한다.
var iterator = Reflect.enumerate( obj );
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```
[예제](http://jsbin.com/belokusafa/edit?js,console)