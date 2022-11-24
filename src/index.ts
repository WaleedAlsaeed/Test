require('dotenv').config();
import { ExtendedClient } from './structures/Client';
import { Config } from './config/consts';
import axios from 'axios';


export const client = new ExtendedClient();
export const config = new Config();

client.start();
