let answers = [
    "别失望",
    "不要为你无法控制的事情而担心",
    "不要忘记微笑",
    "阳光"
];

function getMyAnswer() {
    let randomInt = Math.floor(Math.random() * answers.length);
    return answers[randomInt];
}