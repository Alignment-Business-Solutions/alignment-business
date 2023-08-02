import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { withEmotionCache } from '@emotion/react';




function Categories({categories, props}) {
    const [age, setAge] = React.useState('');
    const [value, setValue] = React.useState();
    const [category, setCategory] = React.useState(Object); 
    
    const handleChange = (value) => {
        cell.setValue(value); 
    };
    
    // const onLoad = () => {
    //     for (let cate of categories) {
    //         if(cell.getValue() === cate.id) {
    //             setCategory(cate);
    //         }
    //     }
    // }
  //   
  //  
  //   React.useEffect(() => {
  //       onLoad();
  //   }, []);
  // 

    return (<> </>);
    //     <Box sx={{ minWidth: 120 }}>
    //       <FormControl fullWidth>
    //         <InputLabel id="categories">Category</InputLabel>
    //         <Select
    //           labelId="categories"
    //           id="category"
    //           value={category.id}
    //           label="Age"
    //           onChange={props.onChange(e.target.value)}
    //         >
    //         {categories.map(cat => (
    //             <MenuItem value={cat.id}>{cat.category}</MenuItem>
    //         ))}
    //         </Select>
    //       </FormControl>
    //     </Box>
    // );
}






export default Categories;





