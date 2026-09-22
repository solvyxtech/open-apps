anarlog is the open-source meeting notetaker to start with if you are not on a Mac. It records the audio your computer plays instead of joining the call as a participant, stores everything in a local SQLite database, and ships desktop builds for macOS, Windows and Linux under MIT. The thing to weigh against that: its own README says the team is now building a different product, and the on-device transcription story is strongest on recent Macs. Verified against the repository on 22 September 2026, at desktop release v1.4.25.

## No bot in the call, and that is the point

Hosted notetakers usually work by sending a recording bot into the meeting. anarlog captures audio directly on the device, so nothing appears in the participant list and nothing records from inside the meeting. For anyone whose clients or security team object to a third-party recorder joining calls, that design is the feature — more than any summary quality.

The README splits the workflow by where each step runs:

| Step | Where it happens |
|---|---|
| Audio capture and recording | Your device |
| Transcription | Your device with an on-device model, or the provider you select |
| Notes and transcripts | Local SQLite, recordings as local files |
| Summaries and chat | A local model, your own API key, or optional hosted AI |
| Sync and sharing | Off by default; opt-in encrypted CloudSync |

Transcription and the summary model are separate settings. You can transcribe locally and summarise with a hosted model, or the reverse, and the active provider is always shown in Settings.

## Who it is for, and who it is not for

**A good fit**

- You need meeting notes on Windows or Linux. Most local-first alternatives — [Humla](/apps/humla/), [Loofah](/apps/loofah/) — are macOS-only.
- You already run Ollama, LM Studio or another OpenAI-compatible local server and want summaries from it.
- You want notes you can read without the app: SQLite plus Markdown export.

**Look elsewhere**

- You want a project whose maintainers are all-in on it. The README opens with a note that the team is now building a product called char; anarlog is described as remaining open-source and maintained.
- You need everything on-device on a non-Mac. The built-in local transcription models are documented for supported Macs; elsewhere you choose a provider or run your own server.

## How it compares

| | anarlog | [Meetily](/apps/meetily/) | [Humla](/apps/humla/) | [Loofah](/apps/loofah/) |
|---|---|---|---|---|
| Platforms | macOS, Windows, Linux | macOS, Windows | macOS (Apple Silicon) | macOS (Apple Silicon) |
| Licence | MIT, enterprise parts commercial | MIT, paid PRO tier | MIT, paid cloud sync | MIT |
| Storage | Local SQLite | Local | Local | Markdown files |
| Hosted option | Opt-in | PRO | Opt-in providers | None |

All four are listed in [open-source Granola alternatives](/collections/open-source-granola-alternatives/), with a verdict on each.

## Licence in practice

The community application is MIT: fork it, audit it, ship it. The repository also contains enterprise components that the README calls source-visible and commercially licensed. If you plan to redistribute, check which directory a file lives in before assuming MIT covers it. Other MIT desktop apps in the directory are under [MIT-licensed apps](/licenses/mit/).

## Running it

Download a build for your platform from the releases page — the v1.4.25 release carries `.AppImage` and `.deb` files for x86_64 and aarch64 Linux next to the macOS and Windows builds, each with a SHA-256 file. Open it, join a meeting, and it records on the device with the transcription model you selected. Nothing needs an account.

## Verified sources

- Repository and README — <https://github.com/fastrepl/anarlog> (22 Sep 2026)
- Licence file — <https://github.com/fastrepl/anarlog/blob/main/LICENSE>
- Releases — <https://github.com/fastrepl/anarlog/releases>
- Models and providers — <https://docs.anarlog.so/models-and-providers>
