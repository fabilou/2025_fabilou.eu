import * as React from "react"
import { HeadFC, graphql, PageProps } from "gatsby"

import { useGlobalContext } from "../components/GlobalContext"
import Seo from "../components/seo"

const ProjectTemplatePage: React.FC<PageProps> = ({ data, location }: any) => {
	const { setProjectInfo, setProjectURL } = useGlobalContext()

	const { title, description, info, links, tags } = data.projectsYaml

	React.useEffect(() => {
		setProjectInfo({ title, description, info, links, tags })
		setProjectURL(location.pathname)
	}, [])

	return <></>
}

export default ProjectTemplatePage

export const Head: HeadFC = ({ data }: any) => (
	<Seo title={data.projectsYaml.title} slug={data.projectsYaml.slug} />
)

export const query = graphql`
	query ($slug: String!) {
		projectsYaml(slug: { eq: $slug }) {
			description
			info {
				label
				value
			}
			links {
				label
				target
			}
			slug
			tags
			title
		}
	}
`
