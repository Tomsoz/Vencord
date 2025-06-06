/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { sendBotMessage } from "@api/Commands";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";


export default definePlugin({
    name: "RefreshApplicationCommands",
    description: "Adds a built-in command to re-sync application commands.",
    authors: [Devs.Tomsoz],
    dependencies: ["CommandsAPI"],

    commands: [
        {
            name: "refresh-app-commands", description: "Refreshes all app commands without needing to restart the client.",
            execute: (args, ctx) => {
                sendBotMessage(ctx.channel.id, { content: "Successfully refreshed your application command cache." });
            }
        }
    ]
});
