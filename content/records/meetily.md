Meetily is the most widely adopted open-source meeting assistant that keeps the whole pipeline — capture, live transcription, speaker separation, summary — on your own machine. Pick it if you are on Windows or want the local-only guarantee without configuring providers; be aware that the project also sells a PRO tier, and that Linux users should expect to build from source. Verified against the repository on 22 September 2026, at release v0.4.1.

## Everything local in the community edition

The repository description is blunt about the design: "100% local processing. no cloud required." Transcription runs on Whisper or NVIDIA's Parakeet models, speakers are separated with diarization, and summaries come from a model served by Ollama. There is no provider to choose because there is no provider — which is the simplest privacy story of any app in this group, and also the most demanding on hardware.

## Who it is for, and who it is not for

**A good fit**

- Legal, healthcare, defence or client work where neither the audio nor the transcript may reach a third party.
- Windows users. Every release ships `.exe` and `.msi` installers alongside the macOS `.dmg`.
- People who already run Ollama and want meeting summaries from the same models.

**Look elsewhere**

- You want a hosted model to write the summary. [anarlog](/apps/anarlog/) and [Humla](/apps/humla/) let you bring an API key; Meetily's community edition is built around local models.
- You are on Linux and want an installer. The README lists Linux as supported, but v0.4.1 publishes macOS and Windows artefacts only.
- Your machine cannot run a useful local LLM. Summary quality is capped by the Ollama model you can fit.

## How it compares

| | Meetily | [anarlog](/apps/anarlog/) | [Humla](/apps/humla/) |
|---|---|---|---|
| Platforms | macOS, Windows | macOS, Windows, Linux | macOS (Apple Silicon) |
| Transcription | Local Whisper / Parakeet | On-device or a chosen provider | Local Whisper or a provider per language |
| Summaries | Local, through Ollama | Local, your API key, or hosted | OpenAI or a local server |
| Paid tier | Meetily PRO | Hosted AI and sync | Humla Cloud sync |

See all of them side by side in [open-source Granola alternatives](/collections/open-source-granola-alternatives/).

## Licence in practice

The community edition is MIT. The README promotes Meetily PRO for "enhanced accuracy, advanced exports, custom summary workflows, and team-ready features", so treat the repository as the free tier of a commercial product: the code you can read is the code you get, and the PRO features are not in it. More Tauri desktop apps are listed under [Tauri](/stacks/tauri/).

## Verified sources

- Repository and README — <https://github.com/Zackriya-Solutions/meetily> (22 Sep 2026)
- Releases — <https://github.com/Zackriya-Solutions/meetily/releases>
- Project site — <https://meetily.ai>
