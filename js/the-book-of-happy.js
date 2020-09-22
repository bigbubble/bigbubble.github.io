let answers = [
    "彩票一定中奖", "不加班", "发版成功",
];

function getMyAnswer() {
    let randomInt = Math.floor(Math.random() * answers.length);
    return answers[randomInt];
}