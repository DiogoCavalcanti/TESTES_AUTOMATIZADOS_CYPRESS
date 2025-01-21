const { setup, retry } = require('@cypress/puppeteer')

module.exports = function puppeteerSetup(on) {
    setup({
      on,
      onMessage: {
        async switchTabAndGetContent (browser) {
        
          const page = await pageRetrier(browser, 'https://desenvolvimento.pje.csjt.jus.br/pjekz/processo/365973/tarefa/480/comunicacoesprocessuais/minutas')
          await page.bringToFront()
          
          await page.waitForSelector('#mat-input-0')

          await page.click('[aria-label="Comunicações e expedientes"]')

          const page_ = await pageRetrier (browser, 'https://desenvolvimento.pje.csjt.jus.br/pjekz/processo/365973/tarefa/480/comunicacoesprocessuais/minutas')
          await page_.click('#mat-expansion-panel-header-1 > .mat-expansion-indicator')
          await page_.click('#mat-radio-7 > .mat-radio-label > .mat-radio-container > .mat-radio-outer-circle')
          await page_.click('#mat-expansion-panel-header-1 > .mat-content > .mat-expansion-panel-header-title > .pec-painel-expansivel-partes-processo > .pec-botao-polo-painel-expansivel-partes-processo > .mat-focus-indicator > .mat-button-wrapper > .fa')
          await page_.click('#mat-select-value-3 > .mat-select-placeholder')
          await page_.click('#mat-option-15 > .mat-option-text')
          await page_.click('#tipoPrazoAtoAgrupadoS > .mat-radio-label > .mat-radio-label-content')

          //const headingOne = await page.waitForSelector('.titulo-tarefa')
          //const headingOneText = await page.evaluate(el => el.textContent, headingOne)
  
          //headingOne.dispose()
          await page.close()
          //return headingOneText
        },

        async mudarPagina (browser) {
          const page = await pageRetrier(browser, 'https://desenvolvimento.pje.csjt.jus.br/pjekz/processo/366315/detalhe')
          await page.bringToFront();

          await page.waitForSelector('.mat-card-title')
          await page.click('[aria-label="Chip VERMELHO - Novo Processo"]');
          
        }
    }
})
}

async function pageRetrier(browser, url) {
  const page = await retry(async () => {
    const pages = await browser.pages()
    const page = pages.find(page => page.url().includes(url))

    if (!page) throw new Error('Could not find page')

    return page
  })

  return page
}


    
