/*const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Função para gerar os números de uma cartela
function gerarDadosCartela() {
    const faixas = { B: [1, 15], I: [16, 30], N: [31, 45], G: [46, 60], O: [61, 75] };
    const cartela = {};
    for (let letra in faixas) {
        let nums = [];
        while(nums.length < 5) {
            let n = Math.floor(Math.random() * (faixas[letra][1] - faixas[letra][0] + 1)) + faixas[letra][0];
            if(!nums.includes(n)) nums.push(n);
        }
        cartela[letra] = nums;
    }
    return cartela;
}

// ROTA: Gerar 4 cartelas para impressão
app.get('/imprimir', (req, res) => {
    const cartelas = [gerarDadosCartela(), gerarDadosCartela(), gerarDadosCartela(), gerarDadosCartela()];
    res.render('imprimir', { cartelas });
});

// ROTA: Sorteador (O Globo)
app.get('/sorteio', (req, res) => {
    res.render('sorteio');
});

app.get('/', (req, res) => {
    res.redirect('/imprimir');
})

//app.listen(3000, () => console.log('Bingo rodando em http://localhost:3000/imprimir'));

const PORT = 3000;
// Usar '0.0.0.0' permite que o servidor ouça em todas as interfaces de rede
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bingo online na rede local!`);
    console.log(`Aceda pelo telemóvel em: http://SEU_IP_AQUI:3000/sorteio`);
});*/

const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('public'));

function gerarDadosCartela() {
    const faixas = { B: [1, 15], I: [16, 30], N: [31, 45], G: [46, 60], O: [61, 75] };
    const cartela = {};
    for (let letra in faixas) {
        let nums = [];
        while(nums.length < 5) {
            let n = Math.floor(Math.random() * (faixas[letra][1] - faixas[letra][0] + 1)) + faixas[letra][0];
            if(!nums.includes(n)) nums.push(n);
        }
        cartela[letra] = nums.sort((a, b) => a - b);
    }
    return cartela;
}

// ROTA RAIZ: Agora oferece as opções
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px; background: #f4f7f6; height: 100vh;">
            <h1>🎰 Bingo Online</h1>
            <p>O que deseja fazer?</p>
            <div style="display: flex; flex-direction: column; gap: 15px; max-width: 300px; margin: auto;">
                <a href="/sorteio" style="padding: 15px; background: #e67e22; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Abrir Painel de Sorteio</a>
                <a href="/jogar" style="padding: 15px; background: #27ae60; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Gerar Minha Cartela (Digital)</a>
                <a href="/imprimir" style="padding: 15px; background: #3498db; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Gerar Cartelas para Imprimir</a>
            </div>
        </div>
    `);
});

app.get('/imprimir', (req, res) => {
    const cartelas = [gerarDadosCartela(), gerarDadosCartela(), gerarDadosCartela(), gerarDadosCartela()];
    res.render('imprimir', { cartelas });
});

// NOVA ROTA: Jogar no Celular
app.get('/jogar', (req, res) => {
    const cartela = gerarDadosCartela();
    res.render('jogar', { cartela });
});

app.get('/sorteio', (req, res) => {
    res.render('sorteio');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});