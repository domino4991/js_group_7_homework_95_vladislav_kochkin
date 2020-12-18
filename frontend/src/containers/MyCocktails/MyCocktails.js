import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCocktails, getUsersCocktails} from "../../store/actions/cocktailsActions";
import Table from "../../components/UI/Table/Table";

const MyCocktails = () => {
    const {cocktails, cocktailsError} = useSelector(state => state.cocktails);
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        if(user && user.role === 'admin') {
            dispatch(getCocktails());
        } else {
            dispatch(getUsersCocktails());
        }
    }, [dispatch, user]);

    return (
        <div>
            <h1>My Cocktails</h1>
            {cocktailsError && <p style={{textAlign: 'center'}}>{cocktailsError}</p>}
            {cocktails && <Table cocktails={cocktails} />}
        </div>
    );
};

export default MyCocktails;