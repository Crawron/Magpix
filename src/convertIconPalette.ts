import fs from "fs"
import { join } from "path"

const colorMap: [dark: string, light: string][] = [
	["3AC39E", "009E81"],
	["619BFF", "647ADD"],
	["FF6B6B", "E74B4B"],
	["B980FF", "A879E2"],
	["DDB70E", "A88900"],
	["67C351", "5A9938"],
	["F39860", "D56520"],
	["8693A2", "778697"],
	["1F2428", "F6F8FA"],
]

const iconDirPath = "./icons"
const buildPath = "./dist"

// Convert icons
for (const filename of fs.readdirSync(iconDirPath)) {
	const svgData = fs.readFileSync(join(iconDirPath, filename), "utf-8")

	fs.copyFileSync(
		join(iconDirPath, filename),
		join(buildPath, "icons", filename)
	)

	let result = svgData
	for (const [dark, light] of colorMap)
		result = result.replace(new RegExp(dark, "g"), light)

	fs.writeFileSync(join(buildPath, "icons-light", filename), result)
}
