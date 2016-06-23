## Modules

ES2015 스펙이 확정되기 전까지 자바스크립트에는 모듈 기능이 빠져있어, CommonJS 혹은 AMD 라는 비공식 모듈 스펙을 구현해서 사용해 왔다. 이들과 유사하지만 좀더 확장성있는 형태로 모듈 스펙이 정해졌기 때문에 기존 방식과 혼동되지 않도록 주의해야 한다.


### export

모듈 선언은 아래와 같이 `export` 키워드로 해줄 수 있다. 비공식 모듈 스펙이 함수나 객체를 활용하는 것과 달리 키워드 수준으로 올라온 점이 다르다.

```javascript
export function sum (x, y) {
	return x + y;
}

export function avr (x, y) {
	return (x + y) / 2;
}

export function floor (n) {
	return Math.floor(n);
}

export function abs (n) {
	return Math.abs(n);
}

export var pi = 3.141592

//기본값은 export default 로 표현하고, 하나의 모듈 당 하나만 지정할 수 있다.
export default {
	sum,
	avr,
	floor,
	abs,
	pi
}
```

기본값은 `export default` 로 표현하고, 하나의 모듈 당 하나만 지정할 수 있다.

`export` 할 때 아래와 같이 함수나 변수만 단독으로 `export` 하면 오류가 발생한다.

```javascript
function sum (x, y) {
	return x + y;
}

export sum; //오류 발생
```

아래와 같이 객체 형태로 `export` 해야 오류가 발생하지 않는다.

```javascript
function sum (x, y) {
	return x + y;
}

export { sum }; //정상적으로 export
```

위의 예는 아래와 완전히 동일하게 동작한다.

```javascript
export function sum (x, y) {
	return x + y;
}
```

`default` 의 경우 객체 형태로 `export` 하지 않아도 오류가 발생하지 않는다.

```javascript
function sum (x, y) {
	return x + y;
}

export default sum; //객체로 감싸지 않아도 정상적으로 export
```

모듈은 모듈만의 scope을 갖게 되므로 전역이 오염되지 않는다. 또 `export` 키워드는 외부에 노출한다는 의미일 뿐 `export var pi = 3.14` 라고 선언해도 모듈 내에서 `pi` 변수에 접근 가능한 것은 변함이 없다.



### import

모듈의 가져오는 것은 `import` 키워드로 해줄 수 있다.

기본적으로는 아래와 같이 destructuring 을 사용해서 멤버 중 일부를 가져올 수 있다.

```javascript
'use strict';

//모듈에서 export 한 멤버 중 일부를 가져오기
import { sum, pi } from './module/math';

console.log('sum result: %d', sum(pi, 20));
```


멤버를 가져올 때 별명을 지어서 가져올 수도 있는데, 이때에는 아래와 같이 `as` 키워드를 사용한다.

```javascript
'use strict';

//export 한 멤버를 가져올 때 이름을 바꿔서 가져오기
import { sum as add, pi } from './module/math';

console.log('sum result: %d', add(pi, 20));
```


하나의 멤버가 아니라 모듈에서 `export` 한 모든 멤버를 가져오고 싶다면 아래와 같이 `*` 을 사용하면 된다.
아래의 예에서 `default` 모듈은 `math.default` 로 참조할 수 있다.

```javascript
'use strict';

//모든 모듈을 가져오고 싶을 때는 * 을 이용
import * as math from './module/math';

console.log('sum result: %d', math.sum(math.pi, 20));
```


모듈에서 `export` 할 때 `default` 키워드로 기본값을 지정해줄 수 있는데, 이 기본값을 가져올 때에는 단순하게 destructuring 을 쓰지 않고 별명만 지어주면 된다.

```javascript
'use strict';

//모듈에서 default 를 가져올 때는 destructuring 을 쓰지 않고 별명만 입력
import mathDefault from './module/math';

console.log('sum result: %d', mathDefault.sum(mathDefault.pi, 20));
```


모듈을 통째로 가져와서 해당 위치에서 실행하고 싶다면 아래와 같이 별명없이 `import` 만 사용한다.
```javascript
//파일을 가져와서 그대로 해당 위치에서 실행한다.
import 'underscore';
```

마지막으로 기본값과 다른 멤버들을 동시에 가져오고 싶다면 아래와 같이 사용할 수 있다.

```javascript
'use strict';

//default 멤버와 다른 멤버들을 선택적으로 가져오기
import mathDefault, { sum as add, floor } from './module/math';

console.log('result: %d', floor(add(mathDefault.pi, 20)));
```
