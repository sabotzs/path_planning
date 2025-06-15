import { createJsWithTsEsmPreset, type JestConfigWithTsJest } from "ts-jest"

const preset = createJsWithTsEsmPreset({})

const config: JestConfigWithTsJest = {
    ...preset,
    verbose: true,
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "js"],
}

export default config
