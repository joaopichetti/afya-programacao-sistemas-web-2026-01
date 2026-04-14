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

// --- LÓGICA DO TODO LIST ---
let tarefas = [];
let indiceTarefaSelecionada = -1;

const inputTarefa = document.querySelector('#tarefa');
const btnSalvar = document.querySelector('#btnSalvar');
btnSalvar.addEventListener('click', salvarTarefa);
const listaTarefas = document.querySelector('#listaTarefas');

function renderizarTarefas() {
    listaTarefas.innerHTML = '';
    for (let indice = 0; indice < tarefas.length; indice++) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const btnRemover = document.createElement('button');

        span.textContent = tarefas[indice];
        btnRemover.textContent = 'Remover';
        btnRemover.classList.add('btn-remover');
        btnRemover.addEventListener('click', 
            () => removerTarefa(indice));

        li.appendChild(span);
        li.appendChild(btnRemover);
        li.addEventListener('click', 
            () => carregarTarefaParaEdicao(indice));

        listaTarefas.appendChild(li);
    }
}

function salvarTarefa() {
    const text = inputTarefa.value.trim();
    if (text === '') return;

    if (indiceTarefaSelecionada < 0) {
        tarefas.push(text);
        alert('Tarefa criada com sucesso!');
    } else {
        tarefas[indiceTarefaSelecionada] = text;
        alert('Tarefa atualizada com sucesso!');
        indiceTarefaSelecionada = -1;
        btnSalvar.textContent = 'Adicionar';
    }

    inputTarefa.value = '';
    inputTarefa.focus();
    renderizarTarefas();
}

function carregarTarefaParaEdicao(indice) {
    console.log('Iniciou a edição da tarefa');
    inputTarefa.value = tarefas[indice];
    inputTarefa.focus();
    indiceTarefaSelecionada = indice;
    btnSalvar.textContent = 'Atualizar';
}

function removerTarefa(indice) {
    console.log('Iniciou a remoção da tarefa');
    event.stopPropagation();

    const confirmacao = confirm('Deseja realmente excluir esta tarefa?');
    if (confirmacao) {
        tarefas.splice(indice, 1);
        renderizarTarefas();
        alert('Tarefa excluída com sucesso');

        if (indiceTarefaSelecionada === indice) {
            indiceTarefaSelecionada = -1;
            btnSalvar.textContent = 'Adicionar';
            inputTarefa.value = '';
            inputTarefa.focus();
        }
    }
}