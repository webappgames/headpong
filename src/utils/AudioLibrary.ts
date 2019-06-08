export class AudioLibrary {
    private audios: { [key: string]: HTMLAudioElement }[] = [];

    getAudio(src: string): HTMLAudioElement {
        if (!this.audios[src]) {
            this.audios[src] = new Audio(src);
        }
        return this.audios[src];
    }
}

export const audioLibrary = new AudioLibrary();
