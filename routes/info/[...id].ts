import { getVideoInfo } from 'yt-caption-extractor'
import { handleYoutubeVideoIdQuery } from '~/utils/handle'

export default eventHandler(async (event) => {
  return handleYoutubeVideoIdQuery(event, getVideoInfo)
})
