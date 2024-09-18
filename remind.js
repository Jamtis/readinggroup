import { bash } from "https://deno.land/x/bash/mod.ts";
import Talk from "./Talk.js";
import listConfig from "./listConfig.js";

try {
    const talks_file_path = "./talks.json";
    const _talks = await Deno.readTextFile(talks_file_path);
    const talks = JSON.parse(_talks);
    await Promise.all(talks.map(async _talk => {
        const talk = new Talk(_talk);
        try {
            if (talk.shouldSendReminderMail()) {
                const options = [
                    `--to ${talk.presenterMailAdress}`,
                    `--from ${listConfig.bot_adress}`,
                    `--header 'Subject: ${talk.reminderMailSubject}'`,
                ];
                for (const [key, value] of Object.entries(listConfig.headers)) {
                    options.push(`--header '${key}: ${value}'`);
                }
                options.push(`--body "${talk.reminderMailContent}"`);
                const command = 'swaks ' + options.join(' ');
                // await Deno.writeTextFile('./.swaksrc', options.join('\n'));
                await bash(command);
            }
        } catch (error) {
            console.warn("failed to process talk", error);
        }
    }
    ));
} catch (error) {
    console.error(error);
}