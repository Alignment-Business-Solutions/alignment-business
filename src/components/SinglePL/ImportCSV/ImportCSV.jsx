import { useCSVReader } from 'react-papaparse';
import { useDispatch } from 'react-redux';

function ImportCSV() {
    const { CSVReader } = useCSVReader();
    const dispatch = useDispatch();

    return (
        <CSVReader
            config={{header: true}} 
            onUploadAccepted={(results: any) => {
                console.log(results);
                dispatch({type:"IMPORT_DATA", payload: results.data});
            }}
        >
          {({
            getRootProps,
            acceptedFile,
            getRemoveFileProps,
          }: any) => (
            <>
              <div>
                <button type='button' {...getRootProps()}>
                  Browse file
                </button>
                <div>
                  {acceptedFile && acceptedFile.name}
                </div>
                <button {...getRemoveFileProps()} >
                  Remove
                </button>
              </div>
            </>
          )}
        </CSVReader>
    );
}
export default ImportCSV;
