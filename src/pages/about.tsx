import * as React from "react"
import { HeadFC, graphql, PageProps } from "gatsby"

import { useGlobalContext } from "../components/GlobalContext"
import Popup from "../components/Popup"
import Tools from "../components/Tools"
import EmailButton from "../components/EmailButton"
import Seo from "../components/seo"

const AboutPage: React.FC<PageProps> = ({ data }: any) => {
	const { setProject, projectURL, setProjectURL } = useGlobalContext()

	React.useEffect(() => {
		if (!projectURL) {
			setProjectURL(null)
			setProject(data.projects)
		}
	}, [])

	return (
		<>
			<Popup>
				<h2>About</h2>
				<section>
					<p>I can't draw. That is why I learned to code.</p>
					<p>
						I'm a freelance 3D designer, web designer and creative technologist
						based in Berlin.
					</p>
					<p>
						During my design studies at{" "}
						<a href="https://hm.edu" target="_blank" rel="noreferrer">
							Munich University of Applied Sciences
						</a>
						, I explored the connection between design and technological
						developments. Besides my studies, I collected experience at{" "}
						<a href="https://bus.group" target="_blank" rel="noreferrer">
							bus.group
						</a>{" "}
						and{" "}
						<a href="https://agentur-khor.com" target="_blank" rel="noreferrer">
							Agentur&nbsp;KHOR
						</a>
						.
					</p>
				</section>
				<section>
					<h3>Tools I use</h3>
					<Tools name="Houdini" skills={["Redshift", "Octane"]} />
					<Tools name="Cinema 4D" />
					<Tools name="Blender" />
					<Tools name="Touchdesigner" />
					<Tools name="Unity" />
					<Tools name="Unreal Engine" />
					<Tools name="Web Technologies" skills={["React", "Node.JS"]} />
				</section>
				<section>
					<h3>Selected clients and collaborators</h3>
					<Tools name="Bucherer" />
					<Tools name="Forward Festival" />
					<Tools name="On Running" />
					<Tools name="Pinakothek der Moderne" />
					<Tools name="Porsche" />
					<Tools name="Postmates" />
					<Tools name="Sotheby's" />
					<Tools name="Zalando" />
				</section>
				<section>
					<h3>Let's collaborate!</h3>
					<p>
						I'd love to hear about your ideas at{" "}
						<EmailButton text="hello@fabilou.com" />
					</p>
				</section>
			</Popup>
		</>
	)
}

export default AboutPage

export const Head: HeadFC = () => <Seo title="About" />

export const query = graphql`
	query {
		projects(slug: { eq: "3d" }) {
			media {
				columns
				link {
					path
					title
				}
				path {
					childImageSharp {
						gatsbyImageData
						resize {
							aspectRatio
						}
					}
					childVideoFfmpeg {
						transcode {
							aspectRatio
							src
						}
					}
					internal {
						mediaType
					}
					publicURL
				}
			}
			slug
		}
	}
`
