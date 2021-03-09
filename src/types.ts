export type ThemeDefinition = {
	file: string
	folder: string
	rootFolder: string
	fileNames: Record<string, string>
	folderNames: Record<string, string>
	folderNamesExpanded: Record<string, string>
	languageIds: Record<string, string>
	fileExtensions: Record<string, string>
}

export type IconDefRecord = Record<string, { iconPath: string }>

export type BuildThemeFile = ThemeDefinition & {
	iconDefinitions: IconDefRecord
	light: ThemeDefinition
}
