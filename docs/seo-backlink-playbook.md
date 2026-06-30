# PDF62 Backlink Playbook

A practical, do-this-in-order guide to building links for a brand-new,
privacy-first PDF tool. Written for someone who doesn't enjoy "link building" —
every item is concrete, white-hat, and tied to something PDF62 genuinely is.

> **Why this matters:** GSC shows your pages as *"Discovered – currently not
> indexed."* Google found them but won't spend crawl budget on a zero-authority
> domain. Backlinks are the signal that says "this site is worth crawling." A
> handful of real links is the difference between sitting in the queue and
> getting indexed.

---

## 0. Ground rules (read once)

- **Relevance + authority beat quantity.** Five links from privacy/dev/PDF-adjacent
  sites are worth more than 500 from random directories.
- **White-hat only.** Never buy links, use link farms/PBNs, or spam comments.
  Google penalizes it, and it contradicts a privacy brand. Everything below is
  earned or legitimately submitted.
- **"Nofollow" links still help.** Reddit, HN, and most directories use nofollow,
  but they drive *discovery* (Googlebot follows the crawl trail) and real traffic.
  Don't skip them because they're nofollow.
- **Lead every pitch with a hook, not a feature list.** See §1.
- **Be a participant, not a billboard.** On Reddit/HN/forums, your account should
  have history and you should add value, or you'll be removed as spam.

---

## 1. Your unfair advantages (use these as hooks)

Open every submission/post/pitch with one of these. They're real and they're
what makes PDF62 link-worthy:

1. **100% local / no upload** — "your files never leave your browser." This is the
   privacy angle; it's your strongest and most unusual hook.
2. **Free, no sign-up, no watermark, no size limit.** Most competitors gate one of
   these.
3. **Open source (MIT)** — code on GitHub, self-hostable via Docker.
4. **Powered by WebAssembly** (Go `pdfcpu` + Mozilla `pdf.js`) — a genuine technical
   story for dev audiences.
5. **A real alternative to Smallpdf / iLovePDF / Adobe** — without the upload.

**Reusable blurb** (paste into directory submissions):

> PDF62 is a free, privacy-first PDF toolkit that runs entirely in your browser.
> Compress, merge, split, extract pages, and convert PDFs to images — all
> processed locally with WebAssembly, so your files never get uploaded to a
> server. No sign-up, no watermarks, no file-size limits. Open source (MIT).

**One-liner:**

> Free, open-source PDF tools that run 100% in your browser — your files never
> leave your device.

---

## 2. Tier 1 — Foundational citations (easy, do first)

Submit-and-forget listings. Low effort, permanent, and they establish that the
brand exists. Aim to knock these out in your first week.

| Platform | Why it fits | Effort |
|---|---|---|
| **AlternativeTo** (alternativeto.net) | List PDF62 as an alternative to Smallpdf, iLovePDF, Adobe Acrobat. High-intent traffic + a real link. | Low |
| **Product Hunt** | Permanent product page + launch spike (see §3). | Med |
| **SaaSHub** | Software directory; lists alternatives. | Low |
| **Slant** (slant.co) | "Best free PDF tools" style rankings. | Low |
| **Toolify / Uneed / Tinylaunch / Microlaunch** | Indie tool directories, hungry for submissions. | Low |
| **StackShare** | List your tech stack (Next.js, Go, WASM) — links back. | Low |
| **LibHunt** | For the open-source project. | Low |
| **dev tool & "made with" galleries** (e.g. made-with-webassembly.com) | WASM showcase = perfect niche fit. | Low |

**How:** keep a text file with your name, URL, logo (`favicon.svg`), one-liner,
the §1 blurb, and screenshots ready to paste. Then batch through the list in one
sitting.

---

## 3. Tier 2 — Launch spikes (one-time, high value)

These create a burst of links + traffic and often get re-shared. Do them once,
properly. **Don't fire them all on the same day** — space them out so you can
engage with each.

### Hacker News — "Show HN"
Best fit: open source + privacy + WebAssembly is catnip for HN.
- Title: `Show HN: PDF62 – Free, private PDF tools that run entirely in your browser (WASM)`
- First comment (you post it): explain *why* you built it (privacy/no-upload),
  the tech (Go→WASM + pdf.js), that it's MIT and self-hostable, and ask for
  feedback. Be humble and present to answer questions for the first few hours.
