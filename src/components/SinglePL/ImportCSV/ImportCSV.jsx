import { Converter } from "csvtojson/v2/Converter";



function ImportCSV() {
    const converter = Converter()

    function cscsvcccv(file) {
        console.log(file); 
    }
    
    return (
            <input type="file" onChange={(e)=>cscsvcccv(e.target.files[0])}/>
    )



}

export default ImportCSV;






