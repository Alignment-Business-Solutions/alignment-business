import { useCSVReader } from 'react-papaparse';
import { useDispatch } from 'react-redux';

function ImportQBCSV({week_id, client_id}) {
    const { CSVReader } = useCSVReader();
    const dispatch = useDispatch();

    return (
        <CSVReader
            config={{header: true}} 
            onUploadAccepted={(results: any) => {
                console.log(results);
                dispatch({type:"IMPORT_QB_DATA", payload:{data: results.data,
                                                       week_id: week_id,
                                                       client_id: client_id}});
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
export default ImportQBCSV;
