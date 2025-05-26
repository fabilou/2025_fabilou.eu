import * as React from "react"
import { HeadFC, graphql, PageProps } from "gatsby"

import { useGlobalContext } from "../components/GlobalContext"
import Popup from "../components/Popup"
import EmailButton from "../components/EmailButton"
import Seo from "../components/seo"

const LegalPage: React.FC<PageProps> = ({ data }: any) => {
	const { setProject, projectURL, setProjectURL } = useGlobalContext()

	React.useEffect(() => {
		if (!projectURL) {
			setProjectURL(null)
			setProject(data.projects)
		}
	}, [])
	return (
		<Popup>
			<h2>Legal Notice</h2>
			<section id="imprint">
				<p>Controller of this website (§5 TMG):</p>
				<address>
					<p>Fabi Lou Viktoria Sax</p>
					<p>
						<EmailButton text="hello@fabilou.com" />
					</p>
				</address>
			</section>
			<section>
				<h3>Design &amp; Code</h3>
				<p>Fabi Lou Viktoria Sax</p>
			</section>
			<section>
				<h3>Fonts</h3>
				<p>Apfel Grotezk by Collletttivo</p>
				<p>Lunchtype25 by Stefan Wetterstrand</p>
			</section>
			<section id="copyright">
				<h3>Copyright</h3>
				<p>
					This the content of this website is subject to German copyright law.
					The usage, reproduction or modification of its material (text, image,
					video, audio, etc.) is not permitted, unless explicit authorisation by
					the controller of this website. Exceptions to this are the used fonts.
					Their copyright and terms of use may differ from those above.
				</p>
			</section>
		</Popup>
	)
}

export default LegalPage

export const Head: HeadFC = () => (
	<Seo title="Legal Notice">
		<meta name="robots" content="noindex"></meta>
	</Seo>
)

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
