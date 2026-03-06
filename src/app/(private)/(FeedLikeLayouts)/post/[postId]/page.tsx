import { Metadata } from 'next'
import { SinglePostDisplay } from './SinglePostDisplay'

export const metadata: Metadata = {
  title: 'Viewing post',
}

export default async function SinglePost({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params

  return <SinglePostDisplay postId={postId} />
}
