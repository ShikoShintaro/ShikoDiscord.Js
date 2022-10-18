const { Client, Message, DiscordAPIError, EmbedBuilder, Embed } = require('discord.js');
let cd = new Set()
const config = require('../../config/shiko.json')
const ME = EmbedBuilder

function createRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.max(1, Math.floor(Math.random() * (max - min + 1)) + min);
}

function isPrime(num) {
    if (num < 2) {
        return false;
    }

    let sqrt_num = Math.floor(Math.sqrt(num));
    for (let i = 2; i < sqrt_num; i++) {
        if (num % i === 0) return false;
    }

    return true;
}

function calculateFactorial(num) {
    let result = num;
    while (num > 1) {
        --num;
        result *= num;
    }
    return result;
}

function generateNumber(level, operator) {
    switch (operator) {
        case "+":
        case "-":
            return createRandomNumber(Math.random() * 2.5 * level, Math.max(2.5 * level, Math.random() * 7.5 * level));
        case "/":
        case "*":
            return createRandomNumber(Math.random() * 5 * Math.max(1, Math.random() * level / 2), Math.random() * 10 * Math.max(1, Math.random() * level / 2));
        case "!":
            return createRandomNumber(Math.random() * (level - 10) / 5, Math.random() * 3 * Math.max(1 + (level - 10) / 5, Math.random() * (level - 10) / 5));
    }
}

