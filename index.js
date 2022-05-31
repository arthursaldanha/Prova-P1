var prompt = require('prompt-sync')();

const usuario = 'admin';
const senha = '123456';
let gerenteLogado = false;

function quantidadeDeItens(array) {
  const countMap = Object.create(null);

  for (const elemento of array) {
    countMap[elemento.id] = (countMap[elemento.id] || 0) + 1;
  }

  return Object.entries(countMap).map(([valor, quantidade]) => ({
    id: Number(valor),
    quantidade: quantidade
  }));
}

const pedidoFinalFormato = {
  id: this.id,
  itens: this.itens,
  valorTotal: this.valorTotal,
  custoTotal: this.custoTotal,
  criadoEm: this.criadoEm,
  status: this.status
};

const pedidoAtualFormato = {
  quantidade: this.quantidade,
  nome: this.nome,
  custo: this.custo,
  valor: this.valor
};

let arrayProdutos = [
  {
    id: 1,
    nome: "Pastel de Frango",
    quantidade: 10,
    custo: 5,
    valor: 10
  },
  {
    id: 2,
    nome: "Pastel de Carne",
    quantidade: 12,
    custo: 4,
    valor: 7
  },
  {
    id: 3,
    nome: "Pastel de Queijo",
    quantidade: 7,
    custo: 4.5,
    valor: 9
  },
  {
    id: 4,
    nome: "Refrigerante",
    quantidade: 20,
    custo: 2,
    valor: 4.70
  },
  {
    id: 5,
    nome: "Caldo de Cana",
    quantidade: 20,
    custo: 1,
    valor: 3
  },
];

let pedidoAtual = [];

const filaDePedidos = [];

const opcaoDeUsuarioDigitada = () => {
  let opcaoDeUsuarioDigitada = Number(prompt('Digite alguma das opções: '))
  return opcaoDeUsuarioDigitada
}

const funcionalidadeDigitadaFuncionario = () => {
  let funcionalidadeDigitada = Number(prompt('Digite quais dessas opções deseja seguir: '))
  return funcionalidadeDigitada
}

const idProdutoDigitado = () => {
  let idProdutoDigitado = Number(prompt('Qual das opções você deseja: '))
  return idProdutoDigitado
}

const quantidadeProdutoDigitado = (indice) => {
  let qntdProdutoDigitado = Number(prompt(`Qual a quantidade desejada de ${arrayProdutos[indice - 1].nome}: `))
  return qntdProdutoDigitado
}

const opcoesParaCriarPedido = () => {
  console.log('');
  arrayProdutos.forEach((produto) => console.log(`[${produto.id}] - ${produto.nome} - R$ ${Number(produto.valor).toFixed(2)}`))
  console.log('');
  console.log('Para sair dos pedido, tecle 99');
  console.log('');
}

/* ________________________________________________________________________________________________ */
// Modo Funcionário
const opcoesFuncionario = () => {
  function opcoes() {
    console.log('')
    console.log('[1] - Criar pedido')
    console.log('[2] - Listar pedidos')
    console.log('[3] - Finalizar pedido')
    console.log('')
    console.log('[99] - Voltar')
    console.log('')
  }

  console.clear()
  console.log('')
  console.log('Você entrou no modo funcionário!')
  console.log('Digite uma das opções a serem realizadas: ')
  opcoes()


  let funcionalidadeDigitada = funcionalidadeDigitadaFuncionario();

  const opcoesDisponiveisDigitar = [1, 2, 3, 99]

  while (isNaN(funcionalidadeDigitada) || !opcoesDisponiveisDigitar.includes(funcionalidadeDigitada)) {
    console.clear()
    opcoes()
    console.log('Nenhuma das opções ofertadas foi digitada! Por favor, confira novamente!')
    funcionalidadeDigitada = funcionalidadeDigitadaFuncionario()
  }

  switch (funcionalidadeDigitada) {
    case 1:
      criarPedido()
      break;
    case 2:
      listarPedido()
      break;
    case 3:
      finalizarPedido()
      break;
    default:
      iniciandoPrograma();
      break;
  }
}

