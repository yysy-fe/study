const EOF = void 0;
class HTMLLexicalParser {
  constructor(str) {
    this.originalString = str;
    this.tokens = [];
    this.pos = 0;
    this.currentToken = '';
    this.state = null;
  }

  getInput(char) {
    this.addCurToken(char);
    switch(char) {
      case "<": 
        // 识别为标签开始，进入标签状态
        return this.tagOpenState;
      // case "": 
      //   //todo
      //   break;
      default: 
        // 进入文本标签状态
        return this.getInput;
    }
  }

  tagOpenState(char) {
    this.addCurToken(char);
    // 注释
    if (char === "!") { 
      return this.noteState;
    }
    // 标签名
    else if (/[A-z]/.test(char)) {
      return this.tagNameState;
    }
    //不识别
    else {
    }
  }

  noteState(char) {
    
  }

  tagNameState(char) {
    this.addCurToken(char);
    if (/[A-z]/.test(char)) {
      return this.tagNameState;
    }
  }

  addCurToken(char) {
    this.currentToken += char;
    this.pos += 1;
  }


  tokenize() {
    this.state = this.getInput;
    for (let char of this.originalString) {
      this.state = this.state(char);
      console.log(this.currentToken);
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