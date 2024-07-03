import { UsuarioService } from "../../services/usuario.service.js";

const form = document.getElementById("login-usuario");

//ABRE A PAGINA DE REGISTRO AO CLICAR NO BOTAO INSCREVER-SE
$(document).ready(function () {
  $("#inscricao").click(function () {
    window.location.href = "/src/app/pages/registro/index.html";
  });
});

// VALIDA O LOGIN DO USUARIO
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (form.checkValidity()) {
    const email = document.getElementById("input-email").value;
    const senha = document.getElementById("input-senha").value;

    const usuarioService = new UsuarioService(); // Corrigir a instância aqui
    const verificaUsuario = await usuarioService.verificarUsuario(email, senha);

    if (verificaUsuario) {
      localStorage.setItem("usuarioLogado", `${email}`);
      window.location.href = "../../../index.html";
    } else {
      console.log("erro");
    }
  }
});
