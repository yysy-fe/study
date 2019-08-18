import React, { Component } from 'react';
import { HTMLLexicalParser } from './common/lexer';
import { HTMLSyntaticalParser } from './common/parser';
import TokenRender from './components/tokenRender';
import ASTRender from './components/ASTRender';
import "./App.less"

const htmlString = `<html maaa=a >
  <head x>
      <title>cool</title>
  </head>
  <body>
      <img src=b />
  </body>
</html>`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      htmlString,
      tokens: [],
      ASTTree: {}
    }
  }

  componentDidMount() {
    const { htmlString } = this.state;
    const lexer = new HTMLLexicalParser(htmlString);
    const tokens = lexer.tokenize();
    const parser = new HTMLSyntaticalParser(tokens);
    const ASTTree = parser.parse();
    this.setState({
      tokens,
      ASTTree
    })
  }

  render() {
    const { tokens, ASTTree, htmlString } = this.state;
    return (
      <div className="react-container">
        <div className="source-content">
          <pre>
            {htmlString}
          </pre>
        </div>
        <div className="result-content">
          <TokenRender tokens={tokens} />
          <ASTRender ASTTree={ASTTree} />
        </div>
      </div>
    )
  }
}

export default App;