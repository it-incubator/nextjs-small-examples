import { writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = process.cwd();

console.log('db init');
export const db = {
    increaseRefreshTokenIndex() {
        const filePath = resolve(projectRoot, 'db.json');
        const content = readFileSync(filePath);
        const data = JSON.parse(content.toString());
        data.refreshTokenIndex++;
        writeFileSync(filePath, JSON.stringify(data, null, 2));
        return data.refreshTokenIndex;
    },
    getRefreshTokenIndex() {
        const filePath = resolve(projectRoot, 'db.json');
        const content = readFileSync(filePath);
        return JSON.parse(content.toString()).refreshTokenIndex;
    }
};




