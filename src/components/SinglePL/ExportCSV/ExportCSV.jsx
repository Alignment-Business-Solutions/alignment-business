import { usePapaParse } from 'react-papaparse';
import { Button } from '@mui/material';


export default function JsonToCSV({week, weekData, categories}) {

    const { jsonToCSV } = usePapaParse();
    const download = (data) => {
      
        // Creating a Blob for having a csv file format 
        // and passing the data with type
        const blob = new Blob([data], { type: 'text/csv' });
      
        // Creating an object for downloading url
        const url = window.URL.createObjectURL(blob)
      
        // Creating an anchor(a) tag of HTML
        const a = document.createElement('a')
      
        // Passing the blob downloading url 
        a.setAttribute('href', url)
      
        // Setting the anchor tag attribute for downloading
        // and passing the download file name
        a.setAttribute('download', `test.csv`);
      
        // Performing a download with click
        a.click()
    }
    const handleJsonToCSV = (data) => {
        const results = jsonToCSV(data);
        download(results);
    };

    function processJSON() {
        const transformData = [];
        let catName = '';

        for (let item of weekData) {
            
            for ( let cat of categories) {
                
                if (cat.id === item.category_id) {
                    catName = cat.category;

                    transformData.push({
                        date: item.date,
                        payee: item.payee,
                        paid: item.paid,
                        amount: item.amount,
                        category: catName, 
                    });
                }
            }
        }

        handleJsonToCSV(transformData);
    }

  return <Button color="secondary" variant='contained' onClick={() => processJSON()}>Export This Week</Button>;
}








