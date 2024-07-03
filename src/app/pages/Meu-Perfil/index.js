import { UsuarioService } from "../../services/usuario.service.js";

let botaoSair = document.getElementById("botao-sair");

botaoSair.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.clear();
  window.location.href = "/src/index.html";
});

consultaEmail();
consultaUsuario();
consultaPais();

async function consultaEmail() {
  const usuario = new UsuarioService();
  const email = localStorage.getItem("usuarioLogado");
  let inputEmail = document.getElementById("e-mail");

  try {
    let valor = await usuario.getEmail(email);
    console.log(valor);

    if (inputEmail) {
      inputEmail.value = valor;
    }
    return valor;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function consultaUsuario() {
  const usuario = new UsuarioService();
  const email = localStorage.getItem("usuarioLogado");
  let inputUsuario = document.getElementById("input-usuario");

  try {
    let valor = await usuario.getUsuario(email);

    if (inputUsuario) {
      inputUsuario.value = valor;
    }
    return valor;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function consultaPais() {
  const usuario = new UsuarioService();
  const email = localStorage.getItem("usuarioLogado");
  let inputPais = document.getElementById("pais");

  try {
    let valor = await usuario.getPais(email);

    if (inputPais) {
      inputPais.value = valor;
    }
    return valor;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
