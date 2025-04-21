let readlineSync = require('readline-sync');
import chalk from 'chalk';

const filmes = [
    { filme: 'A Origem', ano: 2010, duracao: 148, genero: 'Ficção Científica' },
    { filme: 'O Senhor dos Anéis: A Sociedade do Anel', ano: 2001, duracao: 178, genero: 'Fantasia' },
    { filme: 'Resident Evil 1', ano: 2008, duracao: 179, genero: 'Ação' },
    { filme: 'É assim que acaba', ano: 2024, duracao: 179, genero: 'Romance' },
];

const lugares = [
    { lugar: 'A1', disponivel: true },
    { lugar: 'A2', disponivel: true },
    { lugar: 'A3', disponivel: true },
    { lugar: 'A4', disponivel: true },
    { lugar: 'A5', disponivel: true },
];

const clientes = [
    { cliente: 'João', lugar: 'A1', filme: 'A Origem' },
    { cliente: 'Maria', lugar: 'A2', filme: 'O Senhor dos Anéis: A Sociedade do Anel' },
    { cliente: 'Pedro', lugar: 'A3', filme: 'Resident Evil 1' },
    { cliente: 'Ana', lugar: 'A4', filme: 'É assim que acaba' },
    
];

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

function menuCliente() {
    let continuar: string;
    do {
        console.log(chalk.blue('Escolha um filme:'));
        filmes.forEach((f, i) => {
            console.log(`${i} - ${f.filme} (${f.ano})`);
        });
        const filmeEscolhido = readlineSync.questionInt(chalk.blue('Digite o número do filme desejado: '));

        console.log(chalk.blue('Escolha um lugar:'));
        lugares.forEach((l, i) => {
            console.log(`${i} - ${l.lugar} ${l.disponivel ? '(Disponível)' : '(Ocupado)'}`);
        });
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
        }

        continuar = readlineSync.question(chalk.blue('Deseja comprar outro ingresso? (sim/não): ')).toLowerCase();
    } while (continuar === 'sim');
}

function menuFuncionario() {
    console.log(chalk.blue('Escolha uma opção:'));
    console.log('1 - Adicionar filme');
    console.log('2 - Ver ingressos reservados');
    const opcao = readlineSync.questionInt(chalk.blue('Digite o número da opção desejada: '));

    if (opcao === 1) {
        adicionarFilmeInterativo();
    } else if (opcao === 2) {
        verIngressosReservados();
    } else {
        console.log(chalk.red('Opção inválida!'));
    }
}

function menuPrincipal() {
    let continuarSistema: string;
    do {
        console.log(chalk.blue('\n Bem-vindo ao sistema de reservas de ingressos! 🎥💗'));
        console.log(chalk.magenta('----------------------------------------'));

        console.log(chalk.blue('1. Cliente'));
        console.log(chalk.blue('2. Funcionário'));
        console.log(chalk.redBright('0. Sair'));
        const tipoUsuario = readlineSync.questionInt(chalk.blue('Primeiramente, voce e cliente ou funcionario?: '));
        
        

        if (tipoUsuario === 1) {
            menuCliente();
        } else if (tipoUsuario === 2) {
            menuFuncionario();
        } else if (tipoUsuario === 0) {
            console.log(chalk.blue('Saindo do sistema...'));
            break;
        } else {
            console.log(chalk.red('Opção invalida!'));
        }

        continuarSistema = readlineSync.question(chalk.blue('\nDeseja voltar ao menu principal? (sim/não): ')).toLowerCase();
    } while (continuarSistema === 'sim');
}

menuPrincipal();
console.log(chalk.blue('Obrigado por usar o sistema de reservas de ingressos!'));
