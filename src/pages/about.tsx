import * as React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"

import Popup from "../components/Popup"
import Tools from "../components/Tools"

const AboutPage: React.FC<PageProps> = () => {
	return (
		<>
			<Popup>
				<h1 className="visually-hidden">About</h1>
				<section>
					{/* <p>
						My work is a joyful exploration of experiences through creative
						technology and 3D imagery.
					</p> */}
					<p>I can not draw. That is why I learned to code.</p>
					<p>
						In my design studies at{" "}
						<a href="https://hm.edu" target="_blank" rel="noreferrer">
							Munich University of Applied Sciences
						</a>
						, I am experimenting with the connection between design and
						technological developments.
					</p>
					<p>
						Besides my studies, I collected experience at{" "}
						<a href="https://bus.group" target="_blank" rel="noreferrer">
							bus.group
						</a>{" "}
						and{" "}
						<a href="https://agentur-khor.com" target="_blank" rel="noreferrer">
							Agentur KHOR
						</a>
						.
					</p>
				</section>
				<section>
					<h3>Tools I use</h3>
					<Tools name="Houdini" skills={["Redshift", "Octane"]} />
					<Tools name="Blender" />
					<Tools name="Touchdesigner" />
					<Tools name="Unity" />
					<Tools name="Unreal Engine" />
					<Tools name="Web Technologies" />
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
			</Popup>
		</>
	)
}

export default AboutPage

export const Head: HeadFC = () => <title>About</title>
