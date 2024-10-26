const lockScreen = document.getElementById('lock-screen');
const homeScreen = document.getElementById('home-screen');
const homeButton = document.querySelector('.home-button');
const appScreens = document.querySelectorAll('.app-screen');
const balanceDisplay = document.getElementById('balance');
const transferHistory = document.getElementById('transfer-history');
const batteryPercentageDisplay = document.getElementById('battery-percentage');
const currentTimeDisplay = document.getElementById('current-time');
const lockTimeDisplay = document.getElementById('lock-time');

let balance = 1000;
let batteryPercentage = 100;

// Função para atualizar o horário em tempo real
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    
    currentTimeDisplay.textContent = currentTime;
    lockTimeDisplay.textContent = currentTime;
}

// Função para atualizar a bateria
function updateBattery() {
    if (batteryPercentage > 0) {
        batteryPercentage -= 1;
        batteryPercentageDisplay.textContent = `${batteryPercentage}%`;
    }
}

// Ação ao clicar na tela de bloqueio
lockScreen.addEventListener('click', () => {
    lockScreen.classList.remove('active');
    homeScreen.classList.add('active');
    homeButton.style.display = 'block';
});

// Ação ao clicar nos ícones dos aplicativos
document.querySelectorAll('.app-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const appId = icon.getAttribute('data-app') + '-app';
        openApp(appId);
    });
});

// Função para abrir aplicativos
function openApp(appId) {
    homeScreen.classList.remove('active');
    document.getElementById(appId).classList.add('active');
}

// Ação ao clicar no botão Home
homeButton.addEventListener('click', () => {
    appScreens.forEach(screen => screen.classList.remove('active'));
    homeScreen.classList.add('active');
});

// Ação ao clicar no botão de transferir
document.getElementById('transfer-button').addEventListener('click', () => {
    const cpf = document.getElementById('cpf-input').value;
    const amount = parseFloat(document.getElementById('amount-input').value);

    if (amount > 0 && amount <= balance) {
        balance -= amount;
        balanceDisplay.textContent = balance;
        const listItem = document.createElement('li');
        listItem.textContent = `CPF: ${cpf}, Valor: R$${amount}`;
        transferHistory.appendChild(listItem);
    } else {
        alert('Saldo insuficiente ou valor inválido.');
    }
});

// Função para manipular a entrada da calculadora
let displayValue = '';

function handleCalculatorInput(input) {
    if (input === 'C') {
        displayValue = '';
    } else if (input === '=') {
        displayValue = eval(displayValue).toString();
    } else {
        displayValue += input;
    }
    document.getElementById('calculator-display').value = displayValue;
}

// Atualizar o tempo a cada segundo
setInterval(updateTime, 1000);

// Atualizar a bateria a cada 3 segundos
setInterval(updateBattery, 3000);