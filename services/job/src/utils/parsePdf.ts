import pdf from 'pdf-parse'
import axios from 'axios'


export async function fetchAndParsePDF(url: any): Promise<string | null> {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);

        const data = await pdf(buffer);
        console.log('PDF Content:', data.text);
        return data.text
        // Here you can parse the `data.text` to extract information you need
    } catch (error) {
        console.error('Error parsing PDF:', error);
        return null
    }
}

