﻿let readlineSync = require('readline-sync');
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
    { cliente: 'João', lugar: 'A1', filme: 'A Origem' },
    { cliente: 'Maria', lugar: 'A2', filme: 'O Senhor dos Anéis: A Sociedade do Anel' },
    { cliente: 'Pedro', lugar: 'A3', filme: 'Resident Evil 1' },
    { cliente: 'Ana', lugar: 'A4', filme: 'É assim que acaba' },
]

function reservarIngresso(cliente: string, nome: string, lugar: string) {
    console.log(chalk.green(`Ingresso reservado com sucesso para ${cliente} no filme ${nome} no lugar ${lugar}.`));
    
}

function verIngressosReservados() {
    console.log(chalk.yellow('Ingressos reservados:'));
    clientes.forEach(cliente => {
        console.log(chalk.yellow(`Cliente: ${cliente.cliente}, Lugar: ${cliente.lugar}, Filme: ${cliente.filme}`));
    });
}

function adicionarFilmes(filme: string, ano: number, duracao: number, genero: string) {
    filmes.push({ filme, ano, duracao, genero });
    console.log(chalk.green(`Filme ${filme} adicionado com sucesso!`));
}

function adicionarFilmeInterativo() {
    const filme = readlineSync.question(chalk.blue('Digite o nome do filme: '));
    const ano = readlineSync.questionInt(chalk.blue('Digite o ano do filme: '));
    const duracao = readlineSync.questionInt(chalk.blue('Digite a duração do filme em minutos: '));
    const genero = readlineSync.question(chalk.blue('Digite o gênero do filme: '));
    adicionarFilmes(filme, ano, duracao, genero);
}

console.log(chalk.blue('Bem-vindo ao sistema de reservas de ingressos!'));


console.log("Primeiramente, voce é cliente ou funcionario?")
const clienteOuFuncionario = readlineSync.questionInt(chalk.blue('Digite 1 para cliente ou 2 para funcionario: ')) ;
if (clienteOuFuncionario === 1) {
    let continuarComprando: string;
    do {
        console.log(chalk.blue('Escolha um filme:'));
        console.log(filmes.map((filme, index) => `${index} - ${filme.filme} (${filme.ano})`).join('\n'));
        const filmeEscolhido = readlineSync.questionInt(chalk.blue('Digite o número do filme desejado: '));

        console.log(chalk.blue('Escolha um lugar:'));
        console.log(lugares.map((lugar, index) => `${index} - ${lugar.lugar} ${lugar.disponivel ? '(Disponível)' : '(Ocupado)'}`).join('\n'));
        const lugarEscolhido = readlineSync.questionInt(chalk.blue('Digite o número do lugar desejado: '));

        if (lugarEscolhido < 0 || lugarEscolhido >= lugares.length) {
            console.log(chalk.red('Lugar inválido!'));
        } else if (!lugares[lugarEscolhido].disponivel) {
            console.log(chalk.red('Ops, lugar já está ocupado!'));
        } else {
            const cliente = readlineSync.question(chalk.blue('Digite seu nome: '));
            reservarIngresso(cliente, filmes[filmeEscolhido].filme, lugares[lugarEscolhido].lugar);
            lugares[lugarEscolhido].disponivel = false;
            clientes.push({
                cliente,
                lugar: lugares[lugarEscolhido].lugar,
                filme: filmes[filmeEscolhido].filme
            });
            console.log(chalk.green(`Cliente ${cliente} reservado com sucesso!`));
        }

        continuarComprando = readlineSync.question(chalk.blue('Deseja comprar outro ingresso? (sim/não): ')).toLowerCase();
    } while (continuarComprando === 'sim');
}

else if(clienteOuFuncionario === 2){
    console.log(chalk.blue('Escolha uma opção:'));
    console.log('1 - Adicionar filme');
    console.log('2 - Ver ingressos reservados');
    const opcao = readlineSync.questionInt(chalk.blue('Digite o número da opção desejada: ')) ;
    if(opcao == 1){
        adicionarFilmeInterativo();
    }else if(opcao == 2){
        verIngressosReservados();
    }else{
        console.log(chalk.red('Opção inválida!'));
    }
}

console.log(chalk.blue('Obrigado por usar o sistema de reservas de ingressos!'));

