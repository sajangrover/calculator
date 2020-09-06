let operator = [];
let operand = [];

const priority = (ch) =>{
    if(ch=='(')
        return 0
    else if(ch == '+' || ch=='-')
        return 1;
    else if(ch == '*' || ch =='/')
        return 2;
}

const evaluate = () =>{
    const op = operator[operator.length-1];
    operator.pop();
    const b = operand[operand.length-1];
    operand.pop();
    const a = operand[operand.length-1];
    operand.pop();
    switch(op){
        case '+':{
            return a+b;
        }
        case '-':{
            return a-b;
        }
        case '*':{
            return a*b;
        }
        case '/':{
            return a/b;
        }
        default :{
            return 0;
        }
    }
}
const calculate = () =>{
    const input = document.getElementById('data');
    const exp = input.value;
   // console.log(eval(exp))
    let word = "0";
    if(exp[0]=='-'){
        operand.push(0);
    }
    const len = exp.length;
    let result,dot=0;
    for(let i=0 ;i<len;i++){
        if(isNaN(exp[i]) && exp[i]!='.'){
            if(word.length>0){
                if(dot){
                    const data = parseFloat(word);
                    operand.push(data)
                }
                else{
                    operand.push(parseInt(word));
                }
                dot=0;
            }
            if(isNaN(exp[i-1])){
                alert("wrong input");
                return;
            }
            if(exp[i]=='(')
                operator.push(exp[i]);
            else if(exp[i]==')'){
                while(operator.length && operator[operator.length-1]!='('){
                    result = evaluate()
                    operand.push(result);
                }
                if(!operator.length){
                    alert("wrong input");
                    return;
                }
                operator.pop();
            }
            else{
                while(operator.length && priority(operator[operator.length-1]) >= priority(exp[i])){
                    result = evaluate()
                    operand.push(result);
                }
                operator.push(exp[i]);
            }
            word="0";
        }
        else{
            word += exp[i];
            if(exp[i]=='.'){
                dot=1;
            }
        }
    }

    if(word.length){
        if(dot){
            const data = parseFloat(word);
            operand.push(data)
        }
        else{
            operand.push(parseInt(word));
        }
    }
    while(operator.length){
        result = evaluate()
        operand.push(result);
    }
    if(operator.length){
        operand.length=0;
        operator.length=0;
        alert("wrong input");
        return;
    }
    operand.length=0;
    operator.length=0;
    input.value = result;
}

const getValue = (value) => {
    const input = document.getElementById('data');
    if(value=='sqrt'){
        const sqrt = document.getElementsByClassName('sqrt');
        input.value = input.value+sqrt[0].innerText;
    }
    else{
        input.value = input.value+value
    }
}

const clearText = () =>{
    const input = document.getElementById('data');
    input.value = "";
}

const undo = () => {
    const input = document.getElementById('data');
    const val = input.value;
    input.value = val.substr(0,val.length-1);
}

const power = () =>{
    const input = document.getElementById('data');
    const pow = document.getElementsByClassName('pow');
    console.log(pow)
    input.value= input.value + "2".sup();
}