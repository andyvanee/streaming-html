# Streaming HTML

This is a small experiment in the techniques [mentioned here](https://dev.to/tigt/the-weirdly-obscure-art-of-streamed-html-4gc2)

I'm sure there are downsides to rendering a website this way, but it works!

1. In [handlers/home.js](https://github.com/andyvanee/streaming-html/blob/main/handlers/home.js#L33-L37), write the main part of the HTML and leave the connection open
2.  After random timeouts (simulating async backend processing)
  - write HTML template fragment to the response
  - write script to response which replaces that part of the body
3. Once all fragments are written, call `res.end()`

My intuition was that the page would be non-interactive until the end of step 3, but this is not the case. Although `DOMContentLoaded` waits
until the response is ended, it's totally possible to interact with the page before that point.

https://github.com/andyvanee/streaming-html/assets/212280/245a44b5-5f8f-4857-bb55-a537055fb464
