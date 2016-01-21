'use strict';

//export 한 멤버를 가져올 때 이름을 바꿔서 가져오기
import { sum as add, pi } from './module/math';

console.log('sum result: %d', add(pi, 20));
