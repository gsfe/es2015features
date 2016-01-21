'use strict';

//모듈에서 default 를 가져올 때는 destructuring 을 쓰지 않고 별명만 입력
import mathDefault from './module/math';

console.log('sum result: %d', mathDefault.sum(mathDefault.pi, 20));
