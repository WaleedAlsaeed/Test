require('dotenv').config();
import { ExtendedClient } from './structures/Client';
import { Config } from './config/consts';
import axios from 'axios';


export const client = new ExtendedClient();
export const config = new Config();




import express from "express";
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hi"));

app.listen(port, () => client.start());