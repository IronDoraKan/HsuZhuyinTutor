/**
 * 許氏注音練習器音效引擎 (Web Audio API 擬真合成音效)
 */

class SoundSystem {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.volume = 0.5;
    }

    initCtx() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // 機械軸觸發打字聲 (Key Click)
    playKeyClick() {
        if (this.muted) return;
        this.initCtx();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // 隨機微調音高，模擬真實機械鍵盤青軸聲響
        const baseFreq = 600 + Math.random() * 200;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);

        gain.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
    }

    // 按錯鍵的低音警示音 (Error Buzzer)
    playErrorBuzzer() {
        if (this.muted) return;
        this.initCtx();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.setValueAtTime(120, this.ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(this.volume * 0.5, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
    }

    // 通關慶祝音樂 (Success Fanfare)
    playSuccessChime() {
        if (this.muted) return;
        this.initCtx();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

            gain.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.3);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(this.ctx.currentTime + idx * 0.08);
            osc.stop(this.ctx.currentTime + idx * 0.08 + 0.3);
        });
    }

    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }
}

window.SoundSystem = SoundSystem;
