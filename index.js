/*BrainPS(USELESS) Bot.
- All code written by BrainPS owner. (FreenzySG(.FreenzySG.#2331))
- Template. Idea. taked from:*/
/** @GuckTubeYT */
/** @ClayneID */
/** @modules */
const Discord = require('discord.js')
var fs = require('fs')
// fs.writeFileSync('ping.txt')
// const getFolderSize = require('get-folder-size')
const replaceJSONProperty = require('replace-json-property')
const exec = require('child_process')
  .exec;
const lineReader = require('line-reader');
const {
  Client
  , Intents
} = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
var randomColor = require('randomcolor');
const {
  MessageCollector
} = require("discord-collector");

/** @setup */
const prefix = "."
const config = require('./botconfig.json')

const nomoracak = Math.floor((Math.random() * 100) + 1);
const bulan = new Date();

var isLetter = function(character) {
  if ((character.charCodeAt() >= 65 && character.charCodeAt() <= 90) || (character.charCodeAt() >= 97 && character.charCodeAt() <= 122)) {
    return true;
  } else {
    return false;
  }
}

const isRunning = (query, cb) => {
  let platform = process.platform;
  let cmd = '';
  switch (platform) {
    case 'win32':
      cmd = `tasklist`;
      break;
    case 'darwin':
      cmd = `ps -ax | grep ${query}`;
      break;
    case 'linux':
      cmd = `ps -A`;
      break;
    default:
      break;
  }
  exec(cmd, (err, stdout, stderr) => {
    cb(stdout.toLowerCase()
      .indexOf(query.toLowerCase()) > -1);
  });
}
client.on('ready', () => {
  const text = "[+] BrainPS bot is now ACTIVE!\n"
  const anjay = text.repeat(59)
  console.log(anjay)
  setTimeout(function() {
    client.user.setActivity('your life', {
      type: 'STREAMING'
    });
  }, 3000);
})

/**
 * @param messageCreate - the first message create to use the commands
 * for useless BrainPS bot.
 */

