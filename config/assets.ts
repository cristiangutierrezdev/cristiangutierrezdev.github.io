import { PreRenderedAsset } from 'rollup'

interface AssetOutputEntry {
  output: string
  regex: RegExp
}

export const assetDir = 'assets'
export const entryFileNames = `${assetDir}/js/[name]-[hash].js`
export const chunkFileNames = `${assetDir}/js/[name]-[hash]-chunk.js`

const assets: AssetOutputEntry[] = [
  {
    output: `${assetDir}/img/[name]-[hash][extname]`,
    regex: /\.(png|jpe?g|gif|svg|webp|avif)$/
  },
  {
    regex: /\.css$/,
    output: `${assetDir}/css/[name]-[hash][extname]`
  },
  {
    output: `${assetDir}/js/[name]-[hash][extname]`,
    regex: /\.js$/
  },
  {
    output: '[name][extname]',
    regex: /\.xml$/
  }
]

export function processAssetFileNames (info: PreRenderedAsset): string | Error {
  if (info?.name === undefined) return Error('Info.name undefined')

  const name = info.name
  const result = assets.find(a => a.regex.test(name))
  if (result != null) {
    return result.output
  }

  // default since we don't have an entry
  return `${assetDir}/[name]-[hash][extname]`
}
