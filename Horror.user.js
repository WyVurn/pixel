// ==UserScript==
// @name         Horror
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Spread the love
// @author       oralekin
// @match        https://hot-potato.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==
if (window.top !== window.self) {
	window.addEventListener('load', () => {
		const opacity = 1;
		const camera = document.querySelector("mona-lisa-embed").shadowRoot.querySelector("mona-lisa-camera");
		const canvas = camera.querySelector("mona-lisa-canvas");
		const container = canvas.shadowRoot.querySelector('.container');
		function addImage(src, posX, posY) {
			let img = document.createElement("img");
			img.onload = () => {
				const width = img.width;
				const height = img.height;
				const canvas = document.createElement("canvas");
				canvas.width = width * 3;
				canvas.height = height * 3;
				canvas.style = `position: absolute; left: ${posX}px; top: ${posY}px; image-rendering: pixelated; width: ${width}px; height: ${height}px;`;
				const ctx = canvas.getContext("2d");
				ctx.globalAlpha = opacity;
				for (let y = 0; y < height; y++) {
					for (let x = 0; x < width; x++) {
						ctx.drawImage(img, x, y, 1, 1, x * 3 + 1, y * 3 + 1, 1, 1);
					}
				}
				container.appendChild(canvas);
			};
			img.src = src;
		}
		addImage("https://raw.githubusercontent.com/WyVurn/pixel/main/horror.png", 0, 0);
	}, false);
}
