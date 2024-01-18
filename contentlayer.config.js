import { makeSource, defineDocumentType } from "@contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    subtitle: { type: 'string', required: true },
    date: { type: 'date', required: true },
    image: { type: 'string', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/${post._raw.flattenedPath}` },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post]
})




