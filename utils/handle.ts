import type { EventHandlerRequest, H3Error, H3Event } from 'h3'

export async function handleYoutubeVideoIdQuery<T>(
  event: H3Event<EventHandlerRequest>,
  handler: (id: string) => Promise<T>,
): Promise<T | T[] | H3Error> {
  const id = decodeURIComponent(event.context.params.id)

  return await handler(id)
}
