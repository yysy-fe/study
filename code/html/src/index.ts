import { HTMLLexicalParser } from './lexer';

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
console.log('tokens', tokens)