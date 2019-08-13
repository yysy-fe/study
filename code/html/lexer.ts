const EOF = void 0;
function append (key: string, value: any): void {
  this[key] = this[key] + value;
}

interface String {
  _isEqualSymb: () => {};
  _isBiggerSymb: () => {};
  _isSmallerSymb: () => {};
  _isSlash: () => {};
  _isBlank: () => {};
  _isExclamation: () => {};
  _isDash: () => {};
  _isLetter: () => {};
}

String.prototype._isEqualSymb = function (): boolean {
  return this == '=';
};

String.prototype._isBiggerSymb = function () {
  return this == '>';
};

String.prototype._isSmallerSymb = function () {
  return this == '<';
};

String.prototype._isSlash = function () {
  return this == '/';
};

String.prototype._isBlank = function () {
  return this == ' ';
};

String.prototype._isExclamation = function () {
  return this == '!';
};

String.prototype._isDash = function () {
  return this == '-';
};

String.prototype._isLetter = function () {
  return /[A-z]/.test(this);
};

class Prop {
  name: string;
  value: string;
  append (key: string, value: any): void {
    this[key] = this[key] + value;
  };
}

class Token {
  name: string;
  props: Prop[];
  type: string;
  append (key: string, value: any): void {
    this[key] = this[key] + value;
  };
}

class NoteTagToken extends Token {
  constructor(name: string) {
    super();
    this.type = 'note-tag';
    this.name = name;
  }
}

class StartTagToken extends Token {
  constructor(name: string) {
    super();
    this.type = 'start-tag';
    this.name = name;
  }
};

class HTMLLexicalParser {
  originalString: string;
  tokens: object[];
  prop: Prop | null;
  token: StartTagToken | NoteTagToken | null;
  state: any;
  error: any;

  constructor(str) {
    this.originalString = str;
    this.tokens = [];
    this.prop = null;
    this.token = null;
    this.state = null;
  }

  // <!- 进入注释判断状态机
  noteStartState(char: string) {
    if (char._isDash()) {
      this.token.append('name', char);
      return this.noteCheckDoubleSignState;
    } else {
      this.error();
    }
  }

  // <!-- 进入注释判断第二个“-”的状态机
  noteCheckDoubleSignState(char: string) {
    if (char._isDash()) {
      this.token.append('name', char);
      return this.noteContentState;
    } else {
      this.error("");
    }
  }

  // 注释内容
  noteContentState(char: string) {
    if (char._isDash()) {
      this.token.append('name', char);
      return this.noteCheckEndState;
    } else {
      this.token.append('name', char)
      return this.noteContentState;
    }
  }

  // -- 进入注释确认是否结束状态机 
  noteCheckEndState(char: string) {
    if (char._isDash()) {
      this.token.append('name', char);
      return this.noteEndState;
    } else {
      return this.noteContentState;
    }
  }
 
  // --> 进入注释节点完成状态机 
  noteEndState(char: string) {
    if (char._isBiggerSymb) {
      this.token.append('name', char);
      this.emitToken();
      return this.getInput;
    } else {
      return this.noteContentState;
    }
  }

  // 初始接受字符状态机
  getInput(char: string) {
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

  // <字符 标签开始的状态机
  tagOpenState(char: string) {
    if (char === "!") { 
      // 注释
      this.token = new NoteTagToken(char);
      return this.noteStartState;
    } else if (char._isSlash) { 
      // 关闭标签

    } else if (/[A-z]/.test(char)) { 
      // 标签名
      this.token = new StartTagToken(char);
      return this.tagNameState;
    } else { 
      //不识别
      this.error();
    }
  }

  // 进入标签名状态机
  tagNameState(char: string) {
    if (/[A-z]/.test(char)) { 
      // 标签名
      this.token.append('name', char);
      return this.tagNameState;
    } else if (/\s/.test(char)) { 
      // 空格、换行等
      return this.attrStartState;
    } else if (char._isBiggerSymb) { 
      // 标签结束
      
    } else if (char._isSlash) { 
      // 标签自关闭
    } else { 
      // 不识别
      this.error('')
    }
  }

  attrStartState(char: string) {
    if (/\s/.test(char)) {
      // 空格、换行等
      return this.attrStartState;
    } else if (char._isSlash) {
      // 标签自关闭
    } else if (char._isBiggerSymb) {
      // 标签结束
    } else if (/[A-z]/.test(char)) {
      //属性名
      !this.prop && (this.prop = new Prop());
      this.prop.append('name', char);
      return this.attrNameState;
    }
  }

  attrNameState(char: string) {
    if (/[A-z]/.test(char)) {
      //属性名
      this.prop.append('name', char);
      return this.attrNameState;
    } else if (char === ' ') {
      return this.attrNameState;
    } else if (char === '=') {
      return this.attrValueState;
    } else if (char._isSlash) {
      // 标签自关闭
    } else if (char._isBiggerSymb) {

    } else {
      this.error('');
    }
  }

  attrValueState(char: string) {
    
  }

  emitToken() {
    this.tokens.push(this.token);
    this.token = null;
  }

  tokenize() {
    this.state = this.getInput;
    for (let char of this.originalString.split('')) {
      this.state = this.state(char);
    }
    return this.tokens;
  } 
}


const testHTML = `<!--<html maaa=a >
    <head>
        <title>cool</title>
    </head>
    <body>
        <img src="a" />
    </body>
</html> -->`;

let tokens = new HTMLLexicalParser(testHTML).tokenize();
console.log('tokens', tokens)