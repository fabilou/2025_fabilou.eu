import { GatsbyNode } from "gatsby"
import path from "path"

type Data = {
	data?: any
	errors?: any
	allMdx?: any
	result?: any
}

const projectTemplate = path.resolve(`./src/templates/ProjectTemplate.tsx`)

export const createPages: GatsbyNode["createPages"] = async ({
	graphql,
	actions,
	reporter,
}) => {
	const { createPage } = actions

	const result: Data = await graphql(`
		query {
			allGalleryYaml(filter: { slug: { glob: "!null" } }) {
				nodes {
					slug
				}
			}
		}
	`)

	if (result.errors) {
		reporter.panicOnBuild("Error", result.errors)
	}

	// Create blog post pages.
	const projects = result.data.allGalleryYaml.nodes

	// you'll call `createPage` for each result
	projects.forEach(async (project: any) => {
		createPage({
			// As mentioned above you could also query something else like frontmatter.title above and use a helper function
			// like slugify to create a slug
			path: project.slug,
			// Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
			component: `${projectTemplate}`,
			// You can use the values in this context in
			// our page layout component
			context: { slug: project.slug },
		})
	})
}
