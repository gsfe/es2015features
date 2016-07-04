## Map

`Key`와 `Value`를 가지는 객체 이다. 키값으로 Primitive value 외에도 `Object` 와 `Function`을 사용 할 수 있다.

|  method  |         return value        |
|----------|-----------------------------|
|   get    | 지정된 key로 value를 반환합니다. |
|  delete  | 지정된 key, value를 제거합니다. |
|   set    | 새 key, value를 추가합니다. |
|   has    | 지정된 key값이 있는 경우 true를 반환합니다. |
|  clear   | 요소를 모두 제거합니다. |


```javascript
var map = new Map();
var keyObj = {};
var keyFunc = function () {};

map.set('키', '홍길동');
map.set(keyObj, '이순신');
map.set(keyFunc, '장보고');

map.get('키') === '홍길동'; //true
map.get(keyObj) === '이순신'; //true
map.get(keyFunc) === '장보고'; //true
map.get({}) === undefined; //true
map.get(function () {}) === undefined; //true

map.size === 3; //true
map.has(key1) === true; //true
```
[예제](http://jsbin.com/ronewamuko/edit?js,console)


### 키의 등가성
키의 등가성은 `"same-value" 알고리즘`을 기반으로 한다. 모든 값은 `===` 연산자의 동작에 따라 동일 여부를 판단하며 단, `NaN !== NaN` 에도 불구하고 `NaN` 은 `NaN` 과 동일한 것으로 간주된다.

### Object와 Map의 차이

Object 와 Map 은 둘 다 Key-Value 형태라는 점에서 비슷하기 때문에, 지금까지 Object 는 Map 으로 사용되고 왔다. 하지만 Object 와 Map 사이에는 몇가지 중요한 차이가 존재한다.

- Object는 프로토 타입을 가지고 있기 때문에 기본적으로 몇 개의 키가 존재한다. 물론 `Object.create (null)` 을 사용하여 해결할 수는 있다.
- Object 의 키는 String 이지만, Map 에서는 임의의 값이 키가 될 수 있다.
- Map 의 크기는 쉽게 얻을 수 있지만 Object 의 크기는 수동으로 기록해야 한다.

항상 Map 이 Object 보다 좋다는 것을 의미하지는 않으며 경우에 따라 선택할 필요가 있다.

### Array와의 관계

```javascript
var arr = [["키 1", "값 1"], ["키 2", "값 2"]] ;

//Map 생성자를 사용하여 키 값의 2 차원 배열을 맵으로 변환
var map = new Map(arr) ;

map.get("키 1"); //"값 1"을 리턴
```




## Set

`Value` 값을 가지는 객체이다. `add`로 값을 할당하고 중복되는 값이 있을 땐 새 값이 이전 값을 대체한다.

|  method  |         return value        |
|----------|-----------------------------|
|   add    | 요소를 추가합니다. |
|  delete  | 지정된 요소를 제거합니다. |
|   has    | 지정된 요소가 포함된 경우 true를 반환합니다. |
|  clear   | 요소를 모두 제거합니다. |

```javascript
var set = new Set();
set.add('good').add('bad').add('good');   // Set {'good', 'bad'}
set.size === 2;
set.has('good');
```
[예제](http://jsbin.com/nahetelacu/edit?js,console)



## Map Iterator & Set Iterator

`Map`과 `Set`은 Iterator를 각각 반환하여 `for-of`로 객체의 `key/value` 참조할 수 있다.

|  method  |         return value        |
|----------|-----------------------------|
|   keys   | {"key1", "key2", ...} |
|  values  | {"value1", "value2", ...} |
|  entries | {["key1", "value1"], ["key2", "value2"], ...} |

단 Set의 `keys`와 `entries` Iterator는 key값이 없는 특성상 value 값이 key값으로 반환된다.

```javascript
var map = new Map();
var set = new Set();
map.set('key1', 'value1').set('key2', 'value2');
set.add('value1').add('value2');

//entries Iterator
for (var [key, value] of map) {
    console.log(key +  "="  + value);
}
//위의 for..of 문은 아래와 같다
for (var [key, value] of map.entries()) {
    console.log(key +  "="  + value);
}
//위의 for..of 문은 아래와 같다
map.forEach(function (value, key, map) {
    console.log(key +  "="  + value);
});


for (var [key, value] of set.entries()){
    console.log('key : '+key+', value : '+value);
}
```
[예제](http://jsbin.com/wekaxaqipu/edit?js,console)




## WeakMap & WeakSet

`WeakMap`과 `WeakSet`의 객체에 대한 참조는 약하게 연결이 되어 있어 저장되어 있는 객체에 대한 참조가 없게되면 `garbage collection` 대상이되어 수거 된다. 그리고 반환되는 `Iterator`가 없다.



### Garbage Collection

메모리 할당을 추적하고 할당된 메모리가 더 이상 필요 없어졌을 때 해제하는 작업이다. 하지만 필요없어진 모든 메모리를 해제하는건 아니다.
[[자바스크립트의 메모리 관리]](https://developer.mozilla.org/ko/docs/Web/JavaScript/Memory_Management)



### WeakMap

Object만 key로 허용하고 value는 임의의 값을 허용하는 key/value 요소의 집합이다.

```javascript
var dog = {
    breed: "yorkie"
}

var cat = {
    breed: "burmese"
}

var wm = new WeakMap();
wm.set(dog, "fido");
wm.set(cat, "pepper");

console.log(wm.get(dog));
console.log(wm.get(cat));
dog = null;
console.log(wm.get(dog));
```
[예제](http://jsbin.com/getofajifi/edit?js,console)



#### 왜 WeakMap을 사용하지?

- 객체의 사적인 정보를 저장하기 위해
- 상세 구현 내용을 숨기기 위해
["Hiding Implementation Details with ECMAScript 6 WeakMaps"](http://fitzgeraldnick.com/weblog/53/)

```javascript
let privates = new WeakMap();
class Public {
    constructor () {
      this.defaults = {
          aaa:0,
          bbb:0
      }

        this.aaa = {};
        privates.set(this.aaa, this.defaults);
    }

    get data () {
        let me = privates.get(this);
        return me;
    }

    set data (obj) {
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
[예제](http://jsbin.com/gimatejile/edit?js,console)



### WeakSet

Object만 값으로 허용하는 value 요소의 집합이다.

```javascript
var ws = new WeakSet();
var str = new String("Thomas Jefferson");
var num = new Number(1776);

ws.add(str);
ws.add(num);

console.log(ws.has(str));
console.log(ws.has(num));

ws.delete(str);
console.log(ws.has(str));
```
[예제](http://jsbin.com/huvatahuhe/edit?js,console)
