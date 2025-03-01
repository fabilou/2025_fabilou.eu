import React, { ForwardedRef, forwardRef } from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import * as styles from "./Thumbnail.module.sass"

interface ImageProps {
	img: any
	mediaType: string
}

const Image: React.FC<ImageProps> = React.forwardRef(
	({ img, mediaType }, ref: ForwardedRef<HTMLVideoElement>) => {
		if (mediaType === "video/mp4" || mediaType === "video/webm") {
			return (
				<video
					autoPlay
					controls={false}
					controlsList="nodownload"
					disablePictureInPicture
					loop
					muted
					playsInline
					ref={ref}
				>
					<source src={img} type={mediaType} />
				</video>
			)
		} else if (
			mediaType === "image/jpeg" ||
			mediaType === "image/png" ||
			mediaType === "image/webp" ||
			mediaType === "image/gif" ||
			mediaType === "image/svg"
		) {
			return <GatsbyImage image={img} alt="" />
		} else return <></>
	}
)

interface ThumbnailProps {
	caption?: string
	hidden?: boolean
	image: any
	ref?: React.ForwardedRef<HTMLDivElement>
	slug?: string
	type: string
	width?: number
}

const Thumbnail: React.FC<ThumbnailProps> = React.forwardRef(
	({ caption, image, hidden, slug, type, width }, ref) => {
		// const thumbnail = React.useRef<HTMLDivElement>(null)
		const video = React.useRef<HTMLVideoElement>(null)

		// const [visible, setVisible] = React.useState(true)

		// React.useEffect(() => {
		// 	const observer = new IntersectionObserver((entries) => {
		// 		entries.forEach((entry) => {
		// 			if (entry.isIntersecting) {
		// 				setVisible(true)
		// 			} else {
		// 				setVisible(false)
		// 			}
		// 		})
		// 	})

		// 	if (thumbnail.current) {
		// 		observer.observe(thumbnail.current)
		// 	}

		// 	return () => {
		// 		if (thumbnail.current) {
		// 			observer.unobserve(thumbnail.current)
		// 		}
		// 	}
		// }, [])

		return (
			<figure
				className={styles.thumbnail}
				hidden={hidden}
				ref={ref}
				style={{
					flexBasis: `min(min(${
						width ? width : 1
					} * var(--column-width), 75vw), 50vh)`,
				}}
			>
				{slug ? (
					<>
						<Image img={image} mediaType={type} />
						{caption && (
							<Link to={"/" + slug}>
								<figcaption className={styles.description}>
									<span>{caption}</span>
									<span>↗</span>
								</figcaption>
							</Link>
						)}
					</>
				) : (
					<>
						<Image img={image} mediaType={type} />
						{caption && (
							<figcaption className={styles.description}>
								<span>{caption}</span>
								<span>↗</span>
							</figcaption>
						)}
					</>
				)}
			</figure>
		)
	}
)

export default Thumbnail
