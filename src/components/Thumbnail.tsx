import React, { ForwardedRef, forwardRef } from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import useViewportSize from "../hooks/use-viewport-size"

import * as styles from "./Thumbnail.module.sass"

interface ImageProps {
	columns?: number
	img: any
	mediaType: string
}

const Image: React.FC<ImageProps> = ({ img, mediaType }) => {
	const video = React.useRef<HTMLVideoElement>(null)

	const viewportSize = useViewportSize()

	React.useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					video.current?.play()
				} else {
					video.current?.pause()
				}
			})
		})

		if (video.current) {
			observer.observe(video.current)
		}

		return () => {
			if (video.current) {
				observer.unobserve(video.current)
			}
		}
	}, [])

	if (["video/mp4", "video/webm"].some((type) => type === mediaType)) {
		return (
			<video
				autoPlay
				controls={false}
				controlsList="nodownload"
				disablePictureInPicture
				loop
				muted
				playsInline
				preload="metadata"
				ref={video}
			>
				{viewportSize.width <= 768 ? (
					<>
						<source src={img} type="video/mp4" />
					</>
				) : (
					<>
						<source src={img} type="video/mp4" />
					</>
				)}
			</video>
		)
	} else if (
		["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg"].some(
			(type) => type === mediaType
		)
	) {
		return <GatsbyImage className={styles.image} image={img} alt="" />
	} else return <></>
}

interface ThumbnailProps {
	aspectRatio?: number
	caption?: string
	columns?: number
	image: any
	ref?: React.ForwardedRef<HTMLLIElement>
	slug?: string
	style?: React.CSSProperties
	type: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
	aspectRatio,
	caption,
	columns,
	image,
	slug,
	style,
	type,
}) => {
	return (
		<li
			className={styles.thumbnail}
			style={{
				flexBasis: `min(var(--column-width) * ${columns} * ${aspectRatio}, ${
					aspectRatio && aspectRatio <= 1 ? 45 : 80
				}vh)`,
				...style,
			}}
		>
			<figure style={{ aspectRatio: aspectRatio }}>
				{slug ? (
					<>
						<Image columns={columns} img={image} mediaType={type} />
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
						<Image columns={columns} img={image} mediaType={type} />
						{caption && (
							<figcaption className={styles.description}>
								<span>{caption}</span>
								<span>↗</span>
							</figcaption>
						)}
					</>
				)}
			</figure>
		</li>
	)
}

export default Thumbnail
