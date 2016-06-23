'use strict';

//모든 모듈을 가져오고 싶을 때는 * 을 이용
import * as math from './module/math';

console.log('sum result: %d', math.sum(math.pi, 20));

//default 모듈은 default 라는 이름으로 제공
console.log(math);
