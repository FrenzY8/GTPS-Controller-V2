/* TEMPLATE: CLAYNEID */
const Discord = require('discord.js')
var fs = require('fs');
// const getFolderSize = require('get-folder-size');
const config = require("./botconfig.json")
const exec = require('child_process')
  .exec;
const lineReader = require('line-reader');
const {
  Client,
  Intents
} = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
var randomColor = require('randomcolor');
const {
  MessageCollector
} = require("discord-collector");

const prefix = "."
const owner = "833213256155922432" // your id

const nomoracak = Math.floor((Math.random() * 100) + 1);
const bulan = new Date();

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
  console.log(`${client.user.tag} Now Is Online!`)
  console.log(nomoracak);
  client.user.setActivity('', {
    type: 'STREAMING'
  });
})

client.on("messageCreate", async(message) => {
  // Basic assets
  const args = message.content.slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift()
    .toLowerCase();

  if (command == "help") {
    message.reply("```yaml\nServer - Informations Bot\n.status\n.playerinfo (name)\n.serverinfo\n.checkworld\n.checkworldban\n.checkguild\n.report\n.checkgems\n(C) BrainPS Servers - All written based on database```");
  } else {
    if (message.content.startsWith(".status")) {
      const up = isRunning('Growtopia.exe', (status) => {
        lineReader.eachLine('online.txt', function(line) {
          if (status == true) {
            message.reply(`Server is UP, Currently ${line} People's online!\n\nAll written based on database.`)
          } else {
            message.reply(`Server is DOWN!\n\nAll written based on database.`)
          }
        })
      });
    } else {
      if (message.content.startsWith(".ping")) {
        message.reply("ping didnt found.")
      } else {
        if (command == "playerinfo") {
          // message.reply(`tulis 'yes'`);
          let growid = args[0]; // Remember arrays are 0-based!
          let filters = m => m.author.id === message.author.id
          if (!growid) {
            message.reply(`usages: ${prefix}playerinfo freenzy`)
          } else {
            if (growid == "YOUR_NAME" || growid == "YOUR_NAME") {
              message.reply("TIME_OUT! i cannot scan **Creator** accounts.")
              return;
            }
            const path = `./save/players/_${growid}.json`
            if (fs.existsSync(path)) {
              const {
                email,
                password,
                adminLevel,
                xp,
                verified,
                username,
                UserID,
                worldsowned,
                geigerlevel,
                geigerxp,
                lastworld,
                level,
                skin,
                playerid,
                lastvisitedworld,
                kills,
                isBanned
              } = require(path)

              message.reply(`please wait getting information of ${growid} (maybe taking 3 seconds)`)
                .then((msg) => {
                  setTimeout(function() {

                    // YOU CAN CHANGE THIS TO YOUR ROLE ID AND NAME
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
          if (command == "serverinfo") {
            const totalWorld = fs.readdirSync("./save/worlds")
              .length
            const totalPlayers = fs.readdirSync("./save/players")
              .length
            message.reply(`Server Database Count\n\nWorld totals: ${totalWorld}\nPlayer totals: ${totalPlayers}`)
          } else {
            if (command == "checkgems") {
              let growid = args[0]; // Remember arrays are 0-based!
              let filters = m => m.author.id === message.author.id

              if (!growid) {
                message.reply("whats? who is that? (usages: .checkgems freenzy)")
              } else {
                if (growid == "your_name" || growid == "your_name") {
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
                    message.reply(`sorry ${worldname} has been taked :(`)
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
                    client.channels.cache.get('913993276808384542')
                      .send(`@everyone we have a bug!\n\n**${message.content}**\n\n- ${message.author.id}`);
                  }


                } else {
                  if (command == "channelid" || command == "userid") {
                    if (message.author.id == owner) {
                      const longkap = args[0];
                      message.reply("consoled!")
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
                            guild_world,
                            leader,
                            statement
                          } = require(path)
                          message.reply(`${theguild} has been taked! by ${leader} world home ${guild_world} statement: ${statement}`)
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
                                    path,
                                    `${murniGems}${howmuch}`)
                                  message.reply(`succes put ${howmuch} gems to ${playername}`)
                                  const results = fs.readFileSync(path)
                                  message.reply(`now ${playername} gems is ${results}`)
                                } else {
                                  message.reply(`no one server player with name ${playername}`)
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
                                  message.reply(`succes reset ${target} gems because ${reason}`)
                                }
                              }
                            } else {
                              message.reply("wait. who are you?! you cant do that lol")
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
client.login(config.token)
