const express = require('express');
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
    res.render('imprimir');
})

//app.listen(3000, () => console.log('Bingo rodando em http://localhost:3000/imprimir'));

const PORT = 3000;
// Usar '0.0.0.0' permite que o servidor ouça em todas as interfaces de rede
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bingo online na rede local!`);
    console.log(`Aceda pelo telemóvel em: http://SEU_IP_AQUI:3000/sorteio`);
});