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
					<p>Boxhagener Str. 81</p>
					<p>10245 Berlin</p>
					<p>Germany</p>
					<p>
						<EmailButton text="hello@fabilou.eu" />
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
			{/* <section id="privacy">
				<h2>Privacy</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
					ratione accusantium quaerat, aperiam laudantium tempore repudiandae a
					ullam expedita quia eveniet corrupti aliquid libero facere odio
					incidunt id. Iste officiis alias expedita! Impedit quasi aut odio
					distinctio fugiat sint? Voluptates itaque rem quaerat, id at, tenetur
					natus ratione ipsa nam repudiandae iure, eaque nesciunt soluta sunt
					tempore doloremque pariatur delectus unde in culpa consectetur.
					Recusandae tempora, provident assumenda dignissimos porro impedit
					praesentium nostrum illo sunt omnis necessitatibus sapiente sint quasi
					nihil iusto officia debitis maxime! Facilis maxime dolore omnis rerum
					aut mollitia deserunt minima quaerat beatae voluptatibus iure quo
					consequatur reprehenderit natus animi, eum temporibus nihil magnam
					commodi quibusdam officiis. Alias, iure molestiae laborum iusto quasi
					amet atque voluptate, soluta animi eaque maxime! Quae quas excepturi,
					molestiae laudantium dolor officia ex nostrum cum minus sapiente
					reprehenderit, ducimus praesentium? Facilis aperiam ea, sunt debitis
					laborum voluptatem voluptates fuga quaerat quibusdam voluptatum quod
					doloremque quos quia quam molestiae optio totam cum odit labore
					assumenda? Facere omnis doloribus obcaecati sequi tenetur eius dolor
					provident ratione, non recusandae ea temporibus iusto officia,
					corrupti quisquam facilis ut voluptatum consequatur doloremque dolorum
					commodi dolore nulla quia. At totam nobis expedita. Illum quod
					accusantium suscipit. Voluptas veniam, dolores modi illo, dolorem
					pariatur dolore eaque consequuntur consectetur deserunt sint impedit
					numquam vitae iste et, aut fugiat aspernatur perferendis voluptates
					accusamus quas error quae laborum sequi. Nulla delectus sapiente quae,
					animi pariatur odio libero ad dolor optio doloremque harum saepe non.
					Natus sapiente suscipit aliquam! Quae odit voluptate debitis beatae
					modi. Unde quo exercitationem distinctio neque porro ipsam, ab ea
					tenetur eligendi sequi suscipit, odit placeat corporis magni. Adipisci
					in ullam iure perferendis impedit! Maxime natus vero voluptatum harum
					dolore ipsum commodi delectus nemo fugit aspernatur id, quidem
					ducimus. Itaque voluptate exercitationem, eaque repellendus ab
					molestias illo, nulla modi eius voluptatum quo voluptatem voluptas
					provident debitis consectetur! Nesciunt praesentium commodi ratione
					quidem error. Doloribus repellat nam fuga porro eius numquam rem a
					consequatur nemo nisi? Officiis nulla sequi asperiores ut sunt
					reprehenderit architecto qui expedita recusandae, id labore minima
					dignissimos exercitationem, quaerat magnam voluptate consectetur
					quibusdam error sapiente porro? Labore ex omnis distinctio beatae eos?
					Ut maxime necessitatibus inventore laudantium facere eos, nobis
					provident nostrum repellendus soluta facilis eveniet iure sequi
					perspiciatis iste sed ea numquam et! Obcaecati quibusdam debitis
					veniam quasi, neque laborum, asperiores est earum dolore quisquam qui
					nulla quae explicabo, eaque numquam quam quia tempore hic
					exercitationem. Enim deleniti, quaerat vero est quibusdam laboriosam
					voluptate! Molestias velit impedit ipsum aspernatur? Commodi velit,
					sed sit quos totam assumenda maiores esse eum aspernatur quas libero
					voluptates repudiandae odit nostrum! Suscipit ad quae vitae.
					Praesentium veniam voluptatum officiis qui est, neque harum earum eos
					recusandae fugiat omnis, architecto consequatur accusamus ipsam
					consequuntur excepturi hic porro quasi assumenda tempora. Repudiandae
					ipsa nulla porro, quidem iure ipsum, odit aut laborum perspiciatis
					tenetur officiis magni? Excepturi eos reprehenderit nobis nostrum
					inventore ex natus totam id architecto incidunt repellendus voluptatem
					quo blanditiis tempora sapiente, unde illum possimus sequi sunt rem
					ab. Adipisci, nihil.
				</p>
			</section> */}
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
		projects(slug: { eq: "index" }) {
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
			slug
		}
	}
`
