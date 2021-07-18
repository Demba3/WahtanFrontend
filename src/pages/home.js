import { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';

import Scream from "../components/Scream"
import axios from "axios";

import Profile from"../components/Profile.js"
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

const Home = ({ getAllScreams, data: {loading, screams} }) => {
    // const [screams, setScreams] = useState([]);
    // const [loading, setLoading] = useState(true)
    // const getScreams = async () => {
    //     try{
    //         const res = await (await axios.get("/screams")).data;
    //         setScreams(res);
    //         setLoading(false);
    // }catch(err){
    //     setLoading(false);
    //     console.log(err);
    // }
    //     }
        useEffect(() => {
            getAllScreams();
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
                <Profile/>
            </Grid>
        </Grid>
        
    )
}

const mapStateToProps = (state) =>{
    return{
        data: state.data
    }
}
function mapDispatchToProps (dispatch){
    return{ getAllScreams: () => dispatch(getScreams())}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
