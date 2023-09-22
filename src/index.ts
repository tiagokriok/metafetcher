import * as cheerio from 'cheerio'

export async function fetchMetaTags(url: string): Promise<{
  ok: boolean
  metaOpenGraph: {
    title: string | undefined
    url: string | undefined
    description: string | undefined
    image: string | undefined
    type: string | undefined
  }
}> {
  const headers = new Headers({
    'User-Agent': 'TelegramBot (like TwitterBot)',
  })
  console.info(`Fetching meta tags from ${url}`)
  const response = await fetch(url, { headers })
  console.info(response)
  const data = await response.text()
  const $ = cheerio.load(data)

  const metaTitleTag = $('meta[property="og:title"]').attr('content')
  const metaUrlTag = $('meta[property="og:url"]').attr('content')
  const metaDescriptionTag = $('meta[property="og:description"]').attr(
    'content',
  )
  const metaImgTag = $('meta[property="og:image"]').attr('content')
  const metaOgTypeTag = $('meta[property="og:type"]').attr('content')

  return {
    ok: response.ok,
    metaOpenGraph: {
      title: metaTitleTag,
      url: metaUrlTag,
      description: metaDescriptionTag,
      image: metaImgTag,
      type: metaOgTypeTag,
    },
  }
}
