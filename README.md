# FaceHunt — A Bridge to Social Divide

Website prototype for the FaceHunt $100K challenge. A mobile app comes later.

## What's here

A clickable demo of the four pages from the design doc:

1. **Home**: title and tagline, a three-scene banner, the $100,000 prize, a countdown to the list release (Nov 1, 2027, 7pm Eastern), and a green Download button
2. **After download**: the $100K challenge and a green Register Now button
3. **Register**: name, email, phone and a 4-digit PIN (demo only, nothing is saved)
4. **The list**: 10 characteristics, each with a ? button (only #1 has a definition so far), plus the Wildcard button

It's plain HTML, CSS and JavaScript. There's no build step and no server.

## Run it locally

Open `index.html` in any browser.

## Files

- `index.html`: all four pages
- `styles.css`: the look
- `app.js`: page switching, countdown, form checks, the list, the wildcard

## To do

- Replace the banner placeholders with real photos (put them in `/images`)
- Add the $100K prize graphic
- Add definitions for characteristics 2–10
- Real sign-up backend (store registrations securely)
- Mobile app
