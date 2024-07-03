// VERIFICA SE EXISTE UM USUÁRIO LOGADO ANTES DE CARREGAR A PÁGINA
$(document).ready(function () {
  if (verificarAutenticacao()) {
    $("#header-logado").removeClass("hidden");
    $("#header-deslogado").addClass("hidden");
  } else {
    $("#header-logado").addClass("hidden");
    $("#header-deslogado").removeClass("hidden");
  }
});

function verificarAutenticacao() {
  // Sua lógica de verificação de autenticação
  // Retorne true se o usuário estiver autenticado, caso contrário, retorne false
  return false; // Exemplo: substitua com sua lógica real
}

//ABRE A PAGINA DE LOGIN AO CLICAR NO BOTAO ENTRAR
$(document).ready(function () {
  $("#entrar").click(function () {
    window.location.href = "./app/pages/login/index.html";
  });
});

//ABRE A PAGINA DE REGISTRO AO CLICAR NO BOTAO REGISTRAR-SE
$(document).ready(function () {
  $("#registrar").click(function () {
    window.location.href = "./app/pages/registro/index.html";
  });
});

//VERIFICA SE EXITE EMAIL DE LOGIN SALVO NO LOCAL STORAGE
function verificarAutenticacao() {
  return localStorage.getItem("usuarioLogado") !== null;
}
