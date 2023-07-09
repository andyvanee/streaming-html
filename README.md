# Streaming HTML

This is a small experiment in the techniques [mentioned here](https://dev.to/tigt/the-weirdly-obscure-art-of-streamed-html-4gc2)

I'm sure there are downsides to rendering a website this way, but it works!

- In <handlers/home.js>, write the main part of the HTML and leave the connection open
- After random timeouts (simulating async backend processing)
  - write a template to response
  - write script to response which replaces that part of the body
- Once all fragments are written, call `res.end()`

![loading.mp4](docs/loading.mp4)
