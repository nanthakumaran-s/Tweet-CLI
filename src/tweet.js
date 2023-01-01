import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";
import { TwitterApi } from "twitter-api-v2";
import { configEnvFile, configEnvFolder } from "./constants.js";
import ora from "ora";

export const tweet = async () => {
    const loader = ora()

    if (!fs.existsSync(configEnvFolder)) {
        console.log(chalk.red("You aren't configured the CLI"))
        console.log(chalk.whiteBright("Run `tweet-cli config` to configure"))
        process.exit(1);
    }

    const config = JSON.parse(fs.readFileSync(configEnvFile, {encoding:'utf8', flag:'r'}))
    const appKey = config.appKey
    const appSecret = config.appSecret
    const accessToken = config.accessToken
    const accessSecret = config.accessSecret

    const { tweet } = await inquirer.prompt([{ name: 'tweet', message: 'Write your Tweet: ' }]);

    const twitterClient = new TwitterApi({
        appKey,
        appSecret,
        accessToken,
        accessSecret,
    });

    loader.start()

    try {
        await twitterClient.v1.tweet(tweet);
        loader.succeed(
            chalk.green("Your tweet is now available in Twitter")
        );
        process.exit(0);
    } catch (err) {
        loader.fail(
            chalk.red("Some error occured. Please raise an issue at ") +
            chalk.cyan("https://github.com/nanthakumaran-s/Tweet-CLI/issues")
        );
        console.error(err.errors[0]);
        process.exit(1);
    }
}