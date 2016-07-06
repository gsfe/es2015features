## let

let은 선언된 블록 유효 범위에 상관없이 전역 또는 함수 유효 범위를 갖는 var 키워드와는 달리, 변수가 사용되는 블록 `{ }` , 구문 또는 표현식 유효 범위를 갖는 변수를 선언한다.

```javascript
let x = 'aaa';

function test () {
    let x = 'bbb';

    if (x == 'bbb') {
        let x = 'ccc';
        console.log('2 : ' + x); //2 : ccc
    }
    console.log('3 : ' + x); //3 : bbb
}

test();
console.log('1 : ' + x); //1 : aaa
```

```javascript
let x = 123;
let x = 456; //TypeError

switch (x) {
    case 0:
        let foo;
        break;

    case 1:
        let foo; //TypeError for redeclaration.
        break;
}
```
동일한 함수 또는 블록 범위에서 동일한 변수를 재선언시 `TypeError`가 발생한다. `switch`문 사용 시에도 하나의 기본 블록만이 있기 때문에 같은 변수명으로 재선언시 에러가 발생한다.


## const

상수선언으로 값에 대한 읽기 전용의 참조를 생성한다. 값은 재할당을 통해 변경할 수 없으며 또한 재선언도 불가능하다. 또한 선언 단계에서 초기화가 반드시 필요하며 let 처럼 블럭단위 유효범위를 갖는다.

```javascript
const MY_FAV = 7;
const MY_FAV = 20; //재선언시 오류 발생
const MY_OBJECT = {"key": "value"};
const FOO; //초기화를 안하면 오류 발생

const b = 20;
if (true) {
    const b = 10;
    console.log(b); //10
}
console.log(b); //20
```


## const 와 Object.freeze

ES5 에도 `Object.freeze` 가 있지만 Primitive 값을 `Freeze` 할 수는 없다.
ES2015 의 `const` 는 Primitive 값도 `Freeze` 할 수 있다.

하지만 `const` 로 생성한 변수에 `Object` 를 할당하면, 해당 `Object` 의 멤버는 자유롭게 추가변경 가능하다.
반대로 `Object.freeze` 로 객체를 `Freeze` 하면 객체의 멤버는 `Freeze` 되지만, 객체를 담은 변수에는 (당연히..) 다른 객체가 담길 수 있다. 
하지만 아래와 같이 선언하면 객체가 담기는 변수와 객체 자체 모두 `immutable` 하게 된다.

```javascript
const obj = Object.freeze({ name: '홍길동', age: 30});
```

이런 상태에서 `Freeze` 된 객체에 값을 할당하려고 할 때 두 가지 케이스가 나뉘게 된다.
하나는 `strict` 모드일때와 또 하나는 `strict` 모드가 아닐때.

`"use strict"`를 선언해서 `strict` 모드일때는 `Freeze` 된 객체의 멤버를 변경하려고 할때 `TypeError` 가 발생하지만, `strict` 모드가 아닐때는 에러없이 그냥 무시만 된다. 이 점을 주의해야 한다.

`Object.freeze` 로 객체를 `Freeze` 하면 해당 객체의 멤버들은 `Freeze` 되지만, 멤버 중 객체가 있었다면 멤버 객체의 멤버는 `Freeze` 되지 않는다.

```javascript
"use strict";
const obj = Object.freeze({ name: '홍길동', age: 30, hobby: ['축구', '농구']});

obj.name = '이순신'; //TypeError;
obj.hobby.push('족구');
console.log(obj.hobby); //['축구', '농구', '족구']
```

멤버의 멤버까지 모두 immutable 하게 하려면 하위 멤버들을 할당할 때 모두 `Object.freeze` 로 `Freeze` 해주어야 한다.

참고로, `Map`과 `Set`은 `Freeze`되지 않는다.



## Template literal

ES6에 추가된 새로운 형태의 String 표기법 이다. 이는 기존의 String 표기에 javascript Value을 넣을 수 있게 해준다. 다만 ' 또는 " 가 아닌 Backtick(\`)을 사용하여 표기한다.

```javascript
//작은 따옴표 및 큰 따옴표를 사용할 때와 동일하게 선언한다.
var aaa = `string text`;

var name = `홍길동`;
//아래 두 선언은 완전히 동일하다.
var bbb = `내 이름은 ${name} 입니다`;
var ccc = "내 이름은 " + name + " 입니다";
```


템플릿 리터럴은 보통의 문자열과는 달리 Multi-line 을 (새로운 줄`newline`과 들여쓰기를 포함한, 템플릿 리터럴 내의 모든 `whitespace`는 그대로 포함되어 출력) 지원하며, 템플릿 리터럴 내의 내용을 그대로 출력해야하는 경우 `\` 추가한다.

```javascript
//멀티라인을 지원
var multi_line_message = `<h1>Watch out!</h1>
                             <p>Unauthorized hockeying can result in penalties
                             of up to ${maxPenalty} minutes.</p>`;

//템플릿 리터럴 내의 내용을 그대로 출력해야하는 경우 `\` 를 사용한다.
var normal_message = `\`To display a message, write alert(\${hello})\``;
//위의 선언은 아래와 동일하다.
var message = "`To display a message, write alert(${hello})`";

console.log(normal_message); //`To display a message, write alert(${hello})`
```

템플릿 리터럴은 표현식에도 접근할 수 있다.

```javascript
var aaa = 10;
var bbb = 5.5;

var ccc = `계산도 가능 : ${ Math.round(aaa + bbb) }`;
console.log(ccc); //계산도 가능 : 16
```



### Tagged Template literal

템플릿 리터럴의 내용을 함수를 사용해서 변형할 수 있는 기능도 제공하고 있다.

```javascript
var a = 5;
var b = 10;

function tag (strings, ...values) {
    console.log(strings[0]); //"Hello "
    console.log(strings[1]); //" world "
    console.log(values[0]); //15
    console.log(values[1]); //50

    return "안녕하세요!";
}

let message = tag`Hello ${ a + b } world ${ a * b }`;
console.log(message); //"안녕하세요!"
```


이런 기능을 활용해서 아래와 같이 HTML태그를 제거해서 출력하는 용도 등으로 활용할 수 있다.

```javascript
var xss = "<script>alert('xss');</script>";
var message = stripTags`<p>${xss} : 안전한 텍스트입니다.</p>`;

function stripTags (strings, ...values) {
    return strings.map((str, i) => {
        return str + (values[i] || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }).join('');
}

console.log(message);
//<p>&lt;script&gt;alert('xss');&lt;/script&gt; : 안전한 텍스트입니다.</p>
```
