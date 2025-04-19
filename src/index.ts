let readlineSync = require('readline-sync');
import chalk from 'chalk';

const filmes = [
    { filme: 'A Origem', ano: 2010, duracao: 148, genero: 'Ficção Científica' },
    { filme: 'O Senhor dos Anéis: A Sociedade do Anel', ano: 2001, duracao: 178, genero: 'Fantasia' },
    { filme: 'Resident Evil 1', ano: 2008, duracao: 179, genero: 'Ação' },
    { filme: 'É assim que acaba', ano: 2024, duracao: 179, genero: 'Romance' },
]

const lugares = [
    { lugar: 'A1', disponivel: true },
    { lugar: 'A2', disponivel: true },
    { lugar: 'A3', disponivel: true },
    { lugar: 'A4', disponivel: true },
    { lugar: 'A5', disponivel: true },
]
const clientes = [
    
]

function reservarIngresso(cliente: string, nome: string, lugar: string) {
    console.log(chalk.green(`Ingresso reservado com sucesso para ${cliente} no filme ${nome} no lugar ${lugar}.`));
    
}