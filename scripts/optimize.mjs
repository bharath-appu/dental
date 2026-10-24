// One-off asset optimizer: compresses images to WebP and re-encodes videos.
// Usage: node scripts/optimize.mjs
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import sharp from 'sharp'
import ffmpegPath from 'ffmpeg-static'

const root = path.dirname(path.dirname(url.fileURLToPath(import.meta.url)))
const imagesDir = path.join(root, 'public', 'images')
const videosDir = path.join(root, 'public', 'videos')

const formatKB = (n) => `${(n / 1024).toFixed(0)} KB`

// filename -> max output width (WebP). Unlisted files get DEFAULT_WIDTH.
const WIDTHS = {
  // avatars (small circles)
  'zyLihMsmSSdiL5g5jHJn4e6zQ.jpg': 320,
  '0YT123QRbremRM1AgxCueBx7IRY.jpg': 320,
  'yWUGDZMAYtE216zWWnYBZ0LBoRo.jpg': 320,
  'BcSdxaffL9NSUbnZMFbwTXGgdcc.jpg': 320,
  'puGp4Hi5DUcsbLLVVYEhrdP1lg.jpg': 320,
  'BobOk65j6uDzBORMNee0gKRWGk.jpg': 320,
  'cPnLmzkyXcZEojXUlOLK54T0yw.jpg': 320,
  'G45vgYrNZfse4JlMfG3uP8wg.jpg': 320,
  // team portraits
  '59ccaHEry6LmkQC2s7WW4oeuw.png': 800,
  'BgzDweKKcYi3foYwXJZyMcZYmv4.png': 800,
  'GGnOiqzPpii2W1kI8LFkTIFJvs0.jpg': 800,
  '1ry27CM8DZ4TfIL4fu1Z2owiZj4.png': 800,
  // video posters
  'QZcT8U16OIs9tqgJachnJ2ZZZH0.png': 1600,
  'F8S4eX96Pul5uYP4Yc6E8GH3aM.jpg': 1600,
  // hero-card css background + content photos
  'dWARlvTfJvZGsuaCnPbV2hIzCRs.png': 1280,
  '7zUhY9tbKk709Vw1k1wRc73HBk.jpg': 1200,
  'Tk5H6Gua9njSZMCM2LwGgGGlFu4.jpg': 1200,
}
const DEFAULT_WIDTH = 1600
// tiny icons / favicon, keep as-is
const SKIP = new Set(['v1ygPtUXsBDpWJxV8OL9wTmwG0.png', '9HpSa7B7kSxiSm3vc0DP0YM6u4Q.png'])

const replaced = new Map() // old "name.ext" -> "name.webp"

async function optimizeImages() {
  console.log('--- images ---')
  for (const file of fs.readdirSync(imagesDir)) {
    if (SKIP.has(file)) continue
    const ext = path.extname(file).toLowerCase()
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue
    const src = path.join(imagesDir, file)
    const out = path.join(imagesDir, `${path.basename(file, ext)}.webp`)
    const before = fs.statSync(src).size
    await sharp(src)
      .resize({ width: WIDTHS[file] ?? DEFAULT_WIDTH, withoutEnlargement: true })
      .webp({ quality: 76 })
      .toFile(out)
    const after = fs.statSync(out).size
    fs.rmSync(src)
    replaced.set(file, `${path.basename(file, ext)}.webp`)
    console.log(`${file} -> ${path.basename(out)}  ${formatKB(before)} -> ${formatKB(after)}`)
  }
}

function optimizeVideo(src, maxWidth, crf) {
  const before = fs.statSync(src).size
  const tmp = src.replace(/\.mp4$/, '') + '.opt.mp4'
  const args = [
    '-y', '-i', src,
    '-vf', `scale='min(${maxWidth},iw)':-2`,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', String(crf),
    '-pix_fmt', 'yuv420p', '-profile:v', 'high',
    '-an', // muted player, audio not needed
    '-movflags', '+faststart', // start playing while still downloading
    tmp,
  ]
  const res = spawnSync(ffmpegPath, args, { stdio: ['ignore', 'ignore', 'pipe'] })
  if (res.status !== 0) {
    console.error(`ffmpeg failed for ${src}:\n${res.stderr.toString().slice(-1500)}`)
    fs.rmSync(tmp, { force: true })
    return
  }
  fs.rmSync(src)
  fs.renameSync(tmp, src)
  const after = fs.statSync(src).size
  console.log(`${path.basename(src)}  ${formatKB(before)} -> ${formatKB(after)}`)
}

// rewrite references in source files
function rewriteRefs() {
  const files = ['src', 'index.html'].flatMap((f) =>
    fs.statSync(path.join(root, f)).isDirectory()
      ? fs.readdirSync(path.join(root, f), { recursive: true }).map((x) => path.join(root, f, x))
      : [path.join(root, f)]
  )
  for (const f of files) {
    if (!/\.(jsx?|css|html)$/.test(f)) continue
    let content = fs.readFileSync(f, 'utf8')
    let changed = false
    for (const [from, to] of replaced) {
      if (content.includes(from)) {
        content = content.split(from).join(to)
        changed = true
      }
    }
    if (changed) {
      fs.writeFileSync(f, content)
      console.log(`refs updated: ${path.relative(root, f)}`)
    }
  }
}

await optimizeImages()
console.log('--- videos ---')
optimizeVideo(path.join(videosDir, 'hero.mp4'), 1920, 26)
optimizeVideo(path.join(videosDir, 'about-clinic.mp4'), 960, 27)
rewriteRefs()
console.log('done')