client.on("messageCreate", async(message) => {
  // Basic assets
  const args = message.content.slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift()
    .toLowerCase();
  if (command == "help") {
    // HELP COMMAND
const { MessageEmbed } = require('discord.js');
const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setAuthor({ name: `${config.servername} bot commands`, iconURL: 'https://avatars.githubusercontent.com/u/75056113?s=400&u=955cbc11ea6f6b0be400f9fea4c2de0da376f24a&v=4', url: 'https://github.com/FrenzY8' })
	.setDescription(`
**User commands**
${prefix}status
${prefix}checksub
${prefix}totalregisterip
${prefix}totalipban
${prefix}worldinfo
${prefix}totalrenderworld
${prefix}playerinfo (name)
${prefix}aboutserver
${prefix}checkworld
${prefix}checkworldban
${prefix}checkguild
${prefix}report
${prefix}checkgems
${prefix}totalpunch

**Owner only**
${prefix}deleteworld
${prefix}deleteplayer
${prefix}resetgems`)
.setThumbnail("https://avatars.githubusercontent.com/u/75056113?s=400&u=955cbc11ea6f6b0be400f9fea4c2de0da376f24a&v=4")
.setFooter({ text: 'Made by FreenzySG', iconURL: 'https://avatars.githubusercontent.com/u/75056113?s=400&u=955cbc11ea6f6b0be400f9fea4c2de0da376f24a&v=4' });

message.reply({ embeds: [exampleEmbed] });
  } else {
    if (message.content.startsWith(".status")) {
      const anjay = args[0]
      const up = isRunning(config.enetname, (status) => {
        lineReader.eachLine(config.online_count_file, function(line) {
          if (status == true) {
            message.reply(`<@${message.author.id}> ${config.servername} is Now UP! The currently player online is ${line} People's!\nAll written based on the ${config.servername} Database.`)
          } else {
            message.reply(`<@${message.author.id}> ${config.servername} is Now DOWN!\nAll written based on the ${config.servername} Database.`)
          }
        })
      });
    } else {
      if (message.content.startsWith(".ping")) {
        message.reply("ping didnt found.")
      } else { // csvxxcvxc 
        if (command == "playerinfo") {
          // message.reply(`tulis 'yes'`);
          let growid = args[0]; // Remember arrays are 0-based!
          let filters = m => m.author.id === message.author.id
          if (!growid) {
            message.reply(`usages: ${prefix}playerinfo freenzy`)
          } else {
            if (growid == config.ownergrowid) {
              message.reply("TIME_OUT! i cannot scan **Creator** accounts.")
              return;
            }
            const path = `./save/players/_${growid}.json`
            if (fs.existsSync(path)) {
              const {
                email
                , password
                , adminLevel
                , xp
                , verified
                , username
                , UserID
                , worldsowned
                , geigerlevel
                , geigerxp
                , lastworld
                , level
                , skin
                , playerid
                , lastvisitedworld
                , kills
                , isBanned
              } = require(path)

              message.reply(`please wait getting information of ${growid} (maybe taking 3 seconds)`)
                .then((msg) => {
                  setTimeout(function() {

                    // read the admins level.
                    // for what?: just for showed what the Player role's
                    function readAdmin() {
                      if (adminLevel == "0") {
                        //  const player;
                        message.channel.send("Roles: Player")
                      } else {
                        if (adminLevel == "1") {
                          message.channel.send("Roles: VIP")
                        } else {
                          if (adminLevel == "2") {
                            message.channel.send("Roles: MODS")
                          } else {
                            if (adminLevel == "3") {
                              message.channel.send("Roles: Admin")
                            } else {
                              if (adminLevel == "4") {
                                message.channel.send("Roles: IQ")
                              } else {
                                if (adminLevel == "12") {
                                  message.channel.send("Roles: CREATOR")
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    msg.edit(`
GrowID: ${username}
XP: ${xp}
Verified: true
Kill: ${kills}
Level: ${level}
isBanned: ${isBanned}
Body Color: ${skin}
Geiger Levels: ${geigerlevel}
GeigerXP: ${geigerxp}
Worlds Owned: ${worldsowned}`);
                    readAdmin()
                  }, 3000)
                });

            } else {
              message.reply(`sorry but. we have no player with name ${growid}`)
            }
          }
        } else {
          if (command == "${config.servername}info") {
            // Count
            const totalWorld = fs.readdirSync("./save/worlds")
              .length
            const totalPlayers = fs.readdirSync("./save/players")
              .length

            // Get size

            //sized
            message.reply(`${config.servername} Database Count\n\nWorld totals: ${totalWorld}\nPlayer totals: ${totalPlayers}\n\n${bulan}`)
          } else {
            if (command == "checkgems") {
              let growid = args[0]; // Remember arrays are 0-based!
              let filters = m => m.author.id === message.author.id

              if (!growid) {
                message.reply("whats? who is that? (usages: .checkgems freenzy)")
              } else {
                if (growid == "chocolayz" || growid == "freenzysg") {
                  message.reply("TIMED-OUT! i cant scan thats player.")
                } else {
                  const path = `./save/gemdb/_${growid}.txt`
                  if (fs.existsSync(path)) {
                    const dataGems = fs.readFileSync(path, 'utf-8')
                    message.reply(`${growid} gems: ${dataGems}`)
                  } else {
                    message.reply(`wait. player not found with name ${growid}`)
                  }
                }
              }
            } else {
              if (command == "checkworld") {
                let worldname = args[0]; // Remember arrays are 0-based!
                let filters = m => m.author.id === message.author.id

                if (!worldname) {
                  message.reply("whats world to scan?; usage .checkworld start (remember to use small text)")
                } else {
                  const path = `./save/worlds/_${worldname}.json`
                  if (fs.existsSync(path)) {
                    const {
                      owner
                    } = require(path)
                    message.reply(`sorry ${worldname} has been taked by ${owner} :(`)
                  } else {
                    message.reply(`${worldname} is free! no one lock it! come on go there and lock!`)
                  }
                }

              } else {
                if (command == "report" || command == "reportbug") {
                  let reason = args[0]; // Remember arrays are 0-based!
                  let growid = args[1];
                  let filters = m => m.author.id === message.author.id

                  if (!reason) {
                    message.reply("whats the reason? wtf! usage; .report bugsHELP")
                  } else {
                    message.reply("OK! the report has been sended to specific channel (staff and mod channel) and we'll fix thats.")
                    client.channels.cache.get(config.report_channel_id)
                      .send(`@everyone we have a bug!\n\n**${message.content}**\n\n- ${message.author.id}`);
                  }


                } else {
                  if (command == "channelid" || command == "userid") {
                    if (message.author.id == owner) {
                      const longkap = args[0];
                      message.reply("udah masuk ke console!")
                      console.log(longkap)
                      console.log(`from ${message.channel.id}`)
                    } else {
                      message.reply("cant do that.")
                    }
                  } else {
                    if (command == "checkguild") {
                      const theguild = args[0]
                      if (!theguild) {
                        message.reply("enter the names for scan guild")
                      } else {
                        const path = `./save/guilds/_${theguild}.json`
                        if (fs.existsSync(path)) {
                          const {
                            // {"background":7188,"foreground":0,"guild_name":"ARACHAN","guild_world":"ARA","leader":"araachann","members":"","statement":"ARACANTIK"}
                            guild_world
                            , leader
                            , statement
                          } = require(path)
                          message.reply(`${theguild} has been taked! by ${leader} world home at ${guild_world} statement: ${statement}`)
                        } else {
                          message.reply(`${theguild} is free to use! no one use thats name! create your guild with name ${theguild} now!`)
                        }
                      }
                    } else {
                      if (command == "checkworldban") {
                        const worldname = args[0]
                        if (!worldname) {
                          message.reply("um. whats the world name?, usage .checkworldban start")
                        } else {
                          const path = `./save/worldbans/_${worldname}`
                          if (fs.existsSync(path)) {
                            fs.readdir(path, (err, files) => {
                              files.forEach(file => {
                                message.reply(`list who have banned on ${worldname}: \n${file}`)
                              })
                            });
                          } else {
                            message.reply(`no ones banned in ${worldname}`)
                          }
                        }
                      } else {
                        if (command == "givegems") {
                          if (message.author.id == owner) {
                            const playername = args[0]
                            const howmuch = args[1]
                            if (!playername) {
                              message.reply("player name?: usages: .givegems freenzy 1000")
                            } else {
                              if (!howmuch) {
                                message.reply(`bruh. how much u want givegems to ${playername} (usages: .givegems freenzy 2000)`)
                              } else {
                                const path = `./save/gemdb/_${playername}.txt`
                                if (fs.existsSync(path)) {
                                  const murniGems = fs.readFileSync(path)
                                  fs.unlinkSync(path)
                                  fs.writeFileSync(
                                    path
                                    , `${murniGems}${howmuch}`)
                                  message.reply("process.. just wait about 3 second")
                                  setTimeout(function() {
                                    message.reply(`succes put ${howmuch} gems to ${playername}`)
                                    const results = fs.readFileSync(path)
                                    message.reply(`now ${playername} gems is ${results}`)
                                  }, 3000);
                                } else {
                                  message.reply(`no one ${config.servername} player with name ${playername}`)
                                }
                              }
                            }
                          } else {
                            message.reply("ooooo.. i see.. you just trying to hack ha?!")
                          }
                        } else {
                          if (command == "resetgems") {
                            if (message.author.id == owner) {
                              const target = args[0]
                              const reason = args[1]
                              if (!target) {
                                message.reply("what?! usage: .resetgems freenzy cheating")
                              } else {
                                if (!reason) {
                                  message.reply("must be a valid reason: ex: .resetgems freenzy abuse")
                                } else {
                                  const path = `./save/gemdb/_${target}.txt`
                                  fs.unlinkSync(path)
                                  fs.writeFileSync(path, '0')
                                  setTimeout(function() {
                                    message.reply(`succes reset ${target} gems because ${reason}`)
                                  }, 5000);
                                }
                              }
                            } else {
                              message.reply("wait. who are you?! you cant do that lol")
                            }
                          } else {
                            if (command == "deleteworld") {
                              if (message.author.id == owner) {
                                const nameworld = args[0]
                                const reason = args[1]

                                if (!nameworld) {
                                  message.reply("what the world name wtf. usage: .deleteworld gacha")
                                } else {
                                  if (!reason) {
                                    message.reply(`what the reason? usage: .deleteworld ${nameworld} lag`)
                                  } else {
                                    const path = `./save/worlds/_${nameworld}.json`
                                    if (fs.existsSync(path)) {
                                      fs.unlinkSync(path)
                                      message.reply(`succes delete ${nameworld} because ${reason}`)
                                    } else {
                                      message.reply(`no world with name ${nameworld}`)
                                    }
                                  }
                                }
                              } else {
                                message.reply("u cant do that.")
                              }
                            } else {
                              if (command == "deleteplayer") {
                                if (message.author.id == owner) {
                                  const target = args[0]
                                  if (!target) {
                                    message.reply("need player name")
                                  } else {
                                    const path = `./save/players/_${target}.json`
                                    if (fs.existsSync(path)) {
                                      fs.unlinkSync(path)
                                      message.reply(`player deleted! ${target}`)
                                    } else {
                                      message.reply(`no player with name ${target}`)
                                    }
                                  }
                                } else {
                                  message.reply("u cant do thats.")
                                }
                              } else {
                                if (command == "deleteguild") {
                                  const targetGuild = args[0]
                                  const reason = args[1]
                                  if (message.author.id == owner) {
                                    if (!targetGuild) {
                                      message.reply("what the Guilds name?")
                                    } else {
                                      if (!reason) {
                                        message.reply(`what the reason? usage: .deleteguild ${targetGuild} abuse`)
                                      } else {
                                        const path = `./save/guilds/_${targetGuild}.json`
                                        if (fs.existsSync(path)) {
                                          fs.unlinkSync(path)
                                          message.reply(`deleted ${targetGuild} for ${reason}`)
                                        }
                                      }
                                    }
                                  } else {
                                    message.reply("u cant do that lol")
                                  }
                                } else {
                                  // next command should be here:
                                  if (command == "totalpunch") {
                                    const dataname = args[0]
                                    if (!dataname) {
                                      message.reply("whos that? usage: .totalpunch freenzysg")
                                    } else {
                                      const path = `./save/players/_${dataname}.json`
                                      if (fs.existsSync(path)) {
                                        const {
                                          total_punch
                                        } = require(path)
                                        message.reply("process.. just wait about 3 second")
                                        setTimeout(function() {
                                          message.reply(`${dataname} total punch: ${total_punch}`)
                                        }, 3000);
                                      } else {
                                        message.reply(`idk whos that. no player with name ${dataname}`)
                                      }
                                    }
                                  } else {
                                    if (command == "command") {
                                      const rolename = args[0]
                                      if (!rolename) {
                                        message.reply("what the roles name? usage: .command mod")
                                      } else {
                                        const path = `./save/role/${rolename}.txt`
                                        if (fs.existsSync(path)) {
                                          const thecommands = fs.readFileSync(path)
                                          message.reply(`commands for ${rolename}:\n${thecommands}`)
                                        } else {
                                          message.reply("no role found.")
                                        }
                                      }
                                    } else {
                                      if (command == "killme") {
                                        if (message.author.id == owner) {
                                          message.reply("ok iam dead (pc)")
                                          process.exit()
                                        } else {
                                          message.reply("u cant.")
                                        }
                                      } else {
                                        if (command == "reffund") {
                                          const growid = args[0]
                                          if (!growid) {
                                            message.reply(`idk your growid, usage: .reffund freenzy bgl,wl,lock`)
                                          } else {
                                            client.channels.cache.get('913993276808384542')
                                              .send(`Request reffund: ${growid}\n${message.content}\n\nfrom ${message.author.id}\n\ntype: .reply to respond.`);
                                            client.channels.cache.get('913993276808384542')
                                              .send(`${growid} (${message.author.id})`);
                                            message.reply(`OK! reffund request has been sended to specific channel (moderator&staff) channel. just wait ;)`)
                                          }
                                        } else {
                                          if (command == "announcement") {
                                            message.reply("deleted command-s")
                                          } else {
                                            // next command should be here
                                            if (command == "whois") {
                                              const who = args[0]
                                              if (!who) {
                                                message.reply("who? usage: .whois freenzy\nwill showen ${config.servername} account")
                                              } else {
                                                const path = `./save/players/_${who}.json`
                                                if (fs.existsSync(path)) {
                                                  const {
                                                    ipID
                                                    , username
                                                    , lquest_progress
                                                  } = require(path)
                                                  message.reply(`Account name: ${username}\nAccount userID: ${ipID}\nLQuest Progress: ${lquest_progress}`)
                                                } else {
                                                  message.reply(`no player with name ${who}`)
                                                }
                                              }
                                            } else {
                                              if (command == "checktitle") {
                                                const target = args[0]
                                                if (!target) {
                                                  message.reply(`example: .checktitle freenzy`)
                                                } else {
                                                  const path = `./save/players/_${target}.json`
                                                  if (fs.existsSync(path)) {
                                                    const {
                                                      title
                                                      , ltitle_unlocked
                                                      , ltitle
                                                    } = require(path)
                                                    if (title == "" || ltitle == false || ltitle_unlocked == false || ltitle == false) {
                                                      message.reply(`${target} have no titles
ltitle = false
         ^^^^^`)
                                                    } else {
                                                      message.reply(`Obtained title of ${target}: Legendary Titles
                                                           ^^^^^^`)
                                                    }
                                                  } else {

                                                  }
                                                }
                                              } else {
                                                if (command == "worldinfo") {
                                                  const worldname = args[0]
                                                  if (!worldname) {
                                                    message.reply("need world name: usage: .worldinfo start")
                                                  } else {
                                                    const path = `./save/worlds/_${worldname}.json`
                                                    if (fs.existsSync(path)) {
                                                      const {
                                                        nuked
                                                        , public
                                                        , owner
                                                        , weather
                                                        , enterylevel
                                                        , disableDrop
                                                        , category
                                                        , rating
                                                        , silence
                                                      , } = require(path)
                                                      message.reply(`- Informations about ${worldname}
Nuked world = ${nuked}
Public world = ${public}
Owner name = ${owner}
Weather id = ${weather}
Minimum level to enter = ${enterylevel}
Disabled Drop = ${disableDrop}
World category = ${category}
World Ratings = ${rating}
Silent world = ${silence}

PATH: ${path}`)
                                                    } else {
                                                      message.reply(`no world with name ${worldname}`)
                                                    }
                                                  }
                                                } else {
                                                  if (command == "totalregisterip") {
                                                    const path = `./save/registeredIP`
                                                    if (fs.existsSync(path)) {
                                                      const data = fs.readdirSync(path)
                                                        .length
                                                      message.reply(`Total IP (Device thats registered to ${config.servername})\nTotal: ${data}\n\nOn: ${bulan}`)

                                                    } else {
                                                      message.reply("something went wrong. when i check registerIP total")
                                                    }
                                                  } else {
                                                    if (command == "totalrenderworld") {
                                                      const path = `./save/render`
                                                      const data = fs.readdirSync(path)
                                                        .length
                                                      message.reply(`Total world used /renderworld in ${config.servername}:\nTotals: ${data}\n\nOn ${bulan}`)
                                                    } else {
                                                      if (command == "totalipban") {
                                                        const totip = fs.readdirSync('./save/ipbans/ip')
                                                          .length
                                                        const totmac = fs.readdirSync('./save/ipbans/mac')
                                                          .length
                                                        const totrid = fs.readdirSync('./save/ipbans/rid')
                                                          .length
                                                        message.reply(`ip: ${totip}\nmac: ${totmac}\nrid: ${totrid}`)
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
})

client.on("messageCreate", async(message) => {
  // Basic assets
  const args = message.content.slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift()
    .toLowerCase();

  if (command == "checksub") {
    const subname = args[0]
    if (!subname) { // Blank
      message.reply("who?, whos that? usage: .checksub freenzy")
    } else {
      const path = `./save/players/_${subname}.json`
      if (fs.existsSync(path)) {
        function readSub() {
          const {
            subdate
            , subtype
          } = require(path)
          if (subdate == "") {
            message.reply(`${subname} didnot have any subs token`)
          } else {
            message.reply(`currently ${subname} is ${subdate}d. Type: ${subtype}`)
          }
        }
        readSub() // BOOM !!
      } else {
        message.reply(`no player found with name ${subname}`)
      }
    }
  } else {
    if (command == "cctvinfo") {
      const world = args[0]
      if (!world) {
        message.reply("what? what the world name? usage .cctvinfo start")
      } else {
        // we'll make the path first
        const path = `./save/cctv/_${world}.json`
        if (fs.existsSync(path)) {
          const {
            ShowItemDrop
            , ShowItemTake
            , ShowPoepleEnter
            , ShowPoepleExit
          } = require(path)
          message.reply(`show item drop: ${ShowItemDrop}\nshow item take: ${ShowItemTake}\nshow people enter: ${ShowPoepleEnter}\nshow people exit: ${ShowPoepleExit}`)
        } else {
          message.reply(`${world} has no active CCTV, Maybe they have but doesnt active the CCTV features..`)
        }
      }
    } else {
      if (command == "giverank") {
        const user = args[0]
        const role = args[1]
        if (message.author.id == owner) {
          if (!user) {
            message.reply("usage: .giverank freenzy 3")
          } else {
            if (!role) {
              message.reply("usage: .giverank freenzy 3")
            } else {
              if (!role.isLetter == true) {
                message.reply(`cannot use a Huruf
role id:
name|youtube
adminlevel|-2

name|player
adminlevel|0

name|vip
adminlevel|1

name|mod
adminlevel|2

name|admin
adminlevel|3

name|iq
adminlevel|4

name|creator
adminlevel|12`)
              } else {
                const path = `./save/players/_${user}.json`
                if (fs.existsSync(path)) {
                  replaceJSONProperty.replace(path, 'adminLevel', role);
                  message.reply(`Succes gived ${user} role! Re-login to get the effects!`)
                } else {
                  message.reply(`no player found with name ${user}`)
                }
              }
            }
          }
        }
      } else {
        if (command == "givelevel") {
          const growid = args[0]
          const levelbrp = args[1]
          if (message.author.id == owner) {
            if (!growid) {
              message.reply("usage: .givelevel freenzy 1 (will reset by number.)")
            } else {
              if (!levelbrp) {
                message.reply("usage: .givelevel freenzy 1 (will reset by number.)")
              } else {
                const path = `./save/players/_${growid}.json`
                if (fs.existsSync(path)) {
                  replaceJSONProperty.replace(path, 'level', levelbrp);
                } else {
                  message.reply(`no player found with name: ${growid}`)
                }
              }
            }
          } else {
            message.reply("cant do that.")
          }
        } else {
          if (command == "givesub") {
            const growid = args[0]
            const length = args[1]
            const yes = args[2]
            if (message.author.id == owner) {

              if (!growid) {
                message.reply("umm.. you need a user")
              } else {
                if (!length) {
                  message.reply("usage: .givesub freenzy 365 true")
                } else {
                  if (!yes) { // For a confirm
                    message.reply(`
missing arguments
usage: .givesub freenzy 365 true
                            ^^^^
miss the arguments
    `)
                  } else {
                    const path = `./save/players/_${growid}.json`
                    if (fs.existsSync(path)) {
                      const {
                        subdate
                        , subtype
                      } = require(path)
                      replaceJSONProperty.replace(path, 'subdate', length);
                      replaceJSONProperty.replace(path, 'subtype', "premium");
                      message.reply(`${growid} is now have ${length}d subs. do .checksub to check.\nrelog to get the effects.`) // notif
                    } else {
                      message.reply("no player found")
                    }
                  }
                }
              }
            } else {
              message.reply("cant do that")
            }

          } else {
            if (command == "demote") {
              const target = args[0]
              if (message.author.id == owner) {
                if (!target) {
                  message.reply("usage /demote freenzy")
                } else {
                  const path = `./save/players/_${target}.json`
                  if (fs.existsSync(path)) {
                    replaceJSONProperty.replace(path, 'adminLevel', "0");
                    message.reply(`demoted ${target} relog to effects`)
                  } else {
                    message.reply(`well idk who is ${target}`)
                  }
                }
              } else {

              }
            }
          }
        }
      }
    }
  }


})

client.login(config.token)