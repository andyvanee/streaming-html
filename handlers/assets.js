import { dirname, join, extname } from 'node:path'
import { readFile, stat } from 'node:fs/promises'
const rootDir = join(dirname(new URL(import.meta.url).pathname), 'assets')

const mimeTypes = {
    default: 'application/octet-stream',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'font/eot',
    '.otf': 'font/otf',
    '.txt': 'text/plain',
    '.ico': 'image/x-icon',
}

export const assets = async (req, res) => {
    const { url } = req
    const filename = url.replace(/\/$/, '/index.html').slice(1)
    const path = join(rootDir, filename)

    try {
        const fileinfo = await stat(path)
        const ext = mimeTypes[extname(path)] || mimeTypes['default']

        if (fileinfo.isFile()) {
            const content = await readFile(path)
            res.writeHead(200, { 'Content-Type': ext })
            res.end(content)
            return true
        }
    } catch (error) {}

    return false
}
