import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import * as styles from "./Thumbnail.module.sass"

interface ThumbnailProps {
	caption?: string
	image: any
	hidden?: boolean
	slug?: string
	type: string
	width?: number
}

const Thumbnail: React.FC<ThumbnailProps> = ({
	caption,
	image,
	hidden,
	slug,
	type,
	width,
}) => {
	const thumbnail = React.useRef<HTMLDivElement>(null)
	const video = React.useRef<HTMLVideoElement>(null)

	const [visible, setVisible] = React.useState(true)

	React.useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setVisible(true)
				} else {
					setVisible(false)
				}
			})
		})

		if (thumbnail.current) {
			observer.observe(thumbnail.current)
		}

		return () => {
			if (thumbnail.current) {
				observer.unobserve(thumbnail.current)
			}
		}
	}, [])

	return (
		<figure
			className={styles.thumbnail}
			hidden={hidden}
			onPointerEnter={(e) => e.currentTarget.classList.add(styles.hover)}
			onPointerLeave={(e) => e.currentTarget.classList.remove(styles.hover)}
			ref={thumbnail}
			style={{
				flexBasis: `min(min(${
					width ? width : 1
				} * var(--column-width), 75vw), 50vh)`,
			}}
		>
			{type === "video/mp4" || type === "video/webm" ? (
				<video
					autoPlay
					controls={false}
					controlsList="nodownload"
					disablePictureInPicture
					loop
					muted
					playsInline
					ref={video}
				>
					<source src={visible ? image : ""} type={type} />
				</video>
			) : type === "image/jpeg" ||
			  type === "image/png" ||
			  type === "image/webp" ||
			  type === "image/gif" ||
			  type === "image/svg" ? (
				<GatsbyImage image={image} alt="#" />
			) : (
				<></>
			)}
			{caption ? (
				slug ? (
					<Link to={"/" + slug}>
						<figcaption className={styles.description}>
							<span>{caption}</span>
						</figcaption>
					</Link>
				) : (
					<figcaption className={styles.description}>
						<span>{caption}</span>
					</figcaption>
				)
			) : (
				<></>
			)}
		</figure>
	)
}

export default Thumbnail
