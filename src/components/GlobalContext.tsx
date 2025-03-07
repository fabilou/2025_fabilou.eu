import * as React from "react"
import { GatsbyImageProps } from "gatsby-plugin-image"

interface GlobalContextType {
	project: any | undefined
	setProject: (project: any) => void
	projectURL: string | undefined | null
	setProjectURL: (projectURL: string | undefined | null) => void
}

const GlobalContext = React.createContext<GlobalContextType | undefined>(
	undefined
)

interface GlobalContextProviderProps {
	children?: React.ReactNode
}

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
	children,
}) => {
	const [projectURL, setProjectURL] = React.useState<string | undefined | null>(
		undefined
	)

	const [project, setProject] = React.useState<any>()

	return (
		<GlobalContext.Provider
			value={{
				project: project,
				setProject: setProject,
				projectURL: projectURL,
				setProjectURL: setProjectURL,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

const useGlobalContext = (): GlobalContextType => {
	const context = React.useContext(GlobalContext)

	if (!context) {
		throw new Error(
			"useGlobalContext must be used within a GlobalContextProvider"
		)
	}

	return context
}

export { GlobalContextProvider, useGlobalContext }
