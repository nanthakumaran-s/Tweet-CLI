import inquirer from "inquirer";
import fs from "fs";
import ora from "ora"
import chalk from "chalk";
import { configEnvFile, configEnvFolder } from "./constants.js";

export const config = async () => {
    const loader = ora()

    const { appKey } = await inquirer.prompt([{ name: 'appKey', message: 'Enter your API key' }]);
    const { appSecret } = await inquirer.prompt([{ name: 'appSecret', message: 'Enter your API secret' }]);  
    const { accessToken } = await inquirer.prompt([{ name: 'accessToken', message: 'Enter your Access token' }]);
    const { accessSecret } = await inquirer.prompt([{ name: 'accessSecret', message: 'Enter your Access secret'}]);

    const config = {
        appKey: appKey,
        appSecret: appSecret,
        accessToken: accessToken,
        accessSecret: accessSecret,
    }

    loader.start()

    if(!fs.existsSync(configEnvFolder)) {
        fs.mkdirSync(configEnvFolder)
    }

    try {
        fs.writeFileSync(configEnvFile, JSON.stringify(config))
        loader.succeed(
            chalk.green("Successfully created configuration file")
        );
        process.exit(0);
    } catch (err) {
        loader.fail(
            chalk.red("Some error occured. Please raise an issue at ") +
            chalk.cyan("https://github.com/nanthakumaran-s/Tweet-CLI/issues")
        );
        console.error(err);
        process.exit(1);
    }
}