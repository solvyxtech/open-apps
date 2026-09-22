## What Granola does, and what an alternative has to match

Granola is a hosted AI notepad for meetings: you type rough notes during a call, it transcribes the audio, and it turns both into a written summary. The open-source apps below copy that shape. Where they differ is the part Granola keeps on its own servers — the audio, the transcript and the model that writes the summary.

## How to choose

| | [anarlog](/apps/anarlog/) | [Meetily](/apps/meetily/) | [Humla](/apps/humla/) | [Loofah](/apps/loofah/) |
|---|---|---|---|---|
| Platforms | macOS, Windows, Linux | macOS, Windows | Apple Silicon Mac | Apple Silicon Mac (CLI on Linux) |
| Local transcription | On supported Macs | Whisper or Parakeet | Whisper, per language | On-device |
| Summary model | Local, your key, or hosted | Local, through Ollama | OpenAI or a local server | Your chosen LLM |
| Where notes live | Local SQLite | Local | Local | Markdown files |
| Paid extras | Hosted AI, sync, enterprise | Meetily PRO | Humla Cloud sync | None |

- **Mixed-OS team?** Start with anarlog — it is the only one with Linux builds.
- **Nothing may leave the machine?** Meetily, with a model your hardware can run.
- **Meetings in two languages?** Humla lets you set the transcription engine per language.
- **Notes should live with the rest of your notes?** Loofah writes a Markdown vault.

## Not listed and why

A handful of smaller projects describe themselves as Granola alternatives but have no release, only a few stars, or no activity in months. They join this page when they ship a build people can install. Every app here is a [Tauri](/stacks/tauri/) desktop app; more local-first productivity software is in [Productivity](/categories/productivity/).
