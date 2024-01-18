import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypePrettyCode from "rehype-pretty-code";

const Post = defineDocumentType(() => ({
	name: 'Post',
	filePathPattern: `**/*.mdx`,
	contentType: 'mdx',
	fields: {},
	computedFields: {
		url: {
			type: 'string',
			resolve: (doc) => `/blogs/${doc._raw.flattenedPath}`
		}
	}
}))

export default makeSource({
	contentDirPath: 'posts',
	documentTypes: [Post],
	mdx : { rehypePlugins : 
		[rehypePrettyCode, {
			  theme: 'one-dark-pro',
			  onVisitLine(node) {
				if (node.children.length === 0) {
				  node.children = [{ type: 'text', value: ' ' }];
				}
			  },
			  onVisitHighlightedLine(node) {
				node.properties.className.push('line--highlighted');
			  },
			  onVisitHighlightedWord(node) {
				node.properties.className = ['word--highlighted'];
			  },
			}]}
})
