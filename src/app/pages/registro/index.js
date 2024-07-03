import { User } from "../../model/Usuario.js";
import { UsuarioService } from "../../services/usuario.service.js";

//CHAMA A API E PREENCHE O SELECT DE PAISES COM OS VALORES DA API
paises();

$(document).ready(function () {
  $("#formulario-registro").on("submit", async function (event) {
    event.preventDefault();
    const form = document.getElementById("formulario-registro");
    if (form.checkValidity()) {
      const email = $("#input-email").val();
      const pais = $("#input-pais-residencia").val();
      const usuario = $("#input-nome-usuario").val();
      const senha = $("#input-escolha-senha").val();

      const newUser = new User(email, pais, usuario, senha);
      try {
        await newUser.salvar();
        window.location.href = "../../../index.html";
      } catch (error) {
        alert.error("Erro ao salvar o usuário:", error);
      }
    }
  });
});

//ADICIONA MASCARA AO CAMPO INPUT-EMAIL
$(document).ready(function () {
  $("#input-email").mask("A", {
    translation: {
      A: { pattern: /[\w@\-.+]/, recursive: true },
    },
    placeholder: "exemplo@dominio.com",
  });
});

//VALIDA O INPUT EMAIL E CHAMA A FUNCAO PARA VALIDA-LO
document.getElementById("input-email").addEventListener("blur", function () {
  validaEmail();
});

//VALIDA O INPUT CONFIRMACAO EMAIL E CHAMA A FUNCAO PARA VALIDA-LO
document
  .getElementById("input-confirmacao-email")
  .addEventListener("blur", function () {
    validaConfirmacaoEmail();
  });

//VALIDA O INPUT USUARIO E CHAMA A FUNCAO PARA VALIDA-LO
document
  .getElementById("input-nome-usuario")
  .addEventListener("blur", function () {
    validaUsuario();
  });

//VALIDA O INPUT SENHA E CHAMA A FUNCAO PARA VALIDA-LO
document
  .getElementById("input-escolha-senha")
  .addEventListener("blur", function () {
    validaSenha();
  });

//VALIDA O INPUT CONFIRMACAO SENHA E CHAMA A FUNCAO PARA VALIDA-LO
document
  .getElementById("input-confirme-senha")
  .addEventListener("blur", function () {
    validaConfirmacaoSenha();
  });

async function validaEmail() {
  const emailInput = document.getElementById("input-email");
  const spanEmailInput = document.getElementById("email-invalido");
  const usuarioService = new UsuarioService();
  const emailValido = await usuarioService.verificaEmail(emailInput.value);

  if (emailInput.validity.valueMissing) {
    $(spanEmailInput).removeClass("hidden");
    return false;
  } else {
    $(spanEmailInput).addClass("hidden");
  }

  if (emailInput.validity.patternMismatch) {
    $(spanEmailInput).removeClass("hidden");
    return false;
  } else {
    $(spanEmailInput).addClass("hidden");
  }
  if (emailValido) {
    $(spanEmailInput).removeClass("hidden");
    return false;
  } else {
    $(spanEmailInput).addClass("hidden");
  }

  return true;
}

function validaConfirmacaoEmail() {
  const emailInput = document.getElementById("input-email").value;
  const confirmaEmailInput = document.getElementById(
    "input-confirmacao-email"
  ).value;

  const spanEmailInput = document.getElementById("email-divergente");

  if (emailInput !== confirmaEmailInput) {
    $(spanEmailInput).removeClass("hidden");
    return false;
  } else {
    $(spanEmailInput).addClass("hidden");
  }
}

function validaUsuario() {
  const usuarioInput = document.getElementById("input-nome-usuario");
  const spanUsuario = document.getElementById("span-nome-usuario");

  if (usuarioInput.validity.valueMissing) {
    $(spanUsuario).removeClass("hidden");
    return false;
  } else {
    $(spanUsuario).addClass("hidden");
  }

  return true;
}

function validaSenha() {
  const senhaInput = document.getElementById("input-escolha-senha");
  const spanSenha = document.getElementById("senha-invalida");

  if (senhaInput.validity.valueMissing) {
    $(spanSenha).removeClass("hidden");
    return false;
  } else {
    $(spanSenha).addClass("hidden");
  }

  if (senhaInput.validity.patternMismatch) {
    $(spanSenha).removeClass("hidden");
    return false;
  } else {
    $(spanSenha).addClass("hidden");
  }
  return true;
}

function validaConfirmacaoSenha() {
  const senhaInput = document.getElementById("input-escolha-senha").value;
  const confirmaSenhaInput = document.getElementById(
    "input-confirme-senha"
  ).value;
  const spanSenhaInput = document.getElementById("senha-divergente");

  if (senhaInput !== confirmaSenhaInput) {
    $(spanSenhaInput).removeClass("hidden");
    return false;
  } else {
    $(spanSenhaInput).addClass("hidden");
  }
}

async function paises() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");

    if (response.ok) {
      const data = await response.json();

      let paises = data.map((nomePais) => nomePais.translations.por.common);
      let selectPais = document.getElementById("input-pais-residencia");

      paises.sort((a, b) => a.localeCompare(b));

      paises.forEach((nomePais) => {
        let option = document.createElement("option");
        option.textContent = nomePais;
        selectPais.appendChild(option);
      });
    } else {
      throw new Error("Erro ao buscar os dados da API");
    }
  } catch (error) {
    console.error("Ocorreu um erro ao fazer a requisição:", error);
  }
}
