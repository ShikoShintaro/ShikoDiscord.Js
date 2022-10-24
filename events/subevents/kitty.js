

module.exports.run = (client, message) => {
    const cute = [
        "https://tenor.com/view/catjam-cat-dancing-cat-music-music-cat-cute-cat-gif-23392229",
        "https://tenor.com/view/cute-cat-cat-cat-kiss-gif-24329855",
        "https://cdn.discordapp.com/attachments/1023213578620244010/1032668159389474816/cat-kiss.gif",
        "https://tenor.com/view/cute-kitty-best-kitty-alex-cute-pp-kitty-omg-yay-cute-kitty-munchkin-kitten-gif-15917800",
        "https://tenor.com/view/madison-r-cute-kitty-cute-cat-gif-25737639",
        "https://tenor.com/view/cat-cats-cute-cat-cute-cats-love-cat-gif-24548505",
        "https://tenor.com/view/nice-cat-gif-25643491",
        "https://tenor.com/view/cat-kitten-scare-scared-cat-scared-gif-24306961",
        "https://tenor.com/view/cat-cat-kiss-nelly-kiss-cute-cute-kitty-gif-24654570",
        "https://cdn.discordapp.com/avatars/750208451287974000/ad4bcfa81abed9363dd89ebf04b14138.webp?size=4096"
    ]

    const rndmindx = Math.max(1, Math.floor(Math.random() * cute.length))

    return message.reply(`${cute[rndmindx]}`)
}

module.exports.config = {
    name: "kitty",
    description: "Olok"
}