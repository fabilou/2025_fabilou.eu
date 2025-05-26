import * as React from "react"

interface GlobalContextType {
	index: string | undefined | null
	setIndex: (index: string | undefined | null) => void
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
	const [index, setIndex] = React.useState<any>()

	const [project, setProject] = React.useState<any>()

	const [projectURL, setProjectURL] = React.useState<string | undefined | null>(
		undefined
	)

	return (
		<GlobalContext.Provider
			value={{
				index: index,
				setIndex: setIndex,
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
