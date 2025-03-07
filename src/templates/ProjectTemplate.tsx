import * as React from "react"
import { HeadFC, graphql, PageProps } from "gatsby"

import { useGlobalContext } from "../components/GlobalContext"
import Projects from "../components/Projects"
import Seo from "../components/seo"

const ProjectTemplatePage: React.FC<PageProps> = ({ data, location }: any) => {
	const { setProjectURL, setProject } = useGlobalContext()

	React.useEffect(() => {
		setProjectURL(location.pathname)
		setProject(data.projects)
	}, [])

	return <></>
}

export default ProjectTemplatePage

export const Head: HeadFC = ({ data }: any) =>
	data.projects.projectInfo && (
		<Seo title={data.projects.projectInfo.title} slug={data.projects.slug} />
	)

export const query = graphql`
	query ($slug: String!) {
		projects(slug: { eq: $slug }) {
			media {
				link {
					path
					title
				}
				path {
					childImageSharp {
						gatsbyImageData
					}
					internal {
						mediaType
					}
					publicURL
				}
				width
			}
			projectInfo {
				description
				info {
					label
					value
				}
				links {
					label
					target
				}
				tags
				title
			}
			slug
		}
	}
`
