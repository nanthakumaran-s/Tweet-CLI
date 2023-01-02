#!/usr/bin/env node

/*
 Tweet CLI
 31-12-2022
 Made By Nanthakumaran S
 https://github.com/nanthakumaran-s/Tweet-CLI
*/

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import { config } from './config.js';
import { credentials } from './credentials.js';
import { tweet } from './tweet.js';

yargs(hideBin(process.argv))
  .command('config', 'Config Tweet CLI', config)
  .parse()

yargs(hideBin(process.argv))
  .command('tweet', 'Tweet', tweet)
  .parse()

yargs(hideBin(process.argv))
  .command('credentials', 'Credentials', credentials)
  .parse()