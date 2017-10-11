let p = new Promise((res, rej) => {
    console.log('create promise');
    res('success');
}).then((data) => {
    console.log(data);
});

console.log('normal print');
