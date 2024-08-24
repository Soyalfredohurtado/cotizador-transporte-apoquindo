import fs from 'fs';
import puppeteer from 'puppeteer';
import {getQuoterByIdController} from '../controllers/quoterController.js'

const createPdfQuoteController = async (quoterData) => {
    let browser;
    try {        
        const quoterById = quoterData;
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage(); 
        const QuoterByIdController = await getQuoterByIdController(quoterData.quoterID)

        const url = `http://localhost:3000/downloads/formato/${quoterData.quoterID}`
        console
        await page.goto(url, { waitUntil: 'networkidle2' });

        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        // Guardar el PDF en un archivo
        let quoterNumber = QuoterByIdController.quoterNumber;
        fs.writeFileSync(`./public/PDFs/quoter/cotizacion-${quoterNumber}.pdf`, pdf);
       
    } catch (error) {
        console.error('Error generating PDF:', error.message);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

export {createPdfQuoteController};

