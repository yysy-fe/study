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
  _isNumOrLetter: () => {};
}

String.prototype._isEqualSymb = function (): boolean {
  return this == '=';
};

String.prototype._isBiggerSymb = function (): boolean {
  return this == '>';
};

String.prototype._isSmallerSymb = function (): boolean {
  return this == '<';
};

String.prototype._isSlash = function (): boolean {
  return this == '/';
};

String.prototype._isBlank = function (): boolean {
  return this == ' ';
};

String.prototype._isExclamation = function (): boolean {
  return this == '!';
};

String.prototype._isDash = function (): boolean {
  return this == '-';
};

String.prototype._isLetter = function (): boolean {
  return /[A-z]/.test(this);
};


String.prototype._isNumOrLetter = function (): boolean {
  return /[A-z0-9]/.test(this);
};

class Prop {
  name: string;
  value: string;
  append (key: string, value: any): void {
    this[key] = this[key] === void 0 ? value : this[key] + value;
  };
}

class Token {
  name: string;
  props?: Prop[];
  type: string;
  selfClosed?: boolean;
  append (key: string, value: any): void {
    this[key] = this[key] + value;
  };

  constructor(initName: string, type: string ) {
    this.name = initName;
    this.type = type;
  }
}

class NoteTagToken extends Token {
  constructor(name: string) {
    super(name, 'note-tag');
    this.props = [];
  }
}

class StartTagToken extends Token {
  constructor(name: string) {
    super(name, 'start-tag');
    this.props = [];
  }
};

class EndTagToken extends Token {
  constructor(name: string) {
    super(name, 'end-tag');
  }
}

class TextToken extends Token {
  constructor(name: string) {
    super(name, 'text-node')
  }
}

class HTMLLexicalParser {
  originalString: string;
  tokens: object[];
  prop: Prop;
  token: StartTagToken | NoteTagToken | EndTagToken | TextToken | null;
  state: any;

  constructor(str: string) {
    this.originalString = str;
    this.tokens = [];
    this.prop = null;
    this.token = null;
    this.state = null;
  }

  // <!- 注释状态
  noteStartState(char: string) {
    if (char._isDash()) {
      this.token.append('name', char);
      return this.noteCheckDoubleSignState;
    } else {
      this.error('注释状态' + char);
    }
  }

  // <!-- 注释双-确认状态
  noteCheckDoubleSignState(char: string) {
    if (char._isDash()) {
      this.token.append('name', char);
      return this.noteContentState;
    } else {
      this.error("注释双-确认状态" + char);
    }
  }

  // 注释内容状态
  noteContentState(char: string) {
    if (char._isDash()) {
      this.token.append('name', char);
      return this.noteCheckEndState;
    } else {
      this.token.append('name', char)
      return this.noteContentState;
    }
  }

  // -- 注释结束判断状态 
  noteCheckEndState(char: string) {
    if (char._isDash()) {
      this.token.append('name', char);
      return this.noteEndState;
    } else {
      return this.noteContentState;
    }
  }
 
  // --> 注释结束状态
  noteEndState(char: string) {
    if (char._isBiggerSymb()) {
      this.token.append('name', char);
      this.emitToken();
      return this.getInput;
    } else {
      // 回到注释内容
      return this.noteContentState;
    }
  }

  // 初始状态 || 标签结束状态
  getInput(char: string) {
    if (char._isSmallerSymb()) {
      this.emitToken();
      return this.tagOpenState;
    } else {
      if (this.token) {
        this.token.append('name', char);
      }
      else {
        this.token = new TextToken(char)
      }
      return this.getInput
    }
  }

  // <字符 标签开始状态
  tagOpenState(char: string) {
    if (char._isExclamation()) { 
      // 注释
      this.token = new NoteTagToken(char);
      return this.noteStartState;
    } else if (char._isSlash()) { 
      // 关闭标签
      return this.endTagCheckState;
    } else if (char._isLetter()) { 
      // 标签名
      this.token = new StartTagToken(char);
      return this.tagNameState;
    } else { 
      //不识别
      this.error('标签开始状态' + char);
    }
  }

  // 关闭标签确认状态
  endTagCheckState(char: string) {
    if (char._isLetter()) {
      this.token = new EndTagToken(char);
      return this.endTagState;
    } else {
      this.error('关闭标签确认状态' + char);
    }
  }

