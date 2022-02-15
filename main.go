package main

import (
	"fmt"
	"math/rand"
	"strings"
	"syscall/js"
)

var sample = "哈哈哈\r\n嘻嘻嘻\r\n哈哈哈\r\n嘻嘻嘻"

//把前端傳來的文字依據分行符號切成一組字串陣列
func parseText(input string) []string {
	input = strings.ReplaceAll(input, "\r\n", "\n")
	lines := strings.Split(input, "\n")
	return lines
}

//產生隨機字體顏色
func randColor() string {
	randNum := rand.Intn(9)
	color := "black"
	if randNum == 0 {
		color = "black"
	} else if randNum == 1 {
		color = "red"
	} else if randNum == 2 {
		color = "orange"
	} else if randNum == 3 {
		color = "yellow"
	} else if randNum == 4 {
		color = "green"
	} else if randNum == 5 {
		color = "teal"
	} else if randNum == 6 {
		color = "blue"
	} else if randNum == 7 {
		color = "purple"
	} else if randNum == 8 {
		color = "white"
	}
	return color
}

//產生隨機字體底色
func randBgColor(color string) string {

	bgColor := "unset"

	//降低產生字體底色的機率
	hasBgColor := rand.Intn(3)
	if hasBgColor <= 1 && color != "white" {
		return bgColor
	}

	randNum := rand.Intn(8)
	if randNum == 0 {
		//避免字體顏色和底色相同
		if color != "white" {
			bgColor = "unset"
		} else {
			bgColor = "red"
		}
	} else if randNum == 1 {
		if color != "red" {
			bgColor = "red"
		} else {
			bgColor = "orange"
		}
	} else if randNum == 2 {
		if color != "orange" {
			bgColor = "orange"
		} else {
			bgColor = "yellow"
		}
	} else if randNum == 3 {
		if color != "yellow" {
			bgColor = "yellow"
		} else {
			bgColor = "green"
		}
	} else if randNum == 4 {
		if color != "green" {
			bgColor = "green"
		} else {
			bgColor = "teal"
		}
	} else if randNum == 5 {
		if color != "teal" {
			bgColor = "teal"
		} else {
			bgColor = "blue"
		}
	} else if randNum == 6 {
		if color != "blue" {
			bgColor = "blue"
		} else {
			bgColor = "purple"
		}
	} else if randNum == 7 {
		if color != "purple" {
			bgColor = "purple"
		} else {
			if color != "white" {
				bgColor = "unset"
			} else {
				bgColor = "red"
			}
		}
	}
	return bgColor
}

//隨機指定斜體字
func randItalic() string {

	italic := "normal"
	randNum := rand.Intn(3)
	if randNum == 0 {
		italic = "normal"
	} else if randNum == 1 {
		italic = "italic"
	} else if randNum == 2 {
		italic = "oblique"
	}
	return italic
}

//隨機產生字體修飾(底線、刪除線...)
func randTextDecor() string {
	decor := "none"
	randNum := rand.Intn(6)
	if randNum == 0 {
		decor = "underline"
	} else if randNum == 1 {
		decor = "wavy overline"
	} else if randNum == 2 {
		decor = "line-through"
	} else if randNum == 3 {
		decor = "none"
	} else if randNum == 4 {
		decor = "dashed underline overline"
	} else if randNum == 5 {
		decor = "solid underline 4px"
	}

	return decor
}

//用<p>標簽包裝一行文字並將文字轉變成勒索信樣式
func changeFont(line string) string {
	paragraph := "<p>"
	for _, c := range line {
		var color = randColor()
		var bgColor = randBgColor(color)
		paragraph += fmt.Sprintf("<span style='font-size:%dpx;color:%s;background-color:%s;font-style:%s;text-decoration:%s;'>%s</span>", rand.Intn(36)+12, color, bgColor, randItalic(), randTextDecor(), string(c))
	}
	paragraph += "</p>"
	return paragraph
}

//宣告成JS的function
func ransomLetterJS() js.Func {
	jsFunc := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if len(args) != 1 {
			return js.Null()
		}
		input := args[0].String()
		output := ""
		lines := parseText(input)
		for _, line := range lines {
			output += changeFont(line)
		}
		return js.ValueOf(output)
	})
	return jsFunc
}

func main() {

	//註冊function
	js.Global().Set("ransomLetter", ransomLetterJS())
	fmt.Println("WASM Initialized!")

	//避免程式結束(exit 0)
	<-make(chan bool)
}
