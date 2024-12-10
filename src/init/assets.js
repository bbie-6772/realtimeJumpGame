import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//전역변수
let gameAssets = {};

//현재 파일의 절대경로 찾기
const __filename = fileURLToPath(import.meta.url);
//디렉토리 경로(현재 파일위치) 추출
const __dirname = path.dirname(__filename);
// 현재 파일위치 기준으로 assets 폴더 찾기(../../ => 최상위 폴더로 이동)
const basePath = path.join(__dirname, '../../assets')

//파일 읽기 함수
const readFileAsync = (filename) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(path.join(basePath, filename), 'utf8', (err,data) => {
            // 에러의 경우 실패 처리 후 반환
            if (err) {
                reject(err);
                return;
            }
            // 성공 시 JSON 형태로 변환하여 반환
            resolve(JSON.parse(data))
        })
    })
};

export const loadGameAssets = async () => {
    try {
        // 파일들을 Promise.all() 을 이용해 병렬적으로 가져옴
        const [filename1, filename2, filename3] = await Promise.all([
            readFileAsync('filename1.json'),
            readFileAsync('filename2.json'),
            readFileAsync('filename3.json'),
        ]);
        gameAssets = { filename1, filename2, filename3 }
        return gameAssets
    } catch(err) {
        throw new Error('Failed to load game assets: '+ err.message)
    }
}

export const getGameAssets = () => {
    return gameAssets;
};