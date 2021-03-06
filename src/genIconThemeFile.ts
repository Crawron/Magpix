import { IconDefRecord, ThemeDefinition, BuildThemeFile } from "./types"
import fs from "fs"
import mkdirp from "mkdirp"

function getIconDefs(path: string): IconDefRecord {
	const iconDefs: Record<string, { iconPath: string }> = {}
	for (const filename of fs.readdirSync(path, "utf8")) {
		iconDefs[filename.replace(/\.svg$/, "")] = {
			iconPath: `./icons/${filename}`,
		}

		iconDefs[`${filename.replace(/\.svg$/, "")}-light`] = {
			iconPath: `./icons-light/${filename}`,
		}
	}

	return iconDefs
}

const themeFile = JSON.parse(
	fs.readFileSync("./base-icon-theme.json", "utf8")
) as Readonly<ThemeDefinition>

const light: ThemeDefinition = {
	...themeFile,
	folderNames: { ...themeFile.folderNames },
	folderNamesExpanded: { ...themeFile.folderNamesExpanded },
	fileExtensions: { ...themeFile.fileExtensions },
	fileNames: { ...themeFile.fileNames },
	languageIds: { ...themeFile.languageIds },
}

for (const [key, val] of Object.entries(light)) {
	if (typeof val === "string")
		// @ts-ignore. ok, listen. it's 12:40 am and i know this isn't an issue
		light[key] = `${val}-light`
	else {
		for (const [subk, subv] of Object.entries(val)) {
			// @ts-ignore. same for this
			light[key][subk] = `${subv}-light`
		}
	}
}

const buildThemeFile: BuildThemeFile = {
	iconDefinitions: getIconDefs("./icons"),
	...themeFile,
	light,
}

mkdirp.sync("dist")
fs.writeFileSync(
	"dist/build-icon-theme.json",
	JSON.stringify(buildThemeFile, undefined, "\t")
)
