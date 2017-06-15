import { Head as NativeHead } from 'next/document'
import { getPagePathname } from '@/utils'

export class Head extends NativeHead {
  getChunkPreloadLink (filename) {
    const { __NEXT_DATA__ } = this.context._documentProps
    let { buildStats, buildId } = __NEXT_DATA__
    const { prefix } = this.props

    const hash = buildStats ? buildStats[filename].hash : buildId

    return (
      <link
        key={filename}
        rel='preload'
        href={`${prefix}/_next/${hash}/${filename}`}
        as='script'
      />
    )
  }

  getPreloadMainLinks () {
    const { dev } = this.context._documentProps
    if (dev) {
      return [
        this.getChunkPreloadLink('manifest.js'),
        this.getChunkPreloadLink('commons.js'),
        this.getChunkPreloadLink('main.js')
      ]
    }

    // In the production mode, we have a single asset with all the JS content.
    return [
      this.getChunkPreloadLink('app.js')
    ]
  }

  getPreloadDynamicChunks () {
    const { chunks, __NEXT_DATA__ } = this.context._documentProps
    const { prefix } = this.props
    return chunks.map((chunk) => (
      <link
        key={chunk}
        rel='preload'
        href={`${prefix}/_next/webpack/chunks/${chunk}`}
        as='script'
      />
    ))
  }

  render () {
    const { head, styles, __NEXT_DATA__ } = this.context._documentProps
    const { pathname, buildId, nextExport } = __NEXT_DATA__
    const pagePathname = getPagePathname(pathname, nextExport)
    const { prefix } = this.props

    const newProps = {}

    Object.keys(this.props).forEach(key => {
      if (key !== 'prefix') {
        newProps[key] = this.props[key]
      }
    })

    return <head {...newProps}>
      <link rel='preload' href={`${prefix}/_next/${buildId}/page${pagePathname}`} as='script' />
      <link rel='preload' href={`${prefix}/_next/${buildId}/page/_error/index.js`} as='script' />
      {this.getPreloadDynamicChunks()}
      {this.getPreloadMainLinks()}
      {(head || []).map((h, i) => React.cloneElement(h, { key: i }))}
      {styles || null}
      {this.props.children}
    </head>
  }
}

export default Head;
