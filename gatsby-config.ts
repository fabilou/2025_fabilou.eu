import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
	siteMetadata: {
		title: "fabilou.eu",
		siteUrl: "https://www.fabilou.eu",
		author: "Fabi Lou Viktoria Sax",
	},
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [
		"gatsby-plugin-image",
		"gatsby-plugin-layout",
		"gatsby-plugin-minify",
		"gatsby-plugin-sass",
		"gatsby-plugin-sharp",
		"gatsby-plugin-sitemap",
		"gatsby-transformer-sharp",
		"gatsby-transformer-yaml",
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Fabi Lou Viktoria Sax`,
				short_name: `Fabi Lou Viktoria`,
				start_url: `/`,
				background_color: `#eee`,
				theme_color: `#fff`,
				display: `minimal-ui`,
				icon: `src/data/favicon.png`,
				lang: `en`,
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "data",
				path: "./src/data/",
			},
		},
		"gatsby-plugin-offline",
	],
}

export default config
