export default function getFirstChar(name: string) {
    // Memisahkan nama menjadi array kata-kata
    const words = name.split(" ");

    // Memeriksa apakah ada dua kata dalam nama
    if (words.length >= 2) {
        // Mengambil satu huruf pertama dari setiap kata
        const firstCharacter = words[0][0] + words[1][0];
        return firstCharacter;
    } else if (words.length === 1) {
        // Jika hanya ada satu kata, kembalikan satu huruf pertama dari kata tersebut
        return words[0][0];
    } else {
        // Jika tidak ada kata, kembalikan string kosong atau tindakan lain sesuai kebutuhan
        return "";
    }
}
