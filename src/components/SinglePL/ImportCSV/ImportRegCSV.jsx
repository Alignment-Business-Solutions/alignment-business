import { useCSVReader } from 'react-papaparse';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

function ImportRegCSV({week_id, client_id}) {
    const { CSVReader } = useCSVReader();
    const importData = useSelector(store => store.importRegData);
    const dispatch = useDispatch();
    const unSetImportData= () => {
        dispatch({type:"UNSET_IMPORT_DATA"})
    }

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
          }: any) => {
            return (
            <>
              <div>
                {importData.length === 0 ?
                <Button type='button' color="secondary" variant='contained' {...getRootProps()}>
                  Import Register or Quickbooks csv
                </Button>
                    :
                <Button color="secondary" variant='contained' {...getRemoveFileProps()} onClick={()=>unSetImportData()}>
                  Remove: {acceptedFile.name}
                </Button>}
              </div>
            </>
            );

          }}
        </CSVReader>
    );
}
export default ImportRegCSV;
