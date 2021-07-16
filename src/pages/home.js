import { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';

import Scream from "../components/Scream"
import axios from "axios";

const Home = () => {
    const [screams, setScreams] = useState([]);
    const [loading, setLoading] = useState(true)
    const getScreams = async () => {
        try{
            const res = await (await axios.get("/screams")).data;
            setScreams(res);
            setLoading(false);
    }catch(err){
        setLoading(false);
        console.log(err);
    }
        }
        useEffect(() => {
            getScreams();
        }, [])

        if(loading){
            return <h4>Loading</h4>
        }
    return (
        <Grid container spacint={16}>
            <Grid item sm={8} xs={12}>
                {screams.map((scream) => {
                    return <Scream key={scream.screamId} {...scream}/>
                })}
            </Grid>
            <Grid item sm={4} xs={12}>
                <p>profile...</p>
            </Grid>
        </Grid>
        
    )
}

export default Home
