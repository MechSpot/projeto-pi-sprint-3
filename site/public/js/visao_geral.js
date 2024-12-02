fetch(`/visaoGeral/sensoresTotais/${sessionStorage.ID_OFICINA}`, {
  method: "get",
}).then(function (resposta) {
  if (resposta.ok) {
    resposta.json().then((json) => {
      span_sensores_totais.innerHTML = `<b>${json[0].totalSensores}</b>`;
    });
  }
});

fetch(`/visaoGeral/boxesVazio/${sessionStorage.ID_OFICINA}`, {
  method: "get",
}).then(function (resposta) {
  if (resposta.ok) {
    resposta.json().then((json) => {
      span_boxes_vazio.innerHTML = `<b>${json[0].boxesVazios}</b>`;
    });
  }
});

var entrada = 0;
var saida = 0;

span_entrada_carros.innerHTML = entrada;
span_saida_carros.innerHTML = saida;

fetch(`/visaoGeral/fluxoDiario/${sessionStorage.ID_OFICINA}`, {
  method: "get",
}).then(function (resposta) {
  if (resposta.ok) {
    resposta.json().then((json) => {

      for (var i = 0; i < json.length; i++) {
        if (json[i].resultado == 1) {
          entrada++;
        } else {
          saida++;
        }
      }

      span_entrada_carros.innerHTML = entrada;
      span_saida_carros.innerHTML = saida;
    });
  }
});

fetch(`/visaoGeral/mediaUso/${sessionStorage.ID_OFICINA}`, {
  method: "get",
}).then(function (resposta) {
  if (resposta.ok) {
    resposta.json().then((json) => {
      span_media_uso.innerHTML = `<b>${json[0].mediaUso}min</b>`;
    });
  }
});

fetch(`/visaoGeral/mediaRotatividade/${sessionStorage.ID_OFICINA}`, {
  method: "get",
}).then(function (resposta) {
  if (resposta.ok) {
    resposta.json().then((json) => {
      span_media_rotatividade.innerHTML = `<b>${json[0].mediaRotatividade}min</b>`;
    });
  }
});

fetch(`/visaoGeral/vagaMenosUsada/${sessionStorage.ID_OFICINA}`, {
  method: "get",
}).then(function (resposta) {
  if (resposta.ok) {
    resposta.json().then((json) => {
      span_vaga_menos_usada.innerHTML = `<b>Vaga Nº${json[0].boxe}</b>`;
    });
  }
});

let chartInstance = null;

function verDetalhamento() {
  const modal = document.getElementById("vagaModal");
  const vagaInfo = document.getElementById("vagaInfo");

  // vai passar por todas as vagas atraves da classe vagas e adicionar um "listener" que é chamado quando clica na div
  document.querySelectorAll(".vagas").forEach(function (vaga) {
    vaga.addEventListener("click", function () {
      var vagaId = vaga.id;

      if (vagaId != "vaga1" && vagaId != "vaga9") {
        vagaInfo.textContent = "Informações da vaga N° " + vagaId;
        modal.style.display = "block";

        if (chartInstance) {
          chartInstance.destroy();
        }
        const chartMovimentoDiario = document.getElementById("chartLinha");

        chartInstance = new Chart(chartMovimentoDiario, {
          type: "line",
          data: {
            labels: [
              "9h",
              "10h",
              "11h",
              "12h",
              "13h",
              "14h",
              "15h",
              "16h",
              "17h",
              "18h",
              "19h",
              "20h",
            ],
            datasets: [
              {
                label: "Clientes por Hora",
                data: [1, 3, 1, 2, 2, 4, 1, 3, 2, 2, 2, 0],
                borderColor: "#32746D",
                backgroundColor: "#32746D",
              },
              {
                label: "Ocupação Mínima",
                data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                borderColor: "red",
                backgroundColor: "red",
              },
            ],
          },
        });
      } else if (vagaId == "vaga1") {
        vagaInfo.textContent = "Informações da vaga N° " + vagaId;
        modal.style.display = "block";

        if (chartInstance) {
          chartInstance.destroy();
        }

        const chartMovimentoDiario = document.getElementById("chartLinha");

        chartInstance = new Chart(chartMovimentoDiario, {
          type: "line",
          data: {
            labels: [
              "9h",
              "10h",
              "11h",
              "12h",
              "13h",
              "14h",
              "15h",
              "16h",
              "17h",
              "18h",
              "19h",
              "20h",
            ],
            datasets: [
              {
                label: "Clientes por Hora",
                data: [3, 2, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0],
                borderColor: "#32746D",
                backgroundColor: "#32746D",
              },
              {
                label: "Ocupação Mínima",
                data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                borderColor: "red",
                backgroundColor: "red",
              },
            ],
          },
        });
      } else if (vagaId == "vaga9") {
        vagaInfo.textContent = "Informações da vaga N° " + vagaId;
        modal.style.display = "block";

        if (chartInstance) {
          chartInstance.destroy();
        }

        const chartMovimentoDiario = document.getElementById("chartLinha");

        chartInstance = new Chart(chartMovimentoDiario, {
          type: "line",
          data: {
            labels: [
              "9h",
              "10h",
              "11h",
              "12h",
              "13h",
              "14h",
              "15h",
              "16h",
              "17h",
              "18h",
              "19h",
              "20h",
            ],
            datasets: [
              {
                label: "Rotatividade Média (Minutos)",
                data: [1, 0, 0, 2, 2, 2, 3, 1, 3, 4, 0, 1],
                borderColor: "#32746D",
                backgroundColor: "#32746D",
              },
              {
                label: "Ocupação Mínima",
                data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                borderColor: "red",
                backgroundColor: "red",
              },
            ],
          },
          options: {
            scales: {
              y: {
                ticks: {
                  callback: function (value) {
                    if (Number.isInteger(value)) {
                      return value;
                    }
                    return "";
                  },
                  stepsize: 1,
                },
              },
            },
          },
        });
      }
    });
  });
}

// pra permitir ver o detalhamento assim que a pagina carregar
window.onload = verDetalhamento;

// pra fechar o modal
function fecharModal() {
  const modal = document.getElementById("vagaModal");
  modal.style.display = "none";
}

function sair() {
  sessionStorage.clear();
  window.location = "../index.html";
}
