function trocar_tela() {
  if (tela.classList == "card tela_login") {
    tela.classList.add("sumir");
    tela2.classList.remove("sumir");
  } else {
    tela.classList.remove("sumir");
    tela2.classList.add("sumir");
  }
}

function entrar() {
  const email = input_email_login.value;
  const senha = input_senha_login.value;

  if (email == "honda@gmail.com" && senha == "Honda123") {
    window.location = "./visao_geral.html";
  } else {
    alert("Dados invalidos");
  }
}

function cadastrar() {
  var nome = input_nome.value;
  var email = input_email.value;
  var senha = input_senha.value;

  var senhaPossuiMaiscula = false;
  var senhaPossuiMinuscula = false;
  var senhaPossuiCaracterEspecil = false;

  if (senha[caracterAtual] == senha[caracterAtual].toUpperCase()) {
      senhaPossuiMinuscula == true;
  } else if (senha[caracterAtual] == senha[caracterAtual].toLowerCase()) {
      senhaPossuiMaiscula == true;
  }

  if (nome.length < 3) {
    alert("Nome muito curto");
  } else if (email.indexOf("@") == -1 || !email.endsWith(".com")) {
    alert("Email Inválido");
  } else if (
    senha.length < 8 ||
    !senhaPossuiMaiscula ||
    !senhaPossuiMinuscula
  ) {
    alert("Senha Inválida");
  }
}