  // 关闭标签状态
  endTagState(char: string) {
    if (char._isLetter()) {
      this.token.append('name', char);
      return this.endTagState;
    } else if (char._isBiggerSymb()) {
      this.emitToken();
      return this.getInput;
    } else {
      this.error('关闭标签状态' + char);
    }
  }

  // 标签名状态
  tagNameState(char: string) {
    if (char._isNumOrLetter()) { 
      // 标签名
      this.token.append('name', char);
      return this.tagNameState;
    } else if (/\s/.test(char)) { 
      // 空格、换行等
      return this.attrStartState;
    } else if (char._isBiggerSymb()) { 
      // 标签结束
      this.emitToken();
      return this.getInput;
    } else if (char._isSlash()) { 
      // 标签自关闭
      return this.tagSelfCloseState;
    } else { 
      // 不识别
      this.error('标签名状态' + char)
    }
  }

  // 属性开始状态
  attrStartState(char: string) {
    if (/\s/.test(char)) {
      // 空格、换行等
      return this.attrStartState;
    } else if (char._isSlash()) {
      // 标签自关闭
      return this.tagSelfCloseState;
    } else if (char._isBiggerSymb()) {
      // 标签结束
      this.emitToken();
      return this.getInput;
    } else if (char._isLetter()) {
      //属性名
      !this.prop && (this.prop = new Prop());
      this.prop.append('name', char);
      return this.attrNameState;
    }
  }

  // 属性名状态
  attrNameState(char: string) {
    if (char._isNumOrLetter()) {
      //属性名
      this.prop.append('name', char);
      return this.attrNameState;
    } else if (char._isBlank()) {
      return this.attrNameState;
    } else if (char._isEqualSymb()) {
      return this.attrValueCheckState;
    } else if (char._isSlash()) {
      // 标签自关闭
      return this.tagSelfCloseState;
    } else if (char._isBiggerSymb()) {
      // 有一个属性无等号时标签结束，该属性值默认为 true
      this.prop.append('value', true);
      return this.getInput;
    } else {
      this.error('属性名状态' + char);
    }
  }

  // 属性值确认状态
  attrValueCheckState(char: string) {
    if (char._isNumOrLetter()) {
      this.prop.append('value', char);
      return this.attrValueState;
    } else {
      this.error('属性值确认状态' + char);
    }
  }

  // 属性值状态
  attrValueState(char: string) {
    if (char._isNumOrLetter()) {
      // 还是属性值状态
      this.prop.append('value', char);
      return this.attrValueState;
    } else if (char._isBlank()) {
      // 一个属性结束
      this.emitProp();
      return this.attrStartState;
    } else if (char._isSlash()) {
      // 标签自关闭
      return this.tagSelfCloseState;
    }  else if (char._isBiggerSymb()) {
      // 标签结束
      this.emitToken();
      return this.getInput;
    } else {
      this.error('属性值状态' + char);
    }
  }

  // 标签自结束状态
  tagSelfCloseState(char: string) {
    if (char._isBiggerSymb()) {
      this.token.selfClosed = true;
      this.emitToken();
      return this.getInput;
    } else {
      this.error('标签自结束状态' + char);
    }
  }

  // 结束标签确认状态
  closeTagCheckState(char: string) {
    if (char._isLetter()) {
      return this.closeTagState;
    } else {
      this.error('结束标签确认状态' + char);
    }
  }

  // 结束标签状态
  closeTagState(char: string) {
    if (char._isLetter()) {
      return this.closeTagState;
    } else if (char._isBiggerSymb()) {
      return this.getInput;
    } else {
      this.error('结束标签状态' + char);
    }
  } 

  emitProp() {
    if (this.token) {
      this.token.props.push(this.prop);
      this.prop = null;
    }
  }

  emitToken() {
    if (this.prop) {
      this.emitProp();
    }
    if (this.token) {
      this.tokens.push(this.token);
      this.token = null;
    }
  }

  error(msg: string = '') {
    console.error(msg);
  }

  tokenize() {
    this.state = this.getInput;
    for (let char of this.originalString.split('')) {
      this.state = this.state && this.state(char);
    }
    return this.tokens;
  } 
}


const testHTML:string = `<html maaa=a >
    <head x>
        <title>cool</title>
    </head>
    <body>
        <img src=b />
    </body>
</html>`;

let lexer = new HTMLLexicalParser(testHTML);
let tokens = lexer.tokenize();
console.log('tokens', tokens)