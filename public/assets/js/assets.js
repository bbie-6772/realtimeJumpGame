//전역변수
let gameAssets = {};

//파일 읽기 함수
const readFileAsync = async (filename) => {
    // 성공 시 JSON 형태로 변환하여 반환
    return fetch(`assets/json/${filename}`)
        .then((response) => response.json())
        .catch((err) => {throw new Error(err)})
};

export const loadGameAssets = async () => {
    try {
        // 파일들을 Promise.all() 을 이용해 병렬적으로 가져옴
        const [stages, unlock, item, monster] = await Promise.all([
            readFileAsync('stage.json'),
            readFileAsync('unlock.json'),
            readFileAsync('item.json'),
            readFileAsync('monster.json'),
        ]);
        gameAssets = { stages, unlock, item, monster }
        return gameAssets
    } catch (err) {
        throw new Error('Failed to load game assets: ' + err.message)
    }
}

export const getGameAssets = () => {
    return gameAssets;
};