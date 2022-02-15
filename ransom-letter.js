//產生隨機整數
/** @param max {Number} @return {Number}*/
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//把文字依據分行符號切成一組字串陣列
/** @param text {String} @return {[String]} */
function parseText(text) {
    text.replace('\r\n', '\n');
    /** @type {[String]} */
    let lines = text.split('\n');
    return lines;
}

//產生隨機字體顏色
/** @return {[String]} */
function randColor() {
    let randNum = getRandomInt(9);
    let color = "black";
    if (randNum == 0) {
        color = "black";
    } else if (randNum == 1) {
        color = "red";
    } else if (randNum == 2) {
        color = "orange";
    } else if (randNum == 3) {
        color = "yellow";
    } else if (randNum == 4) {
        color = "green";
    } else if (randNum == 5) {
        color = "teal";
    } else if (randNum == 6) {
        color = "blue";
    } else if (randNum == 7) {
        color = "purple";
    } else if (randNum == 8) {
        color = "white";
    }
    return color;
}

//產生隨機字體底色
/** @param color {String} @return {String} */
function randBgColor(color) {

    let bgColor = "unset";

    //降低產生字體底色的機率
    let hasBgColor = getRandomInt(3);
    if ((hasBgColor <= 1) && (color != "white")) {
        return bgColor;
    }

    let randNum = getRandomInt(8);
    if (randNum == 0) {
        //避免字體顏色和底色相同
        if (color != "white") {
            bgColor = "unset";
        } else {
            bgColor = "red";
        }
    } else if (randNum == 1) {
        if (color != "red") {
            bgColor = "red";
        } else {
            bgColor = "orange";
        }
    } else if (randNum == 2) {
        if (color != "orange") {
            bgColor = "orange";
        } else {
            bgColor = "yellow";
        }
    } else if (randNum == 3) {
        if (color != "yellow") {
            bgColor = "yellow";
        } else {
            bgColor = "green";
        }
    } else if (randNum == 4) {
        if (color != "green") {
            bgColor = "green";
        } else {
            bgColor = "teal";
        }
    } else if (randNum == 5) {
        if (color != "teal") {
            bgColor = "teal";
        } else {
            bgColor = "blue";
        }
    } else if (randNum == 6) {
        if (color != "blue") {
            bgColor = "blue";
        } else {
            bgColor = "purple";
        }
    } else if (randNum == 7) {
        if (color != "purple") {
            bgColor = "purple";
        } else {
            if (color != "white") {
                bgColor = "unset";
            } else {
                bgColor = "red";
            }
        }
    }
    return bgColor;
}

//隨機指定斜體字
/** @return {String} */
function randItalic() {
    let italic = "normal";
    let randNum = getRandomInt(3);
    if (randNum == 0) {
        italic = "normal";
    } else if (randNum == 1) {
        italic = "italic";
    } else if (randNum == 2) {
        italic = "oblique";
    }
    return italic;
}

//隨機產生字體修飾(底線、刪除線...)
/** @return {String} */
function randTextDecor() {
    let decor = "none";
    let randNum = getRandomInt(6);
    if (randNum == 0) {
        decor = "underline";
    } else if (randNum == 1) {
        decor = "wavy overline";
    } else if (randNum == 2) {
        decor = "line-through";
    } else if (randNum == 3) {
        decor = "none";
    } else if (randNum == 4) {
        decor = "dashed underline overline";
    } else if (randNum == 5) {
        decor = "solid underline 4px";
    }
    return decor;
}

//用<p>標簽包裝一行文字並將文字轉變成勒索信樣式
/** @param line {String} @return {String} */
function changeFont(line) {
    let paragraph = "<p>";
    for (let i = 0; i < line.length; i++) {
        var color = randColor()
        var bgColor = randBgColor(color)
        paragraph += `<span style='font-size:${getRandomInt(4)+1}rem;color:${color};background-color:${bgColor};font-style:${randItalic()};text-decoration:${randTextDecor()};'>${line[i]}</span>`;
    }
    paragraph += "</p>"
    return paragraph
}

/** @param text {String} @return {String}*/
function ransomLetterJS(text) {
    if (!text) {
        return null;
    }
    let input = text;
    let output = "";
    let lines = parseText(input);
    lines.forEach(function(line) {
        output += changeFont(line);
    });
    return output;
}