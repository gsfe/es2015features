## Proxy

객체(Object)의 13가지 기본적인 기능(속성조회`getter`/할당`setter`, 나열... )을 재정의 하는 기능이다.

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
            //return target[prop];
        }
    });
}

console.log(tree);
tree.branch1.branch1 = "red";
tree.branch1.branch2.twig = "green";
tree.branch1.branch3.twig = "yellow";
console.log(tree.branch1.branch1);
console.log(tree.branch1.branch3);
```
[예제](http://jsbin.com/febujuduvi/edit?js,console)



##Reflect

`Reflect`는 Proxy의 트랩( handler )과 동일한 13가지 메소드를 제공하나 직접 기본동작을 구현하지 않고 기본동작으로 위임할 수 있게 하므로 Proxy와 함께 사용되는 경우가 많고 constructor가 없어 new 연산자로 인스턴스화할 수 없다.

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
    version: "es6",
    name: "javascript",
    extension: "js"
};

console.log( obj );
Reflect.deleteProperty( obj, "version" );
//delete obj.version;
console.log( obj );
Reflect.set(obj, "discription", "Babel JS");
console.log(Reflect.get(obj, "discription"));
```
[예제](http://jsbin.com/mifasowofa/edit?js,console)