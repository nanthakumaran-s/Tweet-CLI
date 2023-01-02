import chalk from "chalk";
import fs from "fs";
import { configEnvFile, configEnvFolder } from "./constants.js";

export const credentials = () => {
    if (!fs.existsSync(configEnvFolder)) {
        console.log(chalk.red("You aren't configured the CLI"))
        console.log(chalk.whiteBright("Run `tweet-cli config` to configure"))
        process.exit(1);
    }

    const config = JSON.parse(fs.readFileSync(configEnvFile, {encoding:'utf8', flag:'r'}))

    console.log(config)
    process.exit(0)
}