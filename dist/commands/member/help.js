"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structures/Command");
const fs_1 = __importDefault(require("fs"));
const index_1 = require("../../index");
function importFile(filePath) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        return (_a = (yield Promise.resolve().then(() => __importStar(require(filePath))))) === null || _a === void 0 ? void 0 : _a.default;
    });
}
exports.default = new Command_1.Command({
    name: "help",
    description: "???????? ?????????? ??????????",
    onlyInCommandChannel: true,
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        let embeds = [];
        const commandFolders = fs_1.default.readdirSync("./src/commands");
        for (const folder of commandFolders) {
            let embed = new discord_js_1.EmbedBuilder()
                .setColor(index_1.config.DEFAULT_COLOR)
                .setTitle(folder.toUpperCase());
            for (const file of fs_1.default.readdirSync(`./src/commands/${folder}`)) {
                const command = yield importFile(`../${folder}/${file.replace(".ts", "")}`);
                if (!command.name)
                    return;
                embed.addFields({
                    name: `/${command.name}`, value: `${command.description}
                        \n------------------------------\n`
                });
            }
            embeds.push(embed);
        }
        yield interaction.followUp({ embeds: embeds, content: "???????? ?????????????? ?????????????? ???????????? ???? ???????? slashcommands" });
    }),
});
