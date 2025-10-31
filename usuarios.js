
const API = 'https://jsonplaceholder.typicode.com/users'; // URL da API

// Pega os elementos do DOM com id correspondente para manipulação
const lista = document.getElementById('lista');
const detalhes = document.getElementById('detalhes');
const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const btnReset = document.getElementById('btnReset');

// Armazena os usuários carregados da API
let usuarios = [];

// Função assíncrona para carregar usuários
async function carregarUsuarios() {
  try {
    const res = await fetch(API); // Aguarda a resposta da API
    const data = await res.json(); // Aguarda a conversão para JSON
    usuarios = data; // Armazena os usuários na variável global
    mostrarLista(usuarios); // Mostra a lista de usuários
  } catch (erro) {
    console.error('Erro ao carregar usuários:', erro);
    lista.innerHTML = '<p>Erro ao carregar usuários. Tente novamente.</p>';
  }
}

// Chama a função para carregar os usuários
carregarUsuarios();

// Função para mostrar a lista de usuários
function mostrarLista(array) {
  lista.innerHTML = ''; // Limpa a lista antes de adicionar novos elementos
  array.map((u) => {
    // Itera sobre o array de usuários
    const div = document.createElement('div'); // Cria um novo elemento div para cada usuário
    // createElement cria um novo elemento HTML do tipo especificado
    div.textContent = u.name; // Define o texto do div como o nome do usuário
    div.className = 'usuario'; // Adiciona a classe CSS 'usuario' ao div
    div.onclick = () => mostrarDetalhes(u); // Adiciona um evento de clique para mostrar detalhes do usuário
    // DOM é a sigla para Document Object Model, que é uma representação estruturada do documento HTML
    // O DOM permite que linguagens de programação manipulem o conteúdo, estrutura e estilo de documentos web
    // appendChild adiciona um novo nó filho ao elemento pai especificado
    // nó é uma unidade básica do DOM que representa um elemento, atributo ou texto
    // nó filho é o elemento que está sendo adicionado ao DOM, no caso, o div criado
    // nó pai é o elemento ao qual o nó filho está sendo adicionado, no caso, a lista
    lista.appendChild(div); // Adiciona o div à lista no DOM
  });
}

// Função de busca de usuários
btnBuscar.onclick = () => {
  // Evento de clique no botão buscar
  const termo = inputBuscar.value.toLowerCase(); // Obtém o valor do input e converte para minúsculas
  const filtrados = usuarios.filter((u) => u.name.toLowerCase().includes(termo)); // Filtra os usuários cujo nome inclui o termo de busca
  mostrarLista(filtrados); // Mostra a lista filtrada
};

// Função de reset da busca
btnReset.onclick = () => {
  // Evento de clique no botão reset
  // value é a propriedade que define ou retorna o valor do elemento
  inputBuscar.value = ''; // Limpa o valor do input
  mostrarLista(usuarios); // Mostra a lista completa de usuários
};

// Função para mostrar detalhes do usuário
function mostrarDetalhes(u) {
  // Recebe o usuário como parâmetro
  detalhes.innerHTML = `
    <h2>${u.name}</h2>
    <p>Email: ${u.email}</p>
    <p>Telefone: ${u.phone}</p>
    <p>Cidade: ${u.address.city}</p>
    <button id="voltar">Voltar</button>
  `; // Define o conteúdo HTML dos detalhes do usuário
  // display é uma propriedade CSS que define como um elemento é exibido na página
  // none esconde o elemento da página
  lista.style.display = 'none'; // Esconde a lista de usuários
  inputBuscar.style.display = 'none'; // Esconde o input de busca
  btnBuscar.style.display = 'none'; // Esconde o botão buscar
  btnReset.style.display = 'none'; // Esconde o botão reset
  document.getElementById('voltar').onclick = voltar; // Adiciona o evento de clique ao botão voltar
}

// Função para voltar à lista de usuários
function voltar() {
  detalhes.innerHTML = ''; // Limpa os detalhes do usuário
  // display é uma propriedade CSS que define como um elemento é exibido na página
  // block exibe o elemento como um bloco
  // inline exibe o elemento na mesma linha
  lista.style.display = 'block';
  inputBuscar.style.display = 'inline';
  btnBuscar.style.display = 'inline';
  btnReset.style.display = 'inline';
}