- Post Tue–Thu, ~8–10am ET for best odds. One shot — make it count.

### Product Hunt
- Prepare: tagline, gallery images/GIF of a tool in action, the §1 blurb, and 3–5
  "maker comments" ready.
- Launch 12:01am PT. Rally any audience you have to comment (not just upvote).
- Engage all day. A top-5 finish earns a newsletter mention + lasting link.

### Reddit (highest-fit subs)
Read each sub's self-promo rules first. Frame as "I built this, feedback welcome,"
never as an ad.
- r/privacy, r/privacytoolsIO — lead hard on the no-upload angle.
- r/selfhosted — lead on Docker/self-hostable + open source.
- r/opensource, r/coolgithubprojects — lead on MIT + the repo.
- r/webdev, r/SideProject, r/IndieHackers — lead on the WASM build story.
- r/InternetIsBeautiful — lead on "it just works in your browser."
- r/pdf — lead on the specific tool that solves their problem.

### Indie / dev launch boards
Indie Hackers (post a "I built / what I learned" story), DevHunt, BetaList,
Peerlist, Lobsters (lobste.rs — needs an invite; the WASM angle fits).

---

## 4. Tier 3 — Earned & content links (the compounding engine)

This is where durable authority comes from. Slower, but it's what eventually makes
Google *want* to crawl you.

### Your blog is the asset
You already have privacy/WASM posts. Keep writing **linkable** pieces — content
other people cite:
- Comparisons: "PDF62 vs Smallpdf: which keeps your files private?" (people search
  "smallpdf alternative" + "is smallpdf safe").
- How-to guides that target real queries (you just added these to the tool pages —
  expand the best ones into full blog posts).
- The technical story: "How we built a PDF renderer that never uploads your file
  (Go + WASM + pdf.js)." Dev audiences link to build write-ups.
- Cross-post these to **dev.to** and **Hashnode** with a canonical link back — easy
  syndicated links + new readers.

### Answer questions where your tool is the answer
Be genuinely helpful; link only when it actually solves the question.
- **Reddit / r/pdf / r/techsupport** threads asking "how to compress/merge a PDF
  without uploading."
- **Quora** — "best free PDF compressor," "how to convert PDF to image offline."
- **Super User / Stack Exchange** — answer PDF how-to questions.

### HARO-style journalist requests (high-authority press links)
Reporters need expert quotes daily; answering wins links from news/blog sites.
HARO itself shut down in 2024 — use the successors: **Featured.com**, **Qwoted**,
**Help a B2B Writer**, **SourceBottle**. Watch for "privacy tools," "file
security," "free software" queries and reply with a tight, quotable answer +
your link in the bio.

### Guest posts
Pitch a privacy or productivity blog a genuinely useful article (not an ad) with
one contextual link back. Smaller niche blogs say yes far more than big ones.

---

## 5. Tier 4 — Niche / "awesome list" & technical links

These are high-relevance and Google trusts curated lists.

- **`awesome-selfhosted`** — you have a Docker deploy, so you qualify. Open a PR
  adding PDF62 (follow their format/criteria exactly).
- **`awesome-privacy`**, **`awesome-webassembly`**, **`awesome-nextjs`**,
  **`awesome-golang`** — PR to the relevant list; each is a respected, linked-to repo.
- **privacyguides.org / r/privacyguides** — strict, but the community forum is a
  legit place to share a privacy tool for discussion (don't expect an instant
  listing; participate first).
- **Wikipedia "List of PDF software"** — *only* if/when PDF62 has independent
  coverage (a press mention) to cite; new tools get reverted without a source.
  Park this until you've earned a Tier-3 press link.
- **"Built with" / showcase pages** for your stack (Next.js, pdf.js, pdfcpu,
  EmbedPDF) — some maintain "used by / showcase" sections; ask to be added.

---

## 6. Competitor mirroring (find links you already qualify for)

The fastest way to find *realistic* targets: copy where similar tools get listed.

1. Your best comparable is **Stirling-PDF** (open-source, self-hosted PDF tools) —
   plus Smallpdf, iLovePDF, PDF24.
2. Run their domain through a **free backlink checker**: Ahrefs Free Backlink
   Checker, Ubersuggest, or SEO Review Tools.
