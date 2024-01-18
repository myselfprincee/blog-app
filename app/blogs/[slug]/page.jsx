import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'

export const generateStaticParams = async () =>
	allPosts.map((post) => ({
		slug: post._raw.flattenedPath.replace(/ /g, '-')
	}))

export const generateMetadata = ({ params }) => {
	const post = allPosts.find(
		(post) => post._raw.flattenedPath.replace(/ /g, '-') === params.slug
	)
	return { title: post.title }
}

const PostLayout = ({ params }) => {
	const post = allPosts.find(
		(post) => post._raw.flattenedPath.replace(/ /g, '-') === params.slug
	)

	const Content = getMDXComponent(post.body.code)

	return (
		<article className="py-8 mx-auto max-w-xl prose prose-img:rounded-xl prose-a:text-blue-600" id="article">
			<div className="mb-8 text-center">
				<time
					dateTime={post.date}
					className="mb-1 text-xs text-gray-600"
				>
					{format(parseISO(post.date), 'LLLL d, yyyy')}
				</time>
				<h1>{post.title}</h1>
			</div>
			<Content />
		</article>
	)
}

export default PostLayout
