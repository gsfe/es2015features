'use strict';

//default 멤버와 다른 멤버들을 선택적으로 가져오기
import mathDefault, { sum as add, floor } from './module/math';

console.log('result: %d', floor(add(mathDefault.pi, 20)));
