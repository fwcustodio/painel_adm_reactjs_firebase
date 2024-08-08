export class Impressao {
  constructor(dadosParaImpressao) {
    this.dadosParaImpressao = dadosParaImpressao;
  }

  async PreparaDocumento() {
    const corpoDocumento = this.CriaCorpoDocumento();
    const documento = this.GerarDocumento(corpoDocumento);
    return documento;
  }

  CriaCorpoDocumento() {
    const formatarData = (Data) => {
      if (!Data) return Data;
  
      let novaData = new Date(Data);
  
      let dia =
        novaData.getDay().toString().length == 1
          ? '0' + novaData.getDay()
          : novaData.getDay();
  
      let mes =
        novaData.getMonth().toString().length == 1
          ? '0' + novaData.getMonth()
          : novaData.getMonth();
  
      let ano =
        novaData.getFullYear().toString().length == 1
          ? '0' + novaData.getFullYear()
          : novaData.getFullYear();
  
      let dataFormatada = dia + '/' + mes + '/' + ano;
  
      return dataFormatada;
    };
    
    const header = [
      { text: "Data inicial: ", bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: this.dadosParaImpressao.data_inicio, bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      {},
      { text: "Data final: ", bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: this.dadosParaImpressao.data_fim, bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      {},
      {},
      {},
    ];

    console.log('dadosParaImpressao: ' + JSON.stringify(this.dadosParaImpressao));
    const body = [
        { text: this.dadosParaImpressao.relatorio, fontSize: 8 },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
    ];

    const lineHeader = [
      {
        text:
          "__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________",
        alignment: "center",
        fontSize: 5,
        colSpan: 8,
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ];

    const line = [
      {
        text:
          "__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________",
        alignment: "center",
        fontSize: 5,
        colSpan: 8,
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ];

    let content = [header, lineHeader];
    let lineTotal = [line];
    content = [...content, ...body, ...lineTotal];
    return content;
  }

  GerarDocumento(corpoDocumento) {
    const documento = {
      pageSize: "A4",
      pageMargins: [30, 53, 14, 40],
      header: function () {
        return {
          margin: [14, 12, 14, 0],
          layout: "noBorders",
          table: {
            widths: ["*"],
            body: [[{ text: "Relatório de registro de atividades mensal", style: "reportName" }]],
          },
        };
      },
      content: [
        {
          layout: "noBorders",
          table: {
            widths: [50, 55, 45, 55],
            body: [[
              { text: "Data inicial: ", bold: true, fontSize: 9, margin: [0, 4, 0, 9] },
              { text: this.dadosParaImpressao.data_inicio, fontSize: 9, margin: [0, 4, 0, 9] },
              { text: "Data final: ", bold: true, fontSize: 9, margin: [0, 4, 0, 9] },
              { text: this.dadosParaImpressao.data_fim, fontSize: 9, margin: [0, 4, 0, 9] },
            ]],
          },
        },
        { text: this.dadosParaImpressao.relatorio, fontSize: 9},
        {
          text:
             "________________________",
          alignment: "center",
          fontSize: 9,
          margin: [0, 40, 0, 0],
        },
        { text: this.dadosParaImpressao.nome, fontSize: 9, alignment: "center" },
      ],
      footer(currentPage, pageCount) {
        return {
          layout: "noBorders",
          margin: [14, 0, 14, 22],
          table: {
            widths: ["auto"],
            body: [
              [
                {
                  text:
                    "_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________",
                  alignment: "center",
                  fontSize: 5,
                },
              ],
              [
                [
                  {
                    text: `Página ${currentPage.toString()} de ${pageCount}`,
                    fontSize: 7,
                    alignment: "right",
                    /* horizontal, vertical */
                    margin: [3, 0],
                  },
                ],
              ],
            ],
          },
        };
      },
      styles: {
        reportName: {
          fontSize: 9,
          bold: true,
          alignment: "center",
          margin: [0, 4, 0, 0],
        },
      },
    };
    return documento;
  }
}
