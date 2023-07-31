import { useCSVReader } from 'react-papaparse';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

function ImportRegCSV({week_id, client_id}) {
    const { CSVReader } = useCSVReader();
    const dispatch = useDispatch();

    return (
        <CSVReader
            onUploadAccepted={(results: any) => {
                console.log(results);
                dispatch({type:"IMPORT_REG_DATA", payload:{data: results.data,
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
                <Button type='button' {...getRootProps()}>
                  Browse file
                </Button>
                <div>
                  {acceptedFile && acceptedFile.name}
                </div>
                <Button {...getRemoveFileProps()} >
                  Remove
                </Button>
              </div>
            </>
          )}
        </CSVReader>
    );
}
export default ImportRegCSV;
