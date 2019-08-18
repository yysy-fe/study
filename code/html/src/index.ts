import { HTMLLexicalParser } from './lexer';
import { HTMLSyntaticalParser } from './parser';

const testHTML = `<html maaa=a >
    <head x>
        <title>cool</title>
    </head>
    <body>
        <img src=b />
    </body>
</html>`;

let lexer = new HTMLLexicalParser(testHTML);
let tokens = lexer.tokenize();
let parser = new HTMLSyntaticalParser(tokens);
let ASTTree = parser.parse();
console.log('ASTTree', ASTTree)