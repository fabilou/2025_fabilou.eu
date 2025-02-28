import * as React from "react"
import { HeadFC, graphql, PageProps } from "gatsby"

import { useGlobalContext } from "../components/GlobalContext"
import ProjectInfo from "../components/ProjectInfo"

const ProjectTemplatePage: React.FC<PageProps> = ({ data, location }: any) => {
	const { setProjectInfo, setProjectURL } = useGlobalContext()

	const project = data.projectsYaml

	React.useEffect(() => {
		setProjectInfo(
			<ProjectInfo
				description={project.description}
				info={project.info}
				title={project.title}
			/>
		)
		setProjectURL(location.pathname)
	}, [])

	return <></>
}

export default ProjectTemplatePage

export const query = graphql`
	query ($slug: String!) {
		galleryYaml(slug: { eq: $slug }) {
			slug
		}
		projectsYaml(slug: { eq: $slug }) {
			description
			info {
				label
				value
			}
			slug
			title
		}
	}
`

export const Head: HeadFC = () => <title></title>