3. Sort by authority, and for each link ask: *"Is this a directory/list/forum I
   could also be on?"* If yes, pursue it. (Skip ones that require being them.)
4. Also Google-dork for placements:
   - `"smallpdf alternative"` , `"ilovepdf alternative"`
   - `site:reddit.com "private pdf" OR "pdf without upload"`
   - `intitle:"best free pdf tools" 2025`
   - `"list of pdf software"` / `"awesome" pdf`
   Then get yourself onto those same pages.

---

## 7. Copy-paste templates

**Directory submission (short):**
> Free, open-source PDF tools that run 100% in your browser — compress, merge,
> split, extract, and convert to images. Files never leave your device. No
> sign-up, no watermark, no limits. https://pdf62.skyhold.id

**Reddit post (adapt per sub):**
> **I built a free PDF toolkit that processes everything in your browser — no
> uploads.** I got tired of uploading sensitive PDFs to random sites just to
> compress or merge them, so I built PDF62: it runs entirely client-side with
> WebAssembly, so your files never touch a server. It's free, open source (MIT),
> and self-hostable. Tools: compress, merge, split, extract, PDF→image. Would
> love feedback on [specific thing]. [link]

**Cold outreach (to a blogger/list curator):**
> Subject: A private, no-upload PDF tool for your [X] list
>
> Hi [name] — I read your piece on [specific article]. I built PDF62, a free
> open-source PDF toolkit that runs entirely in the browser (files never get
> uploaded). Given your focus on [privacy/free tools], I thought it might be a
> fit for [the list/article]. Happy to answer anything. No worries if not!
> https://pdf62.skyhold.id

**HARO-style reply:**
> [2–3 sentence direct answer to their question, as a quotable expert.]
> — [Your name], creator of PDF62 (https://pdf62.skyhold.id), a privacy-first,
> browser-based PDF toolkit.

---

## 8. What NOT to do (avoid penalties)

- ❌ Buy links, "100 backlinks for $5" gigs, or link-exchange schemes.
- ❌ PBNs / link farms / blog-comment spam.
- ❌ Mass-submit to junk directories (low-quality, irrelevant ones can hurt).
- ❌ Over-optimize anchor text — don't make every link say "free pdf compressor."
  Keep anchors mostly **branded** ("PDF62") or natural ("this browser-based PDF
  tool"). Exact-match anchors at scale look manipulative.
- ❌ Same-day blast every platform — you can't engage, and it looks coordinated.

---

## 9. Track it (simple sheet)

A spreadsheet with these columns keeps you from doing the same thing twice:

`Target | URL | Type (directory/launch/content/outreach) | Hook used | Status (todo/submitted/live/rejected) | Date | Link URL once live | Notes`

Check the "live" links monthly in GSC's **Links** report to confirm Google sees them.

---

## 10. Your first two weeks (start here — do in this order)

If you do nothing else, do these. Roughly 30–60 min/day.

**Week 1 — foundation (low effort, build a base):**
1. Prep your asset file (blurb, one-liner, logo, 3 screenshots).
2. Submit to: AlternativeTo, SaaSHub, Slant, StackShare, LibHunt, made-with-webassembly.
3. Open a PR to `awesome-selfhosted` (and one other relevant awesome list).
4. Make sure the GitHub repo has a strong README, topics, and a link to the live site.

**Week 2 — spikes (higher effort, real authority):**
5. Post a **Show HN** (pick your best day; be present to reply).
6. Post in **2–3 subreddits** (privacy + selfhosted + one dev sub), spaced out.
7. Plan a **Product Hunt** launch for when you have assets + a few people to rally.
8. Cross-post your best blog article to **dev.to** with a canonical link back.

**Then, ongoing (15 min, a few times a week):**
9. Answer 1–2 Quora/Reddit questions where PDF62 is genuinely the answer.
10. Watch Featured.com/Qwoted for a relevant journalist query each week.
11. Each month, run a competitor through a free backlink checker and chase 2–3 of
    their placements.

---

### Reality check
For a brand-new domain, expect the first links to nudge crawling within a couple
of weeks, and meaningful ranking movement over **2–3 months**. The combination
that works: **the content depth you just shipped** (so pages are worth indexing)
**+ a steady trickle of relevant links** (so Google crawls them). You don't need
hundreds — you need a dozen good, relevant ones and some patience.