// Criar Pedido
const criarPedido = () => {
  console.clear();
  console.log('Para fazer pedido, selecione qual opção deseja e a quantidade!');
  opcoesParaCriarPedido()

  let opcaoProdutoDigitada = idProdutoDigitado()

  if (opcaoProdutoDigitada === 99) {
    console.clear();
    console.log('Você estará sendo redirecionado para o modo de Funcionário!');
    setTimeout(() => {
      opcoesFuncionario();
    }, 5 * 1000)
    return
  }

  while (isNaN(opcaoProdutoDigitada) || !arrayProdutos.find((produto) => produto.id === opcaoProdutoDigitada)) {
    console.clear();
    opcoesParaCriarPedido();
    opcaoProdutoDigitada = idProdutoDigitado();
  }

  let quantidadeSolicitada = quantidadeProdutoDigitado(opcaoProdutoDigitada)

  while (isNaN(quantidadeSolicitada)) {
    quantidadeSolicitada = quantidadeProdutoDigitado(opcaoProdutoDigitada)
  }

  if (quantidadeSolicitada > arrayProdutos[opcaoProdutoDigitada - 1].quantidade) {
    console.log('');
    if (arrayProdutos[opcaoProdutoDigitada - 1].quantidade > 1) {
      console.log(`Só possuimos ${arrayProdutos[opcaoProdutoDigitada - 1].quantidade} quantidades de ${arrayProdutos[opcaoProdutoDigitada - 1].nome} no nosso estoque!`);
    } else {
      console.log(`Não possuímos estoque de ${arrayProdutos[opcaoProdutoDigitada - 1].nome}!`);
    }

    setTimeout(() => {
      criarPedido();
    }, 6 * 1000)
  } else {
    arrayProdutos[opcaoProdutoDigitada - 1].quantidade -= quantidadeSolicitada

    for (let index = 0; index < quantidadeSolicitada; index++) {
      pedidoAtual.push(arrayProdutos[opcaoProdutoDigitada - 1])
    }

    let desejaContinuar = String(prompt('Deseja pedir mais alguma coisa? Caso queira, digite "sim", caso contrário, "nao"! '))

    const desejaContinuarTratado = desejaContinuar.replace(/"/g, '').replace(/ã/g, 'a').toLowerCase()

    while (desejaContinuarTratado !== 'sim' && desejaContinuarTratado !== 'nao') {
      console.clear();
      desejaContinuar = String(prompt('Deseja pedir mais alguma coisa? Caso queira, digite "sim", caso contrário, "não": '))
    }

    if (desejaContinuarTratado === "sim") {
      criarPedido();
      return
    } else {
      console.clear()
      console.log('Pedido criado com sucesso!');

      let pedidoAtualOrdenado = null;
      let pedidoReduzido = null;
      let pedidoFormatado = null;
      let pedidoFinal = null;

      setTimeout(() => {
      }, 5 * 1000)

      pedidoAtualOrdenado = pedidoAtual.sort((a, b) => a.id - b.id)

      pedidoReduzido = quantidadeDeItens(pedidoAtualOrdenado)

      pedidoFormatado = pedidoReduzido.map((pedido) => {
        let pedidoAtual = Object.create(pedidoAtualFormato);

        pedidoAtual.quantidade = Number(pedido.quantidade);
        pedidoAtual.nome = String(arrayProdutos[pedido.id - 1].nome)
        pedidoAtual.custo = Number(pedido.quantidade * arrayProdutos[pedido.id - 1].custo).toFixed(2)
        pedidoAtual.valor = Number(pedido.quantidade * arrayProdutos[pedido.id - 1].valor).toFixed(2)

        return pedidoAtual
      })

      pedidoFinal = Object.create(pedidoFinalFormato)

      if (filaDePedidos.length === 0) {
        pedidoFinal.id = 1
      } else {
        pedidoFinal.id = filaDePedidos[filaDePedidos.length - 1].id + 1
      }

      pedidoFinal.itens = pedidoFormatado

      let custoTotalPedido = 0
      for (const pedido of pedidoFormatado) {
        custoTotalPedido += Number(pedido.custo)
      }
      pedidoFinal.custoTotal = Number(custoTotalPedido).toFixed(2)

      let valorTotalPedido = 0
      for (const pedido of pedidoFormatado) {
        valorTotalPedido += Number(pedido.valor)
      }
      pedidoFinal.valorTotal = Number(valorTotalPedido).toFixed(2)

      let dataPedido = new Date();

      let opcoesData = { year: 'numeric', month: 'long', day: '2-digit' };
      let dataFormatada = dataPedido.toLocaleDateString('pt-BR', opcoesData);

      let horaFormatada = dataPedido.toLocaleTimeString('pt-BR');
      pedidoFinal.criadoEm = `${dataFormatada} às ${horaFormatada}`;

      pedidoFinal.status = 'Em andamento!'

      filaDePedidos.push(pedidoFinal)

      pedidoAtual = []
      pedidoAtualOrdenado = null;
      pedidoReduzido = null;
      pedidoFormatado = null;
      pedidoFinal = null;

      setTimeout(() => {
        console.clear();
        console.log('Em instantes, você será redirecionado para o modo funcionário!')
      }, 1 * 1000)

      setTimeout(() => {
        console.clear();
        opcoesFuncionario();
      }, 4 * 1000)
    }
  }
}

// Listar Pedido
const listarPedido = () => {
  if (filaDePedidos.length === 0) {
    console.clear();
    console.log('Não há pedidos na fila.');
    console.log('Em instantes, você será redirecionado!');
    setTimeout(() => {
      opcoesFuncionario();
    }, 4 * 1000)

    return
  }

  console.clear();
  filaDePedidos.forEach((pedido) => {
    console.log(`ID do Pedido: ${pedido.id}`)
    for (itens of pedido.itens) {
      console.log(`${itens.quantidade}x - ${itens.nome} - R$ ${itens.valor}`);
    }
    console.log(`Valor total: R$ ${pedido.valorTotal}`);
    console.log(`Criado em: ${pedido.criadoEm}`)
    console.log(`Status atual: ${pedido.status}`);
    console.log('');
  })

  console.log('');
  console.log("[99] - Voltar");
  console.log('');

  let voltarPaginaAnterior = Number(prompt('Digite 99 para voltar. '))

  while (voltarPaginaAnterior !== 99) {
    console.clear();
    voltarPaginaAnterior = Number(prompt('O ID do produto é obrigatoriamente um número!'))
  }

  if (voltarPaginaAnterior === 99) {
    console.clear();
    console.log('Em breve, você estará sendo redirecionado para a página de Funcionário!');
    setTimeout(() => {
      opcoesFuncionario();
    }, 5 * 1000)
    return
  }
}

// Finalizar Pedido
const finalizarPedido = () => {
  console.clear();
  console.log("[99] - Voltar");
  console.log('');
  let idParaFinalizarPedido = Number(prompt('Digite o ID do seu pedido: '))

  if (idParaFinalizarPedido === 99) {
    console.clear();
    console.log('Em breve, você estará sendo redirecionado para a página de Funcionário!');
    setTimeout(() => {
      opcoesFuncionario();
    }, 5 * 1000)
    return
  }

  while (isNaN(idParaFinalizarPedido)) {
    console.log('O ID do produto é obrigatoriamente um número!')
    idParaFinalizarPedido = Number(prompt('Digite o ID do seu pedido: '))
  }

  if (filaDePedidos.length === 0) {
    console.clear();
    console.log('Não há pedidos a serem finalizados!');
    console.log('Em breve, você estará sendo redirecionado para a página de Funcionário!');
    setTimeout(() => {
      opcoesFuncionario();
    }, 5 * 1000)
    return
  }

  let indicePedido = filaDePedidos.findIndex(pedido => pedido.id === idParaFinalizarPedido)

  if (indicePedido === -1) {
    console.log('Não há pedido com esse ID! Verifique se foi digitado corretamente!');
    finalizarPedido();

    return
  }

  if (filaDePedidos[indicePedido].status === 'Finalizado!') {
    console.clear();
    console.log('Este pedido já está finalizado!');

    setTimeout(() => {
      console.log('Em instantes, você será redirecionado para o modo funcionário!')
    }, 3 * 2000)

    setTimeout(() => {
      console.clear();
      opcoesFuncionario();
    }, 5 * 1000)

    return
  }

  filaDePedidos[indicePedido].status = 'Finalizado!'

  if (filaDePedidos[indicePedido].status === 'Finalizado!') {
    console.clear();
    console.log('Pedido finalizado com sucesso!');

    setTimeout(() => {
      console.log('Em instantes, você será redirecionado para o modo funcionário!')
    }, 2 * 2000)

    setTimeout(() => {
      console.clear();
      opcoesFuncionario();
    }, 4 * 1000)

    return
  } else {
    console.clear();
    console.log('Houve algum problema ao finalizar o pedido!');

    setTimeout(() => {
      console.log('Em instantes, você será redirecionado para o modo funcionário!')
    }, 2 * 2000)

    setTimeout(() => {
      console.clear();
      opcoesFuncionario();
    }, 4 * 1000)

    return
  }

}

/* ________________________________________________________________________________________________ */
// Modo Gerente
const opcoesGerente = () => {
  function opcoes() {
    console.clear()
    console.log('[1] - Visualizar estoque')
    console.log('[2] - Repor estoque')
    console.log('[3] - Visualizar custos e lucros')
    console.log('');
    console.log('[99] - Sair do modo Gerente')
    console.log('')
  }

  console.clear();

  if (!gerenteLogado) {
    console.log('Você está acessando o modo gerente!');
    console.log('');

    let usuarioRecebido = String(prompt('Qual o nome de usuário: '))
    let senhaRecebida = String(prompt('Qual a senha: '))

    if (usuarioRecebido !== usuario || senhaRecebida !== senha) {
      console.clear();
      console.log("O usuário e/ou senha estão incorretos!")

      setTimeout(() => {
        iniciandoPrograma()
      }, 4 * 1000)

      return
    }
  }

  gerenteLogado = true;

  opcoes()

  let opcaoDigitada = Number(prompt('Digite uma das opções a serem realizadas: '))

  const opcoesDisponiveisDigitar = [1, 2, 3, 99]

  while (isNaN(opcaoDigitada) || !opcoesDisponiveisDigitar.includes(opcaoDigitada)) {
    console.clear()
    console.log('Nenhuma das opções ofertadas foi digitada! Por favor, confira novamente!')
    opcoes()
    opcaoDigitada = Number(prompt('Digite uma das opções a serem realizadas: '))
  }

  switch (opcaoDigitada) {
    case 99:
      gerenteLogado = false;
      console.clear();
      iniciandoPrograma();
      break;
    case 1:
      visualizarEstoque();
      break;
    case 2:
      reporEstoque();
      break;
    case 3:
      console.clear();
      visualizarCustosLucros();
      break;
  }
}

const visualizarEstoque = () => {
  function opcoes() {
    console.clear();
    arrayProdutos.forEach((produto) => {
      console.log(`${produto.nome} - ${produto.quantidade} ${produto.quantidade > 1 ? 'unds' : 'und'}`)
    })
    console.log('');
    console.log('[99] - Voltar ao modo Gerente');
    console.log('');
  }

  opcoes();

  let opcaoDigitada = Number(prompt('Qual das opções você deseja: '));

  while (isNaN(opcaoDigitada) || opcaoDigitada !== 99) {
    console.clear()
    opcoes()
    opcaoDigitada = Number(prompt('Qual das opções você deseja: '))
  }

  if (opcaoDigitada === 99) {
    console.clear();

    console.log('Em instantes, você será redirecionado para o modo Gerente!')
    setTimeout(() => {
      console.clear();
      opcoesGerente()
    }, 5 * 1000)

    return
  }
}

const reporEstoque = () => {
  function opcoes() {
    console.clear();
    console.log('');
    console.log("Selecine a opção de produto para aumentar seu estoque!")
    console.log('');
    arrayProdutos.forEach((produto) => {
      console.log(`[${produto.id}] - ${produto.nome}`)
    })
    console.log('');
    console.log('[99] - Voltar ao modo Gerente');
    console.log('');
  }

  opcoes();

  let opcaoDigitada = Number(prompt('Qual das opções você deseja: '));

  const opcoesDisponiveisDigitar = [1, 2, 3, 4, 5];

  if (opcaoDigitada === 99) {
    console.clear();

    console.log('Em instantes, você será redirecionado para o modo Gerente!')
    setTimeout(() => {
      console.clear();
      opcoesGerente()
    }, 5 * 1000)

    return
  }

  while (isNaN(opcaoDigitada) || !opcoesDisponiveisDigitar.includes(opcaoDigitada)) {
    console.clear()
    opcoes()
    opcaoDigitada = Number(prompt('Qual das opções você deseja: '))
  }

  let quantidadeDigitada = Number(prompt('Quantas unidade você deseja adicionar: '));

  if (isNaN(quantidadeDigitada) || quantidadeDigitada < 0) {
    console.clear();
    console.log('A quantidade digitada não é um número e positivo!');
    console.log('Por favor, digite novamente!');

    setTimeout(() => {
      reporEstoque();
    }, 5 * 1000)

    return;
  }

  arrayProdutos[opcaoDigitada - 1].quantidade += quantidadeDigitada;

  console.clear();
  console.log('O estoque foi atualizado com sucesso!')

  setTimeout(() => {
    console.clear();
    opcoesGerente()
  }, 3 * 1000)
}

const visualizarCustosLucros = () => {
  function opcoes() {
    console.log('');
    console.log('[99] - Voltar ao modo Gerente');
    console.log('');
  }

  if (filaDePedidos.length === 0) {
    console.clear();
    console.log('Não há pedidos na fila para calcular os custos e lucros.');
    console.log('Em instantes, você será redirecionado!');
    setTimeout(() => {
      opcoesGerente();
    }, 4 * 1000)

    return
  }

  let custosTotais = 0;
  filaDePedidos.forEach((pedido) => {
    custosTotais += Number(pedido.custoTotal)
  })

  let lucrosTotais = 0;
  let pedidosFinalizados = filaDePedidos.filter((pedido) => pedido.status === 'Finalizado!')

  if (pedidosFinalizados.length === 0) {
    lucrosTotais = 0
  } else {
    filaDePedidos.forEach((pedido) => {
      lucrosTotais += Number(pedido.valorTotal)
    })
  }

  console.log(`Custos totais: R$ ${custosTotais.toFixed(2)}`)
  console.log(`Lucros totais: R$ ${lucrosTotais.toFixed(2)}`)
  console.log('')
  console.log(`Resultado do dia: R$ ${Number(lucrosTotais - custosTotais).toFixed(2)}`)

  opcoes();

  let opcaoDigitada = Number(prompt('Qual das opções você deseja: '));

  while (isNaN(opcaoDigitada) || opcaoDigitada !== 99) {
    console.clear()
    opcoes()
    opcaoDigitada = Number(prompt('Qual das opções você deseja: '))
  }

  if (opcaoDigitada === 99) {
    console.clear();

    console.log('Em instantes, você será redirecionado para o modo Gerente!')
    setTimeout(() => {
      console.clear();
      opcoesGerente()
    }, 5 * 1000)

    return
  }
}

/* ________________________________________________________________________________________________ */
// Comandos Gerais
const iniciandoPrograma = () => {
  console.clear()
  console.log('------------------- Bem vindo ao sisteminha da Meyrezada! -------------------')

  console.log('[1] - Funcionário')
  console.log('[2] - Gerente')
  console.log('');
  console.log('[99] - Sair do sistema')

  console.log('')

  let opcaoDigitada = opcaoDeUsuarioDigitada()

  const opcoesDisponiveisDigitar = [1, 2, 99]

  while (isNaN(opcaoDigitada) && !opcoesDisponiveisDigitar.includes(opcaoDigitada)) {
    console.log('')
    console.log('Nenhuma das opções ofertadas foi digitada! Por favor, confira novamente!')
    opcaoDigitada = opcaoDeUsuarioDigitada()
  }

  switch (opcaoDigitada) {
    case 99:
      console.log('Até mais!');
      break;
    case 1:
      console.clear()
      opcoesFuncionario()
      break;
    case 2:
      console.clear()
      opcoesGerente()
      break;
  }
}

iniciandoPrograma()
