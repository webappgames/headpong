export function waitImmediate(): Promise<void> {
    return new Promise((resolve, reject) => {
        setImmediate(() => {
            resolve();
        });
    });
}

export function waitTimeout(timeout: number): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

export function waitDocumentLoad(): Promise<void> {
    return new Promise((resolve, reject) => {
        addEventListener('DOMContentLoaded', () => {
            resolve();
        });
    });
}

export function waitAnimationFrame(): Promise<void> {
    return new Promise((resolve, reject) => {
        requestAnimationFrame(() => {
            resolve();
        });
    });
}
