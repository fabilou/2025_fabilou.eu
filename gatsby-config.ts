import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
	siteMetadata: {
		title: `fabilou.eu`,
		siteUrl: `https://www.fabilou.eu`,
	},
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [
		"gatsby-plugin-image",
		"gatsby-plugin-sass",
		"gatsby-plugin-sitemap",
		`gatsby-plugin-layout`,
		`gatsby-transformer-yaml`,
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				icon: "src/data/favicon.png",
			},
		},
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "data",
				path: "./src/data/",
			},
		},
	],
}

export default config
