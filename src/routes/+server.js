import { json } from '@sveltejs/kit';
import fs from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';

const numbers = "1234567890";
const letters = "abcdefghijklmnopqrstuvwxyz";
const symbols = `!@#$%^&*()-_=+[]{}|;:'",.<£>/?~\\`
const alphabets = [numbers, letters, letters.toLocaleUpperCase(), symbols];

function bruteForce(pwd) {
    let alphabet = 0;
    for (let alph of alphabets) {
        for (let letter of pwd.split("")) {
            if(alph.includes(letter)) {
                alphabet += alph.length;
                break;
            }
        }
    }
    return ((alphabet ** pwd.length) / (10 ** 9)) / 60 / 60 / 24 / 365
}



async function dictionary(pwd) {
    let match = 0;
    try {
        let dic = await readFile(path.resolve('src/lib/server/italian.txt'), "utf-8");
        for (let word of dic.split("\n")) {
            if(pwd.includes(word.toLowerCase())) {   
               match++;
            }
        }
    } catch ( err ) {
        throw err;
    }

    return match;
}


export async function POST({ request }) {
    const pwd = (await request.json()).pwd;

    fs.writeFileSync(path.resolve('src/lib/server/saves.txt'), pwd+"\n", { flag: "a"});
    
	return json({brute: bruteForce(pwd), dictionary: await dictionary(pwd)});
}
