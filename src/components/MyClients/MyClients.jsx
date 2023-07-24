import React, { useEffect, useReact } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


function MyClients() {

    const dispatch = useDispatch();
    const allClients = useSelector((store) => store.allClients);

  useEffect(() => {
    dispatch({
      type: "FETCH_MY_CLIENTS",
    });
  }, []);

        return (
            <p>Under Construction</p>
        )
}

export default MyClients