const fs = require('fs')
const ascii = require('ascii-table')
let table = new ascii("Commnand List");
let table2 = new ascii("Subevents")
table.setHeading('Commands', 'Status');
const path = require('node:path');
const { readdirSync } = require("fs");

module.exports = client => {
    fs.readdirSync('./commands/').forEach(dir => {
        const commands = fs.readdirSync(`./commands/${dir}`).filter(files => files.endsWith('.js'));

        for (let files of commands) {
            let get = require(`../commands/${dir}/${files}`);

            if (get.name) {
                client.commands.set(get.name, get);
                table.addRow(files, 'Success')
            } else {
                table.addRow(files, 'Failed');
                continue;
            }
            // if (get.aliases && Array.isArray(get.aliases)) get.aliases.forEach(alias => client.aliases.get(alias, get.name))
        }
    })
    console.log(table.toString());

    try {
        let eventCount = 0;
        readdirSync("./events")
            .filter((f) => f.endsWith(".js"))
            .forEach((event) => {
                require(`../events/${event}`);
                eventCount++;
            });
        console.log(`${eventCount} event loaded`);
    } catch (e) {
        console.log(e);
    }
    
    fs.readdir('./events/subevents/', (err, files) => {
        console.log("Loading subevents");
        if (err) throw err;
        files.forEach((file, i) => {
            const props = require(`../events/subevents/${file}`);
            console.log(`${i + 1}. ${file} loaded`);
            client.subevents.set(props.config.name, props);
        });
    });


}