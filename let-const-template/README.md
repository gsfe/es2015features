## let

let은 선언된 블록 유효 범위에 상관없이 전역 또는 함수 유효 범위를 갖는 var 키워드와는 달리, 변수가 사용되는 블록 `{}` , 구문 또는 표현식 유효 범위를 갖는 변수를 선언한다.

```javascript
let x = 'aaa';
function a(){
  let x = 'bbb';
  if(x == 'bbb'){
    let x = 'ccc';
    let x = 'fff';  // TypeError
    console.log('2 : ' + x);  // 2 : ccc
  }
  console.log('3 : ' + x);    // 3 : bbb
}
a();
console.log('1 : ' + x);      // 1 : aaa

switch (x) {
  case 0:
    let foo;
    break;
    
  case 1:
    let foo; // TypeError for redeclaration.
    break;
}
```
동일한 함수 또는 블록 범위에서 동일한 변수를 재선언시 TypeError가 발생한다. 또한 switch문 사용 시에는 하나의 기본 블록만이 있기 때문에 에러가 발생할 수 있다.


## const

상수선언으로 값에 대한 읽기 전용의 참조를 생성합니다. 값은 재할당을 통해 변경할 수 없으며 또한 재선언도 불가능하다. 또한 상수 초기화(initializer)가 반드시 필요하다.

```javscript
const MY_FAV = 7;
const MY_FAV = 20; // error
const MY_OBJECT = {"key": "value"};
const FOO; // SyntaxError: missing = in const declaration

const b = 20;
if(true){
  const b = 10;
  console.log(b);
}
console.log(b);
```


## Template String

ES6에 추가된 새로운 형태의 String 표기법 이다. 이는 기존의 String 표기에 javascript Value을 넣을 수 있게 해준다. 다만 ' 또는 " 가 아닌 Backtick( ' )을 사용하여 표기한다. 

```javascript
`string text`
`string text ${expression} string text` 
// "string text" + expression + "string text"
```

Template String은 보통의 문자열과는 달리 Multi-line를 (새로운 줄`newline`과 들여쓰기를 포함한, template string 내의 모든 `whitespace`는 그대로 포함되어 출력 ) 제공하며, Markdown에서 사용 할 경우 여러개의 backtick을 넣어 표현한다.

```javascript
var message = `<h1>Watch out!</h1>
               <p>Unauthorized hockeying can result in penalties
               of up to ${maxPenalty} minutes.</p>`;

To display a message, write ``alert(`hello world!`)``.
```


### Tagged Template

Template string은 반복이나 조건을 위한 내장 구문 ( if...else, each 등) 을 가지고 있지 않기에 여러 Template library를 대체 하고자 추가된 기능이 아니다. 그러나 Handlebars의 `helper` 처럼 기능을 확장하기 위한 새로운 형태를 제공한다.

```javascript
var a = 5;
var b = 10;

function tag(strings, ...values) {
  console.log(strings[0]); // "Hello "
  console.log(strings[1]); // " world "
  console.log(values[0]);  // 15
  console.log(values[1]);  // 50

  return "Bazinga!";
}

let message = tag``Hello ${ a + b } world ${ a * b }``;
console.log(message); // "Bazinga!"



var bonk = {sender:"Hacker Steve <script>alert('xss');</script>"};
var message = SaferHTML``<p>${bonk.sender} has sent you a bonk.</p>``;

function SaferHTML(templateData) {
  var s = templateData[0];
  for (var i = 1; i < arguments.length; i++) {
    
    var arg = String(arguments[i]);
    s += arg.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // template 안의 특수문자는 escape 하지 않습니다.
    s += templateData[i];
  }
  return s;
}
console.log(message); 
//<p>Hacker Steve &lt;script&gt;alert('xss');&lt;/script&gt; has sent you a bonk.</p>
```

