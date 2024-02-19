
/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: ____Mohdeep Singh__________________ Student ID: ___109600239___________ Date: __18 Feb 2024____________
*
********************************************************************************/
const express = require('express');
const path = require('path');
const legoData = require('./modules/legoSets'); 
const app = express();
const port = 8080;


app.use(express.static('public'));


legoData.initialize()
    .then(() => {
        console.log('Lego data initialized.');

       
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'views', 'home.html'));
        });

       
        app.get('/about', (req, res) => {
            res.sendFile(path.join(__dirname, 'views', 'about.html'));
        });

        
        app.get('/lego/sets', async (req, res) => {
            try {
                const theme = req.query.theme;
                if (theme) {
                    const setsByTheme = await legoData.getSetsByTheme(theme);
                    res.json(setsByTheme);
                } else {
                    const allSets = await legoData.getAllSets();
                    res.json(allSets);
                }
            } catch (error) {
                console.error(error);
                res.status(404).send('Unable to find requested sets');
            }
        });

        
        app.get('/lego/sets/:setNum', (req, res) => {
            legoData.getSetByNum(req.params.setNum)
                .then(set => res.json(set))
                .catch(error => res.status(404).send('Lego set not found'));
        });

        
        app.use((req, res) => {
            res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
        });

        
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error('Failed to initialize Lego data:', error);
    });
