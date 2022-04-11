import {FiSearch} from "react-icons/fi"
import "./style.css"
// Importação do modulo de consumo da api
import api from "./services/api";
// a importação a seguir serve para armazenar o valor digitado no input
import {useState} from 'react'

function App() {

  // Tudo que for digitado na tag input será salvo nesse estado

  // Input = Valor do estado digitado na tag input
  // setInput = Função para trocar o valor do input
  const [input, setInput] = useState("");

  // Aqui os dados da requisição serão armazenados
  const [cep, setCep] = useState({})

  // Quando o botão for clicado, teremos uma requisição http
  async function handleSearch() {
    if (input === '') {
      alert("Preencha algum CEP válido.");
      return;
    }

    // A requisição é feita aqui
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")

    } catch (error) {
      alert("Ops, algo deu errado...")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite o cep da busca..."
        // o value é atribuido com o valor do input
        value={input}
        // e o onChange transmite o valor digitado para o input
        onChange={(evento) => setInput(evento.target.value)}/>

        <button 
        className="buttonSearch"
        onClick={handleSearch}
        >
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>
      

      {cep.erro === true && (

        //RENDERIZAÇÃO CONDICIONAL
        <main className="main-error">

          <h2>CEP Não Encontrado.</h2>

        </main>
      )}

      {cep.cep != null && (

        //RENDERIZAÇÃO CONDICIONAL
        <main className="main">
          <h2>{cep.cep}</h2>

          <span>Logradouro: {cep.logradouro}</span><br/>
          <span>Bairro: {cep.bairro}</span><br/>
          <span>Localidade: {cep.localidade}, {cep.uf}</span><br/>
        </main>
      )}



    </div>
  );
}

export default App;
