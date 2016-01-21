'use strict';

//모듈에서 export 한 멤버 중 일부를 가져오기
import { sum, pi } from './module/math';

console.log('sum result: %d', sum(pi, 20));
