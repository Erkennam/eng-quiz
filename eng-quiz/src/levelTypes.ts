interface word {
    english: string,
    russian: string,
}

interface level {
    level: number,
    words: word[],
}

export type {level,word}