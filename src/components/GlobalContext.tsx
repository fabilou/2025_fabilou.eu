import * as React from "react"

interface GlobalContextType {
	projectInfo: {
		title: string
		description: string
		info: [{ label: string; value: [string] }]
		links: [{ label: string; target: string }]
		tags: [string]
	} | null
	setProjectInfo: (
		projectInfo: {
			title: string
			description: string
			info: [{ label: string; value: [string] }]
			links: [{ label: string; target: string }]
			tags: [string]
		} | null
	) => void
	projectURL: string | undefined
	setProjectURL: (projectURL: string | undefined) => void
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
	const [projectURL, setProjectURL] = React.useState<string | undefined>(
		undefined
	)

	const [projectInfo, setProjectInfo] = React.useState<{
		title: string
		description: string
		info: [{ label: string; value: [string] }]
		links: [{ label: string; target: string }]
		tags: [string]
	} | null>(null)

	return (
		<GlobalContext.Provider
			value={{
				projectInfo: projectInfo,
				setProjectInfo: setProjectInfo,
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
