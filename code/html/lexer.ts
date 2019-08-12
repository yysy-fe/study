const EOF = void 0;
class HTMLLexicalParser {
  originalString: string;
  tokens: object[];
  currentToken: object|null;
  state: any;
  error: any;

  constructor(str) {
    this.originalString = str;
    this.tokens = [];
    this.currentToken = null;
    this.state = null;
  }



  getInput(char: string) {
    // this.addCurToken(char);
    switch(char) {
      case "<": 
        // 识别为标签开始，进入标签开始状态
        return this.tagOpenState;
      // case "": 
      //   //todo
      //   break;
      default: 
        // 进入文本标签状态
        return this.getInput;
    }
  }

  tagOpenState(char: string) {
    // 注释
    if (char === "!") { 
      return this.noteState;
    }
    // 标签名
    else if (/[A-z]/.test(char)) {
      this.addCurToken(char, 'tagName');
      return this.tagNameState;
    }
    //不识别
    else {
    }
  }

  noteState(char: string) {
    
  }

  tagNameState(char: string) {
    if (/[A-z]/.test(char)) { // 标签名
      this.addCurToken(char, 'tagName');
      return this.tagNameState;
    } else if (/\s/.test(char)) { // 空格、换行等
      return this.attrState;
    } else if (char === '>') { // 函数结束

    } else if (char === '/') { // 函自关闭
    } else { // 不识别
      this.error('')
    }
  }

  attrState(char: string) {
    
  }

  addCurToken(char: string, type: string) {
    this.currentToken += char;
  }


  tokenize() {
    this.state = this.getInput;
    for (let char of this.originalString) {
      this.state = this.state(char);
    }
    return this.tokens;
  }
  
}

const testHTML = `<html maaa=a >
    <head>
        <title>cool</title>
    </head>
    <body>
        <img src="a" />
    </body>
</html>`;

let tokens = new HTMLLexicalParser(testHTML).tokenize();
// console.log('tokens', tokens)