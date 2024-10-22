import type { VideoInfo } from 'yt-caption-extractor'
import type { Lyric } from './types'
import { getVideoInfo as _getVideoInfo, getCaptions } from 'yt-caption-extractor'

export async function getLyrics(id: string, translations: string[] = []): Promise<Lyric[]> {
  // if translations is empty, return all lyrics
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
}

export async function getVideoInfo(id: string): Promise<VideoInfo | null> {
  return await _getVideoInfo(id)
}
