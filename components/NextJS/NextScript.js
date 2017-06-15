import { NextScript as NativeScript } from 'next/document'
import htmlescape from 'htmlescape';
import { getPagePathname } from '@/utils'

class NextScript extends NativeScript {
  getChunkScript (filename, additionalProps = {}) {
    const { __NEXT_DATA__ } = this.context._documentProps
    let { buildStats, buildId } = __NEXT_DATA__
    const { prefix } = this.props;
    const hash = buildStats ? buildStats[filename].hash : buildId

    return (
      <script
        key={filename}
        type='text/javascript'
        src={`${prefix}/_next/${hash}/${filename}`}
        {...additionalProps}
      />
    )
  }

  getScripts () {
    const { dev } = this.context._documentProps
    if (dev) {
      return [
        this.getChunkScript('manifest.js'),
        this.getChunkScript('commons.js'),
        this.getChunkScript('main.js')
      ]
    }

    // In the production mode, we have a single asset with all the JS content.
    // So, we can load the script with async
    return [this.getChunkScript('app.js', { async: true })]
  }

  getDynamicChunks () {
    const { chunks } = this.context._documentProps
    const { prefix } = this.props;
    return (
      <div>
        {chunks.map((chunk) => (
          <script
            async
            key={chunk}
            type='text/javascript'
            src={`${prefix}/_next/webpack/chunks/${chunk}`}
          />
        ))}
      </div>
    )
  }

  render () {
    const { staticMarkup, __NEXT_DATA__, chunks } = this.context._documentProps
    const { pathname, nextExport, buildId } = __NEXT_DATA__
    const { prefix } = this.props;
    const pagePathname = getPagePathname(pathname, nextExport)

    __NEXT_DATA__.chunks = chunks

    return <div>
      {staticMarkup ? null : <script dangerouslySetInnerHTML={{
        __html: `
          __NEXT_DATA__ = ${htmlescape(__NEXT_DATA__)}
          module={}
          __NEXT_LOADED_PAGES__ = []
          __NEXT_LOADED_CHUNKS__ = []
          __NEXT_REGISTER_PAGE = function (route, fn) {
            __NEXT_LOADED_PAGES__.push({ route: route, fn: fn })
          }
          __NEXT_REGISTER_CHUNK = function (chunkName, fn) {
            __NEXT_LOADED_CHUNKS__.push({ chunkName: chunkName, fn: fn })
          }
        `
      }} />}
      <script async id={`__NEXT_PAGE__${pathname}`} type='text/javascript' src={`${prefix}/_next/${buildId}/page${pagePathname}`} />
      <script async id={`__NEXT_PAGE__/_error`} type='text/javascript' src={`${prefix}/_next/${buildId}/page/_error/index.js`} />
      {staticMarkup ? null : this.getDynamicChunks()}
      {staticMarkup ? null : this.getScripts()}
    </div>
  }
}

export default NextScript;
