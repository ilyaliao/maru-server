import { getCaptions } from 'yt-caption-extractor'
import type { Lyric } from '~/types'
import { handleYoutubeVideoIdQuery } from '~/utils/handle'

export default eventHandler(async (event) => {
  return handleYoutubeVideoIdQuery(event, async (id) => {
    const { translations = [] } = getQuery<{ translations: string[] }>(event)

    const captions = await getCaptions(id, { lang: translations })

    const mergedLyrics: Lyric[] = []
    const lyricMap = new Map<number, Lyric>()

    for (const [lang, lyrics] of captions.entries()) {
      for (const lyric of lyrics) {
        const t = lyric.start
        if (lyricMap.has(t)) {
          const existingLyric = lyricMap.get(t)!
          existingLyric.trans![lang] = lyric.word
        }
        else {
          const newLyric: Lyric = {
            t,
            trans: { [lang]: lyric.word },
          }
          lyricMap.set(t, newLyric)
          mergedLyrics.push(newLyric)
        }
      }
    }

    return mergedLyrics
  })
})
