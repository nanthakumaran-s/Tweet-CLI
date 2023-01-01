import inquirer from "inquirer";
import fs from "fs";
import path from "path";

export const config = async () => {
    const { appKey } = await inquirer.prompt([{ name: 'appKey', message: 'Enter your API key' }]);
    const { appSecret } = await inquirer.prompt([{ name: 'appSecret', message: 'Enter your API secret' }]);  
    const { accessToken } = await inquirer.prompt([{ name: 'accessToken', message: 'Enter your Access token' }]);
    const { accessSecret } = await inquirer.prompt([{ name: 'accessSecret', message: 'Enter your Access secret'}]);

    const config = {
        appKey: appKey,
        appSecre: appSecret,
        accessToken: accessToken,
        accessSecret: accessSecret,
    }

    let env = path.join(path.resolve(), '.config')
    if(!fs.existsSync(env)) {
        fs.mkdirSync(env)
    }

    try {
        env = path.join(env, 'config.json')
        fs.writeFileSync(env, JSON.stringify(config))
    } catch (err) {
        console.log('An error occurred while creating the configuration file')
        console.log('Error: ' + err)
        console.log('Raise an issue at https://')
    }
}