import fs from "fs"
import mkdirp from "mkdirp"
import { join } from "path"

const colorMap: [dark: string, light: string][] = [
	["3AC39E", "009E81"], // Teal
	["619BFF", "647ADD"], // Blue
	["FF6B81", "E74B4B"], // Red
	["B980FF", "A879E2"], // Purple
	["DDB70E", "A88900"], // Yellow
	["67C351", "5A9938"], // Green
	["F39860", "D56520"], // Orange
	["8693A2", "778697"], // Gray
	["1F2428", "F6F8FA"], // Background
]

const iconDirPath = "./icons"
const buildPath = "./dist"

// Convert icons
for (const filename of fs.readdirSync(iconDirPath)) {
	const svgData = fs.readFileSync(join(iconDirPath, filename), "utf-8")

	mkdirp.sync(join(buildPath, "icons"))
	fs.copyFileSync(
		join(iconDirPath, filename),
		join(buildPath, "icons", filename)
	)

	let result = svgData
	for (const [dark, light] of colorMap)
		result = result.replace(new RegExp(dark, "g"), light)

	mkdirp.sync(join(buildPath, "icons-light"))
	fs.writeFileSync(join(buildPath, "icons-light", filename), result)
}
