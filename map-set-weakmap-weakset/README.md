## Map

`Key`와 `Value`를 가지는 객체 이다. `get`과 `set` 으로 데이터를 참조/할당 할 수 있고 `{}` 및 `function(){}`을 key값을 사용 할 수 있지만 인스턴스 객체가 되어야 value에 접근할 수 있다.

```javascript
var m = new Map(); 
var keyObj = {};
var keyFunc = function(){};

m.set('key1', 'value');
m.set(keyObj, 'value Object');
m.set(keyFunc = 'value Function');

m.get(key1) === 'value';
m.get(keyObj) === 'value Object';
m.get(keyFunc) === 'value Function';
m.get( {} || function(){} ) === undefined;

m.size === 2;
m.has(key1) === true;
```
[JSBin 예제](http://jsbin.com/ronewamuko/edit?js,console)

## Set

`Value` 값을 가지는 객체이다. `add`로 값을 할당하고 중복되는 값이 있을 땐 새 값이 이전 값을 대체한다.

```javascript
var s = new Set();
s.add('good').add('bad').add('good');   // Set {'good', 'bad'}
s.size === 2;
s.has('good');
```
[JSBin 예제](http://jsbin.com/nahetelacu/edit?js,console)



## (Map || Set) Iterator

`Map`과 `Set`은 Iterator를 각각 반환하여 `for-of`로 객체의 `key/value` 참조할 수 있다.

|  method  |         return value        |
|----------|-----------------------------|
|   keys   | {"key1", "key2", ...} |
|  values  | {"value1", "value2", ...} |
|  entries | {["key1", "value1"], ["key2", "value2"], ...} |
단 Set의 `entries` 메소드는 Iterator를 반환 하나 key값이 없는 특성상 value 값이 key값으로 반환된다.

```javascript
var m = new Map();
var s = new Set();
m.set('key1', 'key value1').set('key2', 'key value2');
s.add('set value1').add('set value2');


//entries Iterator
for(var [key, value] of m.entries()){
  console.log('key : '+key+', value : '+value);
}
for(var [key, value] of s.entries()){
  console.log('key : '+key+', value : '+value);
}

```
[JSBin 예제](http://jsbin.com/wekaxaqipu/edit?js,console)


## WeakMap || WeakSet

### WeakMap

Object만 key로 허용하고 value는 임의의 값을 허용하는 key/value 요소의 집합이다.

```javascript
let privates = new WeakMap();
class Public {
  constructor(){
    this.defaults = {
      aaa:0,
      bbb:0
    };
    
    this.aaa = {};
    privates.set(this.aaa, this.defaults);
  }
  
  get data(){
    let me = privates.get(this);
    return me;
  }
  
  set data(obj){
    privates.set(this, obj);
  }
}

let public1 = new Public();
let public2 = new Public();

public1.data = {aaa:123, bbb:456};
public2.data = {aaa:456, bbb:789};

console.log(privates.get(public1.aaa));
console.log(public1.data);
console.log(public2.data);
```
[JSBin 예제](http://jsbin.com/gimatejile/edit?js,console)


#### 왜 WeakMap을 사용하지? 

- 객체의 사적인 정보를 저장하기 위해
- 상세 구현 내용을 숨기기 위해 
- ["Hiding Implementation Details with ECMAScript 6 WeakMaps"](http://fitzgeraldnick.com/weblog/53/)


### WeakSet

Object만 값으로 허용하는 value 요소의 집합이다.

#### Set과 가장 큰 차이점은?
- 객체의 집합이며 객체만 저장할 수 있다. 
- 특정 type의 값을 저장할 수는 없다.
- WeakSet내의 객체에 대한 참조는 약하게 연결이 되어 있어 WeakSet내에 저장되어 있는 객체에 대한 참조가 없게되면 garbage collection 대상이되어 수거 된다.
- Iterator가 없다.
