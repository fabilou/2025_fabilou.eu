import React, { lazy } from "react"
import { graphql, useStaticQuery } from "gatsby"

interface HeadProps {
	children?: React.ReactNode
	description?: any
	image?: string
	lang?: string
	slug?: string
	title?: string
}

const Seo = ({
	children,
	description,
	image,
	lang,
	slug,
	title,
}: HeadProps) => {
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					author
					description
					lang
					siteUrl
					title
					titleTemplate
				}
			}
		}
	`)

	const site = data.site.siteMetadata

	const seo = {
		title: title ? title + site.titleTemplate : site.title,
		description: description || site.description,
		url: `${site.siteUrl}/${slug || ""}`,
		lang: lang || site.lang,
	}

	return (
		<>
			<title>{seo.title}</title>
			<meta name="description" content={seo.description} />
			{seo.url && <meta property="og:url" content={seo.url} />}
			{seo.url && <link rel={"canonical"} href={seo.url} />}
			<meta property="og:url" content={seo.url} />
			<meta property="og:site_name" content={seo.title} />
			<meta property="og:description" content={seo.description} />
			<html lang={seo.lang} />
			{children}
		</>
	)
}

export default Seo