async function generateEquation(level, operator_amount) {
    const operators = ['/', '*', '+', '-'];
    let prev_operator_amount = operator_amount;
    let equation = '';
    let real_equation = '';
    let answer = Number.NaN;
    let prime_count = 0;
    let last_operator = '';
    let attempts = 0;
    const maxThreshold = 10 * level * operator_amount;
    const minThreshold = maxThreshold / 2;

    while (!Number.isInteger(answer)) {
        if (attempts === 500) {
            break;
        }

        while (operator_amount > 0) {
            const index = Math.floor(Math.random() * operators.length);
            const operator = operators[index];
            let number = generateNumber(level, operator);
            const mul_or_div = operator === '/' || operator === '*' || last_operator === '/' || last_operator === '*';
            if (mul_or_div) {
                while (!isPrime(number) && prime_count < Math.floor(level / 10)) {
                    number = generateNumber(level, operator);
                }
                ++prime_count;
            }


            const factorial = level >= 11 && level + Math.random() * level >= 20;
            if (factorial) {

                number = generateNumber(level, "!");
                while (number < 2 || number > 4) {
                    number = generateNumber(level, "!");
                }
            }

            last_operator = operator;

            if (factorial) {
                equation += `${calculateFactorial(number)} ${operator} `;
                real_equation += `${number}! ${operator} `;
            } else {
                equation += `${number} ${operator} `;
                real_equation += `${number} ${operator} `;
            }

            --operator_amount;
        }

        let number = generateNumber(level, last_operator);
        const mul_or_div = last_operator === '/' || last_operator === '*';
        if (mul_or_div) {
            while (!isPrime(number) && prime_count < Math.floor(level / 5)) {
                number = generateNumber(level, last_operator);
            }
        }


        const factorial = level >= 11 && Math.random() >= 1 - level / 25;
        if (factorial) {

            number = generateNumber(level, "!");
            while (number < 2 || number > 4) {
                number = generateNumber(level, "!");
            }
        }

        if (factorial) {
            equation += calculateFactorial(number);
            real_equation += `${number}!`;
        } else {
            equation += number;
            real_equation += number;
        }
        answer = eval(equation);

        const min_mul_div_threshold = Math.min(prev_operator_amount, Math.floor(level / 10));
        const max_mul_div_threshold = level / 5;
        const mul_div_amount = (equation.match(/\//g) || []).length + (equation.match(/\*/g) || []).length;
        if (
            !Number.isInteger(answer) ||

            (level >= 5 && mul_div_amount < min_mul_div_threshold && mul_div_amount > max_mul_div_threshold) ||

            (answer > 0 && (answer > maxThreshold || answer < minThreshold)) ||

            (answer < 0 && (answer < -maxThreshold || answer > -minThreshold))
        ) {
            answer = Number.NaN;
            equation = '';
            real_equation = '';
            operator_amount = prev_operator_amount;
        }
        ++attempts;
    }

    return [real_equation, answer];
}

module.exports = {
    name: "mathquiz",
    description: "Creates a simple math equation that you have to solve within 30 seconds.\n\nFor reference:\n`+`: addition\n`-`: subtraction\n`*`: multiplication\n`/`: division\n`!`: factorial\nOperator precedence: `*`/`/` -> `+`/`-`",
    usage: "mathquiz [level] [n operators]",
    detail: "`level`: Difficulty level of equation, defaults to 1, range is from 1 to 20 [Integer]\n`n operators`: The amount of operators to be used in the equation. Defaults to 4, range is from 1 to 10 [Integer]",
    permission: "None",
    aliases: ["mq"],

    run: async (client, message, args) => {
        // .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })




        const error1 = new ME()
            .setTitle('OI')
            .setDescription("❎ **| Hey, you still have an equation to solve! Please solve that one first before creating another equation!**")
            .setColor(config.colors.no)
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })


        if (cd.has(message.author.id))
            return message.reply({ embeds: [error1] });

        const level = args[0] ? parseInt(args[0]) : 1;
        const error2 = new ME()
            .setTitle('OI')
            .setDescription("❎ **| I'm sorry, that's an invalid level!**")
            .setColor(config.colors.no)
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

        const error3 = new ME()
            .setTitle("OI")
            .setDescription("❎ **| I'm sorry, level range is from 1-20!**")
            .setColor(config.colors.no)
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })


        if (isNaN(level))
            return message.reply({ embeds: [error2] })
        if (level <= 0 || level > 20)
            return message.reply({ embeds: [error3] })

        const operator_amount = args[1] ? parseInt(args[1]) : 4;
        const error4 = new ME()
            .setTitle('Aweee~')
            .setDescription("❎ **| I'm sorry, that's an invalid operator amount!**")
            .setColor(config.colors.no)
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });

        const error5 = new ME()
            .setTitle('Aweee~')
            .setDescription("❎ **| I'm sorry, operator amount range is from 1-10!**")
            .setColor(config.colors.no)
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });

        if (isNaN(operator_amount))
            return message.reply({ embeds: [error4] });
        if (operator_amount
            < 1 || operator_amount > 10
        )
            return message.reply({ embeds: [error5] });

        const val = await generateEquation(level, operator_amount);
        const equation = val[0];

        const error6 = new ME()
            .setTitle('A-')
            .setDescription("❎ **| I'm sorry, the equation generator had problems generating your equation, please try again!**")
            .setColor(config.colors.no)
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });

        if (!equation)
            return message.reply({ embeds: [error6] })

        const answer = val[1];

        const error9 = new ME()
            .setTitle('Answer The Question')
            .setDescription(`❗**| ${message.author}, here is your equation:\n\`Operator count ${operator_amount}, level ${level}\`\n\`\`\`fix\n${equation} = ...\`\`\`You have 30 seconds to solve it.**`)
            .setColor(config.colors.answer)
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });

        message.reply({
            embeds: [error9]
        }
        ).then(msg => {
            cd.add(message.author.id);
            let collector = message.channel.createMessageCollector(
                {
                    filter: (m) =>
                        parseInt(m.content) === answer && m.author.id === message.author.id,
                    time: 30000,
                    max: 1,
                }
            );
            let correct = false;
            collector.on('collect', () => {
                
                cd.add(message.author.id);
                correct = true;
                const timeDiff = Date.now() - msg.createdTimestamp;
                const ans1 = new ME()
                    .setTitle('Yey you got the answer~')
                    .setDescription(`✅ **| ${message.author}, your answer is correct! It took you ${timeDiff / 1000}s!\n\`\`\`fix\n${equation} = ${answer}\`\`\`**`)
                    .setColor(config.colors.correct)
                    .setTimestamp()
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });

                message.reply({
                    embeds: [ans1]
                })
                cd.delete(message.author.id);
            });
            collector.once('end', () => {
                
                const ans2 = new ME()
                    .setTitle('Aweee Time Out~')
                    .setDescription(`❎ **| ${message.author}, timed out. The correct answer is:\n\`\`\`fix\n${equation} = ${answer}\`\`\`**`)
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });

                if (!correct) {
                    msg.delete();
                    message.reply({ embeds: [ans2] })
                    cd.delete(message.author.id);
                }
            })
        })
    }
}
