# Wedding Invitation (frontend only, React + Vite)
No backend, database, auth or server APIs.
```
npm install
npm run dev
npm run build
```
## Personalize
Edit **src/data/weddingDetails.js**: every PLACEHOLDER (names, hashtag, date, events, venue, photos, music/video paths, `inviteBaseUrl`).
Put media in `public/` and reference as `/file.mp3`. The music button stays hidden until `music` is set.
## Guest links & WhatsApp
Use the "Share This Invitation" section: it builds `?to=Rahul%20Ji&fam=Family` links and a `wa.me` message you review and send yourself. Never put phone numbers in URLs.
## Limits
Real RSVP collection, private guest lists and reliable open-tracking need a backend or external service (e.g. a form tool); they are intentionally not faked here.

## Deploy (GitHub Pages via Actions)
1. Create an empty GitHub repo, then: `git init && git add . && git commit -m "Wedding invite" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Push to `main` runs `.github/workflows/deploy.yml`; the site URL is `https://<user>.github.io/<repo>/`.
4. Put that URL in `inviteBaseUrl` in `src/data/weddingDetails.js` so shared links use it.
