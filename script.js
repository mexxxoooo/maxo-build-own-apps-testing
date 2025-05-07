class PomodoroTimer {
    constructor() {
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.pomodoroButton = document.getElementById('pomodoro');
        this.shortBreakButton = document.getElementById('shortBreak');
        this.longBreakButton = document.getElementById('longBreak');
        this.quoteElement = document.getElementById('quote');
        this.authorElement = document.getElementById('author');

        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        this.appName = "Gavvy's Here !";

        // Create audio context for fart sound
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

        this.quotes = [
            {
                text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
                author: "Stephen Covey"
            },
            {
                text: "Focus on being productive instead of busy.",
                author: "Tim Ferriss"
            },
            {
                text: "It's not always that we need to do more but rather that we need to focus on less.",
                author: "Nathan W. Morris"
            },
            {
                text: "The main thing is to keep the main thing the main thing.",
                author: "Stephen Covey"
            },
            {
                text: "Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus.",
                author: "Alexander Graham Bell"
            }
        ];

        this.initializeEventListeners();
        this.updateQuote();
        this.updateTitle(); // Set initial title
    }

    updateTitle() {
        const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
        const seconds = (this.timeLeft % 60).toString().padStart(2, '0');
        document.title = `${minutes}:${seconds} | ${this.appName}`;
    }

    playFartSound(type) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Different fart sounds for different buttons
        switch(type) {
            case 'start':
                // Quick, high-pitched fart
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.2);
                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.2);
                break;
                
            case 'pause':
                // Medium, bubbly fart
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(75, this.audioContext.currentTime + 0.3);
                gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.3);
                break;
                
            case 'reset':
                // Long, descending fart
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(180, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(40, this.audioContext.currentTime + 0.4);
                gainNode.gain.setValueAtTime(0.12, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.4);
                break;
                
            case 'pomodoro':
                // Short, sharp fart
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(110, this.audioContext.currentTime + 0.15);
                gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.15);
                break;
                
            case 'shortBreak':
                // Quick, squeaky fart
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(150, this.audioContext.currentTime + 0.25);
                gainNode.gain.setValueAtTime(0.06, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.25);
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.25);
                break;
                
            case 'longBreak':
                // Deep, rumbling fart
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(80, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(30, this.audioContext.currentTime + 0.5);
                gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.5);
                break;
        }
    }

    initializeEventListeners() {
        // Add unique fart sounds to each button
        this.startButton.addEventListener('click', () => {
            this.playFartSound('start');
            this.start();
        });
        
        this.pauseButton.addEventListener('click', () => {
            this.playFartSound('pause');
            this.pause();
        });
        
        this.resetButton.addEventListener('click', () => {
            this.playFartSound('reset');
            this.reset();
        });
        
        this.pomodoroButton.addEventListener('click', () => {
            this.playFartSound('pomodoro');
            this.setMode('pomodoro');
        });
        
        this.shortBreakButton.addEventListener('click', () => {
            this.playFartSound('shortBreak');
            this.setMode('shortBreak');
        });
        
        this.longBreakButton.addEventListener('click', () => {
            this.playFartSound('longBreak');
            this.setMode('longBreak');
        });
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => this.updateTimer(), 1000);
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.timerId);
    }

    reset() {
        this.pause();
        this.setMode('pomodoro');
    }

    updateTimer() {
        if (this.timeLeft > 0) {
            this.timeLeft--;
            this.updateDisplay();
        } else {
            this.pause();
            this.playAlarm();
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.minutesElement.textContent = minutes.toString().padStart(2, '0');
        this.secondsElement.textContent = seconds.toString().padStart(2, '0');
        this.updateTitle();
    }

    updateQuote() {
        const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        this.quoteElement.textContent = `"${randomQuote.text}"`;
        this.authorElement.textContent = `- ${randomQuote.author}`;
    }

    setMode(mode) {
        this.pause();
        this.pomodoroButton.classList.remove('active');
        this.shortBreakButton.classList.remove('active');
        this.longBreakButton.classList.remove('active');

        switch (mode) {
            case 'pomodoro':
                this.timeLeft = 25 * 60;
                this.pomodoroButton.classList.add('active');
                break;
            case 'shortBreak':
                this.timeLeft = 5 * 60;
                this.shortBreakButton.classList.add('active');
                break;
            case 'longBreak':
                this.timeLeft = 15 * 60;
                this.longBreakButton.classList.add('active');
                break;
        }
        this.updateDisplay();
        this.updateQuote();
    }

    playAlarm() {
        // Create and play a simple beep sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 