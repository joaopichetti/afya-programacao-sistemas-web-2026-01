console.log('Olá, Mundo! Este é o primeiro projeto JavScript');
        
// --- LÓGICA DA CALCULADORA ---
function calcular() {
    const valor1 = Number(document.getElementById('valor1').value);
    const valor2 = Number(document.getElementById('valor2').value);
    const operacao = document.getElementById('operacao').value;
    const resultado = calcularResultado(valor1, valor2, operacao);
    
    const displayResultado = document.getElementById('resultado');
    displayResultado.textContent = resultado;
    const boxResultado = document.getElementById('resultado-box');
    
    if (typeof resultado === 'string') {
        boxResultado.classList.add('error');
        boxResultado.classList.remove('success');
    } else {
        boxResultado.classList.add('success');
        boxResultado.classList.remove('error');
    }
}

function calcularResultado(valor1, valor2, operacao) {
    let resultado = 0;
    
    if (operacao === 'soma') {
        resultado = valor1 + valor2;
    } else if (operacao === 'subtracao') {
        resultado = valor1 - valor2;
    } else if (operacao === 'multiplicacao') {
        resultado = valor1 * valor2;
    } else if (operacao === 'divisao') {
        if (valor2 === 0) {
            resultado = 'Erro: Divisão por 0';
        } else {
            resultado = valor1 / valor2;
        }
    } else if (operacao === 'resto') {
        if (valor2 === 0) {
            resultado = 'Erro: Divisão por 0';
        } else {
            resultado = valor1 % valor2;
        }
    } else {
        resultado = 'Operação inválida';
    }

    return resultado;
}