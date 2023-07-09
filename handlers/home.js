import { readFile } from 'node:fs/promises'

const deferredHtml = async (selector, filename) => {
    const contents = await readFile(filename, { encoding: 'utf-8' })
    return `
        <div id="__${selector}__loader__" style="display:none">
            <template id="${selector}-fragment">${contents}</template>
            <script>
                ;(() => {
                    const container = document.querySelector(".${selector}")
                    const fragment = document.querySelector("#${selector}-fragment")
                    const shadow = container.attachShadow({mode: "open"})
                    shadow.appendChild(fragment.content.cloneNode(true))
                    container.classList.remove("loading")
                    fragment.parentElement.remove()
                })();
            </script>
        </div>
    `
}

const randomWait = () =>
    new Promise((resolve) => setTimeout(resolve, Math.random() * 5000 + 100))

const deferredLoad = async (res, selector) => {
    const script = await deferredHtml(
        selector,
        `handlers/home/${selector}.html`
    )
    await randomWait()
    res.write(script)
    console.log(`wrote ${selector}`)
}

export const home = async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    const shell = await readFile('handlers/home/shell.html', {
        encoding: 'utf-8',
    })
    res.write(shell)

    await Promise.all([
        deferredLoad(res, 'header'),
        deferredLoad(res, 'nav'),
        deferredLoad(res, 'aside'),
        deferredLoad(res, 'main'),
        deferredLoad(res, 'footer'),
    ])
    res.end('\n')
}
