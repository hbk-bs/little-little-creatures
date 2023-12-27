//@ts-check
document.addEventListener("DOMContentLoaded", function () {
	try {
		// Replace 'little-creature' with the name of the channel you want to subscribe to
		const socket = new WebSocket("ws://localhost:3000/ws/little-creature");
		const title = document.querySelector("h1#title");
		const form = document.querySelector("form#form");
		const code = document.querySelector("div#result>pre>code");

		const inputX = document.querySelector("input#x");
		const inputY = document.querySelector("input#y");
		const inputChannel = document.querySelector("input#channel");
		if (!form) {
			throw new Error("No form found");
		}
		// if (!code) {
		// 	throw new Error("No code found");
		// }
		if (!inputX || !inputY) {
			throw new Error("No inputs found");
		}
		// ceck if the URL is /board
		if (window.location.pathname.split("/")[1] === "board") {
			// code.classList.add("hidden");
			if (!title) {
				throw new Error("No title found");
			} else {
				if (!(title instanceof HTMLHeadingElement)) {
					return;
				}
				title.innerText = "HTTP Board Client";
			}
		} else {
			form.classList.add("hidden");
			if (!title) {
				throw new Error("No title found");
			} else {
				if (!(title instanceof HTMLHeadingElement)) {
					return;
				}
				title.innerText = "WS P5 Client";
			}
		}

		form.addEventListener("submit", async function (event) {
			event.preventDefault();
			if (!(form instanceof HTMLFormElement)) {
				return;
			}
			const formData = new FormData(form);
			for (let [key, value] of formData.entries()) {
				console.log(key, value);
			}
			const formDataObj = Object.fromEntries(formData.entries());
			console.log(formDataObj);
			const response = await fetch("/arduino", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(formDataObj),
			});
			if (response.status !== 201) {
				throw new Error(response.statusText);
			}
			//@ts-ignore

			document.querySelector("input#x").value = "";
			//@ts-ignore
			document.querySelector("input#y").value = "";
		});

		socket.addEventListener("open", function (event) {
			console.log("WebSocket is open now.");
			socket.send("Hello World!");
		});

		socket.addEventListener("message", function (event) {
			console.log(event.data);
			const json = JSON.parse(event.data, function (k, v) {
				return typeof v === "object" || isNaN(v) ? v : parseFloat(v);
			});
			// code.textContent = JSON.stringify(json, null, 2);
		});

		socket.addEventListener("message", function (event) {
			console.log("Message from server: ", event.data);
		});

		socket.addEventListener("close", function (event) {
			console.log("WebSocket is closed now.");
		});

		socket.addEventListener("error", function (event) {
			console.log("WebSocket error: ", event);
		});
	} catch (error) {
		console.error(error);
	}
});
