import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'

function PostCard(post) {
	return (
		<div className="mb-8">
			<h2 className="text-xl">
				<Link
					href={post.url}
					className="text-blue-700 hover:text-blue-900"
					legacyBehavior
				>
					{post.title}
				</Link>
			</h2>
			<time
				dateTime={post.date}
				className="block mb-2 text-xs text-gray-600"
			>
				{format(parseISO(post.date), 'LLLL d, yyyy')}
			</time>
			<div className="text-sm">{post.description}</div>
		</div>
	)
}

export default function Home() {
	const posts = allPosts.sort((a, b) =>
		compareDesc(new Date(a.date), new Date(b.date))
	)

	return (
		<div className="max-w-xl py-8 mx-auto">
			<h1 className="mb-8 text-3xl font-bold text-center">
				My Million Dollars Worth Blogs
			</h1>

			{posts.map((post, idx) => (
                <div className="post-card">
				<PostCard key={idx} {...post} />
                </div>
			))}
		</div>
	)
}
