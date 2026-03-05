import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { findStoreLazy } from "@webpack";
import { GuildStore, UserStore, useStateFromStores } from "@webpack/common";

const UserGuildJoinRequestStore = findStoreLazy("UserGuildJoinRequestStore");
const InviteStore = findStoreLazy("InviteStore");
type GuildDeleteEvent = {
    type: "GUILD_DELETE";
    guild: { id: string; };
};

export default definePlugin({
    name: "BetterInvites",
    description: "Various improvements over discords invite system",
    authors: [Devs.Tomsoz],
    patches: [
        {
            find: 'static displayName="InviteStore";',
            replacement: {
                match: /getInviteError\((\w+)\)\s*\{[\s\S]*?return\s+([\w\.]+)\.get\(\1\)\s*\}/,
                replace: "$& clearInviteErrors() { $2.clear(); }"
            }
        }
    ],
    flux: {
        GUILD_DELETE: (ctx: GuildDeleteEvent) => {
            const me = UserStore.getCurrentUser();
            const maxGuilds = me.hasPremiumPerks ? 200 : 100;
            const guildJoinRequests: string[] = UserGuildJoinRequestStore.computeGuildIds();
            const guilds = GuildStore.getGuilds();
            const guildCount = GuildStore.getGuildCount() + guildJoinRequests.filter(id => guilds[id] == null).length;

            if (guildCount === (maxGuilds - 1)) { // user was at cap and left one
                InviteStore.clearInviteErrors();
            }
        },
        INVITE_RESOLVE: (ctx) => {
            console.log("INVITE_RESOLVE", ctx);
        },
        INVITE_RESOLVE_FAILURE: (ctx) => {
            console.log("INVITE_RESOLVE_FAILURE", ctx);
        },
        INVITE_RESOLVE_SUCCESS: (ctx) => {
            console.log("INVITE_RESOLVE_SUCCESS", ctx);
        },
        INVITE_ACCEPT: (ctx) => {
            console.log("INVITE_ACCEPT", ctx);
        },
        INVITE_ACCEPT_FAILURE: (ctx) => {
            console.log("INVITE_ACCEPT_FAILURE", ctx);
        },
        INVITE_ACCEPT_SUCCESS: (ctx) => {
            console.log("INVITE_ACCEPT_SUCCESS", ctx);
        },
    }
});